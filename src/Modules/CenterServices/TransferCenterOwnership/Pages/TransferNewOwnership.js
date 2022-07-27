/* eslint-disable */
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import {
    Alert,
    AlertTitle, Box,
    Card,
    CardContent,
    CardHeader, CircularProgress, Container, Divider
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AlertDialog from 'src/Core/Components/AlertDialog';
import FinalFromWizard from 'src/Core/Components/wizard/FinalFormWizard';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import { LICENSE_FORM_TYPES, OWNER_TYPE } from 'src/Core/Utils/enums';
import { dateFormatter, reverseRange } from 'src/Core/Utils/TaheelUtils';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { getRequestDetails } from '../../API/ServicesApi';
import CenterManagerInfo from '../../FinalLicense/Sections/CenterManagerInfo';
import Requirements from '../../FinalLicense/Sections/Requirements';
import PersonDetials from '../../FinalLicense/Sections/staff/PersonDetials';
import { calculationConditionComp, CenterMangerInfoValidation, MedicalPracticeComp, personsValidation, RequirementsValidation } from '../../FinalLicense/Utils/finalLicenseUtil';
import { getTermsAndCondtions } from '../../TemporaryLicense/API/temporayLicenseAPI';
import { ConditionComp } from '../../TemporaryLicense/Utils/temporayLicenseUtil';
import { transferCenterNewOwnershipAPIFunc } from '../Api/TransferCenterOwnershipAPI';
import CapacityForNewCenter from '../Sections/CapacityOfNewCenter';
import { CRNumberAndLicenses } from '../Sections/CRNumberAndLicenses';
import HealthServices from '../Sections/HealthServices';
import NewCenterAddress from '../Sections/NewCenterAddress';
import NewOwnerCenterDetails from '../Sections/NewOwnerCenterDetails';
import NewOwnerDetails from '../Sections/NewOwnerDetails';
import OtherAttachment from '../Sections/OtherAttachment';
import TransferNewOwnerSummary from '../Sections/TransferNewOwnerSummary';
import { formateGetRequestDetails, formatGetCenterDetails, getAddressFromObject } from '../Utils/FormateJson';
import { CRNumberAndLicensesValidation, healthServicesValidation, NewAddressValidation } from '../Utils/TransferCenterOwnershipUtil';

const TransferNewOwnership = () => {

    const location = useLocation();
    const lookupValues = useLookup()
    const refreshLookup = useUpdateLookup()
    const search = location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState('');
    const [dialogContent, setDialogContent] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [isEnableNextBtn, setIsEnableNextBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [editMode, setEditMode] = useState(location.state?.editMode);
    const requestNum = location.state?.requestNum || params.get('requestNum');
    const requestDetails = location.state?.requestDetails
    const editRequestData = location.state?.editRequestData
    const formDraft = location.state?.formDraft
    const [showSummary, setShowSummary] = useState(false);
    const formType = location.state ? location.state.formType : null;
    const [changeLocation, setChangeLocation] = useState(true);
    const [center, setCenter] = useState();
    const [TermsAndCondtions, setTermsAndCondtions] = useState('');
    const { DOB, gender, firstName, lastName, idNumIqamaNum, } = getCurrentUser();
    const [otpFlag, setOtpFlag] = useState();
    useEffect(async () => {

        setIsLoading(true);

        lookupValues?.isEmpity && (refreshLookup())
        setErrMessage("");
        if (!requestNum && !requestDetails) {
            setDialogContent('خطأ في البيانات')
            setOpen(true)
            setIsLoading(true)
            return false;
        }
        //!orderDetails && setOrderDetails(getOrderDetils(requestNum))

        setIsLoading(true);
        const getReqDetails = !!requestDetails ? requestDetails : await getRequestDetails(requestNum)
        if (!getReqDetails.isSuccessful) {
            setErrMessage(getReqDetails?.message?.error || getReqDetails?.message)
        } else {
            let details = getReqDetails.responseBody.requestDetails.data
            setOtpFlag(details?.processVariablesDump?.OTP);
            setDetails(details);
            setCenter(details.center)
            setShowSummary(true);
            console.log('details center data::', details?.center?.centerLicense_r?.LicenseType)

            const NewCenterLocationData = details.processVariablesDump.NewCenterLocationData
            const newCenterOwner = NewCenterLocationData?.centerOwner_r //shouldn't be called new!!
            const oldOwnerDetails = details.processVariablesDump.oldOwner
            const crCommissioner = details.processVariablesDump.crCommissioner
            const otherData = details.processVariablesDump.otherData
            const draft_values = details.draft_values?.draft_values

            let changeLocation = otherData?.LocationofOwnershipTransfer === 'SAME' ? false : true
            const termsAndcondtion = await getTermsAndCondtions(
                details?.center?.type, 5
            );
            if (!termsAndcondtion.isSuccessful) {
                const response = {
                    isSuccessful: false,
                    message: termsAndcondtion?.message
                };
            } else {
                const termsAndcondtionss =
                    termsAndcondtion;
                setTermsAndCondtions(termsAndcondtionss?.responseBody?.data?.pledgeContent);
            }
            setInitialValues(initvalues => {
                console.log('nooooooor momra licemse', NewCenterLocationData)
                if (details?.processVariablesDump?.returned === 'true') {
                    console.log('hllooo deaaar', {
                        ...formateGetRequestDetails(details),

                    });
                    initvalues = {
                        ...initvalues,
                        ...formateGetRequestDetails(details),
                        isAuth: true,
                        newCenterOwner: {
                            ...NewCenterLocationData.centerOwner_r
                        },
                        termsAndCondtions: termsAndcondtion?.responseBody?.data?.pledgeContent,
                        municipLicenseNo: NewCenterLocationData?.crInfo_r?.MoMRA_Licence,
                        otherDocuments: details?.processVariablesDump?.otherDocuments,
                        taskId: details?.externalTaskData?.ID,
                        ownerID: NewCenterLocationData?.ownerID,
                        ownerName: NewCenterLocationData?.ownerName,
                        ownerType: NewCenterLocationData?.ownerType,
                        oldOwnerName: oldOwnerDetails?.firstName + ' ' + oldOwnerDetails?.lastName,
                        commissionerName: crCommissioner?.name,
                        salesDoc: { id: otherData?.ContractOfSale },
                        waiverDoc: { id: otherData?.WaiverDeclaration },
                        changeLocation: changeLocation
                    }
                } else {
                    initvalues = {
                        ...initvalues,
                        ...NewCenterLocationData,
                        newCenterOwner: {
                            ...NewCenterLocationData.centerOwner_r
                        },
                        taskId: details?.externalTaskData?.ID,
                        ownerID: NewCenterLocationData?.ownerID,
                        ownerName: newCenterOwner?.ownerName,
                        ownerType: NewCenterLocationData?.ownerType,
                        oldOwnerName: oldOwnerDetails?.firstName + ' ' + oldOwnerDetails?.lastName,
                        commissionerName: crCommissioner?.name,
                        salesDoc: { id: otherData?.ContractOfSale },
                        waiverDoc: { id: otherData?.WaiverDeclaration },
                        changeLocation: changeLocation
                    }

                }

                if (!changeLocation) {
                    initvalues.basementArea = details.center?.centerInfo_r?.basementArea
                    initvalues.buildingArea = details.center?.centerInfo_r?.buildingArea
                    initvalues.capacity = details.center?.centerInfo_r?.carryingnumber
                    initvalues.beneficiariesNum = details.center?.centerInfo_r?.beneficiaryCount
                }
                if (details?.center?.targetedBeneficiary === '11') {
                    initvalues.fullName = `${firstName} ${lastName}`
                    initvalues.gender = gender === 'm' ? "ذكور" : "انثى"
                    initvalues.birthDate = DOB
                    initvalues.idNumber = idNumIqamaNum
                }
                if (details.draft_values?.isDraft) {
                    initvalues = {
                        ...initialValues,
                        ...draft_values,
                        address: getAddressFromObject({ ...draft_values, centerLocation_r: {} }),
                        requestNum: requestNum,
                        formDraft: true,
                        isDraft: false,
                        isAuth: true,
                    }
                    changeLocation = details.draft_values?.draft_values?.changeLocation
                    setChangeLocation(changeLocation)
                } else if (!!editRequestData) {
                    initvalues = {
                        ...editRequestData,
                        ...initialValues,
                        newCenterOwner: {
                            ...NewCenterLocationData.centerOwner_r
                        },
                        ...formatGetCenterDetails(details),

                    }
                }
                if (!changeLocation) {
                    initvalues.basementArea = details.center?.centerInfo_r?.basementArea
                    initvalues.buildingArea = details.center?.centerInfo_r?.buildingArea
                    initvalues.capacity = details.center?.centerInfo_r?.carryingnumber
                    initvalues.beneficiariesNum = details.center?.centerInfo_r?.beneficiaryCount
                }
                if (details?.center?.targetedBeneficiary === '11') {
                    initvalues.fullName = `${firstName} ${lastName}`
                    initvalues.gender = gender === 'm' ? "ذكور" : "انثى"
                    initvalues.birthDate = DOB
                    initvalues.idNumber = idNumIqamaNum
                }
                if (details.request.status === 13) { initvalues.isAuth = true }
                return initvalues
            })
            setChangeLocation(changeLocation)
            setIsLoading(false)
        }

    }, [])

    const handleClickOpen = (dialogContent, dialogTitle) => {
        setDialogContent(dialogContent);
        setDialogTitle(dialogTitle)
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        navigate('/app/center-requests', { replace: true });
    };

    const onSubmit = async (values) => {
        const response = await transferCenterNewOwnershipAPIFunc(values, requestNum);
        if (response.isSuccessful) {
            if (values.isDraft && !!response?.responseBody?.data) {
                handleClickOpen(`${response.responseBody.data.message[0]} `);
            } else {
                handleClickOpen(`${response.responseBody.data.message}`, '');
            }
        }

        return {
            isSuccessful: response?.isSuccessful, message: response?.message?.error || response?.message
        }
    };

    return (
        <Container maxWidth="md">
            <Card>
                <CardHeader
                    title="نقل ملكية مركز أهلي (المالك الجديد)"
                />
                <Divider />
                {!isLoading && formDraft &&
                    <Alert icon={<DraftsTwoToneIcon sx={{ color: 'grey !important' }} />} variant="outlined" severity="info" sx={{ marginLeft: 2, marginRight: 2, marginTop: 1, color: 'grey !important', borderColor: 'grey !important' }}>
                        <AlertTitle> مسودة رقم {requestNum}</AlertTitle>
                        {details?.request && details.request?.comment}
                    </Alert>
                }
                {errMessage && (
                    <Alert variant="outlined" severity="error">
                        {errMessage}
                    </Alert>
                )}

                <CardContent>

                    {!isLoading ?
                        <FinalFromWizard
                            initialValues={{
                                agree: [false],
                                lastPageErrorHandling: true,
                                isNextBtnDisabled: false,
                                fireDepartmentExpD: {},
                                managersCount: 0,
                                teachersCount: 0,
                                otpFlag: otpFlag,
                                centerLicenseNumber: center && center.centerLicense_r.LicenseNumber,
                                centerLicenseNumber: center && center.centerLicense_r.LicenseNumber,
                                centerAgeGroup: center && center.ageGroup && reverseRange(center.ageGroup),
                                healthServices: center && center.centerInfo_r && center.isHealthCareServices ? "yes" : "no",
                                termsAndCondtions: TermsAndCondtions,
                                centerGenderGroup: center
                                    && center.targetedGender &&
                                    (center.targetedGender === "m" ? "ذكور" : (center.targetedGender === "f" ? "إناث" : "ذكور و إناث")),
                                oldCenterDetails: center && center.crInfo_r && {
                                    CRNumber: center.crInfo_r.crNumber,
                                    companyName: center.crInfo_r.entityName,
                                    activities: center.crInfo_r.crActivityType,
                                    municipLicenseNo: center.crInfo_r.MoMRA_Licence,
                                    city: center?.centerLocation_r?.city || center?.city,
                                    buildNo: center?.centerLocation_r?.buildNo || center?.buildNo,
                                    street: center?.centerLocation_r?.street || center?.street,
                                    sub: center?.centerLocation_r?.area || center?.area,

                                    postalCode: center?.centerLocation_r?.postalCode || center?.postalCode,
                                    additionalNo: center?.centerLocation_r?.additionalNo || center?.additionalNo,
                                    address: getAddressFromObject(center),

                                    licenseExpiryDate: center && dateFormatter(center.centerLicense_r?.expirationHijri),
                                    licenseCreationDate: center && dateFormatter(center.centerLicense_r?.creationHijri),
                                    centerLicenseNumber: center.centerLicense_r.LicenseNumber,
                                    targetedBenificiray: center?.targetedBeneficiary,
                                    targetedServices: center?.targetedServices,
                                    includeOwnerQulfic: (initialValues?.newCenterOwner?.ownerType === OWNER_TYPE.NATURAL_TYPE && (center.type === "05" || center.type === "03" || center.centerType === "05" || center.centerType === "03")),
                                    centerType: center?.type,
                                },
                                targetedBenificiray: center?.targetedBeneficiary,
                                targetedServices: center?.targetedServices,
                                centerType: center?.type,
                                crInfo_r: center?.crInfo_r,
                                requestNum: requestNum,
                                requestDate: !!details?.request && details.request?.requestDate,
                                isDraft: false,
                                includeOwnerQulfic: (initialValues?.newCenterOwner?.ownerType === OWNER_TYPE.NATURAL_TYPE && (center.type === "05" || center.type === "03" || center.centerType === "05" || center.centerType === "03")),
                                inHouseHspit: (center.type === "08" || center.centerType === "08") && center.targetedBeneficiary === "11",
                                page: formType === LICENSE_FORM_TYPES.RENEW ? 1 : 0,
                                lookupValues: lookupValues,
                                formType: formType,
                                ...initialValues,
                                ...center,
                            }}
                            cancelBtnFn={() => { navigate('/app/center-services-list', { replace: true }); }}
                            isEnableCancelBtn={true}
                            isEnableNextBtn={isEnableNextBtn}
                            showSummary={showSummary}
                            onSubmit={onSubmit}
                            formDraft={formDraft}
                        >
                            <FinalFromWizarCenterDetailsPage
                                label="بيانات الطلب "
                                setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                            />

                            {/* {center?.type === '01' && <FinalFromWizarNewOwnerDetailsPage
                                label="بيانات المالك الحالي للمركز "
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                            />} */}
                            <FinalFromWizardCRNumberAndLicensesPage
                                editMode={editMode}
                                setErrMessage={(errMessage) => setErrMessage(errMessage)}
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                                label="معلومات المركز"
                                validate={(values) => CRNumberAndLicensesValidation(values)}
                                formDraft={formDraft} />
                            {changeLocation && (
                                <FinalFromWizardAddressPage
                                    label="عنوان المركز الجديد"
                                    validate={(values) => NewAddressValidation(values)}
                                    setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                                    setErrMessage={(errMessage) => setErrMessage(errMessage)}
                                    setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
                                />
                            )
                            }

                            {center?.type !== '01' && <FinalFromWizardRequirements
                                validate={(values) => RequirementsValidation(values)}
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                                setErrMessage={(errMessage) => setErrMessage(errMessage)}
                                label={'المتطلبات'}
                            />
                            }

                            {center?.type === '01' && <FinalFromWizardCapacityOfNewCenterPage
                                label="الطاقة الاستيعابية"
                                validate={CRNumberAndLicensesValidation}
                                showSummary={showSummary}
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                                changeLocation={changeLocation}
                                formDraft={formDraft}
                            />
                            }

                            {center?.type === '01' && <FinalFromWizardHealthServices
                                validate={(values) => healthServicesValidation(values)}
                                label="الخدمات الصحية"
                                editMode={editMode} />}

                            {center.type === '01' ?
                                <FinalFromWizardPersonsPage
                                    nextFun={(values) => personsValidation(values)}
                                    label="معلومات الكوادر"
                                    editMode={editMode} />
                                : <FinalFromWizardCenterManagerInfo
                                    label={center?.type === "08" && center?.targetedBeneficiary === "11" ? "بيانات مالكة المركز (مقر الضيافة المنزلية)" : "بيانات مدير/ة المركز"}
                                    editMode={editMode}
                                    setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                                    validate={(values) => CenterMangerInfoValidation(values)}
                                    setErrMessage={(errMessage) => setErrMessage(errMessage)}
                                />}

                            <FinalFromWizardOtherAttachments
                                label="ملفات أخرى"
                                setErrMessage={(errMessage) => setErrMessage(errMessage)}
                                editMode={editMode}
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)} />

                            <FinalFromWizarTermsPage label="ملخص"
                                setErrMessage={(errMessage) => setErrMessage(errMessage)}
                                editMode={editMode}
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                            />

                        </FinalFromWizard>
                        :
                        <CircularProgress size="15rem" style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto', color: '#E2E8EB'
                        }} />
                    }
                </CardContent>
            </Card>
            <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} onClose={handleClose} open={open} acceptBtnName="تم" />
        </Container >
    );
}

