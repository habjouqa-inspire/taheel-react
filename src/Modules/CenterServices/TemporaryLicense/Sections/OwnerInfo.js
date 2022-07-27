import {
  Alert,
  Button, CircularProgress,
  Grid,
  InputAdornment,
  MenuItem
} from '@material-ui/core';
import { Select, TextField as TextFieldFinal } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { OWNER_TYPE, SEARCH_TABLE } from 'src/Core/Utils/enums';
import { validateCitizenFunc } from '../../API/ServicesApi';
import { validateCompanyFunc } from '../API/temporayLicenseAPI';

const OwnerInfo = ({ Condition, values, setField, setIsEnableNextBtn }) => {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (values.requestType === OWNER_TYPE.LEGAL_TYPE && !values.companyName) {
      setIsEnableNextBtn(false);
    }
  }, []);

  const checkLicenseCert = async () => {
    setLoading(true);
    setErrMessage('');
    setField('companyName', "");
    setField('compMobileNo', "");
    setField('crExpiryDate', "");


    if (!values.licenseType) {
      setErrMessage('يرجى إدخال نوع الصفة الاعتبارية');
      setLoading(false);
      return;
    }
    if (!values.CRNumber) {
      setErrMessage('يرجى إدخال رقم السجل التجاري');
      setLoading(false);
      return;
    }

    if (values.CRNumber.length > 10) {
      setErrMessage('يجب أن لا يزيد رقم السجل التجاري عن 10 خانات');
      setLoading(false);
      return;
    }
    if (values.CRNumber.length < 10) {
      setErrMessage('يجب أن لا يقل رقم السجل التجاري عن 10 خانات');
      setLoading(false);
      return;
    }

    const validateCompanyRs = await validateCompanyFunc(values.CRNumber);
    if (!validateCompanyRs.isSuccessful) {
      setErrMessage(validateCompanyRs.message);
      setField('companyName', "");
      setField('compMobileNo', "");
      setField('crExpiryDate', "");

    } else {
      const res = validateCompanyRs.responseBody.data;

      // if (values.centerType === "08" && (values.targetedBenificiray === '10' || values.targetedBenificiray === '09')) {
      //   // const comessioner = [].concat(res.crCommissioner)[0]
      //   // if (!!comessioner?.natId && !comessioner?.natId?.startsWith('1')) {
      //   //   setLoading(false);
      //   //   setField('companyName', "");
      //   //   setField('compMobileNo', "");
      //   //   setErrMessage('تشير سجلاتنا أن مالك السجل التجاري غير سعودي/سعودية الجنسية');
      //   //   return
      //   // }
      //   //else {
      //   //   const validateCitzen = await validateCitizenFunc({ idNumber: comessioner.natId, birthDate: comessioner.BirthDateH, checkGovermental: false, typeUniquenessCheck: SEARCH_TABLE.IN_USER, errorOnExist: false });
      //   //   if (!validateCitzen.isSuccessful) {
      //   //     const response = {
      //   //       isSuccessful: false,
      //   //       message: validateCitzen.message
      //   //     };
      //   //     setLoading(false);
      //   //     setErrMessage(response.message);
      //   //     return {};
      //   //   }
      //   // }
      // }

      setField('companyName', res.CRName);
      setField('crExpiryDate', res.ExpiryDate);

      let phoneNO = res.crCommissioner.mobile


      if (phoneNO?.length > 9) {
        if (!phoneNO.startsWith('5')) {
          phoneNO = phoneNO.slice(3)
        }
      }
      setField('compMobileNo', phoneNO);
      setIsEnableNextBtn(true)
    }

    setLoading(false);
  };
  const handleOnChange = (val, nextVal) => {
    setIsEnableNextBtn(false);
    setField('companyName', "");
    setField('compMobileNo', "");

  };
  return (
    <>
      <Condition when="requestType" is={OWNER_TYPE.NATURAL_TYPE} >
        <Grid container spacing={3} mt={3} mb={3}>
          <Grid item md={6} xs={12}>
            <Field
              fullWidth
              required
              label="رقم الهوية"
              name="idNumber"
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
              label="اسم مالك المركز"
              name="ownerName"
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
              label="رقم الجوال"
              name="mobileNo"
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">| 966+</InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Condition>
      <Condition when="requestType" is={OWNER_TYPE.LEGAL_TYPE} >
        <Grid container spacing={3} mt={3} mb={3}>
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
              label="نوع الصفة الاعتبارية*"
              name="licenseType"
              component={Select}
              required
              disabled={loading}
              dir="rtl"
              className="custom-field"
              variant="outlined"
              formControlProps={{ fullWidth: true }}
            >
              <MenuItem value="1">سجل تجاري</MenuItem>
            </Field>
          </Grid>
          <Grid item md={6} xs={12} className="custom-label-field">
            <Field
              fullWidth
              required
              label="رقم السجل التجاري"
              disabled={loading}
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
              }}
            </OnChange>
          </Grid>
          <Grid item md={6} xs={12} className="custom-label-field">
            <Button
              startIcon={loading ? <CircularProgress size="1rem" /> : null}
              variant="outlined"
              type="button"
              disabled={loading}
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
              onClick={checkLicenseCert}
            >
              تحقق
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={3} mb={3}>
          <Grid item md={6} xs={12}>
            <Field
              fullWidth
              required
              label="اسم الكيان"
              name="companyName"
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
              label="رقم جوال المفوّض"
              name="compMobileNo"
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">| 966+</InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Condition>
    </>
  );
};

export default OwnerInfo;

OwnerInfo.propTypes = {
  Condition: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  setField: PropTypes.func.isRequired,
  setIsEnableNextBtn: PropTypes.func.isRequired,
};
