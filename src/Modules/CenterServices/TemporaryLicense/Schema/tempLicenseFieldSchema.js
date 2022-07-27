import { OWNER_TYPE } from 'src/Core/Utils/enums';
import {
  checkIsfilled,
  checkIsNumber,
  checkMobilePattern
} from 'src/Core/Utils/inputValidator';
import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    label: {
      ar: 'صفة المالك ',
      en: 'Request Type'
    },
    name: 'requestType',
    type: 'Select',
    gridSize: '6',
    sectionName: 'CenterInfo',
    options: [
      { value: OWNER_TYPE.NATURAL_TYPE, label: { ar: ' طبيعية' } },
      { value: OWNER_TYPE.LEGAL_TYPE, label: { ar: ' اعتبارية' } }
    ],
    validators: [
      {
        id: 'requestType-required',
        isValidFun: checkIsfilled,
        alert: 'الرجاء إختيار صفة المالك'
      }
    ]
  },

  //Owner Info
  {
    id: uuid(),
    label: {
      ar: 'رقم الهوية',
      en: 'ID Number'
    },
    name: 'idNumber',
    type: 'Text',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    options: [],
    validators: [],
    dependOn: {
      fieldName: 'requestType',
      value: OWNER_TYPE.NATURAL_TYPE
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'تاريخ الميلاد',
      en: 'Birthdate'
    },
    name: 'birthDate',
    type: 'Text',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    options: [],
    validators: [],
    dependOn: {
      fieldName: 'requestType',
      value: OWNER_TYPE.NATURAL_TYPE
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'اسم مالك المركز',
      en: 'Owner Name'
    },
    name: 'ownerName',
    type: 'Text',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    options: [],
    validators: [
      {
        id: 'ownerName-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }
    ],
    dependOn: {
      fieldName: 'requestType',
      value: OWNER_TYPE.NATURAL_TYPE
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم الجوال',
      en: 'Mobile No.'
    },
    name: 'mobileNo',
    type: 'Text',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    options: [],
    validators: [
      {
        id: 'mobileNo-required',
        isValidFun: checkMobilePattern,
        alert: 'يرجى إدخال رقم جوال سعودي صحيح'
      }
    ],
    dependOn: {
      fieldName: 'requestType',
      value: OWNER_TYPE.NATURAL_TYPE
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'نوع الصفة الاعتبارية',
      en: 'License Type'
    },
    name: 'licenseType',
    type: 'Select',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    options: [
      { value: '1', label: { ar: 'سجل تجاري' } },
      { value: '2', label: { ar: 'رخصة استثمار اجنبي' } },
      { value: '3', label: { ar: 'شهادة تسجيل للجمعيات والمؤسسات الأهليه' } }
    ],
    validators: [
      {
        id: 'licenseType-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }
    ],
    dependOn: {
      fieldName: 'requestType',
      value: OWNER_TYPE.LEGAL_TYPE
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم السجل التجاري',
      en: 'CR Number'
    },
    name: 'CRNumber',
    type: 'Text',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    validators: [
      {
        id: 'CRNumber-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }
    ],
    dependOn: {
      fieldName: 'requestType',
      value: OWNER_TYPE.LEGAL_TYPE
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'اسم الكيان',
      en: 'companyName'
    },
    name: 'companyName',
    type: 'Text',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    options: [],
    validators: [
      {
        id: 'companyName-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }
    ],
    dependOn: {
      fieldName: 'requestType',
      value: OWNER_TYPE.LEGAL_TYPE
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم جوال المفوّض',
      en: 'compMobileNo'
    },
    name: 'compMobileNo',
    type: 'MobileNo',
    gridSize: '6',
    sectionName: 'OwnerInfo',
    options: [],
    validators: [
      {
        id: 'compMobileNo-required',
        isValidFun: checkMobilePattern,
        alert: 'يرجى إدخال رقم جوال سعودي صحيح'
      }
    ],
    dependOn: {
      fieldName: 'requestType',
      value: OWNER_TYPE.LEGAL_TYPE
    }
  },
  //===========
  // Center Info

  {
    id: uuid(),
    label: {
      ar: 'فئة المركز',
      en: 'centerType'
    },
    name: 'centerType',
    type: 'Select',
    gridSize: '6',
    sectionName: 'CenterInfo',
    validators: [
      {
        id: 'centerType-required',
        isValidFun: checkIsfilled,
        alert: 'الرجاء إختيار فئة المركز الأهلي'
      }
    ]
  },
  {
    id: uuid(),
    label: {
      ar: 'نوع المركز',
      en: 'Beneficiary Category'
    },
    name: 'targetedBenificiray',
    type: 'Select',
    gridSize: '6',
    sectionName: 'CenterInfo',
    validators: [
      {
        id: 'targetedBenificiray-required',
        isValidFun: checkIsfilled,
        alert: 'الرجاء إختيار نوع المركز الأهلي'
      }
    ]
    //dependOn: { fieldName: 'centerType', value: ['01', '02','03'] }
  },
  {
    id: uuid(),
    label: {
      ar: 'إختصاص المركز',
      en: 'targetedServices'
    },
    name: 'targetedServices',
    type: 'Select',
    gridSize: '6',
    sectionName: 'CenterInfo',
    validators: [
      {
        id: 'targetedServices-required',
        isValidFun: checkIsfilled,
        alert: 'الرجاء إختيار إختصاص المركز الأهلي'
      }
    ],
    dependOn: [
      { fieldName: 'centerType', value: ['01', '05'] },
      { fieldName: 'targetedBenificiray', value: ['01', '21'] }
    ]
  },
  {
    id: uuid(),
    label: {
      ar: 'الطاقة الاستيعابية المحتملة',
      en: 'centerCap'
    },
    name: 'centerCap',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [],
    validators: [
      {
        id: 'centerCap-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      },
      {
        id: 'centerCap-required',
        isValidFun: checkIsNumber,
        alert: 'يرجى إدخال رقم صحيح'
      }
    ],
    dependOn: { fieldName: 'centerType', value: ['01'] }
  },
  {
    id: uuid(),
    label: {
      ar: 'فترة العمل',
      en: 'workingHours'
    },
    name: 'workingHours',
    type: 'Radio',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [
      { value: 'morning', label: { ar: 'الفترة الصباحية' } },
      { value: 'evening', label: { ar: 'الفترة المسائية' } },
      { value: 'both', label: { ar: 'كلا الفترتين' } },
      {
        value: '6-12',
        label: { ar: 'السادسة صباحاً حتى العاشرة مساءً' },
        forEldery: true
      },
      {
        value: 'allDay',
        label: { ar: 'طوال أيام الأسبوع' },
        forEldery: true
      }
    ],
    validators: [
      {
        id: 'workingHours-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }
    ],
    dependOn: { fieldName: 'centerType', value: ['01', '03'] }
  },
  {
    id: uuid(),
    label: {
      ar: 'الفئة العمرية للمستفدين',
      en: 'ageGroup'
    },
    name: 'ageGroup',
    type: 'Radio',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [
      { value: '2-12', label: { ar: 'سنتين - ١٢سنة' } },
      { value: '13-18', label: { ar: '١٣سنة - ١٨سنة' } },
      { value: '19-45', label: { ar: '١٩سنة -٤٥سنة' } },
    ],
    validators: [
      {
        id: 'ageGroup-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }
    ],
    dependOn: { fieldName: 'centerType', value: ['01', '08'] }
  },
  {
    id: uuid(),
    label: {
      ar: 'جنس المستفيدين',
      en: 'targetedGender'
    },
    name: 'targetedGender',
    type: 'Radio',
    gridSize: '6',
    sectionName: 'CenterDetails',
    options: [
      { value: 'm', label: { ar: 'ذكور' } },
      { value: 'f', label: { ar: 'إناث' } },
      { value: 'b', label: { ar: 'ذكور و إناث' } }
    ],
    validators: [
      {
        id: 'ageGroup-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }
    ],
    dependOn: { fieldName: 'centerType', value: ['01', '03'] }
  },
  // Center Location
  {
    id: uuid(),
    label: {
      ar: 'المدينة',
      en: 'city'
    },
    name: 'city',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterAddress',
    options: [],
    validators: [
      {
        id: 'city-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }
    ]
  },
  {
    id: uuid(),
    label: {
      ar: 'الحي',
      en: 'sub'
    },
    name: 'sub',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterAddress',
    options: [],
    validators: [
      {
        id: 'sub-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }
    ]
  },
  {
    id: uuid(),
    label: {
      ar: 'الشارع',
      en: 'street'
    },
    name: 'street',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterAddress',
    options: [],
    validators: [
      {
        id: 'street-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }
    ]
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم المبنى',
      en: 'buildNo'
    },
    name: 'buildNo',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterAddress',
    options: [],
    validators: [
      {
        id: 'length-valid',
        isValidFun: (value) => value && value.length === 4,
        alert: 'يجب أن يحتوي رقم المبنى على 4 خانات'
      },
      {
        id: 'centerCap-required',
        isValidFun: checkIsNumber,
        alert: 'يرجى إدخال رقم صحيح'
      }
    ]
  },
  {
    id: uuid(),
    label: {
      ar: 'الرمز البريدي',
      en: 'postalCode'
    },
    name: 'postalCode',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterAddress',
    options: [],
    validators: [
      {
        id: 'postalCode-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }
    ]
  },
  {
    id: uuid(),
    label: {
      ar: 'الرقم الإضافي',
      en: 'Additional No'
    },
    name: 'additionalNo',
    type: 'Text',
    gridSize: '6',
    sectionName: 'CenterAddress',
    options: [],
    validators: [
      {
        id: 'length-valid',
        isValidFun: (value) => !value || value.length === 4,
        alert: 'يجب أن يحتوي الرقم الإضافي على 4 خانات'
      }
    ]
  }
];
