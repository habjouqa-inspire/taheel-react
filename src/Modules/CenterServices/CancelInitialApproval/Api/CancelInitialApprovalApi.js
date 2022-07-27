import { APIRequest } from "src/Core/API/APIRequest";

const getInitialApproval = async (userEmail) => {
  const url = 'taheel-apis-records-getCenters-v2';
  const queryParams = { userEmail, isExpired: false, isEligibleForFinal: true, licenseType: '2' };
  const response = await APIRequest({ url, queryParams });
  return response;
};

const CancelTempLicenseFunc = async (email, licenseNumber, cancelingReason) => {
  const url = 'taheel-apis-services-cancelTempLicense-v2';
  const requestBody =
  {
    userCreationEmail: email,
    center: {
      centerLicense_r: {
        LicenseNumber: licenseNumber,
      }
    },
    cancelingReason: cancelingReason,
  };
  const response = await APIRequest({ url, requestBody });
  return response;
};

export { getInitialApproval, CancelTempLicenseFunc };


