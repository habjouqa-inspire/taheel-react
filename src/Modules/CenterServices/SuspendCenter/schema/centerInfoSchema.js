import { OWNER_TYPE } from 'src/Core/Utils/enums';
import {
    getDateFromString, getWorkingHours
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
        labelFunc: (values) => {
            if (values.centerType === '08' && values.targetedBenificiray === '11') {
                return 'بيانات مالكة المركز (مقر الضيافة المنزلية)'
            }
            return "معلومات مالك المركز"
        },
        order: 3
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
    SUS_INFO: {
        id: 'SuspendInfo',
        label: { ar: 'بيانات تعليق العمل', en: 'Health Services' },
        order: 6
    },
    CENTER_ADDRESS: {
        id: 'CenterAddress',
        label: { ar: 'بيانات العنوان الوطني و عنوان المركز', en: 'Center Address' },
        order: 5
    }
};
export default

    //LICENSING_DETAILS
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
            ar: 'تاريخ إصدار الترخيص',
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
            ar: 'تاريخ انتهاء الترخيص',
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
    {
        id: uuid(),
        label: {
            ar: 'فترة العمل',
            en: 'workingHours'
        },
        name: 'workingHours',
        type: 'Radio',
        gridSize: '4',
        dependOn: {
            valueFunc: (values) => (values.centerType === '03' || values.centerType === '01')
        },
        sectionName: Sections.LICENSING_DETAILS,
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
            ar: 'الفئة العمرية',
            en: 'ageGroup'
        },
        name: 'ageGroup',
        type: 'Radio',
        gridSize: '4',
        
        sectionName: Sections.LICENSING_DETAILS,
        options: [
            { value: '2-12', label: { ar: 'سنتين - ١٢سنة' } },
            { value: '13-18', label: { ar: '١٣سنة - ١٨سنة' } },
            { value: '19-45', label: { ar: '١٩سنة -٤٥سنة' } },

        ],
        dependOn: {
            valueFunc: (v) =>  v.centerType =="01" || (v.centerType==="08"&&v.targetedBenificiray==="11")

        },
    },
    {
        id: uuid(),
        label: {
            ar: 'الطاقة الاستعابية القصوى للمركز',
            en: 'capacity'
        },
        name: 'capacity',
        type: 'Text',
        gridSize: '4',
        sectionName: Sections.LICENSING_DETAILS,
        options: [],
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
        gridSize: '4',
        sectionName: Sections.LICENSING_DETAILS,
        options: [],
        validators: [],
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
            fieldName: 'centerType',
            value: '08'
        }
    },

    //

    // CENTER_DETAILS
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
    //
    // CENTER_OWNER
    {
        id: uuid(),
        label: {
            ar: 'اسم المالك',
            en: 'Owner name'
        },
        labelFunc: (values) => {
            if (values.ownerType === OWNER_TYPE.NATURAL_TYPE) {
                return 'اسم المالك'

            } else return 'الاسم التجاري للمنشأة'
        },
        name: 'ownerName',
        type: 'Text',
        gridSize: '6',
        sectionName: Sections.CENTER_OWNER,
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
            if (values.ownerType === OWNER_TYPE.LEGAL_TYPE)
                return 'رقم السجل التجاري للشركة المالكة'
            else return 'رقم الهوية الوطنية'
        },
        type: 'Text',
        gridSize: '6',
        dependOn: {
            valueFunc: (v) => v.ownerType === OWNER_TYPE.NATURAL_TYPE
        },
        sectionName: Sections.CENTER_OWNER,
        options: [],
        validators: [],
    },
    {
        id: uuid(),
        label: {
            ar: 'اسم المفوض',
            en: 'commissioner name'
        },
        name: 'commissioner_r',
        valueFunc:(v)=>v.commissioner_r?.firstName+' '+v.commissioner_r?.lastName,
        
        type: 'Text',
        gridSize: '6',
        dependOn: {
            valueFunc: (v) => v.ownerType === OWNER_TYPE.LEGAL_TYPE
        },
        sectionName: Sections.CENTER_OWNER,
        options: [],
        validators: [],
    },
    {
        id: uuid(),
        label: { ar: "تاريخ الميلاد", en: "Birth Date" },
        name: "birthDate",
        valueFunc: (values) => { if (values.type != '01') return values.managerBD ? `${values.managerBD.day}/${values.managerBD.month}/${values.managerBD.year}` : DOB },
        type: "Text",
        gridSize: '6',
        dependOn: {
            valueFunc: (v) => v.ownerType === OWNER_TYPE.NATURAL_TYPE && v.centerType =="08" && v.targetedBenificiray==="11"

        },
        sectionName: Sections.CENTER_OWNER,
    },
    {
        id: uuid(),
        label: { ar: "الجنس", en: "Gender" },
        type: "Text",
        name: "gender",
        valueFunc: (values) => { if (values.type != '01') return !!values?.gender ? getGender(values?.gender) : getGender(gender) },
        gridSize: '6',
        dependOn: {
            valueFunc: (v) => v.ownerType === OWNER_TYPE.NATURAL_TYPE && v.centerType =="08" && v.targetedBenificiray==="11"

        },
        sectionName: Sections.CENTER_OWNER,
    },
    //
    //

    // // CENTER_MANAGER_INFO
    // {
    //     id: uuid(),
    //     label: { ar: "اسم المالك", en: "Full Name" },
    //     type: "Text",
    //     name: "fullName",
    //     valueFunc: (values) => { if (values.type != '01') return !!values?.fullName ? values?.fullName : firstName + ' ' + secondName + ' ' + lastName },
    //     gridSize: '3',
    //     sectionName: Sections.CENTER_MANAGER_INFO,
    // },
    // {
    //     id: uuid(),
    //     label: { ar: "رقم الهوية الوطنية", en: "ID  Number" },
    //     type: "Text",
    //     name: "idNumber",
    //     valueFunc: (values) => { if (values.type != '01') return !!values?.idNumber ? values?.idNumber : idNumIqamaNum },
    //     gridSize: '3',
    //     dependOn: {
    //         fieldName: '',
    //         valueFunc: (values) => values.type != '08'
    //     },
    //     sectionName: Sections.CENTER_MANAGER_INFO,
    // },



    //CENTER_ADDRESS
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
        //

        // SUS_INFO

        //

    ];
