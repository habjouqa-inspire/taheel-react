/* eslint-disable */
import { APIRequest } from 'src/Core/API/APIRequest';
import { OWNER_TYPE } from 'src/Core/Utils/enums';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';

const createTempLicenseAPIFunc = async (values) => {
  const { email } = getCurrentUser();
  values.workingHours = values.workingHours === 0 ? null : values.workingHours
  const requestBody = {
    userCreationEmail: email,
    isDraft: values.isDraft,
    centerData: {
      name: values.centerName,
      type: values.centerType,
      targetedBeneficiary: values.targetedBenificiray,
      targetedServices: !!values.targetedServices && Array.isArray(values?.targetedServices) ? values.targetedServices.join(',') : values.targetedServices,
      workingHours: values.workingHours,
      targetedGender: values.targetedGender,
      ageGroup: values.ageGroup,
      centerInfo_r: {
        estimatedCapacity: values.centerCap
      },
      centerOwner_r: {
        ownerIDExpireDate:values?.ownerIDExpireDate||values.crExpiryDate,
        ownerName:
          values.requestType === OWNER_TYPE.NATURAL_TYPE ? values.ownerName : values.companyName,
        ownerType:
          values.requestType,
        ownerID: values.requestType === OWNER_TYPE.NATURAL_TYPE ? values.idNumber : values.CRNumber,
        ownerPhoneNumber:
          values.requestType === OWNER_TYPE.NATURAL_TYPE ? values.mobileNo : values.compMobileNo
      },
      centerLocation_r: {
        city: values.city,
        area: values.sub,
        street: values.street,
        buildNo: values.buildNo,
        postalCode: values.postalCode,
        additionalNo: values.additionalNo,
        lat: values.lat,
        lng: values.lng
      },
      centerLicense_r: {
        LicenseType: values.licenseType
      },
      questionnairesScore: values.questionnairesScore
    }
  };
  if (values.isDraft) {
    requestBody.requestNumber = values.requestNum ? values.requestNum : null;
    requestBody.draft_values = {
      ...values
    };
  }
  const url = 'taheel-apis-services-createTempLicense-v2';
  const response = await APIRequest({ requestBody, url });
  return response;
};
const validateCompanyFunc = async (crNumber) => {
  const url = 'taheel-apis-utilities-validateCompany-v2';
  const requestBody = { CRNumber: crNumber };
  const response = await APIRequest({ url, requestBody });
  return response;
};

const validateAPIFunc = async (values) => {
  const { requestType, licenseNumber, idNumber, birthDate } = values;
  console.log(`idNumber[0] ${idNumber[0]}`);
  const response = { isSuccessful: true, message: '' };

  if (idNumber[0] === '2' && requestType === OWNER_TYPE.NATURAL_TYPE) {
    return {
      isSuccessful: false,
      message:
        'عذرا لا يمكنك التقديم على هذه الخدمة حيث تشير سجلاتنا أن المتقدم غير سعودي/سعودية الجنسية'
    };
  }
  if (requestType === OWNER_TYPE.LEGAL_TYPE) {
    const validateCompRs = await validateCompanyFunc(licenseNumber);
    if (!validateCompRs.isSuccessful) {
      return { isSuccessful: false, message: validateCompRs.message };
    }
    const data = validateCompRs.responseBody.data;
    console.log(JSON.stringify(data));
    values.companyName = data.CRName;
  } else {
    const validateCitRs = await validateCitizenFunc({ idNumber: idNumber, birthDate: birthDate });
    if (!validateCitRs.isSuccessful) {
      return { isSuccessful: false, message: validateCitRs.message };
    }
    const data = validateCitRs.responseBody.data;
    console.log(JSON.stringify(data));
    const { firstName, secondName, thirdName, fourthName } = data.name;
    values.ownerName = `${firstName} ${secondName} ${thirdName} ${fourthName}`;
  }
  return response;
};

const getTermsAndCondtions = async (centerType, requestTypeID) => {
  const url = 'taheel-apis-services-PledgeAndAgreement-v2';
  const queryParams = {
    centerCategory_r: centerType,
    requestTypeID: requestTypeID
  };
  const response = await APIRequest({ queryParams, url });
  return response;
};
export const getLookups = async (value) => {
  const url = 'taheel-apis-utilities-get-lookups-v2';
  const requestBody = {
    dataArr: [value]
  };
  const response = await APIRequest({ requestBody, url });
  return response;
};

export const getquestionnairesData = async (
  centerType,
  targetedBeneficiary
) => {
  const url = 'taheel-apis-services-SelfAssesment-v2';
  const queryParams = {
    centerType,
    targetedBeneficiary
  };
  const response = await APIRequest({ queryParams, url });
  return response;
};

export {
  validateCompanyFunc,
  validateAPIFunc,
  createTempLicenseAPIFunc,
  getTermsAndCondtions
};

