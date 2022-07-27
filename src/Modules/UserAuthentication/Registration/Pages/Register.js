/* eslint-disable */
import {
  Alert, Box, CardContent, Container, Link, Tab, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TabContext, TabList } from '@material-ui/lab';
import React, { useContext, useState } from 'react';
import { Field } from 'react-final-form';
import { Helmet } from 'react-helmet';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { APIRequest } from 'src/Core/API/APIRequest';
import AlertDialog from 'src/Core/Components/AlertDialog';
import DashboardNavbar from 'src/Core/Components/DashboardNavbar';
import MainNavbar from 'src/Core/Components/MainNavbar';
import FinalFromWizard from 'src/Core/Components/wizard/FinalFormWizard';
import localContext from 'src/Core/Contexts/localContext';
import { AbsherOTPAuth, absherSms, AuthOTPPhoneNum, requestOTPPhoneNum, validateCitizenFun, verifyEmailAndIqamaNum } from '../API/RegistrationAPI';
import AbsherOtp from '../Sections/AbsherOtp';
import CitizenInfo from '../Sections/CitizenInfo';
import RegistrationInfo from '../Sections/RegistrationInfo';
import TaheelOtp from '../Sections/TaheelOtp';
import { absherValidate, CitizenValidate, regitrationValidate, TaheelOtpValidate } from '../Utils/utils';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(29),//preivus 40
    height: theme.spacing(29),//preivus 40
  },
  backButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  avatarHover: {
    "&:hover": {
      backgroundColor: '#f6a923',
      border: 'solid 5px #f6a923'
    }
  }
}));

