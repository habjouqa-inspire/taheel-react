import sha256 from 'js-sha256';
const { APIRequest } = require("src/Core/API/APIRequest");
const LoginRequest = async (email, password, userType, captcha, captchaFromUser) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const hashedCaptcha = sha256(`po${captcha}ta${timestamp}to`)

  console.log('LoginApi::: captcha++>', new Date().getTime(), "captchaFromUser ::", sha256(`po${123456}ta${timestamp}to`));
  const requestBody = {
    username: email,
    password: password,
    userLoginType: userType,
    captchaFromUser: captchaFromUser
  };

  const url = '/taheel-apis-users-login-v2'
  const response = await APIRequest({ requestBody, url, captcha: hashedCaptcha, timestamp: timestamp });
  return response;
};
export const GenerateCaptcha = async (email) => {
  const url = '/taheel-apis-utilities-generate-captcha';
  const response = await APIRequest({ url });
  return response;

}
export default LoginRequest;