/* eslint-disable */
import { CircularProgress, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import CloseDilaog from './CloseDilaog';

export default function ConfirmationDialog(props) {
  const { onCloseFn, onAcceptFn, dialogContent, dialogTitle, open, acceptBtnName, cancelBtnName, onEscapeKeyDown, onBackdropClick, isLoading,loadingDraft } = props;
  const handleClose = () => {
    onCloseFn();
  };
  const handleAccept = () => {
    onAcceptFn();
  };
  const handleBackdropClick = () => {
    onBackdropClick();
  };
  const handleEscapeKeyDown = () => {
    onEscapeKeyDown();
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={(event, reason) => {
        console.log("reason :: " + reason)
        if (reason === 'backdropClick') {
          handleBackdropClick();
        }
        else if (reason === 'escapeKeyDown') {
          handleEscapeKeyDown();
        }
        else {
          handleClose();
        }
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={open}
    >
      <DialogTitle id="alert-dialog-title" sx={{ m: 0, p: 2 }} >
        <Grid container alignContent="center" spacing={4}>
          {handleEscapeKeyDown ? (
            <Grid item>
              <CloseDilaog onCloseFn={handleEscapeKeyDown} />
            </Grid>
          ) : null}
          <Grid item>
            {dialogTitle}
          </Grid>
        </Grid>
      </DialogTitle>
      {dialogContent && (<DialogContent>
        <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>)}
      <DialogActions>
        <Button
          startIcon={
            isLoading ? (
              <CircularProgress size="1rem" />
            ) : null
          }
          disabled={isLoading||loadingDraft}
          onClick={handleAccept}
          color="primary"
          startIcon={
            loadingDraft ? (
              <CircularProgress size="1rem" />
            ) : null
          }
          autoFocus
        >
          {acceptBtnName}
        </Button>
        <Button
          disabled={isLoading||loadingDraft}
          onClick={handleClose}
          color="primary">

          {cancelBtnName}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  onCloseFn: PropTypes.func.isRequired,
  onAcceptFn: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dialogContent: PropTypes.string,
  dialogTitle: PropTypes.string.isRequired,
  acceptBtnName: PropTypes.string.isRequired,
  cancelBtnName: PropTypes.string.isRequired,
};