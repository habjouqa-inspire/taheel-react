/* eslint-disable */
import {
    Box, Grid,
    Typography
} from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import moment from 'moment';
import Countdown from 'react-countdown';
import { Field } from 'react-final-form';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';

const OwnershipOTP = (props) => {
    const { phoneNumber } = getCurrentUser();
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
             لقد أرسلنا لك رمز التحقق من خلال رسالة نصية. الرجاء إدخاله في الحقل أدناه ثم الضغط على “إرسال الرمز“

                </Typography>
            </Box>
            <Grid
                item
                md={12}
                xs={12}
                spacing={3}

            >
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
            </Grid>
            <Box
                textAlign="center"
                sx={{
                    py: 1,
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    color="textSecondary"
                    variant="body1"
                >
                    {'عدد المحاولات المتبقية ' + props.attemptsNum}
                </Typography>

            </Box>
            <Box
                textAlign="center"
                sx={{
                    py: 1,
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    color="textSecondary"
                    variant="body1"
                >
                    تنتهي صلاحية الرمز في
                    <Countdown zeroPadTime={2} onComplete={() => props.setOtpExpTime(0)} date={moment().add(props.otpExpTime, 'm').toDate()} />,
                </Typography>
            </Box>
            <Box
                textAlign="center"
                sx={{
                    py: 1,
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
                        onClick={() => { props.reSend() }}
                    >
                        إعادة ارسال رمز التحقق
                    </a>
                </Typography>
            </Box>
        </>
    );
};

export default OwnershipOTP;
