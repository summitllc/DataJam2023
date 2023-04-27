import {
    Autocomplete,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    TextField,
    Typography
} from "@mui/material";
import {serviceCode} from "@/app/ServiceCode";
import {createRef, useEffect, useRef} from "react";

const ConditionDialog = (props) => {
    const {showConditionDialog, setShowConditionDialog, setFilterObject, filterObject} = props

    return (
        <Dialog open={showConditionDialog} fullWidth={true} maxWidth={"sm"}>
            <DialogTitle>
                Select Filter(s)
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    minHeight: "50vh"
                }}
            >

                <Button onClick={() => {
                    setShowConditionDialog(false)
                }}>Ok</Button>
                <Button onClick={() => {
                    setShowConditionDialog(false)
                }}>Cancel</Button>
            </DialogContent>
        </Dialog>
    )

}
export default ConditionDialog;