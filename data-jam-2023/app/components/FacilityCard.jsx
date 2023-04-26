import {Box, Link, Paper} from "@mui/material";
import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import PreferenceCard from "@/app/components/PreferenceCard";
import {useState} from "react";

const FacilityCard = (props) => {
    const {
        facilitiesData,
        setShowWhyDialog,
    } = props;

    const buttonStyle = {
        width: "25%"
    }

    const [currentIndex, setCurrentIndex] = useState(0)


    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1));
    };

    return (
        <Paper sx={{
            padding: "2% 4%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "98%",
            margin: "1% 1%"
        }}>
            <Typography variant={"h5"} textAlign={"center"}> Our Recommended Facilities</Typography>
            {facilitiesData ? <Box sx={{
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

                    <Box sx={{
                        textAlign: 'center',
                        minHeight: "70%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly"
                    }}>
                        <Typography variant="h6" component="h6">
                            {facilitiesData[currentIndex].name}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {facilitiesData[currentIndex].address}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {facilitiesData[currentIndex].phone}
                        </Typography>
                        <Link>{facilitiesData[currentIndex].website}</Link>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                        width: "80%",
                        alignItems: "baseline"
                    }}>
                        <Button variant={"outlined"} sx={buttonStyle} onClick={handlePrevious}
                                disabled={currentIndex === 0}>
                            Previous
                        </Button>
                        <Button onClick={() => {
                            setShowWhyDialog(true)
                        }}>
                            <Link sx={{justifyContent: 'center', paddingLeft: '5px'}} variant="body2" component="p">
                                View Score
                            </Link>
                        </Button>

                        <Button variant={"outlined"} sx={buttonStyle} onClick={handleNext}
                                disabled={currentIndex === facilitiesData.length - 1}>
                            Next
                        </Button>
                    </Box>
                </Box> :
                <Box sx={{minHeight: "40vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography textAlign={"center"}>Our recommendation will populate once you enter your
                        address </Typography>
                </Box>}
            <Box sx={{border: "1px black solid", width: "100%", margin: "2% 0%"}}/>
            <Box>
                <Typography variant={"h5"} textAlign={"center"}> My Transit Preferences</Typography>
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

                <PreferenceCard title={"Walkability"}/>
                <PreferenceCard title={"Metro Accessibility"}/>
                <PreferenceCard title={"Bike Friendly"}/>
            </Box>
        </Paper>
    );

};

export default FacilityCard;