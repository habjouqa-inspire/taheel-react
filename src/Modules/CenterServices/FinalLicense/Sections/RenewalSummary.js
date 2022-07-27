import {
  Divider, FormControl, FormControlLabel, Grid, IconButton, Link, Table,
  TableBody, TableCell, TableContainer, TableHead,
  TableRow, Typography
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Checkbox } from 'final-form-material-ui';
import moment from 'moment-hijri';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from "react-final-form-arrays";
import TermsDialog from 'src/Core/Components/TermsDialog';
import TermsContent from '../../TemporaryLicense/Sections/TermsContent';
import finalLicenseFieldSchema from '../Schema/finalLicenseRenewalFieldSchema';
import { DownloadButtTable } from '../Utils/finalLicenseUtil';


const contentField = ({ input: { value, name }, label, inputType }) => (
  <>
    <Typography gutterBottom variant="body2" color="textSecondary" component="p">
      {label}
    </Typography>
    <Typography gutterBottom variant="h5" component="h2">
      {inputType !== 'Select' && inputType !== 'Radio' ? value : getFieldValue({ name, value })}
    </Typography>
  </>
)

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const termsLabel = (openDialog) => (
  <>
    <Typography gutterBottom variant="h5" component="span">
    أنا أقر وأتعهد بالإلتزام بالشروط والأحكام الواردة والمتعلقة بالطلب
      <Link href="#" sx={{ color: '#147fbd' }}
        onClick={(event) => {
          event.preventDefault()
          openDialog()
        }
        }> (للاطلاع على الشروط والأحكام انقر هنا)</Link>
    </Typography>

  </>
)
const getFieldValue = ({ name, value }) => {
  if (value == '')
    return '';
  const filredFinal = finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.name === name);
  if (filredFinal.length > 0) {
    const filteredvalue = filredFinal[0]?.options?.filter(option => option.value == value);
    if (filteredvalue.length > 0)
      return filteredvalue[0].label.ar;
  }
  return '';
}

