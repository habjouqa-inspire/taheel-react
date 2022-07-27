/* eslint-disable */

import {
    Alert, Box, CardContent, CircularProgress, Container, Dialog,
    DialogContent
} from '@material-ui/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import { REQUEST_TYPES } from 'src/Core/Utils/enums';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import AccountFinalFrom from '../../../Account/Components/AccountFinalForm';
import { getTaheelRequestsFun } from '../../API/ServicesApi';
import { CancelTempLicenseFunc } from '../Api/CancelInitialApprovalApi';
import { approvalNumValidate } from '../Utils/CancelReasonUtils';
import ReasonBox from './ReasonBox';


export default function CancelReasonpDialog(props) {
    const navigate = useNavigate();
    const { onClose, open, approvalNum, errMessage, setErrMessage, licenseNumber } = props;
    const [dialogContent, setDialogContent] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [btnOptions, setBtnsOptions] = useState();

    const [isLoading, setIsloading] = useState(false);

    const hasDraftInFinalLicenseStage = async (licenseNumber) => {
        const getTaheelRequestsRs = await getTaheelRequestsFun({ licenseNumber, requestTypeId: REQUEST_TYPES.FINAL, status: 4 })
        if (!getTaheelRequestsRs.isSuccessful) {
            setErrMessage(getTaheelRequestsRs.message);
        } else {
            const finalDrafts = getTaheelRequestsRs.responseBody?.data?.requests
            return !!finalDrafts[0] ? finalDrafts[0].requestNum : null
        }
    }
    const handleClickOpen = (dialogContent, dialogTitle) => {
        setErrMessage("");
        setDialogContent(dialogContent);
        setDialogTitle(dialogTitle)
        setOpen(true);
    };

    const handleClose = (value) => {
        setErrMessage("");
        setOpen(false);
        !!props.setOpen && (props.setOpen(false))
    };
    const onSubmit = async (values) => {
        setErrMessage("")
        setIsloading(true)
        setIsloading(false)
        const requestNum = await hasDraftInFinalLicenseStage(licenseNumber)
        if (!!requestNum) {
            setBtnsOptions({
                buttons: {
                    leftBtn: { title: 'نعم', func: () => { setOpen(false); cancelTempLicense(values); } }, rightBtn: {
                        title: 'لا', func: () => {
                            setIsloading(false)
                            setErrMessage("");
                            setOpen(false);
                        }
                    }
                }
            });
            handleClickOpen(`لقد بدأت اجراءات ترخيص مركز لهذه الموافقة, هل تود المتابعة والغاء الموافقة المبدئية؟ علما بأن استمرارك سيلغي الطلب المحفوظ برقم ${requestNum}`, '')
        } else {
            cancelTempLicense(values)
        }
    };
    const cancelTempLicense = async (values) => {
        const { email } = getCurrentUser();
        setIsloading(true)
        setBtnsOptions({ acceptBtnName: "تم" })
        const CancelTempLicenseRequest = await CancelTempLicenseFunc(email, approvalNum, values.cancelingReason);
        if (!CancelTempLicenseRequest.isSuccessful) {
            setIsloading(false)
            setErrMessage(CancelTempLicenseRequest.message);
            return { isSuccessful: false, message: CancelTempLicenseRequest.message };
        } else {
            setIsloading(false)
        }
        if (CancelTempLicenseRequest.isSuccessful) {
            handleClickOpen(`${CancelTempLicenseRequest.responseBody.data.message}`, '');
        }

    }
    return (
        <>
            <Dialog fullWidth open={open} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <>
                        <Box>
                            <Container >
                                <Box >
                                    <CardContent sx={{ padding: "0px" }}>
                                        {!isLoading ?
                                            <>
                                                {errMessage && (
                                                    <Alert variant="outlined" severity="error">
                                                        {errMessage}
                                                    </Alert>
                                                )}
                                                <AccountFinalFrom // pass initialValues, onSubmit and 4 childrens
                                                    initialValues={{
                                                        disabledBackButt: true,
                                                        lastPageErrorHandling: false,
                                                        agree: [false],
                                                    }}
                                                    isDisable={true}
                                                    handleCancle={() => { !!onClose ? onClose() : navigate('/app/center-requests') }}
                                                    onSubmit={(values) => onSubmit(values)}
                                                >
                                                    <AccountFinalFrom.Page
                                                        label=""
                                                        validate={approvalNumValidate}
                                                    >
                                                        <ReasonBox approvalNum={approvalNum} />
                                                    </AccountFinalFrom.Page>
                                                </AccountFinalFrom>
                                            </>
                                            : <Box sx={{ mb: 3, textAlign: 'center' }}><CircularProgress size="10rem" /></Box>}
                                    </CardContent>
                                </Box>
                            </Container>
                        </Box>
                    </>
                </DialogContent>
            </Dialog >
            <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={isOpen} onClose={handleClose} {...btnOptions} />

        </>
    );
}