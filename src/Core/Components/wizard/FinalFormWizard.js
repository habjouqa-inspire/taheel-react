/* eslint-disable */
import React from 'react';
import { Form } from 'react-final-form';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from '@material-ui/core';
import arrayMutators from 'final-form-arrays';
import { LICENSE_FORM_TYPES } from 'src/Core/Utils/enums';
import ConfirmationDialog from '../ConfirmationDialog';
import { SettingsPowerRounded } from '@material-ui/icons';
import { stubTrue } from 'lodash-es';
import { deleteDraftFunc } from 'src/Modules/CenterServices/API/ServicesApi';
import AlertDialog from 'src/Core/Components/AlertDialog';

export default class FinalFromWizard extends React.Component {

  getChildren = (children) => {
    return Array.isArray(children) ? children?.filter(c => c) : children
  }
  static Page = ({ children }) => Array.isArray(children) ? children?.filter(c => c) : children


  constructor(props) {
    super(props);
    this.state = {
      page: props.initialValues.page ? props.initialValues.page : 0,
      values: props.initialValues || {},
      completed: false,
      open: false,
      isNextCallBackFunSuccess: true,
      isDraft: false,
      errMessage: '',
      finalBtnTitle: props.finalBtnTitle,
      isLoading: false,
      dialogContent: '',
      dialogTitle: '',
      isOpen: false,
      confirmationProps: {},

    };
    this.myRef = React.createRef();
  }

  handleClickOpen = (dialogContent, dialogTitle) => {
    this.setState((state) => ({
      dialogContent: dialogContent,
      dialogTitle: dialogTitle,
      isOpen: true,
      errMessage: '',
    }))
    console.log('dialogTitledialogTitle', this.state.dialogTitle, this.state.dialogContent)
  };
  handleClose = () => {
    this.setState((state) => ({ isOpen: false, errMessage: '' }))
    this.props.cancelBtnFn()

  };

  end = async (values) => {
    const { onSubmit } = this.props;
    console.log("--- end  ----");
    this.setState((state) => ({ loadingDraft: true, open: true, isDraft: true }))
    console.log("--- values  ----" + JSON.stringify(values));
    // this.handleSubmit(values)
    console.log("FINALFORMWIZARD :: end :: return onSubmit  ");
    const res = await onSubmit({ ...values, isDraft: true })

    if (this?.state?.values?.lastPageErrorHandling && !res?.isSuccessful) {
      this.myRef.current.scrollIntoView(false);

      this.setState((state) => ({
        loadingDraft: false,
        open: false, isDraft: true,
        isNextCallBackFunSuccess: false,
        errMessage: res?.message?.error || res?.message
      }));
    } else {
      this.setState((state) => ({ loadingDraft: false, open: false, isDraft: true }))

    }
    console.log('FINALFORMWIZARD :: res:: ', res);
    return;
  }

  next = (values) => {
    console.log('--- next  ----');
    this.setState((state) => ({
      page: Math.min(state.page + 1, this.getChildren(this.props.children).length - 1),
      values
    }));
  };

  previous = () => {
    console.log('sssssssssssssssssssssssssssssssssssssssssssssssssss', this.props?.initialValues?.fromDraft)

    this.setState((state) => ({
      page: Math.max(state.page - 1, 0),
      isNextCallBackFunSuccess: true,
      errMessage: ''
    }));
  }

