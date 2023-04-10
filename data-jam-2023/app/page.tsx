"use client"
import {useState} from 'react';
import axios from "axios"
import { 
  AppBar, 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton
 } from '@mui/material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import Map from 'react-map-gl';


export default function Home() {
  
  const [address, setAddress] = useState("");
  const [addressData, setAddressData]= useState(null);

  const fetchAddressData =  async ()=>{
      const baseURL= "/api/address"
      const data = await axios.get(baseURL, {
        params:{
          street:"8805 Sylvania St",
          city:"Lorton",
          state:"VA",
          zip:"22079",
          benchmark:"2020",
          format:"json", 
        }
      })
      console.log("data",data.data.result)
  }

  const handleAddressSubmit = ()=>{
    fetchAddressData()
  }
  return (
    <Box>
      <AppBar position="static" sx={{padding: "5px"}}>
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
            initialViewState={{
              longitude: -122.4,
              latitude: 37.8,
              zoom: 14
            }}
            style={{width: 500, height: 500}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={"pk.eyJ1IjoicXVhbm5ndXllbnN1bW1pdCIsImEiOiJjbGczdjRxb3MwZXEwM2VzYTBmOG53ankwIn0.3Z2bGiao8TQWuEhojfDBfQ"}
          />
      </Paper>
      
    </Box>
      
  )
}
