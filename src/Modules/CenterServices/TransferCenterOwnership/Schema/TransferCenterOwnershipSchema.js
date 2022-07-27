import { OWNER_TYPE } from 'src/Core/Utils/enums';
import { getDocId } from 'src/Core/Utils/TaheelUtils';
import { v4 as uuid } from 'uuid';
import { getAddressFromObject, getGender } from '../Utils/FormateJson';

const getCenterType = (value) => {
    console.log(value)
    if (value === '01') {
        return 'الرعاية النهارية';
    }
    return '_';
}
const getFullName = (value) => {
    return value.firstName + ' ' + value.lastName;
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
    CENTER_INFO: {
        id: 'CenterInfo',
        label: { ar: ' معلومات نقل ملكية مركز', en: 'CenterInfo' },
        order: 3
    },
    ATTACHMENTS: {
        id: 'Attachments',
        label: { ar: 'المرفقات', en: 'Attachments' },
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
            name: 'requestNum',
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
            valueFunc: (values) => { return values?.center?.name ? values?.center?.name : '-' },
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
                ar: 'ساعات عمل المركز',
                en: 'working period'
            },
            labelFunc: (v) => v.centerType === '08' ?
                'ساعات عمل المركز' :
                'فترة العمل',
            name: 'center.workingHours',
            type: 'Select',
            gridSize: 6,
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

            ], validators: [],
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
            name: 'NewCenterLocationData.NewCenterLocationData.centerOwner_r.ownerType',
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
            dependOn: {
                fieldName: '',
                valueFunc: (values) => values?.NewCenterLocationData?.NewCenterLocationData?.centerOwner_r?.ownerType === OWNER_TYPE.NATURAL_TYPE
            },
            sectionName: Sections.CENTER_INFO,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المفوض',
                en: 'Commissioner name'
            },
            name: 'NewCenterLocationData.crCommissioner.name',
            type: 'Text',
            gridSize: 6,
            sectionName: Sections.CENTER_INFO,
            dependOn: {
                valueFunc: (values) => values?.NewCenterLocationData?.NewCenterLocationData?.centerOwner_r?.ownerType === OWNER_TYPE.LEGAL_TYPE
            },
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المالك الجديد',
                en: 'Name of the new Center Owner'
            },
            name: 'NewCenterLocationData.newOwner.firstName',
            valueFunc: (v) => {
                if (v.NewCenterLocationData?.NewCenterLocationData?.centerOwner_r?.ownerType === OWNER_TYPE.NATURAL_TYPE) {
                    return v?.NewCenterLocationData?.newOwner?.firstName + ' ' + v?.NewCenterLocationData?.newOwner?.lastName

                } else {
                    return v?.NewCenterLocationData?.NewCenterLocationData?.centerOwner_r.ownerName
                }
            },
            labelFunc: (v) => {
                return v.NewCenterLocationData?.NewCenterLocationData?.centerOwner_r?.ownerType === OWNER_TYPE.NATURAL_TYPE ?
                    'اسم المالك الجديد'
                    : 'اسم المنشأة'
            },
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
            dependOn: {
                fieldName: '',
                valueFunc: (values) => values?.NewCenterLocationData?.NewCenterLocationData?.centerOwner_r?.ownerType === OWNER_TYPE.NATURAL_TYPE
            },
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

        // {
        //     id: uuid(),
        //     label: {
        //         ar: 'اسم المفوض',
        //         en: 'Commissioner Name'
        //     },
        //     name: 'commissionerName',
        //     type: 'Text',
        //     gridSize: '6',
        //     sectionName: Sections.CENTER_INFO,
        //     validators: [],
        // },
        {
            id: uuid(),
            label: {
                ar: 'الجنس',
                en: 'gender'
            },
            dependOn: {
                fieldName: '',
                valueFunc: (values) => values.NewCenterLocationData?.NewCenterLocationData?.centerOwner_r?.ownerType === OWNER_TYPE.NATURAL_TYPE
            },
            name: 'NewCenterLocationData.newOwner.gender',
            valueFunc: (values) => getGender(values?.NewCenterLocationData?.newOwner?.gender),
            dependOn: {
                fieldName: '',
                valueFunc: (values) => values.NewCenterLocationData?.NewCenterLocationData?.centerOwner_r?.ownerType === OWNER_TYPE.NATURAL_TYPE
            },
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