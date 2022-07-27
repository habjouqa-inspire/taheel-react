/* eslint-disable */
import React, { useState } from 'react';
import {
  Button,
  Grid,
  FormControlLabel,
  RadioGroup,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Radio } from 'final-form-material-ui';
import Calendar from 'src/Core/Components/calendar';
import PersonForm from './PersonForm'
import { validateAddStaffForm } from '../../Utils/finalLicenseUtil';
import { useEffect } from 'react';
import { validateCitizenFunc } from 'src/Modules/CenterServices/API/ServicesApi';
import { OnChange } from 'react-final-form-listeners';

const AddPersonForm = ({ fromEdit, MedicalPracticeCondition, setField, pop, push, values, setOpenPopup, fieldName, Condition, rowIndex }) => {
  const [errors, setErrors] = useState();
  const [errMessage, setErrMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [forignForm, setForignForm] = useState(fromEdit ? true : false)
  const [SAForm, setSAForm] = useState(fromEdit ? true : false)
  const [citizenInfo, setCitizenInfo] = useState(values ? { Name: { FirstName: values.fullName.split(" ")[0], LastName: values.fullName.split(" ")[1], }, staffTypes: values.staffTypes, Gender: values.gender, birthDate: values.birthDate, cv: values.cv, cvAtt: values.cvAtt, EducationalQualification: values.EducationalQualification, MedicalPractice: values.MedicalPractice, EducationalQualificationAtt: values.EducationalQualificationAtt, MedicalPracticeAtt: values.MedicalPracticeAtt, sponsorName: values.sponsorName } : {})
  useEffect(() => {
    console.log(`-- rowIndex :: ${rowIndex}`)
    console.log(`-- forignForm :: ${forignForm}`)
    console.log(`-- SAForm :: ${SAForm}`)

  }, [])
  const CitizenValidate_SA = async () => {

    setLoading(true);
    setErrMessage("");
    const { nationality, year, month, day, idNumber } = !rowIndex || rowIndex !== -1 ? values.customers[rowIndex] : values;
    console.log(`CitizenValidate_SA--idNumber :::  ${idNumber}`);
    if (values.customers) {
      console.log(`CitizenValidate_SA--customers :::  ${JSON.stringify(values.customers)}`);
      const custumerByIdCount = values.customers.filter(customer => customer.idNumber === idNumber).length;
      if (custumerByIdCount > 0) {
        setErrMessage(" رقم الهوية مستخدم يرجى استخدام رقم آخر");
        setLoading(false);
        return;
      }
    }
    if (!idNumber) {
      setErrMessage("يرجى إدخال رقم الهوية");
      setLoading(false);
      return;
    }

    if (!year || !month || !day) {
      setErrMessage("يرجى إدخال تاريخ ميلاد");
      setLoading(false);
      return;
    }
    if (idNumber.length != 10) {
      setErrMessage("تشير سجلاتنا أن رقم الهوية / الإقامة المُدخَل غير صحيح. الرجاء التأكد من صحة الرقم.");
      setLoading(false);
      return;
    }
    if (!idNumber.startsWith('1')) {
      setErrMessage('تشير سجلاتنا أن رقم الهوية / الإقامة المُدخَل غير صحيح. الرجاء التأكد من صحة الرقم.');
      setLoading(false)
      return;
    }
    function numberToDay(day) {
      return ('0' + day).slice(-2);
    }
    const birthDate = year + '' + numberToDay(month) + numberToDay(day);
    const response = await validateCitizenFunc({ idNumber: idNumber, birthDate: birthDate, checkGovermental: false })

    if (!response.isSuccessful)
      setErrMessage(response.message)
    else {
      setCitizenInfo(response.responseBody.data)
      setSAForm(true)
    }
    setLoading(false)
  }

  const CitizenValidate_Forign = async () => {
    setLoading(true);
    setErrMessage("");
    const { iqamaNo } = !rowIndex || rowIndex !== -1 ? values.customers[rowIndex] : values;
    if (values.customers) {
      const custumerByIdCount = values.customers.filter(customer => customer.iqamaNo === iqamaNo).length;
      if (custumerByIdCount > 0) {
        setErrMessage(" رقم الإقامة مستخدم يرجى استخدام رقم اخر");
        setLoading(false);
        return;
      }
    }
    if (!iqamaNo) {
      setErrMessage("يرجى إدخال رقم الإقامة");
      setLoading(false);
      return;
    }
    if (iqamaNo.length != 10) {
      setErrMessage("تشير سجلاتنا أن رقم الهوية / الإقامة المُدخَل غير صحيح. الرجاء التأكد من صحة الرقم.");
      setLoading(false);
      return;
    }
    if (!iqamaNo.startsWith('2')) {
      setErrMessage('تشير سجلاتنا أن رقم الهوية / الإقامة المُدخَل غير صحيح. الرجاء التأكد من صحة الرقم.');
      setLoading(false)
      return;
    }
    const response = await validateCitizenFunc({ idNumber: iqamaNo, birthDate: "", checkGovermental: false })
    if (!response.isSuccessful)
      setErrMessage(response.message);
    else {
      setCitizenInfo(response.responseBody.data);
      setForignForm(true);
      setErrMessage('');
    }
    setLoading(false);
  }
  return (
    <>
      <Grid
        container
        mt={4}
        spacing={3}
      >
        <Grid
          item
          md={12}
          xs={12}
          className="custom-label-field"
        >
          {errMessage && (
            <Box >
              <Alert severity="error">
                {errMessage}
              </Alert>
            </Box>
          )}
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
          className="custom-label-field"
        >
          <Typography> الجنسية</Typography>
          <RadioGroup row >
            <FormControlLabel
              label="سعودي"
              control={<Field
                name={fieldName === null ? "nationality" : `nationality`}
                component={Radio} type="radio" value="سعودي" />}
              disabled={loading || SAForm || forignForm}
            />
            <FormControlLabel
              label="غير سعودي"
              control={<Field
                name={fieldName === null ? "nationality" : `nationality`}
                component={Radio} type="radio" value="غير سعودي" />}
              disabled={loading || SAForm || forignForm}
            />
          </RadioGroup>
        </Grid>
        <Grid
          container
          mt={4}
          spacing={1}
          className="custom-label-field"
        >

          <Condition when={fieldName === null ? "nationality" : `nationality`} is='سعودي'>

            <Grid
              item
              md={6}
              xs={12}
              className="custom-label-field"
            >
              <Field
                fullWidth
                required
                label="رقم الهوية "
                name={fieldName === null ? "idNumber" : `idNumber`}
                component={TextFieldFinal}
                disabled={loading || SAForm || forignForm}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
              />
              <OnChange name="idNumber">
                {(value, previous) => {
                  value = value.replace(/\D/g, '');
                  value = value?.substring(0, 10);
                  setField("idNumber", value)
                }
                }
              </OnChange>
            </Grid>
            <Grid
              item
              mt={4}
              md={12}
              xs={12}
              style={{ paddingBottom: "20px" }}
            >
              <Typography> تاريخ الميلاد</Typography>
            </Grid>
            <Calendar FeiledWidth={2} fieldName={fieldName} disabled={loading || SAForm || forignForm} />

            <Grid
              item
              md={6}
              xs={12}
            >
              <Button
                startIcon={loading ? <CircularProgress size="1rem" /> : null}
                variant='outlined'
                type="button"
                disabled={SAForm || forignForm || loading}
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
                onClick={CitizenValidate_SA}
              >
                تحقق
              </Button>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              className="custom-label-field"
            >
            </Grid>

            {SAForm &&
              < PersonForm errors={errors} setErrors={(newErorrs) => setErrors(newErorrs)} values={values} fromEdit={fromEdit} isSaudi={true} MedicalPracticeCondition={MedicalPracticeCondition} setField={setField} fieldName={fieldName} Condition={Condition} citizenInfo={citizenInfo} rowIndex={rowIndex} />
            }

          </Condition>
        </Grid>
        <Grid
          container
          mt={4}
          spacing={1}
          className="custom-label-field"
        >
          <Condition when={fieldName === null ? "nationality" : `nationality`} is='غير سعودي'>
            <Grid
              item
              md={6}
              xs={12}
              className="custom-label-field"
            >
              <Field
                fullWidth
                required
                label="رقم الإقامة "
                name={fieldName === null ? "iqamaNo" : `iqamaNo`}
                component={TextFieldFinal}
                type="text"
                disabled={loading || SAForm || forignForm}
                variant="outlined"
                dir="rtl"
                className="custom-field"
              />
              <OnChange name="iqamaNo">
                {(value, previous) => {
                  value = value.replace(/\D/g, '');
                  value = value?.substring(0, 10);
                  setField("iqamaNo", value)
                }
                }
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
                disabled={SAForm || forignForm || loading}
                type="button"
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
                onClick={CitizenValidate_Forign}
              >
                تحقق
              </Button>
            </Grid>
            {forignForm &&
              < PersonForm errors={errors} setErrors={(newErorrs) => setErrors(newErorrs)} values={values} fromEdit={fromEdit} isSaudi={false} MedicalPracticeCondition={MedicalPracticeCondition} setField={setField} fieldName={fieldName} Condition={Condition} citizenInfo={citizenInfo} rowIndex={rowIndex} />
            }
          </Condition>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2} mt={3} justifyContent="flex-end"
      >
        <Grid
          item
          md={3}
        >
          <Button
            style={{
              width: "100%",
              height: "3.4375em",
              backgroundColor: '#E2E8EB',
              color: '#000',
            }}
            variant='contained'
            onClick={() => {
              values.fullName = "";
              values.idNumber = "";
              values.iqamaNo = ""
              values.staffTypes = "";
              values.gender = "";
              values.birthDate = "";
              values.nationality = "";
              values.nationality = "";
              values.cv = "";
              values.cvAtt = "";
              values.EducationalQualification = "";
              values.MedicalPractice = "";
              values.EducationalQualificationAtt = "";
              values.MedicalPracticeAtt = "";
              values.sponsorName = "";
              setOpenPopup(false);
            }}
          >
            إلغاء
          </Button>
        </Grid>

        <Grid
          item
          md={3}
        >
          <Button
            style={{
              width: "100%",
              height: "3.4375em"
            }}
            variant='contained'
            color="primary"
            onClick={() => {
              setErrMessage("");
              console.log(`-- rowIndex :: ${rowIndex}`)
              console.log(`-- forignForm :: ${forignForm}`)
              console.log(`-- SAForm :: ${SAForm}`)


              const result = validateAddStaffForm(values, rowIndex, SAForm, forignForm);
              if (!!result?.message) {
                setErrMessage(result.message);
              }
              if (!!result?.errors) {
                setErrors(result.errors);
              }
              if (!!result?.message || !!result?.errors) {
                return;
              }
              const { fullName, staffTypes, idNumber, gender, birthDate, iqamaNo, nationality, day, month, year, cv, cvAtt, EducationalQualification, MedicalPractice, EducationalQualificationAtt, MedicalPracticeAtt, sponsorName } = values;
              values.fullName = "";
              values.idNumber = "";
              values.iqamaNo = "";
              values.staffTypes = "";
              values.gender = "";
              values.nationality = "";
              values.day = "";
              values.month = "";
              values.year = "";
              values.cv = "";
              values.cvAtt = "";
              values.EducationalQualification = "";
              values.MedicalPractice = "";
              values.EducationalQualificationAtt = "";
              values.MedicalPracticeAtt = "";
              values.sponsorName = "";

              if (fieldName === null) {
                push("customers", { fullName: fullName, idNumber: idNumber, iqamaNo: iqamaNo, staffTypes: staffTypes, gender: gender, birthDate: birthDate, nationality: nationality, day: day, month: month, year: year, sponsorName: sponsorName, cv: cv, cvAtt: cvAtt, EducationalQualification: EducationalQualification, MedicalPractice: MedicalPractice, EducationalQualificationAtt: EducationalQualificationAtt, MedicalPracticeAtt: MedicalPracticeAtt });
              }
              else {
                if (fieldName) {
                  setField(`${fieldName}.staffTypes`, staffTypes);
                  setField(`${fieldName}.EducationalQualification`, EducationalQualification);
                  setField(`${fieldName}.cv`, cv);
                  setField(`${fieldName}.MedicalPractice`, MedicalPractice);
                }
              }
              console.log(`-- rowIndex :: ${rowIndex}`)

              setOpenPopup(false);

            }}
          >
            {fromEdit ? "تحديث" : "إضافة"}

          </Button>
        </Grid>


      </Grid>
    </>
  )
}
export default AddPersonForm