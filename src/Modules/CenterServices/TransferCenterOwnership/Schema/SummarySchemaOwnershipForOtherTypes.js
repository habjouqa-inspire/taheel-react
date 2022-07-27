import { OWNER_TYPE } from 'src/Core/Utils/enums';
import { getDocId } from 'src/Core/Utils/TaheelUtils';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { v4 as uuid } from 'uuid';
import { getAddressFromObject, getGender } from '../Utils/FormateJson';

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
const getCenterType = (value) => {
    console.log(value)
    if (value === '01') {
        return 'الرعاية النهارية';
    }
    return '_';
}
const getFullName = (value) => {
    return value?.firstName + ' ' + value?.lastName;
}


const Sections = {
    CENTER_DETAILS: {
        id: 'CenterDetails',
        label: { ar: 'معلومات المركز', en: 'Center Details' },
        order: 1
    },
    LOCATION: {
        id: 'LocaitonDetails',
        label: { ar: 'بيانات العنوان الوطني وعنوان المركز', en: 'National Address' },
        order: 2
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
                if (values.targetedBeneficiary === '11') {
                    //ضيافة منزلية
                    return 'بيانات مالكة مقر الضيافة المنزلية';
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
    CENTER_INFO: {
        id: 'CenterInfo',
        label: { ar: ' معلومات نقل ملكية مركز', en: 'CenterInfo' },
        order: 3
    },
    ATTACHMENTS: {
        id: 'Attachments',
        label: { ar: 'ملفات أخرى', en: 'Attachments' },
        order: 4
    }
}
export default
    [
        {
            id: uuid(),
            label: {
                ar: 'رقم الطلب',
                en: 'Request Number'
            },
            name: 'request.requestNum',
            type: 'Text',
            gridSize: 6,
            sectionName: Sections.CENTER_DETAILS,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ الطلب',
                en: 'Request Date'
            },
            name: 'requestDate',
            type: 'Text',
            gridSize: 6,
            sectionName: Sections.CENTER_DETAILS,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الاسم التجاري للمركز',
                en: 'Temporary License Number'
            },
            name: 'center.name',
            valueFunc: (values) => { return values?.center?.name?values?.center?.name:'-' },
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
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
                ar: 'رقم الترخيص',
                en: 'Final License Number'
            },
            name: 'center.centerLicense_r.LicenseNumber',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ الإنتهاء',
                en: 'Final License Expiry Date'
            },
            name: 'center.centerLicense_r.expirationHijri',
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
                en: 'benficiaries gender'
            },
            name: 'centerGenderGroup',
            type: 'Select',
            gridSize: 6,
            sectionName: Sections.CENTER_DETAILS,
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
                en: 'working period'
            },
            labelFunc: (v) => v.centerType === '08' ?
                'ساعات عمل المركز' :
                'فترة العمل',
            name: 'workingHours',
            type: 'Text',
            gridSize: 6,
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
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
            sectionName: Sections.LOCATION,

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
            sectionName: Sections.LOCATION,
            options: [],
            validators: [],
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
            sectionName: Sections.LOCATION,
            options: [],
            validators: [],
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
            sectionName: Sections.LOCATION,
            options: [],
            validators: [],
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
            sectionName: Sections.LOCATION,
            options: [],
            validators: [],
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
            sectionName: Sections.LOCATION,
            options: [],
            validators: [],
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
            sectionName: Sections.LOCATION,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'صفة المالك الجديد',
                en: 'New Owner Type'
            },
            name: 'NewCenterLocationData.centerOwner_r.ownerTyp',
            options: [
                { value: OWNER_TYPE.NATURAL_TYPE, label: { ar: 'صفة طبيعية' } },
                { value: OWNER_TYPE.LEGAL_TYPE, label: { ar: 'صفة إعتبارية' } },
            ],
            type: 'Select',
            gridSize: '6',
            sectionName: Sections.CENTER_INFO,
            validators: [],
        },
     
        {
            id: uuid(),
            label: {
                ar: 'رقم الإقامة/الهوية للمالك الجديد',
                en: 'ID/ Iqama No. of the new Owner '
            },
            name: 'NewCenterLocationData.newOwner.idNumIqamaNum',
            type: 'Text',
            gridSize: '6',
         
            sectionName: Sections.CENTER_INFO,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ الميلاد',
                en: 'Date of Birth'
            },
            name: 'NewCenterLocationData.newOwner.DOB',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_INFO,
            validators: [],
        },
        // {
        //     id: uuid(),
        //     label: {
        //         ar: 'رقم السجل التجاري للمالك الجديد',
        //         en: 'CR No. of the new owner'
        //     },
        //     name: 'NewCenterLocationData.NewCenterLocationData.crInfo_r.crNumber',
        //     type: 'Text',
        //     gridSize: '6',
        //     sectionName: Sections.CENTER_INFO,
        //     validators: [],
        // },
        {
            id: uuid(),
            label: {
                ar: 'اسم المالك الجديد',
                en: 'Name of the new Center Owner'
            },
            name: 'NewCenterLocationData.newOwner',
            valueFunc: (values) => getFullName(values?.NewCenterLocationData?.newOwner),
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_INFO,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الجنس',
                en: 'gender'
            },
            name: 'NewCenterLocationData.newOwner.gender',
            valueFunc: (values) => getGender(values?.NewCenterLocationData?.newOwner?.gender),
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_INFO,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المفوض',
                en: 'Commissioner Name'
            },
            name: 'NewCenterLocationData.crCommissioner.name',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_INFO,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تحديد مقر نقل ملكية',
                en: ' Location of Ownership Transfer'
            },
            name: 'NewCenterLocationData.otherData.LocationofOwnershipTransfer',
            type: 'Select',
            gridSize: '6',
            options: [
                { value: "SAME", label: { ar: 'نقل ملكية مقر حالي', en: 'Same center location' } },
                { value: "CHANGED", label: { ar: 'نقل ملكية لمقر جديد', en: 'Change center location' } },
            ],
            sectionName: Sections.CENTER_INFO,
            validators: [],
        },
        {
            id: uuid(),
            label: { ar: "الاسم", en: "Full Name" },
            type: "Text",
            valueFunc: (values) => { if (values.type != '01') return !!values?.fullName ? values?.fullName : firstName+' ' +lastName},

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
        {
            id: uuid(),
            label: {
                ar: 'عقد المبايعة',
                en: 'Contract of Sale'
            },
            name: 'ContractOfSale',
            valueFunc: (values) => (getDocId(values?.NewCenterLocationData?.otherData?.ContractOfSale)),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.ATTACHMENTS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'إقرار التنازل',
                en: ' waiver Declaration'
            },
            name: 'WaiverDeclaration',
            valueFunc: (values) => (getDocId(values?.NewCenterLocationData?.otherData?.WaiverDeclaration)),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.ATTACHMENTS,
            options: [],
            validators: [],
        },
    ]