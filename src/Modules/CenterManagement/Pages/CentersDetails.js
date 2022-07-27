/* eslint-disable */
import { Alert, Box, Card, Container, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import PageViewer from 'src/Core/SchemaBuilder/PageViewer';
import { arrangeInitValsWithSchema } from 'src/Core/SchemaBuilder/Utils/CoreUtils';
import { LICENSE_FORM_TYPES, REQUEST_TYPES } from 'src/Core/Utils/enums';
import { getOwnerDetails } from 'src/Core/Utils/TaheelUtils';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { CentertDetails, getRequestDetails } from 'src/Modules/CenterServices/API/ServicesApi';
import DisabledPersonSchema from 'src/Modules/CenterServices/FinalLicense/Schema/DisabledPersonSchema';
import finalLicenseNewTempsSchema from 'src/Modules/CenterServices/FinalLicense/Schema/finalLicenseNewTempsSchema';
import RenewalLandingPageSchema from 'src/Modules/CenterServices/FinalLicense/Schema/RenewalLandingPageSchema';
import { formateGetRequestDetails, formatGetCenterDetails } from 'src/Modules/CenterServices/TransferCenterOwnership/Utils/FormateJson';
import CenterDetailsSchema from '../Schema/CenterDetailsSchema';
import TempLicenseSchema from '../Schema/TempLicenseSchema';

const CentersDetails = () => {
    const navigate = useNavigate()
    const lookupValues = useLookup()
    const location = useLocation()
    const refreshLookup = useUpdateLookup()
    const [licenseNumber, setLicenseNumber] = useState(location.state?.licenseNumber)
    const requestNum = location.state?.requestNum
    const requestDetails = location.state?.requestDetails
    const { DOB } = getCurrentUser();

    const [oldView, setOldView] = useState(true)
    const [taskID, setTaskID] = useState()
    const [alertComment, setAlertComment] = useState()
    const [details, setDetails] = useState()
    const [navInfo, setNavInfo] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [isTemp, setIsTemp] = useState(false)
    const [isRenew, setIsRenew] = useState(false)
    const [disabledPerson, setDisapledPerson] = useState(false)
    const [centerSchema, setCenterSchema] = useState(false)
    const [resErorr, setErorrRes] = useState(false)

    useEffect(async () => {
        lookupValues?.isEmpity && (refreshLookup())
        setLoading(true)
        if (!!requestNum) {
            const getReqDetails = await getRequestDetails(requestNum)
            if (getReqDetails.isSuccessful) {
                setErorrRes(false)
                setErrMessage('')
                let reqDetails = getReqDetails.responseBody.requestDetails.data

                if (requestDetails?.typeId === REQUEST_TYPES.TEMPOR) {
                    setIsTemp(true)
                    reqDetails = arrangeInitValsWithSchema(TempLicenseSchema, reqDetails)
                    setDetails(reqDetails);
                } else if (requestDetails?.typeId === REQUEST_TYPES.RENEW) {

                    setIsRenew(true);
                    if (requestDetails?.centerType === '01') {
                        setDisapledPerson(true)
                    }
                    console.log('returned data in final', reqDetails);
                    setDetails(
                        det =>
                            det = {
                                ...details,
                                ...formateGetRequestDetails(reqDetails),
                                ...formatGetCenterDetails(reqDetails)
                            }
                    )

                } else {
                    console.log('returned data in final', reqDetails);

                    setDetails(details => {
                        details = {
                            ...reqDetails.center?.centerInfo_r,
                            ...reqDetails.center,
                            ...formateGetRequestDetails(reqDetails),
                            customers: reqDetails.staff,
                            targetedBenificiray: reqDetails.center?.targetedBeneficiary,
                            targetedServices: reqDetails.center?.targetedServices,
                            centerType: reqDetails.center?.type,
                            ...getOwnerDetails(reqDetails),
                            ...formatGetCenterDetails(reqDetails)

                        }

                        if (details.centerType != "01" && requestDetails?.typeId != REQUEST_TYPES.TEMPOR) {
                            setOldView(false)
                            details = {
                                ...details,
                                ...formateGetRequestDetails({ ...reqDetails, status: requestDetails.status }),
                            }
                        }
                        setLicenseNumber(details?.center?.centerLicense_r?.LicenseNumber)
                        return details
                    })
                }

                setAlertComment({ msg: reqDetails.request?.comment, title: 'الملاحظات' })
                setTaskID(reqDetails?.externalTaskData?.ID)
                setLoading(false)
                if (reqDetails.externalTaskData?.type === REQUEST_TYPES.FINAL) {
                    setNavInfo({ url: '/center-services/editfinallicense', btnName: 'تعديل طلب إصدار ترخيص' })
                } else if (reqDetails.externalTaskData?.type === REQUEST_TYPES.RENEW) {
                    setNavInfo({ url: '/center-services/editfinallicense', btnName: 'تعديل طلب تجديد رخصة' })
                } else {
                    setTaskID('')
                }

            } else {
                setErorrRes(true);
                setErrMessage(getReqDetails?.message?.error || getReqDetails?.message)
            }
        } else {
            const getCenterDetails = await CentertDetails(licenseNumber)
            if (!getCenterDetails.isSuccessful) {
                setErrMessage(getCenterDetails.message)
            } else {
                let Details = getCenterDetails.responseBody.data
                if (Details.center?.centerLicense_r?.LicenseType?.trim() === "1") {
                    setIsTemp(true)
                    Details = arrangeInitValsWithSchema(TempLicenseSchema, Details)
                    setDetails(Details)
                } else {
                    setDetails(details => {
                        details = {
                            ...Details.center.centerInfo_r,
                            ...Details.center,
                            customers: Details.staff,
                            targetedBenificiray: Details.center?.targetedBeneficiary,
                            targetedServices: Details.center?.targetedServices,
                            centerType: Details.center?.type,
                            ...getOwnerDetails(Details)
                        }
                        if (details.centerType != "01" && requestDetails?.typeId != REQUEST_TYPES.TEMPOR) {
                            setOldView(false)
                            details = {
                                ...details,
                                ...formateGetRequestDetails({ ...Details, status: Details.status }),
                                ...formatGetCenterDetails({ ...Details, status: Details.status }),
                            }
                        }
                        return details
                    })
                }
              
            }
        }

        setLoading(false)
    },[])
    const title = 'تفاصيل المركز'
    const submitBtn = {
        btnName: !!taskID ? navInfo.btnName : null,
        handleClick: () => {
            navigate(navInfo.url, {
                state: {
                    licenseNumber: licenseNumber,
                    centerLicenseNumber: licenseNumber,
                    taskID,
                    requestNum,
                    renewal: isRenew,
                    editF: isRenew,
                    fromRenewal: isRenew,
                    centerData: { ...details, centerLicenseNumber: licenseNumber },
                    formType: LICENSE_FORM_TYPES.EDIT
                }
            })
        }
    }
    console.log('summary data :::', details);
    if (!resErorr) {
        return (

            <PageViewer
                title={title}
                lookupObject={lookupValues}
                schema={isTemp ? TempLicenseSchema
                    : isRenew ? disabledPerson ? DisabledPersonSchema : RenewalLandingPageSchema
                        : oldView ? CenterDetailsSchema
                            : finalLicenseNewTempsSchema}
                errMessage={errMessage}
                data={{ ...details, renewal: isRenew, fromRenewal: isRenew }}
                alertComment={alertComment}
                isLoading={loading}
                submitBtn={submitBtn}
                navBackUrl={{ url: !!requestNum ? '/app/center-requests' : '/app/centers', state: { licenseNumber: licenseNumber } }}
            />)
    } else {
        return (
            <Container maxWidth="md" >
                <Card>
                    <Box>
                        <br/>
                        <Alert variant="outlined" severity="error">
                            {errMessage}
                        </Alert>
                        <br/>
                        <br/>
                        <Typography>هناك مشكلة في استرجاع المعلومات, الرجاء المحاولة مرة أخرى</Typography>
                        <br/>
                        
                        <br/>

                    </Box>
                </Card>
            </Container>)
    }
}
CentersDetails.propTypes = {
    // centers: PropTypes.array.isRequired
}

export default CentersDetails
