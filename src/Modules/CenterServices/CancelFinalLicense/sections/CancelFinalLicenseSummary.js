/* eslint-disable */
import { CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import PageViewer from 'src/Core/SchemaBuilder/PageViewer';
import { getRequestDetails } from "../../API/ServicesApi";
import { formatGetCenterDetails } from '../../TransferCenterOwnership/Utils/FormateJson';
import { cancelCancelFinalRequest } from '../Api/cancelFinalLicenseApi';
import CancelFinalLicenseSummarySchema from '../Schema/CancelFinalLicenseSummarySchema';

const cancelFinalLicenseSummary = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const lookupValues = useLookup()
    const refreshLookup = useUpdateLookup()
    const search = location.search;
    const params = new URLSearchParams(search);
    const requestDetails = location.state?.requestDetails;
    const [licenseNumber, setLicenseNumber] = useState(location.state?.licenseNumber || params.get('licenseNumber'))
    const [taskID, setTaskID] = useState()
    const requestNum = location.state?.requestNum || params.get('requestNum');
    const [details, setDetails] = useState(false)
    const [errMessage, setErrMessage] = useState()
    const [alertComment, setAlertComment] = useState()
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [btnsOptions, setBtnsOptions] = useState({})
    const [dialogContent, setDialogContent] = useState("")
    const [dialogTitle, setDialogTitle] = useState("")
    const [newOwner, setNewOwner] = useState(false)
    const [buttonLabel, setButtonLabel] = useState('تعديل الطلب')
    const [title, setTitle] = useState('تفاصيل طلب إلغاء ترخيص')
    const [type, setType] = useState()
    console.log('license number state::',location.state);

    useEffect(async () => {
        lookupValues?.isEmpity && (refreshLookup())
        setLoading(true)
        const getReqDetails = await getRequestDetails(requestNum)
        if (!getReqDetails.isSuccessful) {
            setErrMessage(getReqDetails.message)
        } else {
            console.log('requestdeetails response:::', getReqDetails?.responseBody?.requestDetails?.data);
            console.log('in cancel license summary ::',getReqDetails?.responseBody?.requestDetails?.data?.request?.comment);
            setAlertComment({msg:getReqDetails?.responseBody?.requestDetails?.data?.request?.comment})
            const detailsWithAddress = {
                ...getReqDetails?.responseBody?.requestDetails?.data,
                ...formatGetCenterDetails(getReqDetails?.responseBody?.requestDetails?.data),
                address: {
                    ...getReqDetails?.responseBody?.requestDetails?.data?.center?.centerLocation_r,
                    heart: {
                        lng: getReqDetails?.responseBody?.requestDetails?.data?.center?.centerLocation_r?.lng,
                        lat: getReqDetails?.responseBody?.requestDetails?.data?.center?.centerLocation_r?.lat
                    }
                },
            }
            setTaskID(getReqDetails?.responseBody?.requestDetails?.data.externalTaskData?.ID)

            setDetails(
                detailsWithAddress
            );
            setLoading(false)
        }
    }, [])


    const cancelBtn = {
        btnName: !!taskID ? "إلغاء الطلب" : null,
        handleClick: () => {
            setBtnsOptions({
                onClose: () => { setOpen(false) },
                buttons: {
                    leftBtn: {
                        title: 'نعم', func: () => {
                            setOpen(false);
                            cancellingRequest();
                        }
                    },
                    rightBtn: {
                        title: 'لا', func: () => {
                            setOpen(false)
                        }
                    }
                }
            }
            );
            setDialogContent('هل أنت متأكد من إلغاء طلب إلغاء ترخيص ؟ ');
            setDialogTitle('إلغاء طلب إلغاء ترخيص')
            setOpen(true);
        }

    }
    const cancellingRequest=async  ()=> {
        setLoading(true)
        console.log('sssssssssssssssssssssssbbbbbbbbbbb',licenseNumber);
        const cancelReq22 = await cancelCancelFinalRequest(licenseNumber,type,taskID )
        if (!cancelReq22?.isSuccessful) {
            setLoading(false)
            setErrMessage(cancelReq22?.message);
            return { isSuccessful: false, message: cancelReq22.message };
        } else {
            
            setLoading(false)
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
            setDialogContent(`${cancelReq22?.responseBody?.data?.message} `);
            setDialogTitle('')
            setOpen(true);

            console.log('navegate');
        }
        return { isSuccessful: true, message: `${cancelReq22?.responseBody?.data?.message} ` };
    }
    const submitBtn = {
        btnName: !!taskID ? buttonLabel : null,
        handleClick: () => {
            navigate("/center-services/CancelFinalLicense", {
                state: {
                    licenseNumber: licenseNumber || details?.center?.centerLicense_r?.LicenseNumber,
                    requestNum,
                    taskID: details?.externalTaskData?.ID,
                    returnedrequest: true,
                    cancelReason: (details?.draft_values?.cancelingReason||details?.processVariablesDump?.NewCenterLocation?.cancelingReason),
                    editRequestData: details.editRequestData
                }
            }
            )
        }
    }
    console.log('data before rendering:: ', details);
    return (
        <>
            <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} {...btnsOptions} />
            {<Grid container>
                {console.log('all center details ::', { details })}
                {!loading ?
                    <PageViewer
                        title={title}
                        lookupObject={lookupValues}
                        // schema={newOwner ? details?.center?.type === '01' ? TransferCenterNewOwnershipSchema : SummarySchemaOwnershipForOtherTypes : TransferCenterOwnershipSchema}
                        schema={CancelFinalLicenseSummarySchema}
                        errMessage={errMessage}
                        data={details}
                        alertComment={alertComment}
                        isLoading={loading}
                        navBackUrl={{ url: '/app/center-requests', state: { licenseNumber: licenseNumber } }}
                        cancelBtn={cancelBtn}
                        submitBtn={submitBtn}
                    // additionalFields={additionalFields()}
                    /> :
                    <CircularProgress size="15rem" style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto', color: '#E2E8EB'
                    }} />
                }  </Grid>
            }
        </>
    )

}



export default cancelFinalLicenseSummary;
