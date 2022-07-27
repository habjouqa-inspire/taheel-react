
const required = 'هذا الحقل مطلوب'
const cancelingReasonMissing = 'الرجاء إدخال سبب الإلغاء '

const approvalNumValidate = values => {
  var msg = {}
  if (!values?.cancelingReason?.trim())
    msg.cancelingReason = cancelingReasonMissing;
  return msg
}
export { approvalNumValidate };
