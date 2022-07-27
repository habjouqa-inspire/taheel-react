import { v4 as uuid } from 'uuid';
import FieldsEnum from 'src/Core/SchemaBuilder/Utils/FieldsEnum';


const Sections= {
  id: 'ProgramInformaion',
  label: { ar: 'معلومات البرنامج', en: 'Program information' }
}
export default 
  [
    {
      id: uuid(),
      label: {
        ar: 'رقم الرخصة',
        en: 'licenseNumber'
      },
      name: 'licenseNumber',
      type: FieldsEnum.TEXT_FIELD,
      sectionName: Sections.ProgramInformaion,

      gridSize: 6
    },
      {
        id: uuid(),
        label: {
          ar: 'البرنامج',
          en: 'program'
        },
        name: 'name',
        type: FieldsEnum.TEXT_FIELD,
        sectionName: Sections.ProgramInformaion,

        gridSize: 6
      },
    
      {
        id: uuid(),
        label: {
          ar: 'رسوم البرنامج',
          en: 'Program Fee'
        },
        name: 'programFee',
        type: FieldsEnum.TEXT_FIELD,
        sectionName: Sections.ProgramInformaion,

        gridSize: 6
      },
      {
        id: uuid(),
        label: {
          ar: 'جهة البرنامج',
          sectionName: Sections.ProgramInformaion,

          en: 'Program Category'
        },
        name: 'programCategory_r',
        attrFunc: (value) => {
          console.log(value)
          if (value === 1) {
              return 'تعليمي';
          }else if(value === 1){
            return 'مهني'
          }
          return 'صحي';
      },
        

        type: FieldsEnum.TEXT_FIELD,
        gridSize: 4
      },
      {
        id: uuid(),
        label: {
          ar: 'إعتماد البرنامج',
          en: 'accreditation Document'
        },
        name: 'accreditationDocument',     
        sectionName: Sections.ProgramInformaion,

        type: FieldsEnum.FILE_FILED,
        gridSize: 12
      }
    ]