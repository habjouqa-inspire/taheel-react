/* eslint-disable */
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import {
    Grid,
    Box,
    Typography,
} from '@material-ui/core';

const ReasonBox = (props) => {
    return (
        <>
            <Grid
                container
                spacing={5}
                sx={{
                    py: 5,
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Grid
                    item
                    xs={12}
                    md={12}
                >
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
                            {'رقم الموافقة المبدئية ' + props.approvalNum}
                        </Typography>

                    </Box>
                </Grid>
            </Grid>
            <Grid
                item
                md={12}
                xs={12}
            >
                <Field
                    fullWidth
                    required
                    label=" سبب إلغاء الموافقة المبدئية"
                    name="cancelingReason"
                    component={TextFieldFinal}
                    type="text"
                    multiline
                    rows="4"
                    variant="outlined"
                    dir="rtl"
                    className="custom-field"
                />
            </Grid>
        </>
    );
};

export default ReasonBox;
