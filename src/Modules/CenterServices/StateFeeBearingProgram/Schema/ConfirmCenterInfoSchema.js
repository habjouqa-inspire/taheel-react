import { getDocId } from 'src/Core/Utils/TaheelUtils';
import { v4 as uuid } from 'uuid';


const Sections = {
    CENTER_DETAILS: {
        id: 'CenterDetails',
        label: { ar: 'معلومات المركز ', en: 'Center Details' },
        order: 1
    },

    CAPACITY: {
        id: 'CapacityDetails',
        label: { ar: 'الطاقة الاستيعابية  ', en: 'Capacity Details' },
        order: 2
    },
    REQUIREMENT: {
        id: 'RequirementDetails',
        label: { ar: 'المرفقات ', en: 'Requirement Details' },
        order: 3
    },
    HEALTH_SERVICES: {
        id: 'HealthServices',
        label: { ar: 'الخدمات الصحية', en: 'Health Services' },
        order: 4
    },
   
};

export default [

    //CenterDetails
    {
        id: uuid(),
        label: {
            ar: 'رقم الترخيص',
            en: 'Center License Number'
        },
        name: 'centerLicenseNumber',
        type: 'Text',
        gridSize: '6',
        sectionName: Sections.CENTER_DETAILS,
        validators: []
    },
    {
        id: uuid(),
        label: {
            ar: 'الاسم التجاري للمركز',
            en: 'Center Name'
        },
        name: 'companyName',
        path: 'name',
        type: 'Text',
        gridSize: '6',
        sectionName: Sections.CENTER_DETAILS,
        validators: []
    },

    //CapacityDetails
    {
        id: uuid(),
        label: {
            ar: 'عدد المستفيدين الفعلي ',
            en: 'Actual Benificiries Number'
        },
        name: 'beneficiariesNum',
        type: 'Text',
        gridSize: '6',
        sectionName: Sections.CAPACITY,
        options: [],
        validators: []
    },
    {
        id: uuid(),

        label: {
            ar: 'الطاقة الاستيعابية',
            en: 'Center Carrying Capacity'
        },
        name: 'capacity',
        type: 'Text',
        gridSize: '6',
        sectionName: Sections.CAPACITY,
        options: [],
        validators: []
    },

    //RequirementDetails
    {
        id: uuid(),
        label: {
            ar: 'التقرير الهندسي',
            en: 'Engineering Report'
        },
        name: 'engineeringPlan',
        valueFunc: (values) => (getDocId(values?.engineeringPlan)),
        type: 'fileTable',
        gridSize: '6',
        sectionName: Sections.REQUIREMENT,
        options: [],
        validators: [],
    },
    {
        id: uuid(),
        label: {
            ar: 'الخطة التنفيذية',
            en: 'Executive Plan'
        },
        name: 'executivePlan',
        valueFunc: (values) => (getDocId(values?.executivePlan)),
        type: 'fileTable',
        gridSize: '6',
        sectionName: Sections.REQUIREMENT,
        options: [],
        validators: [],
    },

    //HealthServices
    {
        id: uuid(),
        label: {
            ar: 'تقديم خدمات صحية',
            en: 'Providing Health Services'
        },
        name: 'healthServices',
        type: 'Radio',
        gridSize: '6',
        sectionName: Sections.HEALTH_SERVICES,
        options: [
            { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
            { value: 'no', label: { ar: 'لا', en: 'No' } },
        ],
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
        sectionName: Sections.HEALTH_SERVICES,
        options: [
            { value: 1, label: { ar: 'رخصة من وزارة الصحة', en: 'MOH License' } },
            { value: 2, label: { ar: 'عقد شراكة مع منشأة مرخصة صحياً', en: 'Partnership contract with a Health Care Facility' } },
        ],
        validators: [],
    },
    {
        id: uuid(),
        label: {
            ar: "مرفقات خدمات الرعاية الصحية",
            en: 'Health care service documents'
        },
        name: 'healthServiceAttachment',
        valueFunc: (values) => (getDocId(values?.healthServiceAttachment)),
        labelFunc: (values)=>(values?.healthServiceType === 1 ? 'مرفق رخصة من وزارة الصحة' : 'مرفق عقد شراكة مع منشأة مرخصة صحياً'),
        type: 'fileTable',
        gridSize: '6',
        sectionName: Sections.MEDICAL_SERVICES,
        options: [],
        validators: [],
    },

/////////////////////////////////////////////////////////////////////////////////////////////////////////
  
];
