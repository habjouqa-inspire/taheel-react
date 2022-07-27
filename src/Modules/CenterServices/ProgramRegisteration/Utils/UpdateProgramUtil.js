const required = 'هذا الحقل مطلوب';
const FielsRequired = 'يرجى إرفاق هذا الملف';

const ProgramValidation = (values) => {
  var msg = {};

  if (values.program === null) msg.program = required;

  if (!values.licenseNumber) msg.licenseNumber = required;

  if (!!values.programType) {
    if (!values.programAccredditation)
      msg.programAccredditation = FielsRequired;
  }


  if (!values.registerationFees) msg.registerationFees = required;

  return msg;
};

export { ProgramValidation };
