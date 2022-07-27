import {
  Button, Card,
  CardContent,
  CardHeader, CircularProgress, Container, Divider, Grid,
  MenuItem
} from '@material-ui/core';
import { Alert } from '@mui/material';
import { Select } from 'final-form-material-ui';
import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { useLocation, useNavigate } from 'react-router';
import { APIRequest } from 'src/Core/API/APIRequest';
import { useLookup } from 'src/Core/Contexts/useLookup';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { CentertDetails, getRequestDetails, validateCitizenFunc } from '../../API/ServicesApi';
import {
  formatGetCenterDetails,
  getAddressFromObject
} from '../../TransferCenterOwnership/Utils/FormateJson';
import { getMunicipalLicenseNoApi, updateFinalLicenseAPIFunc, validateCompanyFunc } from '../API/finalLicenseAPI';
import Summary from '../Sections/Summary';

const RenewalLicenseLandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lookupValues = useLookup();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [centers, setCenters] = useState([]);
  const [centerData, setCenterData] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [vals, setVals] = useState(location.state?.backValues);
  const [disableEditBtn, setDisableEditBtn] = useState(false);
  const formDraft = location.state ? location.state.formDraft : false

  const [formatedValues, setFormatedValues] = useState();
  const { userEmail } = getCurrentUser();
  const requestNum = location.state?.requestNum;
  const {
    email,
    idNumIqamaNum,
    gender,
    DOB,
    phoneNumber,
    firstName,
    lastName
  } = getCurrentUser();
  const getCentersFun = async () => {
    const url = 'taheel-apis-records-getCenters-v2';
    const queryParams = {
      userEmail,
      isFinal: true,
      licenseType: 2,
      isWorkSuspended:false,
      isEligibleForFinal: true,
      forRenewal: true
    };
    const requestBody = {
      centerTypes: []
    }
    const response = await APIRequest({ requestBody, url, queryParams });
    return response;
  };

  const centerInfo = async (values, fromOnChange) => {
    setDataLoaded(false);
    setIsLoading(true);
    setErrMessage('');

    const response = await CentertDetails(values.centerLicenseNumber)
    if (!response.isSuccessful) {
      setErrMessage(response.message)
      return;
    } else {
      const center = response.responseBody.data;
      setCenterData(center);
      const centerDetailsVals = {
        ...center,
        centerLicenseNumber: values?.centerLicenseNumber,
        city: center?.centerLocation_r?.city,
        sub: center?.centerLocation_r?.area,
        street: center?.centerLocation_r?.street,
        buildNo: center?.centerLocation_r?.buildNo,
        postalCode: center?.centerLocation_r?.postalCode,
        additionalNo: center?.centerLocation_r?.additionalNo,
        lat: center?.centerLocation_r?.lat,
        lng: center?.centerLocation_r?.lng,
        address: getAddressFromObject(center),
        targetedBenificiray: center?.targetedBeneficiary,
        targetedServices: center?.targetedServices,
        centerType: center?.type
      };

      console.log('data before format', centerDetailsVals);
      const allCenterFormatedData = formatGetCenterDetails(centerDetailsVals);
      await validateCenter(allCenterFormatedData)

      console.log('data after format', allCenterFormatedData);

      setFormatedValues({
        ...allCenterFormatedData,
        lookupValues: lookupValues,
        renewal: true,
        centerLicense_r: { LicenseNumber: values.centerLicenseNumber }
      });
      fromOnChange && setVals({
        ...allCenterFormatedData,
        lookupValues: lookupValues,
        renewal: true,
        centerLicense_r: { LicenseNumber: values.centerLicenseNumber }
      });
      setDisableEditBtn(false);

      setIsLoading(false);
      setDataLoaded(true);
    }
  };

  useEffect(async () => {
    console.log('renewalLicenseLanding::useEffect::location.sate',location?.state);

    const res = await getCentersFun();

    if (!res.isSuccessful) {
      setIsLoading(false);
      setErrMessage(res?.message?.error || res?.message);
      return;
    }
    setCenters(res?.responseBody?.data?.Centers);
    const center2 = location?.state?.centerData;

    //need to from where and why we use center2 !!
    if (!!center2) {
      console.log('renewalLicenseLanding::useEffect::ifTheCenter2IsDefined', center2);

      setVals({
        ...center2,
        targetedBenificiray: center2?.targetedBeneficiary,
        targetedServices: center2?.targetedServices,
        renewal: true,
        centerType: center2?.type
      });
      setFormatedValues({
        ...center2,
        renewal: true,

        targetedBenificiray: center2?.targetedBeneficiary,
        targetedServices: center2?.targetedServices,
        centerType: center2?.type
      })
      setCenterData(center2);
    }

    console.log('renewalLicenseLanding::useEffect::requestNumber', requestNum);
    console.log('renewalLicenseLanding::useEffect::location.state?.backValues', location.state?.backValues);
    console.log('renewalLicenseLanding::useEffect::vals', vals);

    if (!!vals && !requestNum) {
      console.log('renewalLicenseLanding::useEffect::if (!!vals && !requestNum)');

      setDataLoaded(true);
      setIsLoading(true);
      centerInfo(vals);
      return;
      
    } 
     if (!!requestNum) {
      console.log('renewalLicenseLanding::useEffect::else if (!!requestNum)');

      const getReqDetails = await getRequestDetails(requestNum);
      if (!getReqDetails.isSuccessful) {
        setIsLoading(false);
        setErrMessage(getReqDetails?.message?.error || getReqDetails?.message);
      } else {
        let details = getReqDetails.responseBody.requestDetails?.data;
        const draft_values = details.draft_values?.draft_values;
        console.log('draft valuess ::: ', draft_values);
        setVals((preVals) => {
          preVals = {
            ...preVals,
            ...draft_values,
            address: getAddressFromObject(draft_values),
            isDraft: false
          };
          return preVals;
        });
        await centerInfo(draft_values) //check
        if (!!draft_values) {
          await validateCenter(draft_values)
        }
        setIsLoading(false);
        setDataLoaded(true);
      }
      return;

    } 
    
      console.log('renewalLicenseLanding::useEffect::else');

      setIsLoading(false);
    
  }, []);

  const validateCenter = async (values) => {
    const validateCompanyRs = await validateCompanyFunc(values?.CRNumber)
    if (!validateCompanyRs.isSuccessful) {
      setErrMessage(validateCompanyRs?.message?.error || validateCompanyRs?.message);
      setDataLoaded(true);
      setDisableEditBtn(true);
      setIsLoading(false)
      return;
    }

    const getMunicipalLicenseRs = await getMunicipalLicenseNoApi(values?.CRNumber);
    if (!getMunicipalLicenseRs.isSuccessful) {
      setErrMessage(getMunicipalLicenseRs?.message?.error || getMunicipalLicenseRs?.message);
      setDataLoaded(true)
      setDisableEditBtn(true);
      setIsLoading(false)
      return;
    }
  }
  const onSubmit = async (values) => {
    setErrMessage("")
    setIsLoading(true)
    let response = null


    response = await updateFinalLicenseAPIFunc(values, 0, true, requestNum);
    if (response.isSuccessful && !!response?.responseBody?.data) {
      // handleClickOpen(`${response.responseBody.data.message[0]}`);
    }
    else {
      setErrMessage(`${response.message}`);
      setIsLoading(false)
    }
  }


  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader title="تجديد الترخيص" />
        <Divider />

        <CardContent>
          {!isLoading ? (
            <>
              <Form
                initialValues={{
                  ...vals,
                  lookupValues: lookupValues
                }}
                validate= {(values)=>{  
                  let error={}
                  if(!values.centerLicenseNumber || values.centerLicenseNumber === undefined)
                    error.centerLicenseNumber='يرجى اختيار الترخيص';
                  return error;  
                }}
                onSubmit={async (values) => {
                  setErrMessage('');
                  if (
                    values?.centerType === '08' &&
                    values?.center?.targetedBeneficiary === '11'
                  ) {
                    const validateCitzen = await validateCitizenFunc({ idNumber: values.idNumber, birthDate: values.managerBOD })

                    if (!validateCitzen.isSuccessful) {
                      const response = {
                        isSuccessful: false,
                        message: validateCitzen.message
                      };
                      setErrMessage(response.message);
                      return;
                    }
                  }
                  navigate('/center-services/finallicenseCont', {
                    state: {
                      centerData: {
                        ...vals, fromRenewal: true,

                        inHouseHspit: vals?.type === "08" && vals?.targetedBenificiray === "11",
                      },
                      formDraft: formDraft,
                      requestNum: requestNum,
                      centerLicenseNumber: vals?.centerLicenseNumber,
                      fromRenewal: true,

                    }
                  });
                }}
                render={({ handleSubmit, values, submitting }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Grid >
                      <Grid item md={12} xs={12}>
                        {errMessage && (
                          <Alert variant="outlined" severity="error">
                            {errMessage}
                          </Alert>
                        )}
                      </Grid>
                      <Grid item md={12} xs={12} className="custom-label-field">
                        <Field
                          fullWidth
                          label="اختيار الترخيص"
                          name="centerLicenseNumber"
                          component={Select}
                          required
                          dir="rtl"
                          variant="outlined"
                          disabled={centers.length === 0}
                          className="custom-field"
                          formControlProps={{ fullWidth: true }}
                        >
                          {centers?.map((item, idx) => (
                            <MenuItem
                              key={item.centerLicense_r.LicenseNumber}
                              value={item.centerLicense_r.LicenseNumber}
                            >
                              {item.centerLicense_r.LicenseNumber}
                            </MenuItem>
                          ))}
                        </Field>
                        <OnChange name="centerLicenseNumber">
                          {() => {
                            setIsLoading(true);
                            setErrMessage('');
                            centerInfo(values, true);
                          }}
                        </OnChange>
                      </Grid>

                      {dataLoaded && (
                        <>  <Summary
                          landingPage={true}
                          values={{
                            ...formatedValues, renewal: true,
                          }}
                          centersForDisabilities={
                            (formatedValues?.type === '01' || formatedValues?.centerType === '01')
                          }
                        />
                        </>
                      )}
                    </Grid>
                    <br />
                    <Divider />

                    <Grid
                      container
                      direction="row"
                      spacing={2}
                      mt={3}
                      justifyContent="left"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          spacing={2}
                          justifyContent="flex-end"
                        >
                          {/* <Grid item>
                            <Button
                            onClick={()=>{onSubmit(formatedValues)}}
                              startIcon={
                                submitting ? (
                                  <CircularProgress size="1rem" />
                                ) : null
                              }
                              disabled={!dataLoaded || submitting}
                              variant="contained"
                              color="primary"
                              type="submit"
                              sx={{
                                backgroundColor: '#3c8084'
                              }}
                            >
                              إعتماد البيانات وتقديم الطلب
                            </Button>
                          </Grid> */}
                          <Grid item>
                            <Button
                              startIcon={
                                submitting ? (
                                  <CircularProgress size="1rem" />
                                ) : null
                              }
                              disabled={!dataLoaded || submitting || disableEditBtn}
                              variant="contained"
                              color="primary"
                              type="submit"
                              sx={{
                                backgroundColor: '#3c8084'
                              }}
                            >
                              التعديل على البيانات
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                )}
              />
            </>
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
    </Container>
  );
};

export default RenewalLicenseLandingPage;
