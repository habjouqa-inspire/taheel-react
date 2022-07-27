/* eslint-disable */
import { checkIsNumber } from "src/Core/Utils/inputValidator";


const required = 'هذا الحقل مطلوب'

const healthServicesValidation = values => {
  var msg = {}

  if (!values.newHealthServiceType)
    msg.newHealthServiceType = "يرجى تحديد نوع الخدمة الصحية";
  if (!values.newHealthServiceAttachment) {
    if (values.newHealthServiceType === 1)
      msg.newHealthServiceAttachment = " يرجى إرفاق رخصة وزارة الصحة";
    else
      msg.newHealthServiceAttachment = " يرجى إرفاق عقد الشراكة";
  }
  return msg
}


const transportationServicesValidation = values => {
  var msg = {}
  const minNumOfCars = staffCount(values?.customers)

  if (!values.transportationServices)
    msg.transportationServices = "يرجى تحديد ماأن كان المركز يقدم خدمات مواصلات ام لا";

  if (values.transportationServices === 'yes') {
    if (!values.numberOfVehicles)
      msg.numberOfVehicles = "يرجى إدخال عدد السيارات";

    else if (!checkIsNumber(values.numberOfVehicles)) {
      msg.numberOfVehicles = 'يجب أن يحتوي عدد السيارات على ارقام فقط';
    }
    else if (values.numberOfVehicles <= 0) {
      msg.numberOfVehicles = 'يرجى إدخال عدد السيارات  عدد صحيح أكبر من صفر'
    }
    else if (values.numberOfVehicles > minNumOfCars[10] || values.numberOfVehicles > minNumOfCars[11]) {
      msg.numberOfVehicles = 'يرجى إخال عدد سيارات مساوٍ لعدد السائقين والمرافقين في الكوادر المدخلة'
    }
  }
  return msg
}


const acceptanceRatioValidation = values => {
  var msg = {}
  if (!values.acceptanceRatio) {
    msg.acceptanceRatio = required
  }
  if (!values.actualBeneficiariesNum) {
    msg.actualBeneficiariesNum = required
  }
  return msg;

}

const cancelStateFeeValidate = ({values}) => {
  var msg = {}
  if (!values.formalLetter) {
      msg.formalLetter = 'الرجاء إرفاق سبب الإلغاء';
  }
  return msg
}


const staffCount = (staff) => {
  let staffCounter =new Array(16).fill(0)
  staffCounter[0]=''

  staff.map(s => {
    staffCounter[s.StaffType]++
  })

  return staffCounter
}
const minimumNumberOfStaff = (staff, result, values) => {
  let notValid = false
  let finalStaff = []
  let res = ['']
  let staffCounter = []

  staffCounter = staffCount(staff)

  console.log("my Staff from final(counter)", staffCounter);

  ///// start calculation====>


   
  ////// check if there transport service
  if (values?.transportationServices == 'yes') {
    
    console.log("is there transport service :", values?.transportationServices);
    console.log("check number of vehicles in transport service :", staffCounter[10] < values.numberOfVehicles || staffCounter[11] < values.numberOfVehicles);


    if (staffCounter[10] < values.numberOfVehicles || staffCounter[11] < values.numberOfVehicles) {
      console.log(" the num of cars not valid",);
      notValid = true
      return notValid
    }
  }

  finalStaff = staffCounter
  finalStaff[4] = ''
  finalStaff[10] = ''
  finalStaff[11] = ''

  console.log("finalStaff = counter", finalStaff);



  ///// check the type of health service
  if (values?.newHealthServiceType == 2 || values?.healthServiceType == 2) {
    result[11].minimumNumberOfStaff = 0
    result[12].minimumNumberOfStaff = 0
    result[13].minimumNumberOfStaff = 0

    console.log("in side if the health service type 2 to remove the validation", result);
  }

  result.map(r => {
    ////// array of minimum Number Of Staff
    res.push(r.minimumNumberOfStaff)

    if (staffCounter[r.ID] < r.minimumNumberOfStaff) {
      notValid = true
    }


    ////// check the number of health service staff
    if (r.ID >= 10 && (values?.newHealthServiceType == 1 || values?.healthServiceType == 1)) {
      if (r.ID == 14 || r.ID == 12 || r.ID == 13) {
        if (staffCounter[r.ID] < r.minimumNumberOfStaff)
          notValid = true
      }
      console.log("check if health service staff is notvalid?", notValid);
    }
  })
  console.log("after the second map (res from api) ==> minimumNumberOfStaff", res);
  /////// the end of map

  return notValid
}

export {
  healthServicesValidation,
  acceptanceRatioValidation,
  transportationServicesValidation,
  cancelStateFeeValidate,
  minimumNumberOfStaff,
  staffCount

}