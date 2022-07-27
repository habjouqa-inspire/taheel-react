import { checkEmailPattern, checkMobilePattern } from "src/Core/Utils/inputValidator";

const required = 'هذا الحقل مطلوب'
const nonSAIdNumber = 'تشير سجلاتنا أن صاحب الهوية غير سعودي/سعودية الجنسية'

const CitizenValidate = values => {
  var msg = {}
  if (values?.idNumber?.length != 10) {
    msg.idNumber = 'تشير سجلاتنا أن رقم الهوية المُدخل غير صحيح, الرجاء التأكد من صحة الرقم';
  }
  if (!values.nationality)
    msg.nationality = required;
  if (!values.idNumber)
    msg.idNumber = required;
    if (!values.day)
    msg.day = required;
  if (!values.month)
    msg.month = required;
  if (!values.year)
    msg.year = required;
  if (values.nationality === "SA") {

    if (values?.idNumber?.length === 10 && !values.idNumber?.startsWith('1') && !!values.idNumber)
      msg.idNumber = nonSAIdNumber;
  }

  return msg
}
const absherValidate = values => {
  var msg = {}
  if (!values.AbsherOtp)
    msg.AbsherOtp = required;
  return msg
}
const regitrationValidate = values => {
  var msg = {}
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const formatEnglish = /^(?=.*?[A-Z])(?=.*?[a-z])/
  if (!values.email)
    msg.email = required;
  else if (!checkEmailPattern(values.email)) {
    msg.email = 'يرجى إدخال البريد الكتروني صحيح';
  }
  if (!values.password)
    msg.password = required;
  if (!values.passwordConfirmation)
    msg.passwordConfirmation = required;
  if (values.passwordConfirmation && values.passwordConfirmation !== values.password) {
    msg.passwordConfirmation = 'كلمة المرور لا تماثل التأكيد';
  }
  document.getElementsByTagName('UL')[0].style.color = 'red';
  if (values.password) {
    if (values.password.length >= 8)
      document.getElementById('digitsNo').style.color = '#04AA6D';
    else {
      document.getElementById('digitsNo').style.color = 'red';
      msg.password = 'حقل كلمة المرور غير صحيح';
    }
    if (/\d/.test(values.password))
      document.getElementById('digitExist').style.color = '#04AA6D';
    else {
      document.getElementById('digitExist').style.color = 'red';
      msg.password = 'حقل كلمة المرور غير صحيح';
    }
    if (values.password.toUpperCase() !== values.password)
      document.getElementById('UpperCase').style.color = '#04AA6D';
    else {
      document.getElementById('UpperCase').style.color = 'red';
      msg.password = 'حقل كلمة المرور غير صحيح';
    }
    if (values.password.toLowerCase() !== values.password)
      document.getElementById('LowerCase').style.color = '#04AA6D';
    else {
      document.getElementById('LowerCase').style.color = 'red';
      msg.password = 'حقل كلمة المرور غير صحيح';
    }
    if (format.test(values.password))
      document.getElementById('symbol').style.color = '#04AA6D';
    else {
      document.getElementById('symbol').style.color = 'red';
      msg.password = 'حقل كلمة المرور غير صحيح';
    }
    if (formatEnglish.test(values.password)){
      document.getElementById('EnglishFormat').style.color ='#04AA6D';
    }else{
      document.getElementById('EnglishFormat').style.color = 'red';
      msg.password = 'يجب ان تتكون كلمة السر من أحرف إنجليزية';
    }
  } else {
    msg.password = required;
  }
  return msg
}

const TaheelOtpValidate = (values) => {
  var msg = {}
  if (!values.phoneNumber)
    msg.phoneNumber = required;
  if (!checkMobilePattern(values.phoneNumber)) {
    msg.phoneNumber = 'يرجى إدخال رقم جوال سعودي صحيح';
  }
  if (values.isTaheelValidate && !values.taheelOtp)
    msg.taheelOtp = required;
  return msg
}

export { CitizenValidate, absherValidate, regitrationValidate, TaheelOtpValidate };
