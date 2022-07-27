import { dateFormatter } from "src/Core/Utils/TaheelUtils";
import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    label: {
      ar: "تاريخ الطلب",
      en: 'centerCreationDate'
    },
    name: 'creationHijri',
    attrFunc: (value) => { if(!!value) return dateFormatter(value, 'iDDiMMiYYYY') },
    type: 'Text',
    gridSize: '6',
    // dependOnFunc:(values)=>{return false}
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
  },
  {
    id: uuid(),
    label: {
      ar: "جنس المستفيد",
      en: 'targetedGender'
    },
    name: 'targetedGender',
    type: 'Select',
    gridSize: '6',
    options: [
      { value: 'm', label: { ar: 'ذكور' } },
      { value: 'f', label: { ar: 'إناث' } },
      { value: 'b', label: { ar: 'ذكور و إناث' } }
    ],
  },
  {
    id: uuid(),
    label: {
      ar: "فترة العمل",
      en: 'workingHours'
    },
    name: 'workingHours',
    type: 'Radio',
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
    gridSize: '6',
  },

];
