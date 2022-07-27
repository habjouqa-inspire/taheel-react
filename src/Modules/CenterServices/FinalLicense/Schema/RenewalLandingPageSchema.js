import { OWNER_TYPE } from 'src/Core/Utils/enums';
import { checkIsfilled } from 'src/Core/Utils/inputValidator';
import {
    getDateFromObject,
    getDateFromString,
    getDocId,
    getWorkingHours
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
        label: { ar: 'معلومات السجل التجاري للمركز', en: 'Center Information' },
        order: 2
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
    CENTER_ADDRESS: {
        id: 'CenterAddress',
        label: { ar: 'عنوان المركز', en: 'Center Address' },
        order: 7
    }
};
export default

    [{
        id: uuid(),
        label: {
            ar: 'رقم الترخيص',
            en: 'License Number'
        },
        name: 'centerLicenseNumber',
        type: 'Text',
        labelFunc: (values) => {
            if (values.renewal) return 'رقم الترخيص ';
            else return 'رقم الترخيص';
        },
        gridSize: '4',
        sectionName: Sections.LICENSING_DETAILS,
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
            ar: 'الفئة العمرية للمستفيدين',
            en: 'ageGroup'
        },
        name: 'ageGroup',
        type: 'Radio',
        gridSize: '4',
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
            ar: "فئة المركز",
            en: 'center Type'
        },
        name: 'centerType',
        type: 'Select',
        gridSize: '4',
        sectionName: Sections.LICENSING_DETAILS,
    },
    {
        id: uuid(),
        label: {
            ar: "نوع المركز",
            en: 'targeted Benificiray'
        },
        name: 'targetedBenificiray',
        type: 'Select',
        gridSizeFunc: (values) => !!values.workingHours ? '4' : '4',
        sectionName: Sections.LICENSING_DETAILS,
    },
    {
        id: uuid(),
        label: {
            ar: "اختصاص المركز",
            en: 'targetedServices'
        },
        name: 'targetedServices',
        type: 'Select',
        gridSize: '4',
        sectionName: Sections.LICENSING_DETAILS,
    },
    {
        id: uuid(),
        label: {
            ar: 'فترة العمل',
            en: 'workingHours'
        },
        name: 'workingHours',
        type: 'Radio',
        gridSize: '4',
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
            ar: 'جنس المستفدين',
            en: 'Targeted Gender'
        },
        name: 'centerGenderGroup',
        type: 'Radio',
        gridSize: '4',
        sectionName: Sections.LICENSING_DETAILS,
        options: [
            { value: 'f', label: { ar: 'إناث', en: 'female' } },
            { value: 'm', label: { ar: 'ذكور', en: 'male' } },
            { value: 'b', label: { ar: 'ذكور و إناث', en: 'both' } },
        ],
    },
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
            ar: 'الاسم التجاري',
            en: 'Commercial Name'
        },
        name: 'CRName',
        type: 'Text',
        gridSize: '4',
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
            ar: 'تاريخ الإصدار',
            en: 'License issue date'
        },
        name: 'licenseCreationDate',
        type: 'Text',
        gridSize: '4',
        attrFunc: (value) => { return getDateFromString(value, 'iYYYYiMMiDD', 'iYYYY/iMM/iDD') },
        sectionName: Sections.LICENSING_DETAILS,
        options: [],
        validators: [],
    },

    {
        id: uuid(),
        label: {
            ar: 'اسم المالك',
            en: 'Owner name'
        },
        labelFunc: (values) => {
            if (values.ownerType === '1') {
                return 'اسم المالك'

            } else return 'اسم المنشأة'
        },
        name: 'ownerName',
        type: 'Text',
        gridSize: '4',
        sectionName: Sections.CENTER_OWNER,
        dependOn: {
            fieldName: '',
            valueFunc: (values) => values.targetedBenificiray != '11'
        },
        options: [],
        validators: [],
    },
    {
        id: uuid(),
        label: {
            ar: ' رقم الهوية الوطنية',
            en: 'Owner ID'
        },
        name: 'ownerID',
        labelFunc: (values) => {
            if (values.ownerType === '2')
                return 'رقم السجل التجاري للشركة المالكة'
            else return 'رقم الهوية الوطنية'
        },
        type: 'Text',
        gridSize: '4',
        dependOnFunc: (values) => { return values.ownerType === '1' },

        dependOn: {
            fieldName: '',
            valueFunc: (values) => values.targetedBenificiray != '11'
        },
        sectionName: Sections.CENTER_OWNER,
        options: [],
        validators: [],
    },

    {
        id: uuid(),
        label: {
            ar: 'تاريخ الإنتهاء',
            en: 'License expiration date'
        },
        name: 'licenseExpiryDate',
        type: 'Text',
        gridSize: '4',
        attrFunc: (value) => { return getDateFromString(value, 'iYYYYiMMiDD', 'iYYYY/iMM/iDD') },
        sectionName: Sections.LICENSING_DETAILS,
        options: [],
        validators: [],
    },
    //capacity section
    {
        id: uuid(),
        label: {
            ar: 'عدد المستفيدين الفعلي',
            en: 'Beneficiaries Number'
        },
        name: 'beneficiariesNum',
        type: 'Text',
        gridSize: '4',
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
        gridSize: '4',
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
        gridSize: '4',

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
        gridSize: '4',
        dependOn: {
            valueFunc: (v) => v.centerType === '01'
        },
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
        gridSize: '4',
        sectionName: Sections.CAPACITY,
        options: [],
        validators: [],
    },
    //capacity 

    {
        id: uuid(),
        label: {
            ar: 'عدد المستفيدين الفعلي',
            en: 'Beneficiaries Number'
        },
        name: 'beneficiariesNum',
        type: 'Text',
        gridSize: '4',
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
        gridSize: '4',
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
        gridSize: '4',
        sectionName: Sections.CAPACITY,
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
        gridSize: '4',
        sectionName: Sections.CAPACITY,
        options: [],
        validators: [],
    },

    //HealthServices section
    {
        id: uuid(),
        label: {
            ar: 'تقديم خدمات صحية',
            en: 'Providing Health Services'
        },
        name: 'healthServices',
        attrFunc: (value) => { return value === 'no' || !value ? null : 'نعم' },
        type: 'Text',
        gridSize: '4',
        sectionName: Sections.HEALTH_SERVICES,
        /*   options: [
              { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
              { value: 'no', label: { ar: 'لا', en: 'No' } },
          ], */
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
        gridSize: '4',
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
            ar: 'تاريخ إنتهاء رخصة الدفاع المدني',
            en: 'Fire department License Expiry Date'
        },
        name: 'fireDepartmentLicenseExpiryDate',
        attrFunc: (value) => { return getDateFromObject({ date: value, req: 'iYYYY/iMM/iDD' }) },
        type: 'Text',
        sectionName: Sections.REQUIREMENTS,
    },
    {
        id: uuid(),
        label: {
            ar: 'ساعات عمل المركز',
            en: 'Center Working hours'
        },
        name: 'centerWorkingHours',
        valueFunc: (values) => getWorkingHours(values.centerWorkingHours),
        type: 'Text',
        gridSize: '4',
        sectionName: Sections.LICENSING_DETAILS,
        dependOn: {
            fieldName: 'type',
            value: '08'
        }
    },
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
        sectionName: Sections.REQUIREMENTS,
        options: [],
        validators: [],
        dependOn: {
            fieldName: 'ownerType',
            value: OWNER_TYPE.NATURAL_TYPE
        },
    },
    {
        id: uuid(),
        label: { ar: "الاسم", en: "Full Name" },
        type: "Text",
        name: "fullName",
        valueFunc: (values) => { if (values.type != '01') return !!values?.fullName ? values?.fullName : firstName + ' ' + secondName + ' ' + lastName },
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
        valueFunc: (values) => { if (values.type != '01') return values.managerBD ? `${values.managerBD.day}/${values.managerBD.month}/${values.managerBD.year}` : DOB },
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
