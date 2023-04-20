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

const conditons =
    ["Chlorpromazine",
        "Droperidol",
        "Fluphenazine",
        "Haloperidol",
        "Loxapine",
        "Perphenazine",
        "Pimozide",
        "Prochlorperazine",
        "Thiothixene",
        "Thioridazine",
        "Trifluoperazine",
        "Aripiprazole",
        "Asenapine",
        "Brexpiprazole",
        "Cariprazine",
        "Clozapine",
        "IIoperidone",
        "Lurasidone",
        "Olanzapine",
        "Olanzapine/Fluoxetine combination",
        "Paliperidone",
        "Quetiapine",
        "Risperidone",
        "Ziprasidone",
        "Nicotine replacement",
        "Non-nicotine smoking/tobacco cessation"]

const ConditionDialog = (props) => {
    const {showConditionDialog, setShowConditionDialog} = props
    return (
        <Dialog open={showConditionDialog} fullWidth={true} maxWidth={"md"} sx={{height: "40vh"}}>
            <DialogTitle>
                Select condition(s)
            </DialogTitle>
            <DialogContent>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={conditons}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Condition(s)"
                            placeholder="Select a condition"
                        />
                    )}
                />
                <Button onClick={() => {
                    setShowConditionDialog(false)
                }}>Okay</Button>
                <Button onClick={() => {
                    setShowConditionDialog(false)
                }}>Cancel</Button>
            </DialogContent>
        </Dialog>
    )

}
export default ConditionDialog;