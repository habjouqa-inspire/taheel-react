/* eslint-disable */
import {
  Grid, Skeleton, Typography
} from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { Field } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import localContext from '../../../../Core/Contexts/localContext';
import { requestOTPPhoneNum } from '../../Registration/API/RegistrationAPI';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   large: {
//     width: theme.spacing(38),
//     height: theme.spacing(38),
//   },

//   secondaryButton: {
//     "&:hover": {
//       color: 'white'
//     }
//   }
// }));
const LoginOtp = ({ values, iqamaId, phone,otpAttemps ,setOtpAttemps}) => {
  console.log('nooooooooooooooooooooooooooooor  +>>', iqamaId);
  const [validTime, setValidTime] = useState(true);
  // const classes = useStyles();
  const location = useLocation();
  const { users, setUser } = useContext(localContext);
  const [otpTime, setOtpTime] = useState(3);
  const [waitingTimer, setWatingTimer] = useState(false);
useEffect(()=>{
  console.log('test');
  setOtpAttemps(3)
},[])
  return (
    <Grid
      container
      textAlign="center"
      sx={{
        py: 2,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }} >

      <Grid item
        sx={{
          pb: 3,
          pt: 1
        }}
      >
        <Typography
          align="center"
          color="textSecondary"
          variant="body1"
        >
          أدخل رمز التحقق المرسل إلى هاتفك الجوال
        </Typography>
      </Grid>
      <Grid item
        sx={{
          pb: 3,
          pt: 1
        }}
      >
        <Typography
          align="center"
          color="textSecondary"
          variant="body1"
        >
          عدد المحاولات المتبقية : {otpAttemps}
        </Typography>
      </Grid>
      <Grid
        container
        spacing={3}
        sx={
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }
        }
      >
        <Grid
          item
          xs={12}
          md={12}

        >
          <Field
            sx={{
              mb: 3
            }}
            fullWidth
            required
            label="رمز التحقق "
            name="verificationCode"
            component={TextFieldFinal}
            type="password"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
        </Grid>


        {!waitingTimer?
        validTime&&otpAttemps!=0 ?
          <Typography
            color="textSecondary"
            variant="body1"
            sx={
              {
                fontSize: '13px',
              }
            }
          >
            ينتهي في:
            <Countdown daysInHours={true} onTick={()=>{setOtpTime((otpTime*60000-1000)/60000); }} zeroPadTime={2} onComplete={() => setValidTime(false)} date={moment().add(otpTime, 'm').toDate()} />,
          </Typography>
          : <Typography
            color="textSecondary"
            variant="body1"
            sx={
              {
                fontSize: '13px',
              }
            }
          >
            إنتهت صلاحية الرمز
          </Typography>:
          <Grid md={3}><Skeleton
          color="textSecondary"
          variant="body1"
          sx={
            {
              borderRadius:'25px',
              
              fontSize: '13px',
            }
          }
          /></Grid>
          }

        <Grid md={6}>

   {  !waitingTimer? 
       <Grid container >
            <Grid >
              <Typography
                color="textSecondary"
                variant="body1"
                sx={{
                  paddingBottom: '16px',
                  marginRight: '22px',
                  margin: 'auto',
                  textAlign: 'left',
                  fontSize: '13px'


                }}
              >
                لم يصلك رمز التحقق ؟
              </Typography>

            </Grid>

            <Grid>
              <Typography
                color="textSecondary"
                sx={{
                  paddingLeft: '4px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '13px'
                }}
              >
                <a
                  onClick={async () => {
                    setWatingTimer(true);
                    setValidTime(false);
                 
                    const response = await requestOTPPhoneNum(iqamaId, phone);
                    if(!!response.isSuccessful){
                      setValidTime(true)
                      setWatingTimer(false)
                    }
                    console.log('dddddddd',response);
                    setOtpAttemps(3);
                    setOtpTime(3);
                  }
                  }
                >
                  إعادة ارسال رمز التحقق
                </a>
              </Typography>
            </Grid>
          </Grid>:<Skeleton
           color="textSecondary"
           variant="body1"
           sx={
             {
               borderRadius:'25px',
               maxWidth:'240px',
               fontSize: '13px',
             }
           }
          />}
        </Grid>
      </Grid>
    </Grid>

  );
};

export default LoginOtp;
