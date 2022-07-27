/* eslint-disable */
import React from 'react';
import { useState, useEffect } from 'react';
import { Form } from 'react-final-form';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel } from '@material-ui/core';
import arrayMutators from "final-form-arrays";
import { useNavigate } from 'react-router';
import { LICENSE_FORM_TYPES } from 'src/Core/Utils/enums'

function FinalFormSummary(props) {
  const navigate = useNavigate();
  const Page = ({ children }) => children;

  const [page, setPage] = useState(0);
  const [values, setValues] = useState(props.initialValues || {});
  const [completed, setCompleted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errMessage, setErrMessage] = useState("");

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  const validate = (values) => {
    console.log("--- validate  ----");
    const activePage = React.Children.toArray(props.children)[page];
    const valid = activePage.props.validate ? activePage.props.validate(values) : {}
    console.log("------------ values : " + JSON.stringify(values))
    console.log("------------ validate : " + JSON.stringify(valid))
    return valid
  }

  const handleSubmit = async (values) => {
    console.log("--- handleSubmit  ----");
    const errors = validate(values);
    if (Object.keys(errors).length > 0)
      return validate(values);
    const { onSubmit } = props;
    // const { page } = state;
    // const isLastPage = page === React.Children.count(children) - 1;
    // const activePage = React.Children.toArray(props.children)[
    //   state.page
    // ];

    if (values.isValid) {
      const { isSuccessful, message } = await onSubmit(values)
      if (!isSuccessful) {
        setErrMessage(message);
        return;
      }
    }
    return onSubmit(values)
  }

  const { children } = props;
  const activePage = React.Children.toArray(children)[page];
  return (
    <Form
      initialValues={values}
      validate={validate}
      onSubmit={handleSubmit}
      mutators={{
        // expect (field, value) args from the mutator
        ...arrayMutators,
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value)
        }
      }}
    >
      {({ handleSubmit, pristine, form, submitting, values }) => {
        return (
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            {!isValid && (
              <Box mt={3}>
                <Alert variant="outlined" severity="error">
                  {errMessage}
                </Alert>
              </Box>
            )}
            {React.cloneElement(activePage, {
              setField: form.mutators.setValue,
              pop: form.mutators.pop,
              push: form.mutators.push,
              values: values
            })}

            <Grid container spacing={2} mt={3} justifyContent="space-between">
              <Grid item>
                <Button
                  startIcon={submitting ? <CircularProgress size="1rem" /> : null}
                  disabled={values.agree.length == 0 || submitting || values.agree[0] === false}
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    backgroundColor: '#3c8084',
                  }}
                >
                  انشاء طلب تجديد الترخيص
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={values.agree.length == 0 || submitting || values.agree[0] === false}
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    backgroundColor: '#3c8084',
                  }}
                  onClick={() => {
                    console.log("edit function");
                    navigate('/center-services/updatefinallicenserenewal', { state: { centerLicenseNumber: values.centerLicenseNumber, formType: LICENSE_FORM_TYPES.RENEW } });
                  }}
                >
                  تحديث بيانات طلب تجديد الترخيص
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      }}
    </Form>
  )
}


export default FinalFormSummary;