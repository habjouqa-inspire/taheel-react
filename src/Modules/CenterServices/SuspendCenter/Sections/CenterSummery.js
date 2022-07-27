/* eslint-disable no-unused-vars */
import { Alert, CircularProgress, Divider, Grid, MenuItem } from "@material-ui/core";
import { Select } from "final-form-material-ui";
import moment from "moment-hijri";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { useLookup } from "src/Core/Contexts/useLookup";
import FieldsCreator from "src/Core/SchemaBuilder/FieldsCreator";
import { CentertDetails, getCentersAPI, getTaheelRequestsFun } from "../../API/ServicesApi";
import { formatGetCenterDetails } from "../../TransferCenterOwnership/Utils/FormateJson";
import centerInfoSchema from "../schema/centerInfoSchema";

const CenterSummary = ({ setIsEnableNextBtn, vals, setIsEnableCancelBtn }) => {

    const lookupValues = useLookup()
    const [centers, setCenters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [show, setShow] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [errMessage, setErrMessage] = useState('')
    const getCenters = async () => {
        const res = await getCentersAPI({ licenseType: 2, validCentersOnly: true, isEligibleForFinal: true })
        if (!res.isSuccessful) {
            setErrMessage(res.message)
            return {};
        }
        const EligibleForSusCenters = res.responseBody.data.Centers.filter((center) => center?.isWorkSuspended !== true && center?.isStateFeeService !== true) //get center with isWorkSuspended false and not registred to state fee program
        setCenters(EligibleForSusCenters)

        return {};
    }
    const centerInfo = async (CenterLicenseNumber) => {
        setShow(true)
        console.log('center::test::test', centers);
        const licenseNumber = CenterLicenseNumber
        const res = await CentertDetails(licenseNumber)
        if (!res.isSuccessful) {
            setLoadingData(false)
            setErrMessage(res.message)
            return
        }
        vals.licenseNumber = licenseNumber
        vals.centerType = res?.responseBody?.data?.center?.type
        vals.expirationHijri = res?.responseBody?.data?.center?.centerLicense_r?.expirationHijri

        setDataLoaded({
            ...formatGetCenterDetails(res?.responseBody?.data), commissioner_r: {
                ...res?.responseBody?.data?.centerOwner
            }
        })
        setLoadingData(false)
    }

    useEffect(async () => {
        setIsLoading(true)
        setIsEnableCancelBtn(false);
        const prevEndDate = moment(`${vals?.prevEndDate?.year + vals?.prevEndDate?.month + vals?.prevEndDate?.day}`).format("YYYYMMDD")
        const todayPlusSeven = moment().add('7', 'd').format("iYYYYiMMiDD")
        !vals?.isExtend && await getCenters() //no need to call this api in extinsion serviece cause we get the license in state
        if (!!vals?.CenterLicenseNumber) {
            await centerInfo(vals?.CenterLicenseNumber)
        }
        if (!!vals?.isExtend) {
            const pendingRequests = await getTaheelRequestsFun({
                licenseNumber: vals?.CenterLicenseNumber,
                requestTypeId: [15, 16],
                status: [1]
            })
            const totalPendingRequests = pendingRequests?.responseBody?.data?.totalCount;
            if (totalPendingRequests !== 0) {
                setErrMessage('عذراً لايمكن تنفيذ الخدمة, حيث تشير سجلاتنا الى وجود طلبات تحت الإجراء');
                setIsEnableNextBtn(false)
                setIsLoading(false)
                console.log(vals);
                return {};
            }
            if (vals.isExtend && parseInt(prevEndDate) < parseInt(todayPlusSeven)) { //if the req is extened must be end date have more than 7 days
                setErrMessage('عذراً لا يمكن تنفيذ الطلب, حيث أنه متبقي أقل من 7 أيام عمل حتى نهاية تعليق العمل الحالي');
                setIsEnableNextBtn(false)
                setIsLoading(false)
                return { isSuccessful: false, message: "عذراً لا يمكن تنفيذ الطلب, حيث أنه متبقي أقل من 7 أيام عمل حتى نهاية تعليق العمل الحالي" }
            }
        }
        console.log(vals);
        setIsEnableNextBtn(true)
        setIsLoading(false)
    }, [])

    return (
        <>
            {!isLoading ? (<>
                <Grid container spacing={3} mt={3}>
                    <Grid item md={12} xs={12}>
                        {errMessage && (
                            <Alert variant="outlined" severity="error">
                                {errMessage}
                            </Alert>
                        )}
                    </Grid>
                    <Grid item md={12} xs={12} className="custom-label-field">
                        <Field
                            fullWidth
                            label="اختيار الترخيص"
                            name="CenterLicenseNumber"
                            component={Select}
                            disabled={vals?.isExtend}
                            required
                            dir="rtl"
                            variant="outlined"
                            className="custom-field"
                            formControlProps={{ fullWidth: true }}
                        >

                            {vals?.isExtend ?
                                <MenuItem key={1} value={vals?.CenterLicenseNumber}> {/* get only the license need to extend------ no need to get all license in this case */}
                                    {vals?.CenterLicenseNumber}
                                </MenuItem>

                                : centers?.map((item, idx) => (
                                    <MenuItem key={idx} value={item?.centerLicense_r?.LicenseNumber}>
                                        {item?.centerLicense_r?.LicenseNumber}
                                    </MenuItem>
                                ))}
                        </Field>
                        <OnChange name="CenterLicenseNumber">
                            {async (CenterLicenseNumber) => {
                                setErrMessage('')
                                setIsEnableNextBtn(false)

                                setLoadingData(true)
                                setShow(false)
                                await centerInfo(CenterLicenseNumber);
                                console.log('setIsEnableNextBtnsetIsEnableNextBtn');
                                setIsEnableNextBtn(true)

                            }}
                        </OnChange>
                        {console.log("suspendCenter:: dataLoaded", dataLoaded)}
                    </Grid>
                    {show ?
                        (loadingData ?
                            (<CircularProgress
                                size="15rem"
                                style={{
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    color: '#E2E8EB'
                                }}
                            />) : (
                                <FieldsCreator
                                    schema={centerInfoSchema}
                                    formType="view"
                                    values={dataLoaded}
                                    lookupObject={lookupValues}
                                    isLoading={loadingData}
                                />)) : null}
                </Grid>
                <br />
                <Divider />
            </>
            ) : (
                <CircularProgress
                    size="15rem"
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        color: '#E2E8EB'
                    }}
                />
            )
            }
        </>
    )
}

export default CenterSummary;

CenterSummary.propTypes = {
    setIsEnableNextBtn: PropTypes.func.isRequired,
    vals: PropTypes.object.isRequired,
    setIsEnableCancelBtn: PropTypes.func.isRequired,

};