import { APIRequest } from "src/Core/API/APIRequest";
import { getTaheelRequestsFun } from "../../API/ServicesApi";

export const workSuspensionRequest = async (v, reqNum) => {
    const url = v?.isExtend ? "taheel-apis-services-workSuspensionExtension" : "taheel-apis-services-workSuspension"
    const queryParams = {}
    const requestBody = {
        isDraft: v?.isDraft,
        requestNumber: reqNum,
        center: {
            type: v?.centerType,
            centerLicense_r: {
                LicenseNumber: v?.licenseNumber
            },
            WorkSuspension_r: {
                startDateHijri: `${v?.FromDate?.year}${v?.FromDate?.month}${v?.FromDate?.day}`,
                endDateHijri: `${v?.ToDate?.year}${v?.ToDate?.month}${v?.ToDate?.day}`,
                reason: v?.cancelingReason
            }
        }
    }
    if (v.isDraft) {
        requestBody.draft_values = v;
    }
    const response = await APIRequest({ url, queryParams, requestBody });
    return response;
}
export const cancelWorkSuspensionRequest = async (v) => {
    const url = "taheel-apis-services-cancelworksuspension"
    const queryParams = {}
    const requestBody = {
        center: {
            type: v?.centerType,
            centerLicense_r: {
                LicenseNumber: v?.centerLicenseNumber
            },
        }
    }
    if (v.isDraft) {
        requestBody.draft_values = v;
    }
    const response = await APIRequest({ url, queryParams, requestBody });
    return response;
}
export const getRequestsByLicense = async ({ licenseNumber, requestTypeId, status }) => {
    const res = await getTaheelRequestsFun({ licenseNumber, requestTypeId, status })
    if (!res?.isSuccessful) {
        return { isSuccessful: res.isSuccessful, message: res.message }
    }
    return res;

}