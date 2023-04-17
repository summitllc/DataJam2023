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

    walk = rr['walkscore']
    transit = rr['transit']['score']
    bike = rr['bike']['score']
    summary = rr['transit']['summary']

    return {
        'walkScore': walk,
        'transitScore': transit,
        'bikeScore': bike,
        'transitSummary': summary
    }

def lambda_handler(event, context):

    client = boto3.client('s3')

    response = client.get_object(Bucket="datajam-facilities", Key="FindTreatment_Facility_listing_DMV_2023_04_17.csv")
    
    facility_df = pd.read_csv(response['Body'])
    # facility_df['address'] = facility_df['street1'] + " " + facility_df['city'] + " " + facility_df['state'] + " " + str(facility_df['zip'])
    
    # Concatenating lat and long to create a consolidated location as accepted by havesine function
    RANGE = event['range']
    user_coord = tuple((event['latitude'], event['longitude']))
    facility_df['coor'] = list(zip(facility_df.latitude, facility_df.longitude))

    # Find distance from user to each facility and filter for facilities within 5 miles (user edits dist range)
    facility_df['distance']=facility_df['coor'].apply(lambda x: distance_from(user_coord,x))
    ft_df_sort = facility_df.query('distance <= @RANGE').sort_values('distance').reset_index(drop=True)

    scores_df = ft_df_sort.apply(lambda row : get_score(row['address'], row['latitude'], row['longitude']), axis=1, result_type='expand')
    # for index, row in ft_df_sort.iterrows():
    #     f_scores = get_score(row['address'], row['latitude'], row['longitude'])
    #     scores_lst.append(list(f_scores.values()))
    # scores_df = pd.DataFrame(scores_lst, columns=['walk','transit','bike','summary'])

    ft_df_scores = pd.concat([ft_df_sort,scores_df],axis=1,join='inner')
    
    user_scores = get_score(event['address'], event['latitude'], event['longitude'])

    return {
        'statusCode': 200,
        'userScores' : user_scores,
        'facilityData': ft_df_scores.to_json(orient='records'),
        'body': json.dumps('we did it!')
    }
