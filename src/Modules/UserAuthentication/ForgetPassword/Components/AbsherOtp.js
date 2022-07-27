/* eslint-disable */
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { AbsherOTP } from '../API/ForgetPasswordApi';

const AbsherOtp = (props) => {

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
          عدد المحاولات المتبقية : {props?.otpAttemps}
        </Typography>
      </Box>
      <Field
        fullWidth
        required
        label="رمز التحقق"
        name="AbsherOtp"
        component={TextFieldFinal}
        type="text"
        variant="outlined"
        dir="rtl"
        className="custom-field"
      />
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
            paddingBottom: '16px',
          }}
        >
          لم يصلك رمز التحقق ؟
        </Typography>

        <Typography
          color="textSecondary"
          variant="body1"
          sx={{
            paddingBottom: '16px',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          <a
           onClick={() => {props.validUser?AbsherOTP(props.info):props?.setOtpAttemps(3)}}
          >
            إعادة ارسال رمز التحقق
          </a>
        </Typography>
      </Box>
    </>
  );
};

export default AbsherOtp;
AbsherOTP.propTypes = {
  values: PropTypes.object.isRequired,
};