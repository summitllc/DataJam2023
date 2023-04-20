"use client"
import {useState, useEffect, useRef} from 'react';
import axios from "axios"
import {
    Paper,
    TextField,
    InputAdornment,
    IconButton, Slider, Typography, Box,
} from '@mui/material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Map, {Marker, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const AddressInputCard = (props) => {
    const {coordinates, setShowConfirmAddress, setAddressData, setViewState, viewState, setRadius} = props
    const [address, setAddress] = useState("");
    const [placeHolderCoor, setPlaceHolderCoor] = useState([
        [-77.0110598, 38.9082416],
        [-77.0246933, 38.9116931]
    ])
    const [error, setError] = useState(null);
    const mapRef = useRef();

    const marks = [
        {
            value: 5,
            label: '5 Miles',
        },
        {
            value: 25,
            label: '25 Miles',
        },
        {
            value: 50,
            label: '50 Miles',
        },
        {
            value: 100,
            label: '100 Miles',
        },
    ]
    const fetchAddressData = async () => {
        const baseURL = "/api/address"
        const data = await axios.get(baseURL, {
            params: {
                address: address,
                benchmark: "2020",
                format: "json",
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

    const handleAddressSubmit = async () => {
        const userAddressData = await fetchAddressData()
        if (userAddressData) {
            console.log(userAddressData)
            setAddressData(userAddressData.data)
            setShowConfirmAddress(true);
            return
        }
        setError("Failed to fetch address")
    }

    useEffect(() => {
        if (coordinates !== null) {
            const temp = [...placeHolderCoor, [coordinates.x, coordinates.y]]
            const bounds = findBound(temp)
            console.log(bounds)
            mapRef.current.fitBounds([
                [bounds.minLng - 0.03, bounds.minLat - 0.03],
                [bounds.maxLng + 0.03, bounds.maxLat + 0.03],
                {padding: 40}
            ])
        }
    }, [coordinates, placeHolderCoor, mapRef])

    return (
        <Paper sx={{
            padding: "2% 4%",
            display: "flex",
            flexDirection: "column",
            alignItems: "space-around",
            height: "98%",
            margin: "1% 1%"
        }}>
            <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                sx={{margin: "10px 0px", width: "500px"}}
                onChange={(input) => {
                    setAddress(input.target.value)
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleAddressSubmit}>
                                <LocationSearchingIcon/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Box sx={{display: "flex", marginBottom: "10px"}}>
                <Typography> Radius: </Typography>
                <Slider
                    sx={{width: "60%"}}
                    marks={marks}
                    defaultValue={5}
                    step={1}
                    valueLabelDisplay={"auto"}
                    onChange={(event) => {
                        setRadius(event.target.value)
                    }}
                />
            </Box>

            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                style={{width: "100%", height: "100%"}}
                ref={mapRef}
                mapboxAccessToken={"pk.eyJ1IjoicXVhbm5ndXllbnN1bW1pdCIsImEiOiJjbGczdjRxb3MwZXEwM2VzYTBmOG53ankwIn0.3Z2bGiao8TQWuEhojfDBfQ"}
            >
                <NavigationControl showCompass={false}/>
                {coordinates &&
                    <Marker longitude={coordinates.x} latitude={coordinates.y} anchor="bottom">
                        <PersonPinCircleIcon sx={{color: "blue"}}/>
                    </Marker>
                }
                {placeHolderCoor.map((coor) => {
                    return (
                        <Marker key={coor} longitude={coor[0]} latitude={coor[1]} anchor="bottom">
                            <PersonPinCircleIcon sx={{color: "red"}}/>
                        </Marker>
                    )
                })}

            </Map>
        </Paper>
    )
}

export default AddressInputCard;