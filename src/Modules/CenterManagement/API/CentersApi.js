import { APIRequest } from "src/Core/API/APIRequest";

const getCenters = async (email, startIndex, batchSize, filters, isMigratedAndNew) => {
    const url = 'taheel-apis-records-getCenters-v2?';
    const requestBody = filters
    const queryParams = {
        userEmail: email,
        startIndex: startIndex,
        batchSize: batchSize,
        isMigratedAndNew:isMigratedAndNew
    }
    const response = await APIRequest({ requestBody, queryParams, url });
    return response;
}

const centerDetails = async (licenseNum) => {
    const url = 'taheel-apis-records-getCenters-v2?';
    const queryParams = {
        licenseNumber: licenseNum,
    }
    const response = await APIRequest({ queryParams, url });
    return response;
}

const addCommissionerRs = async (email, jobTitle, staffId, permissions) => {
    const url = 'tt-api-utilities-commissioner-services';
    const requestBody = {
        "serviceType": "1",
        "commissioner": {
            "email": email,
            "jobTitle": jobTitle,
            "staffId": '' + staffId,
            "permissions": permissions
        }
    };

    const response = await APIRequest({ requestBody, url });
    return response;
};
const deleteCommissionerRs = async (email) => {
    const url = 'tt-api-utilities-commissioner-services';
    const requestBody = {
        "serviceType": "3",
        "commissioner": {
            "email": email
        }
    }
    const response = await APIRequest({ requestBody, url });
    return response;
};
export { getCenters, centerDetails, addCommissionerRs, deleteCommissionerRs };
