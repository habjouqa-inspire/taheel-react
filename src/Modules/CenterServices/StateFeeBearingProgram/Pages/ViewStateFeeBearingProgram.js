import { Box, CircularProgress, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useLookup } from "src/Core/Contexts/useLookup";
import PageViewer from "src/Core/SchemaBuilder/PageViewer";
import { getDocId } from "src/Core/Utils/TaheelUtils";
import { getRequestDetails } from "../../API/ServicesApi";
import StaffTable from "../Component/StaffTable";
import ViewStateFeeBearingSummarySchema from "../Schema/ViewStateFeeBearingSummarySchema";



const ViewStateFeeBearingProgram = () => {
    const location = useLocation();
    const lookupValues = useLookup();
    const [initialValues, setInitialValues] = useState()
    const [errMessage, setErrMessage] = useState('')
    const [alertComment, setAlertComment] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const requestNum = location.state.requestNum


    useEffect(async () => {
        console.log("view state fee reqqqqq location :", location)
        setIsLoading(true)

        if (requestNum) {
            const response = await getRequestDetails(requestNum)
            if (!response.isSuccessful) {
                setErrMessage(response.message)
                setIsLoading(false)
                return false;
            }
            else {
                const data = response?.responseBody?.requestDetails?.data;
                const staff = response?.responseBody?.requestDetails?.data?.staff;
                setAlertComment({ msg: data.request?.comment, title: 'الملاحظات' })

                console.log("malak response data", response)
                console.log("malak response staff", staff)

                setInitialValues((initialVals) => {
                    initialVals = {
                        customers: staff,
                        centerLicenseNumber: data?.center?.centerLicense_r?.LicenseNumber,
                        companyName: data?.center?.name,
                        beneficiariesNum: data?.center?.centerInfo_r?.beneficiaryCount,
                        capacity: data?.center?.centerInfo_r?.carryingnumber,
                        executivePlan: data?.center?.centerInfo_r?.executivePlan && [data?.center?.centerInfo_r?.executivePlan?.id],
                        engineeringPlan: [(data?.center?.centerInfo_r?.executivePlan?.id || data?.center?.centerInfo_r?.executivePlan)],
                        healthServiceType: data?.center?.healthCareServices_r?.type || data?.processVariablesDump?.NewCenterLocationData?.healthCareServices_r?.type,
                        healthServiceAttachment: getDocId(data?.processVariablesDump?.NewCenterLocationData?.healthCareServices_r?.attachment) || getDocId(data?.processVariablesDump?.NewCenterLocationData?.healthCareServices_r?.attachment?.id),
                        transportationServices: data?.center?.StateFeeCenterTransport_r?.isTransportService === false ? 'no' : 'true' || data?.processVariablesDump?.NewCenterLocationData?.StateFeeCenterTransport_r?.isTransportService === true ? 'yes' : 'no',
                        numberOfVehicles: data?.center?.StateFeeCenterTransport_r?.NumOfVehicles || data?.processVariablesDump?.NewCenterLocationData?.StateFeeCenterTransport_r?.NumOfVehicles,
                        acceptanceRatio: data?.center?.StateFeeCenterTransport_r?.acceptanceRatio || data?.processVariablesDump?.NewCenterLocationData?.StateFeeCenterTransport_r?.acceptanceRatio,
                        formalLetter: data?.processVariablesDump?.NewCenterLocationData?.StateFeeCenterTransport_r?.formalLetter
                    };
                    
                    delete initialVals.centerLocation_r
                    console.log("setInitialVals malak centerInfo", initialVals)
                    return initialVals;
                });
                setIsLoading(false)
            }
        }
    }, [])

    return (
        <>
            {!isLoading ?
                <Box>
                        <PageViewer
                            data={initialValues}
                            lookupObject={lookupValues}
                            alertComment={alertComment}
                            errMessage={errMessage}
                            schema={ViewStateFeeBearingSummarySchema}
                            formType="view"
                            additionalFields={
                            <Grid
                                container
                                spacing={3}
                                mt={3}
                                mb={3}
                                style={{ paddingRight: '80px', paddingLeft: '150px' }}
                              >
                                <StaffTable values={initialValues} isViewPage={true} />
                            </Grid>}
                            title={'تفاصيل الطلب'}
                            navBackUrl={{url:'/app/center-requests'}}
                        />
                </Box>
                :
                <CircularProgress size="15rem" style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto', color: '#E2E8EB'
                }}
                />
            }
        </>
    );
}
export default ViewStateFeeBearingProgram;