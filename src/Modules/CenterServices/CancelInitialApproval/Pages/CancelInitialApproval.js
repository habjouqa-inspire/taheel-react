
/* eslint-disable */
import {
  Alert, Card,
  CardContent,
  CardHeader, CircularProgress, Container, Divider, Grid,
  MenuItem
} from '@material-ui/core';
import { Select } from 'final-form-material-ui';
import { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import { getOwnerDetails } from 'src/Core/Utils/TaheelUtils';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { CentertDetails } from '../../API/ServicesApi';
import { getTempLicense } from '../../FinalLicense/API/finalLicenseAPI';
import ApprovalSummary from '../Sections/ApprovalSummary';
import CancelReasonpDialog from '../Sections/CancelReasonpDialog';
import TempFormSummary from '../Sections/TempFormSummary';

const CancelInitialApproval = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lookupValues = useLookup()
  const refreshLookup = useUpdateLookup()
  const [tempLicenses, setTempLicenses] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEnableNextBtn, setIsEnableNextBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [approvalNum, setApprovalNum] = useState('');
  const [center, setCenter] = useState({});

  const [val, setVal] = useState([]);
  const { email, idNumIqamaNum, DOB, phoneNumber, firstName, secondName, lastName } = getCurrentUser();

  useEffect(async () => {
    lookupValues?.isEmpity && (refreshLookup())
    setIsLoading(true);
    const centerTypes=[]

    const getCentersRs = await getTempLicense(email,centerTypes);
    setErrMessage("");
    if (!getCentersRs.isSuccessful) {
      setErrMessage(getCentersRs.message);
      setIsLoading(false);
    } else {
      const { Centers } = getCentersRs.responseBody.data;
      setTempLicenses(Centers);
      setIsLoading(false);
    }
  }, [])

  const getCentertDetails = async (licenseNumber) => {
    setIsLoading(true)
    setErrMessage("");
    const response = await CentertDetails(licenseNumber)
    console.log("===> getCentertDetails response: " + JSON.stringify(response))
    /*  if (response?.responseBody?.data?.center) {
       const attach = response.responseBody.data.center && response.responseBody.data.center.centerInfo_r && response.responseBody.data.center.centerInfo_r.operationPlan && response.responseBody.data.center.centerInfo_r.operationPlan.id;
       console.log('===> attach: ' + JSON.stringify(attach))
     } */
    // new api to get the draft request numbe if exist 
    // setRequestNum(value)
    if (!response.isSuccessful) {
      setErrMessage(response.message);
    }
    else {
      const data = response.responseBody?.data
      setDetails([]);
      setDetails(details => {
        details = {
          ...details,
          ...getOwnerDetails(data)
        }
        console.log("details ", details)
        return details
      });
      setCenter(response.responseBody.data.center)
      setIsLoading(false);
      setShowSummary(true);
      // return response.responseBody.data;
      return;
    }
  }
  const handleClickOpen = () => {
    setErrMessage("");
    setOpen(true);
  };
  const handleClose = () => {
    setErrMessage("");
    setOpen(false);
  };
  const handleIsClose = () => {
    setErrMessage("");
    setIsOpen(false);
    navigate('/app/center-requests', { replace: true });
  };
  const onSubmit = async (values) => {
    setErrMessage("")
    setVal(values);
    handleClickOpen();
  }
  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader
          title="طلب إلغاء موافقة مبدئية"
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
              <TempFormSummary
                initialValues={{
                  agree: [false],
                  beneficiariesNum: 0,
                  centerLicenceNumber: center?.centerLicense_r?.LicenseNumber,
                  centerName: center && center.name,
                  centerType: center?.type,
                  centerName: center && center.name,
                  licenseExpiryDate: center?.centerLicense_r?.expirationHijri,
                  targetedServices: center?.targetedServices,
                  city: center?.centerLocation_r?.city || center?.city,
                  buildNo: center?.centerLocation_r?.buildNo || center?.buildNo,
                  street: center?.centerLocation_r?.street || center?.street,
                  sub: center?.centerLocation_r?.area || center?.area,
                  postalCode: center?.centerLocation_r?.postalCode || center?.postalCode,
                  additionalNo: center?.centerLocation_r?.additionalNo || center?.additionalNo,
                  targetedGender: center?.targetedGender,
                  questionnairesScore: center?.questionnairesScore,
                  lookupValues: lookupValues,
                  targetedBenificiray: center?.targetedBeneficiary,
                  targetedServices: center?.targetedServices,
                  centerType: center?.type,
                  workingHours: center?.workingHours,
                  ageGroup:center?.ageGroup,
                  estimatedCapacity:center?.centerInfo_r?.estimatedCapacity,
                  ...details
                }}
                cancelBtnFn={() => { navigate('/app/center-services-list', { replace: true }); }}
                isEnableCancelBtn={true}
                isEnableNextBtn={isEnableNextBtn}
                showSummary={showSummary}
                onSubmit={onSubmit}
              >
                <FinalFormTempSummary
                  tempLicenses={tempLicenses}
                  setApprovalNum={setApprovalNum}
                  showSummary={showSummary}
                  setShowSummary={setShowSummary}
                  getCentertDetails={getCentertDetails} />
              </TempFormSummary>
            </>
            :
            <CircularProgress size="15rem" style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto', color: '#E2E8EB'
            }} />
          }
        </CardContent>
        <CancelReasonpDialog 
        errMessage={errMessage}
         setErrMessage={setErrMessage} 
         approvalNum={approvalNum}
          open={open} setOpen={(open) => handleIsClose()}
           onClose={handleClose}
            licenseNumber={center?.centerLicense_r?.LicenseNumber} />
      </Card>

    </Container>
  );
}

const FinalFormTempSummary = ({ setField, tempLicenses, values, setApprovalNum, getCentertDetails, showSummary, setShowSummary }) => {

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
            label="رقم الموافقة المبدئية"
            name="centerLicenceNumber"
            component={Select}
            required
            dir="rtl"
            variant="outlined"
            className="custom-field"
            formControlProps={{ fullWidth: true }}
          >
            {console.log("tempLicensestempLicenses", tempLicenses),
              tempLicenses.map(item => (
                // (item.type !== "01") &&
                <MenuItem key={item.centerLicense_r.LicenseNumber} value={item.centerLicense_r.LicenseNumber}>{item.centerLicense_r.LicenseNumber}</MenuItem>
              ))}
          </Field>
          <OnChange name="centerLicenceNumber">
            {async (value) => {
              console.log(`++++++centerLicenceNumber + ${value}`);
              if (value != 1) {
                setApprovalNum(value);
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
      {showSummary && <ApprovalSummary
        values={values}
        setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
      />
      }
    </>
  )
}
export default CancelInitialApproval;