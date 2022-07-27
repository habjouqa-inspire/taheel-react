/* eslint-disable no-unused-vars */
import {
    Button, CircularProgress,
    Divider, Grid, Typography
} from '@material-ui/core';
import { Box } from '@mui/system';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import moment from 'moment-hijri';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import Calendar from 'src/Core/Components/calendar';
import { CentertDetails, getMunicipalLicenseNoApi, validateCompanyFunc } from '../../API/ServicesApi';
import FileUploaderComp from '../../FinalLicense/Components/FileUploader';
import { ContentField } from '../../FinalLicense/Utils/finalLicenseUtil';

const CRNumberAndLicenses = ({ editMode, setEditMode, Condition, setErrMessage, values, AttachementValidation, setField, setIsEnableNextBtn, formDraft }) => {
    const [loading, setLoading] = useState(false);
    const [checkData, setCheckData] = useState(false);

    useEffect(() => {

        if (!!values.companyName) {
            setIsEnableNextBtn(true);
            setCheckData(true)
        } else {
            setIsEnableNextBtn(false);
        }
    }, [values.companyName, values.FireDepartmentExpD?.year, values.FireDepartmentExpD?.month, values.FireDepartmentExpD?.day]);

    const checkLicenseCert = async () => {
        setLoading(true);
        setErrMessage('');
        if (!values.CRNumber) {
            setErrMessage('يرجى تعبئة جميع الحقول الإلزامية');
            setLoading(false);
            return;
        }
        console.log(`CRNumber vaildate ${!isNaN(values.CRNumber) && values.CRNumber.length !== 10}`)
        if (values.CRNumber.length > 10) {
            setErrMessage('تشير سجلاتنا أن رقم السجل التجاري المُدخَل غير صحيح. الرجاء التأكد من صحة الرقم');
            setLoading(false);
            return;
        }
        const getMunicipalLicenseRs = await getMunicipalLicenseNoApi(values.CRNumber);

        if (!getMunicipalLicenseRs.isSuccessful || !!getMunicipalLicenseRs?.responseBody?.message?.responseBody) {
            setErrMessage(getMunicipalLicenseRs?.responseBody?.message?.responseBody || getMunicipalLicenseRs.message);
            setLoading(false);
            return;
        }
        setField('municipLicenseNo', getMunicipalLicenseRs.responseBody.body.MomraLicense);

        const validateCompanyRs = await validateCompanyFunc(values.CRNumber)
        if (!validateCompanyRs.isSuccessful) {
            setErrMessage(validateCompanyRs.message);
            setCheckData(false);
        } else {
            const { CRName, Activities, IssueDate, ExpiryDate } = validateCompanyRs.responseBody.data;
            setField('companyName', CRName);
            setField('activities', Activities);
            setField('crIssueDate', IssueDate);
            setField('crExpirationDate', ExpiryDate);
            setCheckData(true);
            //setIsEnableNextBtn(true);

        }

        setLoading(false);
    }


    const getCentertDetails = async () => {
        if (values.centerLicenseNumber) {
            const response = await CentertDetails(values.centerLicenseNumber)
            if (!response.isSuccessful) {
                setErrMessage(response.message)
                return false;
            } else {
                setField('centerParentType', response.responseBody.data.center.centerParentType)
                setField('centerFirstSubType', response.responseBody.data.center.centerFirstSubType)
                setField('centerSecondSubType', response.responseBody.data.center.centerSecondSubType)
                setField('crInfo_r', response.responseBody.data.center.crInfo_r.ID)
                setField('centerInfo_r', response.responseBody.data.center.centerInfo_r.ID)
                if (response.responseBody.data.center.healthCareServices_r) {
                    setField('healthCareServices_r', response.responseBody.data.center.healthCareServices_r.ID)
                }
                // setField('healthCareServices_r', response.responseBody.data.center.healthCareServices_r)
                return true;
            }
        }
    }
    const handleOnChange = (val, nextVal) => {
        setIsEnableNextBtn(false);
        setCheckData(false);
        values.companyName = null
        values.municipLicenseNo = null
        values.activities = null
    };

    const setDocument = (name, docID, multipleFile) => {
        if (!multipleFile)
            setField(name, [docID])
        else {
            multipleFileDocs.push(docID)
            setField(name, multipleFileDocs)
        }
    }
    return (
        <>
            <Grid
                container
                spacing={1}
            >
                <Grid item xs={12} style={{ paddingBottom: '30px', paddingTop: '20px' }} >
                    <Box>
                        <Typography variant="h4" style={{ fontWeight: 'bold' }} flexItem>
                            معلومات السجل التجاري
                        </Typography>
                        <Divider light />
                    </Box>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                    className="custom-label-field"
                >
                    <Field
                        fullWidth
                        required
                        label="رقم السجل التجاري"
                        name="CRNumber"
                        component={TextFieldFinal}
                        type="number"
                        variant="outlined"
                        dir="rtl"
                        className="custom-field"
                    />
                    <OnChange name="CRNumber">
                        {(value, previous) => {
                            handleOnChange(value, previous);
                            value = value.replace(/\D/g, '');
                            value = value?.substring(0, 10);
                            setField("CRNumber", value)
                        }}
                    </OnChange>
                </Grid>

                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Button
                        startIcon={loading ? <CircularProgress size="1rem" /> : null}
                        variant='outlined'
                        type="button"
                        disabled={loading}
                        sx={{
                            height: 55,
                            backgroundColor: 'white',
                            width: '100%',
                            color: '#3c8084',
                            ':hover': {
                                backgroundColor: '#3c8084',
                                color: 'white',
                            }
                        }}
                        onClick={checkLicenseCert}
                    >
                        تحقق
                    </Button>
                </Grid>
                <Condition is={checkData || editMode}>
                    <Grid
                        container
                        mt={3}
                        mb={3}
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                        >
                            < ContentField label='الاسم التجاري للمركز' value={values.companyName} />
                        </Grid>
                        <Grid
                            item
                            md={12}
                        >
                            < ContentField label='نوع النشاط التجاري' value={values.activities} />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            className="custom-label-field"
                        >
                            < ContentField label="رقم رخصة البلدية" value={values.municipLicenseNo} />
                        </Grid>
                    </Grid>
                </Condition>
                {values.centerType === '01' &&
                    <>
                        <Grid item md={6} xs={12}>

                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <Field
                                    label="تقرير زيارة مكتب هندسي معتمد"
                                    name="engineeringPlan"
                                    component={FileUploaderComp}
                                    multipleFile={false}
                                    setField={setField}
                                    setDocument={setDocument}
                                    values={values}
                                />
                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <Button

                                    onClick={() => {
                                        window.open('https://saudieng.sa/Arabic/Inquiry/Pages/OfficeSearch.aspx');
                                    }
                                    }
                                >
                                    (لإستعراض قائمة المكاتب الهندسية المقدمة اضغط هنا)
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Field
                                label="رخصة الدفاع المدني"
                                name="fireDepartmentLicense"
                                component={FileUploaderComp}
                                multipleFile={false}
                                setField={setField}
                                setDocument={setDocument}
                                values={values}
                            />
                        </Grid>
                    </>}
            </Grid>
            {values.centerType === '01' &&
                <Grid container spacing={3} mt={2} mb={3}>
                    <Grid item md={12} xs={12} style={{ paddingBottom: "20px" }}>
                        <Typography>تاريخ إنتهاء رخصة الدفاع المدني</Typography>
                    </Grid>
                    <Calendar
                        FeiledWidth={4}
                        fieldName={"fireDepartmentExpD"}
                        yearCalender={{
                            start: moment().format('iYYYY'),
                            end: Number.parseInt(moment().format('iYYYY')) + 15
                        }}
                    />
                </Grid>
            }
        </ >
    )
};

CRNumberAndLicenses.propTypes = {
    Condition: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    AttachementValidation: PropTypes.func,
    setErrMessage: PropTypes.func.isRequired,
    setField: PropTypes.func.isRequired,
    setIsEnableNextBtn: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    setEditMode: PropTypes.func.isRequired,
    formDraft: PropTypes.bool,
};
export { CRNumberAndLicenses };

