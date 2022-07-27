/* eslint-disable */
import {
  APIRequest,
  downloadFileAPI,
  uploadFileAPI
} from 'src/Core/API/APIRequest';
import { LICENSE_FORM_TYPES } from 'src/Core/Utils/enums';
import { getWorkingHours } from 'src/Core/Utils/TaheelUtils';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';

const getFurnitures = (values) => {
  const furnitures = [];
  values.Furniture &&
    [].concat(values.Furniture).map((docId, index) => {
      furnitures.push({ Document: docId?.id ? docId.id : docId });
    });
  if (!!furnitures[0]) {
    return furnitures;
  }
  else return null
};
const getStaff = (values) => {
  const staffTypesNo = {};
  const newKeys = {
    id: 'id',
    iqamaNo: 'iqamaNo',
    idNumber: 'idNumber',
    idNumIqamaNum: 'idNumIqamaNum',
    day: 'birthDate',
    fullName: 'name',
    gender: 'gender',
    nationality: 'nationality',
    staffTypes: 'StaffType',
    cv: 'CV',
    EducationalQualification: 'educationQualifications',
    MedicalPractice: 'professionalLicense',
    sponsorName: 'sponsorName'
  };

  const staffTypes = [
    'معلم تربية خاصة',
    'أخصائي اجتماعي',
    'مراقب اجتماعي',
    'حارس',
    'عامل تنظيفات',
    'مشرف فني عام',
    'اخصائي نفسي و توجيه اجتماعي',
    'عامل رعاية شخصية',
    'مدير',
    'سائق',
    'مرافق سائق',
    'أخصائي علاج طبيعي',
    'أخصائي علاج وظيفي',
    'أخصائي نطق و تخاطب',
    'ممرض'
  ];
  staffTypes.map((staffType, index) => {
    staffTypesNo[staffType] = index + 1;
  });

  var staff = JSON.parse(
    JSON.stringify(values.customers ? values.customers : [])
  );
  staff.map((customer) => {
    Object.keys(customer).map((key) => {
      const newKey = newKeys[key] || key;
      if (key === 'gender')
        customer[newKey] = customer[key] === 'إناث' ? 'f' : 'm';
      else if (key === 'idNumber' || key === 'iqamaNo') {
        customer[newKey] =
          customer.idNumber === undefined || !customer.idNumber
            ? customer.iqamaNo
            : customer.idNumber;
        customer['idNumIqamaNum'] =
          customer.idNumber === undefined || !customer.idNumber
            ? customer.iqamaNo
            : customer.idNumber;
      } else if (key === 'staffTypes')
        customer[newKey] = staffTypesNo[customer[key]];
      else if (key === 'day' || key === 'month' || key === 'year') {
        customer[newKey] = customer.birthDate;
        delete customer?.day;
        delete customer?.month;
        delete customer?.year;
      } else if (
        ['MedicalPractice', 'EducationalQualification', 'cv'].includes(key)
      ) {
        customer[newKey] = !!customer[key] ? customer[key][0] || customer[key] : null;
      } else customer[newKey] = customer[key];
      if (!customer[newKey] || newKey !== key) delete customer[key];
      if (!Object.values(newKeys).includes(key)) delete customer[key];
    });
  });
  return staff;
};

