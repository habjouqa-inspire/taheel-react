/* eslint-disable */
import { Alert, AlertTitle, Card, CardContent, CardHeader, CircularProgress, Container, Divider } from "@material-ui/core";
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AlertDialog from "src/Core/Components/AlertDialog";
import FinalFromWizard from "src/Core/Components/wizard/FinalFormWizard";
import { useLookup, useUpdateLookup } from "src/Core/Contexts/useLookup";
import { getCurrentUser } from "src/Core/Utils/UserLocalStorage";
import { getRequestDetails } from "../../API/ServicesApi";
import { ConditionComp } from "../../FinalLicense/Utils/finalLicenseUtil";
import { getTermsAndCondtions, stateFeeBearingProgramAPI } from "../API/StateFeeBearingProgramAPI";
import AcceptanceRatio from "../Sections/AcceptanceRatio";
import ConfirmCenterInfo from "../Sections/ConfirmCenterInfo";
import HealthServices from "../Sections/HealthServices";
import StateFeeSummary from "../Sections/Summary";
import TransportationServices from "../Sections/TransportationServices";
import { acceptanceRatioValidation, healthServicesValidation, transportationServicesValidation } from "../Utils/StateFeeBearingProgramUtils";


const RegistrationInStateFeeBearingProgram = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const lookupValues = useLookup()
    const refreshLookup = useUpdateLookup()
    const [initValues, setInitValues] = useState({ ...location?.state?.centerData })
    const requestNum = location.state?.requestNum
    const isDraft = location.state?.formDraft
    const formDraft = location.state ? location.state.formDraft : false
    const [centerLicenseNumber, setCenterLicenseNumber] = useState(location?.state?.centerData?.centerLicenseNumber)
    const [isEnableNextBtn, setIsEnableNextBtn] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState('')
    const [dialogContent, setDialogContent] = useState("")
    const [dialogTitle, setDialogTitle] = useState("")
    const [termsAndConditions, setTermsAndCondtions] = useState('');
    const [open, setOpen] = useState(false);
    const dataLoaded = location?.state?.dataLoaded
    const { email } = getCurrentUser();


    useEffect(async () => {
        setIsLoading(true)

        console.log("malak==location", location);
        const condtionsAndTerms = await getTermsAndCondtions(centerLicenseNumber, email);
        if (!condtionsAndTerms.isSuccessful) {
            setTermsAndCondtions('لا يوجد إقرار وتعهد لهذه الخدمة')
            setIsLoading(false)
        } else {
            const tersmsCon = condtionsAndTerms?.responseBody?.data?.content
            console.log("state fee ==> condtionsAndTerms", tersmsCon)

            setTermsAndCondtions(tersmsCon)
            setInitValues({ ...initValues, termsAndConditions: tersmsCon })
            setIsLoading(false)
        }
        lookupValues?.isEmpity && (refreshLookup())
        if (requestNum && formDraft) {
            setIsLoading(true)
            setErrMessage("");
            console.log("malak reqnum", requestNum)
            const response = await getRequestDetails(requestNum)
            if (!response.isSuccessful) {
                setErrMessage(response.message)
                setIsLoading(false)
            } else {
                const details = response.responseBody.requestDetails?.data
                delete details?.draft_values?.draft_values?.isDraft
                setCenterLicenseNumber(details?.draft_values?.draft_values?.centerLicenseNumber)
                setInitValues({ ...details?.draft_values?.draft_values, requestNum: requestNum })
                setIsLoading(false)
            }
        }
    }, [])


    /////onSubmit

    const onSubmit = async (values) => {
        setErrMessage("")
        setIsLoading(true)
        let response = null

        console.log("state fee summary values", values);


        response = await stateFeeBearingProgramAPI(values, email, 1, values.isDraft)

        if (!response.isSuccessful) {
            console.log("nooooooooooooo")
            setErrMessage(`${response?.message?.errorMessageAr || response?.message}`);
            setIsLoading(false)
        }
        else {
            handleClickOpen(`${response?.responseBody?.data?.message}`);
        }


    };

    ////handle Back Btn

    const handleBackBtn = (values) => {
        delete values?.agree;
        console.log('values in state feee ', values)
        const urlToNavigate = '/center-services/stateFeeBearingProgram';
        navigate(urlToNavigate, {
            replace: true,
            state: { backValues: values, dataLoaded: dataLoaded }
        });
    };

    //////handle Click Open dialog

    const handleClickOpen = (dialogContent, dialogTitle) => {
        setDialogContent(dialogContent);
        setDialogTitle(dialogTitle)
        setOpen(true);
    };

    //////handle Close dialog

    const handleClose = (value) => {
        setOpen(false);
        navigate('/app/dashboard', { replace: true });
    };

    //////////////////////////////////////////////////////
    return (
        <Container maxWidth="md">
            <Card>

                <CardHeader
                    title="تسجيل المركز الأهلي في برنامج تحمل الدولة للرسوم"
                />
                {!isLoading && formDraft &&
                    <Alert icon={<DraftsTwoToneIcon sx={{ color: 'grey !important' }} />} variant="outlined" severity="info" sx={{ marginLeft: 2, marginRight: 2, marginTop: 1, color: 'grey !important', borderColor: 'grey !important' }}>
                        <AlertTitle> مسودة رقم {requestNum}</AlertTitle>
                    </Alert>
                }
                <Divider />
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
                                    {
                                        agree: [false],
                                        isNextBtnDisabled: false,
                                        termsAndConditions: termsAndConditions,
                                        lookupValues: lookupValues,
                                        requestNum: requestNum || initValues.requestNum,
                                        ...initValues
                                    }
                                }
                                isEnableNextBtn={isEnableNextBtn}
                                onSubmit={onSubmit}
                                firstBackBtnFunc={!isDraft && handleBackBtn}
                                cancelBtnFn={() => { navigate('/app/center-services-list', { replace: true }); }}
                                isEnableCancelBtn={!!centerLicenseNumber}
                                isEnableEndBtn={!centerLicenseNumber}
                                formDraft={formDraft}
                            >

                                <FinalFromWizardConfirmCenterInfoPage
                                    setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                                    label="تأكيد معلومات المركز"
                                />

                                {!initValues?.isHealthCareServices && <FinalFromWizardHealthServicesPage
                                    validate={(values) => healthServicesValidation(values)}
                                    label="الخدمات الصحية"
                                />
                                }


                                <FinalFromWizardTransportationServicesPage
                                    label="خدمة المواصلات"
                                    validate={(values) => transportationServicesValidation(values)}
                                    setErrMessage={(errMessage) => setErrMessage(errMessage)}
                                    setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                                    setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
                                />

                                <FinalFromWizardAcceptanceRatioPage
                                    label="نسبة قبول الطلاب التابعين لبرنامج تحمل الدولة للرسوم"
                                    validate={(values) => acceptanceRatioValidation(values)}
                                    setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                                />

                                <FinalFromWizardSummary
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
const FinalFromWizardConfirmCenterInfoPage = ({ values, setIsEnableNextBtn }) => (
    <>
        <ConfirmCenterInfo
            values={values}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}

        />
    </>
);
const FinalFromWizardHealthServicesPage = ({ setField, values }) => (
    <>
        <HealthServices
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
        />
    </>
);
const FinalFromWizardTransportationServicesPage = ({ setField, setIsEnableNextBtn, values }) => (
    <>
        <TransportationServices
            Condition={ConditionComp}
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}

        />
    </>
);
const FinalFromWizardAcceptanceRatioPage = ({ setField, setIsEnableNextBtn, values }) => (
    <>
        <AcceptanceRatio
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
            values={values}
        />
    </>
);

const FinalFromWizardSummary = ({ setField, values }) => (
    <>
        <StateFeeSummary
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
        />
    </>
)


export default RegistrationInStateFeeBearingProgram