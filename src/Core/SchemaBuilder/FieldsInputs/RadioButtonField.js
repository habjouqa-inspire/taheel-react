import {
  FormControl, FormControlLabel, FormLabel,
  Grid,
  RadioGroup
} from '@material-ui/core';
import { Radio } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';


export default function RadioButtonField(props) {
  console.log("props ===> ", props)
  props.options.forEach((option) => {
    console.log("props.options.forEach(option  ===> ", option.label.ar);
  }
  )

  let tOptionLabel = '';
  let gridSize = !!props.gridSize ? props.gridSize : 12;
  return (
    <Grid
      item
      md={6}
      xs={gridSize}
      className="custom-label-field"
    >
      <Field name={props.name} >
        {({ input, meta }) => {
          const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched; return ( // eslint-disable-line no-unused-vars
            <FormControl component="fieldset" error={props.showError ? meta.error || meta.submitError : undefined} required>
              <FormLabel component="legend">{props.tLabel}</FormLabel>
              <RadioGroup
                onChange={() => {
                  !!props.handleChange && (!!props.filter ? props.handleChange(value, props.name, props.filter.operator) : props.handleChange(value, props.name))
                  !!props.onChange && (props.onChange(props))
                }}
              >
                {props.options.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    label={option.label.ar}
                    control={<Field name={props.tLabel} component={Radio} type="radio" value={option.value} />}
                  />
                )
                )}
              </RadioGroup>
            </FormControl>
          )
        }}
      </Field>
    </Grid>
  )
}
RadioButtonField.propTypes = {
  showError: PropTypes.bool,
  options: PropTypes.array,
  tLabel: PropTypes.string,
  gridSize: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  fieldLookUp: PropTypes.object,
  handleChange: PropTypes.func,
  onChange: PropTypes.func,
  values: PropTypes.object,
  filter: PropTypes.any,
}