const FinalFromWizarCenterDetailsPage = ({ validate, setIsEnableNextBtn, values, setField }) => (
    <Box>
        <NewOwnerCenterDetails
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
        />
    </Box>

);
const FinalFromWizarNewOwnerDetailsPage = ({ values, validate, setField, setIsEnableNextBtn }) => (
    <Box>
        <NewOwnerDetails
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
        />
    </Box>
);
const FinalFromWizardRequirements = ({ setField, setErrMessage, temporaryLicenses, values, setIsEnableNextBtn }) => (
    <>
        <Requirements
            Condition={ConditionComp}
            values={values}
            setErrMessage={(errMessage) => setErrMessage(errMessage)}
            temporaryLicenses={temporaryLicenses}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
        />
    </>
)
const FinalFromWizardCRNumberAndLicensesPage = ({
    setField,
    validate,
    setErrMessage,
    editMode,
    setEditMode,
    values,
    centerLicenseNumber,
    setIsEnableNextBtn,
    formDraft }) => (
    <>
        <CRNumberAndLicenses
            Condition={calculationConditionComp}
            values={values}
            setErrMessage={(errMessage) => setErrMessage(errMessage)}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            editMode={editMode}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
            setEditMode={setEditMode}
            formDraft={formDraft}
        />
    </>
);