  deleteDraft = async ({ values, email: email }) => {
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiii123");
    console.log("==> requestNum", this.state?.values?.requestNum);
    console.log("==> email", email);
    this.setState((state) => ({
      isLoading: true
    }));
    const deleteDraftRequest = await deleteDraftFunc({ requestNum: this.state?.values?.requestNum, email: email });
    if (!deleteDraftRequest.isSuccessful) {
      this.setState((state) => ({
        errMessage: deleteDraftRequest.message,
        isLoading: false
      }));
    } else {
      this.handleClickOpen('تم الغاء المسودة بنجاح', '')
      this.setState((state) => ({ open: false, isOpen: true }));
      this.setState((state) => ({
        isLoading: false
      }));
    }
    return;
  }
  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = (values) => {

    const activePage = React.Children.toArray(this.getChildren(this.props.children))[
      this.state.page
    ];

    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = async (values) => {
    const { children, onSubmit } = this.props;
    const { page, isDraft } = this.state;

    if (isDraft) {
      console.log('FINALFORMWIZARD :: return onSubmit  ');
      return onSubmit({ ...values, isDraft: true });
    }
    const errors = this.validate(values);
    console.log("errors ==> ", errors)
    if (Object.keys(errors).length > 0) {
      console.log(
        `FINALFORMWIZARD :: Object.keys(errors).length ${Object.keys(errors).length
        }`
      );
      return this.validate(values);
    }
    const isLastPage = page === React.Children.count(this.getChildren(children)) - 1;
    console.log('isLastPage ====> ', isLastPage);
    console.log('page ====> ', page);

    const activePage = React.Children.toArray(this.getChildren(children))[
      this.state.page
    ];
    if (isLastPage) {
      this.setState((state) => ({
        completed: true
      }));

      const response = await onSubmit(values);
      if (this?.state?.values?.lastPageErrorHandling && !response?.isSuccessful) {
        this.myRef?.current?.scrollIntoView(false);

        this.setState((state) => ({
          isNextCallBackFunSuccess: false,
          errMessage: response?.message?.error || response?.message
        }));
        return;
      }

      return response;
    } else {
      console.log('before if--- activePage.props.nextFun ----');
      this.setState((state) => ({
        isNextCallBackFunSuccess: true,
        errMessage: ''
      }));
      console.log('if--- activePage.props.nextFun ----');
      if (!!activePage?.props?.nextFun) {
        const nextFun = await activePage?.props?.nextFun(
          values,
          this.props.setAlertInfo,
          this.props.alertInfo,
          (values) => this.next(values)
        );
        const { isSuccessful, message } = nextFun
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
  };

  render() {
    const {
      children = this.getChildren(children),
      isEnableNextBtn = true,
      isEnableCancelBtn = false,
      isEnableEndBtn = false,
      cancelBtnFn,
      canShowSection = true,
      enableValidate = false,
      // draft,
    } = this.props;
    console.log("==> this.props values", this.state?.values?.requestNum, this.props.email);
    const childrenArray = React.Children.toArray(this.getChildren(children));
    const { page, values, completed, isNextCallBackFunSuccess, errMessage } =
      this.state;
    const activePage = React.Children.toArray(this.getChildren(children))[page];
    const isLastPage = page === React.Children.count(this.getChildren(children)) - 1;
    return (
      <>
        <div
          ref={this.myRef}
        ></div>
        <Form
          initialValues={values}
          validate={enableValidate && this.validate}
          onSubmit={this.handleSubmit}
          mutators={{
            // expect (field, value) args from the mutator
            ...arrayMutators,
            setValue: ([field, value], state, { changeValue }) => {
              changeValue(state, field, () => value);
            }
          }}
        >
          {({ handleSubmit, pristine, form, submitting, values }) => {
            return (
              <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                <Stepper
                  className="custom-wizard"
                  alternativeLabel
                  activeStep={page}
                >
                  {childrenArray.length > 1 && childrenArray.map((child, index) => (
                    <Step
                      key={child.props?.label?.ar || child.props.label || index}
                      completed={page > index || completed}>
                      <StepLabel>{child.props?.label?.ar || child.props.label}</StepLabel>
                    </Step>
                  )
                  )
                  }
                </Stepper>
                {(!isNextCallBackFunSuccess && !!errMessage) && (
                  <Box mt={3}>
                    <Alert variant="outlined" severity="error">
                      {errMessage}
                    </Alert>
                  </Box>
                )}

                {canShowSection
                  ? React.cloneElement(activePage, {
                    setField: form.mutators.setValue,
                    pop: form.mutators.pop,
                    push: form.mutators.push,
                    values: values
                  })
                  : ''}
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  mt={3}
                  justifyContent={
                    isEnableCancelBtn || isEnableEndBtn
                      ? 'space-between'
                      : 'flex-end'
                  }
                >
                  {isEnableCancelBtn && (
                    <Grid item>
                      <Button
                        disabled={submitting}
                        variant="contained"
                        onClick={() => {
                          this.setState((state) => ({
                            open: true,
                            confirmationProps: {
                              acceptBtnName: "حفظ كمسودة",
                              cancelBtnName: "إنهاء",
                              dialogTitle: "هل أنت متأكد من إنهاء الطلب؟",
                              onEscapeKeyDown: () => {
                                console.log('===================== onEscapeKeyDown');
                                this.setState((state) => ({ open: false }));
                              },
                              onBackdropClick: () => {
                                console.log('===================== onBackdropClick');
                                console.log(`values: ${JSON.stringify(values)}`);
                                this.setState((state) => ({ open: false }));
                              },
                              onAcceptFn: () => this.end({ ...values, isDraft: true }),
                              onCloseFn: () => {
                                console.log('===================== onCloseFn');
                                this.setState((state) => ({ open: false }));
                                cancelBtnFn();
                              }
                            }
                          }));
                        }}
                        sx={{
                          backgroundColor: '#E2E8EB',
                          color: '#000'
                        }}
                      >
                        إلغاء
                      </Button>
                    </Grid>
                  )}
                  {isEnableEndBtn && (
                    <Grid item>
                      <Button
                        variant="contained"
                        disabled={submitting}
                        onClick={() => {
                          this.setState((state) => ({
                            open: true,
                            confirmationProps: {
                              acceptBtnName: "نعم",
                              cancelBtnName: "لا",
                              dialogTitle: "هل أنت متأكد من إنهاء الطلب؟",
                              onEscapeKeyDown: () => {
                                console.log('===================== onEscapeKeyDown');
                                this.setState((state) => ({ open: false }));
                              },
                              onBackdropClick: () => {
                                console.log('===================== onBackdropClick');
                                this.setState((state) => ({ open: false }));
                              },
                              onCloseFn: () =>
                                this.setState((state) => ({ open: false }))
                              ,
                              onAcceptFn: () => cancelBtnFn()
                            }
                          }));
                        }}
                        sx={{
                          backgroundColor: '#E2E8EB',
                          color: '#000'
                        }}
                      >
                        إنهاء
                      </Button>
                    </Grid>
                  )}
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                    >
                      {(page === 0 && !!this.props.firstBackBtnFunc) && (
                        <Grid item>
                          <Button
                            disabled={submitting}
                            variant="contained"
                            onClick={() => {
                              this.props.firstBackBtnFunc(values);
                            }}
                            sx={{
                              backgroundColor: '#E2E8EB',
                              color: '#000'
                            }}
                          >
                            رجوع
                          </Button>
                        </Grid>
                      )}
                      {(page > 0 && !this.state.values.disabledBackButt) && (
                        <Grid item>
                          <Button

                            variant="contained"
                            disabled={
                              (page === 1 &&
                                this.state.values.formType ===
                                LICENSE_FORM_TYPES.RENEW) || submitting
                            }
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
                      {!!this.state?.values?.requestNum && (!!this.props?.formDraft || this.props?.initialValues?.fromDraft) && (
                        <Grid item>
                          <Button
                            startIcon={
                              submitting ? (
                                <CircularProgress size="1rem" />
                              ) : null
                            }
                            disabled={submitting}
                            variant="contained"
                            onClick={() => this.setState((state) => ({
                              open: true,
                              confirmationProps: {
                                acceptBtnName: "نعم",
                                cancelBtnName: "لا",
                                dialogTitle: "هل انت متأكد من إلغاء المسودة؟",
                                onEscapeKeyDown: () => {
                                  console.log('===================== onEscapeKeyDown');
                                  this.setState((state) => ({ open: false }));
                                },
                                onBackdropClick: () => {
                                  console.log('===================== onBackdropClick');
                                  console.log(`values: ${JSON.stringify(values)}`);
                                  this.setState((state) => ({ open: false }));
                                },
                                onAcceptFn: () => {
                                  this.deleteDraft({ email: this.props.email });
                                },
                                onCloseFn: () => {
                                  console.log('===================== onCloseFn');
                                  this.setState((state) => ({ open: false }));
                                },
                                sx: {
                                  backgroundColor: '#E2E8EB',
                                  color: '#000'
                                }
                              }
                            }))}
                          >
                            الغاء المسودة
                          </Button>
                        </Grid>
                      )}
                      {!isLastPage && (
                        <Grid item>
                          <Button
                            startIcon={
                              submitting ? (
                                <CircularProgress size="1rem" />
                              ) : null
                            }
                            disabled={!isEnableNextBtn || submitting}
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                              backgroundColor: '#3c8084'
                            }}
                          >
                            التالي
                          </Button>
                        </Grid>
                      )}
                      {isLastPage && (
                        <Grid item>
                          <Button
                            startIcon={
                              submitting ? (
                                <CircularProgress size="1rem" />
                              ) : null
                            }
                            disabled={
                              submitting ||
                              (!!values.agree && values.agree[0] === false)
                            }
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            {this.props.finalBtnTitle || 'إرسال'}
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                {/* {<pre dir="ltr">{JSON.stringify(values, 0, 2)}</pre>}  */}
                <ConfirmationDialog
                  loadingDraft={this?.state?.loadingDraft}
                  isLoading={this.state.isLoading}
                  open={this.state.open}
                  {...this.state.confirmationProps}
                ></ConfirmationDialog>
              </form>
            );
          }}
        </Form>
        <AlertDialog dialogTitle={this.state.dialogTitle} dialogContent={this.state.dialogContent} open={this.state.isOpen} onClose={this.handleClose} acceptBtnName="تم" />

      </>
    );
  }
}
/* eslint-enable */
