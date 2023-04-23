"use client"
import {useEffect, useState} from 'react';
import {
    AppBar,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    Button,
    DialogContent, Paper, Modal, Card, CardContent
} from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import FacilityCard from './components/FacilityCard'
import facilityTestData from './data/facility-test-data'
import AddressInputCard from "@/app/components/AddressInputCard";
import AddressConfirmDialog from "@/app/components/AddressConfirmDialog";
import WhyDialog from "@/app/components/WhyDialog";
import ConditionDialog from "@/app/components/ConditionDialog";
import IntroPopUp from "@/app/components/IntroPopUp"

export default function Home() {


    const [addressData, setAddressData] = useState(null);
    const [showConfirmAddress, setShowConfirmAddress] = useState(false);
    const [showWhyDialog, setShowWhyDialog] = useState(false);
    const [showConditionDialog, setShowConditionDialog] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [viewState, setViewState] = useState({
        longitude: -77.03637,
        latitude: 38.89511,
        zoom: 8
    });
    const [radius, setRadius] = useState(5);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleConfirm = () => {
        const location = addressData.result.addressMatches[0].coordinates
        setShowConfirmAddress(false);
        setCoordinates(location)
        setViewState({
            longtitude: location.x,
            latitude: location.y,
            zoom: 13
        })
    }

    const handlePrevious = () => {
        setCurrentIndex(currentIndex - 1);
    };

    const handleNext = () => {
        setCurrentIndex(currentIndex + 1);
    };

    const facility = facilityTestData[currentIndex];

    // Since Next is SSR, need to use useEffect to access localStorage after the component mounted.
    const [alreadyAccessedWebsite, setAlreadyAccessedWebsite] = useState(false);
    useEffect(() => {
        const previouslyAccessed = localStorage.getItem('alreadyAccessedWebsite');
        setAlreadyAccessedWebsite(previouslyAccessed);
      }, []);

    const handlePopUpClose = () => {
        localStorage.setItem('alreadyAccessedWebsite', true);
        setAlreadyAccessedWebsite(true);
    };

    useEffect(() => {
        console.log(showWhyDialog)
    }, [showWhyDialog])

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
                                setAddressData={setAddressData}
                                setShowConfirmAddress={setShowConfirmAddress}
                                coordinates={coordinates}
                                viewState={viewState}
                                setViewState={setViewState}
                                setRadius={setRadius}
                            />
                        </Box>
                        <Box sx={{width: "50%", height: "95vh"}}>
                            <FacilityCard
                                facilityName={facility.facilityName}
                                address={facility.address}
                                contactInformation={facility.contactInformation}
                                onNext={handleNext}
                                onPrevious={handlePrevious}
                                currentIndex={currentIndex}
                                totalFacilities={facilityTestData.length}
                                setShowWhyDialog={setShowWhyDialog}
                                setShowConditionDialog={setShowConditionDialog}
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
                    />
                    <IntroPopUp
                        open={!alreadyAccessedWebsite}
                        handlePopUpClose={handlePopUpClose}
                    />
                </Box>
            </Box>
        </Paper>
    )
}
