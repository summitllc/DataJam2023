import {useEffect, useState} from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Link, Tab, Tabs, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ErrorDialog = (props) => {
    const {title, body, setShowErrorDialog, showErrorDialog} = props

    const onClose = () => {
        setShowErrorDialog(false)
    }

    return (
        <Dialog onClose={onClose} open={showErrorDialog} maxWidth={"md"}>
            <DialogTitle>
                {title}
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
                <Typography>{body}</Typography>
                <Button variant={"outline"}>Dismiss</Button>
            </DialogContent>
        </Dialog>
    )

}

export default ErrorDialog