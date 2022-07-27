
import { APIRequest } from 'src/Core/API/APIRequest';

const AbsherOTP = async (IqamaNumber) => {
    const url = '/taheel-apis-utilities-AbsherOTP-v2'
    const queryParams = {
        BeneficiaryId: IqamaNumber,
        checkIqamaOrIDExist : true,
    }
    const response = await APIRequest({ queryParams, url });
    return response;
}

const AbsherOTPAuth = async (IqamaNumber, OTP) => {
    const url = '/taheel-apis-utilities-AuthenticationAbsherOTP-v2'
    const queryParams = {
        BeneficiaryId: IqamaNumber,
        OTP: OTP,
        serviceType: 1,
    }
    const response = await APIRequest({ queryParams, url });
    return response;
}

const ChangePassword = async (IqamaNumber, oldPassword, password, passwordConfirmation) => {
    const requestBody = {
        IqamaNumber: IqamaNumber,
        oldPassword: oldPassword,
        newPassword: password,
        confirmPassword: passwordConfirmation,
    };
    const url = '/taheel-apis-users-changePassword-v2';
    const response = await APIRequest({ requestBody, url });
    return response;
}

export { AbsherOTP, ChangePassword, AbsherOTPAuth }