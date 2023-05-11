import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ErrorDialog = (props) => {
    const {title, body, setShowErrorDialog, showErrorDialog, setStep, setShowGuidance} = props

    const onClose = (event, reason) => {
        if (reason === "backdropClick") return
        setStep(1)
        setShowGuidance(true)
        setShowErrorDialog(false)
    }

    return (
        <Dialog onClose={onClose} open={showErrorDialog} maxWidth={"md"}>
            <DialogTitle>
                {title}
                <IconButto
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
                </IconButto>
            </DialogTitle>
            <DialogContent sx={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                {body}
                <Button variant={"contained"}
                        sx={{backgroundColor: "green", marginTop:"15px", width:"50%"}} onClick={onClose}>Modify Search</Button>
            </DialogContent>
        </Dialog>
    )

}

export default ErrorDialog