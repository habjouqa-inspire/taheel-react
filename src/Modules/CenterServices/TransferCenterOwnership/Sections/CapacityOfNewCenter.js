/* eslint-disable */
import {
    Alert, Box, Button, CircularProgress, Divider, Grid, Typography
} from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { checkIsNumber } from 'src/Core/Utils/inputValidator';
import { calculation } from '../../FinalLicense/API/finalLicenseAPI';
import { ContentField } from '../../FinalLicense/Utils/finalLicenseUtil';

const CapacityForNewCenter = ({ setField, values, setIsEnableNextBtn, changeLocation }) => {
    const [calculatedData, setCalculatedData] = useState(false);
    const [errMessage, SetErrMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    console.log('#==> values__values__values ' + JSON.stringify(values));

    useEffect(() => {
        if (!values.capacity || !values.basementArea || !values.buildingArea || !values.beneficiariesNum) {
            setIsEnableNextBtn(false);
        }
        changeLocation && (setTitle("(للمبنى الجديد)"))
    }, []);

    const calculate = async () => {
        setLoading(true);
        SetErrMessage('');

        const response = await calculation(
            values.buildingArea,
            values.basementArea
        );
        const carryingCapacity = response?.responseBody?.body?.carryingCapacity;
        if (!response.isSuccessful) {
            setIsEnableNextBtn(false);
            SetErrMessage(response.message);
            setCalculatedData(false);
        } else {
            setField('capacity', numeral(carryingCapacity).format('00'));
            setField(
                'financialGuarantee',
                `${numeral(response.responseBody.body.financialGuarantee).format(
                    '0,0.00'
                )} ر.س.`
            );
            setCalculatedData(true);
        }
        setLoading(false);

        if (!values.basementArea && !values.buildingArea && !values.beneficiariesNum) {
            SetErrMessage('الرجاء تعبئة الحقول');
            setIsEnableNextBtn(false);
            return;
        }
        if (
            !values.beneficiariesNum ||
            !checkIsNumber(values.beneficiariesNum) ||
            values.beneficiariesNum < 0
        ) {
            SetErrMessage('الرجاء إدخال عدد صحيح في حقل عدد المستفيدين الحالي');
            setIsEnableNextBtn(false);
            return;
        }
        if (!checkIsNumber(values.basementArea)) {
            SetErrMessage('الرجاء تعبئة حقل مساحة القبو');
            setIsEnableNextBtn(false);
            return;
        }
        if (!values.buildingArea) {
            SetErrMessage('الرجاء تعبئة حقل مساحة البناء');
            setIsEnableNextBtn(false);
            return;
        }
        if (
            !checkIsNumber(values.basementArea) ||
            values.basementArea < 0
        ) {
            SetErrMessage('يرجى إدخال مساحة  عدد صحيح');
            setIsEnableNextBtn(false);
            return;
        }
        if (
            !values.buildingArea ||
            !checkIsNumber(values.buildingArea) ||
            values.buildingArea <= 0
        ) {
            SetErrMessage('يرجى إدخال مساحة مسطح البناء عدد صحيح أكبر من صفر');
            setIsEnableNextBtn(false);
            return;
        }
        if (parseInt(values.buildingArea) <= parseInt(values.basementArea)) {
            SetErrMessage('مساحة القبو يجب أن تكون أقل من مساحة مسطح البناء');
            setIsEnableNextBtn(false);
            return;
        }
        if (numeral(values.beneficiariesNum).value() > numeral(carryingCapacity).value()) {
            SetErrMessage(
                'يجب أن يكون عدد المستفيدين الحالي اقل من الطاقة الاستيعابية'
            );
            setIsEnableNextBtn(false);
            return;
        }


        setIsEnableNextBtn(true);
    };

    const handleOnChange = (val, nextVal) => {
        values.capacity = null;
        setIsEnableNextBtn(false);
    };
    const clearCapacity = () => {
        setField('capacity', null);
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
                            الطاقة الاستيعابية
                        </Typography>
                        <Divider light />
                    </Box>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        {errMessage && (
                            <Alert variant="outlined" severity="error">
                                {errMessage}
                            </Alert>
                        )}
                    </Grid>
                    <Grid item md={6} xs={12} className="custom-label-field">
                        <Field
                            fullWidth
                            required
                            label="عدد المستفيدين (الحالي)"
                            name="beneficiariesNum"
                            component={TextFieldFinal}
                            type="text"
                            variant="outlined"
                            dir="rtl"
                            className="custom-field"
                        />
                        <OnChange name="beneficiariesNum">
                            {(value, previous) => {
                                values.beneficiariesNum = value.replace(/\D/g, '')
                                values.beneficiariesNum = values.beneficiariesNum?.substring(0, 9)
                                handleOnChange(value, previous);
                                clearCapacity();
                            }}
                        </OnChange>
                    </Grid>
                    <Grid item md={6} xs={12} className="custom-label-field">
                        <Field
                            fullWidth
                            required
                            label={`مساحة سطح البناء ${title}`}
                            name="buildingArea"
                            disabled={!changeLocation}
                            component={TextFieldFinal}
                            type="text"
                            variant="outlined"
                            dir="rtl"
                            className="custom-field"
                            isRequired
                        />
                        <OnChange name="buildingArea">
                            {(value, previous) => {
                                values.buildingArea = value.replace(/\D/g, '')
                                values.buildingArea = values.buildingArea?.substring(0, 9)
                                handleOnChange(value, previous);
                                clearCapacity();
                            }}
                        </OnChange>
                    </Grid>
                    <Grid item md={6} xs={12} className="custom-label-field">
                        <Field
                            fullWidth
                            required
                            label={`مساحة القبو ${title}`}
                            name="basementArea"
                            disabled={!changeLocation}
                            component={TextFieldFinal}
                            type="text"
                            variant="outlined"
                            dir="rtl"
                            className="custom-field"
                        />
                        <OnChange name="basementArea">
                            {(value, previous) => {
                                values.basementArea = value.replace(/\D/g, '')
                                values.basementArea = values.basementArea?.substring(0, 9)
                                handleOnChange(value, previous);
                                clearCapacity();
                            }}
                        </OnChange>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Button
                            startIcon={loading ? <CircularProgress size="1rem" /> : null}
                            variant="outlined"
                            type="button"
                            sx={{
                                height: 55,
                                backgroundColor: 'white',
                                width: '100%',
                                color: '#3c8084',
                                ':hover': {
                                    backgroundColor: '#3c8084',
                                    color: 'white'
                                }
                            }}
                            onClick={calculate}
                        >
                            {`احتساب الطاقة الاستيعابية ${title}`}
                        </Button>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                        {values.capacity && (
                            <Grid
                                item
                                lg={12}
                                md={12}
                                xs={12}
                            >
                                < ContentField label='الطاقة الاستيعابية' value={parseInt(values.capacity)} />
                                <Box
                                    direction='rtl'
                                    className="custom-label-field"
                                >
                                    <Alert severity="info" size="small">
                                        يتم حساب الطاقة الاستيعابية من قبل المنصة :
                                        (مساحة مسطح البناء - مساحة القبو)/10
                                    </Alert>
                                </Box>
                            </Grid>
                        )}
                        <Box direction="rtl" className="custom-label-field"></Box>
                    </Grid>
                </Grid>
            </Grid>
            {!values.capacity && (<Typography>**يجب الضغط على زر "احتساب الطاقة الإحتسابية" للإنتقال للصفحة التالية</Typography>)}
        </>
    );
};

export default CapacityForNewCenter;
