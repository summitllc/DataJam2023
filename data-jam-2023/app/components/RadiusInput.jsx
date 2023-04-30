import {Box, Button, Slider, Typography} from "@mui/material";

const RadiusInput = (props) => {
    const {setRadius, setStep, handleConfirm} = props
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
    return (
        <Box sx={{display: "flex", marginBottom: "10px", flexDirection: "column", alignItems: "center"}}>
            <Box sx={{width: "100%", display: "flex", marginBottom: "10px", justifyContent: "center"}}>
                <Slider
                    sx={{width: "60%", color: "green", marginTop: "30px"}}
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

            <Box>
                <Button
                    variant={"contained"}
                    sx={{backgroundColor: "green", marginRight: "30px"}}
                    onClick={() => {
                        setStep((step) => (step - 1))
                    }}
                >
                    Previous
                </Button>
                <Button
                    variant={"contained"}
                    sx={{backgroundColor: "green"}}
                    onClick={() => {
                        handleConfirm()
                    }}
                >
                    Search
                </Button>
            </Box>
        </Box>)
}
export default RadiusInput;