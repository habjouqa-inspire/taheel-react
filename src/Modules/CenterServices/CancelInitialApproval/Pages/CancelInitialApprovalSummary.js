
/* eslint-disable */
import { Button, CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import IconsList from 'src/Core/SchemaBuilder/FieldsInputs/IconsList';
import PageViewer from 'src/Core/SchemaBuilder/PageViewer';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';
import { getOwnerDetails } from 'src/Core/Utils/TaheelUtils';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { cancelTCRequest, getRequestDetails } from "../../API/ServicesApi";
import cancelingInitialApprovalSummarySchema from '../Schema/cancelingInitialApprovalSummarySchema';

const CancelInitialApprovalSummary = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const lookupValues = useLookup();
    const refreshLookup = useUpdateLookup();
    const search = location.search;
    const params = new URLSearchParams(search);
    const requestDetails = location.state?.requestDetails;
    const [licenseNumber, setLicenceNumber] = useState(location.state?.licenseNumber || params.get('licenseNumber'))
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
    const [buttonLabel, setButtonLabel] = useState()
    const [title, setTitle] = useState('تفاصيل طلب إلغاء موافقة مبدئية')
    const { DOB } = getCurrentUser();

    useEffect(async () => {
        await setLoading(true)
        lookupValues?.isEmpity && (refreshLookup())
        console.log("requestNum+++++++++++++requestNum ", requestNum)

        const getReqDetails = await getRequestDetails(requestNum)
        if (!getReqDetails.isSuccessful) {
            setErrMessage(getReqDetails.message)
        } else {
            let Details = getReqDetails.responseBody.requestDetails.data
            setAlertComment({ msg: Details?.request?.comment, title: 'الملاحظات' })
            setTaskID(Details?.externalTaskData?.ID)
            Details = {
                CancelingData: { ...Details.request },
                center: { ...Details.center },
                targetedBenificiray: Details.center?.targetedBeneficiary,
                targetedServices: Details.center?.targetedServices,
                centerType: Details.center?.type,
                ...getOwnerDetails(Details)
            }
            console.log("Details+++++++++++++", Details)
            setDetails(Details)
            await setLoading(false)
        }
    }, [])

    async function onCancelTCRequest() {
        setLoading(true)
        const deleteCommissioner = await cancelTCRequest(taskID, licenseNumber)
        if (!deleteCommissioner.isSuccessful) {
            setErrMessage(deleteCommissioner.message);
            return { isSquccessful: false, message: deleteCommissioner.message };
        } else {
            setLoading(false)
            setBtnsOptions({
                acceptBtnName: "تم", onClose: () => {
                    navigate("/app/center-requests", {
                        state: {
                            centerLicenceNumber: licenseNumber,
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
        return { isSquccessful: true, message: "تم الإلغاء بنجاح" };
    }
    const additionalFields = () => {
        return !!taskID &&
            (
                <Grid container spacing={2} mt={3} justifyContent="space-between">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setBtnsOptions({ onClose: () => { setOpen(false) }, buttons: { leftBtn: { title: 'نعم', func: () => { setOpen(false); onCancelTCRequest(); } }, rightBtn: { title: 'لا', func: () => { setOpen(false) } } } });
                                setDialogContent('هل أنت متأكد من إلغاء طلب إلغاء موافقة مبدئية ؟ ');
                                setDialogTitle('إلغاء موافقة مبدئية')
                                setOpen(true);
                            }
                            }
                        >
                            <IconsList iconType={IconsTypeEnum.DELETE_ICON} label="إلغاء الطلب" color="info" />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: '#3c8084',
                            }}
                            onClick={() => {
                                navigate("/center-services/transNewOnership", {
                                    state: {
                                        licenseNumber: licenseNumber,
                                        requestNum,
                                        editRequestData: details.editRequestData
                                    }
                                })
                            }}
                        >
                            <IconsList iconType={IconsTypeEnum.EDIT_ICON} label={buttonLabel} color="info" />
                        </Button>
                    </Grid>
                </Grid >
            )
    }
    return (
        <>
            <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} {...btnsOptions} />

           { loading?<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />:<PageViewer
                title={title}
                lookupObject={lookupValues}
                schema={cancelingInitialApprovalSummarySchema}
                errMessage={errMessage}
                data={details}
                alertComment={alertComment}
                isLoading={loading}
                navBackUrl={{ url: '/app/center-requests', state: { licenseNumber: licenseNumber } }}
                additionalFields={additionalFields()}
            />}
        </>
    )

}



export default CancelInitialApprovalSummary;
