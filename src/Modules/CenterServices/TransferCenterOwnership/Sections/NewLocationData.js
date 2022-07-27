/* eslint-disable */
import {
  Alert, Box, Button, CircularProgress, Divider, Grid, Typography
} from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import moment from 'moment-hijri';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import Calendar from 'src/Core/Components/calendar';
import { checkIsNumber } from 'src/Core/Utils/inputValidator';
import { calculation } from '../../FinalLicense/API/finalLicenseAPI';
import { ContentField } from '../../FinalLicense/Utils/finalLicenseUtil';
import Attachements from './Attachements';

const NewLocationData = ({ setField, values, setIsEnableNextBtn }) => {
  const [calculatedData, setCalculatedData] = useState(false);
  const [errMessage, SetErrMessage] = useState('');
  const [loading, setLoading] = useState(false);
  console.log('#==> values__values__values ' + JSON.stringify(values));

  useEffect(() => {
    if (!values.capacity || !values.basementArea || !values.buildingArea || !values.Furniture || !values.municipLicenseNo || !values.fireDepartmentLicense || !values.engineeringPlan || !values.day || !values.month || !values.year) {
      setIsEnableNextBtn(false);
    }
  }, []);

  const calculate = async () => {
    setLoading(true);
    SetErrMessage('');
    console.log('hiiiiiiiiiiiii', values.buildingArea, values.basementArea);

    const response = await calculation(
      values.buildingArea,
      values.basementArea
    );
    const carryingCapacity = response?.responseBody?.body?.carryingCapacity;
    console.log(`Capacity :: values.capacity: ${values.capacity}`);
    console.log(
      `Capacity :: response.responseBody.body.carryingCapacity ${carryingCapacity}`
    );
    console.log(`Capacity numeral :: ${numeral(carryingCapacity).value()}`);
    console.log(`Is Capacity >= 1 :: ${numeral(carryingCapacity) >= 1}`);
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

    if (!values.basementArea && !values.buildingArea) {
      SetErrMessage('الرجاء تعبئة الحقول');
      setIsEnableNextBtn(false);
      return;
    }
    if (!values.basementArea) {
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
      !values.basementArea ||
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
      <Typography
        color="textPrimary"
        gutterBottom
        // mb={4}
        mt={6}
        variant="h4"
      >
        بيانات الموقع الجديد{' '}
      </Typography>

      <Grid container mt={3} mb={3}>
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
              disabled="true"
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
              label="مساحة سطح البناء (للمبنى الجديد)"
              name="buildingArea"
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
              label=" مساحة القبو (للمبنى الجديد)"
              name="basementArea"
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
              احتساب الطاقة الاستيعابية (للمبنى الجديد)
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
        <Typography
          color="textPrimary"
          gutterBottom
          // mb={4}
          mt={6}
          variant="h4"
        >
          المرفقات
        </Typography>
        <Attachements
          values={values}
          setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
          setIsEnableNextBtn={setIsEnableNextBtn}
        />
        <Divider />
        <Grid container spacing={3} mt={2} mb={3}>
          <Grid item md={12} xs={12}>
            <Typography>تاريخ إنتهاء رخصة الدفاع المدني</Typography>
          </Grid>
          <Calendar
            FeiledWidth={4}
            fieldName={null}
            yearCalender={{
              start: moment().format('iYYYY'),
              end: Number.parseInt(moment().format('iYYYY')) + 15
            }}
          />
        </Grid>
      </Grid>
      {!values.capacity && (<Typography>**يجب الضغط على زر "احتساب الطاقة الإحتسابية" للإنتقال للصفحة التالية</Typography>)}

    </>
  );
};

export default NewLocationData;
