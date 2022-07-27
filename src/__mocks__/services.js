import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    description: 'services_list.temp_license.description',
    media: '/static/images/products/clock.png',
    // title: 'إصدار موافقة مبدئية لمركز تأهيل أهلي',
    title: 'services_list.temp_license.title',
    url: '/center-services/templicense',
    isActive: true
  },
  {
    id: uuid(),
    description: 'services_list.final_license.description',
    media: '/static/images/products/app.png',
    //title: 'إصدار ترخيص',
    title: 'services_list.final_license.title',
    url: '/center-services/finallicense',
    isActive: true
  },
  {
    id: uuid(),
    description: 'services_list.final_license_renewal.description',
    media: '/static/images/products/renew.png',
    //title: 'طلب تجديد رخصة نهائية',
    title: 'services_list.final_license_renewal.title',
    url: '/center-services/finallicenserenewal',
    isActive: true
  },
  {
    id: uuid(),
    description: 'services_list.transfer_center.description',
    media: '/static/images/products/center-transfer.png',
    //title: 'نقل مقر مركز أهلي',
    title: 'services_list.transfer_center.title',
    url: '/center-services/transfercenter',
    isActive: true
  },
  {
    id: uuid(),
    description: 'services_list.program_registeration.description',
    media: '/static/images/products/app.png',
    //title: 'التسجيل في البرامج المعتمدة',
    title: 'services_list.program_registeration.title',
    url: '/center-services/programRegisteration',
    isActive: true
  },
  {
    id: uuid(),
    description: 'services_list.cancel_initial_approval.description',
    media: '/static/images/products/cancelTemp.png',
    //title: ' إلغاء موافقة مبدئية',
    title: 'services_list.cancel_initial_approval.title',
    url: '/center-services/cancelInitialApproval',
    isActive: true
  },
  {
    id: uuid(),
    description: 'services_list.cancel_final_license.description',
    media: '/static/images/products/cancelFinal.png',
    //title: 'خدمة طلب إلغاء ترخيص لمركز (من المالك)',
    title: 'services_list.cancel_final_license.title',
    url: '/center-services/CancelFinalLicense',
    isActive: true
  },
  {
    id: uuid(),
    description: 'services_list.suspend_center.description',
    media: '/static/images/products/work-sus.png',
    //title: "خدمة طلب تعليق العمل في مركز أهلي (من المالك)",
    title: 'services_list.suspend_center.title',
    url: '/center-services/suspendlandingpage',
    isActive: true
  },
  {
    id: uuid(),
    description: 'services_list.transfer_center_ownership.description',
    media: '/static/images/products/owner_transfer_icon.png',
    //title: 'نقل ملكية مركز أهلي',
    title: 'services_list.transfer_center_ownership.title',
    url: '/center-services/transfercenterownership',
    isActive: true
  },
  {
    id: uuid(),
    description: 'services_list.state_fee.description',
    media: '/static/images/products/help_hand.png',
    //title: 'تسجيل المركز الأهلي في برنامج تحمل الدولة للرسوم',
    title: 'services_list.state_fee.title',
    url: '/center-services/stateFeeBearingProgram',
    isActive: true
  },
  {
    id: uuid(),
    description: 'services_list.cancel_state_fee.description',
    media: '/static/images/products/cancel_fees.png',
    title: 'services_list.cancel_state_fee.title',
    //title:'إلغاء طلب الانضمام إلى برنامج تحمل الدولة للرسوم',
    url: '/center-services/cancelStateFeeBearingProgram',
    isActive: true
  },
  {
    id: uuid(),
    description: ' تتيح هذه الخدمة للمركز إصدار ترخيص نهائي لمركز تأهيل أهلي',
    media: '/static/images/products/app.png',
    title: 'إصدار ترخيص نهائي لمركز تأهيل أهلي',
    url: '/center-services/finallicense',
    isActive: false
  },
  {
    id: uuid(),
    description: ' تتيح هذه الخدمة للمركز إصدار ترخيص مؤقت لمركز تأهيل أهلي',
    media: '/static/images/products/checklist.png',
    title: 'إصدار ترخيص مبدئي لمركز تأهيل أهلي',
    url: '/center-services/survey',
    isActive: false
  },
];