const FinalFromWizardCapacityOfNewCenterPage = ({ validate, changeLocation, formEdit, setIsEnableNextBtn, setCenterLicenseNumber, values, showSummary, isLoading, getCentertDetails, setShowSummary, renewableLicenses, setField, formDraft }) => (
    <Box>
        <CapacityForNewCenter
            values={values}
            formEdit={formEdit}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
            isLoading={isLoading}
            changeLocation={changeLocation}
            formDraft={formDraft}
        />
    </Box>

);

const FinalFromWizardAddressPage = ({ validate, setField, values, setIsEnableNextBtn, setErrMessage }) => (
    <Box>
        <NewCenterAddress
            values={values}
            Condition={ConditionComp}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
            setErrMessage={(errMessage) => setErrMessage(errMessage)}
        />
    </Box>
);

const FinalFromWizardHealthServices = ({ editMode, setField, temporaryLicenses, values }) => (
    <>
        <HealthServices
            Condition={ConditionComp}
            values={values}
            temporaryLicenses={temporaryLicenses}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            editMode={editMode}
        />
    </>
);
const FinalFromWizardPersonsPage = ({ editMode, label, validate, setField, pop, push, values }) => (
    <>
        <PersonDetials
            MedicalPracticeCondition={MedicalPracticeComp}
            Condition={ConditionComp}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            pop={pop}
            push={push}
            values={values}
            editMode={editMode}
        />
    </>
);
const FinalFromWizardOtherAttachments = ({ editMode, label, validate, setField, pop, push, values, setErrMessage, setIsEnableNextBtn }) => (
    <>
        <OtherAttachment
            setErrMessage={(errMessage) => setErrMessage(errMessage)}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
            editMode={editMode}
            values={values}
        />
    </>
);
const FinalFromWizardCenterManagerInfo = ({ editMode, setField, values, setIsEnableNextBtn, setErrMessage }) => (
    <>
        <CenterManagerInfo
            Condition={calculationConditionComp}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
            setErrMessage={(errMessage) => setErrMessage(errMessage)}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            values={values}
            editMode={editMode}
        />
    </>
);
const FinalFromWizarTermsPage = ({ values, setField }) => (
    <Box>
        <TransferNewOwnerSummary
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
        />
    </Box>
);

export default TransferNewOwnership;