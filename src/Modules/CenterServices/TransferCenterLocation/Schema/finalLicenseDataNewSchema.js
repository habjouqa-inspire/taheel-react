import { checkIsfilled } from 'src/Core/Utils/inputValidator';
import { v4 as uuid } from 'uuid';
import { getAddressFromObject } from '../../TransferCenterOwnership/Utils/FormateJson';
const Sections = {
    CenterDetails: {
        id: 'CenterDetails',
        label: { ar: 'بيانات المركز', en: 'Center Details' },
        order: 1
    },
    Location: {
        id: 'LocaitonDetails',
        label: { ar: 'بيانات العنوان الوطني و عنوان المركز', en: 'National Address' },
        order: 2
    }

}
export default
    [

        {
            id: uuid(),
            label: {
                ar: 'الاسم التجاري للمركز',
                en: 'Temporary License Number'
            },
            name: 'companyName',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            validators: [],
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
            sectionName: Sections.CenterDetails,
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
            sectionName: Sections.CenterDetails,
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
            sectionName: Sections.CenterDetails,
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ إنتهاء الترخيص',
                en: 'License Expiry Date'
            },
            name: 'licenseExpiryDate',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            validators: [],
        },

        {
            id: uuid(),
            label: {
                ar: 'موقع المركز',
                en: 'Center address'
            },
            name: 'address',
            valueFunc: (values) => { return values.address || getAddressFromObject(values) },
            type: 'Map',
            sectionName: Sections.Location,
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
            sectionName: Sections.Location,
            options: [],
            validators: [{
                id: 'city-required',
                isValidFun: checkIsfilled,
                alert: 'هذا الحقل مطلوب'
            }],
        },
        {
            id: uuid(),
            label: {
                ar: 'الحي',
                en: 'sub'
            },
            name: 'sub',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [{
                id: 'sub-required',
                isValidFun: checkIsfilled,
                alert: 'هذا الحقل مطلوب'
            }],
        },
        {
            id: uuid(),
            label: {
                ar: 'الشارع',
                en: 'street'
            },
            name: 'street',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [{
                id: 'street-required',
                isValidFun: checkIsfilled,
                alert: 'هذا الحقل مطلوب'
            }],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم المبنى',
                en: 'buildNo'
            },
            name: 'buildNo',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [{
                id: 'buildNo-required',
                isValidFun: checkIsfilled,
                alert: 'هذا الحقل مطلوب'
            }],
        },
        {
            id: uuid(),
            label: {
                ar: 'الرمز البريدي',
                en: 'postalCode'
            },
            name: 'postalCode',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [{
                id: 'postalCode-required',
                isValidFun: checkIsfilled,
                alert: 'هذا الحقل مطلوب'
            }],
        },
        {
            id: uuid(),
            label: {
                ar: 'الرقم الإضافي',
                en: 'additionalNo'
            },
            name: 'additionalNo',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [{
                id: 'additionalNo-required',
                isValidFun: checkIsfilled,
                alert: 'هذا الحقل مطلوب'
            }],
        },
    ];
