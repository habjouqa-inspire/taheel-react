/* eslint-disable */
import {
    Alert,
    AlertTitle, Box,
    Card,
    CardContent,
    CardHeader, CircularProgress, Container, Divider
} from '@material-ui/core';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import FinalFromWizard from 'src/Core/Components/wizard/FinalFormWizard';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import { MESSAGE_CODES } from 'src/Core/Utils/MESSAGE_CODES';
import { dateFormatter, getDocId, reverseRange } from 'src/Core/Utils/TaheelUtils';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { requestOTPPhoneNum } from 'src/Modules/Account/API/AccountApi';
import { CentertDetails, getCentersAPI, getRequestDetails } from 'src/Modules/CenterServices/API/ServicesApi';
import { getMunicipalLicenseNoApi } from '../../FinalLicense/API/finalLicenseAPI';
import { calculationConditionComp, CenterDetailsOwnerValidation, getStaff } from '../../FinalLicense/Utils/finalLicenseUtil';
import { TransferRequirmentsCompletionLetterReq } from '../../TransferCenterLocation/API/TransferCenterLocationAPI';
import FinalLicenseData from '../../TransferCenterLocation/Sections/FinalLicenseData';
import { transferCenterOwnershipAPIFunc } from '../Api/TransferCenterOwnershipAPI';
import TransferOwnershipData from '../Sections/TransferOwnershipData';
import TransferOwnershipDialog from '../Sections/TransferOwnershipDialog';
import { TransferOwnershipDataValidation } from '../Utils/TransferCenterOwnershipUtil';

