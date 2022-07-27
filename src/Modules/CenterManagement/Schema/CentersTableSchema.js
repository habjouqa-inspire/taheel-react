import { useNavigate } from 'react-router';
import FieldsEnum from 'src/Core/SchemaBuilder/Utils/FieldsEnum';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';
import { v4 as uuid } from 'uuid';
import { getDocId } from 'src/Core/Utils/TaheelUtils';

const getValue = (data) => { return data.centerLicense_r.LicenseNumber }

export function SchemaActions() {
    const navigateion = useNavigate()
    return {
        actions: {
            label: {
                ar: '',
                en: ''
            },
            type: 'MoreVertIcon',
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
                    navigateion('/app/centersDetails', { state: { licenseNumber } })
                }
            },
            {
                id: uuid(),
                label: {
                    ar: 'ادارة المفوضين',
                    en: 'Commissioner managments'
                },
                iconTag: IconsTypeEnum.ADD_ICON,
                btnFun: async (data) => {
                    const licenseNumber = data['centerLicense_r']['LicenseNumber']
                    navigateion('/app/CommissionersManagement', { state: { licenseNumber } })
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
                en: 'center Type'
            },
            name: 'centerType',
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
        {
            id: uuid(),
            label: {
                ar: 'تنزيل الرخصة',
                en: 'License Attachment'
            },
            name: 'centerLicense_r.LicenseDoc',
            valueFunc: (values) => { return getDocId(values?.centerLicense_r?.LicenseDoc) },
            type: FieldsEnum.FILE_FILED,
            gridSize: '6',
        },
    ]
}
