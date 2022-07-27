
const required = 'هذا الحقل مطلوب'

const CredentialValidation = values => {
  var msg = {}
  if (!values.email)
    msg.email = required;
  // else if (!checkEmailPattern(values.email)) {
  //   msg.email = 'يرجى إدخال البريد الكتروني صحيح';
  // }
  if (!values.password)
    msg.password = required;
  return msg;
}

const smsOtpValidate = values => {
  var msg = {}
  if (!values.verificationCode)
    msg.verificationCode = required;
  return msg;
}

export { CredentialValidation, smsOtpValidate };
