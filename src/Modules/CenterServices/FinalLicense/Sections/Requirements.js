/* eslint-disable no-unused-vars */
import { Button, Grid, Typography } from '@material-ui/core';
import moment from 'moment-hijri';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Field } from 'react-final-form';
import Calendar from 'src/Core/Components/calendar';
import FileUploaderComp from '../Components/FileUploader';

const Requirements = ({ setField, values, setIsEnableNextBtn, setErrMessage }) => {
  const [centersForDisabilities, setCentersForDisabilities] = useState((values.type === "01" || values.centerType === "01"));
  var multipleFileDocs = [];

  const setDocument = (name, docID, multipleFile) => {
    if (!multipleFile) setField(name, [docID]);
    else {
      multipleFileDocs.push(docID);
      setField(name, multipleFileDocs);
    }
  };
  setIsEnableNextBtn(true);
  return (
    <>
      {console.log('values inside req :: all values', values)}
      {console.log('values inside req :: all values', values)}

      {centersForDisabilities &&
        <Grid container spacing={3} mt={3}>
          <Grid item md={12} xs={12}></Grid>
          <Grid item md={6} xs={12}>
            <Field
              label="إرفاق الخطة التشغيلية"
              name="operationPlan"
              component={FileUploaderComp}
              multipleFile={false}
              setField={setField}
              setDocument={setDocument}
              values={values}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Field
              label="إرفاق الخطة التنفيذية"
              name="executivePlan"
              component={FileUploaderComp}
              multipleFile={false}
              setField={setField}
              setDocument={setDocument}
              values={values}
            />
          </Grid>

          {/* <Grid item md={6} xs={12}>
            <Field
              label="إرفاق تقرير المسح الأمني"
              name="securityReport"
              component={FileUploaderComp}
              multipleFile={false}
              setField={setField}
              setDocument={setDocument}
              values={values}
            />
          </Grid> */}

          <Grid item md={6} xs={12}>
            <Field
              label="إرفاق الضمان المالي"
              name="financialGuaranteeAtt"
              component={FileUploaderComp}
              multipleFile={false}
              setField={setField}
              setDocument={setDocument}
              values={values}
            />

          </Grid>
          <Grid item md={6} xs={12}>
            <Field
              label="إرفاق صور الأثاث والأجهزة الكهربائية"
              name="Furniture"
              component={FileUploaderComp}
              setField={setField}
              setDocument={setDocument}
              values={values}
              multipleFile={true}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <Field
              label="إرفاق رخصة الدفاع المدني"
              name="fireDepartmentLicense"
              component={FileUploaderComp}
              multipleFile={false}
              setField={setField}
              setDocument={setDocument}
              values={values}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid item md={12} xs={12}>
              <Field
                label="إرفاق تقرير زيارة مكتب هندسي معتمد"
                name="officeReport"
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
          <Grid container mt={2} mb={3}>
            <Grid item md={12} xs={12} style={{ paddingBottom: "20px" }}>
              <Typography>تاريخ إنتهاء رخصة الدفاع المدني</Typography>
            </Grid>
            <Calendar
              fieldName={"fireDepartmentLicenseExpiryDate"}
              yearCalender={{
                start: moment().format('iYYYY'),
                end: Number.parseInt(moment().format('iYYYY')) + 15
              }}
            />
          </Grid>
        </Grid>}
      {!centersForDisabilities && <>
        <Grid container spacing={3} mt={3}>
          <Grid item md={12} xs={12}></Grid>
          {values.includeOwnerQulfic && (
            <Grid item md={6} xs={12}>
              <Field
                label="المؤهل التعليمي لمالك المركز"
                name="ownerEducationalQualifications"
                component={FileUploaderComp}
                multipleFile={false}
                setField={setField}
                setDocument={setDocument}
                values={values}
              />
            </Grid>)
          }

          <Grid item md={6} xs={12}>
            <Grid item md={12} xs={12}>

              <Field
                label="إرفاق تقرير زيارة مكتب هندسي معتمد"
                name="officeReport"
                component={FileUploaderComp}
                multipleFile={false}
                setField={setField}
                setDocument={setDocument}
                values={values}
              />
            </Grid>
            {values?.type === "08" && values?.targetedBeneficiary === "09" ? 
            <Grid item md={12} xs={12}>
            <Field
              label="إرفاق خطاب من جهة العمل بتشغيل المركز  "
              name="centerOperatingLetterFromTheEmployer"
              component={FileUploaderComp}
              multipleFile={false}
              setField={setField}
              setDocument={setDocument}
              values={values}
            />
          </Grid> : null}
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
          <Grid item md={6} xs={12}>
            <Field
              label="إرفاق رخصة الدفاع المدني"
              name="fireDepartmentLicense"
              component={FileUploaderComp}
              multipleFile={false}
              setField={setField}
              setDocument={setDocument}
              values={values}
            />
          </Grid>
        </Grid>
        <Grid container mt={2} mb={3}>
          <Grid item md={12} xs={12} style={{ paddingBottom: "20px" }}>
            <Typography>تاريخ إنتهاء رخصة الدفاع المدني</Typography>
          </Grid>
          <Calendar
            fieldName={"fireDepartmentLicenseExpiryDate"}
            yearCalender={{
              start: moment().format('iYYYY'),
              end: Number.parseInt(moment().format('iYYYY')) + 15
            }}
          />
        </Grid></>}
    </>
  );
};

export default Requirements;
Requirements.propTypes = {
  setField: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  setIsEnableNextBtn: PropTypes.func.isRequired,
  setErrMessage: PropTypes.func.isRequired,
};
