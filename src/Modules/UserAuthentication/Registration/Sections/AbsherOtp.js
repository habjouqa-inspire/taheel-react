/* eslint-disable */
import {
  Box,
  Grid,
  Skeleton,
  Typography
} from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import moment from 'moment';
import { useState } from 'react';
import Countdown from 'react-countdown';
import { Field } from 'react-final-form';
import { absherSms } from '../API/RegistrationAPI';

const AbsherOtp = (props) => {
  const [otpTime, setOtpTime] = useState(3);
  const [waitingTimer, setWatingTimer] = useState(false);
  const [validTime, setValidTime] = useState(true);

  return (
    <>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          md={12}
        >
        </Grid>
      </Grid>
      <img alt="Absher Logo" style={{ width: '10%', marginRight: '46%' }} src="https://proven-sa.com/wp-content/uploads/2016/09/Absher-logo.png" />
      <Box
        sx={{
          pb: 1,
          pt: 3
        }}
      >
        <Typography
          align="center"
          color="textSecondary"
          variant="body1"
        >
          تم إرسال رمز التحقق إلى رقم جوالك المسجل في أبشر
        </Typography>
      </Box>
     
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
            name="AbsherOtp"
            component={TextFieldFinal}
            type="password"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
        </Grid>


        {!waitingTimer?
        validTime&&props?.otpAttemps!=0 ?
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
            <Countdown daysInHours={true}  zeroPadTime={2} onTick={()=>{setOtpTime((otpTime*60000-1000)/60000);}} onComplete={() => setValidTime(false)} date={moment().add(otpTime, 'm').toDate()} />,
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

        <Grid md={7}>

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
                  paddingLeft: '1px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '13px'
                }}
              >
                <a
                  onClick={async () => {
                    setWatingTimer(true);
                    setValidTime(false);
                 
                    const response = await absherSms(props.data);
                    if(!!response.isSuccessful){
                      setValidTime(true)
                      setWatingTimer(false)
                      props?.setOtpAttemps(3)
                    }
                    console.log('dddddddd',response);
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
      <Box
        textAlign="center"
        sx={{
          py: 2,
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <Typography
          color="textSecondary"
          variant="body1"
          sx={{
            paddingBottom: '14px',
          }}
        >
          لم يصلك رمز التحقق ؟
        </Typography>

        <Typography
          color="textSecondary"
          variant="body1"
          sx={{
            paddingBottom: '14px',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          <a
            onClick={() => absherSms(props.data)}

          >

            إعادة ارسال رمز التحقق
          </a>
        </Typography> */}
           <Typography
      
      color="textSecondary"
      variant="body1"
      sx={{
        fontSize: '13px',
        textAlign:'center'

      }}
    >
      عدد المحاولات المتبقية : {props?.otpAttemps}
    </Typography>
      </Box>
    </>
  );
};

export default AbsherOtp;
