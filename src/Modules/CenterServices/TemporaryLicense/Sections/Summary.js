/* eslint-disable*/
import React from 'react';
import {
    Divider,
    Grid,
    InputAdornment,
    FormControl,
    Typography,
    FormControlLabel,
    Link
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { TextField as TextFieldFinal, Checkbox } from 'final-form-material-ui';
import tempLicenseFieldSchema from '../Schema/tempLicenseFieldSchema';
import TermsContent from './TermsContent';
import TermsDialog from 'src/Core/Components/TermsDialog';
import { getDependOn, getDependOnWithValues, isAllValuesIn } from '../Utils/temporayLicenseUtil';
import { getFieldValue, getOptionsDepend } from 'src/Core/SchemaBuilder/Utils/CoreUtils';
import ContentField from 'src/Core/SchemaBuilder/FieldsInputs/ContentField';
import { getAddressFromObject } from '../../TransferCenterOwnership/Utils/FormateJson';

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
const termsLabel = (openDialog) => (
    <>
        <Typography gutterBottom variant="h5" component="span">
            أنا أقر وأتعهد بالإلتزام بالشروط والأحكام الواردة والمتعلقة بالطلب
            <Link sx={{ color: '#147fbd' }}
                onClick={(event) => {
                    event.preventDefault()
                    openDialog()
                }
                }> (للإطلاع على الشروط والأحكام أنقر هنا) </Link>
        </Typography>

    </>
)
const getFieldValues = ({ name, value, values }) => {
    if (value == '')
        return '';
    if (!!values.lookupValues && !!values.lookupValues[name]) {
        const options = values.lookupValues[name];
        return getFieldValue({ value, options, values })
    } else {
        const filredTemp = tempLicenseFieldSchema?.filter(tempLicense => tempLicense.name === name)[0];
        if (!!filredTemp) {
            const filteredvalue = filredTemp?.options?.filter(option => option.value === value);
            if (Array.isArray(filteredvalue) && filteredvalue.length > 0)
                return filteredvalue[0].label.ar;
        }
    }

    return value;
}

const Summary = ({ Condition, dialog, setField, values }) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (dialogContent, dialogTitle) => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
    };
    return (
        <>
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                معلومات المركز و معلومات المالك
            </Typography>
            <Grid
                container
                spacing={3}
                mt={3}
                mb={3}
            >
                {tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "CenterInfo" && !tempLicense.dependOn).map(filteredTempLicense => (
                    <Field
                        label={filteredTempLicense.label.ar}
                        name={filteredTempLicense.name}
                        component={contentField}
                        values={values}
                        inputType={filteredTempLicense.type}
                    />
                ))}
                {tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "CenterInfo" && tempLicense.dependOn).map(filteredTempLicense => (
                    <Condition schema={filteredTempLicense} values={values}>
                        <Field
                            label={filteredTempLicense.label.ar}
                            name={filteredTempLicense.name}
                            component={contentField}
                            values={values}
                            inputType={filteredTempLicense.type}
                        />
                    </Condition>
                ))}
                {tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "OwnerInfo" && tempLicense.dependOn).map(filteredTempLicense => (
                    <Condition schema={filteredTempLicense} values={values}>
                        <Field
                            label={filteredTempLicense.label.ar}
                            name={filteredTempLicense.name}
                            component={contentField}
                            values={values}
                            inputType={filteredTempLicense.type}
                        />
                    </Condition>
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
                valueFunc={(v)=>getAddressFromObject(v)}
                pauseMarker={true}
                tLabel={"موقع المركز"}
                showChipAreaPicker= {true}
                values={values}
                />
                {tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "CenterAddress" && !tempLicense.dependOn).map(filteredTempLicense => (
                    <Field
                        label={filteredTempLicense.label.ar}
                        name={filteredTempLicense.name}
                        component={contentField}
                        values={values}
                        inputType={filteredTempLicense.type}
                    />
                ))}
            </Grid>
            <Divider />
            {
                !!tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "CenterDetails").filter(tempLicense => getDependOnWithValues(tempLicense, values))[0] && (
                    <>
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            mb={4}
                            mt={6}
                            variant="h4"
                        >
                            تفاصيل المركز
                        </Typography>
                        <Grid
                            container
                            spacing={3}
                            mt={3}
                            mb={3}
                        >
                            {tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "CenterDetails" && !tempLicense.dependOn).map(filteredTempLicense => (
                                <Field
                                    label={filteredTempLicense.label.ar}
                                    name={filteredTempLicense.name}
                                    component={contentField}
                                    values={values}
                                    inputType={filteredTempLicense.type}
                                />
                            ))}
                            {tempLicenseFieldSchema.filter(tempLicense => tempLicense.sectionName === "CenterDetails" && tempLicense.dependOn).map(filteredTempLicense => (
                                <Condition schema={filteredTempLicense} values={values}>
                                    <Field
                                        label={filteredTempLicense.label.ar}
                                        name={filteredTempLicense.name}
                                        component={contentField}
                                        values={values}
                                        inputType={filteredTempLicense.type}
                                    />
                                </Condition>
                            ))}
                        </Grid>
                    </>
                )
            }
            <Divider />
            <Typography
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h4"
            >
                تقييم الجاهزية
            </Typography>
            <Grid
                container
                lg={12}
                md={12}
                xs={12}
                mt={3}
            >
                <Field
                    label="نتيجة التقييم:"
                    name="questionnairesScore"
                    component={contentField}
                    values={values}
                    type="Text"
                />
            </Grid>
            <Grid
                container
                lg={12}
                md={12}
                xs={12}
                mt={3}
            >
                <Field name="agree[0]" mt={3}>
                    {({ input, meta }) => ( // eslint-disable-line no-unused-vars
                        <FormControl component="fieldset" error={meta.error} required>
                            {meta.error && meta.touched && <FormHelperText dir="rtl">{meta.error}</FormHelperText>}
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
                () => { setField("agree", [true]) }
            } dialogContent={TermsContent(values?.termsAndCondtions)} dialogTitle={"التعهد"} open={open} setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)} onClose={handleClose} acceptBtnName="أوافق" />

        </>
    )
};

export default Summary;

Summary.propTypes = {
    Condition: PropTypes.func.isRequired,
    setField: PropTypes.func.isRequired,
    values: PropTypes.func.isRequired,
    dialog: PropTypes.func.isRequired,
};
