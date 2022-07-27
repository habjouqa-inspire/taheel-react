
import { APIRequest, downloadFileAPI } from 'src/Core/API/APIRequest';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';

const requestOTPPhoneNum = async (PhoneNumber) => {
    const { idNumIqamaNum, phoneNumber } = getCurrentUser();
    PhoneNumber = !!PhoneNumber ? PhoneNumber : phoneNumber
    const url = '/taheel-apis-utilities-sms-otp-v2'
    const queryParams = {
        BeneficiaryId: idNumIqamaNum,
        phoneNumber: PhoneNumber,
    }
    const response = await APIRequest({ queryParams, url });
    return response;
}

const AuthOTPPhoneNum = async (phone, idNumIqamaNum, otp) => {
    const url = '/taheel-apis-utilities-AuthenticationSmsOTP-v2'
    const queryParams = {
        phoneNumber: phone,
        BeneficiaryId: idNumIqamaNum,
        OTP: otp,
    }
    const response = await APIRequest({ queryParams, url });
    return response;
}

const ownerInfoUpdate = async (idNumIqamaNum, email, phoneNumber, OTP) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    const url = '/taheel-apis-services-update-center-owner-profile-v2';
    const queryParams = {
        BeneficiaryId: idNumIqamaNum,
        OTP: OTP,
        newEmail: email,
        newPhonenumber: phoneNumber,
    }
    const response = await APIRequest({ queryParams, url });
    return response;

}

const downloadTaheelDoc = async (DocID, DocName) => {
    console.log(`downloadTaheelDoc ${DocID}`);
    const url = 'taheel-apis-utilities-downloadDocument-v2';
    const fileName = DocName;
    const queryParams = {
        DocID: DocID,
        attachment: true,
    };
    try {
        await downloadFileAPI({ queryParams, url, fileName });
    } catch {

    }
    return;
}
export { requestOTPPhoneNum, AuthOTPPhoneNum, ownerInfoUpdate, downloadTaheelDoc };