const updateFinalLicenseAPIFunc = async (
  values,
  actionType,
  TaskID,
  isDraft,
  reqNum
) => {
  console.log('sssssssssssssssssssssssssssssssssssssssssssdddddd       ::', actionType);
  let staff = [];
  if (values.type === '01') {
    staff = getStaff(values);
  } else {
    staff = {
      gender: values?.gender === 'ذكور' ? 'm' : 'f',
      birthDate: values?.birthDate,
      nationality: values?.idNumber?.charAt(0) === '1' ? 'سعودي' : 'غير سعودي',
      sponsorName: '',
      name: values?.fullName,
      idNumIqamaNum: values?.idNumber,
      StaffType: 9,
      CV: values?.CV && values?.CV[0],
      educationQualifications: values?.educationalQualifications && values?.educationalQualifications[0],
      medicalReport: values?.medicalReport && values?.medicalReport[0],
      firstAidCourseCompletionCertificate: values?.firstAidCourseCompletionCertificate && values?.firstAidCourseCompletionCertificate[0],
      childhoodTrainingCertificate: values?.childhoodTrainingCertificate && values?.childhoodTrainingCertificate[0],

    };
  }
  console.log('thiisss expire::',
    values?.fireDepartmentLicenseExpiryDate?.year + '' + values?.fireDepartmentLicenseExpiryDate?.month + '' + values?.fireDepartmentLicenseExpiryDate?.day + '')
    ;
  const requestBody = {
    staff: [].concat(staff),
    requestNumber: '',
    isDraft: false,
    draft_values: [],
    userCreationEmail: getCurrentUser().email,

    center: {
      workingPeriod: values?.workingHours,
      workingHours: getWorkingHours(values?.centerWorkingHours) || values?.workingHours,
      centerWorkingHours: values?.centerWorkingHours,
      centerLicense_r: {
        LicenseNumber: values?.centerLicenseNumber
      },
      centerLocation_r: {
        city: values?.city,
        area: values?.sub,
        street: values?.street,
        buildNo: values?.buildNo,
        postalCode: values?.postalCode,
        additionalNo: values?.additionalNo,
        lat: values?.lat,
        lng: values?.lng
      },
      crInfo_r: {
        ID: values.crInfo_r?.ID,
        idNumIqamaNum: values.idNumber,
        crNumber: values.CRNumber,
        crActivityType: values.activities,
        commissionerMobNum: '',
        entityName: values.companyName,
        MoMRA_Licence: values.municipLicenseNo,
        crIssueDate: values.crIssueDate,
        crExpirationDate: values.crExpirationDate
      },
      centerInfo_r: {
        ID: values?.centerInfo_r?.ID,
        engineeringPlan:
          (values?.officeReport && values?.officeReport?.id) ||
          values?.officeReport,
        buildingScheme: values.buildingScheme &&
          (values.buildingScheme[0]?.id || values.buildingScheme[0]),
        fireDepartmentLicense: values?.fireDepartmentLicense && values?.fireDepartmentLicense[0],
        expirarionDateForFireDepartmentLicenseHijri:
          values?.fireDepartmentLicenseExpiryDate?.year + '' + values?.fireDepartmentLicenseExpiryDate?.month + '' + values?.fireDepartmentLicenseExpiryDate?.day + '',


        titleDeedOrLeaseContract: values?.titleDeedOrLeaseContract && values?.titleDeedOrLeaseContract[0],
        buildingArea: values.buildingArea,
        basementArea: values.basementArea,
        carryingnumber: values.capacity,
        financialGuarantee:
          !!values?.financialGuarantee &&
          values.financialGuarantee?.toString()?.substring(
            0,
            values.financialGuarantee?.length - 5 //should check this !
          ),
        financialGuarbteeAtt:
          values.financialGuaranteeAtt &&
          (values.financialGuaranteeAtt[0]?.id ||
            values.financialGuaranteeAtt[0]),
            
                  centerOperatingLetterFromTheEmployer:
            values.centerOperatingLetterFromTheEmployer &&
            (values.centerOperatingLetterFromTheEmployer[0]?.id ||
              values.centerOperatingLetterFromTheEmployer[0]),
              
        executivePlan:
          values.executivePlan &&
          (values.executivePlan[0]?.id || values.executivePlan[0]),
        operationPlan:
          values.operationPlan &&
          (values.operationPlan[0]?.id || values.operationPlan[0]),
        engineeringPlan:
          values.officeReport &&
          (values.officeReport[0]?.id || values.officeReport[0]),
        securityReport:
          values.securityReport &&
          (values.securityReport[0]?.id || values.securityReport[0]),
        beneficiaryCount: values.beneficiariesNum,
        furniturePhoto_r: getFurnitures(values)
      },
      centerOwner_r: {
        centerOwnerEducationQualification: values.ownerEducationalQualifications && values?.ownerEducationalQualifications[0],
      },
      isHealthCareServices: values.healthServices === 'yes' ? true : false,
      healthCareServices_r: {
        ID: values.healthCareServices_r,
        type: values.healthServices === 'yes' ? values.healthServiceType : null,
        attachment:
          values.healthServices === 'yes'
            ? (values?.healthServiceAttachment[0]?.id || values?.healthServiceAttachment[0])
            : null
      }
    }

    ////////////////////////////////////////////////////////
  };

  let url = 'taheel-apis-services-createFinalLicense-v2';
  requestBody.requestNumber = reqNum ? reqNum : null;

  if (isDraft) {
    requestBody.isDraft = true;
    requestBody.draft_values = values;
    if (!!values.renewal) {
      url = 'taheel-apis-services-renewLicenseV2';
    }
  } else {
    if (!!values.renewal && actionType !== LICENSE_FORM_TYPES.EDIT) {
      url = 'taheel-apis-services-renewLicenseV2';
    } else if (actionType === LICENSE_FORM_TYPES.EDIT) {
      requestBody.externalUserTaskID = TaskID;
      requestBody.cancel = 'false';
      url = 'taheel-apis-services-continueFinalLicense-v2';
    }
  }
  console.log("requestBody ====> ", requestBody)
  const response = await APIRequest({ requestBody, url });
  // const response = { isSuccessful: false, message: "DUMMY" };
  return response;
};

