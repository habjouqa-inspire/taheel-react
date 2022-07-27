import FieldsEnum from 'src/Core/SchemaBuilder/Utils/FieldsEnum';
import {
    getDateFromObject, getDocId
} from 'src/Core/Utils/TaheelUtils';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { v4 as uuid } from 'uuid';
import {
    getAddressFromObject,
    getGender
} from '../../TransferCenterOwnership/Utils/FormateJson';

const {
    email,
    idNumIqamaNum,
    DOB,
    gender,
    phoneNumber,
    firstName,
    secondName,
    lastName
} = getCurrentUser();

const Sections = {
    LICENSING_DETAILS: {
        id: 'licensingDetails',
        label: { ar: 'بيانات الترخيص', en: 'LICENSING DETAILS' },
        order: 1
    },
    CENTER_DETAILS: {
        id: 'CenterDetails',
        label: { ar: 'معلومات المركز', en: 'Center Information' },
        order: 2
    },
    CENTER_ADDRESS: {
        id: 'CenterAddress',
        label: { ar: 'موقع المركز الجديد', en: 'Center Address' },
        order: 3
    },
    CENTER_OWNER: {
        id: 'centerOwner',
        label: { ar: 'معلومات مالك المركز', en: 'Center Owner information' },
        order: 3
    },
    REQUIREMENTS: {
        id: 'Requirements',
        label: { ar: 'المتطلبات', en: 'Requirements' },
        order: 4
    },
    CENTER_MANAGER_INFO: {

        id: 'SugManagerInfo',
        label: {
            ar: 'بيانات مدير المركز المُرَشَّح',
            en: 'Center Manager Information'
        },
        labelFunc: (values) => {
            if (values.type === '08') {
                //ضيافة الأطفال
                if (values.targetedBenificiray === '11') {
                    //ضيافة منزلية
                    return 'بيانات مالكة المركز (مقر الضيافة المنزلية)';
                } else {
                    // ضيافة مستقلة
                    return 'بيانات مديرة المركز';
                }
            } else {
                // (values.type === "03") // كبار السن
                return 'بيانات مدير/ة المركز';
            }
        },
        order: 4
    },
    CAPACITY: {
        id: 'Capacity',
        label: { ar: 'الطاقة الإستعابية', en: 'Capacity' },
        order: 5
    },
    HEALTH_SERVICES: {
        id: 'HealthServices',
        label: { ar: 'الخدمات الصحية', en: 'Health Services' },
        order: 6
    },
    OTHER_ATTACHMENTS: {
        id: 'OtherAttachments',
        label: { ar: ' ملفات أخرى', en: 'Other Attachments' },
        order: 8
    },
};
export default


    [
        {
            id: uuid(),
            label: {
                ar: 'رقم السجل التجاري',
                en: 'Commercial Registration No'
            },
            name: 'CRNumber',
            type: 'Text',
            gridSize: '4',
            sectionName: Sections.CENTER_DETAILS,
            validators: [],
        },

        {
            id: uuid(),
            label: {
                ar: 'الاسم التجاري للمركز ',
                en: 'Temporary License Number'
            },
            name: 'companyName',
            type: 'Text',
            gridSizeFunc: (values) => !values.targetedGender && !values.ageGroup ? '6' : '4',
            sectionName: Sections.CENTER_DETAILS,
            validators: [],
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
            sectionName: Sections.CENTER_DETAILS,
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم رخصة البلدية',
                en: 'Municipal License'
            },
            name: 'municipLicenseNo',
            type: 'Text',
            gridSize: '12',
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },







        {
            id: uuid(),
            label: {
                ar: 'تاريخ إنتهاء رخصة الدفاع المدني',
                en: 'Fire department License Expiry Date'
            },
            name: 'fireDepartmentLicenseExpiryDate',
            attrFunc: (value) => { return getDateFromObject({ date: value, req: 'iYYYY/iMM/iDD' }) },
            type: 'Text',
            sectionName: Sections.REQUIREMENTS,
        },
        // {
        //     id: uuid(),
        //     label: {
        //         ar: 'ساعات عمل المركز',
        //         en: 'Center Working hours'
        //     },
        //     name: 'centerWorkingHours',
        //     valueFunc: (values) => getWorkingHours(values.centerWorkingHours),
        //     type: 'Text',
        //     gridSize: '4',
        //     sectionName: Sections.REQUIREMENTS,
        //     dependOn: {
        //         fieldName: 'type',
        //         value: '08'
        //     }
        // },
        {
            id: uuid(),
            label: {
                ar: "رخصة الدفاع المدني",
                en: 'Fire Department License'
            },
            name: 'fireDepartmentLicense',
            type: 'fileTable',
            valueFunc: (values) => (getDocId(values?.fireDepartmentLicense)),
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
            name: 'officeReport',
            type: 'fileTable',
            valueFunc: (values) => (getDocId(values?.officeReport)),
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },



        {
            id: uuid(),
            label: {
                ar: "المؤهل التعليمي لمالك المركز",
                en: 'Center Owner Educational Qualifications'
            },
            name: 'ownerEducationalQualifications',
            type: 'fileTable', 
            valueFunc: (values) => (getDocId(values?.ownerEducationalQualifications)),
            gridSize: '6',
            dependOnFunc: (values) => { return values?.includeOwnerQulfic},

            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
          
        },
        {
            id: uuid(),
            label: { ar: "الاسم", en: "Full Name" },
            type: "Text",
            name: "fullName",
            gridSize: '3',
            sectionName: Sections.CENTER_MANAGER_INFO,
        },
        {
            id: uuid(),
            label: { ar: "رقم الهوية الوطنية", en: "ID  Number" },
            type: "Text",
            name: "idNumber",
            valueFunc: (values) => { if (values.type != '01') return !!values?.idNumber ? values?.idNumber : idNumIqamaNum },
            gridSize: '3',
            sectionName: Sections.CENTER_MANAGER_INFO,
        },
        {
            id: uuid(),
            label: { ar: "تاريخ الميلاد", en: "Birth Date" },
            name: "birthDate",
            valueFunc: (values) => { return values.type != '01' ? values.managerBOD : DOB },
            type: "Text",
            gridSize: '3',
            sectionName: Sections.CENTER_MANAGER_INFO,
        },
        {
            id: uuid(),
            label: { ar: "الجنس", en: "Gender" },
            type: "Text",
            name: "gender",
            valueFunc: (values) => { if (values.type != '01') return !!values?.gender ? getGender(values?.gender) : getGender(gender) },
            gridSize: '3',
            sectionName: Sections.CENTER_MANAGER_INFO,
        },
        {
            id: uuid(),
            label: {
                ar: 'السيرة الذاتية',
                en: 'CV'
            },
            name: 'CV',
            type: 'fileTable',
            valueFunc: (values) => (getDocId(values?.CV)),
            gridSize: '6',
            sectionName: Sections.CENTER_MANAGER_INFO,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'المؤهل التعليمي',
                en: 'Educational Qualifications'
            },
            name: 'educationalQualifications',
            type: 'fileTable',
            valueFunc: (values) => (getDocId(values?.educationalQualifications)),
            gridSize: '6',
            sectionName: Sections.CENTER_MANAGER_INFO,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تقرير طبي',
                en: 'Medical Report'
            },
            name: 'medicalReport',
            type: 'fileTable',
            valueFunc: (values) => (getDocId(values?.medicalReport)),
            gridSize: '6',
            dependOnFunc: (values) => { return values.centerType != '03' },
            sectionName: Sections.CENTER_MANAGER_INFO,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'شهادة إتمام دورة الإسعافات األولية',
                en: 'FirstAid Course Completion Certificate'
            },
            name: 'firstAidCourseCompletionCertificate',
            type: 'fileTable',
            valueFunc: (values) => (getDocId(values?.firstAidCourseCompletionCertificate)),
            gridSize: '6',
            dependOnFunc: (values) => { return values.centerType != '03' },

            sectionName: Sections.CENTER_MANAGER_INFO,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'صك ملكية المنزل /عقد الإيجار',
                en: 'titleDeedOrLeaseContract'
            },
            name: 'titleDeedOrLeaseContract',
            type: 'fileTable',
            valueFunc: (values) => (getDocId(values?.titleDeedOrLeaseContract)),
            gridSize: '6',
            sectionName: Sections.CENTER_MANAGER_INFO,
            options: [],
            dependOnFunc: (values) => { return values.centerType != '03' },

            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'مخطط البناء',
                en: 'Building Scheme'
            },
            name: 'buildingScheme',
            type: 'fileTable',
            valueFunc: (values) => (getDocId(values?.buildingScheme)),
            gridSize: '6',
            sectionName: Sections.CENTER_MANAGER_INFO,
            options: [],
            dependOnFunc: (values) => { return values.centerType != '03' },

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
            valueFunc: (values) => { return values.address || getAddressFromObject(values) },
            type: 'Map',
            sectionName: Sections.CENTER_ADDRESS,
        },
        {
            id: uuid(),
            label: {
                ar: 'المدينة',
                en: 'city'
            },
            name: 'city',
            type: 'Text',
            gridSize: '4',
            sectionName: Sections.CENTER_ADDRESS,
        },
        {
            id: uuid(),
            label: {
                ar: 'الحي',
                en: 'sub'
            },
            name: 'sub',
            type: 'Text',
            gridSize: '4',
            sectionName: Sections.CENTER_ADDRESS,
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم الشارع',
                en: 'street'
            },
            name: 'street',
            type: 'Text',
            gridSize: '4',
            sectionName: Sections.CENTER_ADDRESS,
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم المبنى',
                en: 'buildNo'
            },
            name: 'buildNo',
            type: 'Text',
            gridSize: '4',
            sectionName: Sections.CENTER_ADDRESS,
        },
        {
            id: uuid(),
            label: {
                ar: 'الرمز البريدي',
                en: 'postalCode'
            },
            name: 'postalCode',
            type: 'Text',
            gridSize: '4',
            sectionName: Sections.CENTER_ADDRESS,
        },
        {
            id: uuid(),
            label: {
                ar: 'الرقم الإضافي',
                en: 'Additional Number'
            },
            name: 'additionalNo',
            type: 'Text',
            gridSize: '4',
            sectionName: Sections.CENTER_ADDRESS,
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
                        type: FieldsEnum.MULTI_LINE_TEXT,
                        attr: "description",
                    },
                    {
                        label: { ar: "الملف", en: "Document" },
                        type: "file",
                        attr: "document",
                    },
                ]
            },
            validators: [],
        }
        /* {
            id: uuid(),
            label: {
                ar: 'الخطة التشغيلية',
                en: 'Operational Plan'
            },
            name: 'operationPlan',
            type: 'fileTable',
            valueFunc: (values) => (getDocId(values?.operationPlan)),
            gridSize: '4',
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
            valueFunc: (values) => (getDocId(values?.executivePlan)),
            gridSize: '4',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: "إرفاق تقرير المسح الأمني",
                en: 'Security Report'
            },
            name: 'securityReport',
            type: 'fileTable',
             valueFunc: (values) => (getDocId(values?.securityReport)),
            gridSize: '4',
            sectionName: Sections.REQUIREMENTS,
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
            valueFunc: (values) => (getDocId(values?.Furniture)),
            gridSize: '4',
            sectionName: Sections.REQUIREMENTS,
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
            valueFunc: (values) => (getDocId(values?.financialGuaranteeAtt)),
            gridSize: '4',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        }, */
    ];
