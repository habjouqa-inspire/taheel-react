/* eslint-disable */
import {
  Button,
  CircularProgress, Table,
  TableBody, TableCell, TableContainer, TableHead,
  TableRow, Typography
} from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import moment from 'moment-hijri';
import React from 'react';
import { Field } from 'react-final-form';
import { checkIsNumber } from 'src/Core/Utils/inputValidator';
import { getTaheelRequestsFun } from '../../API/ServicesApi';
import { downloadDocument } from '../API/finalLicenseAPI';

const required = 'هذا الحقل مطلوب'
const timeHoursIncorrect = 'يرجى اختيار فترة صحيحة'
const medicalStaffTypes = ['أخصائي علاج طبيعي', 'أخصائي علاج وظيفي', 'ممرض', 'أخصائي نطق و تخاطب']
const OldDate = 'لا يمكن أن يكون تاريخ الإنتهاء قبل تاريخ اليوم';
const InvalidDate = 'تاريخ غير صالح';
const staffTypes = [ "معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]


const CenterDetailsValidation = values => {


  console.log("values", isNaN(values.CRNumber))
  var msg = {}
  if (!values.CRNumber)
    msg.CRNumber = required
  if (!values.centerLicenseNumber)
    msg.centerLicenseNumber = required
  if (values.CRNumber && checkIsNumber(values.CRNumber) && values.CRNumber.length > 10)
    msg.CRNumber = "يجب أن يحتوي فقط على ارقام ولا يزيد عددها عن 10 خانات"

  if (values.type === "08" && values.targetedBeneficiary === "11") {
    if (!!values.centerWorkingHours) {
      const from = values.centerWorkingHours?.from
      const to = values.centerWorkingHours?.to
      msg.centerWorkingHours = { from: {}, to: {} }
      if (!from?.hour && from?.minute != 0) {
        msg.centerWorkingHours.from.hour = required
      }
      if (!from?.minute && from?.minute != 0) {
        msg.centerWorkingHours.from.minute = required
      }
      if (!to?.hour && from?.minute != 0) {
        msg.centerWorkingHours.to.hour = required
      }
      if (!to?.minute && from?.minute != 0) {
        msg.centerWorkingHours.to.minute = required
      }
      if (!msg.centerWorkingHours.to.hour && !msg.centerWorkingHours.to.minute && !msg.centerWorkingHours.from.hour && !msg.centerWorkingHours.from.minute) {
        if (from.hour > to.hour) {
          msg.centerWorkingHours.from.hour = timeHoursIncorrect
          msg.centerWorkingHours.from.minute = timeHoursIncorrect
          msg.centerWorkingHours.to.hour = timeHoursIncorrect
          msg.centerWorkingHours.to.minute = timeHoursIncorrect
        } else if (from.hour === to.hour) {
          if (from.minute >= to.minute) {
            msg.centerWorkingHours.from.hour = timeHoursIncorrect
            msg.centerWorkingHours.from.minute = timeHoursIncorrect
            msg.centerWorkingHours.to.hour = timeHoursIncorrect
            msg.centerWorkingHours.to.minute = timeHoursIncorrect
          } else {
            delete msg.centerWorkingHours
          }
        } else {
          delete msg.centerWorkingHours
        }
      }

    }
  }
  console.log("Errors ----> ", msg)
  return msg
}

const CenterDetailsOwnerValidation = async (values, setAlertInfo, alertInfo, next) => {
  var msg = {}
  const licenseNumber = values.centerLicenseNumber
  console.log("setAlertInfo ----> ", setAlertInfo)
  console.log("alertInfo ----> ", alertInfo)
  console.log("values ----> ", values)
  console.log("next ----> ", next)
  if (alertInfo?.isSuccessful) {
    return { isSuccessful: true }
  }
  //hit api if there is a draft we will return { isSuccessful: false } else { isSuccessful: true }
  const hasDraft = await getTaheelRequestsFun({ licenseNumber, status: 4 })
  if (hasDraft.isSuccessful && hasDraft?.responseBody?.data?.totalCount > 0) {
    setAlertInfo({
      isSuccessful: false,
      dialogContent: 'لقد بدأتَ إجراءات خدمات أخرى لهذا الترخيص ,استمرارك سيلغي الطلبات المعنية به المحفوظة كمسودة',
      //dialogTitle: '  ',
      isOpen: true,
      buttons: {
        rightBtn: { title: 'تم', func: (setAlertInfo, alertInfo) => { next(values); setAlertInfo({ isSuccessful: true }) } },
        // leftBtn: { title: '', func: (setAlertInfo, alertInfo) => { setAlertInfo({ ...alertInfo, isOpen: false }) } }
      },
      setField: (fieldName, fieldValue) => alertInfo.setField(fieldName, fieldValue)
    })
    return { isSuccessful: false }
  }
  else {
    return { isSuccessful: true }
  }
}

const capacityValidation = values => {
  var msg = {}
  console.log('capacityValidation :: values.beneficiariesNum', typeof (values.beneficiariesNum), 'values.capacity', typeof (values.capacity))
  console.log('capacityValidation :: values.buildingArea', typeof (values.buildingArea), 'values.basementArea', typeof (values.basementArea))
  if (!values.beneficiariesNum)
    msg.beneficiariesNum = required
  else if (parseInt(values.beneficiariesNum) <= 0) {
    msg.beneficiariesNum = 'يجب أن يكون عدد المستفيدين اكبر من صفر'
  }
  else if (!checkIsNumber(values.beneficiariesNum)) {
    msg.beneficiariesNum = 'يجب أن يكون عدد المستفيدين عدد صحيح'
  }
  if (!values.buildingArea)
    msg.buildingArea = required
  else if (parseInt(values.buildingArea) <= 0) {
    msg.buildingArea = 'يجب أن يكون مساحة مسطح البناء اكبر من صفر'
  }
  else if (!checkIsNumber(values.buildingArea)) {
    msg.buildingArea = 'يجب أن يكون مساحة مسطح البناء عدد صحيح'
  }

  if (!values.basementArea && values.basementArea != 0)
    msg.basementArea = required
  else if (parseInt(values.basementArea) < 0) {
    msg.basementArea = 'يجب أن يكون مساحة القبو اكبر من صفر'
  }
  else if (!checkIsNumber(values.buildingArea)) {
    msg.basementArea = 'يجب أن يكون مساحة القبو عدد صحيح'
  }

  if (parseInt(values.buildingArea) <= parseInt(values.basementArea))
    msg.basementArea = 'مساحة القبو يجب أن تكون أقل من مساحة مسطح البناء'
  if (values.beneficiariesNum > parseInt(values.capacity))
    msg.beneficiariesNum = 'عدد المستفيدين يجب أن لا يتجاوز الطاقة الاستيعابية'
  return msg
}

const RequirementsValidation = values => {
  console.log('mkvalll', values.operationPlan)
  var msg = {}
  let currentDate = moment().format('iYYYY/iM/iD');
  let hijriDate = moment(
    `${values?.fireDepartmentLicenseExpiryDate?.year} / ${values?.fireDepartmentLicenseExpiryDate?.month} / ${values?.fireDepartmentLicenseExpiryDate?.day}`,
    'iYYYY/iM/iD'
  );
  if (values.type === '01') {
    if (!values.operationPlan || !values.operationPlan[0])
      msg.operationPlan = "يرجى إرفاق هذا الملف";

    if (!values.executivePlan || !values.executivePlan[0])
      msg.executivePlan = "يرجى إرفاق هذا الملف";

    if (!values.officeReport || !values.officeReport[0])
      msg.officeReport = "يرجى إرفاق هذا الملف";

    // if (!values.securityReport || !values.securityReport[0])
    //   msg.securityReport = "يرجى إرفاق هذا الملف";

    if (!values.Furniture || !values.Furniture[0])
      msg.Furniture = "يرجى إرفاق هذا الملف";

    if (!values.financialGuaranteeAtt || !values.financialGuaranteeAtt[0])
      msg.financialGuaranteeAtt = "يرجى إرفاق هذا الملف";
    msg.fireDepartmentLicenseExpiryDate = {}
    if (!values.fireDepartmentLicense || !values.fireDepartmentLicense[0])
      msg.fireDepartmentLicense = "يرجى إرفاق هذا الملف";

    if (!values.officeReport || !values.officeReport[0])
      msg.officeReport = "يرجى إرفاق هذا الملف";

    // date validation
    if (!values.fireDepartmentLicenseExpiryDate?.day) {
      msg.fireDepartmentLicenseExpiryDate.day = required;
    }
    if (!values.fireDepartmentLicenseExpiryDate?.month) {
      msg.fireDepartmentLicenseExpiryDate.month = required;

    }
    if (!values.fireDepartmentLicenseExpiryDate?.year) {
      msg.fireDepartmentLicenseExpiryDate.year = required;

    }
    /////////////////////////////////////////////////

    if (!hijriDate.isValid() && !!values?.fireDepartmentLicenseExpiryDate?.day && !!values?.fireDepartmentLicenseExpiryDate?.month && !!values?.fireDepartmentLicenseExpiryDate?.year) {
      msg.fireDepartmentLicenseExpiryDate.day = InvalidDate;
      msg.fireDepartmentLicenseExpiryDate.month = InvalidDate;
      msg.fireDepartmentLicenseExpiryDate.year = InvalidDate;
      return msg;
      // console.log(
      //   ` hijriDate ================> ${values?.fireDepartmentLicenseExpiryDate?.year} / ${values?.fireDepartmentLicenseExpiryDate?.month} / ${values?.fireDepartmentLicenseExpiryDate?.day}`
      // );
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year < parseInt(moment().format('iYYYY'))) {
      msg.fireDepartmentLicenseExpiryDate.year = OldDate;
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year == parseInt(moment().format('iYYYY'))) {
      if (values?.fireDepartmentLicenseExpiryDate?.month < parseInt(moment().format('iMM'))) {
        msg.fireDepartmentLicenseExpiryDate.month = OldDate;
      }
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year == parseInt(moment().format('iYYYY'))) {
      if (values?.fireDepartmentLicenseExpiryDate?.month == parseInt(moment().format('iMM'))) {
        if (values?.fireDepartmentLicenseExpiryDate?.day < parseInt(moment().format('iDD'))) {
          msg.fireDepartmentLicenseExpiryDate.day = OldDate;
        }
      }
    }

    if (!msg.fireDepartmentLicenseExpiryDate.day && !msg.fireDepartmentLicenseExpiryDate.month && !msg.fireDepartmentLicenseExpiryDate.year)
      delete msg.fireDepartmentLicenseExpiryDate
  }

  else {
    msg.fireDepartmentLicenseExpiryDate = {}
    if (!values.fireDepartmentLicense || !values.fireDepartmentLicense[0])
      msg.fireDepartmentLicense = "يرجى إرفاق هذا الملف";

    if (!values.officeReport || !values.officeReport[0])
      msg.officeReport = "يرجى إرفاق هذا الملف";

    // date validation
    if (!values.fireDepartmentLicenseExpiryDate?.day) {
      msg.fireDepartmentLicenseExpiryDate.day = required;
    }
    if (!values.fireDepartmentLicenseExpiryDate?.month) {
      msg.fireDepartmentLicenseExpiryDate.month = required;

    }
    if (!values.fireDepartmentLicenseExpiryDate?.year) {
      msg.fireDepartmentLicenseExpiryDate.year = required;

    }
    /////////////////////////////////////////////////

    if (!hijriDate.isValid() && !!values?.fireDepartmentLicenseExpiryDate?.day && !!values?.fireDepartmentLicenseExpiryDate?.month && !!values?.fireDepartmentLicenseExpiryDate?.year) {
      msg.fireDepartmentLicenseExpiryDate.day = InvalidDate;
      msg.fireDepartmentLicenseExpiryDate.month = InvalidDate;
      msg.fireDepartmentLicenseExpiryDate.year = InvalidDate;
      return msg;
      // console.log(
      //   ` hijriDate ================> ${values?.fireDepartmentLicenseExpiryDate?.year} / ${values?.fireDepartmentLicenseExpiryDate?.month} / ${values?.fireDepartmentLicenseExpiryDate?.day}`
      // );
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year < parseInt(moment().format('iYYYY'))) {
      msg.fireDepartmentLicenseExpiryDate.year = OldDate;
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year == parseInt(moment().format('iYYYY'))) {
      if (values?.fireDepartmentLicenseExpiryDate?.month < parseInt(moment().format('iMM'))) {
        msg.fireDepartmentLicenseExpiryDate.month = OldDate;
      }
    }
    if (values?.fireDepartmentLicenseExpiryDate?.year == parseInt(moment().format('iYYYY'))) {
      if (values?.fireDepartmentLicenseExpiryDate?.month == parseInt(moment().format('iMM'))) {
        if (values?.fireDepartmentLicenseExpiryDate?.day < parseInt(moment().format('iDD'))) {
          msg.fireDepartmentLicenseExpiryDate.day = OldDate;
        }
      }
    }

    if (!msg.fireDepartmentLicenseExpiryDate.day && !msg.fireDepartmentLicenseExpiryDate.month && !msg.fireDepartmentLicenseExpiryDate.year)
      delete msg.fireDepartmentLicenseExpiryDate

  }
  if (values.includeOwnerQulfic) {
    if (!values.ownerEducationalQualifications || !values.ownerEducationalQualifications[0])
      msg.ownerEducationalQualifications = "يرجى إرفاق هذا الملف";
  }

  if (values?.type === "08" && values?.targetedBeneficiary === "09") {
    if (!values.centerOperatingLetterFromTheEmployer || !values.centerOperatingLetterFromTheEmployer[0])
      msg.centerOperatingLetterFromTheEmployer = "يرجى إرفاق هذا الملف";
  }

  return msg;

}
const CenterMangerInfoValidation = values => {
  var msg = {}
  if (!values.idNumber)
    msg.idNumber = "يرجى تعبئة جميع الحقول الإلزامية";



  if (!values.CV || !values.CV[0])
    msg.CV = "يرجى إرفاق هذا الملف";

  if (!values.educationalQualifications || !values.educationalQualifications[0])
    msg.educationalQualifications = "يرجى إرفاق هذا الملف";
  if (values.inHouseHspit) {
    if (!values.buildingScheme || !values.buildingScheme[0])
      msg.buildingScheme = "يرجى إرفاق هذا الملف";

    if (!values.medicalReport || !values.medicalReport[0])
      msg.medicalReport = "يرجى إرفاق هذا الملف";

    if (!values.firstAidCourseCompletionCertificate || !values.firstAidCourseCompletionCertificate[0])
      msg.firstAidCourseCompletionCertificate = "يرجى إرفاق هذا الملف";

    if (!values.titleDeedOrLeaseContract || !values.titleDeedOrLeaseContract[0])
      msg.titleDeedOrLeaseContract = "يرجى إرفاق هذا الملف";
      
      if (!values.childhoodTrainingCertificate || !values.childhoodTrainingCertificate[0])
      msg.childhoodTrainingCertificate = "يرجى إرفاق هذا الملف";
  }

  return msg

}

const healthServicesValidation = values => {
  var msg = {}
  console.log(JSON.stringify(values))
  if (!values.healthServices)
    msg.healthServices = "يرجى تحديد ماأن كان المركز يقدم خدمات صحية ام لا";
  if (values.healthServices && values.healthServices === 'yes') {
    if (!values.healthServiceType)
      msg.healthServiceType = "يرجى تحديد نوع الخدمة الصحية";
    if (!values.healthServiceAttachment) {
      if (values.healthServiceType === 1)
        msg.healthServiceAttachment = " يرجى إرفاق رخصة وزارة الصحة";
      else
        msg.healthServiceAttachment = " يرجى إرفاق عقد الشراكة";
    }
  }
  return msg

}

const personsValidation = async values => {
  console.log(`--personsValidation `)
  const response = { isSuccessful: true, message: '' };
  if (values.centerType === '01') {
    if (!values.customers || values.customers.length === 0) {
      return { isSuccessful: false, message: "يرجى استيفاء الشروط" };

    }
    const TeachersCount = values.customers.filter(customer => customer.staffTypes === "معلم تربية خاصة").length
    const managersCount = values.customers.filter(customer => customer.staffTypes === "مدير").length
    const oneOfEach = () => {
      let FilteredStaffTypes = staffTypes.filter((type) =>
      type != "سائق" &&
      type != "مرافق سائق"

    );      if (values?.healthServices === 'no') {
        FilteredStaffTypes = FilteredStaffTypes.filter((type) =>
          type != "أخصائي نطق و تخاطب" &&
          type != "أخصائي علاج وظيفي" &&
          type != "أخصائي علاج طبيعي" &&
          type != "ممرض"
        )
        console.log('health care servicess personDetails::: filtered staff type', FilteredStaffTypes);

      }
      let typeCount = 0;
      let error = null;
      console.log('health care servicess personDetails::: erre', FilteredStaffTypes);


      error = FilteredStaffTypes?.every((sType) => {
        typeCount = values?.customers?.filter(customer =>
          sType === customer?.staffTypes
        ).length;
        return typeCount > 0;
      }
      )

      console.log('health care servicess personDetails::: erre inside func', error);

      return error;
    }
    const driversAndAsistants=()=>{
      let driversCounts = 0;
      let asistantCounts = 0;
        driversCounts = values?.customers?.filter(customer =>
          customer?.staffTypes === 'سائق'
        ).length;
        asistantCounts = values?.customers?.filter(customer =>
          customer?.staffTypes === 'مرافق سائق'
        ).length;

      if (driversCounts != asistantCounts) return false;
      return true;
    }

    const oneOfEactVald = oneOfEach();
    console.log('health care servicess personDetails::: erressssssssssssssssss', driversAndAsistants());

    console.log(`--manager count ::: ${managersCount}`)

    if (!oneOfEactVald) return { isSuccessful: false, message: "يرجى استيفاء الشروط" };
    if (!driversAndAsistants()) return { isSuccessful: false, message: "يرجى استيفاء الشروط" };

    if (managersCount !== 1)
      return { isSuccessful: false, message: "يرجى استيفاء الشروط" };

    if (Math.ceil(values.beneficiariesNum / 8) > TeachersCount || TeachersCount < 1)
      return { isSuccessful: false, message: "يرجى استيفاء الشروط" };
    return response
  }
}

export const downloadFileFn = async (setLoading, loading, licenseNumber, name) => {
  setLoading(true)
  console.log(`finalLicenseUtil :: downloadFileFn: ${licenseNumber}`)
  const downloadDoc = await downloadDocument([].concat(licenseNumber)[0]?.id || [].concat(licenseNumber)[0], true, name)
  console.log('downloadDoc =====> ', downloadDoc)

  setLoading(false)

  console.log('loading =====> ', loading)


}

const uploadDocument = (file) => {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      var base64String = reader.result;
      var n = base64String.indexOf("base64,") + 7;
      base64String = reader.result.substr(n);
      const data = window.atob(base64String)
      const image = data

      const buf = new Uint8Array(image.length);
      for (let i = 0; i < image.length; i++) {
        buf[i] = image.charCodeAt(i);
      }
      return resolve(buf);
    }

  })
}
const sectionValidateInput = (inputsSchema, sectionName, values) => {
  const errors = {};
  inputsSchema.filter(f => f.sectionName === sectionName).map((i) => {
    let canValidateInput = true;

    canValidateInput = getDependOn(i, values)
    /*if (i.dependOn) {
      const { fieldName, value } = i.dependOn;
 
      canValidateInput = Array.isArray(value)
        ? !!value.filter((v) => v === values[fieldName])[0]
        : values[fieldName] === value;
    }*/
    const alert = canValidateInput ? validateInput(i, values[i.name]) : null;
    if (alert !== null) {
      errors[i.name] = alert;
    }
  });
  console.log('sectionValidateInput :: errors ==== ', errors);
  return errors;
};
const getDependOn = (field, values) => {
  if (!!field?.dependOn) {
    const dependOnVal = [].concat(field.dependOn).every((dependOn) => {
      const { fieldName, value } = dependOn;

      const dependOnVal = Array.isArray(value)
        ? !!value.filter((v) => v === values[fieldName])[0]
        : values[fieldName] === value;

      return dependOnVal;
    });
    return dependOnVal
  } else {
    return true
  }
}