const TransferCenterOwnership = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const lookupValues = useLookup()
    const refreshLookup = useUpdateLookup()
    const [renewableLicenses, setRenewableLicenses] = useState([]);
    const [errMessage, setErrMessage] = useState('');
    const [dialogContent, setDialogContent] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isEnableNextBtn, setIsEnableNextBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwnership, setIsOwnership] = useState(true);
    const [details, setDetails] = useState({});
    const [centerLicenseNumber, setCenterLicenseNumber] = useState(location?.state?.licenseNumber);
    const requestNum = location.state?.requestNum;
    const formDraft = location.state?.formDraft
    const [showSummary, setShowSummary] = useState(false);
    const [center, setCenter] = useState({});
    const [formInits, setFormInits] = useState({});
    const [alertInfo, setAlertInfo] = useState();
    const { email, phoneNumber } = getCurrentUser();
    const [val, setVal] = useState([]);
    const [waiverTemplate, setWaiverTemplate] = useState();

    const [cardTitle, setCardTitle] = useState("نقل ملكية مركز أهلي");

    useEffect(async () => {
        setIsLoading(true);

        lookupValues?.isEmpity && (refreshLookup())
        setIsOwnership(true)
        lookupValues?.isEmpity && (refreshLookup())
        const getWaiverDoc = await TransferRequirmentsCompletionLetterReq('', MESSAGE_CODES.TRANSFER_CENTER_OWNERSHIP)
        if (getWaiverDoc.isSuccessful) {
            setWaiverTemplate(getWaiverDoc.responseBody?.data?.[0].messageCode?.[0]?.attachment?.[0].id)
            console.log('loggggg waiver ', getWaiverDoc.responseBody?.data?.[0].messageCode?.[0]?.attachment?.[0].id);

        } else {
            setErrMessage('هناك مشكلة في استرجاغ إقرار التنازل')
        }
        if (formDraft) {
            setRenewableLicenses([{ licenseNumber: centerLicenseNumber }]);
            //await getCentertDetails(centerLicenseNumber);

            setIsLoading(true);

            const getReqDetails = await getRequestDetails(requestNum)
            if (!getReqDetails.isSuccessful) {
                setErrMessage(getReqDetails.message)
            } else {
                let details = getReqDetails.responseBody.requestDetails.data
                setDetails(details);
                setCenter(details.center)
                setShowSummary(true);
                if (details.draft_values.isDraft) {
                    if (details.draft_values.draft_values.draftType === 'NewOwnership') {
                        navigate('/center-services/transNewOnership', { replace: true, state: { requestDetails: getReqDetails } });
                    }
                    setFormInits({
                        ...details?.draft_values?.draft_values,
                        isDraft: false,
                        ContractOfSale: getDocId(details?.draft_values?.draft_values?.ContractOfSale),
                        WaiverDeclaration: getDocId(details?.draft_values?.draft_values?.WaiverDeclaration),
                        // targetedBenificiray: Details?.center?.targetedBeneficiary,
                        // targetedServices: Details?.center?.targetedServices,
                        // centerType: Details?.center?.type
                    })
                }

                setIsEnableNextBtn(true)
                setIsLoading(false);
            }
        } else {

            setIsLoading(true);
            const centerTypes = process.env.REACT_APP_SHOW_FEATURES === 'true' ? [] : ['01', '02', '04']// temp filter for prd, show all except for child care (03)
            // const centerTypes=[]
            const isWorkSuspended = false
            const validCentersOnly = true
            const licenseType = '2'
            const isEligibleForFinal = true

            const getCentersRs = await getCentersAPI({ isWorkSuspended, validCentersOnly, centerTypes, isEligibleForFinal, licenseType });

            setErrMessage("");
            if (!getCentersRs.isSuccessful) {
                setErrMessage(getCentersRs.message);
                setIsLoading(false);
            } else {
                const Centers = getCentersRs.responseBody.data?.Centers?.map(c => { return { ...c, centerLicenseNumber: c.centerLicense_r.LicenseNumber } });
                setRenewableLicenses(Centers);
                setIsLoading(false);
            }
        }
        setCardTitle("نقل ملكية مركز أهلي (المالك الحالي)")

    }, [])

    const getCentertDetails = async (licenseNumber) => {
        setIsLoading(true)
        setErrMessage("");
        const response = await CentertDetails(licenseNumber)

        if (response.responseBody && response.responseBody.data && response.responseBody.data.center) {
            const attach = response.responseBody.data.center && response.responseBody.data.center.centerInfo_r && response.responseBody.data.center.centerInfo_r.operationPlan && response.responseBody.data.center.centerInfo_r.operationPlan.id;
            const crNum = response.responseBody.data.center.crInfo_r.crNumber;
            if (crNum != '') {
                const validateMomraRs = await getMunicipalLicenseNoApi(crNum)
                if (!validateMomraRs.isSuccessful) {
                    setErrMessage(validateMomraRs.message);
                    setDetails(response.responseBody.data);
                    setIsLoading(false);
                    setShowSummary(false);
                    return response.responseBody.data;
                }
            }
            else {
                setErrMessage("لا يوجد رقم تسجيل");
                setDetails(response.responseBody.data);
                setCenterLicenseNumber()
                setIsLoading(false);
                setShowSummary(false);
                return
            }
        }

        if (!response.isSuccessful) {
            setErrMessage(response.message);
        }
        else {
            setDetails(response.responseBody.data);
            setCenter(response.responseBody.data.center)
            setCenterLicenseNumber(licenseNumber)
            setIsLoading(false);
            setShowSummary(true);
            return response.responseBody.data;
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setIsLoading(false);
        setOpen(false);
    };

    const handleClickIsOpen = (dialogContent, dialogTitle) => {
        setDialogContent(dialogContent);
        setDialogTitle(dialogTitle)
        setIsOpen(true);
    };
    const handleIsClose = () => {
        setIsOpen(false);
        navigate('/app/center-requests', { replace: true });
    };
    const onSubmit = async (values) => {
        setIsLoading(true);
        setVal(values);

        if (!values.isDraft) {
            const smsOTPRequest = await requestOTPPhoneNum(phoneNumber);
            if (!smsOTPRequest.isSuccessful) {
                setErrMessage(smsOTPRequest.message);
                return { isSuccessful: false, message: smsOTPRequest.message };
            }
            handleClickOpen();

        } else {
            const transferCenterOwnershipRequest = await transferCenterOwnershipAPIFunc(values);

            if (!transferCenterOwnershipRequest.isSuccessful) {
                setErrMessage(transferCenterOwnershipRequest.message);
                return { isSuccessful: false, message: transferCenterOwnershipRequest.message };
            }

            if (values.isDraft && !!transferCenterOwnershipRequest?.responseBody?.data) {
                handleClickIsOpen(`${transferCenterOwnershipRequest.responseBody.data.message[0]} طلب رقم ${transferCenterOwnershipRequest.responseBody.data.requestNumber}`, '');
            }

            setIsLoading(false)
        }
    };

    return (
        <Container maxWidth="md">
            <Card>
                <CardHeader
                    title={cardTitle}
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
                                isNextBtnDisabled: false,
                                managersCount: 0,
                                waiverTemplate: waiverTemplate,
                                teachersCount: 0,
                                isDraft: false,
                                NewCRNumber: null,
                                disableBtn: false,
                                centerLicenseNumber: centerLicenseNumber,
                                temporaryLicenseNum: centerLicenseNumber,
                                licenseCreationDate: center && dateFormatter(center.centerLicense_r?.creationHijri),
                                licenseExpiryDate: center && dateFormatter(center.centerLicense_r?.expirationHijri),
                                ownerName: center && center.centerOwner_r?.ownerName,
                                ownerID: center && center.centerOwner_r?.ownerID,
                                centerAgeGroup: center && center.ageGroup && reverseRange(center.ageGroup),
                                centerGenderGroup: center
                                    && center.targetedGender &&
                                    (center.targetedGender === "m" ? "ذكور" : (center.targetedGender === "f" ? "إناث" : "ذكور و إناث")),
                                CRNumber: center && center.crInfo_r && center.crInfo_r.crNumber,
                                companyName: center && center.crInfo_r && center.crInfo_r.entityName,
                                newCapacity: center && center.centerInfo_r && numeral(center.centerInfo_r.carryingnumber).format('0,0'),
                                financialGuarantee: center && center.centerInfo_r && `${numeral(center.centerInfo_r.financialGuarantee).format('0,0.00')} ر.س.`,
                                beneficiariesNum: center && center.centerInfo_r && center.centerInfo_r.beneficiaryCount,
                                //getting the form initial values if exist
                                centerType: center.type === '01' ? 'الرعاية النهارية' : '_',
                                requestNum: requestNum,
                                city: center?.centerLocation_r?.city,
                                lng: center?.centerLocation_r?.lng,
                                lat: center?.centerLocation_r?.lat,
                                buildNo: center?.centerLocation_r?.buildNo,
                                street: center?.centerLocation_r?.street,
                                sub: center?.centerLocation_r?.area,
                                postalCode: center?.centerLocation_r?.postalCode,
                                additionalNo: center?.centerLocation_r?.additionalNo,
                                ContractOfSale: null,
                                WaiverDeclaration: null,
                                commissionerName: null,
                                BirthDateH: null,
                                natId: null,
                                comEmail: null,
                                mobile: null,
                                securityReport: center && center.centerInfo_r && [center.centerInfo_r.securityReport && (center.centerInfo_r.securityReport || center.centerInfo_r.securityReport.id)],
                                operationPlan: [center && center.centerInfo_r && center.centerInfo_r.operationPlan && (center.centerInfo_r.operationPlan || center.centerInfo_r.operationPlan.id)],
                                executivePlan: [center && center.centerInfo_r && center.centerInfo_r.executivePlan && (center.centerInfo_r.executivePlan || center.centerInfo_r.executivePlan.id)],
                                financialGuaranteeAtt: [center && center.centerInfo_r && center.centerInfo_r.financialGuarbteeAtt && (center.centerInfo_r.financialGuarbteeAtt || center.centerInfo_r.financialGuarbteeAtt.id)],
                                healthServices: center && center.centerInfo_r && center.isHealthCareServices ? "yes" : "no",
                                healthServiceType: center && center.centerInfo_r && center.healthCareServices_r && center.healthCareServices_r.type,
                                healthServiceAttachment: [center && center.centerInfo_r && center.healthCareServices_r && center.healthCareServices_r.attachment && (center.healthCareServices_r.attachment || center.healthCareServices_r.attachment.id)],
                                customers: details?.staff && getStaff(details?.staff),
                                targetedBenificiray: center?.targetedBeneficiary,
                                targetedServices: center?.targetedServices,
                                centerType: center?.type,
                                ...formInits,
                                lookupValues: lookupValues
                            }}
                            cancelBtnFn={() => { navigate('/app/center-services-list', { replace: true }); }}
                            isEnableEndBtn={true}
                            isEnableNextBtn={isEnableNextBtn}
                            showSummary={showSummary}
                            onSubmit={onSubmit}
                            requestNum={requestNum}
                            email={email}
                            formDraft={formDraft}
                            setAlertInfo={setAlertInfo}
                            alertInfo={alertInfo}

                        >
                            <FinalFromWizardLicenseDataPage
                                nextFun={async (values, setAlertInfo, alertInfo, next) => CenterDetailsOwnerValidation(values, setAlertInfo, alertInfo, next)}
                                label="بيانات المركز "
                                setAlertInfo={setAlertInfo}
                                renewableLicenses={renewableLicenses}
                                setCenterLicenseNumber={setCenterLicenseNumber}
                                showSummary={showSummary}
                                setShowSummary={setShowSummary}
                                getCentertDetails={getCentertDetails}
                                isOwnership={isOwnership}
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                            />
                            <FinalFromWizardOwnershipDataPage
                                label="معلومات نقل ملكية مركز "
                                validate={TransferOwnershipDataValidation}
                                isOwnership={isOwnership}
                                // setAgree={setAgree}
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
                <TransferOwnershipDialog val={val} dialogContent={dialogContent} open={open} setOpen={(open) => handleIsClose()} onClose={handleClose} />
                <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={isOpen} onClose={handleIsClose} acceptBtnName="تم" />
                <AlertDialog dialogContent={alertInfo?.dialogContent} open={alertInfo?.isOpen} buttons={alertInfo?.buttons} setAlertInfo={setAlertInfo} alertInfo={alertInfo} onClose={() => setAlertInfo({ ...alertInfo, isOpen: false })} />
            </Card>
        </Container>
    );
}
const FinalFromWizardLicenseDataPage = ({ setAlertInfo, isOwnership, formEdit, setIsEnableNextBtn, setCenterLicenseNumber, values, showSummary, isLoading, getCentertDetails, setShowSummary, renewableLicenses, setField, formDraft }) => (
    <Box>
        <FinalLicenseData
            values={values}
            setAlertInfo={setAlertInfo}
            formEdit={formEdit}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            renewableLicenses={renewableLicenses}
            setCenterLicenseNumber={setCenterLicenseNumber}
            showSummary={showSummary}
            setShowSummary={setShowSummary}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
            isLoading={isLoading}
            getCentertDetails={getCentertDetails}
            formDraft={formDraft}
            isOwnership={isOwnership}
        />
    </Box>

);
const FinalFromWizardOwnershipDataPage = ({ validate, setIsEnableNextBtn, values, isLoading, setField }) => (
    <Box>
        <TransferOwnershipData
            Condition={calculationConditionComp}
            validate={TransferOwnershipDataValidation}
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
            isLoading={isLoading}
        // setAgree={setAgree}
        />
    </Box>

);


export default TransferCenterOwnership;
