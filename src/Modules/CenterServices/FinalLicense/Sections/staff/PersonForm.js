/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  FormHelperText,
  Grid,
  MenuItem,
} from '@material-ui/core';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import FileUploaderComp from '../../Components/FileUploader';
import { useContext } from 'react';
import localContext from 'src/Core/Contexts/localContext';
import { OnChange } from 'react-final-form-listeners';

const PersonForm = ({ fromEdit, isSaudi, MedicalPracticeCondition, errors, setErrors, fieldName, setField, pop, push, values, Condition, citizenInfo, rowIndex }) => {
  const [resetAttachment, setResetAttachment] = useState(false);

  useEffect(() => {
    console.log(`-- PersonForm rowIndex ${rowIndex}`);
    if (!fromEdit) {
      setField('fullName', `${citizenInfo.name.firstName} ${citizenInfo.name.fourthName}`);
      setField('gender', citizenInfo.gender === 'f' ? 'إناث' : "ذكور")
      setField('birthDate', citizenInfo.birthDate);
      setField('nationality', isSaudi || fromEdit ? 'سعودي' : 'غير سعودي');

      if (!isSaudi) {
        setField('sponsorName', citizenInfo.sponsorName)
      }
      setErrors({ fullName: ' ', gender: ' ', sponsorName: ' ', staffTypes: ' ', cv: ' ', EducationalQualification: ' ' })
    }
  }, [])

  const setDocument = (name, docID, multiple) => {
    if (!multiple)
      setField(name, [docID])
    else {
      multipleDocs.push(docID)
      setField(name, multipleDocs)
    }
  }

  const staffTypes = ["معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]
  const medicalStaffTypes = ['أخصائي علاج طبيعي', 'أخصائي علاج وظيفي', 'ممرض', 'أخصائي نطق و تخاطب']
  return (
    <>
      <Grid
        container
        spacing={3}
        mt={3}
      >
        <Grid
          item
          md={6}
          xs={12}
          className="custom-label-field"
        >
          <Field
            fullWidth
            required
            label="الاسم الكامل"
            disabled
            name={fieldName === null ? "fullName" : `fullName`}
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
          {errors?.fullName && <FormHelperText style={{ color: "red" }}>{errors?.fullName}</FormHelperText>}
          <OnChange name="fullName">
            {(value, previous) => {
              value?.length != 0 && (
                setErrors(preErrors => {
                  delete preErrors?.fullName
                  return preErrors
                })
              )
            }
            }
          </OnChange>
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
            label="الجنس"
            disabled
            name={fieldName === null ? "gender" : `gender`}
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
          {errors?.gender && <FormHelperText style={{ color: "red" }}>{errors?.gender}</FormHelperText>}
          <OnChange name="gender">
            {(value, previous) => {
              value?.length != 0 && (
                setErrors(preErrors => {
                  delete preErrors?.gender
                  return preErrors
                })
              )
            }
            }
          </OnChange>
        </Grid>

        {!isSaudi &&
          <Grid
            item
            md={6}
            xs={12}
            className="custom-label-field"
          >
            <Field
              fullWidth
              required
              label="اسم الكفيل"
              disabled
              name={fieldName === null ? "sponsorName" : `sponsorName`}
              component={TextFieldFinal}
              type="text"
              variant="outlined"
              dir="rtl"
              className="custom-field"
            />
            {errors?.sponsorName && <FormHelperText style={{ color: "red" }}>{errors?.sponsorName}</FormHelperText>}
            <OnChange name="sponsorName">
              {(value, previous) => {
                value?.length != 0 && (
                  setErrors(preErrors => {
                    delete preErrors?.sponsorName
                    return preErrors
                  })
                )
              }
              }
            </OnChange>
          </Grid>
        }
        <Grid
          item
          md={6}
          xs={12}
          className="custom-label-field"
        >
          <Field
            fullWidth
            required
            label="نوع الكادر"
            name={fieldName === null ? "staffTypes" : `staffTypes`}
            component={Select}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            formControlProps={{ fullWidth: true }}
          >
            {staffTypes.map((staff, index) =>
              <MenuItem key={index} value={staff}>{staff}</MenuItem>
            )}
          </Field>
          {errors?.staffTypes && <FormHelperText style={{ color: "red" }}>{errors?.staffTypes}</FormHelperText>}
          <OnChange name="staffTypes">
            {(value, previous) => {
              value?.length != 0 && (
                setErrors(preErrors => {
                  delete preErrors?.staffTypes
                  return preErrors
                })
              )
              !['ممرض','أخصائي علاج طبيعي', 'أخصائي علاج وظيفي', 'أخصائي نطق و تخاطب'].includes(staffTypes) &&(setField("MedicalPractice", null))
              // setField("EducationalQualification", null)
              // setField("MedicalPractice", null)
              // setField("cv", null)
              // setResetAttachment(prev => !prev)
            }}
          </OnChange>
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            label="السيرة الذاتية"
            name={fieldName === null ? "cv" : `cv`}
            component={FileUploaderComp}
            inputType={false}
            setField={setField}
            resetAttachment={resetAttachment}
            values={values}
            rowIndex={rowIndex}
          />
          {errors?.cv && <FormHelperText style={{ color: "red" }}>{errors?.cv}</FormHelperText>}
          <OnChange name="cv">
            {(value, previous) => {
              value?.length != 0 && (
                setErrors(preErrors => {
                  delete preErrors?.cv
                  return preErrors
                })
              )
            }
            }
          </OnChange>
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            label="المؤهلات التعليمية"
            name={fieldName === null ? "EducationalQualification" : `EducationalQualification`}
            component={FileUploaderComp}
            inputType={false}
            setField={setField}
            setDocument={setDocument}
            values={values}
            resetAttachment={resetAttachment}
            rowIndex={rowIndex}
            tooltipText="مطلوب اخر مؤهل له علاقة بالوظيفة. حجم الملف لا يتجاوز 2MB الملفات المقبولة pdf,png,jpg"
          />
          {errors?.EducationalQualification && <FormHelperText style={{ color: "red" }}>{errors?.EducationalQualification}</FormHelperText>}
          <OnChange name="EducationalQualification">
            {(value, previous) => {
              value?.length != 0 && (
                setErrors(preErrors => {
                  delete preErrors?.EducationalQualification
                  return preErrors
                })
              )
            }
            }
          </OnChange>
        </Grid>

        <MedicalPracticeCondition when={fieldName === null ? "staffTypes" : `staffTypes`} is={medicalStaffTypes}>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Field
              label="رخصة المزاولة"
              name={fieldName === null ? "MedicalPractice" : `MedicalPractice`}
              component={FileUploaderComp}
              inputType={false}
              setField={setField}
              setDocument={setDocument}
              resetAttachment={resetAttachment}
              values={values}
              rowIndex={rowIndex}
            />
            {errors?.MedicalPractice && <FormHelperText style={{ color: "red" }}>{errors?.MedicalPractice}</FormHelperText>}
            <OnChange name="MedicalPractice">
              {(value, previous) => {
                value?.length != 0 && (
                  setErrors(preErrors => {
                    delete preErrors?.MedicalPractice
                    return preErrors
                  })
                )
              }
              }
            </OnChange>
          </Grid>
        </MedicalPracticeCondition>
      </Grid>
    </>
  )
}

export default PersonForm