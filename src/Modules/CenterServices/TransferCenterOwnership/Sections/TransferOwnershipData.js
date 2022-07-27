/* eslint-disable */
import {
    Alert, Button, CardContent, CircularProgress, Grid, MenuItem, Typography
} from '@material-ui/core';
import { Select, TextField as TextFieldFinal } from 'final-form-material-ui';
import { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import Calendar from 'src/Core/Components/calendar';
import { OWNER_TYPE } from 'src/Core/Utils/enums';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { verifyEmailAndIqamaNum } from 'src/Modules/UserAuthentication/Registration/API/RegistrationAPI';
import { downloadTaheelDoc } from '../../../Account/API/AccountApi';
import { validateCitizenFunc } from '../../API/ServicesApi';
import { validateCompanyFunc } from '../../FinalLicense/API/finalLicenseAPI';
import FileUploaderComp from '../../FinalLicense/Components/FileUploader';
import { ContentField } from '../../FinalLicense/Utils/finalLicenseUtil';
import { getBirthdayOld } from '../../TemporaryLicense/Utils/temporayLicenseUtil';


const TransferOwnershipData = ({ setField, Condition, values, setIsEnableNextBtn }) => {
    useEffect(() => {
        // console.log('ssssssssssssdddkkkkk', values.waiverTemplate);
        values.agree ? setIsEnableNextBtn(true) : setIsEnableNextBtn(false)
    }, [])
    const [loading, setLoading] = useState(false);
    const [checkData, setCheckData] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const { email, idNumIqamaNum } = getCurrentUser();
    const [downloadLoading, setDownloadLoading] = useState(false);
    function numberToDay(day) {
        return ('0' + day).slice(-2);
    }
    const setDocument = (name, docID, multipleFile) => {
        if (!multipleFile)
            setField(name, [docID])
        else {
            multipleFileDocs.push(docID)
            setField(name, multipleFileDocs)
        }
    }
    const Download = async (values) => {

        setDownloadLoading(true)
        console.log('waiver IDDD', values?.waiverTemplate);
        const downloadDoc = await downloadTaheelDoc(values?.waiverTemplate, "WaiverDeclarationTemplate");
        setDownloadLoading(false)

    }
    const validateData = async () => {
        if (!values?.requestType) {
            setErrMessage('الرجاء إدخال صفة المالك');
            return;
        }

        if (values?.requestType === OWNER_TYPE.LEGAL_TYPE && values?.targetedBenificiray === '11') {
            setErrMessage('لا يمكن ان يكون المالك الجديد ذو صفة اعتبارية');
            return;
        }

        setLoading(true);
        setErrMessage('');
        const { day, month, year } = values;
        const birthDate = year + '' + numberToDay(month) + numberToDay(day);
        if (values.requestType === OWNER_TYPE.LEGAL_TYPE && values.NewCRNumber == values.ownerID) {
            setIsEnableNextBtn(false);
            setErrMessage('لا يجوز إدخال رقم السجل التجاري الخاص بك. الرجاء إدخال الرقم الخاص بالمالك الجديد.');
            setLoading(false)
            return;
        }

        if (!values.NewCRNumber && values.requestType === OWNER_TYPE.LEGAL_TYPE) {
            setErrMessage(' يرجى إدخال رقم السجل التجاري للمالك الجديد');
            setLoading(false)
        } else if (values.requestType == OWNER_TYPE.LEGAL_TYPE) {
            if (!values.comIqamaNum) {
                setErrMessage('الرجاء إدخال رقم الهوية/الإقامة لمالك السجل التجاري');
                setLoading(false)

                return;
            }
            if (values.comIqamaNum === idNumIqamaNum) {
                setErrMessage('لا يجوز إدخال رقم السجل التجاري الخاص بك. الرجاء إدخال الرقم الخاص بالمالك الجديد.');
                setLoading(false)

                return;
            }
            const validateCompanyRs = await validateCompanyFunc(values.NewCRNumber, values.comIqamaNum)
            if (!validateCompanyRs.isSuccessful) {
                setErrMessage(validateCompanyRs.message);
                setLoading(false)
                setIsEnableNextBtn(false);

            } else {
                const { CRName, crCommissioner, Activities, IssueDate, ExpiryDate } = validateCompanyRs.responseBody.data;
                const idNumber = crCommissioner.natId;
                const verifyEmailAndIqamaNumRs = await verifyEmailAndIqamaNum({ idNumber });
                if (verifyEmailAndIqamaNumRs.isSuccessful) {
                    //   return { isSuccessful: false, message: verifyEmailAndIqamaNumRs.message };

                    setErrMessage('تفيد سجلاتنا بأن حساب المالك الجديد غير نشط، أو معطل، أو غير مسجل في المنصة. نرجو التأكد من هوية المالك الجديد');
                    setLoading(false)
                    setIsEnableNextBtn(false);

                    return;
                }
                setField('companyName', CRName);
                setField('commissionerName', crCommissioner.name);
                setCheckData(true);
                setLoading(false);
                setField("agree", [true])
                setField("natId", crCommissioner.natId)
                setField("BirthDateH", crCommissioner.BirthDateH)
                setField("comEmail", crCommissioner.email)
                setField("mobile", crCommissioner.mobile)
                setField('crActivityType', Activities);
                setField('crIssueDate', IssueDate);
                setField('crExpirationDate', ExpiryDate);
                return;
            }
        } else if (!values.idNo && values.requestType === OWNER_TYPE.NATURAL_TYPE) {

            setErrMessage('يرجى إدخال رقم الهوية / الإقامة للمالك الجديد');
            setLoading(false)
            setIsEnableNextBtn(false);

            return;
        }
        if (!values.idNo?.startsWith('1') && values.requestType === OWNER_TYPE.NATURAL_TYPE) {
            setIsEnableNextBtn(false);

            setErrMessage('تشير سجلاتنا أن صاحب الهوية غير سعودي/سعودية الجنسية');
            setLoading(false)
            return;
        }
        if (values.idNo?.length != 10 && values.requestType === OWNER_TYPE.NATURAL_TYPE) {
            setErrMessage("تشير سجلاتنا أن رقم الهوية / الإقامة المُدخَل غير صحيح. الرجاء التأكد من صحة الرقم");
            setLoading(false);
            return;
        }
        else if ((!values.day || !values.month || !values.year) && values.requestType === OWNER_TYPE.NATURAL_TYPE) {
            setIsEnableNextBtn(false);
            setErrMessage('يرجى إدخال تاريخ الميلاد');
            setLoading(false)
        }

        else if (values.requestType === OWNER_TYPE.NATURAL_TYPE) {
            if (values.idNo == idNumIqamaNum) {
                setIsEnableNextBtn(false);
                setErrMessage('لا يجوز إدخال رقم الهوية / الإقامة الخاص بك. الرجاء إدخال الرقم الخاص بالمالك الجديد');
                setLoading(false)
                return;
            }
            const validatePrivateSector = values.centerType === '08' && values.targetedBenificiray === '11' ? true : false;
            const validateCitizenRs = await validateCitizenFunc({ idNumber: values.idNo, birthDate: birthDate, checkGovermental: true, checkIfWorksInPrivateSector: validatePrivateSector })

            if (!validateCitizenRs.isSuccessful) {
                setErrMessage(validateCitizenRs.message);
                setLoading(false)
                return
            } else {
                console.log('restr test::  ', validateCitizenRs);
                const { firstName, secondName, thirdName, fourthName } = validateCitizenRs.responseBody.data.name;
                const gender = validateCitizenRs?.responseBody?.data?.gender;
                const ownerIDExpireDate = validateCitizenRs?.responseBody?.data?.idExpirationDate;
                const birthDateRs = validateCitizenRs?.responseBody.data?.birthDate;
                if (values.centerType === '08' && values.targetedBenificiray === '11' && validateCitizenRs.responseBody.data.gender !== 'f') {
                    setErrMessage("تشير سجلاتنا أن صاحب الهوية ليست امرأة")
                    setLoading(false)
                    return;
                }
                if (values.centerType === '05' && getBirthdayOld(birthDateRs) < 18) {
                    console.log('the birth date :::', getBirthdayOld(birthDateRs));
                    setIsEnableNextBtn(false);
                    setErrMessage('عذراً لا يمكنك التقديم على هذه الخدمة حيث تشير سجلاتنا أن المالك الجديد يقل عمره عن ثمانية عشرة (18) سنة');
                    setLoading(false)
                    return;
                }
                if (values.centerType === '08' && values.targetedBenificiray === '11' && getBirthdayOld(birthDateRs) < 25) {
                    setIsEnableNextBtn(false);
                    setErrMessage('عذراً لا يمكنك التقديم على هذه الخدمة حيث تشير سجلاتنا أن المالك الجديد يقل عمره عن خمسة وعشرون (25) سنة');
                    setLoading(false)
                    return;
                }
                if (values.centerType === '08' && !values.targetedBenificiray === '11' && getBirthdayOld(birthDateRs) < 18) {
                    setIsEnableNextBtn(false);
                    setErrMessage('عذراً لا يمكنك التقديم على هذه الخدمة حيث تشير سجلاتنا أن المالك الجديد يقل عمره عن ثمانية عشرة (18) سنة');
                    setLoading(false)
                    return;
                }
                const verifyEmailAndIqamaNumRs = await verifyEmailAndIqamaNum({ idNumber: values.idNo });
                if (verifyEmailAndIqamaNumRs.isSuccessful) {
                    setErrMessage('تفيد سجلاتنا بأن حساب المالك الجديد غير نشط، أو معطل، أو غير مسجل في المنصة. نرجو التأكد من هوية المالك الجديد');
                    setLoading(false)
                    return;
                }
                setField('companyName', firstName + ' ' + secondName + ' ' + thirdName + ' ' + fourthName);
                setField('commissionerName', null);
                setField('ownerIDExpireDate', ownerIDExpireDate);
                setCheckData(true);
                setLoading(false);
                setField("agree", [true])
                setField('gender', gender === 'f' ? 'انثى' : 'ذكور')
                setLoading(false)
                return;
            }


        }
    };
    const handleOnChange = () => {


        setField('companyName', null);
        setField('commissionerName', null);
        setField("agree", [false])
        setField("natId", null)
        setField("BirthDateH", null)
        setField("comEmail", null)
        setField("mobile", null)
        setField('crActivityType', null);
        setField('crIssueDate', null);
        setField('crExpirationDate', null);
        setField('ownerIDExpireDate', null);

        setCheckData(false);

    };

    return (
        <CardContent>
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={2}
                variant="h4"
            >
                معلومات المالك الجديد
            </Typography>
            <Grid
                container
                mt={4}
                spacing={3}
            >
                <Grid item md={12} xs={12}>
                    {errMessage && (
                        <Alert variant="outlined" severity="error">
                            {errMessage}
                        </Alert>
                    )}
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                    className="custom-label-field"
                >
                    <Field
                        fullWidth
                        label="صفة المالك الجديد*"
                        name="requestType"
                        component={Select}
                        required
                        variant="outlined"
                        dir="rtl"
                        className="custom-field"
                        formControlProps={{ fullWidth: true }}
                        disabled={loading}
                    >
                        <MenuItem value={OWNER_TYPE.NATURAL_TYPE} selected>صفة طبيعية</MenuItem>
                        {(!(values.centerType === '08' && values.targetedBenificiray == '11')) && <MenuItem value={OWNER_TYPE.LEGAL_TYPE} >صفة إعتبارية</MenuItem>
                        }                    </Field>
                    <OnChange name="requestType">
                        {(value, previous) => {
                            setErrMessage('')
                            setField('NewCRNumber', null)
                            setField('idNo', null)
                            setField('day', null)
                            setField('month', null)
                            setField('year', null)
                            handleOnChange()
                            values.crNo = ''; // eslint-disable-line no-param-reassign
                        }}
                    </OnChange>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                    className="custom-label-field"
                    display={(values.requestType === OWNER_TYPE.NATURAL_TYPE) ? 'flex' : 'none'}
                >
                    <Field
                        fullWidth
                        required
                        label="رقم الهوية / الإقامة للمالك الجديد"
                        name="idNo"
                        component={TextFieldFinal}
                        type="text"
                        variant="outlined"
                        dir="rtl"
                        className="custom-field"
                        disabled={loading}
                    />
                    <OnChange name="idNo">
                        {(value, previous) => {
                            values.idNo = value?.replace(/\D/g, '')
                            values.idNo = values?.idNo?.substring(0, 10)
                            handleOnChange(value, previous);
                        }}
                    </OnChange>
                </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                    display={(values.requestType === OWNER_TYPE.NATURAL_TYPE) ? 'flex' : 'none'}
                >
                    <Typography> تاريخ الميلاد</Typography>
                </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                    display={(values.requestType === OWNER_TYPE.NATURAL_TYPE) ? 'flex' : 'none'}
                >
                    < Calendar
                        disabled={loading}
                        FeiledWidth={4}
                        fieldName={null} />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                    className="custom-label-field"
                    display={(values.requestType === OWNER_TYPE.LEGAL_TYPE) ? 'flex' : 'none'}
                >
                    <Field
                        fullWidth
                        required
                        label="رقم السجل التجاري للمالك الجديد"
                        name="NewCRNumber"
                        component={TextFieldFinal}
                        type="text"
                        variant="outlined"
                        dir="rtl"
                        className="custom-field"
                        disabled={loading}
                    />
                    <OnChange name="NewCRNumber">
                        {(value, previous) => {
                            handleOnChange(value, previous);
                        }}
                    </OnChange>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                    className="custom-label-field"
                    display={(values.requestType === OWNER_TYPE.LEGAL_TYPE) ? 'flex' : 'none'}
                >
                    <Field
                        fullWidth
                        required
                        label="رقم الهوية / الإقامة لمالك السجل التجاري"
                        name="comIqamaNum"
                        component={TextFieldFinal}
                        type="text"
                        variant="outlined"
                        dir="rtl"
                        className="custom-field"
                        disabled={loading}
                    />
                    <OnChange name="comIqamaNum">
                        {(value, previous) => {
                            handleOnChange(value, previous);
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
                        onClick={validateData}
                    >
                        تحقق
                    </Button>
                </Grid>
            </Grid>
            <Grid
                container
                mt={3}
                mb={3}
            >
                <Condition is={checkData}>
                    <Grid
                        container
                        // spacing={3}
                        mt={3}
                        mb={3}
                    >
                        <Grid
                            item
                            lg={6}
                            md={6}
                            xs={12}
                        >
                            < ContentField label={values.requestType === OWNER_TYPE.NATURAL_TYPE ? 'اسم المالك الجديد' : 'اسم المنشأة'} value={values.companyName} />
                        </Grid>
                        {values.requestType === OWNER_TYPE.NATURAL_TYPE && <Grid
                            item
                            lg={6}
                            md={6}
                            xs={12}
                        >
                            < ContentField label={'الجنس'} value={values.gender} />
                        </Grid>}
                        <Grid
                            item
                            lg={6}
                            md={6}
                            xs={12}
                        >
                            {!!values.commissionerName && < ContentField label='  اسم المفوض' value={values.commissionerName} />}
                        </Grid>
                    </Grid>
                </Condition>
            </Grid>
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={5}
                variant="h4"
            >
                معلومات نقل ملكية مركز
            </Typography>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    md={6}
                    xs={12}
                    className="custom-label-field"
                >
                    <Field
                        fullWidth
                        label="تحديد مقر نقل ملكية"
                        name="locationType"
                        component={Select}
                        required
                        variant="outlined"
                        dir="rtl"
                        className="custom-field"
                        formControlProps={{ fullWidth: true }}
                    >
                        <MenuItem value="2" selected>نقل ملكية مقر حالي</MenuItem>
                        <MenuItem value="1">نقل ملكية لمقر جديد</MenuItem>
                    </Field>
                    <OnChange name="locationType">
                        {(value, previous) => {
                            values.crNo = ''; // eslint-disable-line no-param-reassign
                        }}
                    </OnChange>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Field
                        label="عقد المبايعة"
                        name="ContractOfSale"
                        component={FileUploaderComp}
                        multipleFile={false}
                        setField={setField}
                        setDocument={setDocument}
                        values={values}
                    />
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    {/* <Typography gutterBottom variant="h5" component="span">
                        الضمان المالي */}
                    {/* <Link href="#"
                        sx={{ color: '#147fbd' }}
                        onClick={(event) => {
                            event.preventDefault()
                            Download()
                        }
                        }
                    >تنزيل نموذج إقرار التنازل </Link> */}

                    {/* </Typography> */}
                    <Field
                        label="إقرار التنازل"
                        name="WaiverDeclaration"
                        component={FileUploaderComp}
                        multipleFile={false}
                        setField={setField}
                        setDocument={setDocument}
                        values={values}
                    />

                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}

                >
                    <Button

                        startIcon={downloadLoading ? <CircularProgress size="1rem" /> : null}
                        variant='outlined'
                        type="button"
                        disabled={downloadLoading}
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
                        onClick={(event) => {
                            event.preventDefault()
                            Download(values)
                        }
                        }
                    >
                        تنزيل نموذج إقرار التنازل
                    </Button>
                </Grid>
            </Grid>


        </CardContent >
    )
}
export default TransferOwnershipData;