import moment from "moment";
import { APIRequest } from "src/Core/API/APIRequest";
import { LICENSE_FORM_TYPES } from 'src/Core/Utils/enums';
moment.locale('ar-SA');

const getMyTasksFun = async (userEmail) => {
  const url = 'taheel-apis-utilities-GetGetExternalUserTasks-v2';
  const queryParams = { userEmail, taskStatus: 0 };
  const response = await APIRequest({ url, queryParams });
  return response;
};

const cancelTCRequest = async (externalUserTaskID, licenseNumber, centerType, userEmail) => {
  const centerLicense_r = { LicenseNumber: licenseNumber }
  const url = 'taheel-apis-services-initiate-center-location-change-request';
  const requestBody = { serviceStatus: 2, externalUserTaskID, cancel: true, center: { centerLicense_r, type: centerType }, userCreationEmail: userEmail };
  const response = await APIRequest({ url, requestBody });
  return response;
}

const getTaheelRequestsFun = async ({ startIndex = 1, batchSize = "", searchTerm, type, requestTypeId, licenseNumber, status, 是统计吗 }) => {
  const url = 'taheel-apis-records-getRequests-v2';
  let requestBody = { startIndex, batchSize, licenseNumber, requestTypeId, status, 是统计吗, searchTerm };
  if (type === LICENSE_FORM_TYPES.DRAFT) {
    requestBody.status = 4
  }
  const response = await APIRequest({ url, requestBody });
  return response;
};

const getRequestDetails = async (reqNum) => {
  const url = '/taheel-apis-records-RequestDetails-v2';
  const queryParams = { reqNum };
  const response = await APIRequest({ url, queryParams });
  return response;
}
const validateCompanyFunc = async (CRNumber) => {
  const url = "taheel-apis-utilities-validateCompany-v2"
  const requestBody = {
    CRNumber: CRNumber,
  };
  const response = await APIRequest({ url, requestBody });
  return response;
}
const getCentersForFinalNoExpired = async (userEmail, isWorkSuspended, validCentersOnly, centerTypes) => {
  const url = 'taheel-apis-records-getCenters-v2';
  const queryParams = { userEmail, isExpired: false, isEligibleForFinal: true, licenseType: "2", isWorkSuspended, validCentersOnly: validCentersOnly };
  const requestBody = { centerTypes }
  const response = await APIRequest({ requestBody, url, queryParams });
  return response;
};

const getMunicipalLicenseNoApi = async (CRNumber) => {
  const url = 'tt-api-utilities-getmomralicense';
  const requestBody = { CrNumber: CRNumber };
  const response = await APIRequest({ url, requestBody });
  return response;
};

const CentertDetails = async (licenseNumber) => {
  const url = "taheel-apis-records-CentertDetails-v2"
  const queryParams = { licenseNumber };
  const response = await APIRequest({ url, queryParams });
  return response;
}
const deleteDraftFunc = async ({ requestNum, email }) => {
  const url = 'taheel-apis-services-DeleteTempLicenseDraft';
  const requestBody = {
    requestNumber: requestNum,
    userCreationEmail: email,
  };
  const response = await APIRequest({ requestBody, url });
  return response;
};

const validateCitizenFunc = async ({ idNumber, birthDate, checkGovermental, errorOnExist, typeUniquenessCheck, checkIfWorksInPrivateSector }) => {
  const url = 'taheel-apis-utilities-validateCitizen-v3';
  birthDate = !birthDate?.includes('/') ? birthDate : moment(birthDate, 'iDD/iMM/iYYYY').format('YYYYMMDD')
  const requestBody = {
    IDNo: idNumber,
    checkIfWorksInPrivateSector,
    HijriDateOfBirth: birthDate,
    checkGovermental: checkGovermental,
    errorOnExist: errorOnExist,
    typeUniquenessCheck: typeUniquenessCheck
  };
  const response = await APIRequest({ requestBody, url });
  return response;
};


const getCentersAPI = async ({
  centerName,
  licenseType,
  isExpired,
  isFinal,
  isEligibleForFinal,
  forRenewal,
  startIndex,
  getProgramCount,
  batchSize,
  isWorkSuspended,
  validCentersOnly,
  centerTypes,
  requestTypeIdsToSkip }) => {
  const url = 'taheel-apis-records-getCenters-v2';
  const queryParams = {
    centerName, //returns centers that contains 
    licenseType, // temp/final (1/2)
    isExpired, // less than 180 day
    isEligibleForFinal, //temp not expired 
    forRenewal, //expired final 
    isFinal,//get only final licenses
    startIndex, //
    batchSize, //
    isWorkSuspended,//to get suspened center 
    getProgramCount, //
    validCentersOnly,  // 
  };
  const requestBody = {
    requestTypeIdsToSkip,
    centerTypes
  }
  const response = await APIRequest({ url, queryParams, requestBody });
  return response;
};


const getTerms = async ({ centerType, requestTypeID }) => {
  const url = "taheel-apis-services-PledgeAndAgreement-v2"
  const queryParams = {
    centerCategory_r: centerType,
    requestTypeID: requestTypeID
  }
  const requestBody = {

  }
  const response = await APIRequest({ url, queryParams, requestBody });
  return response;
}
export {
  getMyTasksFun,
  getCentersAPI,
  cancelTCRequest,
  getRequestDetails,
  getCentersForFinalNoExpired,
  getTaheelRequestsFun,
  validateCompanyFunc,
  getMunicipalLicenseNoApi,
  CentertDetails,
  deleteDraftFunc,
  validateCitizenFunc,
  getTerms
};
