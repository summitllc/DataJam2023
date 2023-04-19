import {Button, Dialog, DialogContent, DialogTitle, List, ListItem, Typography} from "@mui/material";

const WhyDialog = (props) => {
    const {showWhyDialog, setShowWhyDialog} = props
    return (
        <Dialog open={showWhyDialog}>
            <DialogTitle>
                Why did we recommend this quality?
            </DialogTitle>
            <DialogContent>
                <Typography>Here is a list of reasons:</Typography>
                <List>
                    <ListItem>Reason 1</ListItem>
                    <ListItem>Reason 2</ListItem>
                    <ListItem>Reason 3</ListItem>
                </List>
                <Button onClick={() => {
                    setShowWhyDialog(false)
                }}>Okay</Button>
            </DialogContent>
        </Dialog>
    )

}
export default WhyDialog;