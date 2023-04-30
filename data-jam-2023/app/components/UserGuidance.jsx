import React, {useState} from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle, DialogContent
} from '@mui/material';
import FilterInput from "@/app/components/FilterInput";
import AddressInput from "@/app/components/AddressInput";
import RadiusInput from "@/app/components/RadiusInput";

const UserGuidance = (props) => {
    const {
        handlePopUpClose,
        open,
        filterObject,
        setFilterObject,
        setAddressData,
        address,
        setAddress,
        setRadius,
        handleConfirm, step, setStep
    } = props
    const title = {
        2: "Filter Facilities",
        1: "Enter your address",
        3: "Select the distance away from you"
    }


    const onClose = (event, reason) => {
        if (reason === "backdropClick") return
        handlePopUpClose()
    }


    const render = () => {
        if (step === 2) return (
            <FilterInput filterObject={filterObject} setFilterObject={setFilterObject} setStep={setStep}/>
        )

        if (step === 1) return (
            <AddressInput setAddressData={setAddressData} address={address} setAddress={setAddress} setStep={setStep}/>
        )
        if (step === 3) return (
            <RadiusInput setRadius={setRadius} setStep={setStep} handleConfirm={handleConfirm}/>
        )
        return (<Box sx={{
                display: `flex`,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography variant="h6" component="h2">
                    <div style={{textAlign: 'center'}}>
                        <h1>Welcome to MIND</h1>
                        <p>
                            Our easily navigable application gives personalized transit scores and rankings of mental
                            health
                            facilities in the District of Columbia, Maryland, and Virginia metropolitan area by focusing
                            on
                            the user’s transit preferences. Our application allows users to not only identify and locate
                            facilities that fulfill their medical and financial requirements, but also considers their
                            transportation needs.
                        </p>

                        <Button style={{margin: '20px', backgroundColor: "green"}} variant="contained"
                                onClick={() => {
                                    setStep(1)
                                }}>CLICK TO GET STARTED!</Button>
                    </div>
                </Typography>
            </Box>
        )
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth={"md"}>
            {(step > 0) &&
                <DialogTitle textAlign={"center"}>
                    {title[step]}
                </DialogTitle>
            }
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    minWidth: "400px"
                }}
            >
                {render()}
            </DialogContent>

        </Dialog>
    );
};

export default UserGuidance;