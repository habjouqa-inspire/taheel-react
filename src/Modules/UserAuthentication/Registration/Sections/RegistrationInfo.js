/* eslint-disable */
import {
  Box,
  Grid
} from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { Field } from 'react-final-form';

const RegistrationInfo = () => {
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

      <Field
        sx={{ my: 3 }}
        fullWidth
        required
        label="البربد الإلكتروني"
        name="email"
        component={TextFieldFinal}
        type="email"
        variant="outlined"
        dir="rtl"
        className="custom-field"
      />

      <Field
        sx={{ mb: 3 }}
        fullWidth
        required
        label="كلمة المرور"
        name="password"
        component={TextFieldFinal}
        type="password"
        variant="outlined"
        dir="rtl"
        className="custom-field"
      />

      <Field
        // sx={{ mb: 3 }}
        fullWidth
        required
        label="تأكيد كلمة المرور"
        name="passwordConfirmation"
        component={TextFieldFinal}
        type="password"
        variant="outlined"
        dir="rtl"
        className="custom-field"
      />
      <Box
        sx={{
          color: 'gray',
          py: 2,
          padding: 2,

        }}
      >
       <ul>
              <li id="EnglishFormat"> استخدام لغة انجليزية فقط </li>

                <li id="digitsNo"> أن تتكون من #8 حقول على الأقل  </li>
                <li id="UpperCase">   أن تحتوي على حرف  صغير عدد #1 على الأقل </li>
                <li id="LowerCase"> أن تحتوي على حرف كبير عدد #1 على الأقل </li>
                <li id="digitExist">  أن تحتوي على رقم عدد #1 على الأقل</li>

                <li id="symbol"> ان تحتوي على رمز #1 على الأقل keyboard symbols </li>
              </ul>
      </Box>
    </>
  );
};

export default RegistrationInfo;
