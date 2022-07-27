/* eslint-disable */
import {
  Alert, AlertTitle, Box,
  Card,
  CardContent,
  CardHeader, CircularProgress, Container, Divider
} from '@material-ui/core';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import FinalFromWizard from 'src/Core/Components/wizard/FinalFormWizard';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import { LICENSE_FORM_TYPES, OWNER_TYPE } from 'src/Core/Utils/enums';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { CentertDetails } from 'src/Modules/CenterServices/API/ServicesApi';
import CenterDetails from 'src/Modules/CenterServices/FinalLicense/Sections/CenterDetails';
import CenterManagerInfo from 'src/Modules/CenterServices/FinalLicense/Sections/CenterManagerInfo';
import { getLookups, getTermsAndCondtions } from '../../TemporaryLicense/API/temporayLicenseAPI';
import CenterAddress from '../../TemporaryLicense/Sections/CenterAddress';
import { NewAddressValidation } from '../../TransferCenterLocation/Utils/TransferCenterLoactionUtil';
import { DraftDetails, TaskDetails, updateFinalLicenseAPIFunc } from '../API/finalLicenseAPI';
import Capacity from '../Sections/Capacity';
import HealthServices from '../Sections/HealthServices';
import RenewalSummary from '../Sections/RenewalSummary';
import Requirements from '../Sections/Requirements';
import PersonDetials from '../Sections/staff/PersonDetials';
import Summary from '../Sections/Summary';
import { calculationConditionComp, capacityValidation, CenterDetailsValidation, CenterMangerInfoValidation, ConditionComp, healthServicesValidation, MedicalPracticeComp, personsValidation, RequirementsValidation } from '../Utils/finalLicenseUtil';


const CreateFinalLicense = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const lookupValues = useLookup()
  const refreshLookup = useUpdateLookup()
  const [temporaryLicenses, setTemporaryLicenses] = useState()
  const [open, setOpen] = useState(false);
  const [isEnableNextBtn, setIsEnableNextBtn] = useState(false)
  const [dialogContent, setDialogContent] = useState("")
  const [dialogTitle, setDialogTitle] = useState("")
  const [centerLicenseNumber, setCenterLicenseNumber] = useState(location?.state?.centerData?.centerLicenseNumber || location?.state?.centerLicenseNumber)
  const [editMode, setEditMode] = useState(false)
  const [center, setCenter] = useState({})
  const [editInitValues, setEditInitValues] = useState({})
  const [initValues, setInitValues] = useState({ ...location?.state?.centerData, renewal: location?.state.fromRenewal })
  const [draftValues, setDraftValues] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [termsAndConditions, setTermsAndCondtions] = useState();
  const [canShowSection, setCanShowSection] = useState(true)
  const [errMessage, setErrMessage] = useState('')
  const [staffTypes, setStaffTypes] = useState([])
  const [centersForDisabilities, setCentersForDisabilities] = useState(initValues?.type === "01")
  const formType = location.state ? location.state.formType : null
  const fromRenewal = location?.state?.fromRenewal
  const taskID = location.state ? location.state.taskID : null
  const requestNum = location.state ? location.state.requestNum : ""
  const formDraft = location.state ? location.state.formDraft : false
  const { email } = getCurrentUser();
  const [title, setTitle] = useState(initValues?.renewal ? 'تجديد الترخيص' : "إصدار ترخيص")
  const [inHouseHspit, setInHouseHspit] = useState(() => (initValues.type === "08" && initValues.targetedBeneficiary === "11") || (initValues.type === "08" && initValues.targetedBeneficiary === "09"));
