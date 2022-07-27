import { OWNER_TYPE } from 'src/Core/Utils/enums';
import { v4 as uuid } from 'uuid';

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
    ADDRESS: {
        id: 'Address',
        label: { ar: 'عنوان المركز', en: 'Center Address' },
        order: 2
    },
    CurrnetCenterOwnerDetails: {
        id: 'CurrnetCenterOwnerDetails',
        label: { ar: 'بيانات المالك الحالي للمركز', en: '' },
        order: 3
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
                ar: 'نشاط السجل التجاري',
                en: 'Commercial Registration Activity'
            },
            name: 'oldCenterDetails.activities',
            type: 'Text',
            gridSize: 12,
            sectionName: Sections.CENTER_DETAILS,
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
        {
            id: uuid(),
            label: {
                ar: 'إقرار التنازل',
                en: 'waiver file'
            },
            name: 'waiverDoc.id',
            type: 'file',
            gridSize: 6,
            sectionName: Sections.CENTER_DETAILS,
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
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
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
            name: 'oldCenterDetails.area',
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
        {
            id: uuid(),
            label: {
                ar: 'اسم المالك الحالي',
                en: 'Current owner name'
            },
            labelFunc: (v) => v?.centerOwner_r?.ownerType === OWNER_TYPE.LEGAL_TYPE ? 'اسم المنشأة' : 'اسم المالك الحالي',
             name: 'centerOwner_r.ownerName',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CurrnetCenterOwnerDetails,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المفوض',
                en: 'Commissioner name'
            },
            name: 'oldOwnerName',
            type: 'Text',
            gridSize: '6',
            dependOn: {
                valueFunc: (v) => v?.centerOwner_r?.ownerType === '2'
            },
            sectionName: Sections.CurrnetCenterOwnerDetails,
            options: [],
            validators: [],
        },
    ]

