
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
import AlertDialog from 'src/Core/Components/AlertDialog';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { CentertDetails, getCentersAPI } from '../../API/ServicesApi';
import TempFormSummary from '../../CancelInitialApproval/Sections/TempFormSummary'; //2
import { approvalNumValidate } from '../../CancelInitialApproval/Utils/CancelReasonUtils';
import { formatGetCenterDetails } from '../../TransferCenterOwnership/Utils/FormateJson';
import { CancelFinalLicenseFunc, hasDraftInFinalLicenseStage } from '../Api/cancelFinalLicenseApi';
import SelectedCenterSummary from '../sections/SelectedCenterSummary';

const CancelInitialApproval = () => {
    const location = useLocation()
    const lookupValues = useLookup()
    const refreshLookup = useUpdateLookup()
    const [finalLicenses, setFinalLicense] = useState([]);
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
    const [dialogContent, setDialogContent] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [openDraftAlert, setOpenDraftAlert] = useState(false);

    const { email, idNumIqamaNum, DOB, phoneNumber, firstName, secondName, lastName } = getCurrentUser();
    const navigate = useNavigate();
    const cancelReason = location?.state?.cancelReason
    const returnedrequest = location?.state?.returnedrequest
    const taskID = location?.state?.taskID
    const reqNumber = location?.state?.requestNum

    useEffect(async () => {
        console.log('test in cancel final license :::', reqNumber);
        if (location?.state?.licenseNumber) {
            await getCentertDetails(location?.state?.licenseNumber);
            return
        }
        lookupValues?.isEmpity && (refreshLookup())
        setIsLoading(true);
        const isWorkSuspended = false;
        const licenseType = '2';
        const isEligibleForFinal = true;
        const isExpired = false;

        if (!returnedrequest) { //no need to call this api when the request is returned cause we have the license
            const getCentersRs = await getCentersAPI({ isExpired, isWorkSuspended, licenseType, isEligibleForFinal });
            setErrMessage("");
            if (!getCentersRs.isSuccessful) {
                setErrMessage(getCentersRs.message);
                setIsLoading(false);
            } else {
                const { Centers } = getCentersRs.responseBody.data;
                setFinalLicense(Centers);
                setIsLoading(false);
            }
        }

    }, [])

    const getCentertDetails = async (licenseNumber) => {
        setIsLoading(true)
        setErrMessage("");
        const requestNum = await hasDraftInFinalLicenseStage(licenseNumber)
        if (!!requestNum) {
            setOpenDraftAlert(true)
        }
        const response = await CentertDetails(licenseNumber)
        console.log("===> getCentertDetails response: ", response.responseBody?.data)
        if (!response.isSuccessful) {
            setErrMessage(response.message);
        }
        else {
            const data = response.responseBody?.data
            setDetails([]);
            setDetails(details => {
                details = {
                    ...details,
                    address: {
                        ...data?.center?.centerLocation_r,
                        lng: data?.center?.centerLocation_r?.lng,
                        lat: data?.center?.centerLocation_r?.lat
                    },
                    commissioner_r: {
                        ...data?.centerOwner
                    },
                    ...formatGetCenterDetails(data)
                }
                console.log("details ", details)
                return details
            });
            console.log("details ::centers", response.responseBody.data.center)

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
        navigate('/app/dashboard', { replace: true });

    };
    const handleIsClose = () => {
        setErrMessage("");
        setIsOpen(false);
        navigate('/app/center-requests', { replace: true });
    };
    const onSubmit = async (values) => {
        setIsLoading(true)
        console.log('test in cancel final license ::: 222', reqNumber);

        setErrMessage("")
        setVal(values);
        const res = await CancelFinalLicenseFunc(values, returnedrequest, taskID, reqNumber)
        if (!res.isSuccessful) {
            console.log('sometheng went wrong vfcfsd 111111', res);
            setErrMessage(res?.message);
        } else {
            console.log('sometheng went wrong vfcfsd 22222', res);
            setDialogContent(res?.responseBody?.data?.message);
            setDialogTitle('')
            setOpen(true);
        }
        setIsLoading(false)
    }

    console.log('ssadfcbcfhfdghfhfggfhfghfghfghfghfghfghfgh', location?.state?.licenseNumber);
    return (
        <Container maxWidth="md">
            <Card>
                <CardHeader
                    title="طلب إلغاء ترخيص"
                />
                <Divider />
                {errMessage && (
                    <Alert variant="outlined" severity="error">
                        {errMessage}
                    </Alert>
                )}
                <AlertDialog
                    dialogTitle={''}
                    dialogContent={'يرجى العلم أنه عند إرسال طلب الإلغاء لهذا الترخيص, سيتم حذف جميع المسودات ذات الصلة. كما أنك لن تتمكن من أداء خدمات جديدة لهذا الترخيص طالما أن الطلب قيد المراجعة أو بمجرد أن يتم قبوله من الوكيل'}
                    onClose={() => setOpenDraftAlert(false)}
                    open={openDraftAlert}
                    acceptBtnName={'موافق'}
                >

                </AlertDialog>
                <CardContent>
                    {!isLoading ?
                        <>
                            <TempFormSummary
                                initialValues={{
                                    agree: [false],
                                    beneficiariesNum: 0,
                                    centerLicenceNumber: location?.state?.licenseNumber || center?.centerLicense_r?.LicenseNumber,
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
                                    cancelingReason: cancelReason,
                                    lookupValues: lookupValues,
                                    targetedBenificiray: center?.targetedBeneficiary,
                                    targetedServices: center?.targetedServices,
                                    centerType: center?.type,
                                    workingHours: center?.workingHours,
                                    ...details
                                }}
                                cancelBtnFn={() => { navigate('/app/center-services-list', { replace: true }); }}
                                isEnableCancelBtn={true}
                                isEnableNextBtn={isEnableNextBtn}
                                showSummary={showSummary}
                                returned={returnedrequest}
                                onSubmit={onSubmit}
                            >
                                <FinalFormFinalSummary
                                    finalLicenses={finalLicenses}
                                    validate={approvalNumValidate}

                                    setApprovalNum={setApprovalNum}
                                    selectedLicense={location?.state?.licenseNumber}
                                    showSummary={showSummary}
                                    setShowSummary={setShowSummary}
                                    returnedrequest={returnedrequest}
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
                <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم"
                />
            </Card>

        </Container>
    );
}

const FinalFormFinalSummary = ({ setField, finalLicenses, values, setApprovalNum, getCentertDetails, showSummary, setShowSummary, selectedLicense, returnedrequest }) => {
    return <>
        <Grid
            container
            mt={4}
            spacing={3}
        >
            <Grid
                item
                md={12}
                xs={12}
                className="custom-label-field"
            >
                <Field
                    fullWidth
                    label="رقم الترخيص"
                    name="centerLicenceNumber"
                    component={Select}
                    required
                    dir="rtl"
                    disabled={finalLicenses?.length === 0 || returnedrequest}
                    variant="outlined"
                    className="custom-field"
                    formControlProps={{ fullWidth: true }}
                >
                    <MenuItem value={selectedLicense} key={selectedLicense} selected={true}>{selectedLicense}</MenuItem>

                    {console.log("finalLicensesfinalLicenses", finalLicenses),
                        finalLicenses.map(item => (
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
                md={12}
                xs={12}
                className="custom-label-field"
            >
                {
                    showSummary && <SelectedCenterSummary
                        values={values}
                        setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
                    />
                }
            </Grid>

        </Grid>

    </>
}
export default CancelInitialApproval;
