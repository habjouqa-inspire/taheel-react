import { OWNER_TYPE } from 'src/Core/Utils/enums';
import { v4 as uuid } from 'uuid';
import { getAddressFromObject } from '../Utils/FormateJson';

const getCenterType = (value) => {
    if (value === '01') {
        return 'الرعاية النهارية';
    }
    return '_';
}
const Sections = {
    CENTER_DETAILS: {
        id: 'CenterDetails',
        label: { ar: 'بيانات المركز', en: 'Center Details' },
        order: 1
    },
    OWNER_DETAILS: {
        id: 'currentOwner',
        label: { ar: 'معلومات المالك الحالي للمركز', en: 'current owner information ' },
        order: 2
    },

    ADDRESS: {
        id: 'Address',
        label: { ar: 'بيانات العنوان الوطني وعنوان المركز', en: 'Center Address' },
        order: 3
    },
    OTHER_ATTACHMENTS: {
        id: 'OtherAttachments',
        label: { ar: ' مرفقات أخرى', en: 'Other Attachments' },
        order: 4
    },

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
                ar: 'رقم الترخيص',
                en: 'Final License Number'
            },
            name: 'oldCenterDetails.centerLicenseNumber',
            type: 'Text',
            gridSize: 6,
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
                ar: 'تاريخ الإنتهاء',
                en: 'License Expiry Date'
            },
            name: 'oldCenterDetails.licenseExpiryDate',
            type: 'Text',
            gridSize: 6,
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
            type: 'Select',
            gridSize: 6,
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
            sectionName: Sections.CENTER_DETAILS,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المالك',
                en: 'owner name'
            },
            labelFunc: (values) => { if (values?.centerOwner_r?.ownerType === OWNER_TYPE.NATURAL_TYPE) { return 'اسم المالك' } else { return 'اسم المنشأة' } },
            name: 'centerOwner_r.ownerName',
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
                en: 'comm name'
            },
            name: 'oldOwnerName',
            type: 'Text',
            gridSize: 6,
            sectionName: Sections.OWNER_DETAILS,
            options: [],
            dependOn: {
                valueFunc: (values) => values?.centerOwner_r?.ownerType === OWNER_TYPE.LEGAL_TYPE
            },
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم الهوية الوطنية',
                en: 'ID Number'
            },

            name: 'centerOwner_r.ownerID',
            type: 'Text',
            gridSize: 6,
            sectionName: Sections.OWNER_DETAILS,
            dependOn: {
                valueFunc: (values) => values?.centerOwner_r?.ownerType === OWNER_TYPE.NATURAL_TYPE
            },
            options: [],
            validators: [],
        },


        {
            id: uuid(),
            label: {
                ar: 'إقرار التنازل',
                en: 'waiver file'
            },
            name: 'waiverDoc.id',
            type: 'file',
            gridSize: 6,
            sectionName: Sections.OWNER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'عقد المبايعة',
                en: 'Contract Of Sale'
            },
            name: 'salesDoc.id',
            type: 'file',
            gridSize: 6,
            sectionName: Sections.OWNER_DETAILS,
            options: [],
            validators: [],
        },
        /*  {
             id: uuid(),
             label: {
                 ar: 'عنوان المركز الحالي',
                 en: 'Center Address'
             },
             name:'oldCenterDetails.crInfo_r.MoMRA_Licence',
             type: 'Text',
             gridSize: 6,
             sectionName: Sections.CENTERDETAILS,
             options: [],
             validators: [],
         }, */
        // {
        //     id: uuid(),
        //     label: {
        //         ar: 'نشاط السجل التجاري',
        //         en: 'Commercial Registration Activity'
        //     },
        //     name: 'oldCenterDetails.activities',
        //     type: 'Text',
        //     gridSize: 6,
        //     sectionName: Sections.CENTER_DETAILS,
        //     options: [],
        //     validators: [],
        // },
        {
            id: uuid(),
            label: {
                ar: 'موقع المركز',
                en: 'Center address'
            },
            name: 'address',
            valueFunc: (values) => { return values?.oldCenterDetails?.address || getAddressFromObject(values.oldCenterDetails) },
            type: 'Map',
            sectionName: Sections.ADDRESS,
        },


        {
            id: uuid(),
            label: {
                ar: 'المدينة',
                en: 'City'
            },
            name: 'oldCenterDetails.city',
            type: 'Text',
            gridSize: 6,
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
            name: 'oldCenterDetails.sub',
            type: 'Text',
            gridSize: 6,
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
            name: 'oldCenterDetails.street',
            type: 'Text',
            gridSize: 6,
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
            name: 'oldCenterDetails.buildNo',
            type: 'Text',
            gridSize: 6,
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
            name: 'oldCenterDetails.postalCode',
            type: 'Text',
            gridSize: 6,
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
            name: 'oldCenterDetails.additionalNo',
            type: 'Text',
            gridSize: 6,
            sectionName: Sections.ADDRESS,
            options: [],
            validators: [],
        },

    ]

