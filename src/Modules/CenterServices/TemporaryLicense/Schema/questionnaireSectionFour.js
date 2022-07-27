import { v4 as uuid } from 'uuid';

export default {
  sectionName: 'section4',
  sectionlabelAr: ['استكمال متطلبات الكوادر الوظيفية'],
  questions: [
    {
      id: uuid(),
      label: {
        ar: 'هل تم مراعاة تطبيق نظام العمل رقم مـ/51 و تاريخ 23/8/1426؟'
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
        ar: 'هل تم توظيف كوادر سعودية ؟ وفي حال عدم توفر الكوادر السعودية فيجب أن تكون الكوادر غير السعودية على كفالة المركز.'
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
        ar: 'هل تم توفير قائمة بالكوادر توضح مؤهلاتهم و العقود و المهام الوظيفية المسندة لهم؟'
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
        ar: 'هل تم تطبيق المواصفات للكوادر التشغيلية الموضحة باللائحة على حسب المسمى الوظيفي لكل موظف بالمركز ؟ (الرجاء الإطلاع على الدليل الاجرائي لافتتاح مراكز الرعاية النهارية الأهلية) ومطابقتها بالمسمى الوظيفي في التأمينات الاجتماعية؟'
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
        ar: 'في حال رغبة المركز بتوفير الخدمات الصحية و التأهيلية هل تم الحصول على ترخيص من وزارة الصحة و تحقيق الاشتراطات الموضحة باللائحة للكوادر الصحية ؟ (الرجاء الإطلاع على الدليل الاجرائي لافتتاح مراكز الرعاية النهارية الأهلية) '
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
        ar: 'في حال عدم القدرة على توفير الكوادر الصحية، هل تم توقيع عقد مع منشأة مرخصة من وزارة الصحة لتوفير خدمات التأهيل الصحي للمستفيدين للمركز مع مراعاة شروط الكوادر الصحية المذكورة في اللائحة ؟ (الرجاء الإطلاع على الدليل الاجرائي لافتتاح مراكز الرعاية النهارية الأهلية)'
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
        ar: 'هل تم التأكد من أن جميع الكوادر لم يسبق الحكم عليهم في جريمة مخلة بالشرف أو الأمانة ، مالم يكن قد رد إلية اعتباره؟'
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
        ar: 'في حال مطالبة المركز لأخذ الترخيص للعمل في فترتين (صباحية و مسائية)، هل تم مراعاة توفير كوادر مختلفة لكل فترة؟'
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
