import { checkIsfilled } from 'src/Core/Utils/inputValidator';
import { v4 as uuid } from 'uuid';


export default

  [
    {
      id: uuid(),
      label: {
        ar: "فئة المركز",
        en: 'center Type'
      },
      name: 'centerType',
      type: 'Select',
      gridSize: '4',
      sectionName: 'CenterDetails',
    },
    {
      id: uuid(),
      label: {
        ar: "نوع المركز",
        en: 'targeted Benificiray'
      },
      name: 'targetedBenificiray',
      type: 'Select',
      gridSize: '6',
      sectionName: 'CenterDetails',
    },
    {
      id: uuid(),
      label: {
        ar: "اختصاص المركز",
        en: 'targetedServices'
      },
      name: 'targetedServices',
      type: 'Select',
      gridSize: '6',
      sectionName: 'CenterDetails',
    },
    // {
    //   id: uuid(),
    //   label: {
    //     ar: 'الاسم التجاري للمركز',
    //     en: 'Temporary License Number'
    //   },
    //   name: 'companyName',
    //   type: 'Text',
    //   gridSize: '6',
    //   sectionName: 'CenterDetails',
    //   validators: [],
    // },
    {
      id: uuid(),
      label: {
        ar: 'اسم مالك المركز',
        en: 'Owner Name'
      },
      name: 'ownerName',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      validators: [],
    },
    // {
    //   id: uuid(),
    //   label: {
    //     ar: 'رقم مالك المركز',
    //     en: 'Owner Number'
    //   },
    //   name: 'ownerID',
    //   type: 'Text',
    //   gridSize: '6',
    //   sectionName: 'CenterDetails',
    //   validators: [],
    // },
    // {
    //   id: uuid(),
    //   label: {
    //     ar: 'رقم الترخيص المؤقت',
    //     en: 'Temporary License Number'
    //   },
    //   name: 'temporaryLicenseNum',
    //   type: 'Text',
    //   gridSize: '6',
    //   sectionName: 'CenterDetails',
    //   validators: [],
    // },
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
        { value: '01', label: { ar: 'ذوي الإعاقة' } },
      ],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'رقم رخصة البلدية',
        en: 'Municipal License'
      },
      name: 'municipLicenseNo',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'نشاط السجل التجاري',
        en: 'Commercial Registration Activity'
      },
      name: 'activities',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'تاريخ إصدار الترخيص',
        en: 'License Issue Date'
      },
      name: 'licenseCreationDate',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'تاريخ إنتهاء الترخيص',
        en: 'License Expiry Date'
      },
      name: 'centerLicense_r.expirationHijri',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'الفئة العمرية للمستفيدين',
        en: 'Center Age Group'
      },
      name: 'centerAgeGroup',
      type: 'Text',
      gridSize: '6',
      sectionName: 'CenterDetails',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'جنس المستفيدين',
        en: 'Center Gender Group'
      },
      name: 'centerGenderGroup',
      type: 'Radio',
      gridSize: '6',
      sectionName: 'CenterDetails',
       options: [
        { value: 'm', label: { ar:'ذكور', en: 'males' } },
        { value: 'f', label: { ar: 'إناث', en: 'females' } },
        { value: 'f', label: { ar: 'ذكور و إناث', en: 'both' } },

      ],
      validators: [],
    },

    {
      id: uuid(),
      label: {
        ar: 'عدد المستفيدين الفعلي',
        en: 'Beneficiaries Number'
      },
      name: 'beneficiariesNum',
      type: 'Text',
      gridSize: '6',
      sectionName: 'Capacity',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'مساحة مسطح البناء',
        en: 'Construction Flat Area '
      },
      name: 'buildingArea',
      type: 'Text',
      gridSize: '6',
      sectionName: 'Capacity',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'مساحة القبو',
        en: 'Basement Space'
      },
      name: 'basementArea',
      type: 'Text',
      gridSize: '6',
      sectionName: 'Capacity',
      options: [],
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
      sectionName: 'Capacity',
      options: [],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: 'الطاقة الاستيعابية',
        en: 'Capacity'
      },
      name: 'capacity',
      type: 'Text',
      gridSize: '6',
      sectionName: 'Capacity',
      options: [],
      validators: [],
    },

    {
      id: uuid(),
      label: {
        ar: 'تقديم خدمات صحية',
        en: 'Providing Health Services'
      },
      name: 'healthServices',
      type: 'Radio',
      gridSize: '6',
      sectionName: 'HealthServices',
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      validators: [{
        id: 'workingHours-required',
        isValidFun: checkIsfilled,
        alert: 'هذا الحقل مطلوب'
      }],
    },

    {
      id: uuid(),
      label: {
        ar: 'نوع الخدمة الصحية',
        en: 'Type of health service'
      },
      name: 'healthServiceType',
      type: 'Select',
      gridSize: '6',
      sectionName: 'HealthServices',
      options: [
        { value: 1, label: { ar: 'رخصة وزارة الصحة', en: 'MOH License' } },
        { value: 2, label: { ar: 'عقد شراكة مع منشأة رعاية صحية', en: 'Partnership contract with a Health Care Facility' } },
      ],
      validators: [],
    },
    {
      id: uuid(),
      label: {
        ar: "تاريخ إنتهاء رخصة الدفاع المدني",
        en: 'fireDepartmeasad ntLicenseExpiryDate'
      },
      name: 'fireDepartmentLicenseExpiryDate',
      type: 'Text',
      gridSize: '12',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },

    {
      id: uuid(),
      label: {
        ar: 'إرفاق الخطة التشغيلية',
        en: 'Operational Plan'
      },
      name: 'operationPlan',
      type: 'fileTable',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },

    {
      id: uuid(),
      label: {
        ar: 'إرفاق الخطة التنفيذية',
        en: 'Executive Plan'
      },
      name: 'executivePlan',
      type: 'fileTable',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },

    {
      id: uuid(),
      label: {
        ar: "إرفاق تقرير زيارة مكتب هندسي معتمد",
        en: 'Office Report'
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
        ar: "رخصة الدفاع المدني",
        en: 'fire department License'
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
        ar: "إرفاق صور الأثاث والأجهزة الكهربائية",
        en: 'Furniture'
      },
      name: 'Furniture',
      type: 'fileTable',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },

    {
      id: uuid(),
      label: {
        ar: "إرفاق الضمان المالي",
        en: 'Financial Guarantee'
      },
      name: 'financialGuaranteeAtt',
      type: 'fileTable',
      gridSize: '6',
      sectionName: 'Requirements',
      options: [],
      validators: [],
    },




  ];
