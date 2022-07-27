/* eslint-disable */
import { Box, CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import PageViewer from 'src/Core/SchemaBuilder/PageViewer';
import { extractDateToObject } from 'src/Core/Utils/TaheelUtils';
import { getRequestDetails } from "../../API/ServicesApi";
import TransferCenterOwnershipSchema from '../Schema/TransferCenterOwnershipSchema';
import { formateGetRequestDetails } from '../Utils/FormateJson';
import { canceltransferOwnershipRequest } from '../Utils/TransferCenterOwnershipUtil';

const TransferCenterOwnershipSummary = () => {
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
    const [buttonLabel, setButtonLabel] = useState()
    const [title, setTitle] = useState('تفاصيل طلب نقل ملكية مركز')
    const [type, setType] = useState()

    useEffect(async () => {
        lookupValues?.isEmpity && (refreshLookup())
        setLoading(true)
        const getReqDetails = await getRequestDetails(requestNum)
        if (!getReqDetails.isSuccessful) {
            setLoading(false)

            setErrMessage(getReqDetails.message)
        } else {
            let Details = getReqDetails.responseBody.requestDetails.data
            setType(Details?.center?.type)
            const status = Details.request?.status;
            setAlertComment({ msg: Details.request?.comment, title: 'الملاحظات' })
            if ((Details?.center?.type != '01') && Details?.staff?.length > 0) {

                Details.managerBOD = Details?.staff[0]?.birthDate;
                Details.fullName = Details?.staff[0]?.name;
                Details.idNumber = Details?.staff[0]?.idNumIqamaNum
                Details.IDNo = Details?.staff[0]?.idNumIqamaNum
                Details.gender = Details?.staff[0]?.gender
                const isWithSlashes = Details?.staff[0]?.birthDate.includes('/');
                Details.managerBD = extractDateToObject(Details?.staff[0]?.birthDate, isWithSlashes ? 'iDD/iMM/iYYYY' : 'iYYYYiMMiDD')
                Details.gender = Details?.staff[0]?.gender
                Details.birthDate = Details?.staff[0]?.birthDate
                Details.CV = Details?.staff[0]?.CV && [Details?.staff[0]?.CV?.id]//check
                Details.educationalQualifications = Details?.staff[0]?.educationQualifications && [Details?.staff[0]?.educationQualifications?.id] //check
                Details.medicalReport = Details?.staff[0]?.medicalReport && [Details?.staff[0]?.medicalReport?.id] //check
                Details.firstAidCourseCompletionCertificate = Details?.staff[0]?.firstAidCourseCompletionCertificate && [Details?.staff[0]?.firstAidCourseCompletionCertificate?.id] //check
                Details.titleDeedOrLeaseContract = Details?.center?.centerInfo_r?.titleDeedOrLeaseContract && [Details?.center?.centerInfo_r?.titleDeedOrLeaseContract?.id] //check
            }
            setTaskID(Details?.externalTaskData?.ID)
            if (status !== 8 && status !== 13) {
                setTitle('تفاصيل طلب نقل ملكية مركز')
                setButtonLabel("تعديل الطلب")
                setNewOwner(true)

                Details = {
                    ...Details,
                    ...formateGetRequestDetails(Details),
                    NewCenterLocationData: { ...Details.processVariablesDump },
                    center: { ...Details.center },
                    comment: Details.request?.comment,
                    targetedBenificiray: Details.center?.targetedBeneficiary,
                    targetedServices: Details.center?.targetedServices,
                    centerType: Details.center?.type
                }

                const editRequestData = formateGetRequestDetails({ ...Details, requestDetails: requestDetails, status: requestDetails.status });
                Details = { ...Details, editRequestData: editRequestData, ...editRequestData, center: { ...Details.center }, comment: Details.request?.comment, staff: Details?.processVariablesDump?.staff }
                console.log("Details...", Details)
            } else {
                setTitle('تفاصيل طلب نقل ملكية مركز ')
                setButtonLabel("استكمال متطلبات نقل ملكية مركز")
                setNewOwner(false)
                setType(Details.center?.type)
                Details = {
                    ...Details,
                    ...formateGetRequestDetails(Details),
                    NewCenterLocationData: { ...Details.processVariablesDump },
                    center: { ...Details.center },
                    comment: Details.request?.comment,
                    targetedBenificiray: Details.center?.targetedBeneficiary,
                    targetedServices: Details.center?.targetedServices,
                    centerType: Details.center?.type
                }
            }
            setLicenseNumber(Details.center.centerLicense_r.LicenseNumber)
            console.log('details in state', Details);
            setDetails(Details)
            setLoading(false)
        }
    }, [])

    async function onCancelTCRequest() {
        setLoading(true)
        const deleteCommissioner = await canceltransferOwnershipRequest(taskID, licenseNumber, type)
        if (!deleteCommissioner.isSuccessful) {
            setLoading(false)

            setErrMessage(deleteCommissioner.message);
            return { isSquccessful: false, message: deleteCommissioner.message };
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
            setDialogContent(`${deleteCommissioner.responseBody.data.message} `);
            setDialogTitle('')
            setOpen(true);

            console.log('navegate');
        }
        return { isSquccessful: true, message: `${deleteCommissioner.responseBody.data.message} ` };
    }
    const cancelBtn = {
        btnName: !!taskID ? "إلغاء الطلب" : null,
        handleClick: () => {
            setBtnsOptions({ onClose: () => { setOpen(false) }, buttons: { leftBtn: { title: 'نعم', func: () => { setOpen(false); onCancelTCRequest(); } }, rightBtn: { title: 'لا', func: () => { setOpen(false) } } } });
            setDialogContent('هل أنت متأكد من إلغاء طلب نقل الملكية ؟ ');
            setDialogTitle('إلغاء طلب نقل الملكية')
            setOpen(true);
        }

    }
    const submitBtn = {
        btnName: !!taskID ? buttonLabel : null,
        handleClick: () => {
            navigate("/center-services/transNewOnership", {
                state: {
                    licenseNumber: licenseNumber,
                    requestNum,
                    editRequestData: details.editRequestData
                }
            }
            )
        }
    }
    // const additionalFields = () => {
    //     return !!taskID &&
    //         (
    //             <Grid container spacing={2} mt={3} justifyContent="space-between">
    //                 <Grid item>
    //                     <Button
    //                         variant="contained"
    //                         color="secondary"
    //                         onClick={() => {
    //                             setBtnsOptions({ onClose: () => { setOpen(false) }, buttons: { leftBtn: { title: 'نعم', func: () => { setOpen(false); onCancelTCRequest(); } }, rightBtn: { title: 'لا', func: () => { setOpen(false) } } } });
    //                             setDialogContent('هل أنت متأكد من إلغاء طلب نقل الملكية ؟ ');
    //                             setDialogTitle('إلغاء طلب نقل الملكية')
    //                             setOpen(true);
    //                         }
    //                         }
    //                     >
    //                         <IconsList iconType={IconsTypeEnum.DELETE_ICON} label="إلغاء الطلب" color="info" />
    //                     </Button>
    //                 </Grid>
    //                 <Grid item>
    //                     <Button
    //                         variant="contained"
    //                         color="primary"
    //                         sx={{
    //                             backgroundColor: '#3c8084',
    //                         }}
    //                         onClick={() => {
    //                             navigate("/center-services/transNewOnership", {
    //                                 state: {
    //                                     licenseNumber: licenseNumber,
    //                                     requestNum,
    //                                     editRequestData: details.editRequestData
    //                                 }
    //                             })
    //                         }}
    //                     >
    //                         <IconsList iconType={IconsTypeEnum.EDIT_ICON} label={buttonLabel} color="info" />
    //                     </Button>
    //                 </Grid>
    //             </Grid >
    //         )
    // }
    return (
        <Box>
            <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} {...btnsOptions} />
            {<Grid container >
                {console.log('all center details ::', { details })}
                {!loading ? <PageViewer
                    title={title}
                    lookupObject={lookupValues}
                    // schema={newOwner ? details?.center?.type === '01' ? TransferCenterNewOwnershipSchema : SummarySchemaOwnershipForOtherTypes : TransferCenterOwnershipSchema}
                    schema={TransferCenterOwnershipSchema}
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
        </Box>
    )

}



export default TransferCenterOwnershipSummary;
