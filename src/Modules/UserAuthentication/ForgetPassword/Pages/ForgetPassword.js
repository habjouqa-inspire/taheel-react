/* eslint-disable */
import {
  Box, CardContent, Container,
  Tab, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TabContext, TabList } from '@material-ui/lab';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import DashboardNavbar from 'src/Core/Components/DashboardNavbar';
import MainNavbar from 'src/Core/Components/MainNavbar';
import FinalFromWizard from 'src/Core/Components/wizard/FinalFormWizard';
import { verifyEmailAndIqamaNum } from '../../Registration/API/RegistrationAPI';
import { AbsherOTP, AbsherOTPAuth, ChangePassword } from '../API/ForgetPasswordApi';
import AbsherOtp from '../Components/AbsherOtp';
import CitizenInfo from '../Components/CitizenInfo';
import PasswordConfirmation from '../Components/PasswordConfirmation';
import { absherValidate, CitizenValidate, confirmationValidate } from '../Utils/ForgetPasswordUtils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
  avatarHover: {
    "&:hover": {
      backgroundColor: '#f6a923',
      border: 'solid 5px #f6a923'
    }
  }
}));
const ForgetPassword = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [info, setInfo] = React.useState('');
  const [errMessage, SetErrMessage] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('center');
  const [validUser,setValidUser]=useState(false);
  const [otpAttemps,setOtpAttemps]=useState(3);

  const [avtarColor, setColor] = useState({
    beneficiaryAvatar: '#214256',
    centerAvatar: '#c8d9d9',
    employeeAvatar: '#c8d9d9',
  });

  const navigate = useNavigate();

  const absherOTPRequest = async (values) => {
    const { IqamaNumber } = values;
    setInfo(IqamaNumber);
    const verifyIqamaNum = await verifyEmailAndIqamaNum( {idNumber:IqamaNumber} )
    if(!verifyIqamaNum.isSuccessful){
      setValidUser(true)

    const response = { isSuccessful: true, message: '' };
    const sendOTP = await AbsherOTP(IqamaNumber);
    if (!sendOTP.isSuccessful) {
      SetErrMessage(sendOTP.message);
      return { isSuccessful: false, message: sendOTP.message };
    }
    return response;}
    else{
      setValidUser(false);

      // SetErrMessage(verifyIqamaNum.message);
      return { isSuccessful: true, message: `تشير سجلاتنا بان رقم الهوية/الاقامة غير مسجل` };
    }
  };

  const validateOtp = async (values) => {
    if(otpAttemps===0)return{isSuccessful: false, message: 'إنتهت المحاولات, الرجاء إعادة طلب رمز تحقق'}
    const { AbsherOtp } = values;
    console.log('absher otp api nooor-------------->');
    if(!validUser) {
      setOtpAttemps(otpAttemps-1)
      
      return{isSuccessful: false, message: ''} ;
      ;
  }
    
    const AbsherAuth = await AbsherOTPAuth(info, AbsherOtp);
    if (!AbsherAuth.isSuccessful) {
      SetErrMessage(AbsherAuth.message);
      setOtpAttemps(otpAttemps-1)

      return { isSuccessful: false, message: AbsherAuth.message };
    }
    return { isSuccessful: true, message: '' };
  };

  const onSubmit = async (values) => {
    const { oldPassword, password, passwordConfirmation } = values;
    // const response = { isSuccessful: true, message: '' };
    const changePassword = await ChangePassword(info, oldPassword, password, passwordConfirmation);

    if (!changePassword.isSuccessful) {
      console.log("1111111111111111111", changePassword.message);
      // SetErrMessage("hiiiiiiiiiiiiiiiiiiiiiiiiii");
      SetErrMessage(changePassword.message);
      return { isSuccessful: false, message: changePassword.message };
    }
    handleClickOpen('لقد تم تغيير كلمة السر بنجاح', '');
    return { isSuccessful: true, message: '' };
  };
  const handleClickOpen = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle);
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    navigate('/login', { replace: true }, { state: { selectedAvatar } });
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundSize: "cover"
      }}
    >
      <>
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
              padding: 3,
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
                        setSelectedAvatar('beneficiary'),
                          setColor({ ...avtarColor, beneficiaryAvatar: '#214256', centerAvatar: '#c8d9d9', employeeAvatar: '#c8d9d9' })
                      }
                      } sx={{
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
                </Grid> */}
              </Box>
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography
                  color="textPrimary"
                  variant="h2"
                >
                  إعادة تعيين كلمة السر الخاصة بك
                </Typography>
              </Box>
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
                          setSelectedAvatar('beneficiary'),
                            setColor({ ...avtarColor, beneficiaryAvatar: '#214256', centerAvatar: '#c8d9d9', employeeAvatar: '#c8d9d9' })
                        }
                        } 
                      />
                      <Tab
                        label="المركز"
                        value="center"
                        style={{ width: '50%' }}
                        onClick={() => {
                          setSelectedAvatar('center'),
                            setColor({ ...avtarColor, beneficiaryAvatar: '#c8d9d9', centerAvatar: '#214256', employeeAvatar: '#c8d9d9' })
                        }}
                      />
                    </TabList>
                  </Box>
                </TabContext>
              </Box>
              <br></br>
              <CardContent sx={{ padding: "3px" }}>
                <FinalFromWizard // pass initialValues, onSubmit and 4 childrens
                  initialValues={{
                    disabledBackButt: true,
                    lastPageErrorHandling: true,
                  }}
                  onSubmit={onSubmit}
                >
                  <FinalFromWizard.Page
                    label=""
                    validate={CitizenValidate}
                    nextFun={(values) => absherOTPRequest(values)}
                  >
                    <CitizenInfo />
                  </FinalFromWizard.Page>
                  <FinalFromWizard.Page
                    label=""
                    validate={absherValidate}
                    nextFun={(values) => validateOtp(values)}
                  >
                    <AbsherOtp info={info} validUser={validUser} otpAttemps={otpAttemps} setOtpAttemps={(v)=>setOtpAttemps(v)} />
                  </FinalFromWizard.Page>
                  <FinalFromWizard.Page
                    label=""
                    validate={confirmationValidate}
                  >
                    <PasswordConfirmation />
                  </FinalFromWizard.Page>
                </FinalFromWizard>
              </CardContent>
              <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
            </Box>
          </Container>
        </Box>
      </>
    </Box>
  );
};

// const FinalAbsherPage = ({ values }) => (
//   <>
//     <AbsherOtp
//       values={values}
//     />
//   </>
// );
export default ForgetPassword;
