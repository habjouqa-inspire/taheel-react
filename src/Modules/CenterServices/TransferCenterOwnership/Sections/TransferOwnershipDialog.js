/* eslint-disable */
import {
	Alert, Box, CardContent, CircularProgress, Container, Dialog,
	DialogContent, Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { AuthOTPPhoneNum, requestOTPPhoneNum } from 'src/Modules/Account/API/AccountApi';
import AccountFinalFrom from '../../../Account/Components/AccountFinalForm';
import { transferCenterOwnershipAPIFunc } from '../Api/TransferCenterOwnershipAPI';
import OwnershipOTP from './OwnershipOTP';


export default function TransferOwnershipDialog(props) {
	const navigate = useNavigate();

	const { onClose, val, open } = props;
	const [errMessage, setErrMessage] = useState('');
	const [attemptsNum, setAttemptsNum] = useState(3);
	const [otpExpTime, setOtpExpTime] = useState();
	const [dialogContent, setDialogContent] = useState("");
	const [dialogTitle, setDialogTitle] = useState("");
	const [isOpen, setOpen] = useState(false);
	const [isLoading, setIsloading] = useState(false);

	const reSend = async () => {
		setAttemptsNum(3)
		setOtpExpTime(2.9)
		setErrMessage('')
		setIsloading(true)
		const resp = await requestOTPPhoneNum()
		if (!resp.isSuccessful) {
			setErrMessage(resp.message.error)
			setIsloading(false)
		} else {
			setIsloading(false)
		}

	}
	useEffect(() => {
		reSend()
	}, [])

	const handleClickOpen = (dialogContent, dialogTitle) => {
		setDialogContent(dialogContent);
		setDialogTitle(dialogTitle)
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		!!props.setOpen && (props.setOpen(false))
	};
	const onSubmit = async (values) => {
		const { SmsOTP } = values;
		console.log('#==> valuesvaluesvalues&^%$ ' + JSON.stringify(props.val))
		const { idNumIqamaNum, phoneNumber } = getCurrentUser();

		if (otpExpTime === 0) {
			setErrMessage('تم إنتهاء صلاحية رمز التحقق، نرجو إعادة طلب إرسال رمز التحقق')
			setOtpExpTime(0)
			return { isSuccessful: false, message: errMessage }
		}

		if (attemptsNum === 0) {
			setErrMessage('لقد استنفذت عدد المحاولات ,نرجو إعادة طلب إرسال رمز التحقق')
			setOtpExpTime(0)
			return { isSuccessful: false, message: errMessage }
		}
		const OTPAuth = await AuthOTPPhoneNum(phoneNumber, idNumIqamaNum, SmsOTP);

		if (!OTPAuth.isSuccessful) {
			setAttemptsNum(attmpNum => {
				if (attemptsNum <= 0) {
					return attmpNum;
				}
				return --attmpNum
			})
			setErrMessage(OTPAuth.message);
			return { isSuccessful: false, message: OTPAuth.message };
		}

		if (props.formType === 'newOwnership') {
			!!props.handleOnSuccess && (props.handleOnSuccess())
			!!props.setOpen && (props.setOpen(false))
			return;
		} else {


			const transferCenterOwnershipRequest = await transferCenterOwnershipAPIFunc(props.val);

			if (!transferCenterOwnershipRequest.isSuccessful) {
				setErrMessage(transferCenterOwnershipRequest.message);
				return { isSuccessful: false, message: transferCenterOwnershipRequest.message };
			}
			if (transferCenterOwnershipRequest.isSuccessful) {
				if (values.isDraft && !!transferCenterOwnershipRequest?.responseBody?.data) {
					handleClickOpen(`${transferCenterOwnershipRequest.responseBody.data.message[0]} طلب رقم ${response.responseBody.data.requestNumber}`, '');
				}
				else {

					handleClickOpen(`${transferCenterOwnershipRequest.responseBody.data.message}`, '');
					//handleClose();
				}
			}
		}
	};
	return (
		<>
			<Dialog fullWidth open={open} aria-labelledby="form-dialog-title">
				<DialogContent>
					<>
						<Box>
							<Container >
								<Box >
									<Box sx={{ mb: 3, textAlign: 'center' }}>
										<Typography
											color="textPrimary"
											variant="h2"
										>
											رمز التحقق
										</Typography>
									</Box>
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
													handleCancle={() => { !!onClose ? (reSend(),onClose()) : navigate('/app/center-requests') }}
													validateFunc={(values) => {
														const err = {}
														!values.SmsOTP && (err.SmsOTP = 'يرجى إدخال رمز التحقق')
														return err
													}}
													onSubmit={onSubmit}
												>
													<AccountFinalFrom.Page
														label=""
													// validate={smsOTPValidate}
													reSend={() => reSend()}
													>
														<OwnershipOTP setOtpExpTime={(expTime) => { setOtpExpTime(expTime) }} reSend={() => reSend()} otpExpTime={otpExpTime} attemptsNum={attemptsNum} />
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
			<AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={isOpen} onClose={handleClose} acceptBtnName="تم" />

		</>
	);
}