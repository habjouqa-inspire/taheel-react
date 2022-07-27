import moment from 'moment-hijri';
import { checkIsNumber } from 'src/Core/Utils/inputValidator';
moment.locale('ar-SA');

const required = 'هذا الحقل مطلوب';
const FielsRequired = 'يرجى إرفاق هذا الملف';
const InvalidDate = 'تاريخ غير صالح';
const OldDate = 'لا يمكن أن يكون تاريخ الإنتهاء قبل تاريخ اليوم';


const CapacityDataValidation = (values) => {
  var msg = {};
  msg.fireDepartmentLicenseExpiryDate = {}

  let hijriDate = moment(
    `${values?.fireDepartmentLicenseExpiryDate?.year} / ${values?.fireDepartmentLicenseExpiryDate?.month} / ${values?.fireDepartmentLicenseExpiryDate?.day}`,
    'iYYYY/iM/iD'
  );
  let enteredDate = moment(hijriDate).format('iYYYY/iM/iD');

  if (!values.fireDepartmentLicense || !values.fireDepartmentLicense[0])
    msg.fireDepartmentLicense = FielsRequired;

  if (!values.engineeringPlan || !values.engineeringPlan[0])
    msg.engineeringPlan = FielsRequired;

  if (!values.Furniture || !values.Furniture[0]) msg.Furniture = FielsRequired;

  if (!values.momraDoc || !values.momraDoc[0])
    msg.momraDoc = FielsRequired;


    // date validation
    if (!values.fireDepartmentLicenseExpiryDate?.day) {
      msg.fireDepartmentLicenseExpiryDate.day = required;
    }
    if (!values.fireDepartmentLicenseExpiryDate?.month) {
      msg.fireDepartmentLicenseExpiryDate.month = required;

    }
    if (!values.fireDepartmentLicenseExpiryDate?.year) {
      msg.fireDepartmentLicenseExpiryDate.year = required;

    }
    /////////////////////////////////////////////////

    if (!hijriDate.isValid() && !!values?.fireDepartmentLicenseExpiryDate?.day && !!values?.fireDepartmentLicenseExpiryDate?.month && !!values?.fireDepartmentLicenseExpiryDate?.year) {
      msg.fireDepartmentLicenseExpiryDate.day = InvalidDate;
      msg.fireDepartmentLicenseExpiryDate.month = InvalidDate;
      msg.fireDepartmentLicenseExpiryDate.year = InvalidDate;
      return msg;
      // console.log(
      //   ` hijriDate ================> ${values?.fireDepartmentLicenseExpiryDate?.year} / ${values?.fireDepartmentLicenseExpiryDate?.month} / ${values?.fireDepartmentLicenseExpiryDate?.day}`
      // );
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year < parseInt(moment().format('iYYYY'))) {
      msg.fireDepartmentLicenseExpiryDate.year = OldDate;
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year == parseInt(moment().format('iYYYY'))) {
      if (values?.fireDepartmentLicenseExpiryDate?.month < parseInt(moment().format('iMM'))) {
        msg.fireDepartmentLicenseExpiryDate.month = OldDate;
      }
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year == parseInt(moment().format('iYYYY'))) {
      if (values?.fireDepartmentLicenseExpiryDate?.month == parseInt(moment().format('iMM'))) {
        if (values?.fireDepartmentLicenseExpiryDate?.day < parseInt(moment().format('iDD'))) {
          msg.fireDepartmentLicenseExpiryDate.day = OldDate;
        }
      }
    }

    if (!msg.fireDepartmentLicenseExpiryDate.day && !msg.fireDepartmentLicenseExpiryDate.month && !msg.fireDepartmentLicenseExpiryDate.year)
      delete msg.fireDepartmentLicenseExpiryDate

  /*
  
  
  if (moment(enteredDate).isBefore(currentDate)) {
    msg.day = OldDate;
    msg.month = OldDate;
    msg.year = OldDate;
  }*/

  return msg;
};



