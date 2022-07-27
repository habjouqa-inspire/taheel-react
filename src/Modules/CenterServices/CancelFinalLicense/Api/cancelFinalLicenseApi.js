import { APIRequest } from "src/Core/API/APIRequest";
import { getTaheelRequestsFun } from "../../API/ServicesApi";
export const CancelFinalLicenseFunc = async (values, returnedrequest, TaskID,reqNumber) => {
    const url = 'taheel-apis-services-cancelFinalLicense';
    console.log('test in cancel final license ::: 3333',values, returnedrequest, TaskID,reqNumber);

    const requestBody = {
        requestNumber:reqNumber,
        serviceStatus: returnedrequest ? 2 : 1,
        externalUserTaskID: TaskID,
        isDraft: values.isDraft,
        center: {
            type: values?.centerType,
            centerLicense_r: {
                LicenseNumber: values?.centerLicenceNumber
            }
        },
        cancelingReason: values?.cancelingReason,
    }
    if (values.isDraft) {
        requestBody.draft_values = values;
    }
    const response = await APIRequest({ url, requestBody });
    return response;
};
export const cancelCancelFinalRequest = async (centerLicenceNumber, centerType, TaskID) => {
    const url = 'taheel-apis-services-cancelFinalLicense';
    const requestBody = {
        serviceStatus: 2,
        externalUserTaskID: TaskID,
        isDraft: false,
        cancel: true,
        center: {
            type: centerType,
            centerLicense_r: {
                LicenseNumber: centerLicenceNumber
            }
        },
    }
    const response = await APIRequest({ url, requestBody });
    return response;
}
export const hasDraftInFinalLicenseStage = async (licenseNumber) => {
    const getTaheelRequestsRs = await getTaheelRequestsFun({ licenseNumber, status: [].concat(4) })
    if (!getTaheelRequestsRs.isSuccessful) {
        setErrMessage(getTaheelRequestsRs.message);
    } else {
        const finalDrafts = getTaheelRequestsRs.responseBody?.data?.requests
        return !!finalDrafts[0] ? finalDrafts[0].requestNum : null
    }
}