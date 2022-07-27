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
import { useLookup } from 'src/Core/Contexts/useLookup';
import FieldsCreator from 'src/Core/SchemaBuilder/FieldsCreator';
import { MESSAGE_CODES } from 'src/Core/Utils/MESSAGE_CODES';
import {
  CentertDetails,
  getCentersAPI, getRequestDetails
} from 'src/Modules/CenterServices/API/ServicesApi';
import { formatGetCenterDetails } from '../../TransferCenterOwnership/Utils/FormateJson';
import { formalLetterDoc, TransferRequirmentsCompletionLetterReq } from '../API/TransferCenterLocationAPI';
import CenterTransferDetailsSchema from '../Schema/CenterTransferDetailsSchema';
import TransferRequirmentsCompletionLetter from '../Sections/TransferRequirmentsCompletionLetter';

const TransferCenterLocationLandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lookupValues = useLookup();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLetterLoading, setIsLetterLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [centers, setCenters] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [landingLoaded, setLandingLoaded] = useState(false);
  const [taskID, setTaskID] = useState('');
  const [completionLetter, setCompletionLetterData] = useState();
  const [formalLetterDocument, setFormalLetterDocument] = useState();
  const [vals, setVals] = useState(
    !!location.state?.backValues ? location.state?.backValues : {}
  );
  const [lan, setLan] = useState(location.state?.landing);
  const requestNum = location.state?.requestNum;
  const formDraft = location.state?.formDraft;
  const [formEdit, setFormEdit] = useState(location.state?.formEdit);

  console.log("location.state===? ", location.state)

  const centerInfo = async (values) => {
    const licenseNumber = centers.find((center) => center?.ID + '' === values.ID + '')?.centerLicense_r?.LicenseNumber;
    setDataLoaded(false);
    if (licenseNumber) {
      const response = await CentertDetails(licenseNumber);
      if (!response.isSuccessful) {
        setErrMessage(response.message);
        return false;
      } else {
        const center = response.responseBody.data.center;
        const staff = response.responseBody.data.staff;
        console.log('center2022', center);
        setVals((Vals) => {
          Vals = {
            ...center,
            targetedBenificiray: center?.targetedBeneficiary,
            targetedServices: center?.targetedServices,
            centerType: center?.type,
            executivePlan: center?.centerInfo_r?.executivePlan,
            staff: staff,

          };
          return Vals;

        });
        setIsLoading(false);
        setDataLoaded(true);
        setLandingLoaded(true);
      }
      console.log('Vals====>', vals);
      setLandingLoaded(true);

    }
  };

  useEffect(async () => {
    setIsLoading(true);
    setErrMessage('')
    const isWorkSuspended = false //get only centers with no sus
    const validCentersOnly = true //centers have more than 180 to expire
    const licenseType='2'
    const isEligibleForFinal=true

    const res = await getCentersAPI({ isWorkSuspended, validCentersOnly,licenseType,isEligibleForFinal });
    if (!res.isSuccessful) {
      if (!formEdit) {
        if (!location?.state?.backValues) {
          setErrMessage(res?.message);
          setIsLoading(false);
        }
      }
    } else {
      setCenters(res?.responseBody?.data?.Centers);
      console.log('setCenters', centers);
    }
    if (!!vals && !requestNum) {
      setDataLoaded(true);
      setIsLoading(false);
    } else if (!!requestNum) {
      const getReqDetails = await getRequestDetails(requestNum);
      console.log('getReqDetails++++++++=======>', getReqDetails);

      if (!getReqDetails?.isSuccessful) {
        setIsLoading(false);
        setErrMessage(getReqDetails.message);
      } else {
        let details = getReqDetails?.responseBody?.requestDetails?.data;
        setTaskID(details?.externalTaskData?.ID)
        let data = {}
        if (details?.draft_values?.draft_values?.isDraft) {
          console.log("THISISHERE");
          data = details?.draft_values?.draft_values;
        } else if (location?.state?.formEdit) {
          console.log('processDump inside formatter 2222', formEdit);
          data = {
            ...details.center,
            ...formatGetCenterDetails(details),
            ...details?.processVariablesDump?.NewCenterLocationData,
            beneficiaryCount: details?.center?.centerInfo_r?.beneficiaryCount,

          }
          data.ID = data?.centerLicense_r?.LicenseNumber
          data.fireDepartmentLicenseExpiryDate = data?.fireDepartmentExpD
          data.engineeringPlan = data?.engineeringPlan
          data.fireDepartmentLicense = data?.fireDepartmentLicense
          data.momraDoc = data?.momraDoc
        }
        setVals((preVals) => {
          preVals = {
            ...preVals,
            ...data,
            isDraft: false
          }
          console.log("KHKHKHH ===> ", preVals)
          return preVals
        }
        )

        setIsLoading(false);
        setDataLoaded(true);
        setLandingLoaded(true);

      }
    } else {
      setIsLoading(false);
    }

  }, []);

  const handleClickOpen = async (values) => {
    //const res = await TransferRequirmentsCompletionLetterReq(true, MESSAGE_CODES.TRANSFER_CENTER_LOCATION_EMAIL);
    TransferCompletionLetterFun(values?.centerLicense_r?.LicenseNumber);//Add anthor API
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const TransferCompletionLetterFun = async (LicenseNumber) => {
    setIsLetterLoading(true)
    const response = await TransferRequirmentsCompletionLetterReq(false, MESSAGE_CODES.TRANSFER_CENTER_LOCATION_OTHER);
    if (!response?.isSuccessful) {
      setErrMessage(response?.message);
      setIsLetterLoading(false)
      return false;
    } else {
      const CompletionLetterData = response?.responseBody?.data[0]?.messageCode[0];
      setCompletionLetterData(CompletionLetterData)
      //setIsLetterLoading(false)
    }
    ////the new document
    const res = await formalLetterDoc(LicenseNumber);
    if (!res?.isSuccessful) {
      setErrMessage(res?.message);
      setIsLetterLoading(false)
      return false;
    } else {
      const letterDoc = res?.responseBody?.data[0]?.id;
      setFormalLetterDocument(letterDoc)
      setIsLetterLoading(false)
    }
  }

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader title="نقل مقر مركز أهلي" />
        <Divider />

        <CardContent>
          {!isLoading ? (
            <>
              <Form
                initialValues={{
                  ...vals,
                  lookupValues: lookupValues
                }}
                onSubmit={async (values) => {
                  setErrMessage('');
                  if (formDraft || formEdit) {
                    console.log('data onclick landing page:::', (values));
                    navigate('/center-services/transfercenterCont', {
                      state: {
                        centerData: {
                          ...values

                        },
                        requestNum: requestNum,
                        formDraft: formDraft,
                        formEdit: formEdit,
                        taskID: taskID
                      }
                    });
                  } else {
                    handleClickOpen(values);
                  }
                }}
                formDraft={formDraft}
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
                          label="رقم الترخيص النهائي"
                          name="ID"
                          component={Select}
                          required
                          dir="rtl"
                          variant="outlined"
                          className="custom-field"
                          disabled={formDraft || formEdit || !!location.state}
                          formControlProps={{ fullWidth: true }}
                        >
                          {formEdit || (location?.state?.formEdit === true && location.state?.lin === 1) ?
                            <MenuItem value={values.ID}>
                              {values.ID}
                            </MenuItem> :
                            centers?.map((item, idx) => (
                              <MenuItem key={item.idx} value={item.ID}>
                                {item.centerLicense_r?.LicenseNumber}
                              </MenuItem>
                            ))}
                        </Field>
                        <OnChange name="ID">
                          {() => {
                            setErrMessage('');
                            centerInfo(values);
                          }}
                        </OnChange>
                      </Grid>
                      {values?.centerType === '01' || values?.type === '01' ?
                        <FieldsCreator
                          schema={CenterTransferDetailsSchema}
                          formType="view"
                          values={values}
                          lookupObject={lookupValues}
                          isLoading={!dataLoaded}
                        />
                        :
                        <FieldsCreator
                          schema={CenterTransferDetailsSchema}
                          sectionNames={['CenterDetails']}
                          formType="view"
                          values={values}
                          lookupObject={lookupValues}
                          isLoading={!dataLoaded}
                        />
                      }
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
                          {console.log('location.state?.landingLoaded===? ', !!location.state?.landing)}

                          <Grid item>
                            <Button
                              startIcon={
                                submitting ? (
                                  <CircularProgress size="1rem" />
                                ) : null
                              }
                              disabled={!landingLoaded && !location.state?.landing}
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

      <TransferRequirmentsCompletionLetter
        dialogContent={
          <>
            {!isLetterLoading ?
              <div className="section-1 font-45Light">
                <p className="section-headline">
                  {completionLetter?.Content}
                </p>
              </div>
              : (
                <CircularProgress
                  size="5rem"
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: '#E2E8EB'
                  }}
                />
              )}
          </>
        }
        centerData={vals}
        formDraft={formDraft}
        formEdit={formEdit}
        dialogTitle={completionLetter?.subject}
        open={open}
        isLetterLoading={isLetterLoading}
        onClose={handleClose}
        acceptBtnName="التالي"
        actionBtnName="طباعة"
        requestNum={requestNum}
        DocId={formalLetterDocument}
        DocName={completionLetter?.attachment[0]?.name}
      />
    </Container>
  );
};

export default TransferCenterLocationLandingPage;
