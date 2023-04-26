"use client"
import {useEffect, useState} from 'react';
import {AppBar, Box, Paper, Typography} from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import FacilityCard from './components/FacilityCard'
import AddressInputCard from "@/app/components/AddressInputCard";
import AddressConfirmDialog from "@/app/components/AddressConfirmDialog";
import WhyDialog from "@/app/components/WhyDialog";
import ConditionDialog from "@/app/components/ConditionDialog";
import IntroPopUp from "@/app/components/IntroPopUp"
import LoadingPopUp from "@/app/components/LoadingPopUp"
import axios from "axios";
import serviceCode from "@/app/ServiceCode";

export default function Home() {


    const [addressData, setAddressData] = useState(null);
    const [showConfirmAddress, setShowConfirmAddress] = useState(false);
    const [showWhyDialog, setShowWhyDialog] = useState(false);
    const [showConditionDialog, setShowConditionDialog] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [facilitiesData, setFacilitiesData] = useState(null)
    const [rawFacilityData, setRawFacilityData] = useState(null)
    const [filterObject, setFilterObject] = useState({
        "Languages": [],
        "Payment Options": [],
        "Pharmacotherapies": [],
        "Special Groups": [],
        "Treatment Approaches": []
    })
    const [viewState, setViewState] = useState({
        longitude: -77.03637,
        latitude: 38.89511,
        zoom: 8
    });
    const [radius, setRadius] = useState(5);

    const [silder, setSlider] = useState({
        walkScore: 1,
        bikeScore: 1,
        transitScore: 1
    })

    const [currentIndex, setCurrentIndex] = useState(0);


    const fetchFacilityData = async (address, long, lat, range, codes) => {
        const baseURL = "/api/facilities"
        return await axios.get(baseURL, {
            params: {
                address: address,
                longitude: long,
                latitude: lat,
                range: range,
                codes: `${codes.toString()}`
            }
        })
    }

    const generateScore = (userScore, facilityScore) => {
        const bikeScore = (userScore.bikeScore + facilityScore.bikeScore) / 2
        const transitScore = (userScore.transitScore + facilityScore.transitScore) / 2
        const walkScore = (userScore.walkScore + facilityScore.walkScore) / 2
        return {bikeScore, transitScore, walkScore}
    }

    const processFacilityData = (userScore, facilityData) => {
        const {name, coor, walkScore, transitScore, bikeScore, phone, address, website} = facilityData
        setRawFacilityData(facilityData)
        const scores = generateScore(userScore, {bikeScore, walkScore, transitScore})
        const total = scores.transitScore + scores.walkScore + scores.bikeScore
        return {
            name, coor, phone, address, website, scores, total
        }
    }

    const handleConfirm = async () => {
        setLoading(true);
        const location = addressData.result.addressMatches[0].coordinates
        setShowConfirmAddress(false);
        setCoordinates(location)
        const address = addressData.result.addressMatches[0].matchedAddress
        const range = radius
        const long = location.x
        const lat = location.y
        let codes = ["IDD",
            "TELE",
            "MD"]
        // const keys = Object.keys(filterObject)
        // keys.map((key) => {
        //     const temp = filterObject[key].map((value) => (
        //         serviceCode[0][key][value]
        //     ))
        //     codes = [...codes, ...temp]
        // })
        const {data} = await fetchFacilityData(address, long, lat, range, codes)
        const userScore = JSON.parse(data.result.userScores)
        let facilityData = JSON.parse(data.result.facilityData)
        facilityData = facilityData.map((facility) => (
            processFacilityData(userScore, facility))
        )

        facilityData.sort((a, b) => b.total - a.total)
        setFacilitiesData(facilityData)

        setViewState({
            longtitude: location.x,
            latitude: location.y,
            zoom: 13
        })
        setLoading(false);
    }

    const [alreadyAccessedWebsite, setAlreadyAccessedWebsite] = useState(true);
    useEffect(() => {
        const previouslyAccessed = localStorage.getItem('alreadyAccessedWebsite');
        setAlreadyAccessedWebsite(previouslyAccessed);
    }, []);

    useEffect(() => {
        if (facilitiesData) {
            const totalWeight = silder.bikeScore + silder.walkScore + silder.transitScore
            const bikeWeight = silder.bikeScore / totalWeight;
            const walkWeight = silder.walkScore / totalWeight;
            const transitWeight = silder.transitScore / totalWeight;
            const temp = [...facilitiesData]
            temp.map((facility) => (
                {
                    ...facility,
                    scores: {
                        walkScore: walkWeight * scores.walkScore,
                        bikeScore: bikeWeight * scores.bikeScore,
                        transitScore: transitWeight * scores.transitScore,
                    },
                    total: walkWeight * scores.walkScore + bikeWeight * scores.bikeScore + transitWeight * scores.transitScore
                }
            ))
            temp.sort((a, b) => b.total - a.total)
            setFacilitiesData(facilityData)
        }

    }, [silder])

    const handlePopUpClose = () => {
        localStorage.setItem('alreadyAccessedWebsite', true);
        setAlreadyAccessedWebsite(true);
    };

    const [showLoading, setLoading] = useState(false);

    return (
        <Paper sx={{backgroundColor: "#dadade"}}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', minHeight: '100vh'}}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static" sx={{padding: "10px 15px", height: "5vh"}}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
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
                    {/*Main Content*/}
                    <Box sx={{width: "100%", display: "flex"}}>
                        <Box sx={{width: "50%", height: "95vh"}}>
                            <AddressInputCard
                                setLoading={setLoading}
                                setAddressData={setAddressData}
                                setShowConfirmAddress={setShowConfirmAddress}
                                coordinates={coordinates}
                                viewState={viewState}
                                setViewState={setViewState}
                                setRadius={setRadius}
                                setShowConditionDialog={setShowConditionDialog}
                                addressData={addressData}
                                facilitiesData={facilitiesData}
                                currentIndex={currentIndex}
                            />
                        </Box>
                        <Box sx={{width: "50%", height: "95vh"}}>
                            <FacilityCard
                                setSlider={setSlider}
                                setShowWhyDialog={setShowWhyDialog}
                                facilitiesData={facilitiesData}
                                currentIndex={currentIndex}
                                setCurrentIndex={setCurrentIndex}
                            />
                        </Box>
                    </Box>

                    {(addressData) &&
                        <AddressConfirmDialog
                            handleConfirm={handleConfirm}
                            showConfirmAddress={showConfirmAddress}
                            addressData={addressData}
                        />
                    }
                    <WhyDialog
                        setShowWhyDialog={setShowWhyDialog}
                        showWhyDialog={showWhyDialog}
                    />
                    <ConditionDialog
                        setShowConditionDialog={setShowConditionDialog}
                        showConditionDialog={showConditionDialog}
                        setFilterObject={setFilterObject}
                        filterObject={filterObject}
                    />
                    <IntroPopUp
                        open={!alreadyAccessedWebsite}
                        handlePopUpClose={handlePopUpClose}
                    />
                    <LoadingPopUp
                        open={showLoading}
                        close={() => {
                            setLoading(false)
                        }}
                    />
                </Box>
            </Box>
        </Paper>
    )
}
