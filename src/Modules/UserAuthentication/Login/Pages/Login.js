/* eslint-disable */
import {
  Alert, Box, CardContent, Container,
  Grid, Tab, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TabContext, TabList } from '@material-ui/lab';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardNavbar from 'src/Core/Components/DashboardNavbar';
import MainNavbar from 'src/Core/Components/MainNavbar';
import { setAlignmentFlag, setCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { AuthOTPPhoneNum, requestOTPPhoneNum } from 'src/Modules/UserAuthentication/Registration/API/RegistrationAPI';
import localContext from '../../../../Core/Contexts/localContext';
import LoginRequest from '../API/LoginApi';
import CredentialInfo from '../Components/CredentialInfo';
import LoginFinalFromWizard from '../Components/LoginFinalFromWizard';
import { CredentialValidation, smsOtpValidate } from '../Utils/LoginUtils';
import LoginOtp from './LoginOtp';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(19),//preivus values 38
    height: theme.spacing(19),//preivus values 38
  },

  avatarHover: {
    "&:hover": {
      backgroundColor: '#f6a923',
      border: 'solid 5px #f6a923'
    }
  },

  secondaryButton: {
    "&:hover": {
      color: 'white'
    }
  }
}));

const Login = () => {
  const navigate = useNavigate();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { users, setUser } = useContext(localContext);
  const [errMessage, SetErrMessage] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('center');
  const [userType, setUserType] = useState("1");
  const [phone, setPhone] = useState('');
  const [iqamaId, setIqamaId] = useState('');
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const [hasCentersToBeMigrated, setHasCentersToBeMigrated] = useState('');
  const [otpAttemps, setOtpAttemps] = useState(3);
  const [isEnableNextBtn, setIsEnableNextBtn] = useState(false)
  const [captcha, setCaptcha] = useState();
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const [captchaFromUser, setCaptchaFromUser] = useState();
  const prevPath = location.state?.prevPath;
  const classes = useStyles();
  const [avtarColor, setColor] = useState({
    // rightAvatar: '#c8d9d9',
    // leftAvatar: '#c8d9d9',
    beneficiaryAvatar: '#c8d9d9',
    centerAvatar: '#214256',
    employeeAvatar: '#c8d9d9',
  });
  const validateLoginReq = async (values) => {
    if (!captchaFromUser)
      return { isSuccessful: false, message: 'الرجاء إدخال الرمز' }
    const { email, password } = values;
    console.log('dataaaaaaaaaaaaaa', email, password);
    const LoginReq = await LoginRequest(email, password, userType, captcha, captchaFromUser);
    if (!LoginReq.isSuccessful) {
      setResetCaptcha(true)
      return { isSuccessful: false, message: LoginReq.message };
    }
    const userRes = LoginReq.responseBody.data.user;
    if (process.env.REACT_APP_SHOW_OTP != 'true') {
      setUser(userRes)
      setCurrentUser(userRes);
      setAlignmentFlag(hasCentersToBeMigrated)
      navigate(!!prevPath ? prevPath + location.state?.search : '/app/dashboard');
      return {}
    }
    if (LoginReq.responseBody.data.hasCentersToBeMigrated === true) {
      setHasCentersToBeMigrated(LoginReq.responseBody.data.hasCentersToBeMigrated)
    }
    setPhone(userRes.phoneNumber);
    setIqamaId(userRes.idNumIqamaNum);
    if (LoginReq.isSuccessful) {
      const sendSmsRs = await requestOTPPhoneNum(userRes.idNumIqamaNum, userRes.phoneNumber);
      if (!sendSmsRs.isSuccessful) {
        return { isSuccessful: false, message: sendSmsRs.message };
      }
      const otp = sendSmsRs.responseBody.data.OTP;
      setOtp(otp);
      setUser(userRes)
      if (!sendSmsRs.isSuccessful) {
        // SetErrMessage(sendSmsRs.message);
        return { isSuccessful: false, message: sendSmsRs.message };
      }
    }
    return LoginReq;
  };

  const onSubmit = async (values) => {
    // if (values.verificationCode == otp || values.verificationCode == '000000') {
    console.log("++++++++2+++++", phone, iqamaId);
    if (otpAttemps === 0) {
      SetErrMessage('إنتهت المحاولات, الرجاء إعادة طلب رمز تحقق')
      return { isSuccessful: false, message: 'إنتهت المحاولات, الرجاء إعادة طلب رمز تحقق' }
    }
    const OTPAuth = await AuthOTPPhoneNum(phone, iqamaId, values.verificationCode);
    if (!OTPAuth.isSuccessful) {
      SetErrMessage(OTPAuth.message);
      if (otpAttemps != 0) {
        setOtpAttemps(otpAttemps - 1)
      } else setOtpAttemps(0)
      return { isSuccessful: false, message: OTPAuth.message };
    }
    setCurrentUser(users);
    setAlignmentFlag(hasCentersToBeMigrated)
    navigate(!!prevPath ? prevPath + location.state?.search : '/app/dashboard');
    // }
    return true;
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
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
        <Container maxWidth="sm">
          <Box sx={{
            mt: '2%',
            backgroundColor: 'white',
            borderRadius: 5,
            paddingRight: 3,
            paddingLeft: 3,
            boxShadow: '5px 10px 18px #ecf1f5'
          }}>
            <Grid
              container
            >
              <Grid
                item
                xs={12}
                md={12}
              >
                <Box
                  className={classes.root}
                  sx={{ mb: 5, mr: 1.5 }}
                >

                  {/* <Grid container spacing={3} sx={{ margin: "0 auto", width: "auto" }}>
                    <Grid item xs={4}>
                      <Avatar
                        className={classes.large + ' ' + classes.avatarHover}
                        onClick={() => {
                          setUserType("2");
                          setSelectedAvatar('beneficiary'),
                            setColor({ ...avtarColor, beneficiaryAvatar: '#214256', centerAvatar: '#c8d9d9', employeeAvatar: '#c8d9d9' })
                        }
                        }
                        sx={{
                          height: '85px', width: '85px', backgroundColor: avtarColor.beneficiaryAvatar, cursor: "pointer"
                        }}
                      >
                        أفراد
                      </Avatar>
                    </Grid>
                    <Grid item xs={4}>
                      <Avatar
                        className={classes.large + ' ' + classes.avatarHover}
                        onClick={() => {
                          setUserType("1");
                          setSelectedAvatar('center'),
                            setColor({ ...avtarColor, beneficiaryAvatar: '#c8d9d9', centerAvatar: '#214256', employeeAvatar: '#c8d9d9' })
                        }}

                        sx={{
                          height: '85px', width: '85px', backgroundColor: avtarColor.centerAvatar, cursor: "pointer"
                        }}
                      >
                        مركز
                      </Avatar>
                    </Grid>
                    <Grid item xs={4}>
                      <a href={`https://${process.env.REACT_APP_APPIAN_URL}/suite/sites/takamol-taheel/page/request-Records`} target="_blank">
                        <Avatar
                          className={classes.large + ' ' + classes.avatarHover}
                          onClick={() => {
                            setUserType("1");
                            setSelectedAvatar('employee'),
                              setColor({ ...avtarColor, beneficiaryAvatar: '#c8d9d9', centerAvatar: '#c8d9d9', employeeAvatar: '#214256' })
                          }}
                          sx={{
                            height: '85px', width: '85px', backgroundColor: avtarColor.employeeAvatar, cursor: "pointer"
                          }}
                        >
                          موظف
                        </Avatar>
                      </a>
                    </Grid>
                  </Grid> */}
                </Box>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    تسجيل دخول
                  </Typography>





                </Box>
              </Grid>
            </Grid>
            <CardContent sx={{ padding: "0px" }}>
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
                        style={{ width: '30%' }}
                        label="المستفيد" value="beneficiary"
                        onClick={() => {
                          if (process.env.REACT_APP_ENABLE_TABES_LOGIN != 'true') {
                            return {}
                          }
                          setUserType("2");
                          setSelectedAvatar('beneficiary'),
                            setColor({ ...avtarColor, beneficiaryAvatar: '#214256', centerAvatar: '#c8d9d9', employeeAvatar: '#c8d9d9' })
                        }
                        }
                      />
                      <Tab
                        label="المركز"
                        value="center"
                        style={{ width: '30%' }}
                        onClick={() => {
                          setUserType("1");
                          setSelectedAvatar('center'),
                            setColor({ ...avtarColor, beneficiaryAvatar: '#c8d9d9', centerAvatar: '#214256', employeeAvatar: '#c8d9d9' })
                        }}
                      />
                      <Grid
                        sx={{ color: 'white' }}>
                        <a
                          style={{ color: 'black' }}
                          href={process.env.REACT_APP_ENABLE_TABES_LOGIN === 'true' && `https://${process.env.REACT_APP_APPIAN_URL}/suite/sites/takamol-taheel/page/request-Records`} target="_blank">
                          <Tab
                            label="موظف"
                            value="center"
                            style={{ width: '30%' }}
                            onClick={() => {
                              if (process.env.REACT_APP_ENABLE_TABES_LOGIN != 'true') {
                                return {}
                              }
                              setUserType("1");
                              setSelectedAvatar('center'),
                                setColor({ ...avtarColor, beneficiaryAvatar: '#c8d9d9', centerAvatar: '#214256', employeeAvatar: '#c8d9d9' })
                            }}
                          />
                        </a>
                      </Grid>
                    </TabList>
                  </Box>
                </TabContext>
              </Box>
              <LoginFinalFromWizard // pass initialValues, onSubmit and 4 childrens
                initialValues={{
                  disabledBackButt: false,
                  lastPageErrorHandling: false,
                  agree: [false],
                  isTaheelValidate: false,
                }}
                setIsEnableNextBtn={(isEnableNextBtn) => setIsEnableNextBtn(isEnableNextBtn)}
                isEnableNextBtn={isEnableNextBtn}
                phone={phone}
                iqamaId={iqamaId}
                onSubmit={onSubmit}
                setOtpAttemps={(v) => setOtpAttemps(v)}
              >
                <LoginFinalFromWizard.Page
                  label=""
                  validate={CredentialValidation}
                  setIsEnableNextBtn={(isEnableNextBtn) => setIsEnableNextBtn(isEnableNextBtn)}
                  nextFun={(values) => validateLoginReq(values)}
                >
                  <CredentialInfo
                    setIsEnableNextBtn={(isEnableNextBtn) => setIsEnableNextBtn(isEnableNextBtn)}
                    setCaptcha={(v) => setCaptcha(v)}
                    resetCaptcha={resetCaptcha}
                    setCaptchaFromUser={(v) => setCaptchaFromUser(v)}
                  />
                </LoginFinalFromWizard.Page>

                {process.env.REACT_APP_SHOW_OTP === 'true' &&
                  <LoginFinalFromWizard.Page
                    validate={smsOtpValidate}
                    label=""
                    phone={phone}
                    iqamaId={iqamaId}
                  >
                    <LoginOtp
                      phone={phone}
                      iqamaId={iqamaId}
                      setOtpAttemps={(v) => setOtpAttemps(v)}
                      otpAttemps={otpAttemps}
                    />
                  </LoginFinalFromWizard.Page>
                }
              </LoginFinalFromWizard>
            </CardContent>
            {/* <Box
            textAlign="center"
            sx={{
              py: 2,
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          </Box> */}
          </Box>
        </Container >
      </Box >
    </>
  );
};

export default Login;



