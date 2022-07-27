/* eslint-disable */
import {
  Alert,
  AlertTitle, Box,
  Card,
  CardContent,
  CardHeader, CircularProgress, Container, Divider
} from '@material-ui/core';
import DraftsTwoTone from '@material-ui/icons/DraftsTwoTone';
import { values } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import FinalFromWizard from 'src/Core/Components/wizard/FinalFormWizard';
import { LICENSE_FORM_TYPES } from 'src/Core/Utils/enums';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { getCentersAPI, getRequestDetails } from '../../API/ServicesApi';
import {
  getProgramDetails,
  getPrograms,
  programRegisterationRequest
} from '../API/programRegisterationAPI';
import ActivityDetails from '../Sections/ActivityDetails';
import ProgramDetails from '../Sections/ProgramDetails';
import { ProgramValidation } from '../Utils/UpdateProgramUtil';



const UpdateProgram = () => {
  const [targetedGroup, setTargetedGroup] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [errMessage, SetErrMessage] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [isEnableNextBtn, setIsEnableNextBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [editInitValues, setEditInitValues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [returnedProgramData, setReturnedProgamData] = useState(
    location?.state?.programData
  );
  const [centerLicenseNumber, setCenterLicenseNumber] = useState(
    location.state ? location.state.licenseNumber : null
  );
  const status = location?.state?.status;
  const [isReturned, setIsReturned] = useState(
    location?.state?.returnedRequest ? location?.state?.returnedRequest : false
  );

  const requestNum = location.state?.requestNum;
  const taskID = location.state?.taskID?.ID;
  const formEdit = location.state?.formEdit;
  const formDraft = location.state?.formDraft;
  const [showSummary, setShowSummary] = useState(false);
  const formType = location.state ? location.state.formType : null;
  const [formInits, setFormInits] = useState({
    agree: [],
    ProgramID: null,
    externalUserTaskID: taskID,
    requestNum: requestNum,

    activityName: '',
    isDraft: false,
    Activity: null,
    isNextBtnDisabled: false,
    licenseNumber: centerLicenseNumber,
    program: null,
    activities: [],
    registerationFees: null,
    programType: null,
    program_r: null,
    programAccredditation: null,
    activityAccredditation: null
  });
  const [centerDataa, setCenterData] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [draftData, setDraftValues] = useState([]);
  const { email } = getCurrentUser();
  const programFrom = [
    {
      id: 1,
      name: 'تعليمي'
    },
    {
      id: 2,
      name: 'مهني'
    },
    {
      id: 3,
      name: ' صحي'
    }
  ];
  useEffect(async () => {
    const isWorkSuspended = false;
    const validCentersOnly = true;
    const isEligibleForFinal = true;
    const licenseType = '2';

    const centers = await getCentersAPI({
      validCentersOnly,
      licenseType,
      isEligibleForFinal,
      isWorkSuspended
    });
    const apiProgram = await getPrograms();

    const draftValue = formDraft ? await getRequestDetails(requestNum) : null;
    console.log('draaftNNNNN' + JSON.stringify(draftValue));
    if (!!formDraft && !!draftValue.isSuccessful) {
      const drafts =
        draftValue.responseBody.requestDetails.data.draft_values.draft_values;
      setFormInits({
        agree: [],
        ProgramID: drafts.ID,
        taskID: taskID,
        activityName: '',

        isDraft: false,
        Activity: formDraft ? drafts.Activity : null,
        isNextBtnDisabled: false,
        licenseNumber: formDraft ? drafts.licenseNumber : null,
        program: formDraft ? drafts.program : null,
        activities: formDraft ? drafts.activities : [],
        registerationFees: formDraft ? drafts.registerationFees : null,
        programType: formDraft ? drafts.programType : null,
        program_r: formDraft ? drafts.program_r : null,
        programAccredditation: formDraft ? drafts.programAccredditation : null,
        activityAccredditation: formDraft ? drafts.activityAccredditation : null
      });
    }
    if (!apiProgram.isSuccessful) {
      const response = { isSuccessful: false, message: apiProgram.message };
      SetErrMessage(response?.message);
      setIsLoading(false);

    } else {
      const allProg =
        apiProgram?.responseBody?.data?.lookup?.Programmas_Type.content;

      setAllPrograms(allProg);
      setTargetedGroup(
        apiProgram?.responseBody?.data?.lookup?.Center_Types_Tree.content
      );
      if (status === 2) {
        const programDetails = await getProgramDetails(
          centerLicenseNumber,
          location.state.programID
        );
        if (!programDetails.isSuccessful) {
          const response = { isSuccessful: false, message: centers.message };

          return response;
        } else {
          console.log('programdett----------');
          const programDet = programDetails.responseBody.data.map;
          const programIdx = allProg.findIndex(
            (x) => x.name === programDet[0].Programmas.name
          );
          setFormInits({
            agree: [true],
            returnedRequest: isReturned,
            ProgramID: programDet[0].ID,
            externalUserTaskID: taskID,
            activityName: '',
            requestNum: requestNum,

            status: status,
            isDraft: false,
            Activity: null,
            licenseNumber: centerLicenseNumber,
            activities: programDet[0]?.activites.map((x) => {
              x.attachActivityDocument = x.attachActivityDocument.map(activityDoc => ({ ...activityDoc, Document: activityDoc?.Document?.id }));
              return x;
            }),
            program: programIdx,
            registerationFees: programDet[0]?.Programmas.programFees,
            programType: programDet[0]?.programCategory_r,
            program_r: programDet[0]?.program_r,
            programAccredditation: programDet[0]?.accreditationDocument?.id
          });
          console.log(
            'programdett---------------------------' +
            JSON.stringify(programDet)
          );
        }
      }
      if (status === 3) {
        const programIdx = allProg.findIndex(
          (x) => x.name === returnedProgramData.name
        );
        const SelectedProgram_r = allProg.filter(
          (item) => item.name === returnedProgramData.name
        );

        setFormInits({
          agree: [true],
          returnedRequest: isReturned,
          externalUserTaskID: taskID,
          activityName: '',
          requestNum: requestNum,


          status: status,
          isDraft: false,
          Activity: null,
          licenseNumber: centerLicenseNumber,
          activities: returnedProgramData?.Activities,
          program: programIdx,
          registerationFees: returnedProgramData?.programFee,
          programType: returnedProgramData?.programCategory_r,
          program_r: SelectedProgram_r[0]?.ID,
          programAccredditation: returnedProgramData?.accreditationDocument
        });
      }
    }

    if (!centers.isSuccessful) {
      const response = { isSuccessful: false, message: centers.message };
      SetErrMessage(response?.message);
      setIsLoading(false);
      return response;
    } else {
      console.log('centerrrrrrrrrrrrrrrr----------');
      const centerData = centers;
      setCenterData(
        centerData?.responseBody?.data.Centers.filter(
          (data) => data.isValid !== true
        )
      );
    }

    setIsLoading(false);
  }, []);
  const handleClickOpen = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate('/app/dashboard', { replace: true });
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    console.log(
      'values++++++++++++',
      JSON.stringify(values, '\n--------' + email)
    );
    const response = await programRegisterationRequest(values, email);
    console.log('response.isSuccessful', response?.isSuccessful);
    if (response?.isSuccessful) {
      if (values.isDraft && !!response?.responseBody?.data) {
        handleClickOpen(
          `${response?.responseBody?.data?.message[0]} طلب رقم ${response?.responseBody?.data?.requestNumber}`,
          ''
        );
      } else {
        handleClickOpen(`${response?.responseBody?.data?.message}`, '');
      }
    } else {
      SetErrMessage(`${response?.message}`);
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader title="التسجيل في البرامج المعتمدة" />
        <Divider />
        {!isLoading && formDraft && (
          <Alert
            icon={<DraftsTwoTone sx={{ color: 'grey !important' }} />}
            variant="outlined"
            severity="info"
            sx={{
              marginLeft: 2,
              marginRight: 2,
              marginTop: 1,
              color: 'grey !important',
              borderColor: 'grey !important'
            }}
          >
            <AlertTitle> مسودة رقم {requestNum}</AlertTitle>
            {editInitValues?.request &&
              editInitValues.request?.comment}
          </Alert>
        )}
        {errMessage && (
          <Alert variant="outlined" severity="error">
            {errMessage}
          </Alert>
        )}
        <CardContent>
          {!isLoading ? (
            <FinalFromWizard
              initialValues={formInits}
              cancelBtnFn={() => {
                navigate('/center-services/programRegisteration', {
                  replace: true
                });
              }}
              isEnableCancelBtn={true}
              isEnableNextBtn={true}
              showSummary={showSummary}
              onSubmit={onSubmit}
              finalBtnTitle="تقديم"
            >
              <FinalFromWizardProgramDetails
                values={values}
                label="بيانات البرنامج "
                centerDataa={centerDataa}
                programs={allPrograms}
                programFrom={programFrom}
                setIsEnableNextBtn={true}
                isEnableEndBtn={true}
                targetedGroup={targetedGroup}

                SetErrMessage={SetErrMessage}
                validate={ProgramValidation}
                centerLicenseNumber={centerLicenseNumber}
                status={status}
              />
              <FinalFromWizardActivitiesDetailsPage
                label="بيانات الأنشطة"
                programs={allPrograms}
                SetErrMessage={SetErrMessage}
                setIsEnableNextBtn={true}
                values={values}
                formDraft={formDraft}
                status={status}
                targetedGroup={targetedGroup}
              />
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

const FinalFromWizardProgramDetails = ({
  values,
  setField,
  centerDataa,
  programs,
  programFrom,
  SetErrMessage,
  targetedGroup,
  centerLicenseNumber,
  status
}) => (
  <Box>
    <ProgramDetails
      values={values}
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      centerDataa={centerDataa}
      programs={programs}
      programFrom={programFrom}
      targetedGroup={targetedGroup}
      centerLicenseNumber={centerLicenseNumber}
      SetErrMessage={(msg) => SetErrMessage(msg)}
      status={status}
    />
  </Box>
);

const FinalFromWizardActivitiesDetailsPage = ({
  setField,
  setIsEnableNextBtn,
  programs,
  SetErrMessage,
  values,
  formDraft,
  targetedGroup,
  status
}) => (
  <Box>
    <ActivityDetails
      setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
      programs={programs}
      values={values}
      SetErrMessage={(msg) => SetErrMessage(msg)}
      formDraft={formDraft}
      targetedGroup={targetedGroup}
      status={status}
    />
    <></>
  </Box>
);

export default UpdateProgram;