const ConditionComp = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value == is ? children : null)}
  </Field>
)
const MedicalPracticeComp = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (is.includes(value) ? children : null)}
  </Field>
)

const calculationConditionComp = ({ is, children }) => (
  <Field subscription={{ value: true }}>
    {(value) => (is ? children : null)}
  </Field>
)

const ContentField = ({ value, label }) => (
  <>
    <Typography gutterBottom variant="body2" color="textSecondary" component="p">
      {label}
    </Typography>
    <Typography gutterBottom variant="h5" component="h2">
      {value}
    </Typography>
  </>
)
const DownloadBtn = ({ index, docID }) => {
  const [loading, setLoading] = React.useState(false)
  return (
    <>
      <Button
        startIcon={loading ? <CircularProgress size="1rem" /> : <CloudDownloadIcon />}
        key={index}
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: '#3c8084',
        }}
        onClick={() => !loading && (downloadFileFn(setLoading, 'setFalse', docID, index))}
      >
        تنزيل
      </Button>
    </>)
}
const DownloadButt = ({ index, docID, name, label }) => {
  const [loading, setLoading] = React.useState(false)
  return (
    <>
      <TableRow>
        <TableCell style={{ width: '35%' }}>  {'ملف رقم'.concat(index + 1)} </TableCell>
        <TableCell>
          <Button
            startIcon={loading ? <CircularProgress size="1rem" /> : <CloudDownloadIcon />}
            key={index}
            name={name}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#3c8084',
            }}
            onClick={() => downloadFileFn(setLoading, loading, docID, name)}
          >
            تنزيل
          </Button>
        </TableCell>
      </TableRow>
    </>)
}

