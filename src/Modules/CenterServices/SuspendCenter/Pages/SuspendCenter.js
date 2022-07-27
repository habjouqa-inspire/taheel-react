/* eslint-disable */
import { Card, CardContent, CardHeader, CircularProgress, Container, Divider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import FinalFromWizard from "src/Core/Components/wizard/FinalFormWizard";
import { getRequestDetails } from "../../API/ServicesApi";
import { workSuspensionRequest } from "../API/susCentersApis";
import CenterSummary from "../Sections/CenterSummery";
import SuspendFlow from "../Sections/SuspendFlow";
import { validateSusCenterSummary, validateSuspendInfo } from "../utils/validations";


const SuspendCenter = () => {
  const location = useLocation();
  const reqNum = location?.state?.reqNum;
  const isExtend = location?.state?.extendSus;
  const centerVals = location?.state?.centerVals;
  const navigate = useNavigate()
  const [isEnableNextBtn, setIsEnableNextBtn] = useState(false)
  const [errMessage, setErrMessage] = useState(null);
  const [popUp, setPopUp] = useState(null)
  const [initialValues, setInitialValues] = useState([])
  const [loading, setLoading] = useState(true);
  const [isEnableCancelBtn, setIsEnableCancelBtn] = useState(false);
  useEffect(async () => {
    let draftValues;
    setLoading(true)
    setErrMessage(null)
    if (!!reqNum) {//draft request
      const reqDetails = await getRequestDetails(reqNum);
      if (!reqDetails.isSuccessful) {
        setErrMessage(reqDetails?.message?.error || reqDetails?.message)
        return { isSuccessful: false, message: reqDetails?.message?.error || reqDetails?.message }
      }
      draftValues = reqDetails.responseBody?.requestDetails?.data?.draft_values?.draft_values
      setInitialValues({ ...draftValues, isDraft: false });
      console.log('draftValuesdraftValuesdraftValuesdraftValues', draftValues);
    }
    if (!!isExtend) {
      setInitialValues({ ...centerVals, ...draftValues, isDraft: false })
    }
    setLoading(false)
  }, [])

  const onSubmit = async (v) => {
    var moment = require('moment-hijri');
    const validDate = moment().add('6', 'd').format("iYYYYiMMiDD")
    const formatFromDate = moment(`${v?.FromDate?.year + '' + v?.FromDate?.month + '' + v?.FromDate?.day}`).format("YYYYMMDD")
    const formatToDate = moment(`${v?.ToDate?.year + '' + v?.ToDate?.month + '' + v?.ToDate?.day}`).format("YYYYMMDD")
    const prevEndDate = moment(`${v?.prevEndDate?.year + '' + v?.prevEndDate?.month + '' + v?.prevEndDate?.day}`).format("YYYYMMDD")
    const todayPlusSeven = moment().add('7', 'd').format("iYYYYiMMiDD")
    const FormatExpireation = moment(v.expirationHijri, 'DD/MM/YYYY').format("YYYYMMDD")
    console.log('suspendCenter::onsubmit::expirationHijri', FormatExpireation, 'toDate', formatToDate);
    console.log('suspendCenter::onsubmit::parseInt(formatToDate) > parseInt(FormatExpireation)', parseInt(formatToDate) > parseInt(FormatExpireation));

    if (!v.isExtend && parseInt(validDate) > parseInt(formatFromDate)) {
      return { isSuccessful: false, message: "تاريخ بداية تعليق العمل يجب أن يكون بعد 6 أيام عمل على الأقل من وقت تقديم الطلب" }
    }
    if (v.isExtend && parseInt(prevEndDate) > parseInt(formatToDate)) { //if the req is extened
      return { isSuccessful: false, message: "يرجى اختيار تاريخ بعد تاريخ نهاية التعليق الحالي" }
    }
    if (v.isExtend && parseInt(prevEndDate) < parseInt(todayPlusSeven)) { //if the req is extened
      return { isSuccessful: false, message: "عذراً لا يمكن تنفيذ الطلب, حيث أنه متبقي أقل من 7 أيام عمل حتى نهاية تعليق العمل الحالي" }
    }
    if (parseInt(formatFromDate) > parseInt(formatToDate)) {
      return { isSuccessful: false, message: "يجب أن يكون تاريخ نهاية تعليق العمل أكبر من تاريخ بداية تعليق العمل" }
    }
    if (parseInt(formatToDate) > parseInt(FormatExpireation)) {
      return { isSuccessful: false, message: "عذراً لا يمكن تنفيذ الطلب، حيث أن تاريخ نهاية تعليق العمل المحدد تجاوز تاريخ صلاحية الترخيص" }
    }


    const response = await workSuspensionRequest(v, reqNum);
    if (!response.isSuccessful) {
      return { isSuccessful: false, message: response?.message?.error || response?.message }
    }
    setPopUp(response?.responseBody?.data?.message[0]?.content || response?.responseBody?.data?.message)
    return response
  }
  return (
    !loading ? <Container maxWidth="md">
      <Card>
        <CardHeader
          title={isExtend
            ?
            "تمديد تعليق العمل في مركز أهلي"
            : " تعليق العمل في مركز أهلي"
          }
        />
        <Divider />
        <CardContent>
          <FinalFromWizard
            initialValues={{
              lastPageErrorHandling: true,
              agree: [false],
              isExtend: isExtend,
              prevEndDate: initialValues?.ToDate,
              ...initialValues
            }}

            onSubmit={onSubmit}
            isEnableNextBtn={isEnableNextBtn}
            isEnableCancelBtn={isEnableCancelBtn}
            cancelBtnFn={() => {
              navigate('/center-services/suspendlandingpage');
            }}
          >
            <FinalFormCenterSummary
              validate={(values) => { return validateSusCenterSummary({ values }) }}
              label="معلومات المركز"
              setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
              setIsEnableCancelBtn={(v) => setIsEnableCancelBtn(v)}
            />
            <FinalFormSuspenFlow
              label={isExtend ?
                "معلومات تمديد التعليق"
                : "معلومات التعليق"}
              validate={(values) => { return validateSuspendInfo({ values, setErrMessage: (err) => { console.log("setErrMessage:: err", err); setErrMessage(err) } }) }}
              setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
              errMessage={errMessage}
              setIsEnableCancelBtn={(v) => setIsEnableCancelBtn(v)}
              popUp={popUp}
            />
          </FinalFromWizard>
        </CardContent>
      </Card>
    </Container> :
      <CircularProgress
        size="15rem"
        style={{
          display: 'block',
          marginTop: '10%',
          marginLeft: 'auto',
          marginRight: 'auto',
          color: '#E2E8EB'
        }}
      />
  )
}
const FinalFormCenterSummary = ({
  setIsEnableNextBtn,
  setIsEnableCancelBtn,
  values
}) => (
  <CenterSummary
    setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}
    setIsEnableCancelBtn={(v) => setIsEnableCancelBtn(v)}
    vals={values}
  />
);

const FinalFormSuspenFlow = ({
  values,
  setField,
  setIsEnableCancelBtn,
  setIsEnableNextBtn,
  errMessage,
  popUp
}) => (
  <SuspendFlow
    setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
    values={values}
    setIsEnableNextBtn={(v) => setIsEnableCancelBtn(v)}
    setIsEnableCancelBtn={(v) => setIsEnableCancelBtn(v)}
    errMessage={errMessage}
    popUp={popUp}

  />
);
export default SuspendCenter;
