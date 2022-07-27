import { CircularProgress, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useLookup } from "src/Core/Contexts/useLookup";
import PageViewer from "src/Core/SchemaBuilder/PageViewer";
import { getRequestDetails } from "../../API/ServicesApi";
import { formatGetCenterDetails } from "../../TransferCenterOwnership/Utils/FormateJson";
import SuspendRequestSummarySchema from "../schema/SuspendRequestSummarySchema";

const SuspendRequestSummary = () => {
    const location = useLocation();
    const isExtend = location?.state?.isExtend;
    const isCanceled = location?.state?.isCanceled
    const isCancel = location?.state?.isCancel

    const lookupValues = useLookup();
    const [errMessage, SetErrMessage] = useState();
    const { reqNum } = location?.state; //reqNum returned from suspense request table
    const [reqDetails, setReqDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertComment, setAlertComment] = useState();
    let title 

    if(isExtend){title='طلب تمديد تعليق عمل'}
    else if(isCanceled){title='طلب إلغاء تعليق العمل'}
    else {title='طلب تعليق عمل'; }

    useEffect(async () => {
        const res = await getRequestDetails(reqNum); //get request number
        if (!res.isSuccessful) {// cehck if any error occured while caling api
            setLoading(false)
            SetErrMessage(res?.message?.error || res?.message)
            return { isSuccessful: false, message: res?.message?.error || res?.message }
        }
        setAlertComment({ msg: res.responseBody?.requestDetails?.data.request?.comment, title: 'ملاحظات الطلب' }) //if the request rejected and returned with comment
        setReqDetails(
            {
                ...formatGetCenterDetails(res.responseBody?.requestDetails?.data), //to format all returned data
                ...res.responseBody?.requestDetails?.data.request, //to get {reqNumber,reqDate}
                workSus: {
                    ...res?.responseBody?.requestDetails?.data?.processVariablesDump?.NewCenterLocationData?.WorkSuspension_r //to get woek suspense data
                }
            }
        )
        setLoading(false)
    }, [])
    return !loading ? //to let the page load before render it to the user
        <Grid container>
            <PageViewer
                lookupObject={lookupValues}
                title={title}
                errMessage={errMessage}
                alertComment={alertComment}
                data={{ ...reqDetails, isExtend: isExtend , isCanceled:isCanceled,isCancel:isCancel}}
                schema={SuspendRequestSummarySchema}
                formType="view"
            />
        </Grid>
        : <CircularProgress size="15rem"
            style={{
                display: 'block',
                marginTop: '8%',

                marginLeft: 'auto',
                marginRight: 'auto',
                color: '#E2E8EB'
            }} />
}
export default SuspendRequestSummary;