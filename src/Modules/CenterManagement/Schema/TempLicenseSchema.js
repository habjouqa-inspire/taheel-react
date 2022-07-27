import { OWNER_TYPE } from 'src/Core/Utils/enums';
import { getAddressFromObject } from 'src/Modules/CenterServices/TransferCenterOwnership/Utils/FormateJson';
import { v4 as uuid } from 'uuid';
const Sections = {
  CENTER_INFO: {
    id: 'CenterInfo',
    label: { ar: 'معلومات المركز و معلومات المالك', en: 'Center and owner information' },
    order: 1
  },
  CENTER_ADDRESS: {
    id: 'CenterAddress',
    label: { ar: 'عنوان المركز', en: 'Center Address' },
    order: 4
  },
  CENTER_DETAILS: {
    id: 'CenterDetails',
    label: { ar: 'تفاصيل المركز', en: 'Center Details' },
    order: 3
  },
  READINESS_ASSESSMENT: {
    id: 'ReadinessAssessment',
    label: { ar: 'تقييم الجاهزية', en: 'Readiness assessment' },
    order: 5
  }
}

export default [
  //===========
  // Center Info 
  {
    id: uuid(),
    label: {
      ar: 'رقم الرخصة',
      en: 'Licence Number'
    },
    name: 'centerLicense_r.LicenseNumber',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
  },
  {
    id: uuid(),
    label: {
      ar: 'صفة المالك',
      en: 'Request Type'
    },
    name: 'ownerType',
    path: "center.centerOwner_r.ownerType",
    type: 'Select',
    gridSize: '6',
    options: [
      { value: OWNER_TYPE.NATURAL_TYPE, label: { ar: 'صفة طبيعية' } },
      { value: OWNER_TYPE.LEGAL_TYPE, label: { ar: 'صفة إعتبارية' } },
    ],
    sectionName: Sections.CENTER_INFO,
  },
  {
    id: uuid(),
    label: {
      ar: 'نوع الصفة الاعتبارية',
      en: 'License Type'
    },
    name: 'centerLicense_r.LicenseType',
    type: 'Select',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
    options: [
      { value: '1', label: { ar: 'سجل تجاري' } },
      { value: '2', label: { ar: 'رخصة استثمار اجنبي' } },
      { value: '3', label: { ar: 'شهادة تسجيل للجمعيات والمؤسسات الأهليه' } },
    ],
    dependOn: {
      fieldName: 'ownerType',
      value: OWNER_TYPE.LEGAL_TYPE
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'فئة المركز',
      en: 'center Type'
    },
    name: 'centerType',
    path: 'center.type',
    type: 'Select',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
  },
  {
    id: uuid(),
    label: {
      ar: 'نوع المركز',
      en: 'Targeted Benificiray'
    },
    name: 'targetedBenificiray',
    path: 'center.targetedBeneficiary',
    type: 'Select',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
  },
  {
    id: uuid(),
    label: {
      ar: 'اختصاص المركز',
      en: 'Targeted Services'
    },
    name: 'targetedServices',
    path: 'center.targetedServices',
    type: 'Select',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
  },
  //Owner Info 
  {//should be retrieved
    id: uuid(),
    label: {
      ar: 'اسم الكيان',
      en: 'companyName'
    },
    name: 'entityName',
    path: 'center.centerOwner_r.ownerName',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
    dependOn: [{
      fieldName: 'ownerType',
      value: OWNER_TYPE.LEGAL_TYPE
    }]
  },
  {//should be retrieved
    id: uuid(),
    label: {
      ar: 'رقم جوال المفوض',
      en: 'compMobileNo'
    },
    name: 'commissionerMobNum',
    path: 'center.centerOwner_r.ownerPhoneNumber',
    type: 'text',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
    dependOn: {
      fieldName: 'ownerType',
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
    path: 'center.centerOwner_r.ownerID',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
    dependOn: {
      fieldName: 'ownerType',
      value: OWNER_TYPE.LEGAL_TYPE
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'اسم مالك المركز',
      en: 'Owner Name'
    },
    name: 'centerOwner_r.ownerName',
    path: 'center.centerOwner_r.ownerName',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
    dependOn: {
      fieldName: 'ownerType',
      value: OWNER_TYPE.NATURAL_TYPE
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم الجوال',
      en: 'Mobile No.'
    },
    name: 'ownerPhoneNumber',
    path: 'center.centerOwner_r.ownerPhoneNumber',
    attrFunc: (value) => { return value },
    //default: 'NAN',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
    dependOn: {
      fieldName: 'ownerType',
      value: OWNER_TYPE.NATURAL_TYPE
    }
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم الهوية',
      en: 'ID Number'
    },
    name: 'centerOwner_r.ownerID',
    path: 'center.centerOwner_r.ownerID',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
    dependOn: {
      fieldName: 'ownerType',
      value: OWNER_TYPE.NATURAL_TYPE
    }
  },
  {//should be retrieved
    id: uuid(),
    label: {
      ar: 'تاريخ الميلاد',
      en: 'Birthdate'
    },
    name: 'DOB',
    path: 'processVariablesDump.user.DOB',
    // attrFunc: () => DOB,
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_INFO,
  },
  {
    id: uuid(),
    label: {
      ar: 'الطاقة الاستيعابية المحتملة',
      en: 'centerCap'
    },
    name: 'estimatedCapacity',
    path: 'center.centerInfo_r.estimatedCapacity',
    type: 'Text',
    gridSize: '6', 
    sectionName: Sections.CENTER_DETAILS,
  },
  {
    id: uuid(),
    label: {
      ar: 'فترة العمل',
      en: 'workingHours'
    },
    name: 'workingHours',
    path: 'center.workingHours',
    type: 'Radio',
    gridSize: '6',
    sectionName: Sections.CENTER_DETAILS,
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
  },
  {
    id: uuid(),
    label: {
      ar: 'الفئة العمرية للمستفدين',
      en: 'ageGroup'
    },
    name: 'ageGroup',
    path: 'center.ageGroup',
    type: 'Radio',
    gridSize: '6',
    sectionName: Sections.CENTER_DETAILS,
    options: [
      { value: '2-12', label: { ar: 'سنتين - ١٢سنة' } },
      { value: '13-18', label: { ar: '١٣سنة - ١٨سنة' } },
      { value: '19-45', label: { ar: '١٩سنة -٤٥سنة' } },
    ],
  },
  {
    id: uuid(),
    label: {
      ar: 'جنس المستفدين',
      en: 'targetedGender'
    },
    name: 'targetedGender',
    path: 'center.targetedGender',
    type: 'Radio',
    gridSize: '6',
    sectionName: Sections.CENTER_DETAILS,
    options: [
      { value: "f", label: { ar: 'إناث', en: 'female' } },
      { value: "m", label: { ar: 'ذكور', en: 'male' } },
      { value: "b", label: { ar: 'ذكور و إناث', en: 'both' } },
    ],
  },
  // Center Location
  {
    id: uuid(),
    label: {
      ar: 'موقع المركز',
      en: 'Center address'
    },
    name: 'centerAddress',
    valueFunc: (values) => { return getAddressFromObject(values?.center) },
    type: 'Map',
    sectionName: Sections.CENTER_ADDRESS,

  },
  {
    id: uuid(),
    label: {
      ar: 'المدينة',
      en: 'city'
    },
    name: 'centerLocation_r.city',
    path: 'center.centerLocation_r.city',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_ADDRESS,
  },
  {
    id: uuid(),
    label: {
      ar: 'الحي',
      en: 'sub'
    },
    name: 'centerLocation_r.area',
    path: 'center.centerLocation_r.area',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_ADDRESS,
  },
  {
    id: uuid(),
    label: {
      ar: 'الشارع',
      en: 'street'
    },
    name: 'centerLocation_r.street',
    path: 'center.centerLocation_r.street',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_ADDRESS,
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم المبنى',
      en: 'buildNo'
    },
    name: 'centerLocation_r.buildNo',
    path: 'center.centerLocation_r.buildNo',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_ADDRESS,
  },
  {
    id: uuid(),
    label: {
      ar: 'الرمز البريدي',
      en: 'postalCode'
    },
    name: 'centerLocation_r.postalCode',
    path: 'center.centerLocation_r.postalCode',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_ADDRESS,
  },
  {
    id: uuid(),
    label: {
      ar: 'الرقم الإضافي',
      en: 'Additional Number'
    },
    name: 'centerLocation_r.additionalNo',
    path: 'center.centerLocation_r.additionalNo',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CENTER_ADDRESS,
  },
  {
    id: uuid(),
    label: {
      ar: 'نتيجة التقييم',
      en: 'Questionnaires Score'
    },
    name: 'questionnairesScore',
    path: 'center.questionnairesScore',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.READINESS_ASSESSMENT,
  },
]