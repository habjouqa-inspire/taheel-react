import { v4 as uuid } from 'uuid';

const getCenterType = (value) => {
    if (value === '01') {
        return 'الرعاية النهارية';
    }
    return '_';
}
const Sections = {
    LICENSE_DETAILS: {
        id: 'CenterDetails',
        label: { ar: 'بيانات المركز', en: 'license Details' },
        order: 1
    },
    CR_DETAILS: {
        id: 'crDetails',
        label: { ar: 'معلومات السجل التجاري للمركز', en: 'cr details ' },
        order: 2
    },


    OWNER_DETAILS: {
        id: 'ownerDetails',
        label: { ar: ' معلومات مالك المركز', en: 'owner details' },
        order: 3
    },
    ADDRESS: {
        id: 'Address',
        label: { ar: 'بيانات العنوان الوطني وعنوان المركز', en: 'Center Address' },
        order: 4
    },
}
export default
    [
        {
            id: uuid(),
            label: {
                ar: 'رقم الترخيص',
                en: ''
            },
            name: 'centerLicenceNumber',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.LICENSE_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'فئة المركز',
                en: 'center type'
            },
            name: 'centerType',
            type: 'Select',
            gridSize: 4,
            sectionName: Sections.LICENSE_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'نوع المركز',
                en: 'targeted benefaciary'
            },
            name: 'targetedBenificiray',
            type: 'Select',
            gridSize: 4,
            sectionName: Sections.LICENSE_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'إختصاص المركز',
                en: 'targeted services'
            },
            name: 'targetedServices',
            type: 'Select',
            gridSize: 4,
            sectionName: Sections.LICENSE_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'جنس المستفيدين',
                en: 'targeted gender'
            },
            name: 'targetedGender',
            type: 'Text',
            valueFunc: (v) => v?.targetedGender === 'm' ? "ذكور" : v?.targetedGender === 'f' ? "إناث" : "ذكور و إناث",
            gridSize: 4,
            sectionName: Sections.LICENSE_DETAILS,
            dependOn: {
                valueFunc: (values) => (values.centerType === '03' || values.centerType === '01')
            },
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ إنتهاء الترخيص',
                en: 'license expiry date'
            },
            name: 'licenseExpiryDate',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.LICENSE_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الفئة العمرية',
                en: 'targeted age'
            },
            name: 'ageGroup',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.LICENSE_DETAILS,
            dependOn: {
                valueFunc: (values) => values.centerType === '01'
            },
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: ' ساعات عمل المركز',
                en: 'working period'
            },
            labelFunc: (v) => v.centerType === '08' ?
                'ساعات عمل المركز' :
                'فترة العمل',
            name: 'center.workingHours',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.LICENSE_DETAILS,
            valueFunc: (v) => {
                if (v?.center?.workingHours === 'both') {
                    return "كلا الفترتين"
                } else if (v?.center?.workingHours === 'morning') {
                    return "صباحي"
                } else if (v?.center?.workingHours === 'evening') {
                    return "مسائي"
                } else if (v?.center?.workingHours === '6-12') {
                    return "السادسة صباحاً حتى العاشرة مساءً"
                } else if (v?.center?.workingHours === 'allDay') {
                    return "طوال أيام الأسبوع"
                }
            },
            dependOn: {
                valueFunc: (values) => (values.centerType === '03' || values.centerType === '01' || values.centerType === '08')
            },
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الطاقة الاستعابية القصوى للمركز',
                en: 'max benfaciary number'
            },
            name: 'center.centerInfo_r.carryingnumber',
            type: 'Text',
            dependOn: {
                valueFunc: (values) => values.centerType === '01'
            },
            gridSize: 4,
            sectionName: Sections.LICENSE_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'عدد المستفيدين',
                en: 'benefciary number'
            },
            name: 'center.centerInfo_r.beneficiaryCount',
            type: 'Text',
            dependOn: {
                valueFunc: (values) => values.centerType === '01'
            },
            gridSize: 4,
            sectionName: Sections.LICENSE_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم السجل التجاري',
                en: 'cr number'
            },
            name: 'CRNumber',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.CR_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الاسم التجاري للمركز',
                en: 'cr name'
            },
            name: 'centerName',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.CR_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'نوع النشاط التجاري',
                en: 'activity type'
            },
            name: 'center.crInfo_r.crActivityType',
            type: 'Text',
            gridSize: 12,
            sectionName: Sections.CR_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم رخصة البلدية',
                en: 'momra license number'
            },
            name: 'center.crInfo_r.MoMRA_Licence',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.CR_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المالك',
                en: 'owner name'
            },
            labelFunc: (values) => {
                if (values?.center?.centerOwner_r?.ownerType === '1') {
                    return 'اسم المالك'

                } else return ' الاسم التجاري للمنشأة'
            },
            name: 'center.centerOwner_r.ownerName',
            type: 'Text',
            gridSize: 6,
            sectionName: Sections.OWNER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المفوض',
                en: 'commissioner name'
            },
            name: 'commissioner_r.firstName',
            type: 'Text',
            valueFunc: (values) => values?.commissioner_r?.firstName + ' ' + values?.commissioner_r?.lastName,
            dependOn: {
                valueFunc: (values) => values?.center?.centerOwner_r?.ownerType === '2'
            },
            gridSize: 6,
            sectionName: Sections.OWNER_DETAILS,
            options: [],
            validators: [],
        },

        {
            id: uuid(),
            label: {
                ar: 'رقم الهوية الوطنية',
                en: 'owner ID'
            },
            name: 'center.centerOwner_r.ownerID',
            type: 'Text',
            dependOn: {
                valueFunc: (values) => values?.center?.centerOwner_r?.ownerType === '1'
            },
            gridSize: 6,
            sectionName: Sections.OWNER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المفوض',
                en: 'commissinor name'
            },
            name: '',
            type: 'Text',
            dependOn: {
                valueFunc: (values) => values?.center?.centerOwner_r?.ownerType === '2'
            },
            gridSize: 6,
            sectionName: Sections.OWNER_DETAILS,
            options: [],
            validators: [],
        },

        {
            id: uuid(),
            label: {
                ar: 'موقع المركز',
                en: 'Center address'
            },
            gridSize: '12',
            name: 'address',
            valueFunc: (values) => { return values.address },
            type: 'Map',
            sectionName: Sections.ADDRESS,
        },



        {
            id: uuid(),
            label: {
                ar: 'المدينة',
                en: 'City'
            },
            name: 'center.centerLocation_r.city',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.ADDRESS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الحي',
                en: 'Area'
            },
            name: 'center.centerLocation_r.area',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.ADDRESS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الشارع',
                en: 'Street'
            },
            name: 'center.centerLocation_r.street',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.ADDRESS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم المبنى',
                en: 'Building Number'
            },
            name: 'center.centerLocation_r.buildNo',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.ADDRESS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الرمز البريدي',
                en: 'Postal Code'
            },
            name: 'center.centerLocation_r.postalCode',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.ADDRESS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الرقم الإضافي',
                en: 'Additional Number'
            },
            name: 'center.centerLocation_r.additionalNo',
            type: 'Text',
            gridSize: 4,
            sectionName: Sections.ADDRESS,
            options: [],
            validators: [],
        },

    ]

