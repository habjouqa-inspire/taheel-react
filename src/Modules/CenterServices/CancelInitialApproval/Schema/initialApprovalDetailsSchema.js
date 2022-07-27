import { OWNER_TYPE } from 'src/Core/Utils/enums';
import { v4 as uuid } from 'uuid';

const Sections = {
  ApprovalDetails: {
    id: 'approvalDetails',
    label: { ar: ' معلومات الموافقة المبدئية', en: 'Approval Details' },
    order: 1
  },
  CenterAddress: {
    id: 'centerAddress',
    label: { ar: 'العنوان ', en: ' Address' },
    order: 2
  },
  cancelingReason: {
    id: 'cancelingReason',
    label: { ar: ' سبب إلغاء الموافقة المبدئية', en: 'cancelingReason' },
    order: 3
  },
}

export default
  [
    {
      id: uuid(),
      label: {
        ar: 'اسم المركز',
        en: 'Temporary License Number'
      },
      name: 'centerName',
      type: 'Text',
      gridSize: '6',
      sectionName: Sections.ApprovalDetails,
      validators: [],
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
      validators: [],
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
      validators: [],
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
      sectionName: Sections.ApprovalDetails,
    },
    {
      id: uuid(),
      label: {
        ar: 'الطاقة الاستيعابية المحتملة',
        en: 'Targeted Services'
      },
      name: 'estimatedCapacity',
      type: 'Select',
      gridSize: '6',
      sectionName: Sections.ApprovalDetails,
    },
    {
      id: uuid(),
      label: {
        ar: ' الفئة العمرية',
        en: 'Targeted Services'
      },
      name: 'ageGroup',
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
      name: 'targetedGender',
      type: 'Select',
      gridSize: '6',
      sectionName: Sections.ApprovalDetails,
      options: [
        { value: "f", label: { ar: 'إناث', en: 'female' } },
        { value: "m", label: { ar: 'ذكور', en: 'male' } },
        { value: "b", label: { ar: 'ذكور و إناث', en: 'both' } },
      ],
      validators: [],
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
      sectionName: Sections.ApprovalDetails,
      options: [
        { value: 'morning', label: { ar: 'الفترة الصباحية' } },
        { value: 'evening', label: { ar: 'الفترة المسائية' } },
        { value: 'both', label: { ar: 'كلا الفترتين ' } },
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
        ar: 'اسم المالك ',
        en: 'Name of the new Center Owner'
      },
      name: 'ownerName',
      type: 'Text',
      gridSize: '6',
      sectionName: Sections.ApprovalDetails,
      validators: [],
      dependOn: {
        fieldName: 'requestType',
        value: OWNER_TYPE.NATURAL_TYPE
      }
    },
    {
      id: uuid(),
      label: {
        ar: 'رقم الهوية',
        en: 'ID/ Iqama No. '
      },
      name: 'ownerID',
      type: 'Text',
      gridSize: '6',
      sectionName: Sections.ApprovalDetails,
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
        en: 'Date of Birth'
      },
      name: 'birthDate',
      type: 'Text',
      gridSize: '6',
      sectionName: Sections.ApprovalDetails,
      validators: [],
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
      sectionName: Sections.ApprovalDetails,
      options: [],
      dependOn: {
        fieldName: 'requestType',
        value: OWNER_TYPE.NATURAL_TYPE
      }
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
      sectionName: Sections.ApprovalDetails,
      options: [
      ],
      validators: [],
      dependOn: {
        fieldName: 'requestType',
        value: OWNER_TYPE.LEGAL_TYPE
      }
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
      sectionName: Sections.ApprovalDetails,
      options: [],
      dependOn: {
        fieldName: 'requestType',
        value: OWNER_TYPE.LEGAL_TYPE
      }
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
      sectionName: Sections.ApprovalDetails,
      dependOn: {
        fieldName: 'requestType',
        value: OWNER_TYPE.LEGAL_TYPE
      }
    },
    {
      id: uuid(),
      label: {
        ar: ' نتيجة تقييم الجاهزية',
        en: 'Questionnaires Score'
      },
      name: 'questionnairesScore',
      type: 'Text',
      gridSize: '6',
      sectionName: Sections.ApprovalDetails,
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'تاريخ إنتهاء الموافقة المبدئية',
        en: 'License Expiry Date'
      },
      name: 'licenseExpiryDate',
      type: 'Text',
      gridSize: '6',
      sectionName: Sections.ApprovalDetails,
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'المدينة',
        en: 'city'
      },
      name: 'city',
      type: 'Text',
      gridSize: '6',
      sectionName: Sections.CenterAddress,
      options: [],
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
      sectionName: Sections.CenterAddress,
      options: [],
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
      sectionName: Sections.CenterAddress,
      options: [],
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
      sectionName: Sections.CenterAddress,
      options: [],
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
      sectionName: Sections.CenterAddress,
      options: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'الرقم الإضافي',
        en: 'additionalNo'
      },
      name: 'additionalNo',
      type: 'Text',
      gridSize: '6',
      sectionName: Sections.CenterAddress,
      options: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'سبب إلغاء الموافقة المبدئية ',
        en: 'cancelingReason'
      },
      name: 'cancelingReason',
      type: 'Text',
      gridSize: '6',
      sectionName: Sections.cancelingReason,
      options: [],
    },
  ];
