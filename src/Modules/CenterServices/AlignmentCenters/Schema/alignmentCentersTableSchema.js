import FieldsEnum from 'src/Core/SchemaBuilder/Utils/FieldsEnum';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';


export function SchemaActions() {
    const navigateion = useNavigate()
    return {
        actions: {
            label: {
                ar: '',
                en: ''
            },
            // type: 'MoreVertIcon',
            type: FieldsEnum.BUTTON_FIELD,
            buttons: [{
                id: uuid(),
                label: {
                    ar: 'عرض التفاصيل',
                    en: 'More Details'
                },
                iconTag: IconsTypeEnum.KEYBOARD_RETURN_ICON,
                attrName: 'moreDetails',
                btnFun: async (data) => {
                    const licenseNumber = data['centerLicense_r']['LicenseNumber']
                    const centerType = data['type']
                    const totalCount =data['totalCount']
                    navigateion('/alignment/center-details', { state: { licenseNumber , centerType ,totalCount } })
                }
            }]
        }
    }
}
export default {

    schema: [
        {
            id: uuid(),
            label: {
                ar: 'اسم المركز',
                en: 'Center Name'
            },
            name: 'name',
            type: FieldsEnum.TEXT_FIELD,
            gridSize: '6',
        },
        {
            id: uuid(),
            label: {
                ar: 'نوع المركز',
                en: 'Targeted Benificiray'
            },
            name: 'targetedBenificiray',
            // attrFunc: (data) => { return `${data.type} - ${data.targetedBenificiray} - ${data.targetedServices}` },
            type: 'Select',
            gridSize: '6',
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ إنتهاء الرخصة',
                en: 'License expiration date'
            },
            name: 'centerLicense_r.expirationHijri',
            // attrFunc: (value) => { return value.centerLicense_r.expirationDate },
            type: FieldsEnum.TEXT_FIELD,
            gridSize: '6',
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ إصدار الرخصة',
                en: 'License issue date'
            },
            name: 'centerLicense_r.creationHijri',
            // attrFunc: (value) => { return value.centerLicense_r.creationDate },
            type: FieldsEnum.TEXT_FIELD,
            gridSize: '6',
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم رخصة',
                en: 'License No'
            },
            name: 'centerLicense_r.LicenseNumber',
            // attrFunc: (value) => { return value.centerLicense_r.LicenseNumber },
            type: FieldsEnum.TEXT_FIELD,
            gridSize: '6',
        },


    ]
}