const getCentersForFinal = async (userEmail) => {
  const url = 'taheel-apis-records-getCenters-v2';
  const queryParams = {
    userEmail,
    forRenewal: true,
    isEligibleForFinal: true,
    licenseType: '2'
  };
  const response = await APIRequest({ url, queryParams });
  return response;
};
const getCentersForFinalNoExpired = async (userEmail) => {
  const url = 'taheel-apis-records-getCenters-v2';
  const queryParams = {
    userEmail,
    isExpired: false,
    isEligibleForFinal: true,
    licenseType: '2'
  };
  const response = await APIRequest({ url, queryParams });
  return response;
};

const getTempLicense = async (userEmail, centerTypes) => {
  const url = 'taheel-apis-records-getCenters-v2';
  const queryParams = {
    userEmail,
    isExpired: false,
    licenseType: '1',
    isEligibleForFinal: true
  };
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
// const getCenterManagerInfoApi = async (idNumber, birthDate) => {
//   const url = 'taheel-apis-utilities-validateCitizen-v3';
//   const requestBody = { IDNo: idNumber, HijriDateOfBirth: birthDate };
//   const response = await APIRequest({ url, requestBody });
//   return response;
// };

const validateCompanyFunc = async (CRNumber, comIqamaNum, validateUniqueness) => {
  const url = 'taheel-apis-utilities-validateCompany-v2';
  const requestBody = {
    CRNumber: CRNumber,
    crCommissionerNatId: comIqamaNum ?? '',
    validateUniqueness
  };
  const response = await APIRequest({ url, requestBody });
  return response;
};

const calculation = async (buildingArea, basementArea) => {
  const url = 'taheel-apis-utilities-CarryingCapacityAndFinancialGuarantee';
  const requestBody = {
    buildingArea: buildingArea,
    basementArea: basementArea
  };
  const response = await APIRequest({ url, requestBody });
  return response;
};



const TaskDetails = async (taskID) => {
  const url = 'taheel-apis-utilities-GetExternalUserTaskDetails-v2';
  const queryParams = { taskID };
  const response = await APIRequest({ url, queryParams });
  return response;
};

const DraftDetails = async (reqNum) => {
  const url = 'taheel-apis-records-RequestDetails-v2';
  const queryParams = { reqNum };
  const response = await APIRequest({ url, queryParams });
  return response;
};

const uploadDocumentApi = async (name, image) => {
  const url = 'taheel-apis-utilities-uploadDocument-v2';
  const requestBody = {
    src: image
  };
  const response = await uploadFileAPI(requestBody, name);
  return response;
};

const downloadDocument = async (DocID, attachment, name) => {
  const url = 'taheel-apis-utilities-downloadDocument-v2';
  const fileName = `${name}`;
  const queryParams = {
    DocID: DocID,
    attachment: attachment
  };
  let response = { isSuccessful: true };

  try {
    response = await downloadFileAPI({ url, queryParams, fileName })
  } catch (err) {
    response = { isSuccessful: false }
  }

  return response;
};

export {
  getCentersForFinal,
  validateCompanyFunc,
  getCentersForFinalNoExpired,
  updateFinalLicenseAPIFunc,
  calculation,
  uploadDocumentApi,
  getTempLicense,
  getMunicipalLicenseNoApi,
  downloadDocument,
  TaskDetails,
  DraftDetails,
  // getCenterManagerInfoApi
};