const AttachementValidation = (values) => {
  var msg = {};
  msg.fireDepartmentLicenseExpiryDate = {}

  let currentDate = moment().format('iYYYY/iM/iD');
  let hijriDate = moment(
    `${values?.fireDepartmentLicenseExpiryDate?.year} / ${values?.fireDepartmentLicenseExpiryDate?.month} / ${values?.fireDepartmentLicenseExpiryDate?.day}`,
    'iYYYY/iM/iD'
  );
  let enteredDate = moment(hijriDate).format('iYYYY/iM/iD');

  if (!values.fireDepartmentLicense || !values.fireDepartmentLicense[0])
    msg.fireDepartmentLicense = FielsRequired;

  if (!values.engineeringPlan || !values.engineeringPlan[0])
    msg.engineeringPlan = FielsRequired;

  // if (!values.Furniture || !values.Furniture[0]) msg.Furniture = FielsRequired;

  if (!values.momraDoc || !values.momraDoc[0])
    msg.momraDoc = FielsRequired;


    // date validation
    if (!values.fireDepartmentLicenseExpiryDate?.day) {
      msg.fireDepartmentLicenseExpiryDate.day = required;
    }
    if (!values.fireDepartmentLicenseExpiryDate?.month) {
      msg.fireDepartmentLicenseExpiryDate.month = required;

    }
    if (!values.fireDepartmentLicenseExpiryDate?.year) {
      msg.fireDepartmentLicenseExpiryDate.year = required;

    }
    /////////////////////////////////////////////////

    if (!hijriDate.isValid() && !!values?.fireDepartmentLicenseExpiryDate?.day && !!values?.fireDepartmentLicenseExpiryDate?.month && !!values?.fireDepartmentLicenseExpiryDate?.year) {
      msg.fireDepartmentLicenseExpiryDate.day = InvalidDate;
      msg.fireDepartmentLicenseExpiryDate.month = InvalidDate;
      msg.fireDepartmentLicenseExpiryDate.year = InvalidDate;
      return msg;
      // console.log(
      //   ` hijriDate ================> ${values?.fireDepartmentLicenseExpiryDate?.year} / ${values?.fireDepartmentLicenseExpiryDate?.month} / ${values?.fireDepartmentLicenseExpiryDate?.day}`
      // );
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year < parseInt(moment().format('iYYYY'))) {
      msg.fireDepartmentLicenseExpiryDate.year = OldDate;
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year == parseInt(moment().format('iYYYY'))) {
      if (values?.fireDepartmentLicenseExpiryDate?.month < parseInt(moment().format('iMM'))) {
        msg.fireDepartmentLicenseExpiryDate.month = OldDate;
      }
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year == parseInt(moment().format('iYYYY'))) {
      if (values?.fireDepartmentLicenseExpiryDate?.month == parseInt(moment().format('iMM'))) {
        if (values?.fireDepartmentLicenseExpiryDate?.day < parseInt(moment().format('iDD'))) {
          msg.fireDepartmentLicenseExpiryDate.day = OldDate;
        }
      }
    }

    if (!msg.fireDepartmentLicenseExpiryDate.day && !msg.fireDepartmentLicenseExpiryDate.month && !msg.fireDepartmentLicenseExpiryDate.year)
      delete msg.fireDepartmentLicenseExpiryDate

  /*
  
  
  if (moment(enteredDate).isBefore(currentDate)) {
    msg.day = OldDate;
    msg.month = OldDate;
    msg.year = OldDate;
  }*/

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

  if (!!values.additionalNo && !checkIsNumber(values.additionalNo)) {
    msg.additionalNo = 'يجب أن يحتوي الرقم الإضافي على ارقام فقط';
  } else if (!!values.additionalNo && values?.additionalNo?.length != 4) {
    msg.additionalNo = 'يجب أن يحتوي الرقم الإضافي على 4 خانات';
  }

  return msg;
};

export { AttachementValidation, NewAddressValidation, CapacityDataValidation };

