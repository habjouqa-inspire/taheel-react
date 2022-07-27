/* eslint-disable */
import {
  Alert, Card,
  CardContent,
  CardHeader, CircularProgress, Container, Divider, Grid,
  MenuItem
} from '@material-ui/core';
import { Select } from 'final-form-material-ui';
import React, { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import FinalFormSummary from 'src/Core/Components/summary/FinalFormSummary';
import { LICENSE_FORM_TYPES } from 'src/Core/Utils/enums';
import { dateFormatter, reverseRange } from 'src/Core/Utils/TaheelUtils';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { CentertDetails } from 'src/Modules/CenterServices/API/ServicesApi';
import { getCentersForFinal, getMunicipalLicenseNoApi, updateFinalLicenseAPIFunc, validateCompanyFunc } from '../API/finalLicenseAPI';
import RenewalSummary from '../Sections/RenewalSummary';
import { CenterDetailsValidation, centerTypeJSON, getStaff } from '../Utils/finalLicenseUtil';

const CreateFinalLicenseRenewal = () => {
  const [renewableLicenses, setRenewableLicenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEnableNextBtn, setIsEnableNextBtn] = useState(true);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [centerLicenseNumber, setCenterLicenseNumber] = useState(location.state ? location.state.centerLicenseNumber : "1");
  const [editMode, setEditMode] = useState(false);
  const [editInitValues, setEditInitValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [errMessage, SetErrMessage] = useState('')
  const taskID = location.state ? location.state.taskID : null;
  const requestNum = location.state ? location.state.requestNum : "";
  const formDraft = location.state ? location.state.formDraft : false;
  const formType = location.state ? location.state.formType : null;

  useEffect(async () => {
    const { email } = await getCurrentUser();
    const getCentersRs = await getCentersForFinal(email);

    SetErrMessage("");
    if (!getCentersRs.isSuccessful) {
      SetErrMessage(getCentersRs.message);
      setIsLoading(false);
    } else {
      const { Centers } = getCentersRs.responseBody.data;
      setRenewableLicenses(Centers);
      setIsLoading(false);
    }

    if (formDraft) {
      setIsEnableNextBtn(false);
      setCheckData(true)
    }

  }, [])

  const getCentertDetails = async (licenseNumber) => {
    setIsLoading(true)
    SetErrMessage("");
    const response = await CentertDetails(licenseNumber)

    if (response.responseBody && response.responseBody.data && response.responseBody.data.center) {
      const crNum = response.responseBody.data.center.crInfo_r.crNumber;

      if (crNum != '') {
        const validateMomraRs = await getMunicipalLicenseNoApi(crNum)
        if (!validateMomraRs.isSuccessful) {
          SetErrMessage(validateMomraRs.message);
          setEditInitValues(response.responseBody.data);
          setIsLoading(false);
          setShowSummary(false);
          return response.responseBody.data;
        }
        const validateCompanyRs = await validateCompanyFunc(crNum)
        if (!validateCompanyRs.isSuccessful) {
          SetErrMessage(validateCompanyRs.message);
          setEditInitValues(response.responseBody.data);
          setIsLoading(false);
          setShowSummary(false);
          return response.responseBody.data;
        }
      }
      else {
        SetErrMessage("لا يوجد رقم تسجيل");
        setEditInitValues(response.responseBody.data);
        setIsLoading(false);
        setShowSummary(false);
        return
      }
    }

    if (!response.isSuccessful) {
      SetErrMessage(response.message);
    }
    else {
      setEditInitValues(response.responseBody.data);
      setEditMode(true);
      setIsLoading(false);
      setShowSummary(true);
      return response.responseBody.data;
    }
  }

  const onSubmit = async (values) => {
    let response = null

    if (!values.isDraft) {
      response = await updateFinalLicenseAPIFunc(values, LICENSE_FORM_TYPES.RENEW, 0, false, requestNum);
      if (response.isSuccessful) {
        handleClickOpen(`${response?.responseBody?.data[0]}`, '');
      }
      else {
        SetErrMessage(`${response.message}`);
        setIsLoading(false)
      }
    }
    else {
      // handleClickOpen(` the application is draft and formType is ${values.formType} `, '');
      response = await updateFinalLicenseAPIFunc(values, formType, 0, true, requestNum);
      if (response.isSuccessful) {
        handleClickOpen(`${response.responseBody.data.message[0]} طلب رقم ${response.responseBody.data.requestNumber}`, '');
      }
      else {
        SetErrMessage(`${response.message}`);
        setIsLoading(false)
      }
    }
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
        <CardHeader
          title="طلب تجديد رخصة نهائية"
        />
        <Divider />
        {errMessage && (
          <Alert variant="outlined" severity="error">
            {errMessage}
          </Alert>
        )}
        <CardContent>
          {!isLoading ?
            <>
              {/* {!editMode &&
                <Alert severity="error" style={{ position: 'fixed', color: 'white', background: 'red', top: 50, right: 0, width: '100%', zIndex: 100, opacity: 0.8 }}>
                  {editInitValues.request?.comment}
                </Alert>
              } */}
              <FinalFormSummary
                initialValues={!editMode ? {
                  agree: [],
                  managersCount: 0,
                  teachersCount: 0,
                  beneficiariesNum: 0,
                  centerLicenseNumber: "1"
                } : {
                  centerLicenseNumber: editInitValues.center && editInitValues.center.centerLicense_r.LicenseNumber,
                  agree: [],
                  managersCount: 0,
                  teachersCount: 0,
                  centerType: editInitValues.center && editInitValues.center.type && editInitValues.center.targetedBeneficiary && editInitValues.center.targetedServices
                    && centerTypeJSON.type[parseInt(editInitValues.center.type)] && centerTypeJSON.targetedBeneficiary[parseInt(editInitValues.center.targetedBeneficiary)] && centerTypeJSON.targetedServices[parseInt(editInitValues.center.targetedServices)]
                    && centerTypeJSON.type[parseInt(editInitValues.center.type)].name
                    + ' - ' + editInitValues.center.targetedBeneficiary && centerTypeJSON.targetedBeneficiary[parseInt(editInitValues.center.targetedBeneficiary)].name
                    + ' - ' + editInitValues.center.targetedServices && centerTypeJSON.targetedServices[parseInt(editInitValues.center.targetedServices)].name,
                  companyName: editInitValues.center && editInitValues.center.name,
                  temporaryLicenseNum: editInitValues.center && editInitValues.center.centerLicense_r.LicenseNumber,
                  licenseCreationDate: editInitValues.center && dateFormatter(editInitValues.center?.centerLicense_r?.creationHijri),
                  licenseExpiryDate: editInitValues.center && dateFormatter(editInitValues.center?.centerLicense_r?.expirationHijri),
                  ownerName: editInitValues.center && editInitValues.center?.centerOwner_r?.ownerName,
                  ownerID: editInitValues.center && editInitValues.center?.centerOwner_r?.ownerID,
                  centerAgeGroup: editInitValues.center && reverseRange(editInitValues.center.ageGroup),
                  centerGenderGroup: editInitValues.center
                    && editInitValues.center.targetedGender &&
                    (editInitValues.center.targetedGender === "m" ? "ذكور" : (editInitValues.center.targetedGender === "f" ? "إناث" : "ذكور و إناث")),
                  CRNumber: editInitValues.center && editInitValues.center.crInfo_r.crNumber,
                  activities: editInitValues.center && editInitValues.center.crInfo_r.crActivityType,
                  municipLicenseNo: editInitValues.center && editInitValues.center.crInfo_r.MoMRA_Licence,
                  beneficiariesNum: editInitValues.center && editInitValues.center.centerInfo_r.beneficiaryCount,
                  capacity: editInitValues.center && editInitValues.center.centerInfo_r.carryingnumber,
                  financialGuarantee: editInitValues.center && `${editInitValues.center.centerInfo_r.financialGuarantee} ر.س.`,
                  buildingArea: editInitValues.center && editInitValues.center.centerInfo_r.buildingArea,
                  basementArea: editInitValues.center && editInitValues.center.centerInfo_r.basementArea,
                  operationPlan: [editInitValues.center && editInitValues.center.centerInfo_r && editInitValues.center.centerInfo_r.operationPlan && editInitValues.center.centerInfo_r.operationPlan.id],
                  executivePlan: [editInitValues.center && editInitValues.center.centerInfo_r.executivePlan && editInitValues.center.centerInfo_r.executivePlan.id],
                  officeReport: [editInitValues.center && editInitValues.center.centerInfo_r.engineeringPlan && editInitValues.center.centerInfo_r.engineeringPlan.id],
                  securityReport: [editInitValues.center && editInitValues.center.centerInfo_r.securityReport && editInitValues.center.centerInfo_r.securityReport.id],
                  Furniture: editInitValues.center && editInitValues.center.centerInfo_r && editInitValues.center.centerInfo_r.furniturePhoto_r && editInitValues.center.centerInfo_r.furniturePhoto_r.map(d => d.Document.id),
                  // Furniture: [1202],
                  financialGuaranteeAtt: [editInitValues.center && editInitValues.center.centerInfo_r.financialGuarbteeAtt && editInitValues.center.centerInfo_r.financialGuarbteeAtt.id],
                  healthServices: editInitValues.center && editInitValues.center.isHealthCareServices ? "yes" : "no",
                  healthServiceType: editInitValues.center && editInitValues.center.healthCareServices_r && editInitValues.center.healthCareServices_r.type && editInitValues.center.healthCareServices_r.type,
                  healthServiceAttachment: [editInitValues.center && editInitValues.center.centerInfo_r && editInitValues.center.healthCareServices_r && editInitValues.center.healthCareServices_r.attachment && editInitValues.center.healthCareServices_r.attachment.id],
                  // healthServiceAttachment: [1202],
                  // customers: editInitValues && editInitValues.staff,
                  customers: editInitValues && getStaff(editInitValues.staff),
                }}
                isEnableNextBtn={isEnableNextBtn}
                isEnableEndBtn={true}
                showSummary={showSummary}
                onSubmit={onSubmit}

              >
                <FinalFormRenewalSummary
                  validate={CenterDetailsValidation}
                  renewableLicenses={renewableLicenses}
                  setCenterLicenseNumber={setCenterLicenseNumber}
                  showSummary={showSummary}
                  setShowSummary={setShowSummary}
                  getCentertDetails={getCentertDetails} />
              </FinalFormSummary>
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

const FinalFormRenewalSummary = ({ setField, renewableLicenses, values, setCenterLicenseNumber, getCentertDetails, showSummary, setShowSummary }) => {
  return (
    <>
      <Grid
        container
        mt={4}
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
          className="custom-label-field"
        >
          <Field
            fullWidth
            label="رقم الترخيص النهائي"
            name="centerLicenseNumber"
            component={Select}
            required
            dir="rtl"
            variant="outlined"
            className="custom-field"
            formControlProps={{ fullWidth: true }}
            disabled={!Array.isArray(renewableLicenses) || !renewableLicenses.length}
          >
            <MenuItem value="1" key="1" selected={true}>اختيار</MenuItem>
            {/* <MenuItem value="0101020060" key="0101020060" >0101020060</MenuItem> */}
            {renewableLicenses.map(item => (
              <MenuItem key={item.centerLicense_r.LicenseNumber} value={item.centerLicense_r.LicenseNumber}>{item.centerLicense_r.LicenseNumber}</MenuItem>
            ))}
          </Field>
          <OnChange name="centerLicenseNumber">
            {async (value) => {
              if (value != 1) {
                await getCentertDetails(value);
              }
              else {
                setShowSummary(false);
              }
            }}
          </OnChange>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          className="custom-label-field"
        >
        </Grid>
      </Grid>
      {showSummary && <RenewalSummary
        values={values}
        setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      />
      }
    </>
  )
}

export default CreateFinalLicenseRenewal;
