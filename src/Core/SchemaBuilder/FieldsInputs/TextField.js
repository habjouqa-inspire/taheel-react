import { Grid } from '@material-ui/core';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

export default function TextField(props) {
    const gridSize = !!props.gridSize ? props.gridSize : 12
    if (props.type !== 'date') {
        if (!!props['attrFunc'] && props.values.length > 0) props.values[props['name']] = props.attrFunc(props.values)
        return (
            <Grid item md={gridSize} >
                <Field
                    fullWidth
                    required={props.required}
                    label={props.tLabel}
                    name={props.name}
                    component={TextFieldFinal}
                    type={props.fieldType}
                    onChange={props.handleChange}
                    variant="outlined"
                    dir="rtl"
                    disabled={props.funcLoading}
                    className="custom-field"
                />
                <OnChange name={props.name}>
                    {(value, previous) => {
                        !!props.handleChange && (!!props.filter ? props.handleChange(value, props.name, props.filter.operator) : props.handleChange(value, props.name))
                        !!props.onChange && (props.onChange(props))
                    }}
                </OnChange>
            </Grid>);
    }
    //  else {
    //     return (
    //         <>
    //             <Grid container md={6} xs={gridSize} spacing={1}>
    //                 <Grid item >
    //                     <TextFieldCore
    //                         fullWidth
    //                         InputLabelProps={{ classes: { root: props.labelRootStyle }, shrink: true }} //, shrink: props.labelShrinkStyle 
    //                         label={'من : '}
    //                         name='from'
    //                         type={props.type}
    //                         value={props.value}
    //                         onChange={props.handleChange}
    //                         variant="outlined"
    //                         dir="rtl"
    //                         multiline={props.multiline}
    //                         rows={props.rows}
    //                         disabled={props.disabled}
    //                     />
    //                 </Grid>
    //                 <Grid item>
    //                     <TextFieldCore
    //                         fullWidth
    //                         InputLabelProps={{ classes: { root: props.labelRootStyle }, shrink: true }} //, shrink: props.labelShrinkStyle 
    //                         label={'إلى : '}
    //                         name='to'
    //                         type={props.type}
    //                         value={props.value}
    //                         onChange={props.handleChange}
    //                         variant="outlined"
    //                         dir="rtl"
    //                         multiline={props.multiline}
    //                         rows={props.rows}
    //                         disabled={props.disabled}
    //                     />
    //                 </Grid>
    //             </Grid>
    //         </>
    //     )
    // }
}
TextField.propTypes = {
    labelRootStyle: PropTypes.object,
    tLabel: PropTypes.string,
    handleChange: PropTypes.func,
    onChange: PropTypes.func,
    gridSize: PropTypes.number,
    rows: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    multiline: PropTypes.bool,
    disabled: PropTypes.bool,
}