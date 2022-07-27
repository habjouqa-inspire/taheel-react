/* eslint-disable */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router';
import { downloadDocument } from '../../FinalLicense/API/finalLicenseAPI';

export default function TransferRequirmentsCompletionLetter(props) {
  const {
    onClose,
    dialogContent,
    dialogTitle,
    centerData,
    formDraft,
    formEdit,
    open,
    requestNum,
    acceptBtnName,
    actionBtnName,
    DocId,
    DocName,
    isLetterLoading,
  } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };
  const handleAccept = () => {
    console.log('all values in next btn::',centerData?.centerInfo_r?.beneficiaryCount);
    navigate('/center-services/transfercenterCont', {
      state: {
        centerData: {...centerData,beneficiaryCount: centerData?.centerInfo_r?.beneficiaryCount},
        
        requestNum: requestNum, formDraft: formDraft,
        formEdit: formEdit
      }
    });
    onClose();
  };

  const handleAction = async () => {
    const downloadDoc = await downloadDocument(DocId, true, DocName)
    // if (downloadDoc.isSuccessful) {
    //     setLoading(false)
    // }
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="terms-dialog-title"
      aria-describedby="terms-dialog-description"
      fullWidth={true}
      maxWidth="md"
      open={open}
    >
      <DialogTitle id="terms-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="terms-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button
                    onClick={handleReturn}
                    color="primary"
                    variant="contained"
                    autoFocus
                    sx={{
                        backgroundColor: '#E2E8EB',
                        color: '#000',
                        margin: '0 auto',
                        fontSize: 16,
                        pr: 6,
                        pl: 6
                    }}
                >
                    {backBtnName}
                </Button> */}
        <Button
          disabled={isLetterLoading ? true : false}
          onClick={handleAction}
          color="primary"
          variant="contained"
          autoFocus
          sx={{
            backgroundColor: '#3c8084',
            color: '#fff',
            margin: '0px 10px 0px 0px',
            fontSize: 16,
            pr: 6,
            pl: 6
          }}
        >

          {actionBtnName}
        </Button>
        <Button
          disabled={isLetterLoading ? true : false}
          onClick={handleAccept}
          color="primary"
          variant="contained"
          autoFocus
          sx={{
            backgroundColor: '#3c8084',
            color: '#fff',
            margin: '0 auto',
            // margin: 'auto 50px 30px auto',
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

TransferRequirmentsCompletionLetter.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dialogContent: PropTypes.any,
  dialogTitle: PropTypes.string.isRequired,
  acceptBtnName: PropTypes.string.isRequired,
  actionBtnName: PropTypes.string.isRequired,
  backBtnName: PropTypes.string.isRequired,
  setField: PropTypes.func.isRequired,
  formDraft: PropTypes.bool,
  formEdit: PropTypes.bool,
};
