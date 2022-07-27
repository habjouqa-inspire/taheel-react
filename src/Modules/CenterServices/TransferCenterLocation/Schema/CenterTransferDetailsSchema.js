import { v4 as uuid } from 'uuid';

const Sections = {
  CenterDetails: {
    id: 'CenterDetails',
    label: { ar: 'بيانات الترخيص النهائي ', en: 'Center Details' },
    order: 1
  },
  Capacity: {
    id: 'CapacityDetails',
    label: { ar: 'الطاقة الاستيعابيه  ', en: 'Capacity Details' },
    order: 2
  },
};

export default [
  {
    id: uuid(),
    label: {
      ar: 'الاسم التجاري للمركز',
      en: 'Temporary License Number'
    },
    name: 'name',
    path: 'name',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CenterDetails,
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'رقم السجل التجاري للمركز',
      en: 'Commercial Registration No'
    },
    name: 'crInfo_r.crNumber',
    // path: 'crInfo_r.crNumber',

    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CenterDetails,
    options: [],
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'نوع النشاط التجاري للمركز',
      en: 'activities'
    },
    name: 'crInfo_r.crActivityType',
    // path: 'crInfo_r.crActivityType',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.CenterDetails,
    validators: []
  },
  //

  {
    id: uuid(),

    label: {
      ar: 'الطاقة الاستيعابية',

      en: 'capacity'
    },
    name: 'center.centerInfo_r.carryingnumber',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.Capacity,
    options: [],
    validators: []
  },
  {
    id: uuid(),
    label: {
      ar: 'الضمان المالي',
      en: 'Financial Guarantee'
    },
    name: 'center.centerInfo_r.financialGuarantee',
    type: 'Text',
    gridSize: '6',
    sectionName: Sections.Capacity,
    options: [],
    validators: []
  },
];
