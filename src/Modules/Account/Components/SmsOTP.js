/* eslint-disable */
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { requestOTPPhoneNum } from '../API/AccountApi';

const SmsOTP = (props) => {
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
          تم إرسال رمز التحقق إلى رقم جوالك
        </Typography>
      </Box>
      <Field
        fullWidth
        required
        label="رمز التحقق"
        name="SmsOTP"
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
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          <a
            onClick={() => requestOTPPhoneNum(props.newNum)}
          >
            إعادة ارسال رمز التحقق
          </a>
        </Typography>
      </Box>
    </>
  );
};

export default SmsOTP;
SmsOTP.propTypes = {
  newNum: PropTypes.string.isRequired,
};