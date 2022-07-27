import { Alert, Button, Card, CardContent, CardHeader, CircularProgress, Container, Divider, Grid, MenuItem } from "@material-ui/core";
import { Select } from 'final-form-material-ui';
import { useEffect, useState } from 'react';
import { Field, Form } from "react-final-form";
import { OnChange } from 'react-final-form-listeners';
import { useNavigate } from "react-router";
import AlertDialog from 'src/Core/Components/AlertDialog';
import { useLookup } from 'src/Core/Contexts/useLookup';
import FieldsCreator from "src/Core/SchemaBuilder/FieldsCreator";
import { getCurrentUser } from "src/Core/Utils/UserLocalStorage";
import { CentertDetails, getCentersAPI } from 'src/Modules/CenterServices/API/ServicesApi';
import { stateFeeBearingProgramAPI } from "../../StateFeeBearingProgram/API/StateFeeBearingProgramAPI";
import { formatGetCenterDetails } from "../../TransferCenterOwnership/Utils/FormateJson";
import CancelStateFeeBearingProgramSchema from "../Schema/CancelStateFeeBearingProgramSchema";
import { cancelStateFeeValidate } from "../Utils/StateFeeBearingProgramUtils";

const CancelStateFeeBearingProgramPage = () => {
    const navigate = useNavigate();
    const lookupValues = useLookup();
    const [isLoading, setIsLoading] = useState(true);
    const [errMessage, setErrMessage] = useState('');
    const [validCenters, setValidCenters] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [vals, setVals] = useState('');
    const [dialogContent, setDialogContent] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [open, setOpen] = useState(false);
    const { email } = getCurrentUser();


    useEffect(async () => {
        setErrMessage('');

        const getCenters = await getCentersAPI({ validCentersOnly: true, licenseType: '2', isEligibleForFinal: true, requestTypeIdsToSkip: [6],isExpired:false });
        if (!getCenters?.isSuccessful) {
            setIsLoading(false)
            setErrMessage(getCenters?.message)
        } else {
            const centers = getCenters?.responseBody?.data?.Centers;
            console.log('cancel State Page Centers:', centers);
            setValidCenters(centers?.filter(center => center?.type == '01' && center?.isStateFeeService == true))

            if (centers?.filter(center => center?.type == '01' && center?.isStateFeeService == true)?.length == 0) {
                setErrMessage('لايوجد مراكز مسجله في برنامج تحمل الدولة للرسوم')            
            }
            setIsLoading(false)
        }
    }, [])

    const centerInfo = async (values) => {

        console.log('cancel State Page center info valuess:', values);
        const licenseNumber = values?.licenseNumber;
        if (licenseNumber) {
            const response = await CentertDetails(licenseNumber)
            if (!response?.isSuccessful) {
                setErrMessage(response.message)
                setIsLoading(false)
                return false;
            }
            else {
                const data = response?.responseBody?.data;
                setVals((Vals) => {
                    Vals = {
                        ...formatGetCenterDetails(data),
                        licenseNumber: licenseNumber
                    };
                    return Vals;
                });
                setIsLoading(false);
                setDataLoaded(true);
            }
        }

    };
    const handleClickOpen = (dialogContent, dialogTitle) => {
        setDialogContent(dialogContent);
        setDialogTitle(dialogTitle)
        setOpen(true);
    };
    const onSubmit = async (values) => {
        setErrMessage("")
        setIsLoading(true)
        //////////////For the cancel request to be accepted.
        // if(true//from BackEnd){
        //     handleClickOpen('يجب أن يكون رفع طلب إلغاء الانضمام في البرنامج قبل ستين يوم من بداية الفصل التأهيلي')
        //     return;
        // }
        //  if(true//from BackEnd){
        //     handleClickOpen('لا يمكن إلغاء الانضمام لوجود حالات مسجلة ضمن برنامج تحمل الدولة للرسوم')
        //     return;
        // }
        const response = await stateFeeBearingProgramAPI(values, email, 2, false)
        if (!response?.isSuccessful) {
            setErrMessage(`${response?.message?.errorMessageAr || response?.message}`);
            setIsLoading(false)
            console.log('Error in Cancel State Fee onSubmit Wejdan:');
        }
        else {
            handleClickOpen(`${response?.responseBody?.data?.message}`)
        }

    }
    const handleClose = () => {
        setErrMessage("");
        setOpen(false);
        navigate('/app/dashboard', { replace: true });
    };
    return (
        <Container maxWidth="md">
            <Card>
                <CardHeader title="إلغاء طلب الانضمام إلى برنامج تحمل الدولة للرسوم" />
                <Divider />

                <CardContent>
                    {!isLoading ? (
                        <>
                            <Form
                                initialValues={{
                                    ...vals,
                                    lookupValues: lookupValues
                                }}
                                onSubmit={onSubmit}
                                mutators={{
                                    setValue: ([field, value], state, { changeValue }) => {
                                        changeValue(state, field, () => value)
                                    }
                                }}
                                validate={(values) => {
                                    return cancelStateFeeValidate({values})
                                }}
                                render={({ handleSubmit, values, submitting, form }) => (
                                    <form onSubmit={handleSubmit} >
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
                                                    dir="rtl"
                                                    variant="outlined"
                                                    disabled={validCenters?.length === 0}
                                                    className="custom-field"
                                                    formControlProps={{ fullWidth: true }}
                                                >
                                                    {console.log('Valid Center Map:', validCenters),
                                                        validCenters?.map((item, idx) => (
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
                                                        setIsLoading(true);
                                                        setErrMessage('');
                                                        centerInfo(values)
                                                    }}
                                                </OnChange>
                                            </Grid>
                                            {dataLoaded &&
                                                <Grid
                                                    container
                                                    mt={3}
                                                    mb={3}
                                                >
                                                    <FieldsCreator
                                                        schema={CancelStateFeeBearingProgramSchema}
                                                        setField={(fieldName, fieldValue) => form.mutators.setValue(fieldName, fieldValue)}
                                                        values={values}
                                                        lookupObject={lookupValues}
                                                    />

                                                </Grid>
                                            }

                                        </Grid>
                                        <br />
                                        <Divider />
                                        <br />

                                        <Grid
                                            container
                                            direction="row"
                                            spacing={90}

                                        >
                                            <Grid item
                                                justifyContent="flex-start">
                                                <Button
                                                    startIcon={
                                                        submitting ? (
                                                            <CircularProgress size="1rem" />
                                                        ) : null
                                                    }

                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    sx={{
                                                        backgroundColor: '#3c8084'
                                                    }}
                                                    onClick={() => { navigate('/app/center-services-list', { replace: true }); }}
                                                >
                                                    العوده
                                                </Button>
                                            </Grid>
                                            <Grid item
                                                justifyContent="end">

                                                <Button
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
                                                    ارسال
                                                </Button>
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
                <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />
            </Card>
        </Container>
    )
}

export default CancelStateFeeBearingProgramPage;