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
    const [step, setStep] = useState(0)
    const {
        handlePopUpClose,
        open,
        filterObject,
        setFilterObject,
        setAddressData,
        address,
        setAddress,
        setRadius,
        handleConfirm
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
                        <h1>Example Header Title</h1>
                        <h2>How this website works:</h2>
                        <p style={{margin: '10px'}}>Set X.</p>
                        <p style={{margin: '10px'}}>Then see Y.</p>
                        <p style={{margin: '10px'}}>Finally see the results.</p>
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