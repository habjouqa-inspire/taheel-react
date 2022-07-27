import { checkEmailPattern } from "src/Core/Utils/inputValidator";

const required = 'هذا الحقل مطلوب'

const CommissionerValidation = values => {
  var msg = {}
  if (!values.email)
    msg.email = required;
  else if (!checkEmailPattern(values.email)) {
    msg.email = 'يرجى إدخال البريد الكتروني صحيح';
  }
  if (!values.jobTitle)
    msg.jobTitle = required;

    if (!values.staffId)
    msg.staffId = required;
  return msg;
}

export { CommissionerValidation };
