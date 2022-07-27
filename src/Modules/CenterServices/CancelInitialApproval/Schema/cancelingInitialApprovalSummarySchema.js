import FieldsEnum from 'src/Core/SchemaBuilder/Utils/FieldsEnum';
import { v4 as uuid } from 'uuid';

const Sections = {
  ApprovalDetails: {
    id: 'approvalDetails',
    label: { ar: ' بيانات الطلب', en: 'Approval Details' },
    order: 1
  },
  CenterAddress: {
    id: 'centerAddress',
    label: { ar: 'عنوان المركز', en: ' Address' },
    order: 2
  },
  OwnerInfor: {
    id: 'ownerinfo',
    label: { ar: 'معلومات المالك', en: ' owner' },
    order: 3
  }
};

export default [
  {
    id: uuid(),
    label: {
      ar: 'رقم الطلب',
      en: 'Temporary License Number'
    },
    name: 'CancelingData.requestNum',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'تاريخ الطلب',
      en: 'Temporary License Number'
    },
    name: 'CancelingData.requestDate',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم الموافقة المبدئية ',
      en: 'Temporary License Number'
    },
    name: 'CancelingData.centerLicenceNumber',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'اسم المركز',
      en: 'Temporary License Number'
    },
    name: 'CancelingData.centerName',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'فئة المركز',
      en: 'center Type'
    },
    name: 'centerType',
    type: 'Select',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'نوع المركز',
      en: 'Targeted Benificiray'
    },
    name: 'targetedBenificiray',
    type: 'Select',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'اختصاص المركز',
      en: 'Targeted Services'
    },
    name: 'targetedServices',
    type: 'Select',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails
  },
  {
    id: uuid(),
    label: {
      ar: 'تاريخ إنتهاء الترخيص ',
      en: 'License Expiry Date'
    },
    name: 'center.centerLicense_r.expirationHijri',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: ' الفئة العمرية',
      en: 'Targeted Services'
    },
    name: 'center.ageGroup',
    type: 'Select',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
  },
  {
    id: uuid(),
    label: {
      ar: 'جنس المستفيدين',
      en: 'Center Gender Group'
    },
    name: 'center.targetedGender',
    type: 'Select',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
    options: [
      { value: 'f', label: { ar: 'إناث', en: 'female' } },
      { value: 'm', label: { ar: 'ذكور', en: 'male' } },
      { value: 'b', label: { ar: 'ذكور و إناث', en: 'both' } }
    ],
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'فترة العمل',
      en: 'workingHours'
    },
    name: 'center.workingHours',
    type: 'Radio',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
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
    ]
  },
  {
    id: uuid(),
    label: {
      ar: 'الطاقة الاستيعابية المحتملة',
      en: 'Targeted Services'
    },
    name: 'center.centerInfo_r.estimatedCapacity',
    type: 'Select',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
  },
  {
    id: uuid(),
    label: {
      ar: 'اسم المالك ',
      en: 'Name of the new Center Owner'
    },
    name: 'center.centerOwner_r.ownerName',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.OwnerInfor,
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم الهوية',
      en: 'ID/ Iqama No. '
    },
    name: 'center.centerOwner_r.ownerID',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.OwnerInfor,
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'تاريخ الميلاد',
      en: 'Date of Birth'
    },
    name: 'DOB',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.OwnerInfor,
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم الجوال',
      en: 'Mobile No.'
    },
    name: 'center.centerOwner_r.ownerPhoneNumber',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.OwnerInfor,
    options: []
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم السجل التجاري',
      en: 'Commercial Registration No'
    },
    name: 'CRNumber',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.OwnerInfor,
    options: [],
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'الاسم التجاري للمنشأة',
      en: 'companyName'
    },
    name: 'entityName',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.OwnerInfor,
    options: []
  },
  {
    id: uuid(),
    label: {
      ar: 'اسم المفوض',
      en: 'commissoner name'
    },
    name: 'centerOwner.firstName',
    valueFunc: (v) => v?.centerOwner?.firstName + ' ' + v?.centerOwner?.lastName,
    dependOn: {
      valueFunc: (values) => values?.center?.centerOwner_r?.ownerType === '2'
    },
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.OwnerInfor,
    options: []
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم جوال المفوّض',
      en: 'commissionerMobNum'
    },
    name: 'commissionerMobNum',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.OwnerInfor
  },
  {
    id: uuid(),
    label: {
      ar: ' نتيجة تقييم الجاهزية',
      en: 'Questionnaires Score'
    },
    name: 'center.questionnairesScore',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.ApprovalDetails,
    options: [],
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'المدينة',
      en: 'city'
    },
    name: 'center.centerLocation_r.city',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CenterAddress,
    options: []
  },
  {
    id: uuid(),
    label: {
      ar: 'الحي',
      en: 'sub'
    },
    name: 'center.centerLocation_r.area',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CenterAddress,
    options: []
  },
  {
    id: uuid(),
    label: {
      ar: 'الشارع',
      en: 'street'
    },
    name: 'center.centerLocation_r.street',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CenterAddress,
    options: []
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم المبنى',
      en: 'buildNo'
    },
    name: 'center.centerLocation_r.buildNo',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CenterAddress,
    options: []
  },
  {
    id: uuid(),
    label: {
      ar: 'الرمز البريدي',
      en: 'postalCode'
    },
    name: 'center.centerLocation_r.postalCode',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CenterAddress,
    options: []
  },
  {
    id: uuid(),
    label: {
      ar: 'الرقم الإضافي',
      en: 'Additional Number'
    },
    name: 'center.centerLocation_r.additionalNo',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CenterAddress,
    options: []
  },
  {
    id: uuid(),
    label: {
      ar: 'سبب إلغاء الموافقة المبدئية ',
      en: 'cancelingReason'
    },
    name: 'center.cancelingReason',
    type: FieldsEnum.MULTI_LINE_TEXT,
    gridSize: '12',
    sectionName: Sections.ApprovalDetails,
    options: []
  }
];
