import {
  Button, Card,
  CardContent,
  CardHeader, CircularProgress, Container, Divider, Grid,
  MenuItem,
  Typography
} from '@material-ui/core';
import { Alert } from '@mui/material';
import { Select } from 'final-form-material-ui';
import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { useLocation, useNavigate } from 'react-router';
import { APIRequest } from 'src/Core/API/APIRequest';
import { useLookup } from 'src/Core/Contexts/useLookup';
import FieldsCreator from 'src/Core/SchemaBuilder/FieldsCreator';
import {
  getFieldValue,
  getOptions
} from 'src/Core/SchemaBuilder/Utils/CoreUtils';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { CentertDetails, validateCitizenFunc } from 'src/Modules/CenterServices/API/ServicesApi';
import { getRequestDetails } from '../../API/ServicesApi';
import { getAddressFromObject } from '../../TransferCenterOwnership/Utils/FormateJson';
import LandingPageSchema from '../Schema/LandingPageSchema';

const FinalLicenseLandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lookupValues = useLookup();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [centers, setCenters] = useState([]);
  const [centerData, setCenterData] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [vals, setVals] = useState(!!location.state?.backValues ? location.state?.backValues : {});
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
      isExpired: false,
      licenseType: '1',
      isEligibleForFinal: true
    };
    const response = await APIRequest({ url, queryParams });
    return response;
  };

  const contentField = ({
    input: { value, name },
    label,
    inputType,
    values,
    field,
    key
  }) => {
    value = getFieldValue({
      options: getOptions(values.lookupValues, field),
      value,
      values
    });
    return !!value ? (
      <Grid item key={key} lg={6} md={6} xs={12}>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {label}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {value}
        </Typography>
      </Grid>
    ) : null;
  };

  const centerInfo = async (values) => {
    const licenseNumber = centers.find((center) => center?.ID + '' === values.ID + '')?.centerLicense_r?.LicenseNumber;
    setDataLoaded(false);
    if (licenseNumber) {
      const response = await CentertDetails(licenseNumber)
      if (!response.isSuccessful) {
        setErrMessage(response.message)
        return false;
      } else {
        const center = response.responseBody.data.center;
        setCenterData(center);
        setVals((Vals) => {
          Vals = {
            ...center,
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
            centerType: center?.type,
            final: true,
          };
          delete Vals.centerLocation_r
          return Vals;
        });
        setIsLoading(false);
        setDataLoaded(true);
      }
    }
  };

  useEffect(async () => {
    setIsLoading(true);

    const res = await getCentersFun();
    if (!res.isSuccessful) {
      setIsLoading(false);
      setErrMessage(res?.message);
    } else {
      setCenters(res?.responseBody?.data?.Centers);

      const center2 = location?.state?.center;
      if (!!center2) {
        setVals({
          ...center2,
          targetedBenificiray: center2?.targetedBeneficiary,
          targetedServices: center2?.targetedServices,
          centerType: center2?.type,
          final: true,
        });
        setCenterData(center2);
      }
    }
    if (!!vals && !requestNum) {
      setDataLoaded(true);
      setIsLoading(false);
    } else if (!!requestNum) {
      const getReqDetails = await getRequestDetails(requestNum);
      if (!getReqDetails.isSuccessful) {
        setIsLoading(false);
        setErrMessage(getReqDetails.message.error || getReqDetails.message);
      } else {
        let details = getReqDetails.responseBody.requestDetails.data;
        const draft_values = details.draft_values?.draft_values;
        console.log('draft_values=======>', draft_values);

        setVals((preVals) => {
          preVals = {
            ...preVals,
            ...draft_values,
            address: getAddressFromObject(draft_values),
            isDraft: false,
            final: true,
          };
          return preVals;
        });
        setIsLoading(false);
        setDataLoaded(true);
      }
    } else {
      setIsLoading(false);
    }

  }, []);

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader title="إصدار ترخيص" />
        <Divider />

        <CardContent>
          {!isLoading ? (
            <>
              <Form
                initialValues={{
                  ...vals,
                  lookupValues: lookupValues,
                  final: true,
                }}
                validate={(values) => {
                  let error = {}
                  if (!values.ID || values.ID === undefined)
                    error.ID = 'يرجى اختيار الموافقة المبدئية';
                  return error;
                }}
                onSubmit={async (values) => {
                  console.log('FinalLicenseLandingPage:: Values ID:', values.ID);
                  if (!values.ID || values.ID === undefined) {
                    setErrMessage('يرجى اختيار الموافقة المبدئية');
                    return;
                  }
                  setErrMessage('')
                  if (values.type === "08" && values.targetedBeneficiary === "11") {
                    const validateCitzen = await validateCitizenFunc({ idNumber: idNumIqamaNum, birthDate: DOB });
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
                    state: { centerData: values, requestNum: requestNum }
                  })
                }
                }
                render={({ handleSubmit, values, submitting }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3} mt={3}>
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
                          label="اختيار الموافقة المبدئية"
                          name="ID"
                          component={Select}
                          required
                          disabled={centers?.length === 0}
                          dir="rtl"
                          variant="outlined"
                          className="custom-field"
                          formControlProps={{ fullWidth: true }}
                        >
                          {centers?.map((item, idx) => (
                            <MenuItem key={item.idx} value={item.ID}>
                              {item.centerLicense_r.LicenseNumber}
                            </MenuItem>
                          ))}
                        </Field>
                        <OnChange name="ID">
                          {() => {
                            setErrMessage('')
                            centerInfo(values);
                          }}
                        </OnChange>
                      </Grid>

                      <FieldsCreator
                        schema={LandingPageSchema}
                        formType="view"
                        values={vals}
                        lookupObject={lookupValues}
                        isLoading={!dataLoaded}
                      />
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
                          <Grid item>
                            <Button
                              startIcon={
                                submitting ? (
                                  <CircularProgress size="1rem" />
                                ) : null
                              }
                              disabled={!dataLoaded || submitting || centers?.length === 0}
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

export default FinalLicenseLandingPage;