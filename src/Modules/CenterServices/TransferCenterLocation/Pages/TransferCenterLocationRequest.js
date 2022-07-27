/* eslint-disable */
import {
    Alert,
    AlertTitle, Box,
    Card,
    CardContent,
    CardHeader, CircularProgress, Container, Divider
} from '@material-ui/core';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import FinalFromWizard from 'src/Core/Components/wizard/FinalFormWizard';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import { LICENSE_FORM_TYPES } from 'src/Core/Utils/enums';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { getTermsAndCondtions } from '../../TemporaryLicense/API/temporayLicenseAPI';
import { ConditionComp } from '../../TemporaryLicense/Utils/temporayLicenseUtil';
import { centerLocationTransferAPIFunc } from '../API/TransferCenterLocationAPI';
import { CenterLocationSummary } from '../Sections/CenterLocationSummary';
import NewAttachement from '../Sections/NewAttachement';
import NewCenterAddress from '../Sections/NewCenterAddress';
import NewLocationData from '../Sections/NewLocationData';
import { AttachementValidation, CapacityDataValidation, NewAddressValidation } from '../Utils/TransferCenterLoactionUtil';

const TransferCenterLocationRequest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const lookupValues = useLookup();
    const refreshLookup = useUpdateLookup();
    const [renewableLicenses, setRenewableLicenses] = useState([]);
    const [errMessage, setErrMessage] = useState('');
    const [dialogContent, setDialogContent] = useState("");
    const [dialogTitle, setDialogTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [isEnableNextBtn, setIsEnableNextBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editInitValues, setEditInitValues] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [draftValues, setDraftValues] = useState({})
    const [termsAndConditions, setTermsAndCondtions] = useState('');

    const [initValues, setInitValues] = useState(location?.state?.centerData);
    const [centerLicenseNumber, setCenterLicenseNumber] = useState(location.state ? location.state.licenseNumber : "1");
    const [centersForDisabilities, setCentersForDisabilities] = useState(initValues?.type === "01")
    const [licNumber, setLicNumber] = useState(initValues?.ID)

    const requestNum = location.state?.requestNum;
    const taskID = location.state?.taskID;
    const formEdit = location.state?.formEdit
    const formDraft = location.state?.formDraft
    const [showSummary, setShowSummary] = useState(false);
    const formType = location.state ? location.state.formType : null;
    const [center, setCenter] = useState({});
    const [formInits, setFormInits] = useState({});
    const { email } = getCurrentUser();
    const [title, setTitle] = useState("نقل مقر مركز أهلي");
    console.log('location.state======>', initValues);
    useEffect(async () => {
    console.log('location.state======>', initValues);

        const termsAndcondtion = await getTermsAndCondtions(
            initValues?.type, 4
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
        lookupValues?.isEmpity && (refreshLookup())
        setErrMessage("");
        setIsLoading(true);
        console.log('initValues=???', initValues);
        if (!!initValues) {
            console.log('initValues', initValues)

            if (initValues.type === "01") {
                setTitle("  نقل مقر مركز أهلي - مراكز ذوي الإعاقة")
            }
            if (initValues.type === "08") {
                setTitle(" نقل مقر مركز أهلي - مراكز ضيافة الأطفال")
            }
            if (initValues.type === "05") {
                setTitle(" نقل مقر مركز أهلي - مراكز الإرشاد الأسري")
            }
            if (initValues.type === "03") {
                setTitle(" نقل مقر مركز أهلي -  مراكز كبار السن ")
            }

        }
        setIsLoading(false);

    }, [])

    const handleBackBtn = (values) => {
        delete values.agree;
        console.log('values in final license ', values)
        delete values.isDraft;
        const urlToNavigate = '/center-services/transfercenter';
        navigate(urlToNavigate, {
            replace: true,
            state: { backValues: values, landing: true, formEdit: formEdit, lin: formEdit ? 1 : 2 }
        });
    };
    const handleClickOpen = (dialogContent, dialogTitle) => {
        setDialogContent(dialogContent);
        setDialogTitle(dialogTitle)
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        navigate('/app/dashboard', { replace: true });
    };

    const onSubmit = async (values) => {

        const response = await centerLocationTransferAPIFunc(values, requestNum, licNumber, formEdit, centersForDisabilities, taskID);
        if (response.isSuccessful) {
            if (values.isDraft && !!response?.responseBody?.data) {
                handleClickOpen(`${response.responseBody.data.message[0]}`, '');
            }
            else {
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
                    title={title}
                />
                <Divider />
                {/* {!isLoading && !formDraft && formEdit &&
                    <Alert variant="outlined" severity="warning" sx={{ marginLeft: 2, marginRight: 2, marginTop: 1 }}>
                        <AlertTitle> يرجى مراجعة طلب رقم {requestNum}</AlertTitle>
                        {editInitValues.request && editInitValues.request?.comment}
                    </Alert>
                } */}
                {!isLoading && formDraft &&
                    <Alert icon={<DraftsTwoToneIcon sx={{ color: 'grey !important' }} />} variant="outlined" severity="info" sx={{ marginLeft: 2, marginRight: 2, marginTop: 1, color: 'grey !important', borderColor: 'grey !important' }}>
                        <AlertTitle> مسودة رقم {requestNum}</AlertTitle>
                        {editInitValues?.request && editInitValues.request?.comment}
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
                            initialValues={
                                !formEdit && !formDraft ? {
                                    agree: [false],
                                    ...initValues,
                                    isNextBtnDisabled: false,
                                    lastPageErrorHandling: true,
                                    centerType: center && center.type,
                                    centerLicenseNumber: center?.centerLicense_r?.LicenseNumber,
                                    engineeringPlan: center && center.engineeringPlan,
                                    // crNumber: center && center?.crInfo_r?.crNumber,
                                    fireDepartmentLicense: center && center.fireDepartmentLicense,
                                    momraDoc: center && center.momraDoc,
                                    fireDepartmentLicenseExpiryDate: center && center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri,
                                    //getting the form initial values if exist
                                    ...formInits,
                                    requestNum: requestNum,
                                    isDraft: false,
                                    page: formType === LICENSE_FORM_TYPES.RENEW ? 1 : 0,
                                    formType: formType,    
                                    termsAndConditions:termsAndConditions,
                                }
                                    : {
                                        agree: [false],
                                        isNextBtnDisabled: false,
                                        managersCount: 0,
                                        teachersCount: 0,
                                        lastPageErrorHandling: true,
                                        lookupValues: lookupValues,
                                        requestNum: requestNum || initValues.requestNum,
                                        // ...draftValues,
                                        ...initValues,
                                    termsAndConditions:termsAndConditions,

                                    }}
                            cancelBtnFn={() => { navigate('/app/center-services-list', { replace: true }); }}
                            // isEnableCancelBtn={centerLicenseNumber === '1'}
                            isEnableCancelBtn={true}
                            firstBackBtnFunc={formType != LICENSE_FORM_TYPES.EDIT && handleBackBtn}
                            // isEnableEndBtn={centerLicenseNumber !== '1'}
                            formDraft={formDraft}
                            isEnableEndBtn={false}
                            isEnableNextBtn={isEnableNextBtn}
                            requestNum={requestNum}
                            email={email}
                            showSummary={showSummary}
                            onSubmit={onSubmit}
                        >


                            <FinalFromWizardAddressPage
                                label="عنوان المركز"
                                validate={(values) => NewAddressValidation(values)}
                                setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                                setErrMessage={(errMessage) => setErrMessage(errMessage)}
                                setField={(fieldName, fieldValue) =>
                                    setField(fieldName, fieldValue)}

                            />
                            {centersForDisabilities &&
                                <FinalFromWizardCapacityPage
                                    label="الطاقة الاستيعابية والضمان المالي"
                                    validate={(values) => CapacityDataValidation(values)}
                                    //editMode={editMode}
                                    setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                                />}
                            {!centersForDisabilities &&
                                <FinalFromWizarNewAttachementPage
                                    label="المتطلبات"
                                    validate={(values) => AttachementValidation(values)}
                                    setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
                                />}

                            < FinalFromWizardSummary
                                centersForDisabilities={centersForDisabilities}

                                label="الملخص"
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
            <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="تم" />

        </Container>
    );
}

const FinalFromWizarNewAttachementPage = ({ values, validate, setField, setIsEnableNextBtn }) => (
    <Box>
        <NewAttachement
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
        />
    </Box>
);
const FinalFromWizardCapacityPage = ({ editMode, values, setField, setIsEnableNextBtn }) => (
    <>
        <NewLocationData
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
        //editMode={editMode}
        />
    </>
);
const FinalFromWizardAddressPage = ({ validate, values, setField, setIsEnableNextBtn, setErrMessage }) => (
    <Box>
        <NewCenterAddress
            Condition={ConditionComp}
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
            setErrMessage={(errMessage) => setErrMessage(errMessage)}
        />
    </Box>
);

const FinalFromWizardSummary = ({ setField, values, centersForDisabilities }) => (
    <>
        <CenterLocationSummary
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            centersForDisabilities={centersForDisabilities}


        />
    </>
);

export default TransferCenterLocationRequest;

