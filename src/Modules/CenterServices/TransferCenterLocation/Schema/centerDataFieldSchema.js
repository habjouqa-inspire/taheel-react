import { checkIsfilled } from 'src/Core/Utils/inputValidator';
import { v4 as uuid } from 'uuid';
import { getAddressFromObject } from '../../TransferCenterOwnership/Utils/FormateJson';

export default
  [
    {
      id: uuid(),
      label: {
        ar: 'الاسم التجاري للمركز',
        en: 'Temporary License Number'
      },
      name: 'companyName',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'الاسم التجاري للمركز',
        en: 'Temporary License Number'
      },
      name: 'companyName',
      type: 'Text',
      gridSize: '6',
      sectionName: 'ownership',
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
      sectionName: 'ownership',
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
      sectionName: 'ownership',
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
      sectionName: 'ownership',
    },
    {
      id: uuid(),
      label: {
        ar: 'تاريخ إنتهاء الترخيص',
        en: 'License Expiry Date'
      },
      name: 'licenseExpiryDate',
      type: 'Text',
      gridSize: '6',
      sectionName: 'ownership',
      validators: [],
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
      sectionName: 'CenterDetails',
      options: [
      ],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'نشاط السجل التجاري',
        en: 'activities'
      },
      name: 'activities',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'الطاقة الاستيعابية',
        en: 'capacity'
      },
      name: 'newCapacity',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [
      ],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'الضمان المالي',
        en: 'Financial Guarantee'
      },
      name: 'financialGuarantee',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [
      ],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'عدد المستفيدين',
        en: 'Beneficiaries Number'
      },
      name: 'beneficiariesNum',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: "إرفاق صور الأثاث والأجهزة الكهربائية (للمبنى الجديد)",
        en: 'Furniture'
      },
      name: 'furniture',
      type: 'fileTable',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },

    {
      id: uuid(),
      label: {
        ar: "رخصة البلدية (للمبنى الجديد)",
        en: 'municip License'
      },
      name: 'municipLicenseNo',
      type: 'fileTable',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: "(للمبنى الجديد) تقرير مكتب هندسي معتمد",
        en: 'office Report'
      },
      name: 'officeReport',
      type: 'fileTable',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: "رخصة الدفاع المدني (للمبنى الجديد)",
        en: 'fire Department License'
      },
      name: 'fireDepartmentLicense',
      type: 'fileTable',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
          ar: 'موقع المركز',
          en: 'Center address'
      },
      name: 'address',
      valueFunc: (values) => { return values.address || getAddressFromObject(values) },
      type: 'Map',
      sectionName: 'CenterAddress',
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
      sectionName: 'CenterAddress',
      options: [],
      validators: [{
        id: 'city-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }],
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
      validators: [{
        id: 'sub-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }],
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
      validators: [{
        id: 'street-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }],
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
      validators: [{
        id: 'buildNo-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }],
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
      validators: [{
        id: 'postalCode-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }],
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
      sectionName: 'CenterAddress',
      options: [],
      validators: [{
        id: 'additionalNo-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }],
    },
  ];
