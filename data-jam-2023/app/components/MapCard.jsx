"use client"
import {useEffect, useRef, useState} from 'react';
import axios from "axios"
import {Box, IconButton, InputAdornment, Paper, Slider, TextField, Typography,} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Map, {Marker, NavigationControl, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Button from "@mui/material/Button/Button";
import Pin from "@/app/components/Icon";

const MapCard = (props) => {
    const {
        coordinates,
        setViewState,
        viewState,
        addressData,
        facilitiesData,
        currentIndex, setShowGuidance, setStep
    } = props
    const [showPopup, setShowPopup] = useState(false);
    const [currentFacilityInfo, setCurrentFacilityInfo] = useState(null);
    const [facilityCoorList, setFacilityCoorList] = useState([])
    const mapRef = useRef();

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

    const markerColor = (index) => {
        if (index === currentIndex) return "green"
        return "red"
    }
    useEffect(() => {
        if (facilitiesData) {
            const coorList = facilitiesData.map((facility) => facility.coor)
            setFacilityCoorList(coorList)
        }
    }, [facilitiesData])

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
            <Button sx={{backgroundColor: "green", width: "30%", alignSelf: "center"}} variant={"contained"}
                    onClick={() => {
                        setStep(1)
                        setShowGuidance(true)
                    }}>
                Re-Search
            </Button>

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
                        maxWidth={"400px"}
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

                {facilityCoorList.map((coor, index) => {
                    return (
                        <Marker key={index} longitude={coor[0]} latitude={coor[1]} anchor="bottom"
                                onClick={(event) => {
                                    setCurrentFacilityInfo((prevState) => {
                                        return facilitiesData[index]
                                    })
                                    event.originalEvent.stopPropagation()
                                }}>
                            <PersonPinCircleIcon sx={{color: markerColor(index)}}/>
                        </Marker>
                    )
                })}
                {currentFacilityInfo &&
                    <Popup
                        anchor="top"
                        longitude={currentFacilityInfo.coor[0]}
                        maxWidth={"400px"}
                        latitude={currentFacilityInfo.coor[1]}
                        onClose={() => setCurrentFacilityInfo(null)}
                    >
                        <Box>
                            <Typography textAlign={"center"} sx={{marginBottom: "10px"}}>
                                {currentFacilityInfo.name}
                            </Typography>
                            <Typography textAlign={"center"} sx={{marginBottom: "10px"}}>
                                {currentFacilityInfo.address}
                            </Typography>
                            <Typography textAlign={"center"}>
                                {currentFacilityInfo.phone}
                            </Typography>
                        </Box>
                    </Popup>
                }


            </Map>
        </Paper>
    )
}

export default MapCard;