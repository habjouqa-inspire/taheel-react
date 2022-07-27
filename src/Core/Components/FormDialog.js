/* eslint-disable */
import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        }
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    },
}))
export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup, onClose, enableClose } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} fullWidth={true} maxWidth="lg" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h3" component="div" style={{ flexGrow: 1,justifyContent:"center",alignContent:"center" }}>
                        {title}
                    </Typography>
                   
                    {enableClose&&<IconButton
                        color="secondary"
                        onClick={() => { onClose(false); setOpenPopup(false); }}>
                        <CloseIcon />
                    </IconButton>}
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}