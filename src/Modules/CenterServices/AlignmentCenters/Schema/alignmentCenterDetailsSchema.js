import {getDateFromString} from 'src/Core/Utils/TaheelUtils';
import { v4 as uuid } from 'uuid';

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

            gridSize: '4',
            validators: [],
        },
         {
            id: uuid(),
            label: {
                ar: 'اسم المالك',
                en: 'owner Name'
            },
            name: 'ownerName',
            type: 'Text',
            gridSize: '4',
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'الاسم التجاري للمركز ',
                en: 'Temporary License Number'
            },
            name: 'companyName',
            type: 'Text',
            gridSize: '4',
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
            gridSize: '4',
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
            gridSize: '4',
            options: [],
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ إنتهاء الترخيص',
                en: 'License expiration date'
            },
            name: 'licenseExpiryDate',
            type: 'Text',
            gridSize: '4',
            attrFunc: (value) => { return getDateFromString(value, 'iYYYYiMMiDD', 'iYYYY/iMM/iDD') },
        },
        {
            id: uuid(),
            label: {
                ar: 'تاريخ إصدار الترخيص',
                en: 'License expiration date'
            },
            name: 'licenseCreationDate',
            type: 'Text',
            gridSize: '4',
            attrFunc: (value) => { return getDateFromString(value, 'iYYYYiMMiDD', 'iYYYY/iMM/iDD') },
        },
        {
            id: uuid(),
            label: {
                ar: 'حالة المركز التشغيلية',
                en: 'center Status'
            },
            name: 'centerStatus',
            gridSize: '4',
            type: 'Radio',
            options: [
                { value: "yes", label: { ar: 'غير فعال', en: 'yes' } },
                { value: "no", label: { ar: 'فعال', en: 'no' } },
            ],
        },
        {
            id: uuid(),
            label: {
                ar: 'نوع المركز',
                en: 'center Type'
            },
            name: 'centerType',
            type: 'Radio',
            gridSize: '4',
            
            validators: [],
        },
        {
            id: uuid(),
            label: {
                ar: 'نوع النشاط التجاري للمركز',
                en: 'Commercial Activity Type'
            },
            name: 'activities',
            type: 'Text',
            gridSize: '12',
        },
        {
            id: uuid(),
            label: {
                ar: "نوع الحالات التي يستقبلها المركز",
                en: 'Beneficiaries Type'
            },
            name: 'targetedServices',
            type: 'Radio',
            gridSize: '4',
            

        },
        {
            id: uuid(),
            label: {
                ar: 'الطاقة الاستيعابية القصوى للمركز',
                en: 'capacity'
            },
            name: 'capacity',
            type: 'Text',
            gridSize: '4',
            options: [],
            validators: [],
        }, 
        {
            id: uuid(),
            label: {
                ar: "عدد المستفدين المطلوب",
                en: 'Beneficiaries no'
            },
            name: 'beneficiariesNum',
            type: 'text',
            gridSize: '4',

        },
        {
            id: uuid(),
            label: {
                ar: 'جنس الطلاب',
                en: 'Targeted Gender'
            },
            name: 'centerGenderGroup',
            type: 'Radio',
            gridSize: '4',
            options: [
                { value: 'f', label: { ar: 'إناث', en: 'female' } },
                { value: 'm', label: { ar: 'ذكور', en: 'male' } },
                { value: 'b', label: { ar: 'ذكور و إناث', en: 'both' } }
            ],
        },  
        {
            id: uuid(),
            label: {
                ar: 'الفئة العمرية',
                en: 'ageGroup'
            },
            name: 'ageGroup',
            type: 'Radio',
            gridSize: '4',
            options: [
                { value: '2-12', label: { ar: 'سنتين - ١٢سنة' } },
                { value: '13-18', label: { ar: '١٣سنة - ١٨سنة' } },
                { value: '19-45', label: { ar: '١٩سنة -٤٥سنة' } },

            ],
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
            options: [
                { value: 'morning', label: { ar: 'القترة الصباحية' } },
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
        },
        {
            id: uuid(),
            label: {
                ar: 'تقديم خدمات صحية',
                en: 'Providing Health Services'
            },
            name: 'healthServices',
            type: 'Radio',
            gridSize: '4',
            options: [
                { value: "yes", label: { ar: 'نعم', en: 'yes' } },
                { value: "no", label: { ar: 'لا', en: 'no' } },
            ],
        },
        // {
        //     id: uuid(),
        //     label: {
        //         ar: 'نوع الخدمة الصحية',
        //         en: 'Type of health service'
        //     },
        //     name: 'healthServiceType',
        //     type: 'Select',
        //     gridSize: '6',
        //     options: [
        //         { value: 1, label: { ar: 'رخصة وزارة الصحة', en: 'MOH License' } },
        //         { value: 2, label: { ar: 'عقد شراكة مع منشأة رعاية صحية', en: 'Partnership contract with a Health Care Facility' } },
        //     ],
        //     validators: [],
        // },
        
        // {
        //     id: uuid(),
        //     label: {
        //         ar: 'قائمة البرامج المعتمدة للمركز',
        //         en: 'center Program'
        //     },
        //     name: 'centerProgram',
        //     type: 'text',
        //     gridSize: '6',
            
        // },  
        {
            id: uuid(),
            label: {
                ar: 'قائمة البرامج المعتمدة للمركز',
                en: 'Center Programs List'
            },
            name: 'centerProgramsList',
            type: 'Radio',
            gridSize: '6',
        },  
        {
            id: uuid(),
            label: {
                ar: 'هل المركز منضم لبرنامج تحمل الدولة للرسوم ام لا ؟',
                en: 'Is the Center a member of the State fee bearing program'
            },
            name: 'Statefeebearingprogram',
            type: 'Radio',
            gridSize: '6',
            options: [
                { value: "yes", label: { ar: 'نعم', en: 'yes' } },
                { value: "no", label: { ar: 'لا', en: 'no' } },
            ],
        },  
        {
            id: uuid(),
            label: {
                ar: 'نسبة قبول الطلاب التابعين لبرنامج تحمل الدولة للرسوم',
                en: 'Acceptence Percentage'
            },
            name: 'AcceptencePercentage',
            type: 'text',
            gridSize: '6',
            
        }, 
        {
            id: uuid(),
            label: {
                ar: 'خدمة المواصلات',
                en: 'Transportation'
            },
            name: 'Transportation',
            type: 'Radio',
            gridSize: '6',
            options: [
                { value: "yes", label: { ar: 'نعم', en: 'yes' } },
                { value: "no", label: { ar: 'لا', en: 'no' } },
            ],
        }, 
        {
            id: uuid(),
            label: {
                ar: 'حقل تقييم المركز',
                en: 'CenterEvaluation'
            },
            name: 'CenterEvaluation',
            type: 'text',
            gridSize: '6',
            
        },  
       
       
        
    ];
