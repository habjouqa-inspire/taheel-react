/* eslint-disable */
import { Alert, Box, Button, CircularProgress, Grid } from '@material-ui/core';
import arrayMutators from "final-form-arrays";
import React from 'react';
import { Form } from 'react-final-form';

export default class AccountFinalFrom extends React.Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {},
      completed: false,
      isNextCallBackFunSuccess: true,
      errMessage: "",
      isDisable: true,
    };
  }

  next = (values) => {
    console.log("--- next  ----");
    this.setState((state) => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));
  }

  previous = () =>
    this.setState((state) => ({
      page: Math.max(state.page - 1, 0)
    }));

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = (values) => {
    console.log("--- validate  ----");
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];

    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = async (values) => {
    console.log("--- handleSubmit  ----");
    const errors = this.validate(values);
    if (Object.keys(errors).length > 0)
      return this.validate(values);
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    if (isLastPage) {
      this.setState((state) => ({
        completed: true
      }));
      if (this.state.values.lastPageErrorHandling) {
        console.log("this.state.values.lastPageErrorHandling");
        const { isSuccessful, message } = await onSubmit(values);
        if (!isSuccessful) {
          this.setState((state) => ({
            isNextCallBackFunSuccess: false,
            errMessage: message
          }));
          return;
        }
      }
      return onSubmit(values)
    } else {
      if (activePage.props.nextFun) {
        const { isSuccessful, message } = await activePage.props.nextFun(values);
        if (!isSuccessful) {
          this.setState((state) => ({
            isNextCallBackFunSuccess: false,
            errMessage: message
          }));
          return;
        }
      }
      this.setState((state) => ({
        isNextCallBackFunSuccess: true,
        errMessage: ''
      }));
      this.next(values);

    }
  }

  render() {
    const { children, isEnableNextBtn = true, isDisable } = this.props;
    const childrenArray = React.Children.toArray(children);
    const { page, values, completed, isNextCallBackFunSuccess, errMessage } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Form
        initialValues={values}
        validate={(values) => {
          const err = !!this.props.validateFunc ? this.props.validateFunc(values) : {}
          return err
        }}
        onSubmit={this.handleSubmit}
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
              {!isNextCallBackFunSuccess && (
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
              <Grid container spacing={2} mt={3} justifyContent="flex-end">
                {(page > 0 && !this.state.values.disabledBackButt) && (
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={this.previous}
                      sx={{
                        backgroundColor: '#E2E8EB',
                        color: '#000'
                      }}
                    >
                      رجوع
                    </Button>
                  </Grid>
                )}

                {(!!this.props.handleCancle) && (
                  <Grid item >
                    <Button
                      variant="contained"
                      onClick={this.props.handleCancle}
                      sx={{
                        backgroundColor: '#E2E8EB',
                        color: '#000'
                      }}
                    >
                      إلغاء
                    </Button>
                  </Grid>
                )}
                <Grid item>
                  <Button
                    startIcon={submitting ? <CircularProgress size="1rem" /> : null}
                    disabled={!isDisable || submitting}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    إرسال
                  </Button>
                </Grid>

              </Grid>
            </form>
          )
        }}
      </Form >
    )
  }
}
/* eslint-enable */
