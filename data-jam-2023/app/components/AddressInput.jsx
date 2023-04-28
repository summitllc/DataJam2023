import {Box, Button, LinearProgress, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";

const AddressInput = (props) => {
    const {setAddressData, address, setAddress, setStep} = props
    const [loading, setLoading] = useState(false);
    const [badAddress, setBadAddress] = useState(false)

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

    const handleAddressSubmit = async () => {
        setLoading(true);
        setBadAddress(false)
        let userAddressData = null;
        try {
            userAddressData = await fetchAddressData();
        } catch (e) {
            setBadAddress(true);
            setLoading(false)
            return
        }
        if (userAddressData.data.result.addressMatches.length === 0) {
            setBadAddress(true);
            setLoading(false)
            return
        }
        setLoading(false);
        if (userAddressData) {
            setAddressData(userAddressData.data)
        }
        setStep((prev) => (prev + 1))
    }
    return (
        <Box sx={{display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center"}}>
            {loading && (
                <Box style={{textAlign: 'center', display: "block", marginBottom: "15px"}}>
                    <p style={{padding: '10px'}}> Checking Address Format</p>
                    <LinearProgress color={"secondary"}/>
                </Box>
            )}
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "90%"}}>
                <TextField
                    sx={{
                        marginTop: "10px",
                        display: `${loading ? "none" : "block"}`,
                        marginBottom: "10px",
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    onChange={(input) => {
                        setAddress(input.target.value)
                    }}
                    value={address}

                />
                {badAddress && (
                    <Box textAlign={"center"} sx={{marginBottom: "10px"}}>
                        <Typography>Address can not be found</Typography>
                        <Typography>Make sure you entered a full address</Typography>
                        <Typography>Example: "777 6th St, Washington DC, VA, 20001"</Typography>
                    </Box>
                )}
                <Box>
                    <Button

                        variant={"contained"}
                        sx={{backgroundColor: "green"}}
                        onClick={() => {
                            setStep((step) => (step - 1))
                        }}
                        disabled={true}
                    >
                        Previous
                    </Button>
                    <Button
                        variant={"contained"}
                        sx={{backgroundColor: "green"}}
                        onClick={async () => {
                            await handleAddressSubmit()
                        }}
                        disabled={loading}
                    >
                        Next
                    </Button>
                </Box>
            </Box>


        </Box>

    )
}
export default AddressInput