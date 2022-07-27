import FieldsEnum from 'src/Core/SchemaBuilder/Utils/FieldsEnum';
import { getDocId } from 'src/Core/Utils/TaheelUtils';
import { v4 as uuid } from 'uuid';

const Sections = {
    CENTER_DETAILS: {
        id: 'CenterDetails',
        label: { ar: 'معلومات المركز ', en: 'Center Details' },
        order: 1
    },

    FORMAL_LETTER: {
        id: 'FormalLetter',
        label: { ar: 'الخطاب الكتابي', en: 'Formal Letter' },
        order: 2,

    },
};

export default [
    {
        id: uuid(),
        label: {
            ar: 'رقم الترخيص',
            en: 'License Number',
        },
        name: 'centerLicenseNumber',
        type: FieldsEnum.CONTETNT_FIELD,
        gridSize: '6',
        sectionName: Sections.CENTER_DETAILS,
        validators: []
    },
    {
        id: uuid(),
        label: {
            ar: 'الاسم التجاري للمركز',
            en: 'Center Name'
        },
        name: 'companyName',
        type: FieldsEnum.CONTETNT_FIELD,
        gridSize: '6',
        sectionName: Sections.CENTER_DETAILS,
        validators: []
    },

    {
        id: uuid(),
        label: {
            ar: 'نوع النشاط التجاري للمركز',
            en: 'Center activity type'
        },
        name: 'activities',
        type: FieldsEnum.CONTETNT_FIELD,
        gridSize: '6',
        sectionName: Sections.CENTER_DETAILS,
        validators: []
    },

    {
        id: uuid(),
        label: {
            ar: 'رقم السجل التجاري ',
            en: 'CR Number'
        },
        name: 'CRNumber',
        type: FieldsEnum.CONTETNT_FIELD,
        gridSize: '6',
        sectionName: Sections.CENTER_DETAILS,

    },

    {
        id: uuid(),
        label: {
            ar: 'الخطاب الكتابي',
            en: 'Formal Letter'
        },
        name: 'formalLetter',
        type: FieldsEnum.FILE_UPLOADER_FIELD,
        valueFunc: (values) => getDocId(values?.formalLetter),
        gridSize: '6',
        sectionName: Sections.FORMAL_LETTER,
        options: [],
    },


];