let centerWorkingHours= location?.state?.centerData?.processVariablesDump?.NewCenterLocationData?.centerWorkingHours

  useEffect(async () => {
    console.log('returned data in returned request', formType);
    lookupValues?.isEmpity && (refreshLookup())
    setIsLoading(true);
    const termsAndcondtion = await getTermsAndCondtions(
      initValues?.type, location?.state?.fromRenewal ? 3 : 2
    );
    if (!termsAndcondtion.isSuccessful) {
      setTermsAndCondtions('لا يوجد إقرار وتعهد لهذه الخدمة')
      const response = {
        isSuccessful: false,
        message: termsAndcondtion?.message
      };
    } else {
      console.log('success pledge SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', termsAndcondtion?.responseBody?.data?.pledgeContent);
      setTermsAndCondtions(termsAndcondtion?.responseBody?.data?.pledgeContent);
    }
    if (!!initValues) {
      if (initValues.type === "01") {
        setTitle(title + " - مراكز ذوي الإعاقة")
      }
      if (initValues.type === "08") {
        setTitle(title + " - مراكز ضيافة الأطفال")
      }
      if (initValues.type === "05") {
        setTitle(title + " - مراكز الإرشاد الأسري")
      }
      if (initValues.type === "03") {
        setTitle(title + " - مراكز كبار السن ")
      }
    }

    const { email } = await getCurrentUser();
    if (centerLicenseNumber && formType === LICENSE_FORM_TYPES.EDIT) {
      setCenter(initValues.center)
    } else {
      if (!!initValues) {
        const { DOB, gender } = getCurrentUser();
        setInitValues(init => {
          if (init?.centerOwner_r?.ownerType === OWNER_TYPE.LEGAL_TYPE) {
            init.commissionerMobNum = init.centerOwner_r.ownerPhoneNumber
            init.entityName = init.centerOwner_r.ownerName
            delete init.centerOwner_r.ownerName
            delete init.centerOwner_r.ownerPhoneNumber
          } else {
            if (!init.fullName && !init.idNumber && !init.birthDate && !init.gender) {
              init.fullName = init?.centerOwner_r?.ownerName
              init.idNumber = init?.centerOwner_r?.ownerID
              init.birthDate = DOB
              init.gender = gender === 'm' ? "ذكور" : "انثى"
            }
          }
          init = {
    
            centerLicenseNumber: init?.centerLicense_r?.LicenseNumber,
            centerAgeGroup: init?.ageGroup,
            ownerEducationalQualifications: '',
            inHouseHspit: init.type === "08" && init.targetedBeneficiary === "11",
            centersForDisabilities: init.type === "01",
            includeOwnerQulfic: (init?.centerOwner_r?.ownerType === OWNER_TYPE.NATURAL_TYPE || init.ownerType === OWNER_TYPE.NATURAL_TYPE) && (init.type === "05" || init.type === "03"),
            ...init,
          }
          setCenterLicenseNumber(init?.centerLicense_r?.LicenseNumber)
          return init
        })
      }
    }
    if (requestNum && formDraft) {
      const response = await getDraftDetails(requestNum)
    }
    if (centerLicenseNumber && formType === LICENSE_FORM_TYPES.RENEW && !formDraft) {
      const response = await getCentertDetails(centerLicenseNumber)
      setEditMode(false)
    }
    let response = await getLookups(2)

    if (!response.isSuccessful) {
      response = { isSuccessful: false, message: response.message };
    } else {
      setStaffTypes(response?.responseBody?.data?.lookup?.["Staff-Types"]?.content)
    }
    await setIsLoading(false);
  }, [])

  const getDraftDetails = async () => {
    setEditMode(true)
    setErrMessage("");
    const response = await DraftDetails(requestNum)
    const requestDetails = response.responseBody.requestDetails
    if (!response.isSuccessful)
      setErrMessage(response.message)
    else {
      const draftData = { ...requestDetails.data, staff: requestDetails.data.draft_values.staff }
      setEditInitValues(draftData)
      setDraftValues(requestDetails.data.draft_values.draft_values)
      setCenter(requestDetails.data.draft_values.center)
      // setIsLoading(false)
      return requestDetails.data.draft_values.center
    }
  }

  const getTaskDetails = async () => {
    setEditMode(true)
    setErrMessage("");
    const response = await TaskDetails(taskID)
    if (!response.isSuccessful)
      setErrMessage(response.message)
    else {
      setEditInitValues(response.responseBody.data)
      setCenter(response.responseBody.data.center[0])
      setIsLoading(false)
      return response.responseBody.data
    }
  }

  const getCentertDetails = async (centerLicenseNumber) => {
    setIsLoading(true)
    setErrMessage("");
    const response = await CentertDetails(centerLicenseNumber)
    if (!response.isSuccessful) {
      setErrMessage(response.message);
    }
    else {
      const data = response.responseBody.data;
      setEditInitValues({ ...data, inHouseHspit: data.center.type === "08" && data.center.targetedBeneficiary === "11" })
      setCenter(data.center)
      setEditMode(true)
      setIsLoading(false)
      // setShowSummary(true);
      return response.responseBody.data;
    }
  }

  const onSubmit = async (values) => {
    setErrMessage("")
    let response = null
    if (!values.isDraft) {
      if (values && values.formType === LICENSE_FORM_TYPES.RENEW) {
        response = await updateFinalLicenseAPIFunc(values, formType, taskID, false, requestNum);
        console.log('hellllllllllllllllllloooooooooooooooooooooooooooooooo', response?.responseBody?.data);
        if (response.isSuccessful && !!response?.responseBody?.data) {
          handleClickOpen(`${response?.responseBody?.data?.message || response?.responseBody?.data?.[0]}`);
        }

      }
      else if (!editMode) {
        console.log('hellllllllllllllllllloooooooooooooooooooooooooooooooo22', response?.responseBody?.data);

        response = await updateFinalLicenseAPIFunc(values, formType, taskID, false, requestNum);
        if (response.isSuccessful && !!response?.responseBody?.data) {
          handleClickOpen(`${response?.responseBody?.data?.message || response?.responseBody?.data?.[0]}`);
        }

      }
      else {

        response = await updateFinalLicenseAPIFunc(values, formType, taskID, false, requestNum);
        console.log('hellllllllllllllllllloooooooooooooooooooooooooooooooo223333333', response?.responseBody?.data);

        if (response.isSuccessful && !!response?.responseBody?.data) {
          handleClickOpen(`${response?.responseBody?.data?.message || response?.responseBody?.data[0]}`);
        }

      }
    }
    else {
      // handleClickOpen(` the application is draft and formType is ${values.formType} `, '');
      response = await updateFinalLicenseAPIFunc(values, formType, 0, true, requestNum);
      if (response.isSuccessful && !!response?.responseBody?.data) {
        console.log('hellllllllllllllllllloooooooooooooooooooooooooooooooo', response?.responseBody?.data);
        handleClickOpen(`${response?.responseBody?.data?.[0] || response?.responseBody?.data?.message}`);
      }
      else {
        setErrMessage(`${response.message}`);
        setIsLoading(false)
      }
    }
    return {
      isSuccessful: false, message: response?.message?.error || response?.message
    }
  };

  const handleBackBtn = (values) => {
    delete values.agree;
    console.log('values in final license ', values)
    delete values.isDraft;
    const urlToNavigate = !!fromRenewal ? '/center-services/finallicenserenewal' : '/center-services/finallicense';
    navigate(urlToNavigate, {
      replace: true,
      state: { backValues: values }
    });
  };

  const handleClickOpen = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle)
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate('/app/dashboard', { replace: true });
  };
  return (
    <Container maxWidth="md">
      <Card>
        {!isLoading && formType != LICENSE_FORM_TYPES.RENEW && (
          <CardHeader
            title={editMode && !formDraft ?
              `تعديل طلب إصدار ترخيص - ${requestNum}`
              :
              title}
          />
        )}
        {!isLoading && formType === LICENSE_FORM_TYPES.RENEW && (
          <CardHeader
            title={`طلب تجديد رخصة نهائية`}
          />
        )}
        <Divider />
        {!isLoading && !formDraft && editMode &&
          <Alert variant="outlined" severity="warning" sx={{ marginLeft: 2, marginRight: 2, marginTop: 1 }}>
            <AlertTitle> يرجى مراجعة طلب رقم {requestNum}</AlertTitle>
            {editInitValues.request && editInitValues.request?.comment}
          </Alert>
        }
        {!isLoading && formDraft &&
          <Alert icon={<DraftsTwoToneIcon sx={{ color: 'grey !important' }} />} variant="outlined" severity="info" sx={{ marginLeft: 2, marginRight: 2, marginTop: 1, color: 'grey !important', borderColor: 'grey !important' }}>
            <AlertTitle> مسودة رقم {requestNum}</AlertTitle>
            {editInitValues?.request && editInitValues.request?.comment}
          </Alert>
        }
        {errMessage && (
          <Alert variant="outlined" severity="error">
            {errMessage}
          </Alert>
        )}
        <CardContent>
          {!isLoading ?
            <>
              <FinalFromWizard
                initialValues={

                  !editMode && !formDraft ? {
                    lastPageErrorHandling: true,
                    agree: [false],
                    isNextBtnDisabled: false,
                    managersCount: 0,
                    teachersCount: 0,
                    page: formType === LICENSE_FORM_TYPES.RENEW ? 1 : 0,
                    staffTypesInitialValues: staffTypes,
                    formType: formType,
                    centerWorkingHours: inHouseHspit ? {} : null,
                    centerLicenseNumber: centerLicenseNumber,
                    ReCenterWorkingHours:centerWorkingHours,

                    managerBD: {},
                    lookupValues: lookupValues,
                    requestNum: requestNum || initValues.requestNum,
                    ...initValues,
                    termsAndConditions: termsAndConditions,
                  } : {
                    lastPageErrorHandling: true,
                    agree: [false],
                    isNextBtnDisabled: false,
                    managersCount: 0,
                    teachersCount: 0,
                    ReCenterWorkingHours:centerWorkingHours,

                    lookupValues: lookupValues,
                    requestNum: requestNum || initValues.requestNum,
                    ...draftValues,
                    ...initValues,
                    termsAndConditions: termsAndConditions,

                  }}
                isEnableNextBtn={isEnableNextBtn}
                onSubmit={onSubmit}
                firstBackBtnFunc={formType != LICENSE_FORM_TYPES.EDIT && handleBackBtn}
                cancelBtnFn={() => { navigate('/app/center-services-list', { replace: true }); }}
                isEnableCancelBtn={!!centerLicenseNumber} // formType === LICENSE_FORM_TYPES.TEMP
                isEnableEndBtn={!centerLicenseNumber}
                requestNum={requestNum}
                email={email}
                formDraft={formDraft}
                canShowSection={canShowSection}
              >

                {!fromRenewal && <FinalFromWizardCenterDetailsPage
                  centerLicenseNumber={centerLicenseNumber}
                  setCenterLicenseNumber={(centerLicenseNumber) => setCenterLicenseNumber(centerLicenseNumber)}
                  validate={CenterDetailsValidation}
                  temporaryLicenses={temporaryLicenses}
                  editMode={editMode}
                  inHouseHspit={inHouseHspit}
                  setEditMode={setEditMode}

                  setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                  label="معلومات المركز"
                  formDraft={formDraft} />}

                {!centersForDisabilities && !fromRenewal &&
                  <FinalFromWizardAddressPage
                    label="عنوان المركز"
                    validate={(values) => NewAddressValidation(values)}
                    setErrMessage={(errMessage) => setErrMessage(errMessage)}
                    setIsEnableNextBtn={(isEnable) =>
                      setIsEnableNextBtn(isEnable)}
                    setField={(fieldName, fieldValue) =>
                      setField(fieldName, fieldValue)}
                  />}

                {centersForDisabilities && <FinalFromWizardCapacityPage
                  validate={capacityValidation}
                  editMode={editMode}
                  setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                  label="الطاقة الاستيعابية والضمان المالي" />}


                <FinalFromWizardRequirements
                  validate={(values) => RequirementsValidation(values)}
                  setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                  setErrMessage={(errMessage) => setErrMessage(errMessage)}
                  label={'المتطلبات'}
                />

                {centersForDisabilities &&
                  <FinalFromWizardHealthServices
                    validate={(values) => healthServicesValidation(values)}
                    label="الخدمات الصحية"
                    editMode={editMode} />}
                {centersForDisabilities &&
                  <FinalFromWizardPersonsPage
                    nextFun={(values) => personsValidation(values)}
                    label="معلومات الكوادر"
                    editMode={editMode} />}


                {!centersForDisabilities &&
                  <FinalFromWizardCenterManagerInfo
                    label={initValues?.type === "08" && initValues?.targetedBeneficiary === "11" ? "بيانات مالكة المركز (مقر الضيافة المنزلية)" : "بيانات مدير/ة المركز"}
                    editMode={editMode}
                    setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                    validate={(values) => CenterMangerInfoValidation(values)}
                    setErrMessage={(errMessage) => setErrMessage(errMessage)}
                  />}

                < FinalFromWizardSummary
                  centersForDisabilities={centersForDisabilities}
                  label="الملخص"
                />
              </FinalFromWizard>
            </>
            :
            <CircularProgress size="15rem" style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto', color: '#E2E8EB'
            }} />
          }
        </CardContent>
      </Card>
      <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
    </Container>
  );
};

