import { v4 as uuid } from 'uuid';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';
import { useNavigate } from 'react-router';

export function SchemaActions() {
  const navigateion = useNavigate();
  let icon
  return {
    actions: {
      label: {
        ar: 'عرض البرنامج',
        en: 'view program'
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
            ar: '',
            en: 'view'
          },
          // iconTagFunc: (data)=>{return !data.isValid? IconsTypeEnum.VISIBILITY_ICON : IconsTypeEnum.VISIBILITY_OFF_ICON},
          iconTag: IconsTypeEnum.VISIBILITY_ICON,
          color: 'primary',
          btnFun: async (data) => {
            const licenseNumber = data['centerLicense_r']['LicenseNumber']
            const CenterName = data['name']
            const isValid = !data.isValid
            //if(!data.isValid){
            navigateion('/center-services/centerPrograms', { state: { licenseNumber, status: 1, CenterName, isValid } })
          }
          //}
        }
      ]
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
      label: { ar: 'رقم الرخصة', en: 'license Number' },
      name: 'centerLicense_r.LicenseNumber',
      gridSize: '6',
      disabled: true
    },
    {
      inputType: 'TextField',
      type: 'text',
      label: { ar: 'تاريخ الإنتهاء', en: 'expiry date' },
      name: 'centerLicense_r.expirationHijri',
      gridSize: '6',
      disabled: true
    },
    {
      inputType: 'TextField',
      type: 'text',
      label: { ar: 'وضع الترخيص', en: 'status' },
      name: 'isValid',

      attrFunc: (value) => {
        return !!value ? 'غير نشط' : 'نشط';
      },
      gridSize: '6',
      disabled: true
    },
    {
      inputType: 'TextField',
      type: 'text',
      label: { ar: 'عدد البرامج', en: 'Number of programs' },
      name: 'programCount',


      gridSize: '6',
      disabled: true
    }
  ]
};
