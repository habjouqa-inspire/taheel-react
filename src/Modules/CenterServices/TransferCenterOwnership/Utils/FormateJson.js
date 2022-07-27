import numeral from "numeral"
import { reverseRange } from "src/Core/Utils/TaheelUtils"
import { extractDateToObject, getDateFromString, getDocId } from "src/Core/Utils/TaheelUtils"
import { getStaff } from "./TransferCenterOwnershipUtil"
import { REQUEST_STATUS } from "src/Core/Utils/enums"

export const getAddressFromObject = (data) => {
    var result = {}
    if (!!data?.centerLocation_r && Object.keys(data.centerLocation_r).length > 0) {
        return formatLocation(data.centerLocation_r)
    }

    result.buildNo = !!data?.buildNo ? data.buildNo : ''
    result.street = !!data?.street ? data.street + ', ' : ''
    result.area = !!data?.area ? data.area : ''
    result.postalCode = !!data?.postalCode ? data.postalCode + ', ' : ''
    result.city = !!data?.city ? data.city : ''
    result.lat = !!data?.lat ? data.lat : ''
    result.lng = !!data?.lng ? data.lng : ''

    return formatLocation(result);
}
export const formatLocation = (location) => {
    if (!location || !Object.keys(location).length) {
        return null;
    }
    var result = {}
    if (!!location.buildNo || !!location.street || !!location.area || !!location.postalCode || !!location.city)
        result.caption = `${location.buildNo} ${location.street} ${location.area} ${location.postalCode?.replace("-", " ")} ${location.city} `

    if (!!location.lat && !!location.lng) {
        result.heart = { lat: parseFloat(location.lat), lng: parseFloat(location.lng) }
    } else {
        result.heart = { lat: 24.774265, lng: 46.738586 }

    }

    return !result.caption || !result.heart ? null : result
}
const getName = (data) => {
    return data?.firstName + ' ' + data?.lastName
}
export const getGender = (value) => {
    return value === "m" ? "ذكور" : (value === "f" ? "إناث" : value)
}
export const formateStaff = (staff) => {
    const staffTypes = ["", "معلم تربية خاصة", "أخصائي اجتماعي", "مراقب اجتماعي", "حارس", "عامل تنظيفات", "مشرف فني عام", "اخصائي نفسي و توجيه اجتماعي", "عامل رعاية شخصية", "مدير", "سائق", "مرافق سائق", "أخصائي علاج طبيعي", "أخصائي علاج وظيفي", "أخصائي نطق و تخاطب", "ممرض"]
    if (!Array.isArray(staff)) {
        return null
    }
    console.log(`=========================> staff :: ${staff}`)
    staff = staff.filter(n => n)
    const newStaff = staff?.map(s => {
        s.fullName = s?.name
        s.staffTypes = staffTypes[s?.StaffType]
        s.staffType = staffTypes[s?.StaffType]
        s.idNumber = s?.idNumIqamaNum
        s.iqamaNo = s?.idNumIqamaNum
        s.gender = getGender(s?.gender)
        s.EducationalQualification = s?.educationQualifications?.id || s?.educationQualifications
        s.cv = s?.CV?.id || s?.CV
        s.day = getDateFromString(s?.birthDate, 'iYYYYiMMiDD', 'iDD')
        s.month = getDateFromString(s?.birthDate, 'iYYYYiMMiDD', 'iMM')
        s.year = getDateFromString(s?.birthDate, 'iYYYYiMMiDD', 'iYYYY')
        return s;
    })
    return newStaff.map(ns => ns)
}
const formateGetRequestDetails = (data) => {
    const center = data.isFinalLicense ? data?.processVariablesDump?.NewCenterLocationData : data.center
    const processVariablesDump = data.processVariablesDump || data.center
    console.log("processVariablesDump ===> ", processVariablesDump)
    const request = data.request
    const staff = !!processVariablesDump?.staff ? [].concat(processVariablesDump?.staff) : [].concat(data?.staff)
    console.log("staff ===> ", staff)

    console.log('stafffffffgf ', data);
    const requestDetails = data.requestDetails
    const result = {
        isDraft: false,
        isAuth: true,
        page: 0,
        operationPlan: [(center?.centerInfo_r?.operationPlan?.id || center?.centerInfo_r?.operationPlan)],
        executivePlan: [(center?.centerInfo_r?.executivePlan?.id || center?.centerInfo_r?.executivePlan)],
        securityReport: [(center?.centerInfo_r?.securityReport?.id || center?.centerInfo_r?.securityReport)],
        Furniture: (center?.centerInfo_r?.furniturePhoto_r?.map(d => d.Document) || center?.centerInfo_r?.furniturePhoto_r?.map(d => d.Document.id)),
        financialGuaranteeAtt: [(center?.centerInfo_r?.financialGuarbteeAtt?.id || center?.centerInfo_r?.financialGuarbteeAtt)],
        furniturePhotoZippedFile: (center?.centerInfo_r?.furniturePhotoZippedFile?.id || center?.centerInfo_r?.furniturePhotoZippedFile),
        centerLicenseNumber: processVariablesDump?.NewCenterLocationData?.licenseNumber || processVariablesDump?.NewCenterLocationData?.centerLicense_r?.licenseNumber,
        licenseNumber: processVariablesDump?.NewCenterLocationData?.licenseNumber || processVariablesDump?.NewCenterLocationData?.centerLicense_r?.licenseNumber,

        centerType: center?.type,//check
        targetedBenificiray: center?.targetedBeneficiary,//check
        targetedServices: center?.targetedServices,//check
        ownerID: processVariablesDump?.NewCenterLocationData?.ownerID || center?.centerOwner_r?.ownerID,
        ownerName: processVariablesDump?.NewCenterLocationData?.ownerName || center?.centerOwner_r?.ownerName,
        ownerType: processVariablesDump?.NewCenterLocationData?.ownerType || center?.centerOwner_r?.ownerType,
        oldOwnerName: processVariablesDump?.oldOwner?.firstName + ' ' + processVariablesDump?.oldOwner?.lastName,
        centerAgeGroup: center?.ageGroup,
        centerGenderGroup: getGender(center?.targetedGender),
        requestNum: request?.requestNum,
        requestDate: request?.requestDate,
        requestType: request?.type,
        requestStatus: request?.statusName?.statusName || requestDetails?.statusName?.statusName,
        engineeringPlan: getDocId(processVariablesDump?.NewCenterLocationData?.centerInfo_r?.engineeringPlan),
        OfficeReport: getDocId((processVariablesDump?.NewCenterLocationData?.centerInfo_r?.engineeringPlan || center?.centerInfo_r?.engineeringPlan)),
        fireDepartmentLicense: getDocId(processVariablesDump?.NewCenterLocationData?.centerInfo_r?.fireDepartmentLicense || center?.centerInfo_r?.fireDepartmentLicense),
        momraDoc: getDocId(processVariablesDump?.NewCenterLocationData?.centerInfo_r?.momraDoc),
        fireDepartmentExpD: extractDateToObject(processVariablesDump?.NewCenterLocationData?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri),
        fireDepartmentExpDText: getDateFromString(processVariablesDump?.NewCenterLocationData?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri || center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri, 'iYYYYiMMiDD', 'iDD/iMM/iYYYY'),
        taskId: data?.externalTaskData?.ID,
        commissionerName: processVariablesDump?.crCommissioner?.name,
        changeLocation: processVariablesDump?.otherData?.LocationofOwnershipTransfer === 'CHANGED',
        CRNumber: processVariablesDump?.crInfo_r?.crNumber || processVariablesDump?.crInfo_r?.ID?.crNumber || processVariablesDump?.NewCenterLocationData?.crInfo_r?.crNumber,
        companyName: processVariablesDump?.crInfo_r?.entityName || processVariablesDump?.crInfo_r?.ID?.entityName || processVariablesDump?.NewCenterLocationData?.crInfo_r?.entityName,
        municipLicenseNo: processVariablesDump?.crInfo_r?.MoMRA_Licence || processVariablesDump?.crInfo_r?.ID?.MoMRA_Licence || processVariablesDump?.NewCenterLocationData?.crInfo_r?.MoMRA_Licence,
        activities: processVariablesDump?.crInfo_r?.crActivityType || processVariablesDump?.crInfo_r?.ID?.crActivityType || processVariablesDump?.NewCenterLocationData?.crInfo_r?.crActivityType,
        crIssueDate: processVariablesDump?.crInfo_r?.crIssueDate || processVariablesDump?.crInfo_r?.ID?.crIssueDate || processVariablesDump?.NewCenterLocationData?.crInfo_r?.crIssueDate,
        crExpirationDate: processVariablesDump?.crInfo_r?.crExpirationDate || processVariablesDump?.crInfo_r?.ID?.crExpirationDate || processVariablesDump?.NewCenterLocationData?.crInfo_r?.crExpirationDate,
        beneficiariesNum: processVariablesDump?.NewCenterLocationData?.centerInfo_r?.beneficiaryCount || center?.centerInfo_r?.beneficiaryCount,
        capacity: processVariablesDump?.NewCenterLocationData?.centerInfo_r?.carryingnumber || center?.centerInfo_r?.carryingnumber,
        buildingArea: processVariablesDump?.NewCenterLocationData?.centerInfo_r?.buildingArea || center?.centerInfo_r?.buildingArea,
        basementArea: processVariablesDump?.NewCenterLocationData?.centerInfo_r?.basementArea || center?.centerInfo_r?.basementArea,
        financialGuarantee: processVariablesDump?.NewCenterLocationData?.centerInfo_r?.financialGuarantee || center?.centerInfo_r?.financialGuarantee,
        address: formatLocation(processVariablesDump?.NewCenterLocationData?.centerLocation_r),
        area: processVariablesDump?.NewCenterLocationData?.centerLocation_r?.area, // center?.centerLocation_r?.area,
        sub: processVariablesDump?.NewCenterLocationData?.centerLocation_r?.area, // center?.centerLocation_r?.area,
        city: processVariablesDump?.NewCenterLocationData?.centerLocation_r?.city,//center?.centerLocation_r?.city,
        street: processVariablesDump?.NewCenterLocationData?.centerLocation_r?.street, //center?.centerLocation_r?.street,
        buildNo: processVariablesDump?.NewCenterLocationData?.centerLocation_r?.buildNo,//center?.centerLocation_r?.buildNo,
        lat: processVariablesDump?.NewCenterLocationData?.centerLocation_r?.lat,//center?.centerLocation_r?.lat,
        lng: processVariablesDump?.NewCenterLocationData?.centerLocation_r?.lng,//center?.centerLocation_r?.lng,
        buildingArea: center?.centerInfo_r?.buildingArea,
        basementArea: center?.centerInfo_r?.basementArea,
        postalCode: processVariablesDump?.NewCenterLocationData?.centerLocation_r?.postalCode,//center?.centerLocation_r?.postalCode,
        additionalNo: processVariablesDump?.NewCenterLocationData?.centerLocation_r?.additionalNo,//center?.centerLocation_r?.additionalNo,
        healthServices: processVariablesDump?.NewCenterLocationData?.isHealthCareServices ? "yes" : "no",
        healthServiceType: processVariablesDump?.NewCenterLocationData?.healthCareServices_r?.type,
        healthServiceAttachment: getDocId(processVariablesDump?.NewCenterLocationData?.healthCareServices_r?.attachmen0t?.id || processVariablesDump?.NewCenterLocationData?.healthCareServices_r?.attachment),
        isHealthCareServices: !!processVariablesDump?.NewCenterLocationData?.healthCareServices_r?.type,
        otherDocuments: processVariablesDump?.otherDocuments,
        customers: !!staff ? formateStaff(staff) : [],
        salesDoc: { id: processVariablesDump?.otherData?.ContractOfSale },
        waiverDoc: { id: processVariablesDump?.otherData?.WaiverDeclaration },
        ageGroup: center?.ageGroup,//check
        CRName: processVariablesDump?.crInfo_r?.CRName || processVariablesDump?.crInfo_r?.ID?.CRName,//check
        workingHours: processVariablesDump?.NewCenterLocationData?.workingHours,//check
        centerWorkingHours: processVariablesDump?.NewCenterLocationData?.workingHours,//check
        fireDepartmentLicenseExpiryDate: extractDateToObject(processVariablesDump?.NewCenterLocationData?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri || center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri, 'iYYYY/iMM/iDD'),//check
        officeReport: [(processVariablesDump?.NewCenterLocationData?.centerInfo_r?.engineeringPlan?.id || processVariablesDump?.NewCenterLocationData?.centerInfo_r?.engineeringPlan)],
        ownerEducationalQualifications: [(processVariablesDump?.NewCenterLocationData?.centerOwner_r?.centerOwnerEducationQualification?.id || center?.centerOwner_r?.centerOwnerEducationQualification?.id)],
        center: center
    }
    if (data.status === REQUEST_STATUS.COMPLETED) {
        result.licenseCreationDate = center?.centerLicense_r?.creationHijri
        result.licenseExpiryDate = center?.centerLicense_r?.expirationHijri
    }
    if (result.type != '01' && !!staff) {
        result.managerBOD = staff[0]?.birthDate;
        result.fullName = staff[0]?.name;
        result.idNumber = staff[0]?.idNumIqamaNum
        result.IDNo = staff[0]?.idNumIqamaNum
        result.gender = staff[0]?.gender
        const isWithSlashes = staff[0]?.birthDate.includes('/');
        result.managerBD = extractDateToObject(staff[0]?.birthDate, isWithSlashes ? 'iDD/iMM/iYYYY' : 'iYYYYiMMiDD')
        result.gender = staff[0]?.gender
        result.birthDate = staff[0]?.birthDate
        result.CV = staff[0]?.CV && [staff[0]?.CV?.id]//check
        result.educationalQualifications = staff[0]?.educationQualifications && [staff[0]?.educationQualifications?.id] //check
        result.medicalReport = staff[0]?.medicalReport && [staff[0]?.medicalReport?.id] //check
        result.firstAidCourseCompletionCertificate = staff[0]?.firstAidCourseCompletionCertificate && [staff[0]?.firstAidCourseCompletionCertificate?.id] //check
        result.titleDeedOrLeaseContract = !!staff[0]?.titleDeedOrLeaseContract ? [staff[0]?.titleDeedOrLeaseContract.id] : [processVariablesDump?.NewCenterLocationData?.centerInfo_r?.titleDeedOrLeaseContract] //check
        result.childhoodTrainingCertificate = staff[0]?.childhoodTrainingCertificate && [staff[0]?.childhoodTrainingCertificate?.id]//check
        result.buildingScheme = !!staff[0]?.buildingScheme ? [staff[0]?.buildingScheme.id] : [processVariablesDump?.NewCenterLocationData?.centerInfo_r?.buildingScheme]//check
    } else {
        console.log('alls staff', getStaff(staff))
    }
    console.log('formateGetRequestDetails  ', result);

    return result
}

