/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid } from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import MapContainer from 'src/Core/Components/MapContainer';
import { stringify } from 'uuid';


const CenterAddress = ({ Condition, setField, values, setErrMessage,setIsEnableNextBtn }) => {
  setIsEnableNextBtn(true);
  console.log("addational:---",JSON.stringify(values.centerLocation_r))
  
  return (
    <>
      <Grid
        container
        spacing={3}
        mt={3}
      >
        <MapContainer setErrMessage={(errMessage) => { setErrMessage(errMessage) }} setField={(fieldName, fieldValue) => { setField(fieldName, fieldValue) }} values={values} />
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="المدينة"
            name="city"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            disabled ={values?.setCity}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="الحي"
            name="sub"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            disabled ={values?.setSub}
          />

        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="الشارع"
            name="street"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="رقم المبنى"
            name="buildNo"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="الرمز البريدي"
            name="postalCode"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            label="الرقم الإضافي"
            name="additionalNo"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default CenterAddress;

CenterAddress.propTypes = {
  Condition: PropTypes.func.isRequired,
  setIsEnableNextBtn: PropTypes.func,
  setField: PropTypes.func,
  values: PropTypes.object,
  setErrMessage: PropTypes.func
};
