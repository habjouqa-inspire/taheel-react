import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	Box,
	Alert,
	CardContent,
	Typography,
	Container
} from '@material-ui/core';
import { getCurrentUser, setCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import PropTypes from 'prop-types';
import { smsOTPValidate } from '../Utils/AccountUtils';
import { AuthOTPPhoneNum, ownerInfoUpdate } from '../API/AccountApi';
import SmsOTP from './SmsOTP';
import AccountFinalFrom from './AccountFinalForm';

export default function ChangePhonenumberDialog(props) {
	const { onClose, open, setOTP, setSuccessMessageFromDialog, data } = props;
	const [errMessage, SetErrMessage] = useState('');

	const handleClose = () => {
		onClose();
	};
	const onSubmit = async (values) => {
		const { SmsOTP } = values;
		setOTP(SmsOTP);
		const response = { isSuccessful: true, message: '' };
		const OTPAuth = await AuthOTPPhoneNum(props.data.phoneNumber, props.data.idNumIqamaNum, SmsOTP);
		if (!OTPAuth.isSuccessful) {
			SetErrMessage(OTPAuth.message);
			return { isSuccessful: false, message: OTPAuth.message };
		}
		const ownerInfoUpdateRequest = await ownerInfoUpdate(props.data.idNumIqamaNum, props.data.email, props.data.phoneNumber, SmsOTP);
		if (!ownerInfoUpdateRequest.isSuccessful) {
			SetErrMessage(ownerInfoUpdateRequest.message);
			return { isSuccessful: false, message: ownerInfoUpdateRequest.message };
		}
		setSuccessMessageFromDialog('لقد تم حفظ المعلومات بنجاح');

		handleClose();
		setCurrentUser({
			...getCurrentUser(),
			email: props.data.email,
			phoneNumber: props.data.phoneNumber,
		});
		return response;
	};
	return (
		<>
			<Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
										{errMessage && (
											<Alert variant="outlined" severity="error">
												{errMessage}
											</Alert>
										)}
										<AccountFinalFrom // pass initialValues, onSubmit and 4 childrens
											initialValues={{
												disabledBackButt: true,
												lastPageErrorHandling: false,
												agree: [false]
											}}
											isDisable={true}

											onSubmit={onSubmit}
										>
											<AccountFinalFrom.Page
												label=""
												validate={smsOTPValidate}
											>
												<SmsOTP newNum={props.data.phoneNumber} />
											</AccountFinalFrom.Page>
										</AccountFinalFrom>
									</CardContent>
								</Box>
							</Container>
						</Box>
					</>
				</DialogContent>
			</Dialog>
		</>
	);
}

ChangePhonenumberDialog.propTypes = {
	data: PropTypes.object.isRequired,
	setOTP: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	setSuccessMessageFromDialog: PropTypes.func.isRequired,
	// openDialog: PropTypes.bool.isRequired,
	// num: PropTypes.string.isRequired,
	dialogContent: PropTypes.string.isRequired,
};