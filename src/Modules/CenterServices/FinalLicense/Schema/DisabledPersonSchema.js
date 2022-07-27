import { checkIsfilled } from 'src/Core/Utils/inputValidator';
import {
    getDateFromObject,
    getDateFromString
} from 'src/Core/Utils/TaheelUtils';
import { v4 as uuid } from 'uuid';
import {
    getAddressFromObject
} from '../../TransferCenterOwnership/Utils/FormateJson';

const Sections = {
    LICENSING_DETAILS: {
        id: 'licensingDetails',
        label: { ar: 'بيانات الترخيص', en: 'LICENSING DETAILS' },
        order: 1
    },
    CENTER_DETAILS: {
        id: 'CenterDetails',
        label: { ar: 'معلومات المركز', en: 'Center Information' },
        order: 2
    },
    CENTER_OWNER: {
        id: 'centerOwner',
        label: { ar: 'معلومات مالك المركز', en: 'Center Owner information' },
        order: 3
    },
    REQUIREMENTS: {
        id: 'Requirements',
        label: { ar: 'المتطلبات', en: 'Requirements' },
        order: 4
    },
    CENTER_MANAGER_INFO: {

        id: 'SugManagerInfo',
        label: {
            ar: 'بيانات مدير المركز المُرَشَّح',
            en: 'Center Manager Information'
        },
        labelFunc: (values) => {
            if (values.type === '08') {
                //ضيافة الأطفال
                if (values.targetedBeneficiary === '11') {
                    //ضيافة منزلية
                    return 'بيانات مالكة مقر الضيافة المنزلية';
                } else {
                    // ضيافة مستقلة
                    return 'بيانات مديرة المركز';
                }
            } else {
                // (values.type === "03") // كبار السن
                return 'بيانات مدير/ة المركز';
            }
        },
        order: 4
    },
    CAPACITY: {
        id: 'Capacity',
        label: { ar: 'الطاقة الإستعابية', en: 'Capacity' },
        order: 5
    },
    HEALTH_SERVICES: {
        id: 'HealthServices',
        label: { ar: 'الخدمات الصحية', en: 'Health Services' },
        order: 6
    },
    CENTER_ADDRESS: {
        id: 'CenterAddress',
        label: { ar: 'عنوان المركز', en: 'Center Address' },
        order: 7
    }
};

