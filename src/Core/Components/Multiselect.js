/* eslint-disable */
import React from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { FormHelperText } from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default ({
  input: { value, name, onChange, ...restInput },
  meta,
  ...rest
}) => {
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;
  return (
    < FormControl className={rest.styling} >
      <InputLabel htmlFor="select-multiple-chip">{rest.labelname}</InputLabel>
      <Select
        MenuProps={MenuProps}
        multiple
        displayEmpty
        {...rest}
        name={name}
        inputProps={restInput}
        error={meta.error && meta.touched}
        onChange={onChange}
        value={[...value]}
      />
      {showError && (
        <FormHelperText style={{ color: "red" }}>{meta.error || meta.submitError}</FormHelperText>
      )}
    </FormControl >)
}
  ;
