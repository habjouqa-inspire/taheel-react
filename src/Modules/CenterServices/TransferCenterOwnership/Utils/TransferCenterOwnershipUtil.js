import moment from 'moment-hijri';
import { APIRequest } from 'src/Core/API/APIRequest';
import { checkIsNumber } from 'src/Core/Utils/inputValidator';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';

moment.locale('ar-SA');
const required = 'هذا الحقل مطلوب';
const FielsRequired = 'يرجى إرفاق هذا الملف';
const InvalidDate = 'تاريخ غير صالح';
const OldDate = 'لا يمكن أن يكون تاريخ الإنتهاء قبل تاريخ اليوم';
const canceltransferOwnershipRequest = async (externalUserTaskID, licenseNumber,type) => {
const {email}=getCurrentUser();
const url = '/taheel-apis-services-transfer-center-ownership';
  const requestBody = { 
    serviceStatus: 2,
    userCreationEmail:email,
     externalUserTaskID, 
     cancel: true,
      center: {
         centerLicense_r:{
           licenseNumber
          },
          type:type 
        } };
  const response = await APIRequest({ url, requestBody });
  return response;
}
const validateOtpFlag = async (externalUserTaskID, licenseNumber,type) => {
  const {email}=getCurrentUser();
  const url = '/taheel-apis-services-transfer-center-ownership';
    const requestBody = { 
      serviceStatus: 3,
      userCreationEmail:email,
       externalUserTaskID, 
       cancel: false,
        center: {
           centerLicense_r:{
             licenseNumber
            },
            type:type 
          } };
    const response = await APIRequest({ url, requestBody });
    return response;
  }
const CRNumberAndLicensesValidation = (values) => {
  var msg = { fireDepartmentExpD: {} };
  let hijriDate = moment(
    `${values.fireDepartmentExpD?.year} / ${values.fireDepartmentExpD?.month} / ${values.fireDepartmentExpD?.day}`,
    'iYYYY/iM/iD'
  );

  if (!values.CRNumber)
    msg.CRNumber = required;
  if (values.centerType === '01') {
    if (!values.engineeringPlan)
      msg.engineeringPlan = required;

    if (!values.fireDepartmentLicense)
      msg.fireDepartmentLicense = required;

    if (!values.fireDepartmentExpD.day) {
      msg.fireDepartmentExpD.day = required;
    }
    if (!values.fireDepartmentExpD.month) {
      msg.fireDepartmentExpD.month = required;
    }
    if (!values.fireDepartmentExpD.year) {
      msg.fireDepartmentExpD.year = required;
    }
    if (!hijriDate.isValid() && !!values.fireDepartmentExpD.day && !!values.fireDepartmentExpD.month && !!values.fireDepartmentExpD.year) {
      msg.fireDepartmentExpD.day = InvalidDate;
      msg.fireDepartmentExpD.month = InvalidDate;
      msg.fireDepartmentExpD.year = InvalidDate;
      console.log(
        ` hijriDate ================> ${values.fireDepartmentExpD.year} / ${values.fireDepartmentExpD.month} / ${values.fireDepartmentExpD.day}`
      );
    }
    if (values.fireDepartmentExpD.year < parseInt(moment().format('iYYYY'))) {
      msg.fireDepartmentExpD.year = OldDate;
    }
    if (values.fireDepartmentExpD.year == parseInt(moment().format('iYYYY'))) {
      if (values.fireDepartmentExpD.month < parseInt(moment().format('iMM'))) {
        msg.fireDepartmentExpD.month = OldDate;
      }
    }
    if (values.fireDepartmentExpD.year == parseInt(moment().format('iYYYY'))) {
      if (values.fireDepartmentExpD.month == parseInt(moment().format('iMM'))) {
        if (values.fireDepartmentExpD.day < parseInt(moment().format('iDD'))) {
          msg.fireDepartmentExpD.day = OldDate;
        }
      }
    }
  }

  /*
  
  
  if (moment(enteredDate).isBefore(currentDate)) {
    msg.day = OldDate;
    msg.month = OldDate;
    msg.year = OldDate;
  }*/
  if (!msg.fireDepartmentExpD.day && !msg.fireDepartmentExpD.month && !msg.fireDepartmentExpD.year)
    delete msg.fireDepartmentExpD
  return msg;
};

