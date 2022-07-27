import moment from 'moment-hijri';
import { i18next } from 'src/Core/Contexts/Translate/i18nextInit';
import Common_ar from 'src/Core/Contexts/Translate/Languages/ar/Common.json';
import Common_en from 'src/Core/Contexts/Translate/Languages/en/Common.json';
import { OWNER_TYPE } from './enums';
import { getCurrentUser } from './UserLocalStorage';
moment.locale('ar-SA');

const staffTypes = [
  '',
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
const reIntilizeCommon = () => {
  i18next.changeLanguage("ar")

}

const setCommonFile = (arJson, enJson, pageName = "service") => {
  const lang = localStorage.getItem("lang") || 'ar'
  arJson = !!arJson && arJson !== "undefined" ? arJson : {}
  enJson = !!enJson && enJson !== "undefined" ? enJson : {}

  i18next.addResourceBundle("ar_" + pageName, "common", { ...Common_ar, ...arJson })
  i18next.addResourceBundle("en_" + pageName, "common", { ...Common_en, ...enJson })
  i18next.changeLanguage(lang + "_" + pageName)
}

const { DOB } = getCurrentUser();

const dateFormatter = (
  date,
  formate = 'iDD/iMM/iYYYY',
  formateTo = 'iYYYY/iMM/iD'
) => {
  console.log(`=========> dateFormattter: ${date}`)
  return moment(date, formate).format(formateTo);
};

const cleanArabicText = (rawArabicText) => {
  return rawArabicText.replace(/([\u0622\u0623\u0625])/g, 'ا')
    .replace(/([\u0629])/g, 'ه')
    .replace(/([\u0624])/g, 'و')
    .replace(/([\u0626])/g, 'ي')
    .replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g, '')
}

const containsOnlynumber = (e) => {
  var reg = new RegExp('^[0-9]*$');
  if (reg.test(e.key) == false) {
    e.preventDefault()
  }

}

const reverseRange = (s) => {
  const range = s.trim().split('-')
  return `${range[0]} - ${range[1]}`;
}

const getDocId = (docs) => {
  if (!!docs) {
    if (docs.length > 0) {
      if (
        !!docs?.Document?.id ||
        !!docs?.Document?.map((d) => d?.id)[0] ||
        !!docs?.map((d) => d?.Document)[0] ||
        !!docs?.map((d) => d?.Document?.id)[0] ||
        !!docs?.id
      ) {
        return (
          [docs?.Document?.id] ||
          docs?.Document?.map((d) => d?.id) ||
          docs?.map((d) => d?.Document) ||
          docs?.map((d) => d?.Document?.id) || [docs?.id]
        );
      } else if (!!docs[0] && docs[0] != '') {
        return [docs];
      } else {
        return null;
      }
    } else if (!!docs?.id) {
      return [docs.id];
    } else if (!!docs?.ID) {
      return [docs.ID];
    } else if (docs != '') {
      return [docs];
    } else {
      return null;
    }
  }
  return null;
};
const getWorkingHours = (time) => {
  if (!!time && typeof time === 'object' && Object.keys(time).length > 0) {
    let result = ' من ';
    result += time?.from?.hour;
    result += ':';
    result += time?.from?.minute;
    result += ' إلى ';
    result += time?.to?.hour;
    result += ':';
    result += time?.to?.minute;

    return result;
  } else {
    if (typeof time === 'string') {
      return time;
    } else {
      return null;
    }
  }
};
const getDateFromObject = ({ date, req }) => {
  if (typeof date === 'string') {
    return getDateFromString(date, 'iYYYYiMMiDD', req);
  }
  if (date?.year && date?.month && date?.day) {
    if (date?.day < 10) {
      date.day = '0'.concat(date?.day);
    }
    if (date?.day?.length > 2) {
      date.day = date?.day.substring(date?.day.length - 2, date?.day.length);
    }

    if (date?.month < 10) {
      date.month = '0'.concat(date?.month);
    }
    if (date?.month?.length > 2) {
      date.month = date?.month.substring(
        date?.month.length - 2,
        date?.month.length
      );
    }

    return moment(
      ''.concat(date?.year).concat(date?.month).concat(date?.day),
      'iYYYYiMMiDD'
    ).format(req);
  } else {
    return date?.year + date?.month + date?.day;
    // return null
  }
};
const getDateFromString = (date, format, req) => {
  console.log(`extractDate extractDateToObject=============================> dateObject ${date}`);

  if (typeof date === 'string' && date.indexOf('/') > -1) {
    return date;
  } else if (!date) {
    return null;
  }
  return moment(date, format).format(req);
};
const extractDateToObject = (dateObject, format = 'iYYYYiMMiDD') => {
  format = format.replaceAll("i", "")
  console.log(`extractDate extractDateToObject=============================> dateObject ${dateObject}`);
  console.log(`format extractDateToObject=============================>format ${format}`);
  const expDate = {};
  if (!!dateObject) {
    let returned = moment(dateObject, format).format('DD');
    console.log(`format extractDateToObject=============================>DD returned =`, returned);
    if (!isNaN(returned)) {
      expDate.day = returned
    }

    returned = moment(dateObject, format).format('MM');
    console.log(`format extractDateToObject=============================>MM returned =`, returned);
    if (!isNaN(returned)) {
      expDate.month = returned
    }
    returned = moment(dateObject, format).format('YYYY');
    console.log(`format extractDateToObject=============================>YYYY returned =`, returned);
    if (!isNaN(returned)) {
      expDate.year = returned
    }
  }
  console.log(
    `expDate =============================> ${JSON.stringify(expDate)}-------    ${expDate.month < 10}`
  );
  console.log(`format extractDateToObject=============================>expDate =`, expDate);

  return expDate;
};