const Register = () => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  let { otp, setOtp } = useContext(localContext);
  const { recipient, setRecipient } = useContext(localContext);
  const [errMessage, setErrMessage] = useState('');
  const [idNum, setIdNum] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [userType, setUserType] = useState("2");
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [is, setIs] = useState(false)
  const [info, setInfo] = React.useState({});
  const [selectedAvatar, setSelectedAvatar] = useState('center');
  const [loading, setLoading] = useState(false);
  const [otpAttemps, setOtpAttemps] = useState(3);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [avtarColor, setColor] = useState({
    beneficiaryAvatar: '#c8d9d9',
    centerAvatar: '#214256',
  });

  const navigate = useNavigate();
  function numberToDay(day) {
    return ('0' + day).slice(-2);
  }
  const validateAPIFunc = async (values) => {
    setErrMessage('')
    setLoading(true)
    const { idNumber, day, month, year } = values;
    setIdNum(idNumber);
    const verifyEmailAndIqamaNumRs = await verifyEmailAndIqamaNum({ idNumber });

    if (!verifyEmailAndIqamaNumRs.isSuccessful) {
      setLoading(false)
      //setErrMessage(verifyEmailAndIqamaNumRs.message)
      return { isSuccessful: false, message: verifyEmailAndIqamaNumRs.message };
    }

    const birthDate = year + '' + numberToDay(month) + numberToDay(day);
    const response = { isSuccessful: true, message: '' };
    const validateCitRs = await validateCitizenFun(idNumber, birthDate);
    if (!validateCitRs.isSuccessful) {
      setLoading(false)
      //setErrMessage(validateCitRs.message)
      return { isSuccessful: false, message: validateCitRs.message };
    }
    const data = validateCitRs.responseBody.data;
    setInfo(data);
    const absherSmsRe = await absherSms(idNumber);
    if (!absherSmsRe.isSuccessful) {
      setLoading(false)
      //setErrMessage(absherSmsRe.message)
      return { isSuccessful: false, message: absherSmsRe.message };
    }
    setLoading(false)
    return absherSmsRe;
  };

  // OTP Checking
  const validateOtp = async (values) => {
    if (otpAttemps === 0) {
      return { isSuccessful: false, message: 'إنتهت المحاولات, الرجاء إعادة طلب رمز تحقق' }

    }
    setErrMessage('')
    setLoading(true)
    const { AbsherOtp } = values;
    const resopnse = { isSuccessful: true, message: '' };
    const AbsherOTPAuthRs = await AbsherOTPAuth(idNum, AbsherOtp);
    if (!AbsherOTPAuthRs.isSuccessful) {
      setOtpAttemps(otpAttemps - 1)

      setLoading(false)
      return { isSuccessful: false, message: AbsherOTPAuthRs.message };
    }
    setLoading(false)
    return AbsherOTPAuthRs;
  };

  const validateEmail = async (values) => {
    setErrMessage('')
    setLoading(true)
    const { email } = values;
    const verifyEmailAndIqamaNumRs = await verifyEmailAndIqamaNum({ email });
    if (!verifyEmailAndIqamaNumRs.isSuccessful) {
      setLoading(false)
      return { isSuccessful: false, message: verifyEmailAndIqamaNumRs.message };
    }
    setLoading(false)
    return { isSuccessful: true, message: '' };
  }
  const onSubmit = async (values) => {
    setErrMessage('')
    setLoading(true)
    if (otpAttemps === 0) {
      setErrMessage(' إنتهت المحاولات, الرجاء طلب إعادة إرسال رمز تحقق')
      return { isSuccessful: false, message: 'إنتهت المحاولات, الرجاء إعادة طلب رمز تحقق' }
    }
    const { taheelOtp, phoneNumber } = values;
    const { idNumber, day, month, year } = values;
    const response = { isSuccessful: true, message: '' };
    setPhoneNum(phoneNumber);
    const birthDate = year + '' + numberToDay(month) + numberToDay(day);
    if (phoneNumber && !taheelOtp && !is) {
      const sendSmsRs = await requestOTPPhoneNum(idNum, phoneNumber);
      if (!sendSmsRs.isSuccessful) {
        setLoading(false)
        return { isSuccessful: false, message: sendSmsRs.message };
      }
      values.isTaheelValidate = true;
      setIs(true);
      return response;
    }

    if (taheelOtp) {

      const validateSmsRs = await AuthOTPPhoneNum(phoneNumber, idNum, taheelOtp);
      if (!validateSmsRs.isSuccessful) {
        setOtpAttemps(otpAttemps - 1)

        setErrMessage(validateSmsRs.message);
        setLoading(false)
        return { isSuccessful: false, message: validateSmsRs.message };
      }
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(300);
      const requestBody = {
        email: values.email,
        nationality: values.nationality,
        idNumIqamaNum: idNumber,
        phoneNumber: values.phoneNumber,
        DOB: birthDate,
        userType: userType,
        userPassword: values.password,
      };
      const url = '/taheel-apis-users-registration-v2';
      const res = await APIRequest({ requestBody, url });
      if (!res.isSuccessful) {
        setLoading(false)
        return { isSuccessful: false, message: res.message };
      }
    }
    setLoading(false)
    handleClickOpen('لقد تم تسجيلك بنجاح', '');
    return { isSuccessful: true, message: '' };
  };

  const Condition = ({ when, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {(value) => (is ? children : null)}
    </Field>
  )
  const Condition2 = ({ when, children, is }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value == is ? children : null)}
    </Field>
  )
  const handleClickOpen = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate('/login', { replace: true });
  };
  return (

    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <MainNavbar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <Box
        sx={{
          backgroundColor: '#fafafa',
          width: '100%',
          height: "100%",
          backgroundSize: "cover"
        }}
      >
        <Container
          maxWidth="sm"
        >
          <Box sx={{
            mt: '2%',
            backgroundColor: 'white',
            borderRadius: 5,
            paddingRight: 3,
            paddingLeft: 3,
            boxShadow: '5px 10px 18px #ecf1f5'
          }}>
            <Box
              className={classes.root}
              sx={{ mb: 5, mr: 1.5 }}
            >

              {/* <Grid container spacing={3} sx={{ margin: "0 auto", width: "auto" }}>
                <Grid item xs={6}>
                  <Avatar
                    className={classes.large + ' ' + classes.avatarHover}
                    onClick={() => {
                      setUserType("4");
                      setSelectedAvatar('beneficiary'),
                        setColor({ ...avtarColor, beneficiaryAvatar: '#214256', centerAvatar: '#c8d9d9', employeeAvatar: '#c8d9d9' })
                    }}
                    sx={{
                      height: '85px', width: '85px', backgroundColor: avtarColor.beneficiaryAvatar, cursor: "pointer"
                    }}
                  >
                    أفراد
                  </Avatar>
                </Grid>
                <Grid item xs={6}>
                  <Avatar
                    className={classes.large + ' ' + classes.avatarHover}
                    onClick={() => {
                      setUserType("2");
                      setSelectedAvatar('center'),
                        setColor({ ...avtarColor, beneficiaryAvatar: '#c8d9d9', centerAvatar: '#214256', employeeAvatar: '#c8d9d9' })

                    }} sx={{
                      height: '85px', width: '85px', backgroundColor: avtarColor.centerAvatar, cursor: "pointer"
                    }}
                  >
                    مركز
                  </Avatar>
                </Grid>
              </Grid> */}
            </Box>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                إنشاء حساب
              </Typography>
            </Box>
            <CardContent sx={{ padding: "30px" }}>
              {errMessage && (
                <Alert variant="outlined" severity="error">
                  {errMessage}
                </Alert>
              )}
              <Box sx={{ width: '100%' }}>
                <TabContext value={selectedAvatar}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                    >
                      <Tab
                        style={{ width: '50%' }}
                        label="المستفيد" value="beneficiary"
                        onClick={() => {
                          if (process.env.REACT_APP_ENABLE_TABES_LOGIN != 'true') {
                            return {}
                          }
                          setUserType("4");
                          setSelectedAvatar('beneficiary'),
                            setColor({ ...avtarColor, beneficiaryAvatar: '#214256', centerAvatar: '#c8d9d9', employeeAvatar: '#c8d9d9' })
                        }}
                      />
                      <Tab
                        label="المركز"
                        value="center"
                        style={{ width: '50%' }}
                        onClick={() => {
                          setUserType("2");
                          setSelectedAvatar('center'),
                            setColor({ ...avtarColor, beneficiaryAvatar: '#c8d9d9', centerAvatar: '#214256', employeeAvatar: '#c8d9d9' })

                        }}
                      />
                    </TabList>
                  </Box>
                </TabContext>
              </Box>
              <br></br>
              <FinalFromWizard // pass initialValues, onSubmit and 4 childrens
                initialValues={{
                  disabledBackButt: true,
                  lastPageErrorHandling: false,
                  agree: [true],
                  isTaheelValidate: false
                }}
                onSubmit={onSubmit}
                enableValidate={true}
                disableSubmit={disableSubmit}
              >
                <FinalFromWizard.Page
                  label="الجنسية والهوية"
                  validate={CitizenValidate}
                  nextFun={(values) => validateAPIFunc(values)}
                >
                  <CitizenInfo
                    Condition={Condition2}
                  />
                </FinalFromWizard.Page>

                <FinalFromWizard.Page
                  nextFun={(values) => validateOtp(values)}
                  validate={absherValidate}
                  label="التحقق من أبشر"
                >
                  <AbsherOtp
                    data={idNum}
                    setOtpAttemps={(s) => { setOtpAttemps(s) }}
                    otpAttemps={otpAttemps}
                    Condition={Condition} />
                </FinalFromWizard.Page>

                <FinalFromWizard.Page label="المعلومات الشخصية"
                  validate={regitrationValidate}
                  nextFun={(values) => validateEmail(values)}
                >
                  <RegistrationInfo
                    Condition={Condition}
                  />
                </FinalFromWizard.Page>

                <FinalFromWizard.Page
                  nextFun={(values) => taheelOTPReq(values)}
                  validate={TaheelOtpValidate}
                  label="هاتف التحقق"

                >
                  <TaheelOtp data={idNum} phoneNum={phoneNum}
                    Condition={Condition}
                    setDisableSubmit={(v) => setDisableSubmit(v)}
                    setOtpAttemps={(s) => { setOtpAttemps(s) }}
                    otpAttemps={otpAttemps}
                    setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}

                  />
                </FinalFromWizard.Page>
              </FinalFromWizard>
            </CardContent>
            <Box
              textAlign="center"
              sx={{
                py: 2,
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                color="textSecondary"
                variant="body1"
                sx={{
                  textDecoration: 'underline'
                }}
              >
                <Link href=''
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://hrsd.gov.sa/ar/node/816')
                  }}
                >سياسة الخصوصية</Link>
              </Typography>
              <Typography
                color="textSecondary"
                variant="body1"
                sx={{
                  paddingTop: '16px',
                }}
              >
                لديك حساب على المنصة ؟
              </Typography>
              <Typography
                color="textSecondary"
                variant="body1"
              >
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="h6"
                  sx={{
                    textDecoration: 'underline'
                  }}
                >
                  تسجيل الدخول
                </Link>
              </Typography>
              <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Register;