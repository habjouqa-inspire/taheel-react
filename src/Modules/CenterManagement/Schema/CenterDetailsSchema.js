import FieldsEnum from 'src/Core/SchemaBuilder/Utils/FieldsEnum';
import { OWNER_TYPE } from 'src/Core/Utils/enums';
import { checkIsfilled } from 'src/Core/Utils/inputValidator';
import { getDateFromString, getDocId } from 'src/Core/Utils/TaheelUtils';
import { getAddressFromObject, getGender } from 'src/Modules/CenterServices/TransferCenterOwnership/Utils/FormateJson';
import { v4 as uuid } from 'uuid';

const getCenterType = (value) => {
    if (value === '01') {
        return 'الرعاية النهارية';
    }
    return '_';
}
const staffTypes = ["", "معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]
const Sections = {
    CENTER_DETAILS: {
        id: 'CenterDetails',
        label: { ar: 'معلومات المركز', en: 'Center Details' },
        order: 1
    },
    CAPACITY: {
        id: 'Capacity',
        label: { ar: 'الطاقة الاستيعابية', en: 'Capacity' },
        order: 2
    },
    HEALTH_SERVICES: {
        id: 'HealthServices',
        label: { ar: 'الخدمات الصحية', en: 'Health Services' },
        order: 3
    },
    CENTER_ADDRESS: {
        id: 'CenterAddress',
        label: { ar: 'عنوان المركز', en: 'Center Address' },
        order: 4
    },
    STAFF_DETAILS: {
        id: 'StaffDetails',
        label: { ar: 'بيانات الكادر ', en: 'Staff Details' },
        order: 5
    },
    REQUIREMENTS: {
        id: 'Requirements',
        label: { ar: 'المتطلبات', en: 'Requirements' },
        order: 6
    }
}
export default
    [
        {
            id: uuid(),
            label: {
                ar: 'صفة المالك',
                en: 'Request Type'
            },
            name: 'centerOwner_r.ownerType',
            options: [
                { value: OWNER_TYPE.NATURAL_TYPE, label: { ar: 'صفة طبيعية' } },
                { value: OWNER_TYPE.LEGAL_TYPE, label: { ar: 'صفة إعتبارية' } },
            ],
            type: 'Select',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
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
            sectionName: Sections.CENTER_DETAILS,
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
            sectionName: Sections.CENTER_DETAILS,
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
            sectionName: Sections.CENTER_DETAILS,
        },
        {
            id: uuid(),
            label: {
                ar: 'الاسم التجاري للمركز',
                en: 'Temporary License Number'
            },
            name: 'name',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم مالك المركز',
                en: 'Owner Name'
            },
            name: 'centerOwner_r.ownerName',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم السجل التجاري',
                en: 'Commercial Registration No'
            },
            name: 'crInfo_r.crNumber',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
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
            name: 'crInfo_r.MoMRA_Licence',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'نشاط السجل التجاري',
                en: 'Commercial Registration Activity'
            },
            name: 'crInfo_r.crActivityType',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ إصدار الترخيص',
                en: 'License Issue Date'
            },
            name: 'creationDate',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
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
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
        /*  {
             id: uuid(),
             label: {
                 ar: 'نوع الصفة الاعتبارية',
                 en: 'License Type'
             },
             name: 'centerLicense_r.LicenseType',
             type: 'Select',
             gridSize: '6',
             sectionName: Sections.CENTER_DETAILS,
             options: [
                 { value: '1', label: { ar: 'سجل تجاري' } },
                 { value: '2', label: { ar: 'رخصة استثمار اجنبي' } },
                 { value: '3', label: { ar: 'شهادة تسجيل للجمعيات والمؤسسات الأهليه' } },
             ],
         }, */
        {
            id: uuid(),
            label: {
                ar: 'الفئة العمرية للمركز',
                en: 'Center Age Group'
            },
            name: 'ageGroup',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'جنس المستفيدين',
                en: 'Center Gender Group'
            },
            name: 'targetedGender',
            attrFunc: (value) => {
                return !!value ?
                    (value === "m" ? "ذكور" : (value === "f" ? "إناث" : "ذكور و إناث"))
                    :
                    null
            },
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
        ,

        {
            id: uuid(),
            label: {
                ar: 'عدد المستفيدين الفعلي',
                en: 'Beneficiaries Number'
            },
            name: 'beneficiariesNum',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CAPACITY,
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
            sectionName: Sections.CAPACITY,
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
            sectionName: Sections.CAPACITY,
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
            sectionName: Sections.CAPACITY,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الطاقة الاستيعابية',
                en: 'capacity'
            },
            name: 'capacity',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CAPACITY,
            options: [],
            validators: [],
        },

        {
            id: uuid(),
            label: {
                ar: 'تقديم خدمات صحية',
                en: 'Providing Health Services'
            },
            name: "isHealthCareServices",
            type: 'Radio',
            gridSize: '6',
            sectionName: Sections.HEALTH_SERVICES,
            options: [
                { value: true, label: { ar: 'نعم', en: 'Yes' } },
                { value: false, label: { ar: 'لا', en: 'No' } },
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
            sectionName: Sections.HEALTH_SERVICES,
            options: [
                { value: 1, label: { ar: 'رخصة وزارة الصحة', en: 'MOH License' } },
                { value: 2, label: { ar: 'عقد شراكة مع منشأة رعاية صحية', en: 'Partnership contract with a Health Care Facility' } },
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
            attrFunc: (value) => (getDocId(value)),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.HEALTH_SERVICES,
            options: [],
            validators: [],
        },
        // Center Location
        {
            id: uuid(),
            label: {
                ar: 'موقع المركز',
                en: 'Center address'
            },
            name: 'centerAddress',
            valueFunc: (values) => { return getAddressFromObject(values) },
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
            name: 'centerLocation_r.addtionalNo',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_ADDRESS,
        },

        {
            id: uuid(),
            label: {
                ar: "تاريخ إنتهاء رخصة الدفاع المدني",
                en: 'fireDepartmeasad ntLicenseExpiryDate'
            },
            name: 'fireDepartmentExpDText',
            type: 'Text',
            gridSize: '12',
            sectionName: Sections.REQUIREMENTS,
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
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },

        {
            id: uuid(),
            label: {
                ar: 'وثيقة الترخيص',
                en: 'License Documents'
            },
            name: 'operationPlan',
            valueFunc: (values) => (getDocId(values?.centerLicense_r?.LicenseDoc)),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الخطة التشغيلية',
                en: 'Operational Plan'
            },
            name: 'operationPlan',
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
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
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },

        {
            id: uuid(),
            label: {
                ar: "تقرير زيارة مكتب هندسي معتمد",
                en: 'Office Report'
            },
            name: 'engineeringPlan',
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },


        {
            id: uuid(),
            label: {
                ar: "تقرير المسح الأمني",
                en: 'Security Report'
            },
            name: 'securityReport',
            valueFunc: (values) => (values?.securityReport?.id),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: "صور الأثاث والأجهزة الكهربائية",
                en: 'Furniture'
            },
            name: 'Furniture',
            valueFunc: (values) => (values?.furniturePhotoZippedFile?.id),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: "الضمان المالي",
                en: 'Financial Guarantee'
            },
            name: 'financialGuaranteeAtt',
            valueFunc: (values) => (values?.financialGuarbteeAtt?.id),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: "معلومات الكوادر",
                en: 'Staff Information'
            },
            name: 'customers',
            type: FieldsEnum.DATA_TABLE,
            gridSize: '12',
            sectionName: Sections.STAFF_DETAILS,
            tableShcema: {
                schema: [
                    {
                        label: { ar: "الاسم الكامل", en: "Full Name" },
                        type: "text",
                        attr: "name"
                    },
                    {
                        label: { ar: "رقم الهوية / الإقامة", en: "ID / Iqameh Number" },
                        type: "text",
                        attr: "idNumIqamaNum"
                    },
                    {
                        label: { ar: "تاريخ الميلاد", en: "Birth Date" },
                        attr: "birthDate",
                        attrFunc: (value) => getDateFromString(value, 'iYYYYiMMiDD', 'iYYYY/iMM/iDD'),
                    },
                    {
                        label: { ar: "نوع الكادر", en: "Staff Role" },
                        attr: "StaffType",
                        type: "text",
                        attrFunc: (value) => staffTypes[value],
                    },
                    {
                        label: { ar: "الجنس", en: "Gender" },
                        attr: "gender",
                        attrFunc: (value) => getGender(value)
                    },
                    {
                        label: { ar: "الجنسية", en: "Nationality" },
                        attr: "nationality"
                    },
                ]
            },
            validators: [],
        }
    ]

