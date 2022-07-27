/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function TermsDialog(props) {
    const { onClose, dialogContent, dialogTitle, open, acceptBtnName, setAgreeValue, setField, onAccept } = props;
    const handleClose = () => {
        onClose();
    };
    const handleAccept = () => {
        !!setAgreeValue && (setAgreeValue())
        setField('agree', [true])
        !onAccept ? onClose() : onAccept();//Alignment-reject-dialog
    };
    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="terms-dialog-title"
            aria-describedby="terms-dialog-description"
            fullWidth={true}
            maxWidth="lg"
            open={open}
        >
            <DialogTitle id="terms-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="terms-dialog-description">
                    {dialogContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleAccept}
                    color="primary"
                    variant="contained"
                    autoFocus
                    sx={{
                        backgroundColor: '#3c8084',
                        color: '#fff',
                        margin: '0 auto',
                        fontSize: 16,
                        pr: 6,
                        pl: 6
                    }}
                >
                    {acceptBtnName}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

TermsDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    dialogContent: PropTypes.any,
    dialogTitle: PropTypes.string.isRequired,
    acceptBtnName: PropTypes.string.isRequired,
    setField: PropTypes.func.isRequired,
};