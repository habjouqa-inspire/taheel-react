import { Alert, Box, Divider, FormControl, FormControlLabel, Grid, Link, Typography } from '@material-ui/core';
import { Checkbox, TextField as TextFieldFinal } from 'final-form-material-ui';
import moment from 'moment-hijri';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { useNavigate } from 'react-router';
import AlertDialog from 'src/Core/Components/AlertDialog';
import Calendar from 'src/Core/Components/calendar';
import TermsDialog from 'src/Core/Components/TermsDialog';
import { getTerms } from '../../API/ServicesApi';
import TermsContent from '../../TemporaryLicense/Sections/TermsContent';



const SuspendFlow = ({ values, setField, errMessage, popUp, setIsEnableCancelBtn }) => {

    const [termsAndConditions, setTermsAndConditions] = useState("")
    const sectionTitle = values?.isExtend ?
        "بيانات تمديد تعليق العمل"
        : "بيانات تعليق العمل"
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const getTermsForSuspend = async () => {

        const res = await getTerms({ centerType: values?.centerType, requestTypeID: 15 })
        if (!res.isSuccessful) {
            console.log("SuspendFlow::getTerms::resError", res.msg)
            return
        }
        console.log("SuspendFlow::getTerms::res", res?.responseBody?.data?.pledgeContent)
        setTermsAndConditions(res?.responseBody?.data?.pledgeContent)
        return
    }

    useEffect(async () => {
        setIsEnableCancelBtn(true)
        await getTermsForSuspend()
        console.log("errMessage", errMessage)
    }, [])

    const handleClickOpen = (dialogContent, dialogTitle) => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const termsLabel = (openDialog) => (
        <>
            <Typography gutterBottom variant="h5" component="span">
                أنا أقر وأتعهد بالإلتزام بالشروط والأحكام الواردة والمتعلقة بالطلب
                <Link href="#" sx={{ color: '#147fbd' }}
                    onClick={(event) => {
                        event.preventDefault()
                        openDialog()
                    }
                    }> (للاطلاع على الشروط والأحكام انقر هنا)</Link>
            </Typography>

        </>
    )

    return (
        <>
            {popUp && <><AlertDialog dialogContent={popUp} dialogTitle={""} open={!!popUp} onClose={() => navigate('/center-services/suspendlandingpage', { replace: true })} acceptBtnName="تم" /></>}
            <Grid container>
                <Grid item sm={11} style={{ paddingBottom: "20px", paddingTop: '20px' }}>
                    <Typography> {sectionTitle}</Typography>
                    <Divider />
                    {errMessage && (
                        <Box >
                            <Alert severity="error">
                                {errMessage}
                            </Alert>
                        </Box>
                    )}
                </Grid>
                <Grid item sm={11} style={{ paddingBottom: "20px", paddingTop: '20px' }}>
                    <Typography>من :</Typography></Grid>
                <Grid item sm={11} style={{ paddingBottom: "20px", paddingTop: '20px' }}>
                    <Calendar
                        disabled={!!values?.isExtend}
                        gridSize={10}
                        fieldName="FromDate"
                        yearCalender={{
                            start: moment().format('iYYYY'),
                            end: Number.parseInt(moment().format('iYYYY')) + 15
                        }} />
                </Grid>

                <Grid item sm={11} style={{ paddingBottom: "20px", paddingTop: '20px' }}>
                    <Typography>الى :</Typography></Grid>
                <Grid item sm={11} style={{ paddingBottom: "20px", paddingTop: '20px' }}>
                    <Calendar
                        disabled={false}
                        gridSize={10}
                        fieldName="ToDate"
                        yearCalender={{
                            start: moment().format('iYYYY'),
                            end: Number.parseInt(moment().format('iYYYY')) + 15
                        }} />
                </Grid>
                <Grid item sm={11} style={{ paddingBottom: "20px", paddingTop: '20px' }}>
                    <Field
                        fullWidth
                        required
                        label={values?.isExtend ?
                            "أسباب تمديد تعليق العمل"
                            : "أسباب تعليق العمل"}
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
                <Grid item sm={11} style={{ paddingBottom: "20px", paddingTop: '20px' }}>
                    <Field name="agree[0]" mt={3}>
                        {({ meta }) => ( // eslint-disable-line no-unused-vars
                            <FormControl component="fieldset" error={meta.error} required>
                                <FormControlLabel
                                    label={termsLabel(handleClickOpen)}
                                    control={
                                        <Field
                                            name="agree[0]"
                                            component={Checkbox}
                                            type="checkbox"

                                        />
                                    }
                                />
                            </FormControl>
                        )}
                    </Field>
                </Grid>
                <Grid item sm={11} style={{ paddingBottom: "20px", paddingTop: '20px' }}>

                </Grid>

            </Grid>
            <Grid
                container
                lg={12}
                md={12}
                xs={12}
                mt={3}
            >
                <TermsDialog setAgreeValue={
                    () => {
                        setField("agree", [true])
                    }
                } dialogContent={TermsContent(termsAndConditions)} dialogTitle={"التعهد"} open={open} setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)} onClose={handleClose} acceptBtnName="أوافق" />
            </Grid>
        </>)
}


export default SuspendFlow;

SuspendFlow.propTypes = {
    values: PropTypes.object,
    setField: PropTypes.func,
    setIsEnableCancelBtn: PropTypes.func,
    errMessage: PropTypes.string,
    popUp: PropTypes.string
};