import {Box, Card, Divider, Link, Paper, Slide, Slider} from "@mui/material";
import CardContent from '@mui/material/CardContent/CardContent';
import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import CardActions from '@mui/material/CardActions'
import PreferenceCard from "@/app/components/PreferenceCard";

const FacilityCard = (props) => {
    const {
        name,
        street,
        phone,
        onPrevious,
        onNext,
        currentIndex,
        totalFacilities,
        setShowWhyDialog,
        setShowConditionDialog
    } = props;

    const buttonStyle = {
        width: "25%"
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
            <Typography variant={"h5"} textAlign={"center"}> Our Recommended Facilities</Typography>
            <Box sx={{
                border: "#dadade solid 2px",
                borderRadius: "16px",
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
                        {name}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {street}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {phone}
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
                            View Score
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
                <Typography variant={"h5"} textAlign={"center"}> My Transit Preferences</Typography>
            </Box>
            <Box sx={{
                border: "#dadade solid 2px",
                borderRadius: "16px",
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