import { APIRequest } from 'src/Core/API/APIRequest';

const requestOTPPhoneNum = async (idNumIqamaNum, PhoneNumber) => {
  const url = '/taheel-apis-utilities-sms-otp-v2';
  const queryParams = {
    BeneficiaryId: idNumIqamaNum,
    phoneNumber: PhoneNumber
  };
  const response = await APIRequest({ queryParams, url });
  return response;
};

const AuthOTPPhoneNum = async (phone, idNumIqamaNum, otp) => {
  const url = '/taheel-apis-utilities-AuthenticationSmsOTP-v2';
  const queryParams = {
    phoneNumber: phone,
    BeneficiaryId: idNumIqamaNum,
    OTP: otp
  };
  const response = await APIRequest({ queryParams, url });
  return response;
};

const absherSms = async (idNumber, otp) => {
  const queryParams = {
    BeneficiaryId: idNumber,
    OTP: otp
  };
  const url = '/taheel-apis-utilities-AbsherOTP-v2';
  const response = await APIRequest({ queryParams, url });
  return response;
};

const AbsherOTPAuth = async (IqamaNumber, OTP) => {
  const url = '/taheel-apis-utilities-AuthenticationAbsherOTP-v2';
  const queryParams = {
    BeneficiaryId: IqamaNumber,
    OTP: OTP,
    serviceType: 0
  };
  const response = await APIRequest({ queryParams, url });
  return response;
};

const verifyEmailAndIqamaNum = async ({ idNumber, email }) => {
  const queryParams = {
    IqamaNum: idNumber,
    Email: email
  };
  const url = 'taheel-apis-utilities-verifyEmailAndIqamaNum-v2';
  const response = await APIRequest({ queryParams, url });
  return response;
};
const validateCitizenFun = async (idNumber, birthDate) => {
  const url = '/taheel-apis-utilities-validateCitizen-v3';
  const requestBody = {
    IDNo: idNumber,
    HijriDateOfBirth: birthDate,
    skipValidations: true
  };
  const response = await APIRequest({ requestBody, url });
  return response;
};

export {
  requestOTPPhoneNum,
  AuthOTPPhoneNum,
  absherSms,
  verifyEmailAndIqamaNum,
  AbsherOTPAuth,
  validateCitizenFun
};

