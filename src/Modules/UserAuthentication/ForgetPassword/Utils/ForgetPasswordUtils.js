const required = 'هذا الحقل مطلوب'

const CitizenValidate = values => {
  var msg = {}
 
  if (!values.IqamaNumber) {
    msg.IqamaNumber = required;
  }
  
  if (values.IqamaNumber.length !== 10) {
    msg.IqamaNumber = 'تشير سجلاتنا أن رقم الهوية المُدخل غير صحيح, الرجاء التأكد من صحة الرقم';
  }
  
  return msg
}



const absherValidate = values => {
  var msg = {}
  if (!values.AbsherOtp)
    msg.AbsherOtp = required;
  return msg
}
const confirmationValidate = values => {
  var msg = {}
  const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  // const EnglishFormat = /^(?=.*?[A-Z])(?=.*?[a-z])/;
  const EnglishFormat = /[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]/;

  if (!values.oldPassword)
    msg.oldPassword = required;
  if (!values.password)
    msg.password = required;
  if (!values.passwordConfirmation)
    msg.passwordConfirmation = required;
  if (values.passwordConfirmation && values.passwordConfirmation !== values.password) {
    console.log(`${values.passwordConfirmation} ${values.password}`);
    msg.passwordConfirmation = 'كلمة المرور لا تماثل التأكيد';
  }
  document.getElementsByTagName('UL')[0].style.color = 'red';
  if (values.password && values.password.length >= 8)
    document.getElementById('digitsNo').style.color = '#04AA6D';
  else {
    document.getElementById('digitsNo').style.color = 'red';
    msg.password = 'حقل كلمة المرور غير صحيح';
  }
  if (values.password && /\d/.test(values.password))
    document.getElementById('digitExist').style.color = '#04AA6D';
  else {
    document.getElementById('digitExist').style.color = 'red';
    msg.password = 'حقل كلمة المرور غير صحيح';
  }
  if (values.password && values.password.toUpperCase() !== values.password)
    document.getElementById('UpperCase').style.color = '#04AA6D';
  else {
    document.getElementById('UpperCase').style.color = 'red';
    msg.password = 'حقل كلمة المرور غير صحيح';
  }
  if (values.password && values.password.toLowerCase() !== values.password)
    document.getElementById('LowerCase').style.color = '#04AA6D';
  else {
    document.getElementById('LowerCase').style.color = 'red';
    msg.password = 'حقل كلمة المرور غير صحيح';
  }
  if (values.password && format.test(values.password))
    document.getElementById('symbol').style.color = '#04AA6D';
  else {
    document.getElementById('symbol').style.color = 'red';
    msg.password = 'حقل كلمة المرور غير صحيح';
  }
  console.log(`==========> values.password: ${values.password}`)
  if (values.password && !EnglishFormat.test(values.password))
    document.getElementById('EnglishFormat').style.color = '#04AA6D';
  else {
    document.getElementById('EnglishFormat').style.color = 'red';
    msg.password = 'حقل كلمة المرور غير صحيح';
  }
  console.log('msg', msg)
  return msg
}

export { CitizenValidate, absherValidate, confirmationValidate }