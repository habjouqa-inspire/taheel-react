const { default: FileUploaderComp } = require("src/Modules/CenterServices/FinalLicense/Components/FileUploader");
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';

export default function FileUploaderField(props) {
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
                    component={FileUploaderComp}
                    multipleFile={props.multipleFile}
                    setField={props.setField}
                    setDocument={props.setDocument}
                    values={props.values}
                    onChange={props.handleChange}
                    variant="outlined"
                    dir="rtl"
                    className="custom-field"
                />
            </Grid>);
    }

}
FileUploaderField.propTypes = {
    labelRootStyle: PropTypes.object,
    tLabel: PropTypes.string,
    handleChange: PropTypes.func,
    gridSize: PropTypes.number,
    rows: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    multiline: PropTypes.bool,
    disabled: PropTypes.bool,
}


