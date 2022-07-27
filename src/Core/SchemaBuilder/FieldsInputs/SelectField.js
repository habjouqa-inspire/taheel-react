import { MenuItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Select } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

export default function SelectField(props) {
    //const [t] = useTranslation('common');
    let gridSize = !!props.gridSize ? props.gridSize : 12;
    return (
        <Grid
            item
            xs={gridSize}
            className="custom-label-field"
        >
            <Field
                fullWidth
                label={props?.label?.ar}
                name={props.name}
                component={Select}
                required={props.required}
                disabled={props.funcLoading}
                dir="rtl"
                variant="outlined"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
            >
                {props.options?.map((option, idx) => {
                    return <MenuItem value={option.value} className={props.style} key={idx}>{option?.label?.ar}</MenuItem>
                })}
            </Field>
            <OnChange name={props.name}>
                {(value, previous) => {
                    !!props.handleChange && (!!props.filter ? props.handleChange(value, props.name, props.filter.operator) : props.handleChange(value, props.name))
                    !!props.onChange && (props.onChange(props))
                }}
            </OnChange>
        </Grid>
    )
}
SelectField.propTypes = {
    options: PropTypes.array,
    tLabel: PropTypes.string,
    label: PropTypes.object,
    funcLoading: PropTypes.bool,
    gridSize: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.string,
    required: PropTypes.bool,
    fieldLookUp: PropTypes.array,
    filter: PropTypes.any,
    handleChange: PropTypes.func,
    onChange: PropTypes.func,
    values: PropTypes.object,
}