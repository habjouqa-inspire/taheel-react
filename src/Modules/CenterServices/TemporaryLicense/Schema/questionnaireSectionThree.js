import { v4 as uuid } from 'uuid';

export default {
  sectionName: 'section3',
  sectionlabelAr: ['هل التزم المركز بتوفير الاشتراطات التالية:'],
  questions: [
    {
      id: uuid(),
      label: {
        ar: 'الفصول التأهيلية (فصل لكل 8 مستفيدين من ذوي الإعاقة بحيث لا تقل مساحة الفصل الواحد عن 40 م2)'
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'دورات مياه للأشخاص ذوي الإعاقة تتناسب مع أعمار المستفيدين و احتياجاتهم (دورة مياه لكل 10 أشخاص بحيث لا تقل المساحة لكل دورة مياه عن 3.15 م2) و يتم توزيع دورات المياه بما يخدم المستفيدين '
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'غرف مصادر للتأهيل و التدريب (غرفه لكل 30 مستفيد و مساحتها لا تقل عن 32م2)'
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'غرف للتربيه الفنية و المهنية (غرفه لكل 30 مستفيد و مساحتها لا تقل عن 66م2)'
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'غرف متعددة النشاطات و تستخدم في التوجيه و الإرشاد الأسري (غرفه لكل 30 مستفيد و مساحتها لا تقل عن 66م2)'
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'مساحة المرافق الخدمية تصل إلى 10% من مساحة مسطح البناء'
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'مساحة خارجية للعب تحسب مساحتها على النحو التالي (2.2م2 لكل مستفيد)'
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'في حال تقديم الخدمات الصحية يجب مراعاة الحصول على ترخيص من وزارة الصحة لتقديم الخدمات الصحية مع توفير مرفق خاص بالخدمات الصحية والتأهيل الطبي (10% من مساحة مسطح البناء) مع وجود مدخل مستقل من الشارع للمرفق الصحي و تطبيق اشتراطات وزارة الصحة؛ يمكن للمركز الاستغناء عن ترخيص وزارة الصحة في حال توقيع عقد مع منشأه مرخصة من وزارة الصحة لتقديم الخدمات الصحية مع ضرورة الالتزام باشتراطات وزارة الصحة المتعلقة بالمرفق الصحي. '
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'وجود مواقف مخصصة للكوادر و المراجعين حسب اشتراطات البلدية '
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'هل أثاث المبنى ذا جودة عالية و يحقق سلامة المستفيد و لا يشكل خطر عليه ؟'
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'هل المبنى يحتوي على كاميرات مراقبة شاملة لجميع المرافق و الممرات و الساحات لمراقبة سلامة المستفيد ؟ (يجب الاحتفاظ بالتسجيلات لمدة مئة و ثمانين يوما على الأقل و سجلات المراقبة للأقسام النسائية يجب أن تكون لدى القسم النسائي)'
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'هل يحتوي المركز على نظام الكتروني داخلي لتسجيل حضور المستفيدين و حفظ ملفاتهم و لمتابعة الخطط التأهيلية و تطور الحالة؟'
      },
      type: 'Radio',
      correctAnswer: 'yes',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },

  ]
};
