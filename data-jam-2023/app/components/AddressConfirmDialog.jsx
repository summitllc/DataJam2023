import {Button, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";

const AddressConfirmDialog = (props) => {
    const {showConfirmAddress, addressData, handleConfirm} = props
    return (
        <Dialog open={showConfirmAddress && addressData !== null} sx={{m: 0, p: 2}}>
            <DialogTitle>
                Confirm your address
            </DialogTitle>
            <DialogContent>
                <Typography>Use the following corrected address?</Typography>
                <Typography>{addressData.result.addressMatches[0].matchedAddress}</Typography>
                <Button onClick={handleConfirm}>Yes</Button>
                <Button>No</Button>
            </DialogContent>
        </Dialog>
    )

}
export default AddressConfirmDialog