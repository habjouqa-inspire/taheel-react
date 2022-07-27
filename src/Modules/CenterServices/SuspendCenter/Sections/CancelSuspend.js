import { CircularProgress, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AlertDialog from "src/Core/Components/AlertDialog";
import ConfirmationDialog from "src/Core/Components/ConfirmationDialog";
import { useLookup } from "src/Core/Contexts/useLookup";
import PageViewer from "src/Core/SchemaBuilder/PageViewer";
import { CentertDetails, getTaheelRequestsFun } from "../../API/ServicesApi";
import { formatGetCenterDetails } from "../../TransferCenterOwnership/Utils/FormateJson";
import { cancelWorkSuspensionRequest } from "../API/susCentersApis";
import SuspendRequestSummarySchema from "../schema/SuspendRequestSummarySchema";

const SuspendRequestSummary = () => {
    const location = useLocation();
    const lookupValues = useLookup();
    const [errMessage, setErrMessage] = useState();
    const { LicenseNumber } = location?.state; //reqNum returned from suspense request table
    const [reqDetails, setReqDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);
    const [AlertContent, setAlertContent] = useState('');
    const [laodingBtn, setLoadingBtn] = useState(false);
    const [disableBTN, setDisableBTN] = useState(false);


    const navigate = useNavigate()

    useEffect(async () => {
        const res = await CentertDetails(LicenseNumber);
        if (!res.isSuccessful) {
            setLoading(false)
            setErrMessage(res?.message?.error || res?.message)
            return { isSuccessful: false, message: res?.message?.error || res?.message }
        }

        setReqDetails(
            {
                ...formatGetCenterDetails(res.responseBody?.data),
                ...res.responseBody?.requestDetails?.data.request,
                workSus: {
                    ...res?.responseBody?.data?.center?.WorkSuspension_r
                }
            }
        )
        
            const pendingRequests = await getTaheelRequestsFun({
                licenseNumber: LicenseNumber,
                requestTypeId: [15, 16],
                status: [1]
            })
            const totalPendingRequests = pendingRequests?.responseBody?.data?.totalCount;
            if (totalPendingRequests !== 0) {
                setErrMessage('عذراً لايمكن تنفيذ الخدمة, حيث تشير سجلاتنا الى وجود طلبات تحت الإجراء');
                setDisableBTN(true)
            }




        setLoading(false)
    }, [])
    const cancelSusCenter = async (v) => {
        setLoadingBtn(true);
        const res = await cancelWorkSuspensionRequest(v);
        if (!res.isSuccessful) {
            setIsOpen(false)
            setLoadingBtn(false);
            console.log('res?.responseBody?.message?.errorMessageAr',res.message?.errorMessageAr||res.message);
            SetErrMessage(res.message?.errorMessageAr||res.message);
            return { isSuccessful: res.isSuccessful, message: res.message?.errorMessageAr||res.message }
        }
        setAlertContent(res?.responseBody?.data?.message);
        setOpenAlert(true);
        setLoadingBtn(false);
       

        return {};
    }
    const submitBtn = {
        btnName: "استئناف العمل",
        handleClick: () => {
            setIsOpen(true)
            //api
        },
        disabled:disableBTN
    }
    const canelBtn = {
        btnName: "إنهاء الطلب",
        handleClick: () => {
            setIsOpen2(true)
            // setIsOpen(false)
            // navigate('/center-services/suspendlandingpage')
        }
    }
    return (<>

        <AlertDialog
            dialogContent={AlertContent}
            dialogTitle=""
            open={openAlert}
            onClose={() => navigate("/center-services/suspendlandingpage")}
            acceptBtnName="تم"
        />
        <ConfirmationDialog
            cancelBtnName={'إلغاء'}
            acceptBtnName={"نعم"}
            open={isOpen}
            loadingDraft={laodingBtn}
            isLoading={laodingBtn}
            dialogContent="هل انت متأكد أنك تريد استئناف العمل؟"
            dialogTitle=""
            onBackdropClick={()=>{return}}
            onEscapeKeyDown={() => {setIsOpen(false)}}
            onAcceptFn={() => cancelSusCenter(reqDetails)}
            onCloseFn={() => { setIsOpen(false) }}

        ></ConfirmationDialog>

        <ConfirmationDialog
            cancelBtnName={'إلغاء'}
            acceptBtnName={"نعم"}
            open={isOpen2}
            loadingDraft={laodingBtn}
            isLoading={laodingBtn}
            dialogContent="هل انت متأكد أنك تريد إنهاء الطلب؟"
            dialogTitle=""
            onBackdropClick={()=>{return}}
            onEscapeKeyDown={() => {setIsOpen2(false)}}
            onAcceptFn={() => navigate('/center-services/suspendlandingpage')}
            onCloseFn={() => { setIsOpen2(false) }}

        ></ConfirmationDialog>

        {!loading ?
            <Grid container>
                {console.log('SusRequestSummary::formated values', reqDetails)}
                <PageViewer
                    lookupObject={lookupValues}
                    title={'طلب إلغاء تعليق العمل'}
                    errMessage={errMessage}
                    data={{...reqDetails,isCanceled:true}}
                    schema={SuspendRequestSummarySchema}
                    formType="view"
                    submitBtn={submitBtn}
                    cancelBtn={canelBtn}
                />
            </Grid>
            : <CircularProgress size="15rem"
                style={{
                    display: 'block',
                    marginTop: '8%',

                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: '#E2E8EB'
                }} />}


    </>)
}
export default SuspendRequestSummary;