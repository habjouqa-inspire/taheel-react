/* eslint-disable */
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
  InputAdornment,
  Skeleton,
} from '@material-ui/core';
import { requestOTPPhoneNum } from '../API/RegistrationAPI';
import moment from 'moment';
import Countdown from 'react-countdown';



const TaheelOtp = ({ Condition, data, phoneNum, otpAttemps, setOtpAttemps, setDisableSubmit }) => {
  const [otpTime, setOtpTime] = useState(3);
  const [waitingTimer, setWatingTimer] = useState(false);
  const [validTime, setValidTime] = useState(true);
  useEffect(() => {
    setOtpAttemps(3)
  }, [])

  return (
    <>
      <Grid
        container
        spacing={3}
      >
      </Grid>
      <Box
        sx={{
          pb: 1,
          pt: 3,
          mt: 8
        }}
      >
        <Typography
          align="center"
          color="textSecondary"
          variant="body1"
        >
          الرجاء إدخال رقم الهاتف الجوال الذي سيتم ارسال رمز التحقق له
          عند تسجيل الدخول في كل مره
        </Typography>
      </Box>
      <Field
        sx={{ my: 3 }}
        fullWidth
        required
        label="رقم الجوال"
        name="phoneNumber"
        component={TextFieldFinal}
        type="text"
        variant="outlined"
        dir="rtl"
        className="custom-field"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              | 966+
            </InputAdornment>
          ),
        }}
      />
      <Condition when="phoneNumber">
        {/* {(props && props.counter === 0) && */}
        <Box>

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
              <Typography
                color="textSecondary"
                variant="body1"
              >
                أدخل رمز التحقق المرسل إلى هاتفك الجوال :
              </Typography>
              <br></br>

              <Typography />
              <Field
                sx={{
                  mb: 3
                }}
                fullWidth
                required
                label="رمز التحقق "
                name="taheelOtp"
                component={TextFieldFinal}
                type="password"
                variant="outlined"
                dir="rtl"
                className="custom-field"
              />
            </Grid>


            {!waitingTimer ?
              otpAttemps != 0 && validTime ?
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
                  <Countdown daysInHours={true} onTick={() => { setOtpTime((otpTime * 60000 - 1000) / 60000); }} zeroPadTime={2} onComplete={() => setValidTime(false)} date={moment().add(otpTime, 'm').toDate()} />,
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
                </Typography> :
              <Grid md={3}><Skeleton
                color="textSecondary"
                variant="body1"
                sx={
                  {
                    borderRadius: '25px',

                    fontSize: '13px',
                  }
                }
              /></Grid>
            }


            <Grid md={7}>

              {!waitingTimer ?
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
                          const response = await requestOTPPhoneNum(data, phoneNum);
                          if (!!response.isSuccessful) {
                            setValidTime(true)
                            setOtpAttemps(3);
                            setWatingTimer(false)
                          }
                          console.log('dddddddd', response);
                          setOtpTime(3);
                        }
                        }
                      >
                        إعادة ارسال رمز التحقق
                      </a>
                    </Typography>
                  </Grid>
                </Grid> : <Skeleton
                  color="textSecondary"
                  variant="body1"
                  sx={
                    {
                      borderRadius: '25px',
                      maxWidth: '240px',
                      fontSize: '13px',
                    }
                  }
                />}
            </Grid>

          </Grid>
          <Typography

            color="textSecondary"
            variant="body1"
            sx={{
              fontSize: '13px',
              textAlign: 'center'

            }}
          >
            عدد المحاولات المتبقية : {otpAttemps}
          </Typography>
          {/* {error} */}
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
                paddingBottom: '16px',
              }}
            >
              لم يصلك رمز التحقق ؟
            </Typography>

            <Typography
              color="textSecondary"
              variant="body1"
              sx={{
                cursor: 'pointer',

              }}
            >
              <a
                onClick = {()=> requestOTPPhoneNum(data, phoneNum)}
              >
                إعادة ارسال رمز التحقق
              </a>
            </Typography> */}
          </Box>
        </Box>
      </Condition>
      {/* } */}
    </>
  );
};

export default TaheelOtp;
TaheelOtp.propTypes = {
  Condition: PropTypes.func.isRequired,
};