import {
  FormControl, FormControlLabel, Grid, Link, Typography
} from '@material-ui/core';
import { Checkbox } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';
import TermsDialog from 'src/Core/Components/TermsDialog';
import FieldsCreator from 'src/Core/SchemaBuilder/FieldsCreator';
import SummarySchema from '../../FinalLicense/Schema/SummarySchema';
import TermsContent from '../../TemporaryLicense/Sections/TermsContent';
import DaycareNewOwnerSummarySchema from '../Schema/DaycareNewOwnerSummarySchema';




const termsLabel = (openDialog) => (
  <>
    <Typography gutterBottom variant="h5" component="span">
      أنا أقر وأتعهد بالإلتزام بالشروط والأحكام الواردة والمتعلقة بالطلب
      <Link href="#" sx={{ color: '#147fbd' }}
        onClick={(event) => {
          event.preventDefault()
          openDialog()
        }
        }> (للإطلاع على الشروط والأحكام أُنقر هنا)</Link>
    </Typography>

  </>
)


const TransferNewOwnerSummary = ({ values, setField, centersForDisabilities, landingPage }) => {
  console.log('summary values', values)
  !values?.centerWorkingHours && delete values.centerWorkingHours;
  console.log('in summary', values);
  const [open, setOpen] = React.useState(false);
  const [SponsorName, setSponsorName] = React.useState(false)
  const handleClickOpen = (dialogContent, dialogTitle) => {
    setOpen(true);
  }; 
  const handleClose = (value) => {
    setOpen(false);
  };

console.log('all values test data ::',values);

 

  return (
     <Grid
      container
      mt={3}
      mb={3}
     
    > { <FieldsCreator
        values={values}
        lookupObject={values?.lookupValues}
        schema={values?.centerType==='01'?DaycareNewOwnerSummarySchema:SummarySchema}
        formType='view'
    />
      }
      {!landingPage && <Grid
        container 
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
      </Grid>}
      <TermsDialog setAgreeValue={
        () => {
          setField("agree", [true])
        }
      } dialogContent={TermsContent(values.termsAndCondtions,values)} dialogTitle={"التعهد"} open={open} setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)} onClose={handleClose} acceptBtnName="أوافق" />
    </Grid> 
    
  )
}

export default TransferNewOwnerSummary;
TransferNewOwnerSummary.propTypes = {
  section: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  values: PropTypes.object,
  index: PropTypes.number,
  name: PropTypes.string,
  fields: PropTypes.object,
  setField: PropTypes.func.isRequired,
  setSponsorName: PropTypes.func,
  centersForDisabilities: PropTypes.bool,
  landingPage: PropTypes.bool
};