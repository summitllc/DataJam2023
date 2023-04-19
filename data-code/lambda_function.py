import numpy as np
import haversine as hs
import pandas as pd
import requests
import json
import boto3

# Define distance_from function which outputs the distance between two coordinates (great circle distance in miles)
def distance_from(loc1,loc2): 
    dist=hs.haversine(loc1, loc2, unit=hs.Unit.MILES)
    return round(dist,2)

# API call for Walk, Transit, and Bike scores
def get_score(address, lat, long):
    url = "https://api.walkscore.com/score?format=json&address={0}&lat={1}&lon={2}&transit=1&bike=1&wsapikey=0664f60e00ec6867caf4c9003cfe6583".format(address, lat, long)
    url.replace(",","").replace(" ","%20")

    r = requests.get(url)
    rr = json.loads(r.content)

    try:
        walk = rr['walkscore']
    except KeyError:
        walk = "None"
    
    try:
        transit = rr['transit']['score']
    except KeyError:
        transit = "None"
    
    try:
        bike = rr['bike']['score']
    except KeyError:
        bike = "None"
    
    try:
        summary = rr['transit']['summary']
    except KeyError:
        summary = "None"
    
    return {
        'walkScore': walk,
        'transitScore': transit,
        'bikeScore': bike,
        'transitSummary': summary
    }

def lambda_handler(event, context):

    client = boto3.client('s3')

    response = client.get_object(Bucket="datajam-facilities", Key="FindTreatment_Facility_listing_DMV_2023_04_17.csv")
    
    # Read csv file from S3 bucket
    facility_df = pd.read_csv(response['Body'])
    params = event['queryStringParameters']
    
    # Concatenating lat and long to create a consolidated location as accepted by havesine function
    RANGE = float(params['range'])
    user_coord = tuple((float(params['longitude']), float(params['latitude'])))
    facility_df['coor'] = list(zip(facility_df.longitude, facility_df.latitude))

    # Find distance from user to each facility and filter for facilities within 5 miles (user edits dist range)
    facility_df['distance']=facility_df['coor'].apply(lambda x: distance_from(user_coord,x))
    ft_df_sort = facility_df.query('distance <= @RANGE').sort_values('distance').reset_index(drop=True)

    # Find walk, transit, and bike scores for sorted facilities
    scores_df = ft_df_sort.apply(lambda row : get_score(row['address'], row['latitude'], row['longitude']), axis=1, result_type='expand')
    ft_df_scores = pd.concat([ft_df_sort,scores_df],axis=1,join='inner')
    
    # Get scores for user
    user_scores = get_score(params['address'], float(params['latitude']), float(params['longitude']))

    # Create list of service codes for each facility
    sc_lst = []
    for index, row in ft_df_scores.loc[:,'mh':'n40'].iterrows():
        temp_lst = row[row == 1].index.tolist()
        sc_lst.append([x.upper() for x in temp_lst])

    # Convert df to dictionary
    ft_dict = ft_df_scores[['name','address','phone','website','type_facility','coor','distance',
                                 'walkScore','transitScore','bikeScore','transitSummary']].to_dict('records')
    for i in np.arange(0,len(ft_dict)):
        ft_dict[i]['service_codes'] = sc_lst[i]

    return { 
        'statusCode': 200, 
        'headers': {'content-Type': 'application/json'}, 
        'body': json.dumps({ 
            'message': 'Success', 
            'facilityData': json.dumps(ft_dict), 
            'userScores': json.dumps(user_scores) })
    }
