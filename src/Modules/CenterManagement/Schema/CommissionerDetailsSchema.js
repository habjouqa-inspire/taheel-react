import { v4 as uuid } from 'uuid';
import FieldsEnum from 'src/Core/SchemaBuilder/Utils/FieldsEnum';
import { checkEmailPattern, checkIsfilled } from 'src/Core/Utils/inputValidator';

const infoSection = {
    id: 'Informaion',
    label: { ar: 'المعلومات العامة', en: 'Public informaion' },
    order: 1
}
export default [
    {
        id: uuid(),
        label: {
            ar: 'اختيار المفوض',
            en: 'Staff ID'
        },
        name: 'staffId',
        type: FieldsEnum.SELECT_FIELD,
        validators: [{
            id: 'staffId-required',
            name: 'staffId',
            alert: 'هذا الحقل مطلوب'
        }],
        sectionName: infoSection,
        gridSize: 4,
    },
    {
        id: uuid(),
        label: {
            ar: 'المسمى الوظيفي',
            en: 'Job title'
        },
        name: 'jobTitle',
        type: FieldsEnum.TEXT_FIELD,
        validators: [{
            id: 'jobTitle-required',
            name: 'email',
            isValidFun: checkIsfilled,
            alert: 'هذا الحقل مطلوب'
        }],
        sectionName: infoSection,
        gridSize: 4,
    },
    {
        id: uuid(),
        label: {
            ar: 'البربد الالكتروني',
            en: 'Email'
        },
        name: 'email',
        fieldType: 'email',
        type: FieldsEnum.TEXT_FIELD,
        validators: [{
            id: 'email-required',
            name: 'email',
            isValidFun: checkIsfilled,
            alert: 'هذا الحقل مطلوب'
        },
        {
            id: 'staffId-required',
            name: 'email',
            isValidFun: checkEmailPattern,
            alert: 'يرجى إدخال بريد إلكتروني صحيح'
        }],
        sectionName: infoSection,
        gridSize: 8,
    },
    {
        id: uuid(),
        label: {
            ar: '',
            en: ''
        },
        sectionName: {
            id: 'CenterDetails',
            label: { ar: 'الصلاحيات', en: 'permissions' },
            order: 1
        },
        name: 'permissions',
        // validators: [{
        //     id: 'staffId-required',
        //     name: 'staffId',
        //     isValidFun: checkIsfilled,
        //     alert: 'هذا الحقل مطلوب'
        // }],
        type: FieldsEnum.CHECKBOX_FIELD,
        gridSize: 12,
    }
]
