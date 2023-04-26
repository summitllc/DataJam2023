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
import serviceCode from "@/app/ServiceCode";
import {createRef, useEffect, useRef} from "react";

const ConditionDialog = (props) => {
    const {showConditionDialog, setShowConditionDialog, setFilterObject, filterObject} = props
    const handleAutoCompleteChange = (event, value, label) => {
        setFilterObject((prev) => {
            return {...prev, [label]: value}
        })
    }
    
    return (
        <Dialog open={showConditionDialog} fullWidth={true} maxWidth={"md"}>
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
                {serviceCode.map((serviceObject, index) => {
                    const label = Object.keys(serviceObject)
                    const options = Object.keys(serviceObject[label[0]])
                    return (
                        <Autocomplete
                            sx={{margin: "15px 0px"}}
                            key={label[0]}
                            multiple
                            value={filterObject[label[0]]}
                            id="tags-outlined"
                            onChange={(event, value) => {
                                handleAutoCompleteChange(event, value, label[0])
                            }}
                            value={filterObject[label]}
                            options={options}
                            getOptionLabel={(option) => option}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    key={label[0]}
                                    label={label[0]}
                                    placeholder={label[0]}
                                />
                            )}
                        />
                    )
                })}

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