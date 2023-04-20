import {Box, Card, Divider, Link, Paper, Slide, Slider} from "@mui/material";
import CardContent from '@mui/material/CardContent/CardContent';
import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import CardActions from '@mui/material/CardActions'

const FacilityCard = (props) => {
    const {
        facilityName,
        address,
        contactInformation,
        onPrevious,
        onNext,
        currentIndex,
        totalFacilities,
        setShowWhyDialog,
        setShowConditionDialog
    } = props;
    const marks = [
        {
            value: 1,
            label: 'Least Important',
        },
        {
            value: 5,
            label: 'Most Important',
        },

    ]
    const buttonStyle = {
        width: "25%"
    }
    const sliderBoxStyle = {
        width: "50%",
        border: "#dadade 1px solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

    }
    return (
        <Paper sx={{
            padding: "2% 4%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "98%",
            margin: "1% 1%"
        }}>
            <Typography variant={"h5"} textAlign={"center"}> Our recommended facility:</Typography>
            <Box sx={{
                border: "#dadade solid 2px",
                marginTop: "15px",
                width: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "40%",
                marginBottom: "15px"
            }}>

                <Box sx={{textAlign: 'center'}}>
                    <Typography variant="h6" component="h6">
                        {facilityName}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {address}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {contactInformation}
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    width: "80%",
                    alignItems: "baseline"
                }}>
                    <Button variant={"outlined"} sx={buttonStyle} onClick={onPrevious} disabled={currentIndex === 0}>
                        Previous
                    </Button>
                    <Button onClick={() => {
                        setShowWhyDialog(true)
                    }}>
                        <Link sx={{justifyContent: 'center', paddingLeft: '5px'}} variant="body2" component="p">
                            Why we picked this facility
                        </Link>
                    </Button>

                    <Button variant={"outlined"} sx={buttonStyle} onClick={onNext}
                            disabled={currentIndex === totalFacilities - 1}>
                        Next
                    </Button>
                </Box>
            </Box>
            <Box sx={{border: "1px black solid", width: "100%", margin: "2% 0%"}}/>
            <Box>
                <Typography variant={"h5"} textAlign={"center"}> Personalized Recommendations:</Typography>
            </Box>
            <Box sx={{
                border: "#dadade solid 2px",
                marginTop: "15px",
                width: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "50%",
                marginBottom: "5px"
            }}>
                <Box sx={sliderBoxStyle}>
                    <Typography>Walk-ability</Typography>
                    <Slider
                        sx={{width: "60%"}}
                        marks={marks}
                        defaultValue={1}
                        step={1}
                        min={0}
                        max={5}
                        valueLabelDisplay={"auto"}
                        onChange={(event) => {
                            console.log("slide")
                        }}
                    />
                </Box>
                <Box sx={sliderBoxStyle}>
                    <Typography>Transit-ability</Typography>
                    <Slider
                        sx={{width: "60%"}}
                        marks={marks}
                        defaultValue={1}
                        step={1}
                        min={0}
                        max={5}
                        valueLabelDisplay={"auto"}
                        onChange={(event) => {
                            console.log("slide")
                        }}
                    />
                </Box>
                <Box sx={sliderBoxStyle}>
                    <Typography>Bike</Typography>
                    <Slider
                        sx={{width: "60%"}}
                        marks={marks}
                        defaultValue={1}
                        step={1}
                        min={0}
                        max={5}
                        valueLabelDisplay={"auto"}
                        onChange={(event) => {
                            console.log("slide")
                        }}
                    />
                </Box>
                <Button onClick={() => {
                    setShowConditionDialog(true)
                }}>
                    <Typography>Treatment for a specific condition?</Typography>
                </Button>
            </Box>
        </Paper>
    );

};

export default FacilityCard;