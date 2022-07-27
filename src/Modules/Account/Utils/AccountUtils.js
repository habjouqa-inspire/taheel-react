import { checkEmailPattern } from "src/Core/Utils/inputValidator";

const required = 'هذا الحقل مطلوب'

const ChangePhoneNumValidate = values => {
  var msg = {}
  if (!values.newPhoneNumber)
    msg.newPhoneNumber = required;
  return msg
}
const smsOTPValidate = values => {
  var msg = {}
  if (!values.SmsOTP)
    msg.SmsOTP = required;
  return msg
}
const PersonInfoValidate = values => {
  var msg = {}
  if (!values.email)
    msg.email = required;
    else if (!checkEmailPattern(values.email)){
      msg.email = 'يرجى إدخال البريد الكتروني صحيح';
    }
  if (!values.phoneNumber)
    msg.phoneNumber = required;
  return msg
}
export { ChangePhoneNumValidate, smsOTPValidate, PersonInfoValidate };