export const formatGetCenterDetails = (data) => {
    const center = { ...data?.center, ...data?.processVariablesDump?.NewCenterLocationData }
    console.log('processDump inside formatter ==> all data', center);

    const processVariablesDump = data?.processVariablesDump
    const staff = data?.processVariablesDump?.staff || data?.staff
    const result = {
        isDraft: false,
        isAuth: true,
        page: 0,
        //files
        operationPlan: center?.centerInfo_r?.operationPlan && [(center?.centerInfo_r?.operationPlan?.id || center?.centerInfo_r?.operationPlan)],
        executivePlan: center?.centerInfo_r?.executivePlan && [(center?.centerInfo_r?.executivePlan?.id || center?.centerInfo_r?.executivePlan)],
        securityReport: center?.centerInfo_r?.securityReport && [(center?.centerInfo_r?.securityReport?.id || center?.centerInfo_r?.securityReport)],
        Furniture: center?.centerInfo_r?.furniturePhoto_r && [(center?.centerInfo_r?.furniturePhotoZippedFile || center?.centerInfo_r?.furniturePhoto_r)],
        furniturePhotoZippedFile: center?.centerInfo_r?.furniturePhotoZippedFile && [(center?.centerInfo_r?.furniturePhotoZippedFile?.id || center?.centerInfo_r?.furniturePhotoZippedFile)],
        officeReport: center?.centerInfo_r?.engineeringPlan && [(center?.centerInfo_r?.engineeringPlan?.id || center?.centerInfo_r?.engineeringPlan)],
        financialGuaranteeAtt: center?.centerInfo_r?.financialGuarbteeAtt && [(center?.centerInfo_r?.financialGuarbteeAtt?.id || center?.centerInfo_r?.financialGuarbteeAtt)],
        centerOperatingLetterFromTheEmployer: center?.centerInfo_r?.centerOperatingLetterFromTheEmployer&& [(center?.centerInfo_r?.centerOperatingLetterFromTheEmployer?.id || center?.centerInfo_r?.centerOperatingLetterFromTheEmployer)],

        //files
        centerType: center?.type,//check
        type: center?.type,//check
        centerLicenseNumber: center?.centerLicense_r?.LicenseNumber,
        licenseNumber: center?.centerLicense_r?.LicenseNumber,

        targetedBenificiray: center?.targetedBeneficiary,//check
        targetedServices: center?.targetedServices,//check
        ownerID: center?.centerOwner_r?.ownerID,
        ownerName: center?.centerOwner_r?.ownerName,
        ownerType: center?.centerOwner_r?.ownerType,
        centerAgeGroup: center?.ageGroup,
        centerGenderGroup: getGender(center?.targetedGender),
        engineeringPlan: getDocId(center?.centerInfo_r?.engineeringPlan),
        fireDepartmentLicense: getDocId(center?.centerInfo_r?.fireDepartmentLicense),
        momraDoc: getDocId(center?.centerInfo_r?.momraDoc),
        fireDepartmentExpD: center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri && extractDateToObject(center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri),
        fireDepartmentExpDText: center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri && getDateFromString(center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri, 'iYYYYiMMiDD', 'iDD/iMM/iYYYY'),
        CRNumber: center?.crInfo_r?.crNumber,
        companyName: center?.crInfo_r?.entityName,
        municipLicenseNo: processVariablesDump?.crInfo_r?.MoMRA_Licence || center?.crInfo_r?.MoMRA_Licence || center?.crInfo_r?.MoMRA_Licence,
        activities: center?.crInfo_r?.crActivityType,
        crIssueDate: center?.crInfo_r?.crIssueDate,
        crExpirationDate: center?.crInfo_r?.crExpirationDate,
        beneficiariesNum: data?.processVariablesDump?.NewCenterLocationData?.centerInfo_r?.beneficiaryCount || data?.center?.centerInfo_r?.beneficiaryCount,
        beneficiaryCount: data?.processVariablesDump?.NewCenterLocationData?.centerInfo_r?.beneficiaryCount || data?.center?.centerInfo_r?.beneficiaryCount,
        capacity: center?.centerInfo_r?.carryingnumber,
        buildingArea: center?.centerInfo_r?.buildingArea,
        basementArea: center?.centerInfo_r?.basementArea,
        financialGuarantee: center?.centerInfo_r?.financialGuarantee || center?.centerInfo_r?.financialGuarantee,
        address: formatLocation(center?.centerLocation_r),
        area: center?.centerLocation_r?.area,
        sub: center?.centerLocation_r?.area,
        city: center?.centerLocation_r?.city,
        street: center?.centerLocation_r?.street,
        buildNo: center?.centerLocation_r?.buildNo,
        lat: center?.centerLocation_r?.lat,//center?.centerLocation_r?.lat,
        lng: center?.centerLocation_r?.lng,//center?.centerLocation_r?.lng,
        postalCode: center?.centerLocation_r?.postalCode,//center?.centerLocation_r?.postalCode,
        additionalNo: center?.centerLocation_r?.additionalNo,//center?.centerLocation_r?.additionalNo,
        healthServices: center?.isHealthCareServices ? "yes" : "no",
        healthServiceType: center?.healthCareServices_r?.type,
        healthServiceAttachment: getDocId(center?.healthCareServices_r?.attachment),
        healthCareServices_r: center?.healthCareServices_r?.ID,
        customers: staff && formateStaff((staff)),
        salesDoc: { id: processVariablesDump?.otherData?.ContractOfSale },
        waiverDoc: { id: processVariablesDump?.otherData?.WaiverDeclaration },
        ageGroup: center?.ageGroup,//check
        licenseCreationDate: center?.centerLicense_r?.creationHijri,
        agree: [false],
        isNextBtnDisabled: false,
        managersCount: 0,
        teachersCount: 0,
        centerType: center?.type,
        temporaryLicenseNum: center?.centerLicense_r?.LicenseNumber,
        licenseCreationDate: center?.centerLicense_r?.creationHijri,
        licenseExpiryDate: center?.centerLicense_r?.expirationHijri,
        ownerName: center?.centerOwner_r?.ownerName,
        ownerID: center?.centerOwner_r?.ownerID,
        centerAgeGroup: center?.ageGroup && reverseRange(center?.ageGroup),
        centerGenderGroup: center?.targetedGender,
        CRNumber: center?.crInfo_r?.crNumber,
        companyName: center?.crInfo_r?.entityName,
        municipLicenseNo: center?.crInfo_r?.MoMRA_Licence || center?.crInfo_r?.MoMRA_Licence,
        beneficiariesNum: center?.centerInfo_r?.beneficiaryCount,
        capacity: center?.centerInfo_r?.carryingnumber && numeral(center?.centerInfo_r?.carryingnumber).format('0,0'),
        financialGuarantee: center?.centerInfo_r?.financialGuarantee && `${numeral(center?.centerInfo_r?.financialGuarantee).format('0,0.00')} ر.س.`,
        buildingArea: center?.centerInfo_r?.buildingArea,
        basementArea: center?.centerInfo_r?.basementArea,
        securityReport: center?.centerInfo_r?.securityReport && [center?.centerInfo_r?.securityReport?.id || (center?.centerInfo_r?.securityReport)],
        healthServices: center && center.centerInfo_r && center.isHealthCareServices ? "yes" : "no",
        healthServiceType: center?.healthCareServices_r?.type,
        healthServiceAttachment: center?.healthCareServices_r?.attachment && [(center?.healthCareServices_r?.attachment?.id || center?.healthCareServices_r?.attachment)],
        ownerEducationalQualifications: center?.centerOwner_r?.centerOwnerEducationQualification && [center?.centerOwner_r?.centerOwnerEducationQualification?.id || center.centerOwner_r?.centerOwnerEducationQualification],
        buildingScheme: center.centerInfo_r?.buildingScheme && [center.centerInfo_r?.buildingScheme?.id || center.centerInfo_r?.buildingScheme], //check
        CRName: center?.crInfo_r?.CRName,//check
        workingHours: center?.workingHours,
        centerStatus:center?.isWorkSuspended ? 'yes' : 'no',
        activities: center?.crInfo_r?.crActivityType,
        Statefeebearingprogram: center?.isStateFeeService ? 'yes' : 'no',
        AcceptencePercentage: center?.StateFeeCenterTransport_r?.acceptanceRatio,
        Transportation: center?.StateFeeCenterTransport_r?.isTransportService ? 'yes' : 'no',
        CenterEvaluation: center?.centerEvaluation,

        centerWorkingHours: center?.workingHours,
        fireDepartmentLicenseExpiryDate: (processVariablesDump?.NewCenterLocationData?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri || center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri) &&
            (center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri.includes('/') ? {
                year: getDateFromString(
                    center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri,
                    'iYYYY/iMM/iDD',
                    'iYYYY'
                ),
                month: getDateFromString(
                    center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri,
                    'iYYYY/iMM/iDD',
                    'iMM'
                ),
                day: getDateFromString(
                    center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri,
                    'iYYYY/iMM/iDD',
                    'iDD'
                )
            } : {
                year: getDateFromString(
                    center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri,
                    'iYYYYiMMiDD',
                    'iYYYY'
                ),
                month: getDateFromString(
                    center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri,
                    'iYYYYiMMiDD',
                    'iMM'
                ),
                day: getDateFromString(
                    center?.centerInfo_r?.expirarionDateForFireDepartmentLicenseHijri,
                    'iYYYYiMMiDD',
                    'iDD'
                )
            }),
        center: center
    }
    if (result.type != '01' && staff?.length > 0) {

        result.managerBOD = staff[0]?.birthDate;
        result.fullName = staff[0]?.name;
        result.idNumber = staff[0]?.idNumIqamaNum
        result.IDNo = staff[0]?.idNumIqamaNum
        result.gender = staff[0]?.gender

        const isWithSlashes = staff[0]?.birthDate.includes('/');
        result.managerBD = extractDateToObject(staff[0]?.birthDate, isWithSlashes ? 'iDD/iMM/iYYYY' : 'iYYYYiMMiDD')
        result.gender = staff[0]?.gender
        result.birthDate = staff[0]?.birthDate
        result.CV = staff[0]?.CV && [staff[0]?.CV?.id]//check
        result.educationalQualifications = staff[0]?.educationQualifications && [staff[0]?.educationQualifications?.id] //check
        result.medicalReport = staff[0]?.medicalReport && [staff[0]?.medicalReport?.id] //check
        result.firstAidCourseCompletionCertificate = staff[0]?.firstAidCourseCompletionCertificate && [staff[0]?.firstAidCourseCompletionCertificate?.id] //check
        result.titleDeedOrLeaseContract = center?.centerInfo_r?.titleDeedOrLeaseContract && [center?.centerInfo_r?.titleDeedOrLeaseContract?.id || center?.centerInfo_r?.titleDeedOrLeaseContract] //check
        result.childhoodTrainingCertificate = staff[0]?.childhoodTrainingCertificate && [staff[0]?.childhoodTrainingCertificate?.id]//check
    } else {
        console.log('alls staff', getStaff(staff))

    }
    console.log('formatGetCenterDetails  ', result);
    return result
}



export { formateGetRequestDetails }
