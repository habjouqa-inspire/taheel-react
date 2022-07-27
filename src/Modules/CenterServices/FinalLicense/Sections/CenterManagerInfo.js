import { Button, CircularProgress, Grid, Skeleton, Typography } from "@material-ui/core";
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import Calendar from 'src/Core/Components/calendar';
import { containsOnlynumber } from "src/Core/Utils/TaheelUtils";
import { validateCitizenFunc } from "../../API/ServicesApi";
import FileUploaderComp from '../Components/FileUploader';
const CenterManagerInfo = ({ setField, values, Condition, setIsEnableNextBtn, setErrMessage }) => {
    const [loading, setLoading] = useState(false);
    const [checkData, setCheckData] = useState(false);
    const [checkValied, setCheckValied] = useState(false);
    const [circleloading, setCircleLoading] = useState(values.fromRenewal ? true : false);
    const [disableFields, setDisableFields] = useState(values.fromRenewal);
    // const [idTitle, setIdTitle] = useState("");
    let errMsg;
    useEffect(async () => {
        setIsEnableNextBtn(false)
        setCircleLoading(true);
        setErrMessage('')
        if (values.fromRenewal && values.targetedBenificiray != '11') {

            const getCenterManagerInfo = await validateCitizenFunc({ idNumber: values.IDNo, birthDate: values.managerBOD, checkGovermental: false });
            if (!getCenterManagerInfo.isSuccessful) {
                errMsg = true;
                setErrMessage(getCenterManagerInfo.message)

            } else (setCircleLoading(false)
            )

        }
        // if (values.type === '08') {
        //     setIdTitle("الهوية الوطنية لمديرة المركز")
        // }
        // else {
        //     setIdTitle("الهوية الوطنية  لمدير/ة المركز المرشح/ة")
        // }
        if ((values.type === '08' || values.centerType === '08') && values.targetedBeneficiary === "11")
            errMsg ? setIsEnableNextBtn(false) : setIsEnableNextBtn(true);
        else {

            setIsEnableNextBtn(false);
        }
        if (values.inHouseHspit) {
            setField("idNumber", values.idNumber)
        }

        if (values.fullName && (values.idNumber || values.IDNo) && values.managerBD?.year && values.managerBD?.month && values.managerBD?.day) {
            setCheckData(true)
            setLoading(false)
            errMsg ? setIsEnableNextBtn(false) : setIsEnableNextBtn(true);
        } else if (!values.inHouseHspit) {
            setCheckData(false)
            setIsEnableNextBtn(false)
        }
        setCircleLoading(false);

    }, [])

    function numberToDay(day) {
        return ('0' + day).slice(-2);
    }
    function numberToBirthDate(birthOfDate) {
        var year = Number(birthOfDate.substr(0, 4));
        var month = Number(birthOfDate.substr(4, 2));
        var day = Number(birthOfDate.substr(6, 2));
        return day + '/' + month + '/' + year
    }


    const checkManagerInfo = async () => {
        setLoading(true);
        setErrMessage('');

        if (!values.IDNo) {
            setLoading(false);
            setErrMessage('يرجى إدخال رقم الهوية');
            return
        }
        if (values.IDNo.length != 10) {
            setErrMessage("تشير سجلاتنا أن رقم الهوية / الإقامة المُدخَل غير صحيح. الرجاء التأكد من صحة الرقم.");
            setLoading(false);
            return;
        }
        if (!values.IDNo.startsWith('1')) {
            setErrMessage('تشير سجلاتنا أن صاحب الهوية غير سعودي/سعودية الجنسية');
            setLoading(false)
            return;
        }
        if (!values.managerBD?.year || !values.managerBD?.month || !values.managerBD?.day) {
            setLoading(false)
            setErrMessage('يرجى إدخال تاريخ الميلاد');
            return
        }
        const managerBD = values.managerBD.year + '' + values.managerBD.month + '' + values.managerBD.day + '';

        const getCenterManagerInfo = await validateCitizenFunc({ idNumber: values.IDNo, birthDate: managerBD, checkGovermental: false });
        if (!getCenterManagerInfo.isSuccessful) {
            setErrMessage(getCenterManagerInfo.message)
            setLoading(false)
            setCheckData(false)
            return;

        } else {
            const { firstName, secondName, thirdName, fourthName } = getCenterManagerInfo.responseBody.data.name;
            const birthOfDate = getCenterManagerInfo.responseBody.data.birthDate;
            const BOD = numberToBirthDate(birthOfDate)
            const Gender = getCenterManagerInfo.responseBody.data.gender === "f" ? "إناث" : "ذكور"
            if ((values.type === '08' || values.centerType === '08') && Gender != "إناث") {

                setErrMessage("تشير سجلاتنا أن صاحب الهوية ليست امرأة")
                setLoading(false)
                return;
            }

            setField('fullName', firstName + ' ' + secondName + ' ' + thirdName + ' ' + fourthName)
            setField('idNumber', getCenterManagerInfo.responseBody.data.idNumber)
            setField("birthDate", BOD)
            setField("gender", Gender)
            setCheckData(true)
            setLoading(false)
            setIsEnableNextBtn(true)
            return;
        }

    };

    var multipleFileDocs = [];
    const setDocument = (name, docID, multipleFile) => {
        if (!multipleFile) setField(name, [docID]);
        else {
            multipleFileDocs.push(docID);
            setField(name, multipleFileDocs);
        }
    };
    const clearDataAndEnableFields = () => {
        setErrMessage('');
        setField('fullName', null)
        setField('idNumber', null)
        setField("birthDate", null)
        setField("gender", null)
        setField("CV", null)
        setField("educationalQualifications", null)
        setCheckData(false)
        setLoading(false)
        setIsEnableNextBtn(false)
        setDisableFields(false);
    }
    const handleOnChange = () => {
        setField('fullName', null)
        setField('idNumber', null)
        setField("birthDate", null)
        setField("gender", null)
        setField("CV", null)
        setField("educationalQualifications", null)
        setCheckData(false)
        setLoading(false)
        setIsEnableNextBtn(false)
    }
    return (
        <>

            <Grid container spacing={3} mt={3}>
                <Grid
                    item
                    md={12}
                    xs={12}
                    className="custom-label-field"
                >
                    <Typography variant="h4" component="div">{values.inHouseHspit}</Typography>
                </Grid>
                {values.inHouseHspit ? <> <Grid container md={12} xs={12} spacing={3}>
                    <Grid item md={12} xs={12}></Grid>
                    <Grid item md={6} xs={12}>

                        {!circleloading ? <Field
                            fullWidth
                            required
                            label="رقم الهوية الوطنية"
                            name="idNumber"
                            component={TextFieldFinal}
                            type="Text"
                            variant="outlined"
                            onKeyPress={e => containsOnlynumber(e)}

                            dir="rtl"
                            className="custom-field"
                            disabled
                        /> : <Skeleton />}
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Field
                            fullWidth
                            required
                            label="تاريخ الميلاد"
                            name="birthDate"

                            component={TextFieldFinal}
                            type="text"
                            variant="outlined"
                            dir="rtl"
                            className="custom-field"
                            disabled
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Field
                            fullWidth
                            required
                            label="الاسم"
                            name="fullName"
                            component={TextFieldFinal}
                            type="text"
                            variant="outlined"
                            dir="rtl"
                            className="custom-field"
                            disabled
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Field
                            fullWidth
                            required
                            label="الجنس"
                            name="gender"
                            component={TextFieldFinal}
                            type="text"
                            variant="outlined"
                            dir="rtl"
                            className="custom-field"
                            disabled
                        />
                    </Grid>
                </Grid>
                    <Grid item md={12} xs={12}></Grid>
                    <Grid container md={12} xs={12} spacing={3}>
                        <Grid item md={6} xs={12}>
                            <Field
                                label="إرفاق السيرة الذاتية"
                                name="CV"
                                component={FileUploaderComp}
                                multipleFile={false}
                                setField={setField}
                                disabled={disableFields}

                                setDocument={setDocument}
                                values={values}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Field
                                label=" إرفاق المؤهل التعليمي"
                                name="educationalQualifications"
                                component={FileUploaderComp}
                                multipleFile={false}
                                setField={setField}
                                disabled={disableFields}

                                setDocument={setDocument}
                                values={values}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Field
                                label="إرفاق تقرير طبي"
                                name="medicalReport"
                                component={FileUploaderComp}
                                multipleFile={false}
                                disabled={disableFields}

                                setField={setField}
                                setDocument={setDocument}
                                values={values}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Field
                                label="إرفاق شهادة إتمام دورة إلاسعافات ألاولية"
                                name="firstAidCourseCompletionCertificate"
                                component={FileUploaderComp}
                                multipleFile={false}
                                setField={setField}
                                disabled={disableFields}

                                setDocument={setDocument}
                                values={values}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Field
                                label="إرفاق صك ملكية المنزل /عقد إلايجار"
                                name="titleDeedOrLeaseContract"
                                component={FileUploaderComp}
                                setField={setField}
                                setDocument={setDocument}
                                disabled={disableFields}

                                values={values}
                                multipleFile={false}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Field
                                label="إرفاق مخطط البناء"
                                name="buildingScheme"
                                component={FileUploaderComp}
                                multipleFile={false}
                                setField={setField}
                                setDocument={setDocument}
                                values={values}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Field
                                label="شهادة معتمدة تدريبية أو تعليمية في مجال الطفولة"
                                name="childhoodTrainingCertificate"
                                component={FileUploaderComp}
                                multipleFile={false}
                                setField={setField}
                                setDocument={setDocument}
                                values={values}
                            />
                        </Grid>
                    </Grid></>
                    :
                    <>
                        <Grid container>
                            <Grid item md={6} xs={12}>
                                {!circleloading ? <Field
                                    fullWidth
                                    required
                                    label="رقم الهوية الوطنية"
                                    name="IDNo"
                                    component={TextFieldFinal}
                                    type="text"
                                    disabled={disableFields || loading}
                                    variant="outlined"
                                    dir="rtl"
                                    className="custom-field"
                                /> : <Skeleton />}
                                <OnChange name="IDNo">
                                    {(value, previous) => {
                                        values.IDNo = value?.replace(/\D/g, '')
                                        handleOnChange();
                                        setErrMessage("")
                                    }}
                                </OnChange>
                            </Grid>
                            {!circleloading ?
                                <>
                                    <Grid item md={11} style={{ paddingBottom: "20px", paddingTop: '20px' }}>
                                        <Typography> تاريخ الميلاد</Typography>
                                    </Grid>
                                    <Calendar disabled={loading || disableFields} gridSize={6} fieldName="managerBD" />
                                    <Grid item width="20px" />
                                </>
                                : null}
                            <OnChange name="managerBD.day">
                                {(value, previous) => {
                                    values.managerBD.day = value
                                    handleOnChange();
                                }}
                            </OnChange>
                            <OnChange name="managerBD.month">
                                {(value, previous) => {
                                    values.managerBD.month = value
                                    handleOnChange();
                                }}
                            </OnChange>
                            <OnChange name="managerBD.year">
                                {(value, previous) => {
                                    values.managerBD.year = value
                                    handleOnChange();
                                }}
                            </OnChange>
                            <Grid item md={5} >
                                {!circleloading ? <Button
                                    startIcon={loading ? <CircularProgress size="1rem" /> : null}
                                    variant='outlined'
                                    type="button"
                                    disabled={loading}
                                    sx={{
                                        height: 55,
                                        backgroundColor: 'white',
                                        width: '90%',
                                        color: '#3c8084',
                                        ':hover': {
                                            backgroundColor: '#3c8084',
                                            color: 'white',
                                        }
                                    }}
                                    onClick={() => { disableFields ? clearDataAndEnableFields() : checkManagerInfo() }}
                                >
                                    {disableFields ? 'تعديل البيانات' : 'تحقق'}
                                </Button> : <Skeleton />}
                            </Grid>
                        </Grid>
                        <Grid item md={12} xs={12}></Grid>
                        {checkData && <> <Grid container md={12} xs={12} spacing={3}>
                            <Grid item md={6} xs={12}>
                                <Field
                                    fullWidth
                                    required
                                    label="الاسم"
                                    name="fullName"
                                    component={TextFieldFinal}
                                    type="text"
                                    variant="outlined"
                                    dir="rtl"
                                    className="custom-field"
                                    disabled
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                {!circleloading ?
                                    <Field
                                        fullWidth
                                        required
                                        label="الجنس"
                                        name="gender"
                                        component={TextFieldFinal}
                                        type="text"
                                        variant="outlined"
                                        dir="rtl"
                                        className="custom-field"
                                        disabled
                                    />
                                    : <Skeleton />
                                }
                            </Grid>

                        </Grid>
                            <Grid item md={12} xs={12}></Grid>
                            <Grid container md={12} xs={12} spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        label="إرفاق السيرة الذاتية"
                                        name="CV"
                                        component={FileUploaderComp}
                                        multipleFile={false}
                                        setField={setField}
                                        setDocument={setDocument}
                                        values={values}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Field
                                        label=" إرفاق المؤهل التعليمي"
                                        name="educationalQualifications"
                                        component={FileUploaderComp}
                                        multipleFile={false}
                                        setField={setField}
                                        setDocument={setDocument}
                                        values={values}
                                    />
                                </Grid>



                            </Grid>

                        </>}
                    </>}
            </Grid>
        </>
    )

}
export default CenterManagerInfo
CenterManagerInfo.propTypes = {
    setField: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    Condition: PropTypes.func.isRequired,
    setIsEnableNextBtn: PropTypes.func.isRequired,
    setErrMessage: PropTypes.func.isRequired,
};