const FinalFromWizardCenterDetailsPage = ({
  setField,
  temporaryLicenses,
  editMode,
  setEditMode,
  values,
  inHouseHspit,
  centerLicenseNumber,
  setCenterLicenseNumber,
  setIsEnableNextBtn,
  formDraft }) => (
  <>
    <CenterDetails
      Condition={calculationConditionComp}
      values={values}
      inHouseHspit={inHouseHspit}
      centerLicenseNumber={centerLicenseNumber}
      setCenterLicenseNumber={(centerLicenseNumber) => setCenterLicenseNumber(centerLicenseNumber)}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      editMode={editMode}
      setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
      setEditMode={setEditMode}
      formDraft={formDraft}
    />
  </>
);
const FinalFromWizardAddressPage = ({
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
      setErrMessage={(errMessage) => setErrMessage(errMessage)}
      values={values}
    />
  </Box>
);

const FinalFromWizardCapacityPage = ({ editMode, values, setField, setIsEnableNextBtn }) => (
  <>
    <Capacity
      Condition={calculationConditionComp}
      values={values}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
      editMode={editMode}
    />
  </>
);

const FinalFromWizardRequirements = ({ setField, setErrMessage, temporaryLicenses, values, setIsEnableNextBtn }) => (
  <>
    <Requirements
      Condition={ConditionComp}
      values={values}
      setErrMessage={(errMessage) => setErrMessage(errMessage)}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
    />
  </>
)

const FinalFromWizardHealthServices = ({ editMode, setField, temporaryLicenses, values }) => (
  <>
    <HealthServices
      Condition={ConditionComp}
      values={values}
      temporaryLicenses={temporaryLicenses}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      editMode={editMode}
    />
  </>
);


const FinalFromWizardCenterManagerInfo = ({ editMode, setField, values, setIsEnableNextBtn, setErrMessage }) => (
  <>
    <CenterManagerInfo
      Condition={calculationConditionComp}
      setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
      setErrMessage={(errMessage) => setErrMessage(errMessage)}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      values={values}
      editMode={editMode}
    />
  </>
);
const FinalFromWizardPersonsPage = ({ editMode, setField, pop, push, values }) => (
  <>
    <PersonDetials
      MedicalPracticeCondition={MedicalPracticeComp}
      Condition={ConditionComp}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      pop={pop}
      push={push}
      values={values}
      editMode={editMode}
    />
  </>
);

const FinalFromWizardSummary = ({ setField, temporaryLicenses, values, centersForDisabilities }) => (
  <>
    {values.formType != LICENSE_FORM_TYPES.RENEW ?
      <Summary
        values={values}
        centersForDisabilities={centersForDisabilities}
        temporaryLicenses={temporaryLicenses}
        setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      />
      :
      <RenewalSummary
        values={values}
        setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      />
    }
  </>
);

export default CreateFinalLicense;