const DownloadButtTable = ({ docIDs, name, label }) => {

  return (
    <>
      {docIDs &&
        <>
          <TableContainer >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> الرقم</TableCell>
                  <TableCell style={{ height: '84px' }}> {label} </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {[].concat(docIDs).map((docID, index) => (
                  <DownloadButt key={!!docID?.id ? docID.id : docID + "_" + index} index={index} docID={docID?.id ? docID.id : docID} name={name} label={label} />
                ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <>

          </>

        </>
      }
    </>
  )

}
const validateAddStaffForm = (values, rowIndex, SAForm, forignForm) => {
  const result = { message: '' }
  console.log(`-- rowIndex :: ${rowIndex}`)
  console.log(`-- SAForm :: ${SAForm}`)
  console.log(`-- forignForm :: ${forignForm}`)
  console.log(`-- rowIndex :: ${!rowIndex || rowIndex !== -1 ? JSON.stringify(values.customers[rowIndex]) : values}`)
  const { nationality, year, month, day, idNumber, iqamaNo, idNumIqamaNum, staffTypes, EducationalQualification, cv, MedicalPractice } = values;
  console.log(`-- nationality :: ${nationality}`);
  console.log(`-- idNumber :: ${idNumber}`);
  console.log(`-- year :: ${year}`);

  if (!nationality) {
    result.message = "يرجى اختيار الجنسية";
    return result
  }
  if (nationality === "سعودي") {
    if (!idNumber) {
      result.message = "يرجى إدخال رقم الهوية";
      return result
    }
    if (!year || !month || !day) {
      result.message = "يرجى إدخال تاريخ ميلاد صحيح";
      return result
    }
    if (idNumber.length != 10) {
      result.message = "تشير سجلاتنا أن رقم الهوية / الإقامة المُدخَل غير صحيح. الرجاء التأكد من صحة الرقم.";
      return result
    }
    if (!idNumber.startsWith('1')) {
      result.message = 'تشير سجلاتنا أن رقم الهوية / الإقامة المُدخَل غير صحيح. الرجاء التأكد من صحة الرقم.';
      return result
    }
  }
  if (nationality === "غير سعودي") {
    if (!iqamaNo) {
      result.message = "يرجى إدخال رقم الإقامة";
      return result
    }
    if (iqamaNo.length != 10) {
      result.message = "تشير سجلاتنا أن رقم الهوية / الإقامة المُدخَل غير صحيح. الرجاء التأكد من صحة الرقم.";
      return result
    }
  }

  if (!SAForm && !forignForm) {
    result.message = "الرجاء التحقق من الرقم المدخل";
    return result
  }
  result.errors = {}
  if (SAForm || forignForm) {
    console.log('finalLicenseAPI :: staffTypes :: ' + staffTypes)
    if (!staffTypes) {
      result.errors.staffTypes = "يرجى اختيار نوع الكادر"
      result.message = "يرجى اختيار نوع الكادر";
    }
    if (!EducationalQualification) {
      result.errors.EducationalQualification = "يرجى إرفاق المؤهلات التعليمية"
      result.message = "يرجى إرفاق المؤهلات التعليمية";
    }
    if (!cv) {
      result.errors.cv = "يرجى إرفاق السيرة الذاتية"
      result.message = "يرجى إرفاق السيرة الذاتية";
    }
    if (!MedicalPractice && medicalStaffTypes.includes(staffTypes)) {
      result.errors.MedicalPractice = "يرجى إرفاق رخصة المزاولة"
      result.message = "يرجى إرفاق رخصة المزاولة"
    }
  }
  if (Object.keys(result.errors).length === 0 && Object.keys(result.message).length === 0) { return null }
  return result;
}
const getStaff = (data) => {
  const newKeys = {
    id: 'id',
    idNumIqamaNum: 'idNumber',
    birthDate: 'birthDate',
    name: 'fullName',
    gender: 'gender',
    nationality: 'nationality',
    StaffType: 'staffTypes',
    CV: 'cv',
    educationQualifications: 'EducationalQualification',
    professionalLicense: 'MedicalPractice',
  }

  var staff = JSON.parse(JSON.stringify(data))

  staff && staff.map((customer) => {
    Object.keys(customer).map((key) => {
      if (customer[key]) {
        const newKey = newKeys[key] || key;
        if (key === 'gender')
          customer[newKey] = customer[key] === 'f' ? 'إناث' : 'ذكور'
        else if (key === 'idNumIqamaNum') {
          if (customer['nationality'] === 'سعودي')
            customer['idNumber'] = customer[key]
          else
            customer['iqamaNo'] = customer[key]

          customer['idNumIqamaNum'] = customer[key]
        }
        else if (key === 'birthDate' && customer['nationality'] === 'سعودي') {
          const birthDateDay = moment(customer[key], 'iYYYYiMMiDD').format('iDD')
          const birthDateMonth = moment(customer[key], 'iYYYYiMMiDD').format('iMM')
          const birthDateYear = moment(customer[key], 'iYYYYiMMiDD').format('iYYYY')
          customer['day'] = parseInt(birthDateDay);
          customer['month'] = parseInt(birthDateMonth);
          customer['year'] = parseInt(birthDateYear);

        }
        else if (key === 'id') {
          if (customer[key])
            customer['id'] = customer[key];
        }
        else if (key === 'StaffType')
          customer[newKey] = staffTypes[customer[key] - 1]
        else if (['professionalLicense', 'educationQualifications', 'CV'].includes(key)) {
          customer[newKey] = [!!customer[key].id ? customer[key].id : customer[key]]
        }
        else
          customer[newKey] = customer[key];
        if (!customer[newKey] || newKey !== key)
          delete customer[key]
      }
    })
  });
  return staff
}

// TO BE REMOVED WHEN THE LOOKUP SERVICE IS READY
const centerTypeJSON = {
  "type": [
    {
      "name": "متسولين",
      "ID": 1
    },
    {
      "name": "إرشاد أسري",
      "ID": 2
    },
    {
      "name": "ذوي الإعاقة",
      "ID": 3
    },
    {
      "name": "أيتام",
      "ID": 4
    },
    {
      "name": "كبار السن",
      "ID": 5
    },
    {
      "name": "أحداث",
      "ID": 6
    },
    {
      "name": "حماية الأسرة",
      "ID": 7
    }
  ],
  "targetedBeneficiary": [
    {
      "name": "البيوت الإجتماعية",
      "ID": 1
    },
    {
      "name": "البيوت الإجتماعية",
      "ID": 2
    },
    {
      "name": "التدريب المهني",
      "ID": 3
    },
    {
      "name": "الرعاية النهارية",
      "ID": 4
    },
    {
      "name": "الرعاية الإجتماعية المنزلية",
      "ID": 5
    }
  ],
  "targetedServices": [
    {
      "name": "مراكز تأهيل الأشخاص ذوي الأعاقات المحددة",
      "ID": 1
    },
    {
      "name": "مراكز تأهيل الأشخاص ذوي الأعاقات المحددة",
      "ID": 2
    },
    {
      "name": " مراكز تأهيل الأشخاص ذوي الأعاقات العقلية والأعاقات الحركية",
      "ID": 3
    },
    {
      "name": "مراكز تأهيل الأسخاص ذوي الأعاقة العقلية",
      "ID": 4
    },
    {
      "name": "مراكز تأهيل الأشخاص ذوي الأعاقة متوسط وشديدي الإعاقة ",
      "ID": 5
    }
  ]
};

export {
  sectionValidateInput,
  CenterDetailsValidation,
  capacityValidation,
  RequirementsValidation,
  healthServicesValidation,
  personsValidation,
  ConditionComp,
  MedicalPracticeComp,
  calculationConditionComp,
  uploadDocument,
  DownloadButt,
  ContentField,
  DownloadButtTable,
  getStaff,
  validateAddStaffForm,
  DownloadBtn,
  CenterMangerInfoValidation,
  CenterDetailsOwnerValidation
};

