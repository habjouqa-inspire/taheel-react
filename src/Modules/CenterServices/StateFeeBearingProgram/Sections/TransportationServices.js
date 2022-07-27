/* eslint-disable no-unused-vars */
import {
    FormControl,
    FormControlLabel,
    FormHelperText, FormLabel, Grid,
    RadioGroup
} from '@material-ui/core';
import { Radio, TextField as TextFieldFinal } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';


const TransportationServices = ({ Condition, setField, setIsEnableNextBtn, values}) => {
    
    useEffect(()=>{
        setIsEnableNextBtn(true)
    },[])

    return (
        <>
            <Grid
                container
                spacing={3}
                mt={3}
            >

                <Grid
                    item
                    md={12}
                    xs={12}
                >
                    <Field name="transportationServices" >
                        {({ input, meta }) => {
                            const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched; return ( // eslint-disable-line no-unused-vars

                                <FormControl component="fieldset" error={showError ? meta.error || meta.submitError : undefined} required>
                                    <FormLabel component="legend">هل توجد خدمة مواصلات ؟</FormLabel>
                                    <RadioGroup >
                                        <FormControlLabel
                                            label="نعم"
                                            control={<Field name="transportationServices" component={Radio} type="radio" value="yes" />}
                                        />
                                        <FormControlLabel
                                            label="لا"
                                            control={<Field name="transportationServices" component={Radio} type="radio" value="no" />}
                                        />
                                    </RadioGroup>
                                    {showError && <FormHelperText dir="rtl">{showError ? meta.error || meta.submitError : undefined}</FormHelperText>}
                                </FormControl>
                            )
                        }}
                    </Field>
                    <OnChange name="transportationServices">
                        {(value, previous) => {
                            if (value === "no") {
                                setField("numberOfVehicles", "");
                            }
                        }}
                    </OnChange>
                </Grid>
                <Condition when='transportationServices' is='yes' >
                    <Grid
                        item
                        md={6}
                        xs={12}
                        className="custom-label-field"
                    >
                        <Field
                            fullWidth
                            required
                            label="عدد السيارات"
                            name="numberOfVehicles"
                            component={TextFieldFinal}
                            type="text"
                            variant="outlined"
                            dir="rtl"
                            className="custom-field"
                        />
                         <OnChange name="numberOfVehicles">
                        {(value, previous) => {
                            let  numberOfVehicles = value.replace(/\D/g, '')
                           numberOfVehicles = numberOfVehicles?.substring(0, 50)
                           setField("numberOfVehicles", numberOfVehicles)
                        }}
                    </OnChange>
                    </Grid>
                </Condition>
            </Grid>
        </>

    );
}
export default TransportationServices;

TransportationServices.propTypes = {
    Condition: PropTypes.func.isRequired,
    setField: PropTypes.func.isRequired,
    setIsEnableNextBtn: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,


};