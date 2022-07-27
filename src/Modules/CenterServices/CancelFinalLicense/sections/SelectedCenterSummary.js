/* eslint-disable */

import {
    Grid,
    Typography
} from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import React from 'react';
import { Field } from 'react-final-form';
import FieldsCreator from 'src/Core/SchemaBuilder/FieldsCreator';
import { getFieldValue } from 'src/Core/SchemaBuilder/Utils/CoreUtils';
import SelectedCenterDetailsSchema from '../Schema/SelectedCenterDetailsSchema';


const contentField = ({ input: { value, name }, label, inputType, values }) => {
    const val = inputType !== 'Select' && inputType !== 'Radio' ? value : getFieldValues({ name, value, values })
    return !!val ? (
        <Grid
            item
            key={name + val}
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
        </Grid>
    ) : null
}

const getFieldValues = ({ name, value, values }) => {
    if (value == '')
        return '';
    if (!!values.lookupValues && !!values.lookupValues[name]) {
        const options = values.lookupValues[name];
        return getFieldValue({ value, options, values })
    } else {
        const filredTemp = SelectedCenterDetailsSchema?.filter(tempLicense => tempLicense.name === name)[0];
        if (!!filredTemp) {
            const filteredvalue = filredTemp?.options?.filter(option => option.value === value);
            if (Array.isArray(filteredvalue) && filteredvalue.length > 0)
                return filteredvalue[0].label.ar;
        }
    }

    return value;
}

const SelectedCenterSummary = ({ values, setField, setIsEnableNextBtn }) => {
    console.log('cancel final summary :: values',values);
    return (
        <>
            <Grid
                container
                mt={4}
                spacing={3}
            >
                <FieldsCreator
                        schema={SelectedCenterDetailsSchema}
                        formType="view"
                        values={values}
                        lookupObject={values.lookupValues}
                      />
                        <Grid
                item
                md={12}
                xs={12}
            >
                <Field
                    fullWidth
                    required
                    label="سبب الإلغاء"
                    name="cancelingReason"
                    component={TextFieldFinal}
                    type="text"
                    multiline
                    rows="4"
                    variant="outlined"
                    dir="rtl"
                    className="custom-field"
                />
            </Grid>
            </Grid>
        </>
    )
}

export default SelectedCenterSummary;
