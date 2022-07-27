/* eslint-disable */
import {
    FormControl,
    FormControlLabel,
    Grid,
    Link,
    Typography
} from '@material-ui/core';
import { Checkbox } from 'final-form-material-ui';
import React, { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { useLocation } from "react-router";
import TermsDialog from 'src/Core/Components/TermsDialog';
import FieldsCreator from "src/Core/SchemaBuilder/FieldsCreator";
import TermsContent from '../../TemporaryLicense/Sections/TermsContent';
import StaffTable from '../Component/StaffTable';
import ViewStateFeeBearingSummarySchema from "../Schema/ViewStateFeeBearingSummarySchema";

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
const StateFeeSummary = ({ values, setField }) => {
    const [open, setOpen] = useState(false);
    const [termsAndConditions,setTermsAndConditions]=useState();
    const location = useLocation()
    useEffect(() => {
        setTermsAndConditions(values?.termsAndConditions.replace(/\n/g, " <br/> "))
        console.log("malaklocssum", values)
    }, [])

    const handleClickOpen = (dialogContent, dialogTitle) => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <>
            <Grid
                container
                mt={3}
                mb={3}
            >
                <FieldsCreator
                    values={values}
                    lookupObject={values.lookupValues}
                    schema={ViewStateFeeBearingSummarySchema}
                    formType="view"
                />
            </Grid>
            <StaffTable values={values} />
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
            } dialogContent={TermsContent(termsAndConditions)} dialogTitle={"التعهد"} open={open} setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)} onClose={handleClose} acceptBtnName="أوافق" />
        </>
    )
}
export default StateFeeSummary;