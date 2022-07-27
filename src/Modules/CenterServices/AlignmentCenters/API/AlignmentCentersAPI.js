const { APIRequest } = require("src/Core/API/APIRequest");

const alignmentCenterStatus = async (email,licenseNumber,alignmentStatus ) => {
    const url = "taheel-apis-utilities-change-Migration-status"
    const requestBody = {
        userCreationEmail: email,
        center: {
            centerLicense_r: {
                LicenseNumber: licenseNumber
            },
            migrationStatus: alignmentStatus
        }
    }
    const response = await APIRequest({ url, requestBody });
    return response;

}
export default alignmentCenterStatus;