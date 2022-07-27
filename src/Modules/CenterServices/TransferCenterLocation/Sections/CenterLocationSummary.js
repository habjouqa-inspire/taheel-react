/* eslint-disable */
import {
    FormControl, FormControlLabel, Grid, Link, Typography
} from '@material-ui/core';
import { Checkbox } from 'final-form-material-ui';
import React from 'react';
import { Field } from 'react-final-form';
import TermsDialog from 'src/Core/Components/TermsDialog';
import FieldsCreator from 'src/Core/SchemaBuilder/FieldsCreator';
import TermsContent from '../../TemporaryLicense/Sections/TermsContent';
import TransferCenterLocationSchema from '../Schema/TransferCenterLocationSchema';


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

export const CenterLocationSummary = ({ values, setField, landingPage, centersForDisabilities }) => {
    // console.log('in summary', values.customers);
    const [open, setOpen] = React.useState(false);
    const [SponsorName, setSponsorName] = React.useState(false)
    const handleClickOpen = (dialogContent, dialogTitle) => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
    };
    console.log('sssssssdaghhjkkhvbnbvnvbvvbnvbnvbjjyutyuyt',values);
    return (
        <Grid
            container
            mt={3}
            mb={3}
        >
            {centersForDisabilities ? (

                <FieldsCreator
                    values={values}
                    lookupObject={values.lookupValues}
                    schema={TransferCenterLocationSchema}
                    formType="view"
                />
            ) : (
                <FieldsCreator
                    values={values}
                    lookupObject={values.lookupValues}
                    schema={TransferCenterLocationSchema}
                    sectionNames={['CenterDetails', 'Attachments']['Location']}
                    formType="view"
                />
            )}
            <Grid
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
            </Grid>
            <TermsDialog setAgreeValue={
                () => {
                    setField("agree", [true])
                }
            } dialogContent={TermsContent(values.termsAndConditions,values)} dialogTitle={"التعهد"} open={open} setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)} onClose={handleClose} acceptBtnName="أوافق" />
        </Grid>
    )
}