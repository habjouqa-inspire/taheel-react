/* eslint-disable */
import {
  Box,
  Card,
  CardContent,
  CardHeader, CircularProgress, Container, Divider
} from '@material-ui/core';
import { Alert } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AlertDialog from 'src/Core/Components/AlertDialog';
import FinalFromWizard from 'src/Core/Components/wizard/FinalFormWizard';
import { useLookup } from 'src/Core/Contexts/useLookup';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import {
  createTempLicenseAPIFunc,
  getquestionnairesData,
  getTermsAndCondtions
} from '../API/temporayLicenseAPI';
import tempLicenseFieldSchema from '../Schema/tempLicenseFieldSchema';
import CenterAddress from '../Sections/CenterAddress';
import CenterDetails from '../Sections/CenterDetails';
import OwnerInfo from '../Sections/OwnerInfo';
import QuestionnaireSection from '../Sections/QuestionnaireSection';
import Summary from '../Sections/Summary';
import {
  calAnswerOfQuestionnaires,
  ConditionComp,
  ConditionDependOn,
  getLookupValues,
  sectionValidateInput,
  validateQuestionnaires
} from '../Utils/temporayLicenseUtil';

const CreateTemporaryLicense = () => {
  const location = useLocation();
  const lookupValues = useLookup();
  const [open, setOpen] = React.useState(false);
  const [isEnableNextBtn, setIsEnableNextBtn] = useState(true);
  const [dialogContent, setDialogContent] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [errMessage, setErrMessage] = React.useState('');
  const { email, idNumIqamaNum, DOB, phoneNumber, firstName, lastName } =
    getCurrentUser();
  const navigate = useNavigate();
  const scrollToRef = useRef()
  const centerInfo = location?.state?.values;
  const requestNum = location?.state?.requestNum;
  const data = location?.state?.center;
  const title = data?.filter((center) => center.ID === centerInfo.centerType);
  const fromDraft = location?.state?.fromDraft
  const onSubmit = async (values) => {
    const response = await createTempLicenseAPIFunc(values);
    console.log(JSON.stringify(response));
   
    response.responseBody?.data?.message
      ? handleClickOpen(response.responseBody?.data?.message, '')
      : handleClickOpen(
        `${response.responseBody?.message?.successMessageAr}`,
        ''
      );
    return {
      isSuccessful:false, message: response?.message?.error || response?.message
    }
  };
  const handleBackBtn = (values) => {
    delete values.agree;
    delete values.isDraft;
    navigate('/center-services/templicense', {
      replace: true,
      state: { backValues: values }
    });
  };
  const handleClickOpen = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate('/app/dashboard', { replace: true });
  };
  const [loading, setLoading] = useState(true);
  const [questionnaireData, setQuestionnaireData] = useState([]);
  const [TermsAndCondtions, setTermsAndCondtions] = useState('');

  useEffect(async () => {
    setLoading(true);
    const termsAndcondtion = await getTermsAndCondtions(
      location.state.values.centerType, 1
    );
    if (!termsAndcondtion.isSuccessful) {
      const response = {
        isSuccessful: false,
        message: questionnaireRes.message
      };
    } else {
      const termsAndcondtionss =
        termsAndcondtion;
      setTermsAndCondtions(termsAndcondtionss?.responseBody?.data?.pledgeContent);
    }

    const questionnaireRes = await getquestionnairesData(
      location.state.values.centerType,
      location.state.values.targetedBenificiray
    );
    if (!questionnaireRes.isSuccessful) {
      const response = {
        isSuccessful: false,
        message: questionnaireRes.message
      };
      setErrMessage(response?.message);
    } else {
      const questionnaireAllData =
        questionnaireRes?.responseBody?.data?.questions;

      setQuestionnaireData(questionnaireAllData);
      setErrMessage('');
    }
    setLoading(false);

  }, []);
  return (
    <Container ref={scrollToRef} maxWidth="md">
      <Card>
        <CardHeader
          title={`  إصدار موافقة مبدئية لمركز تأهيل أهلي  ${title?.[0] ? `(` + title?.[0]?.name + `)` : ``
            }`}
        />
        <Divider />
        {errMessage && (

          <Alert
            variant="outlined"
            severity={!!errMessage.type ? errMessage.alertype : 'error'}
          >
            {!!errMessage.msg ? errMessage.msg : errMessage}
          </Alert>

        )}
        <CardContent>
          {!loading ? (
            <FinalFromWizard

              initialValues={{
                lastPageErrorHandling: true,
                fromDraft: fromDraft,
                termsAndCondtions: TermsAndCondtions,
                idNumber: idNumIqamaNum,
                birthDate: DOB,
                mobileNo: phoneNumber,
                questionnaire: questionnaireData,
                agree: [false],
                ownerName: `${firstName} ${lastName}`,
                ...centerInfo,
                lookupValues: getLookupValues(data),
                requestNum: requestNum || centerInfo.requestNum,
              }}
              cancelBtnFn={() => {
                navigate('/app/center-services-list', { replace: true });
              }}
              isEnableNextBtn={isEnableNextBtn}
              firstBackBtnFunc={handleBackBtn}
              isEnableEndBtn={true}
              onSubmit={onSubmit}
            >
              <FinalFromWizardOwnerInfoPage
                label="معلومات المالك"
                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                validate={(values) =>
                  sectionValidateInput(
                    tempLicenseFieldSchema,
                    'OwnerInfo',
                    values
                  )
                }
                setField={(fieldName, fieldValue) =>
                  setField(fieldName, fieldValue)
                }
              />

              <FinalFromWizardAddressPage
                label="عنوان المركز"
                validate={(values) =>
                  sectionValidateInput(
                    tempLicenseFieldSchema,
                    'CenterAddress',
                    values
                  )
                }
                setErrMessage={(errMessage) => setErrMessage(errMessage)}
                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                setField={(fieldName, fieldValue) =>
                  setField(fieldName, fieldValue)
                }
              />

              {centerInfo.centerType === '01' ||
                centerInfo.centerType === '03' ? (
                <FinalFromWizardCenterDetailsPage
                  label="تفاصيل المركز"
                  validate={(values) => {
                    const error = sectionValidateInput(
                      tempLicenseFieldSchema,
                      'CenterDetails',
                      values
                    );
                    if (
                      (values['centerType'] === '01' || values['centerType'] === '08') &&
                      (values['targetedGender'] === 'b' && values['ageGroup'] !== '2-12')
                    ) {
                      error['ageGroup'] =
                        'الفئة العمرية من ١٣-١٨ و ١٩-٤٥ لا تسمح بذكور و إناث';
                    }

                    if (values['centerCap'] <= 0) {
                      error['centerCap'] =
                        'يجب إدخال الطاقة الاستيعابية اكبر من صفر ';
                    }

                    return error;
                  }}
                  setErrMessage={(errMessage) => setErrMessage(errMessage)}
                  setIsEnableNextBtn={(isEnable) =>
                    setIsEnableNextBtn(isEnable)
                  }
                  setField={(fieldName, fieldValue) =>
                    setField(fieldName, fieldValue)
                  }
                />
              ) : null}
              {
                <Questionnaire
                  label="تقييم الجاهزية"
                  setIsEnableNextBtn={(isEnable) =>
                    setIsEnableNextBtn(isEnable)
                  }
                  questionnaireData={questionnaireData}
                  validate={(values) => validateQuestionnaires(values, questionnaireData)}
                  nextFun={(values) => calAnswerOfQuestionnaires(values, questionnaireData)}
                />
              }
              <TempSummary
                label="ملخص"
                Condition={ConditionDependOn}
                dialog={handleClickOpen}
              ></TempSummary>
            </FinalFromWizard>
          ) : (
            <CircularProgress
              size="15rem"
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                color: '#E2E8EB'
              }}
            />
          )}
        </CardContent>
      </Card>
      <AlertDialog
        dialogContent={dialogContent}
        dialogTitle={dialogTitle}
        open={open}
        onClose={handleClose}
        acceptBtnName="تم"
      />
    </Container>
  );
};

