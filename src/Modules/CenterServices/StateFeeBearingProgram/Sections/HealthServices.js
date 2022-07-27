/* eslint-disable no-unused-vars */
import {
  Grid,
  MenuItem
} from '@material-ui/core';
import { Select } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import FileUploaderComp from 'src/Modules/CenterServices/FinalLicense/Components/FileUploader';


const HealthServices = ({ values, setField }) => {

  const [resetAttachment, setResetAttachment] = useState(false);

  var multipleDocs = []
  const setDocument = (name, docID, multiple) => {
    if (!multiple)
      setField(name, [docID])
    else {
      multipleDocs.push(docID)
      setField(name, multipleDocs)
    }
  }
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
              label="نوع الخدمة الصحية"
              name="newHealthServiceType"
              component={Select}
              required
              dir="rtl"
              variant="outlined"
              className="custom-field"
              formControlProps={{ fullWidth: true }}
            >
              <MenuItem value={1}> رخصة من وزارة الصحة </MenuItem>
              <MenuItem value={2}> عقد شراكة مع منشأة مرخصة صحياً </MenuItem>
            </Field>
            <OnChange name="newHealthServiceType">
              {(value, previous) => {
                console.log("-- healthServiceType:: OnChange :: resetAttachment " + resetAttachment)
                setField("newHealthServiceAttachment", "");
                setResetAttachment(prev => !prev);

              }}
            </OnChange>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Field
              label={values.newHealthServiceType ? values.newHealthServiceType === 1 ? 'إرفاق رخصة وزارة الصحة' : 'إرفاق عقد الشراكة' : 'إرفاق الخدمة الصحية'}
              name="newHealthServiceAttachment"
              component={FileUploaderComp}
              multipleDocs={false}
              setField={setField}
              resetAttachment={resetAttachment}
              setDocument={setDocument}
              values={values}
            />
          </Grid>
      </Grid>
    </>

  );
}
export default HealthServices;

HealthServices.propTypes = {
  values: PropTypes.object.isRequired,
  setField: PropTypes.func.isRequired,
};