import { useNavigate } from 'react-router';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';
import { extractDateToObject, getDateFromString } from 'src/Core/Utils/TaheelUtils';
import { v4 as uuid } from 'uuid';

export function SchemaActions() {
  const navigateion = useNavigate();
  let icon
  return {
    actions: {
      label: {
        ar: '',
        en: ''
      },
      type: 'MoreVertIcon',
      buttons: [{
        id: uuid(),
        labelFunc: () => {
          return 'تمديد تعليق العمل'

        },
        iconTag: IconsTypeEnum.ADD_ICON,
        attrName: 'moreDetails',
        btnFun: async (values) => {
          console.log('تمديد تعليق العمل', values);

          navigateion('/center-services/suspendcenter',
            {
              state: {
                extendSus: true,
                centerVals: {
                  CenterLicenseNumber:values?.centerLicense_r?.LicenseNumber,
                  FromDate: extractDateToObject(values?.WorkSuspension_r?.startDateHijri),
                  ToDate: extractDateToObject(values?.WorkSuspension_r?.endDateHijri),
                }
              }
            })
        }
      },
      {
        id: uuid(),
        labelFunc: (values) => {
          return 'الغاء تعليق العمل'
        },
        color: 'action',
        iconTag: IconsTypeEnum.DELETE_ICON,
        btnFun: async (values) => {
          navigateion('/center-services/cancelsuspend', { state: { LicenseNumber: values?.centerLicense_r.LicenseNumber } })
        }
      }]
    }

  }
};

export default {
  schema: [
    {
      inputType: 'TextField',
      type: 'text',
      label: { ar: 'اسم المركز', en: 'center Name' },
      name: 'name',
      gridSize: '6',
      disabled: true
    },
    {
      inputType: 'TextField',
      type: 'text',
      label: { ar: 'رقم الترخيص', en: 'license Number' },
      name: 'centerLicense_r.LicenseNumber',
      gridSize: '6',
      disabled: true
    },
    {
      inputType: 'TextField',
      type: 'text',
      label: { ar: 'تاريخ إنتهاء الترخيص', en: 'expiry date' },
      name: 'centerLicense_r.expirationHijri',
      gridSize: '6',
      disabled: true
    },
    {
      inputType: 'TextField',
      type: 'text',
      label: { ar: 'تاريخ انتهاء فترة التعليق', en: 'status' },
      name: 'WorkSuspension_r.endDateHijri',
      attrFunc: (v) => { return getDateFromString(v, 'iYYYYiMMiDD', 'iDD/iMM/iYYYY') },


      gridSize: '6',
      disabled: true
    },
    {
      inputType: 'TextField',
      type: 'text',
      label: { ar: 'حالة التعليق', en: 'status' },
      name: 'isValid',

      attrFunc: (value) => {
        return !!value ? 'قيد المراجعة' : 'معلق';
      },
      gridSize: '6',
      disabled: true
    },

  ]
};
