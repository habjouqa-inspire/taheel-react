/* eslint-disable */

import {
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import React from 'react';
import { Field } from 'react-final-form';
import centerDataFieldSchema from '../../TransferCenterLocation/Schema/centerDataFieldSchema';

const contentField = ({ input: { value, name }, label, inputType }) => (
  <>
    <Typography gutterBottom variant="body2" color="textSecondary" component="p">
      {label}
    </Typography>
    <Typography gutterBottom variant="h5" component="h2">
      {value}
    </Typography>
  </>
)

const CenterSummary = ({ values }) => {
  console.log("=========================>values Inside Center Summary: " + JSON.stringify(values))

  return (
    <>
      <Typography
        color="textPrimary"
        gutterBottom
        mb={4}
        mt={6}
        variant="h4"
      >
        بيانات المركز
      </Typography>
      <Grid
        container
        spacing={3}
        mt={3}
        mb={3}
      >

        {centerDataFieldSchema.filter(fintalLicense => fintalLicense.sectionName === "CenterDetails" && !fintalLicense.dependOn).map(filteredFinalLicense => (
          <Grid
            item
            key={filteredFinalLicense.id}
            lg={4}
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

    </>
  )
}

export default CenterSummary;
