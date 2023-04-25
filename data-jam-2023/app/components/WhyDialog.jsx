import {Box, Button, Dialog, DialogContent, DialogTitle, List, ListItem, Tab, Tabs, Typography} from "@mui/material";
import {useState} from "react";
import * as PropTypes from "prop-types";

function TabPanel(props) {
    return null;
}

TabPanel.propTypes = {
    index: PropTypes.number,
    value: PropTypes.number,
    children: PropTypes.node
};
const WhyDialog = (props) => {
    const {showWhyDialog, setShowWhyDialog} = props
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Dialog open={showWhyDialog} fullWidth={true} maxWidth={"md"} sx={{height: "40vh"}}>
            <DialogTitle>
                Scores breakdown
            </DialogTitle>
            <DialogContent>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Walk Score"/>
                        <Tab label="Personalized Score"/>
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                {/*<Typography>Your personalized accessibility score:</Typography>*/}

                <Button onClick={() => {
                    setShowWhyDialog(false)
                }}>Okay</Button>
            </DialogContent>
        </Dialog>
    )

}
export default WhyDialog;