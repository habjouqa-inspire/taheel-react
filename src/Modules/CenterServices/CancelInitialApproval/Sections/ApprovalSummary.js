/* eslint-disable */

import {
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import React from 'react';
import { Field } from 'react-final-form';
import ContentField from 'src/Core/SchemaBuilder/FieldsInputs/ContentField';
import { getFieldValue } from 'src/Core/SchemaBuilder/Utils/CoreUtils';
import { getAddressFromObject } from '../../TransferCenterOwnership/Utils/FormateJson';
import initialApprovalDetailsSchema from '../Schema/initialApprovalDetailsSchema';

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
        const filredTemp = initialApprovalDetailsSchema?.filter(tempLicense => tempLicense.name === name)[0];
        if (!!filredTemp) {
            const filteredvalue = filredTemp?.options?.filter(option => option.value === value);
            if (Array.isArray(filteredvalue) && filteredvalue.length > 0)
                return filteredvalue[0].label.ar;
        }
    }

    return value;
}
const ApprovalSummary = ({ values, setField, setIsEnableNextBtn }) => {

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
                {
                    initialApprovalDetailsSchema.filter(fintalLicense => fintalLicense.sectionName.id === "approvalDetails").map(filteredFinalLicense => (
                        !!values[filteredFinalLicense.name] && (

                            <Field
                                label={filteredFinalLicense.label.ar}
                                name={filteredFinalLicense.name}
                                values={values}
                                component={contentField}
                                inputType={filteredFinalLicense.type}
                            />
                        )

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
                عنوان المركز
            </Typography>

            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                <ContentField
                    type='Map'
                    pauseMarker={true}
                    valueFunc={(v) => getAddressFromObject(v)}
                    values={values}
                    tLabel={"موقع المركز"}
                    showChipAreaPicker= {true}
                />
                {
                    initialApprovalDetailsSchema.filter(fintalLicense => fintalLicense.sectionName.id === "centerAddress" && !fintalLicense.dependOn).map(filteredFinalLicense => (
                        !!values[filteredFinalLicense.name] && (<Grid
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
                        </Grid>)
                    ))}
            </Grid>
        </>
    )
}

export default ApprovalSummary;
