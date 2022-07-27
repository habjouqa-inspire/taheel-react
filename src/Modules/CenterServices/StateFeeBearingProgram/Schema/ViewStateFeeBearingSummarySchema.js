import { getDocId } from 'src/Core/Utils/TaheelUtils';
import { v4 as uuid } from 'uuid';


const Sections = {
    CENTERDETAILS: {
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
    TRANSPRORATION_SERVICES: {
        id: 'TransprorationServices',
        label: { ar: 'خدمة الموصلات ', en: 'Transproration Services' },
        order: 5
    },
    ACCEPTANCERATIO: {
        id: 'AcceptanceRatio',
        label: { ar: 'نسبة قبول الطلاب التابعين لبرنامج تحمل الدولة للرسوم ', en: 'Acceptance Ratio' },
        order: 6
    },
    FORMALLETTER: {
        id: 'FormalLetter',
        label: { ar: 'الخطاب الكتابي', en: 'Formal Letter' },
        order: 7
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
        sectionName: Sections.CENTERDETAILS,
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
        sectionName: Sections.CENTERDETAILS,
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
            ar: 'نوع الخدمة الصحية',
            en: 'Type of health service'
        },
        name: 'healthServiceType',
        type: 'Select',
        gridSize: '12',
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
        labelFunc: (values)=>(values.healthServiceType === 1 ? 'مرفق رخصة من وزارة الصحة' : 'مرفق عقد شراكة مع منشأة مرخصة صحياً'),
        name: 'healthServiceAttachment',
        valueFunc: (values) => (getDocId(values?.newHealthServiceAttachment)),
        type: 'fileTable',
        gridSize: '6',
        sectionName: Sections.HEALTH_SERVICES,
        options: [],
        validators: [],
    },

    /////transportationServices
    {
        id: uuid(),
        label: {
            ar: ' تقديم خدمة سيارات ',
            en: 'Financial Guarantee'
        },
        name: 'transportationServices',
        type: 'Select',
        gridSize: '6',
        sectionName: Sections.TRANSPRORATION_SERVICES,
        options: [
            { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
            { value: 'no', label: { ar: 'لا يوجد', en: 'No' } },
        ],
        validators: []
    },
    {
        id: uuid(),
        label: {
            ar: 'عدد السيارات',
            en: 'Number Of Vehicles'
        },
        name: 'numberOfVehicles',
        type: 'Text',
        gridSize: '6',
        sectionName: Sections.TRANSPRORATION_SERVICES,
        options: [],
        validators: []
    },

    ////////acceptanceRatio
    {
        id: uuid(),

        label: {
            ar: 'نسبة قبول الطلاب التابعين للبرنامج ',
            en: 'capacity'
        },
        name: 'acceptanceRatio',
        type: 'Text',
        gridSize: '6',
        sectionName: Sections.ACCEPTANCERATIO,
        options: [],
        validators: []
    },

    /////formalLetter
    {

        id: uuid(),
        label: {
            ar: 'الخطاب الكتابي',
            en: 'Formal Letter'
        },
        name: 'formalLetter',
        type: 'fileTable',
        valueFunc: (values) => getDocId(values?.formalLetter),
        gridSize: '6',
        sectionName: Sections.FORMALLETTER,
        options: [],
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    
];
