import FieldsEnum from 'src/Core/SchemaBuilder/Utils/FieldsEnum';
import { v4 as uuid } from 'uuid';
import { getDateFromString, getDocId } from 'src/Core/Utils/TaheelUtils';
import { getAddressFromObject, getGender } from 'src/Modules/CenterServices/TransferCenterOwnership/Utils/FormateJson';
import { OWNER_TYPE } from 'src/Core/Utils/enums';

const getCenterType = ({ value }) => {
    console.log(value)
    if (value === '01') {
        return 'الرعاية النهارية';
    }
    return '_';
}
const getFullName = ({ value }) => {
    return value.firstName + ' ' + value.lastName;
}

const staffTypes = ["", "معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]

const Sections = {
    CENTER_DETAILS: {
        id: 'CenterDetails',
        label: { ar: 'معلومات المركز', en: 'Center Details' },
        order: 1
    },
    CURRENT_CENTER_OWNER_INFO: {
        id: 'CurrentCenterOwnerInfo',
        label: { ar: 'معلومات المالك الحالي للمركز', en: 'Current Center Owner Information' },
        order: 2
    },
    OLD_LOCATION: {
        id: 'OldLocation',
        label: { ar: 'العنوان الوطني (للمبنى القديم)', en: 'National Address ( Old Building)' },
        order: 3
    },
    LOCAITON_DETAILS: {
        id: 'LocaitonDetails',
        label: { ar: 'العنوان الوطني (للمبنى الجديد)', en: 'National Address ( New Building)' },
        order: 4
    },
    CR_AND_CAPACITY: {
        id: 'CRandCapacity',
        label: { ar: 'السجل التجاري و الطاقة الاستيعابية', en: 'Commercial registration and capacity' },
        order: 5
    },
    MEDICAL_SERVICES: {
        id: 'MedicalServices',
        label: { ar: ' الخدمات الصحية', en: 'Medical Services' },
        order: 6
    },
    STAFF_DETAILS: {
        id: 'StaffDetails',
        label: { ar: 'بيانات الكادر ', en: 'Staff Details' },
        order: 7
    },
    OTHER_ATTACHMENTS: {
        id: 'OtherAttachments',
        label: { ar: ' ملفات أخرى', en: 'Other Attachments' },
        order: 8
    },

}
export default
    [
        {
            id: uuid(),
            label: {
                ar: 'رقم الترخيص',
                en: 'Final License Number'
            },
            name: 'center.centerLicense_r.LicenseNumber',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,

        },
        {
            id: uuid(),
            label: {
                ar: "فئة المركز",
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
                ar: "نوع المركز",
                en: 'targeted Benificiray'
            },
            name: 'targetedBenificiray',
            type: 'Select',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
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
            sectionName: Sections.CENTER_DETAILS,
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ الإنتهاء',
                en: 'Final License Expiry Date'
            },
            name: 'centerLicense_r.expirationHijri',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,

        },
        {
            id: uuid(),
            label: {
                ar: 'رقم الطلب',
                en: 'Request Number'
            },
            name: 'requestNum',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,

        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ الطلب',
                en: 'Request Date'
            },
            name: 'requestDate',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,

        },
        {
            id: uuid(),
            label: {
                ar: 'حالة الطلب',
                en: 'Request Status'
            },
            name: 'requestStatus',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,

        },
        {
            id: uuid(),
            label: {
                ar: 'نوع الطلب',
                en: 'Request Type'
            },
            name: 'requestType',
            type: 'Select',
            options: [
                { value: OWNER_TYPE.NATURAL_TYPE, label: { ar: 'صفة طبيعية', en: 'yes' } },
                { value: OWNER_TYPE.LEGAL_TYPE, label: { ar: 'صفةإعتبارية', en: 'no' } },
            ],
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,

        },
        {
            id: uuid(),
            label: {
                ar: ' موقع المركز الحالي',
                en: 'old Center address'
            },
            name: 'oldAddress',
            valueFunc: (values) => { return getAddressFromObject(values?.center) },
            type: 'Map',
            sectionName: Sections.OLD_LOCATION,

        },
        {
            id: uuid(),
            label: {
                ar: 'رقم المبنى',
                en: 'Building No'
            },
            name: 'buildNo',
            valueFunc: (values) => { return values?.center?.centerLocation_r?.buildNo },
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.OLD_LOCATION,

        },
        {
            id: uuid(),
            label: {
                ar: 'اسم الشارع',
                en: 'Street Name'
            },
            name: 'street',
            valueFunc: (values) => { return values?.center?.centerLocation_r?.street },
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.OLD_LOCATION,

        },
        {
            id: uuid(),
            label: {
                ar: 'الحي',
                en: 'District'
            },
            name: 'area',
            valueFunc: (values) => { return values?.center?.centerLocation_r?.area },
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.OLD_LOCATION,

        },
        {
            id: uuid(),
            label: {
                ar: 'المدينة',
                en: 'city'
            },
            name: 'city',
            valueFunc: (values) => { return values?.center?.centerLocation_r?.city },
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.OLD_LOCATION,

        },
        {
            id: uuid(),
            label: {
                ar: 'الرمز البريدي',
                en: 'Postal Code'
            },
            name: 'postalCode',
            valueFunc: (values) => { return values?.center?.centerLocation_r?.postalCode },
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.OLD_LOCATION,

        },
        {
            id: uuid(),
            label: {
                ar: 'الرقم الإضافي',
                en: 'Additional No'
            },
            name: 'additionalNo',
            valueFunc: (values) => { return values?.center?.centerLocation_r?.additionalNo },
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.OLD_LOCATION,

        },
        {
            id: uuid(),
            label: {
                ar: 'موقع المركز الجديد',
                en: 'New Center address'
            },
            name: 'newAddress',
            valueFunc: (values) => { return getAddressFromObject(values) },
            type: 'Map',
            sectionName: Sections.LOCAITON_DETAILS,
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم المبنى',
                en: 'Building No'
            },
            name: 'buildNo',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.LOCAITON_DETAILS,

        },
        {
            id: uuid(),
            label: {
                ar: 'اسم الشارع',
                en: 'Street Name'
            },
            name: 'street',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.LOCAITON_DETAILS,

        },
        {
            id: uuid(),
            label: {
                ar: 'الحي',
                en: 'District'
            },
            name: 'area',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.LOCAITON_DETAILS,

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
            sectionName: Sections.LOCAITON_DETAILS,

        },
        {
            id: uuid(),
            label: {
                ar: 'الرمز البريدي',
                en: 'Postal Code'
            },
            name: 'postalCode',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.LOCAITON_DETAILS,

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
            sectionName: Sections.LOCAITON_DETAILS,

        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المالك الحالي',
                en: 'Name of Current Center Owner'
            },
            name: 'ownerName',
            type: 'Text',
            gridSizeFunc: (values) => !!values?.commissionerName ? 6 : 12,
            sectionName: Sections.CURRENT_CENTER_OWNER_INFO,

        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المفوض',
                en: 'Commissioner Name'
            },
            name: 'commissionerName',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CURRENT_CENTER_OWNER_INFO,

        },
        {
            id: uuid(),
            label: {
                ar: 'عقد المبايعة',
                en: 'Contract of Sale'
            },
            name: 'salesDoc',
            valueFunc: (values) => (getDocId(values.salesDoc)),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.CURRENT_CENTER_OWNER_INFO,

        },
        {
            id: uuid(),
            label: {
                ar: 'إقرار التنازل',
                en: ' waiver Declaration'
            },
            name: 'waiverDoc',
            valueFunc: (values) => (getDocId(values.waiverDoc)),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.CURRENT_CENTER_OWNER_INFO,

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
            sectionName: Sections.CR_AND_CAPACITY,

        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المركز',
                en: 'Center Name'
            },
            name: 'companyName',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CR_AND_CAPACITY,

        },

        {
            id: uuid(),
            label: {
                ar: 'نوع النشاط التجاري',
                en: 'Commercial Activity Type'
            },
            name: 'activities',
            type: 'Text',
            gridSize: '12',
            sectionName: Sections.CR_AND_CAPACITY,


        },
        {
            id: uuid(),
            label: {
                ar: 'رقم رخصة البلدية',
                en: 'MOMRA License Number'
            },
            name: 'municipLicenseNo',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CR_AND_CAPACITY,

        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ إنتهاء رخصة الدفاع المدني',
                en: 'Civil Defense License Expiry Date'
            },
            name: 'fireDepartmentExpDText',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CR_AND_CAPACITY,
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
            sectionName: Sections.CR_AND_CAPACITY,
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
            sectionName: Sections.CR_AND_CAPACITY,

        },
        {
            id: uuid(),
            label: {
                ar: 'الطاقة الاستيعابية القصوى للمركز',
                en: 'Center Carrying Capacity'
            },
            name: 'capacity',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CR_AND_CAPACITY,

        },
        {
            id: uuid(),
            label: {
                ar: 'عدد المستفيدين المطلوب',
                en: 'Ceneter Benificires Number'
            },
            name: 'beneficiariesNum',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CR_AND_CAPACITY,

        },
        {
            id: uuid(),
            label: {
                ar: 'رخصة الدفاع المدني',
                en: 'Civil Defense License'
            },
            name: 'fireDepartmentLicense',
            type: 'fileTable',
            valueFunc: (values) => (getDocId(values?.fireDepartmentLicense)),
            gridSize: '6',
            sectionName: Sections.CR_AND_CAPACITY,

        },
        {
            id: uuid(),
            label: {
                ar: "إرفاق تقرير زيارة مكتب هندسي معتمد",
                en: 'Office Report'
            },
            name: 'engineeringPlan',
            type: 'fileTable',
            valueFunc: (values) => (getDocId(values?.engineeringPlan)),
            gridSize: '6',
            sectionName: Sections.CR_AND_CAPACITY,

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
            sectionName: Sections.MEDICAL_SERVICES,
            dependOn: {
                valueFunc: (values) => values?.centerType === '01'
            },
            options: [
                { value: "yes", label: { ar: 'نعم', en: 'yes' } },
                { value: "no", label: { ar: 'لا', en: 'no' } },
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
            sectionName: Sections.MEDICAL_SERVICES,
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
            valueFunc: (values) => (getDocId(values?.healthServiceAttachment)),
            type: 'fileTable',
            gridSize: '12',
            sectionName: Sections.MEDICAL_SERVICES,
            options: [],
            validators: [],
        },

        {
            id: uuid(),
            label: {
                ar: "معلومات الكوادر",
                en: 'Staff Information'
            },
            name: 'STAFF_DETAILS',
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
                        type: "text",
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
                        type: "text",
                        attr: "gender",
                        attrFunc: (value) => getGender(value)
                    },
                    {
                        label: { ar: "الجنسية", en: "Nationality" },
                        type: "text",
                        attr: "nationality"
                    },
                ]
            },
            dependOn: {
                valueFunc: (values) => values?.centerType ==='01'
            },
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: "مرفقات أخرى",
                en: 'Other Attachments'
            },
            name: 'otherDocuments',
            type: FieldsEnum.DATA_TABLE,
            gridSize: '12',
            sectionName: Sections.OTHER_ATTACHMENTS,
            tableShcema: {
                schema: [
                    {
                        label: { ar: "الوصف", en: "Description" },
                        type: "text",
                        attr: "description"
                    },
                    {
                        label: { ar: "الملف", en: "Document" },
                        type: "file",
                        attr: "document"
                    },
                ]
            },
            validators: [],
        }

    ]