const FinalFromWizardOwnerInfoPage = ({
  label,
  validate,
  setField,
  values,
  setErrMessage,
  setIsEnableNextBtn
}) => (
  <OwnerInfo
    Condition={ConditionComp}
    values={values}
    setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
    setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
  />
);

const FinalFromWizardAddressPage = ({
  label,
  validate,
  setField,
  values,
  setIsEnableNextBtn,
  setErrMessage
}) => (
  <Box>
    <CenterAddress
      Condition={ConditionComp}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
      values={values}
      setErrMessage={(errMessage) => setErrMessage(errMessage)}
    />
  </Box>
);
const FinalFromWizardCenterDetailsPage = ({
  label,
  validate,
  setField,
  values,
  setIsEnableNextBtn,
  setErrMessage
}) => (
  <Box>
    <CenterDetails
      Condition={ConditionComp}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
      values={values}
      setErrMessage={(errMessage) => setErrMessage(errMessage)}
    />
  </Box>
);
const Questionnaire = ({ setField, values, label, setIsEnableNextBtn, questionnaireData }) => (
  <QuestionnaireSection
    values={values}
    setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
    setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
    questionnaireData={questionnaireData}
    label={label}
  />
);
const TempSummary = ({
  setField,
  temporaryLicenses,
  values,
  label,
  Condition,
  dialog
}) => (
  <Summary
    values={values} 
    temporaryLicenses={temporaryLicenses}
    setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
    label={label}
    Condition={Condition}
    dialog={dialog}
  />
);

export default CreateTemporaryLicense;