const getOwnerDetails = (details) => {
  const center = details?.center;
  const centerOwner = center?.centerOwner_r;

  //details.requestType = details.requestType || centerOwner?.ownerType
  if (centerOwner?.ownerType === OWNER_TYPE.LEGAL_TYPE) {
    details.entityName = centerOwner.ownerName;
    details.CRNumber = centerOwner.ownerID;
    details.commissionerMobNum = centerOwner.ownerPhoneNumber;
    details.DOB = null;
    delete details?.center?.centerOwner_r?.ownerName;
    delete details?.center?.centerOwner_r?.ownerID;
    delete details?.center?.centerOwner_r?.ownerPhoneNumber;
    delete details?.mobileNo;
    delete details?.birthDate;
  }
  if (centerOwner?.ownerType === OWNER_TYPE.NATURAL_TYPE) {
    details.birthDate = DOB;
    details.DOB = DOB;
    details.ownerName = details?.ownerName || center?.centerOwner_r?.ownerName;
    details.ownerID = details?.ownerID || center?.centerOwner_r?.ownerID;
    details.mobileNo = details?.ownerPhoneNumber || center?.centerOwner_r?.ownerPhoneNumber;
  }

  return details;
};
const requestTypes = [
  {
    value: 0,
    name: 'إظهار الجميع'
  },
  {
    value: 1,
    name: 'موافقة مبدئية'
  }, {
    value: 2,
    name: 'إنشاء ترخيص'
  },
  {
    value: 3,
    name: 'تجديد رخصة '
  },
  {
    value: 4,
    name: 'نقل مقر مركز'
  },
  {
    value: 5,
    name: 'نقل ملكية'
  }
  ,
  {
    value: 6,
    name: 'برامج مراكز'
  },
  {
    value: 7,
    name: 'إلغاء موافقة مبدئية'
  },
  {
    value: 12,
    name: 'إلغاء ترخيص'
  },
  {
    value: 14,
    name: 'التسجيل في برنامج تحمل الدولة للرسوم'
  },
  {
    value: 18,
    name: 'إلغاء طلب الانضمام إلى برنامج تحمل الدولة للرسوم'
  },



];
const requestStatus = [
  {
    value: 0,
    name: 'إظهار الجميع'
  },
  {
    value: 1,
    name: 'تحت الإجراء'
  }, {
    value: 2,
    name: 'مقبول'
  },
  {
    value: 3,
    name: ' ملغي أو مرفوض'
  },
  {
    value: 4,
    name: 'مسودة'
  },
  {
    value: 5,
    name: 'معاد'
  }

]
export {
  getDateFromObject,
  dateFormatter,
  cleanArabicText,
  containsOnlynumber,
  reverseRange,
  requestStatus,
  requestTypes,
  extractDateToObject,
  getDocId,
  getDateFromString,
  getWorkingHours,
  getOwnerDetails,
  setCommonFile,
  reIntilizeCommon,
  staffTypes
};

