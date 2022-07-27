/* eslint-disable */
import { Alert, Box, Button, Grid } from '@material-ui/core';
import arrayMutators from "final-form-arrays";
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { useNavigate } from 'react-router';
import ConfirmationDialog from 'src/Core/Components/ConfirmationDialog';

function TempFormSummary(props) {
  const navigate = useNavigate();
  const Page = ({ children }) => children;

  const [page, setPage] = useState(0);
  const [values, setValues] = useState(props.initialValues || {});
  const [isValid, setIsValid] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [open, setOpen] = useState(false);

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
              {props.isEnableCancelBtn && (
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpen(true);
                    }}
                    sx={{
                      backgroundColor: '#E2E8EB',
                      color: '#000'
                    }}
                  >
                   إنهاء الطلب
                  </Button>
                </Grid>
              )}
              <Grid item>
                <Button
                  disabled={submitting || !props.showSummary}
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    backgroundColor: '#3c8084',
                  }}
                // onClick={() => {
                //   console.log("edit function");
                //   navigate('/center-services/updatefinallicenserenewal', { state: { centerLicenceNumber: values.centerLicenceNumber, formType: LICENSE_FORM_TYPES.RENEW } });
                // }}
                >
                 إرسال الطلب
                </Button>
              </Grid>
            </Grid>
            {/* {<pre dir="ltr">{JSON.stringify(values, 0, 2)}</pre>} */}
            {props.isEnableCancelBtn && !props.returned ? (
              <ConfirmationDialog
                acceptBtnName="نعم"
                cancelBtnName="لا"
                dialogTitle="هل أنت متأكد من إنهاء الطلب؟"
                open={open}
                onEscapeKeyDown={() => {
                  console.log('===================== onEscapeKeyDown');
                  setOpen(false)
                  // this.setState((state) => ({ open: false }));
                }}
                onBackdropClick={() => {
                  console.log('===================== onBackdropClick');
                  // this.setState((state) => ({ open: false }));
                  setOpen(false)
                }}
                onCloseFn={() =>
                  // this.setState((state) => ({ open: false }))
                  setOpen(false)
                }
                onAcceptFn={() => props.cancelBtnFn()}
              ></ConfirmationDialog>
            ) : <>
              <ConfirmationDialog
                acceptBtnName="حفظ كمسودة"
                cancelBtnName="الخروج من الطلب"
                dialogTitle="هل أنت متأكد من إنهاء الطلب؟"
                open={open}
                onEscapeKeyDown={() => {
                  console.log('===================== onEscapeKeyDown');
                  setOpen(false)
                  // this.setState((state) => ({ open: false }));
                }}
                onBackdropClick={() => {
                  console.log('===================== onBackdropClick');
                  // this.setState((state) => ({ open: false }));
                  setOpen(false)
                }}
                onCloseFn={() =>
                  // this.setState((state) => ({ open: false }))
                  setOpen(false)
                }
                onCloseFn={() => props.cancelBtnFn()}
                onAcceptFn={() => props.onSubmit({ ...values, isDraft: true })}
              ></ConfirmationDialog>
            </>
            }
          </form>
        )
      }}
    </Form>
  )
}


export default TempFormSummary;