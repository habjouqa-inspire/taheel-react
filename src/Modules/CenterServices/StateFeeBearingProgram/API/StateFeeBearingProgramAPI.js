/* eslint-disable */
import { APIRequest } from 'src/Core/API/APIRequest';



const stateFeeBearingProgramAPI = async (values, email, serviceStatus, isDraft) => {
  const requestBody = {
    serviceStatus: serviceStatus,
    externalUserTaskID: '',
    isDraft: isDraft,
    userCreationEmail: email,
    center: {
      centerLicense_r: {
        LicenseNumber: values?.centerLicenseNumber,
      },
      centerInfo_r: {
        carryingnumber: values?.capacity,
        estimatedCapacity: values?.center?.centerInfo_r?.estimatedCapacity,
        executivePlan: values?.executivePlan,
        beneficiaryCount: values?.beneficiariesNum,
        engineeringPlan: values?.engineeringPlan,
      },
      crInfo_r: {
        ID: values?.center?.ID,
        crNumber: values?.CRNumber,
        crActivityType: values?.activities,
        entityName: values?.companyName,
        MoMRA_Licence: values?.municipLicenseNo,
        crIssueDate: values?.crIssueDate,
        crExpirationDate: values?.crExpirationDate
      },
      centerLocation_r: {},
      isHealthCareServices: true,
      healthCareServices_r: {
        type: values?.healthServiceType || values?.newHealthServiceType,
        attachment: values?.healthServiceAttachment || values?.newHealthServiceAttachment
      },
      StateFeeCenterTransport_r: {
        isTransportService: values?.transportationServices,
        NumOfVehicles: values?.numberOfVehicles,
        acceptanceRatio: values?.acceptanceRatio,
        formalLetter: '' || values?.formalLetter 
      },
      cancelStateFeeService_r: {
        isRegesteredStudents: '',
        isSuspention: ''

      },
    },
    staff: values?.customers

  }
  // requestBody.isHealthCareServices === "yes" ? requestBody.isHealthCareServices = true : requestBody.isHealthCareServices = false

  // if (!values?.isHealthCareServices && values?.healthServices != 'yes') {
  //   requestBody.isHealthCareServices = true
  // requestBody.healthCareServices_r={
  //type:values?.newHealthServiceType,
  //attachment : values?.newHealthServiceAttachment
  //}
  // }
  if (isDraft) {
    values.isDraft = true
    requestBody.draft_values = values
    requestBody.requestNumber = values.requestNum
  }
  console.log("AAAAAPI", requestBody)
  const url = 'taheel-apis-services-initiate-state-fee-center-request';
  const response = await APIRequest({ url, requestBody });
  return response;

};
const getTermsAndCondtions = async (licenseNumber, email) => {//only for state Fee service
  const url = 'taheel-apis-services-Generate-Pledge-State-Fee-Template';
  const requestBody = {
    licenseNumber: licenseNumber,
    userEmail: email,
    messageCode:"pledge-And-Agreement"
  };
  const response = await APIRequest({ requestBody, url });
  return response;
};



const calculation = async (actualBeneficiariesNum, acceptanceRatio) => {
  const url = 'taheel-apis-services-minimum-staff-type-calculation'
  const requestBody = {
    percentage: acceptanceRatio,
    beneficiaryCount: actualBeneficiariesNum
  }
  const response = await APIRequest({ url, requestBody });
  return response;

}

export {
  stateFeeBearingProgramAPI,
  getTermsAndCondtions,
  calculation
};
