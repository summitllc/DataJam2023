import {serviceCode} from "../ServiceCode";
import {Autocomplete, Box, Button, TextField} from "@mui/material";

const FilterInput = (props) => {
    const {filterObject, setFilterObject, setStep} = props

    const handleAutoCompleteChange = (event, value, label) => {
        setFilterObject((prev) => {
            return {...prev, [label]: value}
        })
    }
    return (
        <Box>
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
                        onChange={(event, newValue) => {
                            handleAutoCompleteChange(event, newValue, label[0])
                        }}
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
            <Box>
                <Button
                    variant={"contained"}
                    sx={{backgroundColor: "green"}}
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
                        setStep((step) => (step + 1))
                    }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    )
}
export default FilterInput