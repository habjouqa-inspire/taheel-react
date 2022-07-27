import { v4 as uuid } from 'uuid';

const Sections = {
    CurrnetCenterOwnerDetails: {
        id: 'CurrnetCenterOwnerDetails',
        label: { ar: '', en: '' },
        order: 1
    }
}
export default
    [
        {
            id: uuid(),
            label: {
                ar: 'اسم المالك الحالي',
                en: 'Current owner name'
            },
            name: 'ownerName',
            type: 'Text',
            gridSizeFunc: (values) => !!values?.commissionerName ? 6 : 12,
            sectionName: Sections.CurrnetCenterOwnerDetails,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم المفوض',
                en: 'Commissioner name'
            },
            name: 'commissionerName',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CurrnetCenterOwnerDetails,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: "عقد المبايعة",
                en: 'Sales contract'
            },
            name: 'salesDoc',
            valueFunc: (values) => (values?.salesDoc?.id), /// check in here !
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.CurrnetCenterOwnerDetails,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: "إقرار التنازل",
                en: 'Approval of waiver'
            },
            name: 'waiverDoc',
            valueFunc: (values) => (values?.waiverDoc?.id),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.CurrnetCenterOwnerDetails,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رخصة الدفاع المدني',
                en: 'Fire department License'
            },
            name: 'FireDepartmentLicense',
            valueFunc: (values) => (values?.fireDepartmentLicense),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.Attachments,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تقرير مكتب هندسي معتمد (للمبنى الجديد)',
                en: 'Engineering Report'
            },
            name: 'engineeringPlan',
            valueFunc: (values) => (values?.engineeringPlan),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.Attachments,
            options: [],
            validators: [],
        },
    ]