const Summary = ({ values, setField }) => {
  console.log("=========================>values: " + JSON.stringify(values))
  // console.log("=========================>values: " + values.healthServiceAttachment)
  // console.log("=========================>values: " + values.operationPlan)

  const [open, setOpen] = React.useState(false);
  const [SponsorName, setSponsorName] = React.useState(false)
  const handleClickOpen = (dialogContent, dialogTitle) => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };



  const Row = ({ fields, setSponsorName, name, index }) => {
    console.log(`RenewalSummary :: Row :: name: ${JSON.stringify(name)}`)
    const classes = useRowStyles();
    const [showen, setShowen] = React.useState(true);
    const staffTypes = ["معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]


    return (
      <>
        <TableRow className={classes.root} key={name}>

          <TableCell component="th" scope="row">
            {name.fullName}
          </TableCell>

          <TableCell component="th" scope="row">
            {name.idNumber ? name.idNumber : name.iqamaNo}
          </TableCell>
          <TableCell component="th" scope="row">
            {moment(`${name.birthDate}`, 'iYYYYiMMiDD').format('iDD/iMM/iYYYY')}
          </TableCell>

          <TableCell component="th" scope="row">
            {name.staffTypes}
          </TableCell>

          <TableCell component="th" scope="row">
            {name.gender}
          </TableCell>

          <TableCell component="th" scope="row">
            {name.nationality}
          </TableCell>

          {name.iqamaNo ?
            <>
              {setSponsorName(true)}
              <TableCell component="th" scope="row">
                {name.sponsorName}
              </TableCell>
            </>
            :
            <TableCell></TableCell>
          }

          <TableCell>
            <IconButton onClick={() => setShowen(!showen)}>
              {showen ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </TableCell>

        </TableRow>
        <TableRow >
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={!showen} className={`Attach${index}`} timeout="auto" unmountOnExit  >

              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={4}
                  md={6}
                  xs={12}
                >
                  < DownloadButtTable docIDs={name.cv} name={`${name}.cv`} label='السيرة الذاتية' />

                </Grid>
                <Grid
                  item
                  lg={4}
                  md={6}
                  xs={12}
                >
                  < DownloadButtTable docIDs={name.EducationalQualification} name={`${name}.EducationalQualification`} label='المؤهلات التعليمية' />

                </Grid>
                <Grid
                  item
                  lg={4}
                  md={6}
                  xs={12}
                >
                  < DownloadButtTable docIDs={name.MedicalPractice} name={`${name}.MedicalPractice`} label='رخصة المزاولة' />

                </Grid>
              </Grid>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }


  return (
    <>
      <Typography
        color="textPrimary"
        gutterBottom
        mb={4}
        mt={6}
        variant="h4"
      >
        معلومات المركز
      </Typography>
      <Grid
        container
        spacing={3}
        mt={3}
        mb={3}
      >

        {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "CenterDetails" && !fintalLicense.dependOn).map(filteredFinalLicense => (
          <Grid
            item
            key={filteredFinalLicense.id}
            lg={6}
            md={6}
            xs={12}
          >
            <Field
              label={filteredFinalLicense.label.ar}
              name={filteredFinalLicense.name}
              component={contentField}
              inputType={filteredFinalLicense.type}
            />
          </Grid>
        ))}

      </Grid>
      <Divider />
      <Typography
        color="textPrimary"
        gutterBottom
        mb={4}
        mt={6}
        variant="h4"
      >
        الطاقة الاستيعابية
      </Typography>
      <Grid
        container
        spacing={3}
        mt={3}
        mb={3}
      >
        {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "Capacity" && !fintalLicense.dependOn).map(filteredFinalLicense => (
          <Grid
            item
            key={filteredFinalLicense.id}
            lg={6}
            md={6}
            xs={12}
          >
            <Field
              label={filteredFinalLicense.label.ar}
              name={filteredFinalLicense.name}
              component={contentField}
              inputType={filteredFinalLicense.type}
            />
          </Grid>
        ))}
      </Grid>

      <Divider />
      <Typography
        color="textPrimary"
        gutterBottom
        mb={4}
        mt={6}
        variant="h4"
      >
        المتطلبات
      </Typography>
      <Grid
        container
        spacing={10}
        mb={3}
      >
        {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "Requirements" && !fintalLicense.dependOn).map(filteredFinalLicense => (

values[filteredFinalLicense.name][0] ||values[filteredFinalLicense.name]? (<Grid
            item
            key={filteredFinalLicense.id}
            lg={6}
            md={6}
            xs={12}
          >
             {filteredFinalLicense.type === 'Text' ? <>
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                      {filteredFinalLicense.label.ar}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {getDateFromObject({date:values[filteredFinalLicense?.name],req: 'iYYYY/iMM/iDD'})}
                    </Typography>
                  </> : <></>}
            < DownloadButtTable docIDs={values[filteredFinalLicense.name]} name={filteredFinalLicense.name} label={filteredFinalLicense.label.ar} />
          </Grid>
          ) : ''
        ))}
      </Grid>

      <Divider />
      <Typography
        color="textPrimary"
        gutterBottom
        mb={4}
        mt={6}
        variant="h4"
      >
        الخدمات الصحية
      </Typography>
      <Grid
        container
        spacing={3}
        mt={3}
        mb={3}
      >
        {finalLicenseFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "HealthServices" && !fintalLicense.dependOn).map(filteredFinalLicense => (
          values.healthServices === 'yes' ? (
            <>
              <Grid
                item
                key={filteredFinalLicense.id}
                lg={6}
                md={6}
                xs={12}
              >
                <Field
                  label={filteredFinalLicense.label.ar}
                  name={filteredFinalLicense.name}
                  component={contentField}
                  inputType={filteredFinalLicense.type}
                />
              </Grid>
            </>
          )
            : filteredFinalLicense.name === 'healthServices' && (
              <>
                <Grid
                  item
                  key={filteredFinalLicense.id}
                  lg={6}
                  md={6}
                  xs={12}
                >
                  <Field
                    label={filteredFinalLicense.label.ar}
                    name={filteredFinalLicense.name}
                    component={contentField}
                    inputType={filteredFinalLicense.type}
                  />
                </Grid>
              </>
            )
        ))}
        {values.healthServices === 'yes' && (
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            < DownloadButtTable docIDs={values.healthServiceAttachment} name='healthServiceAttachment' label='مرفقات الخدمات الصحية' />
          </Grid>
        )}

      </Grid>
      <Divider />

      {Array.isArray(values.customers) && values.customers.length > 0 &&
        <>
          <Typography
            color="textPrimary"
            gutterBottom
            mb={4}
            mt={6}
            variant="h4"
          >
            معلومات الكوادر
          </Typography>
          <Grid
            container
            spacing={3}
            mt={3}
            mb={3}
          >

            <Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell> الاسم الكامل </TableCell>
                      <TableCell> رقم الهوية / الإقامة </TableCell>
                      <TableCell > تاريخ الميلاد </TableCell>
                      <TableCell> نوع الكادر </TableCell>
                      <TableCell> الجنس </TableCell>
                      <TableCell> الجنسية</TableCell>
                      {SponsorName &&
                        <TableCell > اسم الكفيل</TableCell>
                      }
                      <TableCell> المرفقات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {<FieldArray name="customers">
                      {({ fields }) => fields && fields.value && fields.value.map((name, index) => (
                        <Row key={index} setSponsorName={setSponsorName} fields={fields} name={name} index={index} />
                      ))}
                    </FieldArray>
                    }
                  </TableBody>
                </Table>
              </TableContainer>

            </Grid>
          </Grid>
          <Divider />
        </>
      }

      <Grid
        container
        lg={12}
        md={12}
        xs={12}
        mt={3}
      >
        <Field name="agree[0]" mt={3}>
          {({ meta }) => ( // eslint-disable-line no-unused-vars
            <FormControl component="fieldset" error={meta.error} required>
              <FormControlLabel
                label={termsLabel(handleClickOpen)}
                control={
                  <Field
                    name="agree[0]"
                    component={Checkbox}
                    type="checkbox"
                  />
                }
              />
            </FormControl>
          )}
        </Field>
      </Grid>
      <TermsDialog setAgreeValue={
        () => {
          setField("agree", [true])
        }
      } dialogContent={TermsContent(values.termsAndConditions,values)} dialogTitle={"التعهد"} open={open} setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)} onClose={handleClose} acceptBtnName="أوافق" />
    </>
  )
}

export default Summary;
Summary.propTypes = {
  section: PropTypes.func.isRequired,
  label: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
  index: PropTypes.func.isRequired,
  name: PropTypes.func.isRequired,
  fields: PropTypes.func.isRequired,
  setField: PropTypes.func.isRequired,
  setSponsorName: PropTypes.func.isRequired,

};