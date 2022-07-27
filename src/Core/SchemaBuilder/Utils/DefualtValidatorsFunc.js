
import validator from 'validator'


export default {
    nameValidator: {
        id: 'nameValidator',
        massege: { ar: 'يرجى إدخال اسم صحيح', en: 'Please enter a correct Name' },
        validatorfn: (value) => {
            return validator.isAlpha(value.replaceAll(' ', ''))
        }
    },
    emailValidator: {
        id: 'emailValidator',
        massege: { ar: 'يرجى إدخال بريد الكتروني صحيح', en: 'Please enter a correct Email' },
        validatorfn: (value) => {
            return validator.isEmail(value)
        }
    },
    passwordStrength: {
        id: "passwordStrength",
        massege: {
            ar: 'كلمة السر غير قوية',
            en: 'Password is not Strong'
        },
        validatorfn: (value) => {
            return validator.isStrongPassword(value)
        }
    },
    phoneNumberValidator: {
        id: "phoneNumberValidator",
        massege: {
            ar: 'رقم الهاتف غير صحيح',
            en: 'Phone Number is not correct'
        },
    },
    selectRequieredValidator: {
        id: "selectRequieredValidator",
        massege: {
            ar: 'هذا الحقل مطلوب',
            en: 'this field is required'
        },
        validatorfn: (value) => {
            console.log('validatorfn Select === ', value)
            return !!value
        }
    }
}