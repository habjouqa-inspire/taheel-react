/* eslint-disable */
import {
    Box, Grid,
    Link,
    Typography
} from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import { useEffect } from 'react';
import { Field } from 'react-final-form';
import { Link as RouterLink } from 'react-router-dom';
import TaheelCaptcha from 'src/Core/Components/TaheelCaptcha';

const CredentialInfo = ({ setIsEnableNextBtn, setCaptcha, setCaptchaFromUser }) => {
useEffect(()=>{
    setIsEnableNextBtn(false)

},[])

    if (process.env.REACT_APP_SHOW_RECAPTCHA != 'true') {
        setIsEnableNextBtn(true)
    }
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
                label="رقم الهوية / الإقامة أو البربد الإلكتروني"
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
            {process.env.REACT_APP_SHOW_RECAPTCHA === 'true' ?
                <Box display="flex"
                    sx={{ marginRight: '13px' }}
                    justifyContent="center"
                    alignItems="center"
                >
                    {/* <ReCaptcha onSucess={(enable) => { setIsEnableNextBtn(enable) }} /> */}
                    {/* <TextCaptcha  onSucess={(enable) => { setIsEnableNextBtn(enable) }}/> */}
                    <TaheelCaptcha
                        onChange={(v, s, success) => { setCaptcha(s), setCaptchaFromUser(v), setIsEnableNextBtn(success) }}
                        placeholder={'الرجاء إدخال الرمز'}
                        onRefresh={() =>{ setCaptcha(''), setCaptchaFromUser(''), setIsEnableNextBtn(false) }}

                    />
                </Box>
                : ''}
            <Box
                textAlign="center"
                sx={{
                    // py: 2,
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    color="textSecondary"
                    variant="body1"
                    sx={{
                        // paddingBottom: '16px',
                        textDecoration: 'underline'
                    }}
                >
                    <Link
                        component={RouterLink}
                        to="/forgetpassword"
                        variant="h6"
                    >
                        نسيت كلمة المرور
                    </Link>
                </Typography>
            </Box>
        </>
    );
};
export default CredentialInfo;
