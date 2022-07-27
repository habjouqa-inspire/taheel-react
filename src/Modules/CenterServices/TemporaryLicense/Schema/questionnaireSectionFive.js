import { v4 as uuid } from 'uuid';

export default {
  sectionName: 'section5',
  sectionlabelAr: ['استكمال المتطلبات المالية و الادارية'],
  questions: [
    {
      id: uuid(),
      label: {
        ar: 'هل لدى المالك ضمان مالي بنكي بقيمة 2000 ريال لكل مستفيد من مراكز الرعاية النهارية أو التأهيل المهني حسب الطاقة الاستيعابية للمركز؟'
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
        ar: 'هل لدى المالك ضمان مالي بنكي بقيمة 10,000 ريال لكل مستفيدين من مركز تأهيل إجتماعي الجديد حسب الطاقة الاستيعابية للمركز و تكون مدة الضمان البنكي خمس سنوات؟'
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
        ar: 'هل وفر المركز شرح تفصيلي عن كامل البرامج و الخدمات المقدمة في المركز ؟ (مع العلم انه لا يمكن تقديم أو إضافة أي خدمة بدون أخذ موافقة الإدارة المختصة بالتراخيص)'
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
