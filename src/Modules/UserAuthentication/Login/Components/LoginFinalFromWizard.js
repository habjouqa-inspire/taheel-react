/* eslint-disable */
import { Alert, Box, Button, CircularProgress, Grid, Link, Typography } from '@material-ui/core';
import arrayMutators from "final-form-arrays";
import React from 'react';
import { Form } from 'react-final-form';
import { Link as RouterLink } from 'react-router-dom';
import { LICENSE_FORM_TYPES } from 'src/Core/Utils/enums';

export default class LoginFinalFromWizard extends React.Component {
    static Page = ({ children }) => children;

    constructor(props) {
        super(props);
        this.state = {
            page: props.initialValues.page ? props.initialValues.page : 0,
            values: props.initialValues || {},
            completed: false,
            isNextCallBackFunSuccess: true,
            errMessage: "",
            phone: '',
            iqamaId: '',

        };
    };
    next = (values) => {
        console.log("--- next  ----");
        this.setState((state) => ({
            page: Math.min(state.page + 1, this.props.children.length - 1),
            values
        }));
    }

    previous = () =>
        this.setState((state) => ({
            page: Math.max(state.page - 1, 0)
        }));

    /**
     * NOTE: Both validate and handleSubmit switching are implemented
     * here because 🏁 Redux Final Form does not accept changes to those
     * functions once the form has been defined.
     */

    validate = (values) => {
        console.log("+++++++++++++", this.state.phone, this.state.iqamaId);

        console.log("--- validate  ----");
        const activePage = React.Children.toArray(this.props.children)[
            this.state.page
        ];
        return activePage.props.validate ? activePage.props.validate(values) : {}
    }

    handleSubmit = async (values) => {
        console.log("--- handleSubmit  ----" + this.state.values.formType);
        const errors = this.validate(values);
        if (Object.keys(errors).length > 0)
            return this.validate(values);
        const { children, onSubmit } = this.props;
        const { page } = this.state;
        const isLastPage = page === React.Children.count(children) - 1;
        const activePage = React.Children.toArray(this.props.children)[
            this.state.page
        ];
        if (isLastPage) {
            this.setState((state) => ({
                completed: true
            }));
            if (this.state.values.lastPageErrorHandling) {
                console.log("this.state.values.lastPageErrorHandling");
                const { isSuccessful, message } = await onSubmit(values);
                if (!isSuccessful) {
                    this.setState((state) => ({
                        isNextCallBackFunSuccess: false,
                        errMessage: message
                    }));
                    return;
                }
            }
            return onSubmit(values)
        } else {
            console.log('before if--- activePage.props.nextFun ----')
            if (activePage.props.nextFun) {
                console.log('if--- activePage.props.nextFun ----')
                const { isSuccessful, message } = await activePage.props.nextFun(values);
                if (!isSuccessful) {
                    this.setState((state) => ({
                        isNextCallBackFunSuccess: false,
                        errMessage: message
                    }));
                    return;
                }
            }
            this.setState((state) => ({
                isNextCallBackFunSuccess: true,
                errMessage: ''
            }));
            this.next(values);

        }
    }

    render() {
        const { children, isEnableNextBtn = true, isEnableCancelBtn = false, cancelBtnFn, phone, iqamaId, canShowSection = true } = this.props;
        const childrenArray = React.Children.toArray(children);
        const { page, values, completed, isNextCallBackFunSuccess, errMessage } = this.state;
        const activePage = React.Children.toArray(children)[page];
        const isLastPage = page === React.Children.count(children) - 1;
        return (
            <Form
                initialValues={values}
                //validate={this.validate}
                onSubmit={this.handleSubmit}
                mutators={{
                    // expect (field, value) args from the mutator
                    ...arrayMutators,
                    setValue: ([field, value], state, { changeValue }) => {
                        changeValue(state, field, () => value)
                    }
                }}
            >
                {({ handleSubmit, pristine, form, submitting, values }) => {
                    return (
                        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                            {!isNextCallBackFunSuccess && (
                                <Box mt={3}>
                                    <Alert variant="outlined" severity="error">
                                        {errMessage}
                                    </Alert>
                                </Box>
                            )}
                            {canShowSection ? React.cloneElement(activePage, {
                                setField: form.mutators.setValue,
                                pop: form.mutators.pop,
                                push: form.mutators.push,
                                values: values
                            }) : ""}
                            <Grid container direction="row" spacing={2} mt={1} justifyContent="center">
                                <Grid container direction="row" spacing={2} justifyContent="center" >
                                    {(page > 0 && !this.state.values.disabledBackButt) && (
                                        <Grid item

                                            xs={6}>
                                            <Button
                                                variant="contained"
                                                disabled={page === 1 && this.state.values.formType === LICENSE_FORM_TYPES.RENEW}
                                                onClick={this.previous}
                                                sx={{
                                                    backgroundColor: '#E2E8EB',
                                                    color: '#000',
                                                    borderRadius: '5em',
                                                    width: '95%',
                                                    margin: '0 auto'
                                                }}
                                            >
                                                رجوع
                                            </Button>
                                        </Grid>
                                    )}
                                    {!isLastPage && (
                                        <Grid item
                                            xs={6}>
                                            <Button
                                                startIcon={submitting ? <CircularProgress size="1rem" /> : null}
                                                disabled={!isEnableNextBtn || submitting}
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                sx={{
                                                    backgroundColor: '#3c8084',
                                                    borderRadius: '5em',
                                                    width: '100%',
                                                    margin: '0 auto'
                                                }}
                                            >
                                                التالي
                                            </Button>
                                        </Grid>
                                    )}
                                    {isLastPage && (
                                        <Grid item
                                            alignItems='flex-end'
                                            xs={6}>
                                            <Button
                                                startIcon={submitting ? <CircularProgress size="1rem" /> : null}
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={submitting}
                                                sx={{
                                                    backgroundColor: '#3c8084',
                                                    borderRadius: '5em',
                                                    width: '95%',
                                                    margin: '0 auto',
                                                }}
                                            >
                                                إرسال
                                            </Button>
                                        </Grid>
                                    )}
                                </Grid>
                                {/* </Grid> */}
                            </Grid>
                            <Grid container direction="row" spacing={2} justifyContent="center" >

                                {!isLastPage && (
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
                                                paddingTop: '16px',
                                            }}
                                        >
                                            ليس لديك حساب على المنصة ؟
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="body1"
                                        >
                                            <Link
                                                component={RouterLink}
                                                to="/register"
                                                variant="h6"
                                                sx={{
                                                    textDecoration: 'underline'
                                                }}
                                            >
                                                تسجيل جديد
                                            </Link>

                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="body1"
                                            sx={{
                                                textDecoration: 'underline'
                                            }}
                                        >
                                            <Link href=''
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open('https://hrsd.gov.sa/ar/node/816')
                                                }}
                                               >سياسة الخصوصية</Link>
                                        </Typography>
                                    </Box>
                                )}
                                {isLastPage && (
                                    <Box
                                        textAlign="center"
                                        sx={{
                                            py: 3,
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
                                                paddingBottom: '16px',
                                                cursor: 'pointer',
                                                textDecoration: 'underline'
                                            }}
                                        >
                                            <a
                                                onClick={async () => { const response = requestOTPPhoneNum(iqamaId, phone); }}
                                            >
                                                إعادة ارسال رمز التحقق
                                            </a>
                                        </Typography> */}
                                    </Box>
                                )}


                            </Grid>
                        </form>
                    )
                }}
            </Form>
        )
    }
}
/* eslint-enable */
