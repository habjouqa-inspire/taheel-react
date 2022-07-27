/* eslint-disable */

import moment from "moment-hijri"
moment.locale('ar-SA')
const validateSusCenterSummary = ({ values }) => {
    var msg = {}
    if (!values.CenterLicenseNumber) {
        msg.CenterLicenseNumber = 'نرجو اختيار الترخيص المطلوب'
    }
    return msg;
}
const validateSuspendInfo = ({ values, setErrMessage }) => {
    var msg = {}


    if (!values.cancelingReason?.trim()) {
        msg.cancelingReason = 'هذا الحقل مطلوب'
    }



    
    if (!values?.FromDate?.day || !values.FromDate?.month || !values.FromDate?.year) {
        msg.FromDate = {}
    }
    if (!values?.FromDate?.day) {
        msg.FromDate.day = 'هذا الحقل مطلوب'
    }
    if (!values.FromDate?.month) {
        msg.FromDate.month = 'هذا الحقل مطلوب'
    }
    if (!values.FromDate?.year) {
        msg.FromDate.year = 'هذا الحقل مطلوب'
    }
    const formatFromDate = moment(`${values?.FromDate?.year + values?.FromDate?.month + values?.FromDate?.day}`).format("YYYYMMDD")
    if (!moment(formatFromDate, 'iYYYYiMMiDD').isValid()) {
        msg.FromDate = {}
        msg.FromDate.day = 'تاريخ خاطئ'
    }

    if (!values?.ToDate?.day || !values.ToDate?.month || !values.ToDate?.year) {
        msg.ToDate = {}
    }
    if (!values.ToDate?.day) {
        msg.ToDate.day = 'هذا الحقل مطلوب'
    }
    if (!values.ToDate?.month) {
        msg.ToDate.month = 'هذا الحقل مطلوب'
    }
    if (!values.ToDate?.year) {
        msg.ToDate.year = 'هذا الحقل مطلوب'
    }
    const formatToDate = moment(`${values?.ToDate?.year + values?.ToDate?.month + values?.ToDate?.day}`).format("YYYYMMDD")
    if (!moment(formatToDate, 'iYYYYiMMiDD').isValid()) {
        msg.ToDate = {}
        msg.ToDate.day = 'تاريخ خاطئ'
    }

    return msg
}

export { validateSuspendInfo, validateSusCenterSummary }

