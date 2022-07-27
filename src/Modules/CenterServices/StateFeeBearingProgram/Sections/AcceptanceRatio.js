import { Alert, Box, Button, CircularProgress, Grid, Link, Typography } from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import TermsDialog from 'src/Core/Components/TermsDialog';
import { ContentField } from '../../FinalLicense/Utils/finalLicenseUtil';
import { calculation } from '../API/StateFeeBearingProgramAPI';
import RequiredNumberOfStaff from '../Utils/RequiredNumberOfStaff';
import { minimumNumberOfStaff } from '../Utils/StateFeeBearingProgramUtils';


const AcceptanceRatio = ({ setField, setIsEnableNextBtn, values }) => {
    const [errMessage, setErrMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [dataLoaded,setDataLoaded] = useState(false);


    useEffect(() => {
        // if (!!values.actualBeneficiariesNum && !!values.acceptanceRatio)
        //     setIsEnableNextBtn(true);
        // else
        setIsEnableNextBtn(false)
    }, [])

    const handleOnChange = () => {
        setIsEnableNextBtn(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const calculate = async () => {
        setErrMessage('');
        setDataLoaded(false)
        setLoading(true)
        const acceptanceRatio = (values?.acceptanceRatio) / 100
        const actualBeneficiariesNum = values?.actualBeneficiariesNum

        console.log("real ratio:", acceptanceRatio)



        if (!values?.acceptanceRatio) {
            setErrMessage('يرجى إدخال نسبة الطلاب');
            setIsEnableNextBtn(false);
            setLoading(false)
            return;
        }

        if (!values?.actualBeneficiariesNum || values?.actualBeneficiariesNum <= 0) {
            setErrMessage('يرجى إدخال عدد المستفيدين الفعلي عدد صحيح أكبر من صفر');
            setIsEnableNextBtn(false);
            setLoading(false)
            return;
        }

        if (parseInt(values?.actualBeneficiariesNum) > parseInt(values?.capacity)) {
            setErrMessage("عدد الطلاب يجب أن يكون أقل من أو يساوي عدد طلاب الطاقة الاستيعابية")
            setIsEnableNextBtn(false);
            setLoading(false)
            return;
        }


        if (parseInt(values?.acceptanceRatio) <= 0 || parseInt(values?.acceptanceRatio) > 100) {
            setErrMessage('يرجى إدخال نسبة صحيحة')
            setIsEnableNextBtn(false);
            setLoading(false)
            return;
        };
        const response = await calculation(actualBeneficiariesNum, acceptanceRatio)

        console.log("calculation APIIIIII", response)

        if (!response?.isSuccessful) {
            setErrMessage(response?.message)
            setLoading(false)
            return;
        }
        else {
            const notValid = minimumNumberOfStaff(values?.customers, response?.responseBody?.result, values)
            if (notValid) {
                setLoading(false)
                setErrMessage('النسبة المدخلة لا تتطابق مع الحد الأدنى من الكوادر يرجى إدخال نسبة صحيحة')
                return;
            }
            else{
                setLoading(false)
                setDataLoaded(true)
                setIsEnableNextBtn(true);
                return;
            }

        }
        // setLoading(false)
        // setIsEnableNextBtn(true);
        // return;
    }
    const termsLabel = (openDialog) => (
        <>
            <Typography gutterBottom variant="h5" component="span">
                عدد المستفيدين المحدد لكل موظف في الكادر
                <Link href="#" sx={{ color: '#147fbd' }}
                    onClick={(event) => {
                        event.preventDefault()
                        openDialog()
                    }
                    }> (للاطلاع على الشروط انقر هنا) </Link>
            </Typography>

        </>
    )

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
                    md={12}
                    xs={12}
                    className="custom-label-field"
                >
                    <Typography>
                        نسبة قبول الطلاب التابعين لبرنامج تحمل الدولة للرسوم
                    </Typography>
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
                        label="عدد المستفيدين الفعلي"
                        name="actualBeneficiariesNum"
                        component={TextFieldFinal}
                        type="text"
                        variant="outlined"
                        dir="rtl"
                        className="custom-field"
                    />
                    <OnChange name="actualBeneficiariesNum">
                        {(value, previous) => {
                            setErrMessage('')
                            setDataLoaded(false)
                            handleOnChange(value, previous);
                            let actualBeneficiariesNum = value.replace(/\D/g, '')
                            actualBeneficiariesNum = actualBeneficiariesNum?.substring(0, 9)
                            setField("actualBeneficiariesNum", actualBeneficiariesNum)
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
                        label="نسبة قبول الطلاب التابعين لبرنامج تحمل الدولة للرسوم"
                        name="acceptanceRatio"
                        component={TextFieldFinal}
                        type="text"
                        variant="outlined"
                        dir="rtl"
                        className="custom-field"
                    />
                    <OnChange name="acceptanceRatio">
                        {(value, previous) => {
                            setErrMessage('')
                            setDataLoaded(false)
                            handleOnChange(value, previous);
                            let acceptanceRatio = value.replace(/\D/g, '')
                            acceptanceRatio = acceptanceRatio?.substring(0, 9)
                            setField("acceptanceRatio", acceptanceRatio)
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
                        تحقق
                    </Button>
                </Grid>
                <Grid item></Grid>
                {dataLoaded && <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                >
                    < ContentField label={'عدد الطلاب المراد تسجيلهم في خدمة تحمل الدولة للرسوم'} value={Math.ceil((values?.acceptanceRatio * values?.actualBeneficiariesNum) / 100)} />
                </Grid>}
                <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                >
                    < ContentField label={termsLabel(handleClickOpen)} />
                </Grid>
                <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                >
                    <Box
                        direction='rtl'
                        className="custom-label-field"
                    >
                        <Alert severity="info" size="small">
                            يتم حسابه من قبل المنصة:
                            (نسبة القبول التي تم إدخالها * عدد المستفيدبن الفعلي) / عدد المستفيدين المحدد لكل موظف في الكادر
                        </Alert>
                    </Box>
                </Grid>
            </Grid>
            <TermsDialog setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)} dialogContent={RequiredNumberOfStaff()} dialogTitle={"الشروط والأحكام"} open={open} onClose={handleClose} acceptBtnName="أوافق" />

        </>

    );

}
export default AcceptanceRatio;

AcceptanceRatio.propTypes = {
    setField: PropTypes.func.isRequired,
    setIsEnableNextBtn: PropTypes.func.isRequired,
    values: PropTypes.object,

};