/* eslint-disable */
import { Field } from 'react-final-form';

import { TextField as TextFieldFinal } from 'final-form-material-ui';
import {
  Box,
  Grid,
} from '@material-ui/core';

const PasswordConfirmation = () => {
  return (
    <>
      <Box sx={{
        mt: '3%',
        // padding: 2,
      }}>
        <Grid
          container
          spacing={2}
        >
          لقد تم إرسال رمز التحقق إلى جهازك، يرجى إعادة كتابته في خانة رمز الأمان

          <Grid
            item
            xs={12}
            md={12}
          >
            <Field
              sx={{ mb: 2 }}
              fullWidth
              required
              label="رمز الأمان"
              name="oldPassword"
              component={TextFieldFinal}
              type="password"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
            <Field
              sx={{ mb: 2 }}
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
              // sx={{ mb: 1 }}
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PasswordConfirmation;
