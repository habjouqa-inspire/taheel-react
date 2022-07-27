/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Link,
  Box,
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import AlertDialog from 'src/Core/Components/AlertDialog';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from "react-final-form-arrays";
import FormDialog from 'src/Core/Components/FormDialog';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddPersonForm from './AddPersonForm';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { downloadDocument } from '../../API/finalLicenseAPI'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import { DownloadButtTable } from '../../Utils/finalLicenseUtil'
import moment from 'moment-hijri';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
const staffTypes = ["معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]

const Row = ({ editMode, SponsorName, setSponsorName, values, fromEdit, setFromEdit, fieldName, setFieldName, open, setOpen, setField, fields, name, index, setRowIndex }) => {
  const classes = useRowStyles();
  const [errMessage, setErrMessage] = useState('')
  const [showen, setShowen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>

      <TableRow className={classes.root}  >
        <Field
          label="fullName"
          name={`${name}.fullName`}
          component={CustomTableCell}
        />

        {!fields.value[index].idNumber ?
          <>
            {setSponsorName(true)}
            <Field
              label="iqamaNo"
              name={`${name}.iqamaNo`}
              component={CustomTableCell}
            />
          </>
          :
          <Field
            label="idNumber"
            name={`${name}.idNumber`}
            component={CustomTableCell}
          />
        }

        <TableCell >

          {moment(`${fields.value[index].birthDate}`, 'iYYYYiMMiDD').format('iDD/iMM/iYYYY')}
        </TableCell>

        <Field
          label="staffTypes"
          name={`${name}.staffTypes`}
          component={CustomTableCell}
        />
        <Field
          label="gender"
          name={`${name}.gender`}
          component={CustomTableCell}
        />

        <Field
          label="nationality"
          name={`${name}.nationality`}
          component={CustomTableCell}
        />
        {SponsorName &&
          <Field
            label="sponsorName"
            name={`${name}.sponsorName`}
            component={CustomTableCell}
          />

        }


        <TableCell >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              lg={3}
              md={3}
              xs={12}
            >
              <IconButton onClick={() => setShowen(!showen)}>
                {!showen ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Grid>
            <Grid
              item
              lg={3}
              md={3}
              xs={12}
            >
              <IconButton
                color="primary"
                component="span"
                onClick={() => {
                  setFromEdit(true);
                  setRowIndex(index);
                  setFieldName(name);
                  const {
                    idNumber,
                    iqamaNo,
                    lastName,
                    nationality,
                    nationalityBtn,
                    day,
                    month,
                    year,
                    fullName,
                    gender,
                    birthDate,
                    staffTypes,
                    cv,
                    EducationalQualification,
                    MedicalPractice,
                    sponsorName
                  } = fields.value[index];
                  setField("idNumber", idNumber);
                  setField("iqamaNo", iqamaNo);
                  setField("nationality", nationality)
                  setField("nationalityBtn", nationality ? "سعودي" : "غير سعودي")
                  // setField("nationalityBtn", editMode ? nationality  ? "سعودي" : "غير سعودي" : nationalityBtn)
                  setField("day", day);
                  setField("month", month);
                  setField("year", year);
                  setField("fullName", fullName)
                  setField("gender", gender)
                  setField("sponsorName", sponsorName)
                  setField("birthDate", birthDate)
                  setField("staffTypes", staffTypes)
                  setField("cv", cv)
                  setField("EducationalQualification", EducationalQualification)
                  setField("MedicalPractice", MedicalPractice)
                  handleClickOpen();
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              lg={3}
              md={3}
              xs={12}
            >
              <IconButton
                color="primary"
                component="span"
                onClick={() => {
                  var customers = [...values.customers]
                  fields.remove(index);
                  setField("nationality", "")
                  setField("nationalityBtn", "")
                  setField("idNumber", "");
                  setField("iqamaNo", "");
                  setField("day", "");
                  setField("month", "");
                  setField("year", "");
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={showen} timeout="auto" unmountOnExit  >

            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                < DownloadButtTable docIDs={fields.value[index].cv} name={`${name}.cv`} label='السيرة الذاتية' />
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}

              >
                < DownloadButtTable docIDs={fields.value[index].EducationalQualification} name={`${name}.EducationalQualification`} label='المؤهلات التعليمية' />
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}

              >
                {//['ممرض','أخصائي علاج طبيعي', 'أخصائي علاج وظيفي', 'أخصائي نطق و تخاطب'].includes(fields.value[index].staffTypes) &&
                  !!fields.value[index]?.MedicalPractice &&
                  (< DownloadButtTable docIDs={fields.value[index].MedicalPractice} name={`${name}.MedicalPractice`} label='رخصة المزاولة' />)
                }
              </Grid>
            </Grid>
          </Collapse >
        </TableCell>
      </TableRow>

    </>)

}
const managersCountComp = ({ }) => (
  <span>
    <IconButton>
      <FieldArray name="customers">
        {({ fields }) => {
          let count = 0;
          if (fields.value) {
            count = fields.value.filter(customer => customer.staffTypes === "مدير").length
          }
          if (count > 0) {
            if (count === 1) {
              return (<CheckCircleIcon style={{ color: '#04AA6D' }} />);
            } else
              return (<CancelIcon style={{ color: 'red' }} />);
          }
          return (<CheckCircleIcon style={{ color: 'gray' }} />);
        }}
      </FieldArray>
    </IconButton>
  </span>

)
const teachersCountComp = ({ maxValue }) => (
  <span>
    <IconButton>
      <FieldArray name="customers">
        {({ fields }) => {
          let count = 0;
          if (fields.value) {
            count = fields.value.filter(customer => customer.staffTypes === "معلم تربية خاصة").length
          }
          if (count >= 1) {
            console.log('personDetails :: teacherComp', count);
            if (Math.ceil(maxValue / 8) <= count) {
              return (<CheckCircleIcon style={{ color: '#04AA6D' }} />);
            } else
              return (<CancelIcon style={{ color: 'red' }} />);
          }
          return (<CheckCircleIcon style={{ color: 'gray' }} />);
        }}
      </FieldArray>
    </IconButton>
  </span>

)
const oneOfEachType = ({ isHealthCare }) => (
  < span >
    <IconButton>
      <FieldArray name="customers">


        {({ fields }) => {
          let FilteredStaffTypes = staffTypes.filter((type) =>
            type != "سائق" &&
            type != "مرافق سائق"

          );
          console.log('health care servicess personDetails:::', FilteredStaffTypes);
          if (isHealthCare === 'no') {
            FilteredStaffTypes = FilteredStaffTypes.filter((type) =>
              type != "أخصائي نطق و تخاطب" &&
              type != "أخصائي علاج وظيفي" &&
              type != "أخصائي علاج طبيعي" &&
              type != "ممرض"
            )
            console.log('health care servicess personDetails::: filtered staff type', FilteredStaffTypes);

          }
          let typeCount = 0;
          let error = null;

          if (fields?.value?.length != 0) {

            error = FilteredStaffTypes?.every((sType) => {
              typeCount = fields?.value?.filter(customer =>
                sType === customer?.staffTypes
              ).length;
              return typeCount > 0;
            }

            )
          }
          console.log('personDetails :: error', error);

          if (error === null) { return (<CheckCircleIcon style={{ color: 'gray' }} />) }

          if (!error) return (<CancelIcon style={{ color: 'red' }} />);
          if (error) return (<CheckCircleIcon style={{ color: '#04AA6D' }} />);;


        }}
      </FieldArray>
    </IconButton>
  </span >

)
const DrivierAndAsistant = ({ }) => (
  < span >
    <IconButton>
      <FieldArray name="customers">


        {({ fields }) => {

          let driversCounts = 0;
          let asistantCounts = 0;

          if (fields?.value?.length != 0) {

            driversCounts = fields?.value?.filter(customer =>
              customer?.staffTypes === 'سائق'
            ).length;
            asistantCounts = fields?.value?.filter(customer =>
              customer?.staffTypes === 'مرافق سائق'
            ).length;
          }
          console.log('personDetails :: drivers ', driversCounts, 'personDetails :: assistants', asistantCounts);


          if (driversCounts != asistantCounts) return (<CancelIcon style={{ color: 'red' }} />);
          return (<CheckCircleIcon style={{ color: '#04AA6D' }} />);


        }}
      </FieldArray>
    </IconButton>
  </span >

)

const PersonDetials = ({ editMode, Condition, MedicalPracticeCondition, setField, pop, push, values }) => {
  const [open, setOpen] = useState(false);
  const moreInfoLabel = '   المزيد من المعلومات   ';
  const [errMessage, setErrMessage] = useState(null);
  const [fieldName, setFieldName] = useState(null);
  const [rowIndex, setRowIndex] = useState(-1);
  const [fromEdit, setFromEdit] = useState(false)
  const [SponsorName, setSponsorName] = useState(false)
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  var [managersCount, setManagersCount] = useState(0);

  useEffect(() => {
    handleClickOpenInfo(`في حال مطالبة المركز لأخذ الترخيص للعمل في فترتين (صباحية و مسائية) فيجب مراعاة أن يتم توفير كوادر مختلفة لكل فترة قبل إدخال الكادر`, '')
  }, [])


  const handleClickOpenInfo = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle)
    setOpenInfo(true);
  };
  const handleCloseInfo = (value) => {
    setOpenInfo(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Grid
      container
      mt={4}
      spacing={3}
    >
      <Grid
        item
        md={6}
        xs={12}
        className="custom-label-field"
      >
        <Typography
          color="textSecondary"
          variant="h2"

        >متطلبات قائمة الكوادر</Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          sx={{
            mt: 3
          }}

        >
          <Field
            label={'manager'}
            name={'managersCount'}
            component={managersCountComp}
          />
          مدير عدد  1
          <Link
            onClick={() => handleClickOpenInfo(`يسمح بتحديد عدد مدير #1 فقط  `, '')}
            sx={{
              mt: 3,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            variant="h6"
          >
            {moreInfoLabel}
          </Link>
        </Typography>

        <Typography
          color="textSecondary"
          variant="body1"

        >

          <Field
            label={'teachers'}
            name={'teachersCount'}
            component={teachersCountComp}
            maxValue={(values.beneficiariesNum) ? values.beneficiariesNum : 0}
          />
          معلم تربية خاصة نسبة 1 إلى 8
          <Link
            onClick={() => handleClickOpenInfo(`-تقوم المنصة باحتساب عدد # كادر معلم تربية خاصة وذلك حسب:
             (على الأقل 1 لكل 8 مستفيد من عدد المستفيدين المطلوب)`, '')}
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            variant="h6"
          >
            {moreInfoLabel}
          </Link>
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"

        >

          <Field
            label={'teachers'}
            name={'teachersCount'}
            component={oneOfEachType}
            isHealthCare={(values?.healthServices)}
          />
          على الأقل كادر واحد لكل نوع

        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"

        >

          <Field
            label={'teachers'}
            name={'teachersCount'}
            component={DrivierAndAsistant}
            isHealthCare={(values?.healthServices)}
          />
          أن يكون لكل سائق مرافق سائق

        </Typography>
        <Button
          sx={{ mt: 5 }}
          variant="outlined"
          color="primary"
          fullWidth
          endIcon={<AddIcon style={{ marginRight: 10 }} />}
          onClick={() => {
            setRowIndex(-1);
            console.log(`-- rowIndex :: ${rowIndex}`)
            setFromEdit(false);
            setField("nationality", "")
            setField("nationalityBtn", "")
            setField("idNumber", "");
            setField("iqamaNo", "");
            setField("day", "");
            setField("month", "");
            setField("year", "");
            setField("fullName", "")
            setField("gender", "")
            setField("sponsorName", "")
            setField("birthDate", "")
            setField("staffTypes", "")
            setField("cv", "")
            setField("cvAtt", "")
            setField("EducationalQualification", "")
            setField("MedicalPractice", "")
            setField("EducationalQualificationAtt", "")
            setField("MedicalPracticeAtt", "")
            setFieldName(null);
            handleClickOpen();
          }}
        >
          إضافة كادر
        </Button>
      </Grid>
      <Grid
        item
        md={12}
        xs={12}
        className="custom-label-field"
      >
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell > الاسم الكامل </TableCell>
                <TableCell > رقم الهوية / الإقامة </TableCell>
                <TableCell > تاريخ الميلاد </TableCell>
                <TableCell > نوع الكادر </TableCell>
                <TableCell > الجنس </TableCell>
                <TableCell > الجنسية</TableCell>
                {SponsorName &&
                  <TableCell > اسم الكفيل</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>

              <FieldArray name="customers">
                {({ fields }) => fields.map((name, index) => (
                  <Row key={index + "customers"} editMode={editMode} managersCount={managersCount} setManagersCount={setManagersCount} SponsorName={SponsorName} setSponsorName={setSponsorName} values={values} fromEdit={fromEdit} setFromEdit={setFromEdit} fieldName={fieldName} setFieldName={setFieldName} open={open} setOpen={setOpen} setField={setField} fields={fields} name={name} index={index} setRowIndex={setRowIndex} />
                ))}
              </FieldArray>

            </TableBody>
          </Table>
        </TableContainer>
        <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={openInfo} onClose={handleCloseInfo} acceptBtnName="تم" />

      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        className="custom-label-field"
      />
      <FormDialog
        title={fromEdit ? "تحديث بيانات الكادر" : " إضافة كادر"}
        openPopup={open}
        setOpenPopup={setOpen}
        onClose={() => {
          setField("nationality", "")
          setField("nationalityBtn", "")
          setField("idNumber", "");
          setField("iqamaNo", "");
          setField("day", "");
          setField("month", "");
          setField("year", "");
          setField("fullName", "")
          setField("gender", "")
          setField("sponsorName", "")
          setField("birthDate", "")
          setField("staffTypes", "")
          setField("cv", "")
          setField("cvAtt", "")
          setField("EducationalQualification", "")
          setField("MedicalPractice", "")
          setField("EducationalQualificationAtt", "")
          setField("MedicalPracticeAtt", "")
        }}
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
        <AddPersonForm setErrMessage={(errMessage) => setErrMessage(errMessage)} fromEdit={fromEdit} MedicalPracticeCondition={MedicalPracticeCondition} setField={setField} pop={pop} push={push} values={values} setOpenPopup={setOpen} fieldName={fieldName} Condition={Condition} rowIndex={rowIndex} />
      </FormDialog>
    </Grid>
  );
};
const CustomTableCell = ({ input: { value, name }, label }) => (
  <>
    <TableCell component="th" scope="row">
      {value}
    </TableCell>
  </>
)
export default PersonDetials;
PersonDetials.propTypes = {
  Condition: PropTypes.func.isRequired,
  setField: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  input: PropTypes.func,
};