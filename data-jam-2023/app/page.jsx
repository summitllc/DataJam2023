"use client"
import {useState, useEffect, useRef} from 'react';
import axios from "axios"
import { 
  AppBar, 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  Button,
  DialogContent
 } from '@mui/material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Map, {Marker, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';



export default function Home() {
  
  const [address, setAddress] = useState("");
  const [addressData, setAddressData]= useState(null);
  const [showConfirmAddress, setShowConfirmAddress]= useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -77.03637,
    latitude: 38.89511,
    zoom: 6
  });
  const [placeHolderCoor, setPlaceHolderCoor] = useState([
    [-77.0110598, 38.9082416],
    [-77.0246933,38.9116931]
  ])
  const [error, setError] = useState(null);
  const mapRef = useRef();
  const fetchAddressData =  async ()=>{
      const baseURL= "/api/address"
      const data = await axios.get(baseURL, {
        params:{
          address: address,
          benchmark:"2020",
          format:"json", 
        }
      })
      return data
  }

  const findBound = (coordinates) => {
    return coordinates.reduce((acc, [lng, lat]) => {
      if (lat < acc.minLat) acc.minLat = lat;
      if (lat > acc.maxLat) acc.maxLat = lat;
      if (lng < acc.minLng) acc.minLng = lng;
      if (lng > acc.maxLng) acc.maxLng = lng;
      return acc;
    }, {
      minLat: Number.POSITIVE_INFINITY,
      maxLat: Number.NEGATIVE_INFINITY,
      minLng: Number.POSITIVE_INFINITY,
      maxLng: Number.NEGATIVE_INFINITY
    });
  };

  const handleAddressSubmit = async ()=>{
    const userAddressData = await fetchAddressData()
    if(userAddressData){
      console.log(userAddressData)
      setAddressData(userAddressData.data)
      setShowConfirmAddress(true);
      return
    }
    setError("Failed to fetch address")
  }

  const handleConfirm = ()=>{
    const location = addressData.result.addressMatches[0].coordinates
      setShowConfirmAddress(false);
      setCoordinates(location)
      setViewState({
        longtitude: location.x,
        latitude: location.y,
        zoom: 6
      })
  }

  useEffect(()=>{
    if(coordinates !== null){
      const temp = [...placeHolderCoor, [coordinates.x, coordinates.y]]
      const bounds = findBound(temp)
      console.log(bounds)
        mapRef.current.fitBounds([
          [bounds.minLng-0.03, bounds.minLat-0.03],
          [bounds.maxLng+0.03, bounds.maxLat+0.03],
          {padding:40}
        ])
    }
  },[coordinates, placeHolderCoor, mapRef])
  return (
    <Box>
      <AppBar position="static" sx={{padding: "5px"}}>
      <Snackbar open={error!==null} autoHideDuration={6000} onClose={()=>setError(null)}>
        <Alert onClose={()=>setError(null)} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DATAJAM
          </Typography>
      </AppBar>
      <Paper sx={{padding: "5px", height: "100vh"}}>
      <TextField 
        id="outlined-basic" 
        label="Address" 
        variant="outlined"  
        sx={{margin: "10px 0px", width:"500px"}}
        onChange={(input)=> {setAddress(input.target.value)}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleAddressSubmit}>
                <LocationSearchingIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
        <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            style={{width: 500, height: 500}}
            ref={mapRef}
            mapboxAccessToken={"pk.eyJ1IjoicXVhbm5ndXllbnN1bW1pdCIsImEiOiJjbGczdjRxb3MwZXEwM2VzYTBmOG53ankwIn0.3Z2bGiao8TQWuEhojfDBfQ"}
          >
            <NavigationControl showCompass={false}/>
            { coordinates && 
              <Marker longitude={coordinates.x} latitude={coordinates.y} anchor="bottom" >
                <PersonPinCircleIcon />
              </Marker>
            }
            {placeHolderCoor.map((coor)=>{
              return(
              <Marker key={coor} longitude={coor[0]} latitude={coor[1]} anchor="bottom" >
                <PersonPinCircleIcon />
              </Marker>
              )
            })}
            
        </Map>
      </Paper>
      {(addressData) &&
        <Dialog open={showConfirmAddress && addressData !==null} sx={{ m: 0, p: 2 }} >
          <DialogTitle>
            Confirm your address
          </DialogTitle>
          <DialogContent>
            <Typography>Use the following corrected address?</Typography>
          <Typography>{addressData.result.addressMatches[0].matchedAddress}</Typography>
          <Button onClick={handleConfirm} >Yes</Button>
          <Button>No</Button>
          </DialogContent>
        </Dialog>
      }
    </Box>
      
  )
}
