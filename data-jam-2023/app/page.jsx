"use client"
import {useEffect, useState} from 'react';
import {AppBar, Box, createTheme, Paper, ThemeProvider, Typography} from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import FacilityCard from './components/FacilityCard'
import MapCard from "@/app/components/MapCard";
import WhyDialog from "@/app/components/WhyDialog";
import UserGuidance from "@/app/components/UserGuidance"
import LoadingPopUp from "@/app/components/LoadingPopUp"
import axios from "axios";
import {dataDictionary} from "@/app/ServiceCode";
import Image from 'next/image';

export default function Home() {


    const [addressData, setAddressData] = useState(null);
    const [address, setAddress] = useState("");
    const [showWhyDialog, setShowWhyDialog] = useState(false);
    const [showConditionDialog, setShowConditionDialog] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [facilitiesData, setFacilitiesData] = useState(null)
    const [userScore, setUserScore] = useState(null)
    const [filterObject, setFilterObject] = useState({
        "Languages": [],
        "Payment Options": [],
        "Pharmacotherapies": [],
        "Special Groups": [],
        "Treatment Approaches": []
    })
    const [truthScore, setTruthScore] = useState(null)
    const [viewState, setViewState] = useState({
        longitude: -77.03637,
        latitude: 38.89511,
        zoom: 8
    });
    const [radius, setRadius] = useState(5);

    const [slider, setSlider] = useState({
        walkScore: 5.5,
        bikeScore: 5.5,
        transitScore: 5.5
    })

    const [currentIndex, setCurrentIndex] = useState(0);

    const [error, setError] = useState({
        title: "",
        body: ""
    })


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

    const valueOrZero = (value) => {
        if (value === "None") return 0
        return value
    }
    const generateScore = (userScore, facilityScore) => {
        const bikeScore = (valueOrZero(userScore.bikeScore) + valueOrZero(facilityScore.bikeScore)) / 2

        const transitScore = (valueOrZero(userScore.transitScore) + valueOrZero(facilityScore.transitScore)) / 2
        const walkScore = (valueOrZero(userScore.walkScore) + valueOrZero(facilityScore.walkScore)) / 2
        return {bikeScore, transitScore, walkScore}
    }

    const processFacilityData = (userScore, facilityData) => {
        console.log("origin", facilityData)
        const {name, coor, walkScore, transitScore, bikeScore, phone, address, website, distance} = facilityData
        const scores = generateScore(userScore, {bikeScore, walkScore, transitScore})
        setTruthScore(scores)
        const total = scores.transitScore + scores.walkScore + scores.bikeScore
        return {
            name, coor, phone, address, website, scores, total, distance, rawScore: {
                walkScore, transitScore, bikeScore
            }
        }
    }

    const handleConfirm = async () => {
        setAlreadyAccessedWebsite(false)
        setLoading(true);
        const location = addressData.result.addressMatches[0].coordinates
        setCoordinates(location)
        const address = addressData.result.addressMatches[0].matchedAddress
        const range = radius
        const long = location.x
        const lat = location.y
        let codes = []
        const keys = Object.keys(filterObject)
        keys.map((key) => {
            const temp = filterObject[key].map((value) => {
                return dataDictionary[key][value]
            })
            codes = [...codes, ...temp]
        })
        if (codes.length === 0) codes = [""]
        const {data} = await fetchFacilityData(address, long, lat, range, codes)
        const userScore = JSON.parse(data.result.userScores)
        setUserScore(userScore)
        let facilityData = JSON.parse(data.result.facilityData)
        facilityData = facilityData.map((facility) => (
            processFacilityData(userScore, facility))
        )
        facilityData.sort((a, b) => b.total - a.total)
        setFacilitiesData(facilityData)
        setSlider({
            walkScore: 1,
            bikeScore: 1,
            transitScore: 1
        })

        // setViewState({
        //     longtitude: location.x,
        //     latitude: location.y,
        //     zoom: 13
        // })
        setLoading(false);
    }

    const [alreadyAccessedWebsite, setAlreadyAccessedWebsite] = useState(true);
    useEffect(() => {
        const previouslyAccessed = localStorage.getItem('alreadyAccessedWebsite');
        setAlreadyAccessedWebsite(previouslyAccessed);
    }, []);

    useEffect(() => {

        if (facilitiesData) {
            if (slider.bikeScore === slider.walkScore === slider.transitScore) {
                return
            }
            const totalWeight = slider.bikeScore + slider.walkScore + slider.transitScore
            const bikeWeight = slider.bikeScore / totalWeight;
            const walkWeight = slider.walkScore / totalWeight;
            const transitWeight = slider.transitScore / totalWeight;
            let temp = [...facilitiesData]
            temp = temp.map((facility) => {
                    const walkScore = walkWeight * truthScore.walkScore
                    const transitScore = transitWeight * truthScore.transitScore
                    const bikeScore = bikeWeight * truthScore.bikeScore
                    const totalSum = (walkScore + transitScore + bikeScore)
                    const penalty = (facility.distance / radius) * (totalSum / 4)
                    const total = totalSum - penalty
                    return {
                        ...facility,
                        scores: {
                            walkScore,
                            bikeScore,
                            transitScore,
                        },
                        total
                    }
                }
            )
            temp.sort((a, b) => b.total - a.total)
            setFacilitiesData(temp)
        }

    }, [slider])

    const handlePopUpClose = () => {
        setAlreadyAccessedWebsite(false)
    };

    const [showLoading, setLoading] = useState(false);

    const theme = createTheme({
        palette: {
            secondary: {
                main: "#00FF00"
            }
        }
    });


    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{backgroundColor: "#dadade"}}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100vh',
                }}>
                    <Box sx={{flexGrow: 1}}>
                        <AppBar position="static"
                                sx={{padding: "10px 15px", height: "6vh", display: 'flex', backgroundColor: "green"}}>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                }}
                            >
                                <a href="/">Mental Health Treatment in DC - Maryland - Virginia (DMV)</a>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <a href="https://github.com/summitllc/DataJam2023" target="_blank">
                                        <Image src="/githublogo.png" alt="GitHub Logo" width={26} height={26}
                                               style={{marginTop: '8px', marginRight: '10px'}}/>
                                    </a>
                                    <a href="https://www.summitllc.us/" target="_blank">
                                        <Image src="/summitlogo.png" alt="Summit Logo" width={22} height={22}
                                               style={{marginTop: '8px'}}/>
                                    </a>
                                </div>
                            </Typography>
                        </AppBar>
                        {/*Main Content*/}
                        <Box sx={{width: "100%", display: "flex"}}>
                            <Box sx={{width: "60%", height: "95vh"}}>
                                <MapCard
                                    setLoading={setLoading}
                                    setAddressData={setAddressData}
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
                            <Box sx={{width: "40%", height: "95vh"}}>
                                <FacilityCard
                                    setSlider={setSlider}
                                    setShowWhyDialog={setShowWhyDialog}
                                    facilitiesData={facilitiesData}
                                    currentIndex={currentIndex}
                                    setCurrentIndex={setCurrentIndex}
                                    slider={slider}
                                />
                            </Box>
                        </Box>
                        {facilitiesData ? <WhyDialog
                            setShowWhyDialog={setShowWhyDialog}
                            showWhyDialog={showWhyDialog}
                            facilitiesData={facilitiesData[currentIndex]}
                            userScore={userScore}
                        /> : <></>}
                        <UserGuidance
                            open={alreadyAccessedWebsite}
                            handlePopUpClose={handlePopUpClose}
                            filterObject={filterObject}
                            setFilterObject={setFilterObject}
                            setAddressData={setAddressData}
                            address={address}
                            setAddress={setAddress}
                            setRadius={setRadius}
                            handleConfirm={handleConfirm}
                        />
                        <LoadingPopUp
                            open={showLoading}
                            close={() => {
                                setLoading(false)
                            }}
                        />
                        {/*<AppBar position="absolute" sx={{top: "auto", bottom: -60, padding: "10px 15px", height: "6vh"}}>*/}
                        {/*    <Typography*/}
                        {/*        variant="h6"*/}
                        {/*        noWrap*/}
                        {/*        sx={{*/}
                        {/*            mr: 2,*/}
                        {/*            display: {xs: 'none', md: 'flex'},*/}
                        {/*            fontFamily: 'monospace',*/}
                        {/*            fontWeight: 700,*/}
                        {/*            letterSpacing: '.3rem',*/}
                        {/*            color: 'inherit'*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <p>Summit Consulting, LLC (c) 2023 </p>*/}
                        {/*    </Typography>*/}
                        {/*</AppBar>*/}
                    </Box>
                </Box>
            </Paper>
        </ThemeProvider>
    )
}
