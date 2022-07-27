import { Alert, Button, Card, CardContent, CardHeader, CircularProgress, Container, Divider, Grid, MenuItem } from "@material-ui/core";
import { Select } from 'final-form-material-ui';
import { useEffect, useState } from 'react';
import { Field, Form } from "react-final-form";
import { OnChange } from 'react-final-form-listeners';
import { useLocation, useNavigate } from "react-router";
import HeatMapContainer from "src/Core/Components/HeatMapContainer";
import { useLookup } from 'src/Core/Contexts/useLookup';
import { CentertDetails, getCentersAPI } from "../../API/ServicesApi";
import { formatGetCenterDetails } from "../../TransferCenterOwnership/Utils/FormateJson";




const StateFeeBearingProgramLandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lookupValues = useLookup();
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(location.state ? location.state.dataLoaded : false);
  const [errMessage, setErrMessage] = useState('')
  const [validCenters, setValidCenters] = useState([])
  const [initialVals, setinitialVals] = useState(!!location.state?.backValues ? location.state?.backValues : {});



  useEffect(async () => {
    console.log("landing page location malak", location)
    setErrMessage('');

    const GetCenters = await getCentersAPI({ licenseType: '2', validCentersOnly: true,  isEligibleForFinal: true, requestTypeIdsToSkip: [6] , isExpired:false });
    if (!GetCenters.isSuccessful) {
      setIsLoading(false)
      setErrMessage(GetCenters?.message);
    }
    else {
      const centers = GetCenters?.responseBody?.data?.Centers;
      console.log("landing page centers malak", centers?.filter(center => center.type == '01'&& center.isStateFeeService != true ))
      setValidCenters(centers?.filter(center => center.type == '01'&& center.isStateFeeService != true))
      console.log("landing page malak centerss", centers?.filter(center => center.type == '01'))
      if (centers?.filter(center => center.type == '01')?.length == 0) {
        setErrMessage('لا يوجد مراكز')
      }
      setIsLoading(false)
    }
  }, [])

  const centerInfo = async (values) => {

    console.log("landing page malak values", values);

    const licenseNumber = values?.licenseNumber;
    if (licenseNumber) {
      const response = await CentertDetails(licenseNumber)
      if (!response.isSuccessful) {
        setErrMessage(response.message)
        setIsLoading(false);
        return false;
      }
      else {
        const data = response?.responseBody?.data;
        const staff = response?.responseBody?.data?.staff;
        console.log("landing page malak centerInfo data", data)
        console.log("landing page malak staff", staff)
        setinitialVals((initialVals) => {
          initialVals = {
            ...formatGetCenterDetails(data),
            customers: staff,
            licenseNumber: licenseNumber,
            isHealthCareServices: data?.center?.isHealthCareServices,
            executivePlan: data?.center?.centerInfo_r?.executivePlan && [data?.center?.centerInfo_r?.executivePlan?.id],
          };
          delete initialVals.centerLocation_r
          console.log("landing page malak initialVals", initialVals)
          return initialVals;
        });
        console.log("landing page malak values 22cfffffffffff", values.licenseNumber);

        setIsLoading(false);
        setDataLoaded(true);
      }
    }
  };

  ////////////static array of markers

  const markers = [
    {
      id: 1,
      name: "عدد الطلاب المسجلين : 30 والغير مسجلين :55",
      position: { lat: 24.774265, lng: 46.738586 }
    },
    {
      id: 2,
      name: "عدد الطلاب المسجلين : 24 والغير مسجلين :67",
      position: { lat: 24.774265, lng: 46.731585 }
    },
    {
      id: 3,
      name: "عدد الطلاب المسجلين : 44 والغير مسجلين :46",
      position: { lat: 24.776265, lng: 46.738384 }
    },
    {
      id: 4,
      name: "المركز الحالي",
      position: { lat: 24.774265, lng: 46.736583 }
    }
  ];



  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader title="تسجيل المركز الأهلي في برنامج تحمل الدولة للرسوم" />
        <Divider />

        <CardContent>
          {!isLoading ? (
            <>
              <Form
                initialValues={{
                  ...initialVals,
                  lookupValues: lookupValues
                }}
                onSubmit={async (values) => {
                  setErrMessage('');
                  navigate('/center-services/stateFeeBearingProgramCont', {
                    state: { centerData: values, dataLoaded: dataLoaded }
                  });
                }}
                render={({ handleSubmit, values, submitting }) => (
                  <form onSubmit={handleSubmit} noValidate>

                    <Grid container
                      direction="row"
                      spacing={2}
                      mt={3}
                      justifyContent="left"
                    >
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
                          label="رقم الترخيص"
                          name="licenseNumber"
                          component={Select}
                          required
                          dir="rtl"
                          variant="outlined"
                          disabled={validCenters?.length === 0}
                          className="custom-field"
                          formControlProps={{ fullWidth: true }}
                        >
                          {validCenters?.map((item, idx) => (
                            <MenuItem
                              key={idx}
                              value={item?.centerLicense_r?.LicenseNumber}
                            >
                              {item?.centerLicense_r?.LicenseNumber}
                            </MenuItem>
                          ))}
                        </Field>
                        <OnChange name="licenseNumber">
                          {() => {
                            console.log("dataLoaded??????", dataLoaded)
                            setErrMessage('');
                            setIsLoading(true)
                            centerInfo(values);
                          }}
                        </OnChange>
                      </Grid>
                    </Grid>
                    <br />
                    {dataLoaded && <HeatMapContainer values={values} markers={markers} mapCenterPosition={{lat: 24.774265, lng: 46.736583}} />}
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
                              disabled={!dataLoaded || submitting}
                              variant="contained"
                              color="primary"
                              type="submit"
                              sx={{
                                backgroundColor: '#3c8084'
                              }}
                            >
                              الذهاب إلى الخدمة
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

  )

}
export default StateFeeBearingProgramLandingPage