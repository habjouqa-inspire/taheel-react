import { getDateFromObject, getDocId } from 'src/Core/Utils/TaheelUtils';
import { v4 as uuid } from 'uuid';
import { getAddressFromObject } from '../../TransferCenterOwnership/Utils/FormateJson';

const Sections = {
    CenterDetails: {
        id: 'CenterDetails',
        label: { ar: 'بيانات طلب نقل مركز', en: 'Center Details' },
        order: 1
    },
    Location: {
        id: 'LocaitonDetails',
        label: { ar: 'معلومات العنوان الوطني', en: 'National Address' },
        order: 2
    },
    Capacity: {
        id: 'CapacityDetails',
        label: { ar: 'الطاقة الاستيعابيه والضمان المالي  ', en: 'Capacity Details' },
        order: 3
      },
    Attachments: {
        id: 'Attachments',
        label: { ar: 'المتطلبات', en: 'Attachments' },
        order: 4
    },
    date: {
        id: 'date',
        label: { ar: '', en: '' },
        order: 5
    }
}
export default
    [
        // {
        //     id: uuid(),
        //     label: {
        //         ar: 'رقم الترخيص النهائي',
        //         en: 'Final License Number'
        //     },
        //     name: 'NewCenterLocationData.centerLicense_r.licenseNumber',
        //     // path: 'centerLicense_r.LicenseNumber',
        //     type: 'Text',
        //     gridSize: '6',
        //     sectionName: Sections.CenterDetails,
        //     validators: [],
        // },
        {
            id: uuid(),
            label: {
                ar: 'الاسم التجاري للمركز',
                en: 'Temporary License Number'
            },
            name: 'center.name',
            // path:'centerLocation_r.area',
            // valueFunc: (values) => { return values?.center?.name },
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم السجل التجاري للمركز',
                en: 'Commercial Registration No'
            },
            name: 'center.crInfo_r.crNumber',
            // path: 'crInfo_r.crNumber',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'نوع النشاط التجاري للمركز',
                en: 'Commercial Registration Activity'
            },
            name: 'center.crInfo_r.crActivityType',
            // path: 'crInfo_r.crActivityType',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CenterDetails,
            options: [],
            validators: [],
        },        
          {
            id: uuid(),   
            label: {
              ar: "عدد المستفيدين",
              en: 'center Type'
            },      
            name: 'center.centerInfo_r.beneficiaryCount',
            type: 'Select', 
            gridSize: '6',      
            sectionName: Sections.Capacity,      
          },
        {
            id: uuid(),
        
            label: {
              ar: 'الطاقة الاستيعابية',
        
              en: 'capacity'
            },
            name: 'NewCenterLocationData.centerInfo_r.carryingnumber',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Capacity,
            options: [],
            validators: []
          },
          {
            id: uuid(),
            label: {
                ar: 'مساحة مسطح البناء',
                en: 'Construction Flat Area '
            },
            name: 'NewCenterLocationData.centerInfo_r.buildingArea',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Capacity,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'مساحة القبو',
                en: 'Basement Space'
            },
            name: 'NewCenterLocationData.centerInfo_r.basementArea',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Capacity,
            options: [],
            validators: [],
        },
          {
            id: uuid(),
            label: {
              ar: 'الضمان المالي',
              en: 'Financial Guarantee'
            },
            name: 'NewCenterLocationData.centerInfo_r.financialGuarantee',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Capacity,      
            options: [],
            validators: []
          },
          {
            id: uuid(),
            label: {
                ar: 'العنوان (للمبنى الجديد)',
                en: 'Center address'
            },
            name: 'address',
            valueFunc: (values) => { return getAddressFromObject(values) },
            type: 'Map',
            sectionName: Sections.Location,
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم المبنى',
                en: 'Building No'
            },
            name: 'NewCenterLocationData.centerLocation_r.buildNo',
            // path: 'centerLocation_r.buildNo',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'اسم الشارع',
                en: 'Street Name'
            },
            name: 'NewCenterLocationData.centerLocation_r.street',
            // path:'centerLocation_r.street',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الحي',
                en: 'District'
            },
            name: 'NewCenterLocationData.centerLocation_r.area',
            // path:'centerLocation_r.area',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'المدينة',
                en: 'city'
            },
            name: 'NewCenterLocationData.centerLocation_r.city',
            // path: 'centerLocation_r.city',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الرمز البريدي',
                en: 'Postal Code'
            },
            name: 'NewCenterLocationData.centerLocation_r.postalCode',
            // path: 'centerLocation_r.postalCode',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الرقم الإضافي',
                en: 'Additional No'
            },
            name: 'NewCenterLocationData.centerLocation_r.additionalNo',
            // path: 'centerLocation_r.additionalNo',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.Location,
            options: [],
            validators: [],
        },
        {

            id: uuid(),
            label: {
              ar: " صور الأثاث والأجهزة الكهربائية (للمبنى الجديد)",
              en: 'Furniture'
            },
            name: 'Furniture',
            valueFunc: (values) =>(getDocId(values?.NewCenterLocationData?.centerInfo_r?.ID?.furniturePhotoZippedFile)),      
            type: 'fileTable',       
            gridSize: '6',       
            sectionName: Sections.Attachments,       
            options: [],        
            validators: []
          },
        {
            id: uuid(),
            label: {
                ar: 'رخصة الدفاع المدني (للمبنى الجديد)',
                en: 'Fire department License'
            },
            name: 'fireDepartmentLicense',
            // path: 'centerInfo_r.FireDepartmentLicense',

            valueFunc: (values) => (getDocId(values?.NewCenterLocationData?.centerInfo_r?.fireDepartmentLicense)),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.Attachments,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رخصة البلدية للموقع الجديد',
                en: 'Municiplity License for the New building'
            },
            name: 'municipLicenseNo',
            // path: 'centerInfo_r.MoMRA_Licence',
            valueFunc: (values) => (getDocId(values?.NewCenterLocationData?.centerInfo_r?.momraDoc)),
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
            // path: 'centerInfo_r.engineeringPlan',

            valueFunc: (values) => (getDocId(values?.NewCenterLocationData?.centerInfo_r?.engineeringPlan)),
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.Attachments,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ إنتهاء رخصة الدفاع المدني',
                en: 'Fire department License Expiry Date'
            },
            name: 'NewCenterLocationData.centerInfo_r.expirarionDateForFireDepartmentLicenseHijri',
            // path: 'centerInfo_r.expirarionDateForFireDepartmentLicenseHijri',
            attrFunc: (value) => { return getDateFromObject({ date: value, req: 'iYYYY/iMM/iDD' }) },
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.date,
            options: [],
            validators: [],
        },
    ]