import { v4 as uuid } from 'uuid';

export default {
  sectionName: 'section1',
  sectionlabelAr: ['استكمال متطلبات التراخيص التجارية'],
  questions: [
    {
      id: uuid(),
      label: {
        ar: 'هل لديك سجل تجاري مستقل في مجال تأهيل الأشخاص ذوي الإعاقة؟',
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
        ar: 'هل نشاط السجل التجاري يطابق نوع المركز؟ (مثال لنوع النشاط: تاهيل و رعاية الأشخاص ذوي الاعاقه)',
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
        ar: 'هل سبق إلغاء ترخيص سابق لك نتيجة لإخلالك بآلية العمل والتعليمات أو تجاوز لأخلاقيات المهنة؟',
      },
      type: 'Radio',
      correctAnswer: 'no',
      options: [
        { value: 'yes', label: { ar: 'نعم' } },
        { value: 'no', label: { ar: 'لا' } },
        { value: 'notapply', label: { ar: 'لا ينطبق' } },
      ],
    },
    {
      id: uuid(),
      label: {
        ar: 'هل لديك شهادة/رخصة صادرة من البلدية؟',
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
        ar: 'هل المبنى مطابق لاشتراطات وانظمة الدفاع المدني؟',
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
        ar: 'هل لديك شهادة اشتراك في التأمينات الاجتماعية مضاف فيه جميع كوادر المركز؟',
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
