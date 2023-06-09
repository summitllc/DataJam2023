import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Link,
    Tab,
    Tabs,
    Typography,
    useEventCallback
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useState} from "react";

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


const WhyDialog = (props) => {
    const {showWhyDialog, setShowWhyDialog, facilitiesData, userScore} = props
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const onClose = () => {
        setShowWhyDialog(false)
    }

    const formatPersonalScore = (score) => {
        return Math.floor(score * 10)
    }
    useEffect(() => {
        console.log("facilities data", facilitiesData)
    }, [facilitiesData])
    return (
        <Dialog onClose={onClose} open={showWhyDialog} maxWidth={"md"}>
            <DialogTitle>
                Scores breakdown
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label={
                                "Facility Score"
                            }/>
                            <Tab label="User Score"/>
                            <Tab label="Overall Score"/>
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Typography>
                            These scores are from <span><Link
                            href="https://www.walkscore.com/how-it-works/"
                            target={"_blank"}>
                                Walk Score®
                            </Link></span>
                        </Typography>
                        <Typography>
                            Walk Score: {facilitiesData.rawScore.walkScore}
                        </Typography>
                        <Typography>
                            Transit Score: {facilitiesData.rawScore.transitScore}
                        </Typography>
                        <Typography>
                            Bike Score: {facilitiesData.rawScore.bikeScore}
                        </Typography>

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Typography>
                            These scores are from <span><Link
                            href="https://www.walkscore.com/how-it-works/"
                            target={"_blank"}>
                                Walk Score®
                            </Link></span>
                        </Typography>
                        <Typography>
                            Walk Score: {userScore.walkScore}
                        </Typography>

                        <Typography>
                            Transit Score: {userScore.transitScore}
                        </Typography>
                        <Typography>
                            Bike Score: {userScore.bikeScore}
                        </Typography>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Typography> This score is used for the ranking of the facilities.</Typography>
                        <Typography>
                            Overall Score: {Math.floor(facilitiesData.total)}
                        </Typography>
                    </TabPanel>
                </Box>
            </DialogContent>
        </Dialog>
    )

}
export default WhyDialog;