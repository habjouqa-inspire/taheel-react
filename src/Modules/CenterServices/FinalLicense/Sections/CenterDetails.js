/* eslint-disable no-unused-vars */
import {
  Alert, Button, CircularProgress, Grid, MenuItem,
  Typography
} from '@material-ui/core';
import { Select, TextField as TextFieldFinal } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import TimePicker from 'src/Core/Components/TimePicker';
import { CentertDetails } from 'src/Modules/CenterServices/API/ServicesApi';
import { getMunicipalLicenseNoApi, validateCompanyFunc } from '../API/finalLicenseAPI';
import { ContentField } from '../Utils/finalLicenseUtil';

const CenterDetails = ({ editMode, setEditMode, Condition, values,inHouseHspit, temporaryLicenses, setField, setIsEnableNextBtn, setCenterLicenseNumber, formDraft }) => {
  const [loading, setLoading] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (values.municipLicenseNo) {
      setCheckData(true);
      setIsEnableNextBtn(true);
    }
    if (formDraft) {
      setIsEnableNextBtn(false);
      setCheckData(true)
    }
    if (!!values.CRNumber && !!values.centerLicenseNumber && !!values.companyName) {
      setIsEnableNextBtn(true)
      setCheckData(true)
      setEditMode(false)
    }
  }, []);

  const checkLicenseCert = async () => {
    setLoading(true);
    setErrMessage('');
    if (!values.centerLicenseNumber) {
      setErrMessage('يرجى اختيار رقم الترخيص المؤقت');
      setLoading(false);
      return;
    }
    if (!values.CRNumber) {
      setErrMessage('يرجى إدخال رقم السجل التجاري');
      setLoading(false);
      return;
    }

    if (values.CRNumber.length != 10) {
      setErrMessage('تشير سجلاتنا أن رقم السجل التجاري المُدخل غير صحيح, الرجاء التأكد من صحة الرقم.');
      setLoading(false);
      return;
    }

    const validateCompanyRs = await validateCompanyFunc(values.CRNumber,'',true)
    if (!validateCompanyRs.isSuccessful) {
      setErrMessage(validateCompanyRs.message);
      setLoading(false);
      setCheckData(false);
      return
    } else {
      const { CRName, Activities, IssueDate, ExpiryDate } = validateCompanyRs.responseBody.data;
      setField('companyName', CRName);
      setField('activities', Activities);
      setField('crIssueDate', IssueDate);
      setField('crExpirationDate', ExpiryDate);
    }

    const isSuccessgetCentertDetailsRs = await getCentertDetails();
    if (!isSuccessgetCentertDetailsRs) {
      setLoading(false);
      return;
    }
    const getMunicipalLicenseRs = await getMunicipalLicenseNoApi(values.CRNumber);
    if (!getMunicipalLicenseRs.isSuccessful) {
      setErrMessage(getMunicipalLicenseRs.message);
      setLoading(false);
      return;
    }

    setField('municipLicenseNo', getMunicipalLicenseRs.responseBody.body.MomraLicense);
    setCheckData(true);
    setIsEnableNextBtn(true);
    setLoading(false);

  }


  const getCentertDetails = async () => {
    if (values.centerLicenseNumber) {
      const response = await CentertDetails(values.centerLicenseNumber)
      if (!response.isSuccessful) {
        setErrMessage(response.message)
        return false;
      } else {
        setField('centerParentType', response.responseBody.data.center?.centerParentType)
        setField('centerFirstSubType', response.responseBody.data.center?.centerFirstSubType)
        setField('centerSecondSubType', response.responseBody.data.center?.centerSecondSubType)
        // setField('crInfo_r', response.responseBody.data.center.crInfo_r.ID)
        setField('centerInfo_r', response.responseBody.data.center?.centerInfo_r?.ID)
        if (response.responseBody.data.center?.healthCareServices_r) {
          setField('healthCareServices_r', response.responseBody.data.center?.healthCareServices_r.ID)
        }
        // setField('healthCareServices_r', response.responseBody.data.center.healthCareServices_r)
        return true;
      }
    }
  }
  const handleOnChange = () => {
    setField('companyName', '');
    setField('activities', '');
    setField('crIssueDate', '');
    setField('crExpirationDate', '');
    setField('municipLicenseNo', '');
    setCheckData(false);
    setIsEnableNextBtn(false);
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        mt={3}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          <Typography variant="h4" component="div" >
            معلومات السجل التجاري
          </Typography>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
        >
          {errMessage && (
            <Alert variant="outlined" severity="error">
              {errMessage}
            </Alert>
          )}
        </Grid>
        {values.type == '01' && <Grid
          item
          md={6}
          xs={12}
          className="custom-label-field"
        >
          {!editMode ?
            <Field
              fullWidth
              label="رقم الترخيص المؤقت"
              name="centerLicenseNumber"
              component={Select}
              required
              dir="rtl"
              variant="outlined"
              className="custom-field"
              formControlProps={{ fullWidth: true }}
              disabled={!temporaryLicenses}
            >
              {!!temporaryLicenses ?
                temporaryLicenses.map((license, index) => <MenuItem key={index} value={license.centerLicenseNumber}>{license.centerLicenseNumber}</MenuItem>)
                : (
                  <MenuItem value={values.centerLicenseNumber}>{values.centerLicenseNumber}</MenuItem>
                )}

              <OnChange name="centerLicenseNumber">
                {async (value) => {
                  setCenterLicenseNumber(value)
                }}
              </OnChange>
            </Field>
            :
            <Field
              disabled={!formDraft}
              fullWidth
              required
              label="رقم الترخيص المؤقت"
              name="centerLicenseNumber"
              component={formDraft ? Select : TextFieldFinal}
              type={formDraft ? "" : "text"}
              variant="outlined"
              dir="rtl"
              className="custom-field"
              formControlProps={{ fullWidth: formDraft ? true : false }}
            >
              {temporaryLicenses.map((license, index) => <MenuItem key={index} value={license.centerLicenseNumber}>{license.centerLicenseNumber}</MenuItem>)}
              <OnChange name="centerLicenseNumber">
                {async (value) => {
                  setCenterLicenseNumber(value)
                }}
              </OnChange>
            </Field>
          }
        </Grid>}
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
            disabled={loading}
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
        <Grid
          item
          md={12}
          xs={12}
        >
          <Condition is={checkData || editMode}>
            <Grid
              container
              spacing={3}
              mt={3}
              mb={3}
            >
              <Grid
                item
                lg={6}
                md={12}
                xs={12}
              >
                < ContentField label='الاسم التجاري للمركز' value={values.companyName} />
              </Grid>
              <Grid
                item
                lg={6}
                md={12}
                xs={12}
              >
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                xs={12}
              >
                < ContentField label='نوع النشاط التجاري للمركز' value={values.activities} />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                className="custom-label-field"
              >
                < ContentField label="رقم رخصة البلدية" value={values.municipLicenseNo} />
              </Grid>
              {inHouseHspit && <Grid
                container
                spacing={3}
                mt={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                  className="custom-label-field"
                >
                  <Typography variant="h4" component="div" >
                    معلومات المركز
                  </Typography>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  className="custom-label-field"
                >
                  <Typography color="textSecondary" component="p">ساعات عمل المركز</Typography>
                </Grid>
                <Grid item md={12} xs={12}></Grid>
                <Grid container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="baseline"
                  spacing={1}
                >
                  <Grid item
                    md={1}
                    xs={1}>
                    <Typography align="center" color="textSecondary" component="p">من</Typography>
                  </Grid>
                  <TimePicker FeiledWidth={2} fieldName="centerWorkingHours.from" prevTime={values?.ReCenterWorkingHours?.from}/>
                  <Grid item
                    md={1}
                    xs={1}>
                    <Typography align="center" color="textSecondary" component="p">إلى</Typography>
                  </Grid>
                  <TimePicker FeiledWidth={2} fieldName="centerWorkingHours.to" from={values.centerWorkingHours?.from} values={values} prevTime={values?.ReCenterWorkingHours?.to} />
                </Grid>
                {values?.centerWorkingHours?.from?.hour &&
                  <>
                    <OnChange name="centerWorkingHours.from.hour">
                      {(value, previous) => {
                        if (parseInt(value) > parseInt(values.centerWorkingHours?.to?.hour)) {
                          values.centerWorkingHours.to.hour = null
                        }
                      }}
                    </OnChange>
                    <OnChange name="centerWorkingHours.from.minute">
                      {(value, previous) => {
                        if (parseInt(value) > parseInt(values.centerWorkingHours?.to?.minute)) {
                          values.centerWorkingHours.to.minute = null
                        }
                      }}
                    </OnChange>
                  </>
                }
              </Grid>}
            </Grid>
          </Condition>
        </Grid>
      </Grid>
    </>
  )
};

export default CenterDetails;

CenterDetails.propTypes = {
  Condition: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  temporaryLicenses: PropTypes.array.isRequired,
  setField: PropTypes.func.isRequired,
  setIsEnableNextBtn: PropTypes.func.isRequired,
  setCenterLicenseNumber: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  inHouseHspit: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  formDraft: PropTypes.bool,
};