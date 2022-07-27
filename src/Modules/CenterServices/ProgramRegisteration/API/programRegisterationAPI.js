import { APIRequest } from 'src/Core/API/APIRequest';

export const getCentersForRegisteration = async (
  userEmail,
  isEligibleForFinal,
  validCentersOnly
) => {
  const url = 'taheel-apis-records-getCenters-v2';
  const licenseType = '2';

  const getProgramCount = true;
  const queryParams = {
    userEmail,
    licenseType,
    getProgramCount,
    isEligibleForFinal,
    validCentersOnly
  };
  const requestBody = {
    requestTypeIdsToSkip: [6]
  }
  const response = await APIRequest({ url, queryParams, requestBody });
  return response;
};

export const getPrograms = async () => {
  const url = 'taheel-apis-utilities-get-lookups-v2';
  const requestBody = {
    dataArr: [1, 10]
  };
  const response = await APIRequest({ requestBody, url });
  return response;
};

export const programRegisterationRequest = async (values, email) => {
  const url =
    'taheel-apis-services-initiate-center-program-registration-request';
  console.log('testt program ID services');
  const requestBody = !values.isDraft
    ? {
      serviceStatus: values.returnedRequest ? 2 : 1,
      requestStatus: values.ProgramID ? 2 : 1,
      externalUserTaskID: values.externalUserTaskID,
      isDraft: values.isDraft,
      requestType: 1,
      userCreationEmail: email,
      center: {
        centerLicense_r: {
          LicenseNumber: values.licenseNumber
        }
      },
      centerMNprogram: {

        ID: values.ProgramID,
        program_r: values.program_r,
        programCategory_r: values.programType,
        programFee: values.registerationFees,
        accreditationDocument: values.programAccredditation
          ? values.programAccredditation[0]
            ? values.programAccredditation[0]
            : values.programAccredditation
          : null,
        isEnabled: true
      },
      centerOwnerActivities: values.activities
    }
    : {


      serviceStatus: 1,
      requestStatus: 1,
      isDraft: values.isDraft,
      requestType: 1,
      userCreationEmail: email,
      center: {
        centerLicense_r: {
          LicenseNumber: values.licenseNumber
        }
      },
      draft_values: { centerLicenseNumber: values.licenseNumber, ...values }
    };

  const response = await APIRequest({ requestBody, url });
  return response;
};
export const EnableOrDisableProgram = async (email, ID, licenseNumber) => {
  const url =
    'taheel-apis-services-initiate-center-program-registration-request';

  const requestBody = {
    serviceStatus: 1,
    requestStatus: 3,
    isDraft: false,
    userCreationEmail: email,
    center: {
      centerLicense_r: {
        LicenseNumber: licenseNumber
      }
    },
    centerMNprogram: {
      ID: ID
    },
    centerOwnerActivities: []
  };

  console.log('requestbodyNoooor---------------' + JSON.stringify(requestBody));
  const response = await APIRequest({ requestBody, url });
  return response;
};
export const getProgramDetails = async (licenseNum, programID) => {
  const url = 'taheel-apis-services-get-center-program';
  const queryParams = {
    licenseNum: licenseNum,
    centerMNprogramID: programID
  };
  const response = await APIRequest({ url, queryParams });
  return response;
};
export const GetRequestDetails = async (RequestNum, email) => {
  const url = 'taheel-apis-records-RequestDetails-v2';
  const queryParams = {
    reqNum: RequestNum,
    userEmail: email
  };
  const response = await APIRequest({ url, queryParams });
  return response;
};

export const getCenterPrograms = async (licenseNumber) => {
  const url = `taheel-apis-services-get-center-program?licenseNum=${licenseNumber}`;
  const response = await APIRequest({ url });
  return response;
};
export const cancelProgRequest = async (externalUserTaskID, licenseNumber) => {
  const url = `taheel-apis-services-initiate-center-program-registration-request`;
  const requestBody = {
    serviceStatus: 2,
    externalUserTaskID,
    cancel: true,
    center: {
      centerLicense_r:
      {
        licenseNumber: licenseNumber
      }
    }
  };

  const response = await APIRequest({ url, requestBody });
  return response;
};
