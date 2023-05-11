"use client"
import {useEffect, useState} from 'react';
import {AppBar, Box, Container, createTheme, Paper, ThemeProvider, Typography} from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import FacilityCard from './components/FacilityCard'
import MapCard from "@/app/components/MapCard";
import WhyDialog from "@/app/components/WhyDialog";
import UserGuidance from "@/app/components/UserGuidance"
import LoadingPopUp from "@/app/components/LoadingPopUp"
import axios from "axios";
import {dataDictionary} from "@/app/ServiceCode";
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import ErrorDialog from "@/app/components/ErrorDialog";

export default function Home() {


    const [addressData, setAddressData] = useState(null);
    const [address, setAddress] = useState("");
    const [showWhyDialog, setShowWhyDialog] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [facilitiesData, setFacilitiesData] = useState(null)
    const [userScore, setUserScore] = useState(null)
    const [step, setStep] = useState(0)
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

    const [showError, setShowError]= useState(false)


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
        const {name, coor, walkScore, transitScore, bikeScore, phone, address, website, distance} = facilityData
        const scores = generateScore(userScore, {bikeScore, walkScore, transitScore})
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
        let result = null
        try{
            result = await fetchFacilityData(address, long, lat, range, codes)
        }
        catch (error){
            setLoading(false)
            setShowError(true)
            return

        }

        const {data}= result
        const userScore = JSON.parse(data.result.userScores)
        setUserScore(userScore)
        let facilityData = JSON.parse(data.result.facilityData)
        facilityData = facilityData.map((facility) => (
            processFacilityData(userScore, facility))
        )
        facilityData.sort((a, b) => b.total - a.total)
        setFacilitiesData(facilityData)
        setTruthScore(facilityData)
        setSlider({
            walkScore: 5.5,
            bikeScore: 5.5,
            transitScore: 5.5
        })
        setLoading(false);
    }

    const [alreadyAccessedWebsite, setAlreadyAccessedWebsite] = useState(true);

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
            temp = temp.map((facility, index) => {
                    const walkScore = walkWeight * truthScore[index].scores.walkScore
                    const transitScore = transitWeight * truthScore[index].scores.transitScore
                    const bikeScore = bikeWeight * truthScore[index].scores.bikeScore
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
                                sx={{
                                    backgroundColor: "green",
                                    minHeight: "6vh",
                                    paddingTop: "1.5vh"
                                }}>
                            <Container sx={{
                                minWidth: "100%",
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                <Box sx={{width: "60%"}}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                            color: 'inherit',
                                        }}
                                    >
                                        <a href="/">Mental Health in DC - Maryland - Virginia (MIND)</a>
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    width: "30%",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center"
                                }}>
                                    <a href="https://github.com/summitllc/DataJam2023" target="_blank">
                                        <GitHubIcon fontSize={"large"} sx={{marginRight: "20px", color: "white"}}/>
                                    </a>
                                    <a href="https://www.summitllc.us/" target="_blank">
                                        <Image src="/summitlogo.png" alt="Summit Logo" width={30} height={30}
                                               style={{marginRight: "10px"}}/>
                                    </a>
                                </Box>
                            </Container>

                        </AppBar>
                        {/*Main Content*/}
                        <Box sx={{width: "100%", display: "flex"}}>
                            <Box sx={{width: "60%", height: "95vh"}}>
                                <MapCard
                                    coordinates={coordinates}
                                    viewState={viewState}
                                    setViewState={setViewState}
                                    facilitiesData={facilitiesData}
                                    currentIndex={currentIndex}
                                    setShowGuidance={setAlreadyAccessedWebsite}
                                    setStep={setStep}
                                    addressData={addressData}
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
                            step={step}
                            setStep={setStep}
                        />
                        <LoadingPopUp
                            open={showLoading}
                            close={() => {
                                setLoading(false)
                            }}
                        />
                        <ErrorDialog
                            title={"No Facility"}
                            body={
                            <Box>
                                <Typography>
                                    There is no facility that matches your search.
                                </Typography>
                            </Box>
                            }
                            setShowErrorDialog={setShowError}
                            showErrorDialog={showError}
                            setShowGuidance={setAlreadyAccessedWebsite}
                            setStep={setStep}
                        />
                    </Box>
                </Box>
            </Paper>
        </ThemeProvider>
    )
}
