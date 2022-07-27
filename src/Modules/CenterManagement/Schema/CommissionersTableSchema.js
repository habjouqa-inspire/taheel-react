
import { useNavigate } from 'react-router';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';
import { dateFormatter } from "src/Core/Utils/TaheelUtils";
import { v4 as uuid } from 'uuid';

export function SchemaActions() {
    const navigateion = useNavigate()
    return {
        actions: {
            label: {
                ar: '',
                en: ''
            },
            buttons: [
                /* {
                    id: uuid(),
                    label: {
                        ar: 'تعديل',
                        en: 'Edit'
                    },
                    iconTagFunc: (data)=>{return data.StaffType==='4'?'':IconsTypeEnum.EDIT_ICON},
                    iconTag: IconsTypeEnum.EDIT_ICON,
                    btnFun: async (data) => {
                        const licenseNumber = data['licenseNumber']
                        console.log('licenseNumber ===> ',licenseNumber)
                        console.log('data ===> ',data)

                        navigateion('/app/AddCommissioner', { state: { licenseNumber } })
                    }
                }, */
                {
                    id: uuid(),
                    label: {
                        ar: 'حذف',
                        en: 'Delete'
                    },
                    iconTag: IconsTypeEnum.DELETE_ICON,
                    color: 'secondary',
                    btnFun: async (data, otherFunc) => {
                        otherFunc(data)
                    }
                }]
        }
    }
}
export default {
    schema: [
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'الاسم الكامل', en: 'Full Name' },
            valueFunc: (values) => { return values['firstName'] + ' ' + values['secondName'] + ' ' + values['thirdName'] + ' ' + values['lastName'] },
            name: 'name',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'رقم الهوية / الإقامة', en: 'Id number / Iqama number' },
            name: 'idNumIqamaNum',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'تاريخ الميلاد', en: 'Birthday' },
            attrFunc: (value) => { return dateFormatter(value, 'iDDiMMiYYYY') },
            name: 'DOB',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'البريد الاكتروني', en: 'Email' },
            name: 'email',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'الجنس', en: 'Gender' },
            attrFunc: (value) => { return (value === "m" ? "ذكور" : "إناث") },
            name: 'gender',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'الجنسية', en: 'Nationality' },
            name: 'Nationality',
            gridSize: '6',
            disabled: true
        },
        {
            inputType: 'TextField',
            type: 'text',
            label: { ar: 'اسم الكفيل', en: 'Sponser Name' },
            name: 'sponsorName',
            gridSize: '6',
            disabled: true
        }
    ]
}