const NewAddressValidation = (values) => {
  var msg = {};
  const format = /[^a-zA-Z \u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]/;
  // const EnglishFormat = /[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]/;

  if (!values.sub) {
    msg.sub = required;
  } else if (format.test(values.sub)) {
    msg.sub = 'يجب أن يحتوي على أحرف فقط';
  }

  if (!values.city) {
    msg.city = required;
  } else if (format.test(values.city)) {
    msg.city = 'يجب أن يحتوي على أحرف فقط';
  }
  if (!values.street) {
    msg.street = required;
  } else if (format.test(values.street)) {
    msg.street = 'يجب أن يحتوي على أحرف فقط';
  }
  if (!values.buildNo) {
    msg.buildNo = required;
  } else if (!checkIsNumber(values.buildNo)) {
    msg.buildNo = 'يجب أن يحتوي رقم المبنى على ارقام فقط';
  } else if (values.buildNo.length != 4) {
    msg.buildNo = 'يجب أن يحتوي الرقم المبنى على 4 خانات';
  }

  if (!values.postalCode) {
    msg.postalCode = required;
  }

  if (!!values.additionalNo) {
    if (!checkIsNumber(values.additionalNo)) {
      msg.additionalNo = 'يجب أن يحتوي الرقم الإضافي على ارقام فقط';
    } else if (values?.additionalNo?.length != 4) {
      msg.additionalNo = 'يجب أن يحتوي الرقم الإضافي على 4 خانات';
    }
  }

  return msg;
};

const healthServicesValidation = values => {
  var msg = {}
  console.log(JSON.stringify(values))
  if (!values.healthServices)
    msg.healthServices = "يرجى تحديد ماأن كان المركز يقدم خدمات صحية ام لا";
  if (values.healthServices && values.healthServices === 'yes') {
    if (!values.healthServiceType)
      msg.healthServiceType = "يرجى تحديد نوع الخدمة الصحية";
    if (!values.healthServiceAttachment) {
      if (values.healthServiceType === 1)
        msg.healthServiceAttachment = " يرجى إرفاق رخصة وزارة الصحة";
      else
        msg.healthServiceAttachment = " يرجى إرفاق عقد الشراكة";
    }
  }
  return msg

}

const TransferOwnershipDataValidation = (values) => {
  var msg = {};
  if (!values.locationType) {
    msg.locationType = required;
  }
  if (!values.ContractOfSale || !values.ContractOfSale[0])
    msg.ContractOfSale = FielsRequired;

  if (!values.WaiverDeclaration || !values.WaiverDeclaration[0])
    msg.WaiverDeclaration = FielsRequired;

  return msg;

};

const getFurnitures = (values) => {
  const furnitures = []
  values.Furniture && values.Furniture.map((docId, index) => {
    furnitures.push({ Document: docId })
  })
  return furnitures
}
const getStaff = (values) => {

  const staffTypesNo = {}
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
    sponsorName: 'sponsorName',
  }

  const staffTypes = ["معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]
  staffTypes.map((staffType, index) => {
    staffTypesNo[staffType] = index + 1
  })



  var staff = JSON.parse(JSON.stringify(values?.customers ? values?.customers : []))

  staff.map((customer) => {
    Object.keys(customer).map((key) => {
      const newKey = newKeys[key] || key;
      if (key === 'gender')
        customer[newKey] = customer[key] === 'إناث' ? 'f' : 'm'
      else if (key === 'idNumber' || key === 'iqamaNo') {
        console.log(`--getStaff::customer.idNumber ${customer.idNumber}`);
        console.log(`--getStaff::customer.iqamaNo ${customer.iqamaNo}`);
        customer[newKey] = customer.idNumber === undefined || !customer.idNumber ? customer.iqamaNo : customer.idNumber;
        customer['idNumIqamaNum'] = customer.idNumber === undefined || !customer.idNumber ? customer.iqamaNo : customer.idNumber;
      }
      else if (key === 'staffTypes')
        customer[newKey] = staffTypesNo[customer[key]]
      else if (key === 'day' || key === 'month' || key === 'year') {
        customer[newKey] = customer.birthDate
        delete customer.day
        delete customer.month
        delete customer.year
      }
      else if (['MedicalPractice', 'EducationalQualification', 'cv'].includes(key)) {
        customer[newKey] = !!customer[key] ? customer[key][0] : null
      }
      else
        customer[newKey] = customer[key];
      if (!customer[newKey] || newKey !== key)
        delete customer[key]
      if (!Object.values(newKeys).includes(key))
        delete customer[key]
    })
  });
  return staff
}
export { TransferOwnershipDataValidation, getFurnitures,canceltransferOwnershipRequest,validateOtpFlag, CRNumberAndLicensesValidation, NewAddressValidation, healthServicesValidation, getStaff };

