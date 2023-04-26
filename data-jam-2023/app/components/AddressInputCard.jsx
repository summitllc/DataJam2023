"use client"
import {useEffect, useRef, useState} from 'react';
import axios from "axios"
import {Box, IconButton, InputAdornment, Paper, Slider, TextField, Typography,} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Map, {Marker, NavigationControl, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Button from "@mui/material/Button/Button";

const AddressInputCard = (props) => {
    const {
        setLoading,
        coordinates,
        setShowConfirmAddress,
        setAddressData,
        setViewState,
        viewState,
        setRadius,
        setShowConditionDialog, addressData, facilitiesData, currentIndex
    } = props
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
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
        return await axios.get(baseURL, {
            params: {
                address: address,
                benchmark: "2020",
                format: "json",
            }
        })
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
        setLoading(true);
        const userAddressData = await fetchAddressData();
        setLoading(false);
        if (userAddressData) {
            setAddressData(userAddressData.data)
            setShowConfirmAddress(true);
            return
        }
        setError("Failed to fetch address")
    }

    const markerColor = (index) => {
        if (index === currentIndex) return "green"
        return "red"
    }

    useEffect(() => {
        if (coordinates !== null && facilitiesData !== null) {
            const coordinatesList = facilitiesData.map((facilitiesData) => facilitiesData.coor)
            const temp = [...coordinatesList, [coordinates.x, coordinates.y]]
            const bounds = findBound(temp)
            mapRef.current.fitBounds([
                [bounds.minLng - 0.03, bounds.minLat - 0.03],
                [bounds.maxLng + 0.03, bounds.maxLat + 0.03],
                {padding: 40}
            ])
        }
    }, [coordinates, facilitiesData, mapRef])

    useEffect(() => {
        if (coordinates !== null && facilitiesData !== null) {
            const coordinatesList = facilitiesData.map((facilitiesData) => facilitiesData.coor)
            const temp = [coordinatesList[currentIndex], [coordinates.x, coordinates.y]]
            const bounds = findBound(temp)
            mapRef.current.fitBounds([
                [bounds.minLng - 0.03, bounds.minLat - 0.03],
                [bounds.maxLng + 0.03, bounds.maxLat + 0.03],
                {padding: 40}
            ])
        }
    }, [coordinates, currentIndex])

    return (
        <Paper sx={{
            padding: "2% 4%",
            display: "flex",
            flexDirection: "column",
            alignItems: "space-around",
            height: "98%",
            margin: "1% 1%"
        }}>
            <Box sx={{display: "flex", alignItems: "baseline", justifyContent: "space-between"}}>
                <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    sx={{margin: "10px 0px", width: "600px"}}
                    onChange={(input) => {
                        setAddress(input.target.value)
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleAddressSubmit}>
                                    <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Box>
                    <Button variant={"outlined"} onClick={() => {
                        setShowConditionDialog(true)
                    }}>
                        <Typography>Filter Facilities</Typography>
                    </Button>
                </Box>
            </Box>

            <Box sx={{display: "flex", marginBottom: "10px"}}>
                <Typography> Distance: {"    "}</Typography>
                <Slider
                    sx={{width: "60%"}}
                    marks={marks}
                    defaultValue={5}
                    step={1}
                    max={50}
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
                    <Marker longitude={coordinates.x} latitude={coordinates.y} anchor="bottom" onClick={(event) => {
                        setShowPopup((prevState) => (
                            !prevState
                        ))
                        event.originalEvent.stopPropagation()

                    }}>
                        <PersonPinCircleIcon sx={{color: "blue"}}/>
                    </Marker>
                }
                {showPopup && coordinates ?
                    <Popup
                        anchor="top"
                        longitude={Number(coordinates.x)}
                        latitude={Number(coordinates.y)}
                        onClose={() => setShowPopup(false)}
                    >
                        <div>
                            {addressData.result.addressMatches[0].matchedAddress}
                        </div>
                    </Popup> :
                    <></>
                }

                {facilitiesData?.map((facility) => facility.coor).map((coor, index) => {
                    return (
                        <Marker key={coor} longitude={coor[0]} latitude={coor[1]} anchor="bottom">
                            <PersonPinCircleIcon sx={{color: markerColor(index)}}/>
                        </Marker>
                    )
                })}

            </Map>
        </Paper>
    )
}

export default AddressInputCard;