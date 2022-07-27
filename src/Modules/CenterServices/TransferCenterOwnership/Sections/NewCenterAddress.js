/* eslint-disable */
import { Grid } from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Field } from 'react-final-form';
import MapContainer from 'src/Core/Components/MapContainer';

const NewCenterAddress = ({ values, Condition, setField, setIsEnableNextBtn, setErrMessage }) => {

  useEffect(() => {
    setIsEnableNextBtn(true);
  }, []);

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
export default NewCenterAddress;

NewCenterAddress.propTypes = {
  Condition: PropTypes.func.isRequired,
  setField: PropTypes.func
};
