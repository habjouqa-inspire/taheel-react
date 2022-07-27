/* eslint-disable */
import {
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import React from 'react';
import FieldsCreator from 'src/Core/SchemaBuilder/FieldsCreator';
import { getFieldValue } from 'src/Core/SchemaBuilder/Utils/CoreUtils';
import centerDataFieldSchema from '../Schema/centerDataFieldSchema';
import finalLicenseDataNewSchema from '../Schema/finalLicenseDataNewSchema';

const contentField = ({ input: { value, name }, label, type, inputType, values }) => {
  const val = inputType !== 'Select' && inputType !== 'Radio' ? value : getFieldValues({ name, value, values })
  return (
    !!val ? (
      <Grid
        item
        key={name + label}
        lg={6}
        md={6}
        xs={12}
      >
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
          {label}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {val}
        </Typography>
      </Grid >) : null
  )
}

const getFieldValues = ({ name, value, values }) => {
  if (value == '')
    return '';
  if (!!values.lookupValues && !!values.lookupValues[name]) {
    const options = values.lookupValues[name];
    return getFieldValue({ value, options, values })
  } else {
    const filredTemp = centerDataFieldSchema?.filter(tempLicense => tempLicense.name === name)[0];
    if (!!filredTemp) {
      const filteredvalue = filredTemp?.options?.filter(option => option.value === value);
      if (Array.isArray(filteredvalue) && filteredvalue.length > 0)
        return filteredvalue[0].label.ar;
    }
  }

  return value;
}

const CenterSummary = ({ values, isOwnership, setIsEnableNextBtn }) => {

  return (
    <>

      <Grid
        container
        spacing={3}

      >

        <FieldsCreator
          schema={finalLicenseDataNewSchema}
          lookupObject={values.lookupValues}
          values={values} isLoading={false} formType="view"
        />
      </Grid>
      <Divider />

    </>
  )
}

export default CenterSummary;
