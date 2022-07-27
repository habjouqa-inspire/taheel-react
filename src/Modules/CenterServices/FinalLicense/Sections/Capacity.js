/* eslint-disable */
import {
	Alert, Box, Button, CircularProgress, Grid, Link, Typography
} from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { useLocation } from 'react-router-dom';
import TermsDialog from 'src/Core/Components/TermsDialog';
import { checkIsNumber } from 'src/Core/Utils/inputValidator';
import { containsOnlynumber } from 'src/Core/Utils/TaheelUtils';
import { calculation } from '../API/finalLicenseAPI';
import { ContentField } from '../Utils/finalLicenseUtil';
import FinancialGuaranteeTerms from './FinancialGuaranteeTerms';

const Capacity = ({ editMode, Condition, values, setField, setIsEnableNextBtn }) => {
	const [open, setOpen] = useState(false);
	const [calculatedData, setCalculatedData] = useState(false);
	const [errMessage, setErrMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const formDraft = location.state ? location.state.formDraft : false;

	useEffect(() => {
		if (values.capacity && !formDraft) {
			setIsEnableNextBtn(true);
			setCalculatedData(true);
		} else {
			setIsEnableNextBtn(false);
		}
	}, []);

	const calculate = async () => {
		setErrMessage('');

		if (!values.beneficiariesNum || !checkIsNumber(values.beneficiariesNum) || values.beneficiariesNum <= 0) {
			setErrMessage('يرجى إدخال عدد المستفيدين الفعلي عدد صحيح أكبر من صفر');
			setIsEnableNextBtn(false);
			return;
		}
		if (!values.buildingArea || !checkIsNumber(values.buildingArea) || values.buildingArea <= 0) {
			setErrMessage('يرجى إدخال مساحة مسطح البناء عدد صحيح أكبر من صفر');
			setIsEnableNextBtn(false);
			return;
		}
		if (!values.basementArea || !checkIsNumber(values.basementArea) || values.basementArea < 0) {
			setErrMessage('يرجى إدخال مساحة القبو عدد صحيح');
			setIsEnableNextBtn(false);
			return;
		}
		if (parseInt(values.buildingArea) <= parseInt(values.basementArea)) {
			setErrMessage('مساحة القبو يجب أن تكون أقل من مساحة مسطح البناء');
			setIsEnableNextBtn(false);
			return
		}

		setLoading(true);
		const response = await calculation(values.buildingArea, values.basementArea);
		const carryingCapacity = response?.responseBody?.body?.carryingCapacity
		if (!response.isSuccessful) {
			setIsEnableNextBtn(false);
			setErrMessage(response.message);
			setCalculatedData(false);
			setLoading(false);

		}
		else {
			setField('capacity', numeral(carryingCapacity).format('00'));
			setField('financialGuarantee', `${numeral(response.responseBody.body.financialGuarantee).format('0,0.00')} ر.س.`);
			setCalculatedData(true);
			setLoading(false);

			if (numeral(carryingCapacity).value() >= 1) {
				setIsEnableNextBtn(true);
				setLoading(false);

			}
			else {
				setIsEnableNextBtn(false);
				setErrMessage('يرجى إدخال عدد المستفيدين الفعلي عدد صحيح أكبر من صفر');
				setLoading(false);

				return;
			}
		}
		if (values.beneficiariesNum > parseInt(numeral(carryingCapacity).value())) {
			setErrMessage('عدد المستفيدين يجب أن لا يتجاوز الطاقة الاستيعابية');
			setIsEnableNextBtn(false);
			setLoading(false);

			return
		}
		setLoading(false);

	}

	const handleClickOpen = (dialogContent, dialogTitle) => {
		setOpen(true);
	};
	const handleClose = (value) => {
		setOpen(false);
	};
	const termsLabel = (openDialog) => (
		<>
			<Typography gutterBottom variant="h5" component="span">
				الضمان المالي
				<Link href="#" sx={{ color: '#147fbd' }}
					onClick={(event) => {
						event.preventDefault()
						openDialog()
					}
					}> (للاطلاع على الشروط والأحكام انقر هنا) </Link>
			</Typography>

		</>
	)

	const handleOnChange = (val, nextVal) => {
		setIsEnableNextBtn(false);
	};

	return (

		<>
			<Grid
				container
				spacing={3}
				mt={3}
			>
				<Grid
					item
					md={12}
					xs={12}
				>
					{errMessage && (
						<Alert variant="outlined" severity="error">
							{errMessage}
						</Alert>
					)}
				</Grid>
				<Grid
					item
					md={6}
					xs={12}
				>
					<Field
						fullWidth
						label="عدد المستفيدين الفعلي"
						required
						name="beneficiariesNum"
						component={TextFieldFinal}
						type="number"
						variant="outlined"
						dir="rtl"
						className="custom-field"
						onKeyPress={e=>containsOnlynumber(e)}
					/>
					<OnChange name="beneficiariesNum">
						{(value, previous) => {
							handleOnChange(value, previous);
						}}
					</OnChange>
				</Grid>
				<Grid
					item
					md={6}
					xs={12}
					className="custom-label-field"
				>
					<Field
						fullWidth
						required
						label="مساحة مسطح البناء"
						name="buildingArea"
						component={TextFieldFinal}
						type="number"
						variant="outlined"
						dir="rtl"
						className="custom-field"
					/>
					<OnChange name="buildingArea">
						{(value, previous) => {
							handleOnChange(value, previous);
						}}
					</OnChange>
				</Grid>
				<Grid
					item
					md={6}
					xs={12}
					className="custom-label-field"
				>
					<Field
						fullWidth
						required
						label="مساحة القبو"
						name="basementArea"
						component={TextFieldFinal}
						type="number"
						variant="outlined"
						dir="rtl"
						className="custom-field"
					/>
					<OnChange name="basementArea">
						{(value, previous) => {
							handleOnChange(value, previous);
						}}
					</OnChange>
				</Grid>

				<Grid
					item
					md={6}
					xs={12}
				>
					<Button
						startIcon={loading ? <CircularProgress size="1rem" /> : null}
						variant='outlined'
						type="button"
						sx={{
							height: 55,
							backgroundColor: 'white',
							width: '100%',
							color: '#3c8084',
							':hover': {
								backgroundColor: '#3c8084',
								color: 'white',
							}
						}}
						onClick={calculate}
					>
						احتساب
					</Button>
				</Grid>
				<Grid
					item
					md={12}
					xs={12}
				>
					<Condition is={calculatedData || editMode}>
						<Grid
							container
							spacing={3}
							mt={3}
							mb={3}
						>
							<Grid
								item
								lg={12}
								md={12}
								xs={12}
							>
								< ContentField label='الطاقة الاستيعابية' value={parseInt(values.capacity)} />
								<Box
									direction='rtl'
									className="custom-label-field"
								>
									<Alert severity="info" size="small">
										يتم حسابه من قبل المنصة:
										(مساحة مسطح البناء - مساحة القبو)/10
									</Alert>
								</Box>
							</Grid>

							<Grid
								item
								lg={12}
								md={12}
								xs={12}
							>
								< ContentField label={termsLabel(handleClickOpen)} value={values.financialGuarantee} />
								<Box
									direction='rtl'
									className="custom-label-field"
								>
									<Alert severity="info" size="small" dir="rtl" >
										يتم حسابه من قبل المنصة: (2000 ريال * عدد حقل "الطاقة الاستيعابية للمركز" ) لكل مستفيد من مراكز الرعاية النهارية أو التأهيل المهني حسب الطاقة الاستيعابية للمركز
									</Alert>
								</Box>
							</Grid>
						</Grid>
					</Condition>
				</Grid>
			</Grid>
			<TermsDialog setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)} setAgreeValue={() => { }} dialogContent={FinancialGuaranteeTerms()} dialogTitle={"الشروط والأحكام"} open={open} onClose={handleClose} acceptBtnName="أوافق" />
		</>
	)
};

export default Capacity;

Capacity.propTypes = {
	Condition: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired,
	setField: PropTypes.func.isRequired,
	setIsEnableNextBtn: PropTypes.func.isRequired,
};