/* eslint-disable */
import { CircularProgress, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import PageViewer from 'src/Core/SchemaBuilder/PageViewer';
import { cancelTCRequest, getRequestDetails } from 'src/Modules/CenterServices/API/ServicesApi';
import TransferLocationsummarySchema from '../Schema/TransferLocationsummarySchema';

const TransferCenterLocationSummary = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const licenseNumber = location.state.licenseNumber
    const [taskID, setTaskID] = useState()
    const requestNum = location.state.requestNum
    console.log("TransferCenterLocationSummary :: licenseNumber: ", licenseNumber)
    console.log("TransferCenterLocationSummary :: requestNum: ", requestNum)
    console.log("TransferCenterLocationSummary :: taskID: ", taskID)
    const [details, setDetails] = useState(false)
    const [isAgree, setIsAgree] = useState(false)
    const [errMessage, setErrMessage] = useState()
    const [alertComment, setAlertComment] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [btnsOptions, setBtnsOptions] = useState({})
    const [dialogContent, setDialogContent] = useState("")
    const [dialogTitle, setDialogTitle] = useState("")
    const [title, setTitle] = useState(" ");
    const handleClickOpen = (data) => {
        setErrMessage('')
        setOpen(true);
    };
    useEffect(async () => {
        setIsLoading(true)
        const getReqDetails = await getRequestDetails(requestNum)
        if (!getReqDetails.isSuccessful) {
            setErrMessage(getReqDetails.message)
        } else {
            setIsLoading(false)

            let Details = getReqDetails.responseBody.requestDetails.data
            if (Details.center.type === "01") {
                setTitle(" تفاصيل طلب نقل مراكز ذوي الإعاقة")
            }
            if (Details.center.type === "08") {
                setTitle(" تفاصيل طلب نقل مراكز ضيافة الأطفال")
            }
            if (Details.center.type === "05") {

                setTitle(" تفاصيل طلب نقل مراكز الإرشاد الأسري")
            }
            if (Details.center.type === "03") {
                setTitle(" تفاصيل طلب نقل  مراكز كبار السن ")
            }
            if (Details.center.type === "01") {
                setAlertComment({ msg: Details?.chairmanComment?.comment, title: 'ملاحظات الطلب' })
                console.log('chairmanComment+currentType', Details?.chairmanComment?.comment)
            } else {
                setAlertComment({ msg: Details?.request?.comment, title: 'ملاحظات الطلب' })
                console.log('chairmanComment+newType', Details?.request?.comment)

            }
            setTaskID(Details?.externalTaskData?.ID)

            if(Details?.draft_values?.isDraft){
                Details = {
                    NewCenterLocationData: Details?.draft_values?.center?.centerLocation_r,
                    center: Details.center,
                    ...Details?.draft_values?.center?.centerLocation_r,
                    comment: Details.request?.comment
                }
            }else{
            Details = {
                NewCenterLocationData: Details.processVariablesDump?.NewCenterLocationData,
                center: Details.center,
                ...Details.processVariablesDump?.NewCenterLocationData?.centerLocation_r,
                comment: Details.request?.comment
            }}
            console.log("Details+++++++++++++", Details)
            setDetails(Details)
            setLoading(false)
        }
    }, [])
    async function onCancelTCRequest() {
        setLoading(true)
        const deleteCommissioner = await cancelTCRequest(taskID, licenseNumber)
        if (!deleteCommissioner.isSuccessful) {
            setErrMessage(deleteCommissioner.message);
            return { isSquccessful: false, message: deleteCommissioner.message };
        } else {
            setIsLoading(false)
            setBtnsOptions({
                acceptBtnName: "تم", onClose: () => {
                    navigate("/app/center-requests", {
                        state: {
                            centerLicenseNumber: licenseNumber,
                            taskID: taskID
                        }
                    })
                }
            });
            setDialogContent(`${deleteCommissioner.responseBody.data.message} ` + requestNum);
            setDialogTitle('')
            setOpen(true);

            console.log('navegate');
        }
        return { isSquccessful: true, message: "تم الحذف بنجاح" };
    }
    // const title = 'تفاصيل طلب نقل المركز'
    const cancelBtn = {
        btnName: !!taskID ? "إلغاء الطلب" : null,
        handleClick: () => {
            setBtnsOptions({ onClose: () => { setOpen(false) }, buttons: { leftBtn: { title: 'نعم', func: () => { setOpen(false); onCancelTCRequest(); } }, rightBtn: { title: 'لا', func: () => { setOpen(false) } } } });
            setDialogContent('هل أنت متأكد من إلغاء طلب نقل المركز ؟ ');
            setDialogTitle('إلغاء طلب نقل المركز')
            setOpen(true);
        }
    }
    const submitBtn = {
        btnName: !!taskID ? "تعديل بيانات طلب نقل المركز" : null,
        handleClick: () => {
            navigate("/center-services/transfercenter", {
                state: {
                    licenseNumber: licenseNumber,
                    centerLicenseNumber: licenseNumber,
                    taskID,
                    requestNum,
                    formEdit: true
                }
            })
        }
    }
    return (
        <Container >
            {!isLoading ? (
                <>
                    <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} {...btnsOptions} />
                    <PageViewer
                        title={title}
                        schema={TransferLocationsummarySchema}
                        errMessage={errMessage}
                        data={details}
                        alertComment={alertComment}
                        isLoading={loading}
                        navBackUrl={{ url: '/app/center-requests', state: { licenseNumber: licenseNumber } }}
                        submitBtn={submitBtn}
                        cancelBtn={cancelBtn}
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
            )
            }
        </Container>
    );
};
TransferCenterLocationSummary.propTypes = {
    // centers: PropTypes.array.isRequired
}

export default TransferCenterLocationSummary