export default
     [
        {
            id: uuid(),
            label: {
                ar: 'رقم الترخيص',
                en: 'License Number'
            },
            name: 'centerLicenseNumber',
            type: 'Text',
            labelFunc: (values) => {
                if (values.renewal) return 'رقم الترخيص ';
                else return 'رقم الترخيص';
            },
            gridSize: '4',
            sectionName: Sections.LICENSING_DETAILS,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ الإصدار',
                en: 'License issue date'
            },
            name: 'licenseCreationDate',
            type: 'Text',
            gridSize: '4',
            attrFunc: (value) => { return getDateFromString(value, 'iYYYYiMMiDD', 'iYYYY/iMM/iDD') },
            sectionName: Sections.LICENSING_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ الإنتهاء',
                en: 'License expiration date'
            },
            name: 'licenseExpiryDate',
            type: 'Text',
            gridSize: '4',
            attrFunc: (value) => { return getDateFromString(value, 'iYYYYiMMiDD', 'iYYYY/iMM/iDD') },
            sectionName: Sections.LICENSING_DETAILS,
            options: [],
            validators: [],
        },
     
        {
            id: uuid(),
            label: {
                ar: "فئة المركز",
                en: 'center Type'
            },
            name: 'centerType',
            type: 'Select',
            gridSize: '4',
            sectionName: Sections.LICENSING_DETAILS,
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
            sectionName: Sections.LICENSING_DETAILS,
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
            sectionName: Sections.LICENSING_DETAILS,
        },
        {
            id: uuid(),
            label: {
                ar: 'فترة العمل',
                en: 'workingHours'
            },
            name: 'workingHours',
            type: 'Radio',
            gridSize: '4',
            sectionName: Sections.LICENSING_DETAILS,
            options: [
                { value: 'morning', label: { ar: 'الفترة الصباحية' } },
                { value: 'evening', label: { ar: 'الفترة المسائية' } },
                { value: 'both', label: { ar: 'فترتين' } },
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
        },
        // {
        //   id: uuid(),
        //   label: {
        //     ar: 'الاسم التجاري للمركز',
        //     en: 'Temporary License Number'
        //   },
        //   name: 'companyName',
        //   type: 'Text',
        //   gridSize: '6',
        //   sectionName: 'CenterDetails',
        //   validators: [],
        // },
      
        {
            id: uuid(),
            label: {
                ar: 'اسم المالك',
                en: 'Owner Name'
            },
            labelFunc:(values)=> {
                if(values.ownerType==='1'){
                    return 'اسم المالك'

                }else return 'اسم المنشأة'
            },
            name: 'ownerName',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_OWNER,
            validators: [],
        },
        // {
        //   id: uuid(),
        //   label: {
        //     ar: 'رقم مالك المركز',
        //     en: 'Owner Number'
        //   },
        //   name: 'ownerID',
        //   type: 'Text',
        //   gridSize: '6',
        //   sectionName: 'CenterDetails',
        //   validators: [],
        // },
        // {
        //   id: uuid(),
        //   label: {
        //     ar: 'رقم الترخيص المؤقت',
        //     en: 'Temporary License Number'
        //   },
        //   name: 'temporaryLicenseNum',
        //   type: 'Text',
        //   gridSize: '6',
        //   sectionName: 'CenterDetails',
        //   validators: [],
        // },
        {
            id: uuid(),
            label: {
                ar: 'الاسم التجاري للمركز ',
                en: 'Temporary License Number'
            },
            name: 'companyName',
            type: 'Text',
            gridSizeFunc: (values) => !values.CRNumber && !values.CRNumber ? '4' : '6',
            sectionName: Sections.CENTER_DETAILS,
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم السجل التجاري',
                en: 'Commercial Registration No'
            },
            name: 'CRNumber',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
    
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'رقم رخصة البلدية',
                en: 'Municipal License'
            },
            name: 'municipLicenseNo',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'نشاط السجل التجاري',
                en: 'Commercial Registration Activity'
            },
            name: 'activities',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ إصدار الترخيص',
                en: 'License Issue Date'
            },
            name: 'licenseCreationDate',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ إنتهاء الترخيص',
                en: 'License Expiry Date'
            },
            name: 'centerLicense_r.expirationHijri',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الفئة العمرية للمستفيدين',
                en: 'Center Age Group'
            },
            name: 'centerAgeGroup',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'جنس المستفيدين',
                en: 'Center Gender Group'
            },
            name: 'centerGenderGroup',
            type: 'Radio',
            gridSize: '6',
            sectionName: Sections.CENTER_DETAILS,
            options: [
                { value: 'm', label: { ar: 'ذكور', en: 'males' } },
                { value: 'f', label: { ar: 'إناث', en: 'females' } },
                { value: 'f', label: { ar: 'ذكور و إناث', en: 'both' } },
    
            ],
            validators: [],
        },
    
        {
            id: uuid(),
            label: {
                ar: 'عدد المستفيدين الفعلي',
                en: 'Beneficiaries Number'
            },
            name: 'beneficiariesNum',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CAPACITY,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'مساحة مسطح البناء',
                en: 'Construction Flat Area '
            },
            name: 'buildingArea',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CAPACITY,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'مساحة القبو',
                en: 'Basement Space'
            },
            name: 'basementArea',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CAPACITY,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الضمان المالي',
                en: 'Financial Guarantee'
            },
            name: 'financialGuarantee',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CAPACITY,
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الطاقة الاستيعابية',
                en: 'Capacity'
            },
            name: 'capacity',
            type: 'Text',
            gridSize: '6',
            sectionName: Sections.CAPACITY,
            options: [],
            validators: [],
        },
    
        {
            id: uuid(),
            label: {
                ar: 'تقديم خدمات صحية',
                en: 'Providing Health Services'
            },
            name: 'healthServices',
            type: 'Radio',
            gridSize: '6',
            sectionName: Sections.HEALTH_SERVICES,
            options: [
                { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
                { value: 'no', label: { ar: 'لا', en: 'No' } },
            ],
            validators: [{
                id: 'workingHours-required',
                isValidFun: checkIsfilled,
                alert: 'هذا الحقل مطلوب'
            }],
        },
    
        {
            id: uuid(),
            label: {
                ar: 'نوع الخدمة الصحية',
                en: 'Type of health service'
            },
            name: 'healthServiceType',
            type: 'Select',
            gridSize: '6',
            sectionName: Sections.HEALTH_SERVICES,
            options: [
                { value: 1, label: { ar: 'رخصة وزارة الصحة', en: 'MOH License' } },
                { value: 2, label: { ar: 'عقد شراكة مع منشأة رعاية صحية', en: 'Partnership contract with a Health Care Facility' } },
            ],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'مرفق خدمة الرعاية الصحية',
                en: 'health service Att'
            },
            labelFunc:(v)=>v.healthServiceType===2?'عقد الشراكة':'رخصة وزارة الصحة',
            name: 'healthServiceAttachment',
            type: 'file',
            gridSize: '6',
            sectionName: Sections.HEALTH_SERVICES,
            options: [
            ],
            validators: [],
        },
    
        {
            id: uuid(),
            label: {
              ar: "تاريخ إنتهاء رخصة الدفاع المدني",
              en: 'fireDepartmeasad ntLicenseExpiryDate'
            },
            name: 'fireDepartmentLicenseExpiryDate',
            valueFunc:(v)=>getDateFromObject({date:v?.fireDepartmentLicenseExpiryDate,req: 'iYYYY/iMM/iDD'}),
            type: 'Text',
            sectionName: Sections.REQUIREMENTS,
            gridSize: '12',
            options: [],
            validators: [],
          },
        {
            id: uuid(),
            label: {
                ar: 'إرفاق الخطة التشغيلية',
                en: 'Operational Plan'
            },
            name: 'operationPlan',
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },
    
        {
            id: uuid(),
            label: {
                ar: 'إرفاق الخطة التنفيذية',
                en: 'Executive Plan'
            },
            name: 'executivePlan',
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },
    
        {
            id: uuid(),
            label: {
                ar: "إرفاق تقرير زيارة مكتب هندسي معتمد",
                en: 'Office Report'
            },
            name: 'officeReport',
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },
    
    
        // {
        //     id: uuid(),
        //     label: {
        //         ar: "إرفاق تقرير المسح الأمني",
        //         en: 'Security Report'
        //     },
        //     name: 'securityReport',
        //     type: 'fileTable',
        //     gridSize: '6',
        //     sectionName: Sections.REQUIREMENTS,
        //     options: [],
        //     validators: [],
        // },
        {
            id: uuid(),
            label: {
              ar: "رخصة الدفاع المدني",
              en: 'fire department License'
            },
            name: 'fireDepartmentLicense',
            type: 'fileTable',
            gridSize: '6',
            options: [],
            sectionName: Sections.REQUIREMENTS,
            validators: [],
          },
       
    
        {
            id: uuid(),
            label: {
                ar: "إرفاق صور الأثاث والأجهزة الكهربائية",
                en: 'Furniture'
            },
            name: 'Furniture',
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },
    
        {
            id: uuid(),
            label: {
                ar: "إرفاق الضمان المالي",
                en: 'Financial Guarantee'
            },
            name: 'financialGuaranteeAtt',
            type: 'fileTable',
            gridSize: '6',
            sectionName: Sections.REQUIREMENTS,
            options: [],
            validators: [],
        },,
    // Center Location
    {
        id: uuid(),
        label: {
            ar: 'موقع المركز',
            en: 'Center address'
        },
        name: 'centerAddress',
        valueFunc: (values) => { return values.address || getAddressFromObject(values) },
        type: 'Map',
        sectionName: Sections.CENTER_ADDRESS,
    },
    {
        id: uuid(),
        label: {
            ar: 'المدينة',
            en: 'city'
        },
        name: 'city',
        type: 'Text',
        gridSize: '4',
        sectionName: Sections.CENTER_ADDRESS,
    },
    {
        id: uuid(),
        label: {
            ar: 'الحي',
            en: 'sub'
        },
        name: 'sub',
        type: 'Text',
        gridSize: '4',
        sectionName: Sections.CENTER_ADDRESS,
    },
    {
        id: uuid(),
        label: {
            ar: 'اسم الشارع',
            en: 'street'
        },
        name: 'street',
        type: 'Text',
        gridSize: '4',
        sectionName: Sections.CENTER_ADDRESS,
    },
    {
        id: uuid(),
        label: {
            ar: 'رقم المبنى',
            en: 'buildNo'
        },
        name: 'buildNo',
        type: 'Text',
        gridSize: '4',
        sectionName: Sections.CENTER_ADDRESS,
    },
    {
        id: uuid(),
        label: {
            ar: 'الرمز البريدي',
            en: 'postalCode'
        },
        name: 'postalCode',
        type: 'Text',
        gridSize: '4',
        sectionName: Sections.CENTER_ADDRESS,
    },
    {
        id: uuid(),
        label: {
            ar: 'الرقم الإضافي',
            en: 'Additional Number'
        },
        name: 'additionalNo',
        type: 'Text',
        gridSize: '4',
        sectionName: Sections.CENTER_ADDRESS,
    }
    
    ];
     
