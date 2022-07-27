import { APIRequest } from 'src/Core/API/APIRequest';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { getStaff } from '../Utils/TransferCenterOwnershipUtil';

const transferCenterOwnershipAPIFunc = async (data) => {
    console.log('#==> data+++' + JSON.stringify(data))
    const { email } = getCurrentUser();

    let locType = "";
    if (data.locationType == "2") {
        locType = "SAME"
    } else {
        locType = "CHANGED"
    }

    const requestBody = {
        serviceStatus: 1,
        isDraft: data.isDraft,
        userCreationEmail: email,
        otherData: {
            ContractOfSale: !!data?.ContractOfSale && data?.ContractOfSale[0]?.id || data?.ContractOfSale[0],
            WaiverDeclaration: !!data?.WaiverDeclaration && data?.WaiverDeclaration[0]?.id || data?.WaiverDeclaration[0],
            LocationofOwnershipTransfer: locType,
        },
        crCommissioner: {
            name: data.commissionerName,
            natId: data.natId,
            BirthDateH: data.BirthDateH,
            email: data.comEmail,
            mobile: data.mobile,
        },
        center: {
            type: data.centerType,
            centerLicense_r: {
                LicenseNumber: data.centerLicenseNumber,
            },
            centerOwner_r: {
                ownerID: data.NewCRNumber || data.idNo,
                ownerName: data.companyName,
                ownerIDExpireDate: data?.ownerIDExpireDate || data?.crExpirationDate,
                ownerType: data.requestType,
                ownerGender: data.gender
            }
        }
    }
    if (data.isDraft) {
        requestBody.draft_values = { centerLicenseNumber: data.licenseNumber, ...data }
    }
    let url = "taheel-apis-services-transfer-center-ownership";

    console.log('#==> requestBody ' + JSON.stringify(requestBody))
    const response = await APIRequest({ requestBody, url });
    return response;

}


const transferCenterNewOwnershipAPIFunc = async (data, requestNum) => {
    console.log('#==> transferCenterNewOwnershipAPIFunc :: data  ', data)
    const { email } = getCurrentUser();

    const { day, month, year } = !!data?.fireDepartmentExpD ? data?.fireDepartmentExpD : !!data?.fireDepartmentLicenseExpiryDate ? data?.fireDepartmentLicenseExpiryDate : {};
    function numberToDay(day) {
        return ('0' + day).slice(-2);
    }
    const expiryDate = year + '' + numberToDay(month) + numberToDay(day);

    const isHealthCare = data.healthServices === "no" ? false : true

    const requestBody = {
        serviceStatus: 2,
        externalUserTaskID: data.taskId,
        requestNumber: requestNum,

        isDraft: data.isDraft,
        userCreationEmail: email,
        otherDocuments: data?.otherDocuments,
        center: {
            type: data.centerType,
            centerLicense_r: {
                LicenseNumber: data.centerLicenseNumber,
            },
            centerOwner_r: {
                centerOwnerEducationQualification: data.ownerEducationalQualifications && data?.ownerEducationalQualifications[0],
                ...data.newCenterOwner
            },
            centerInfo_r: {
                ID: data.centerInfo_r.ID,
                buildingScheme: data.buildingScheme ? (data.buildingScheme[0] || data.buildingScheme?.id) : null,
                fireDepartmentLicense: data?.fireDepartmentLicense ? data?.fireDepartmentLicense[0] : null,
                expirarionDateForFireDepartmentLicenseHijri: //must be check and be more clean and readable
                    data?.fireDepartmentExpD?.year  //daycare and othertypes
                        ? data?.fireDepartmentExpD?.year + '' + data?.fireDepartmentExpD?.month + '' + data?.fireDepartmentExpD?.day + ''
                        : data?.fireDepartmentLicenseExpiryDate?.year + '' + data?.fireDepartmentLicenseExpiryDate?.month + '' + data?.fireDepartmentLicenseExpiryDate?.day + ''
                ,

                educationQualifications: data?.educationalQualifications ? data?.educationalQualifications[0] : null,
                titleDeedOrLeaseContract: data?.titleDeedOrLeaseContract ? data?.titleDeedOrLeaseContract[0] : null,
                buildingArea: data?.buildingArea,
                basementArea: data?.basementArea,
                carryingnumber: data?.capacity,
                beneficiaryCount: data?.beneficiariesNum,
                financialGuarantee:
                    data.financialGuarantee &&
                    data.financialGuarantee?.substring(
                        0,
                        data.financialGuarantee.length - 5
                    ),
                financialGuarbteeAtt: !!data?.financialGuaranteeAtt ? data?.financialGuaranteeAtt[0] : null,
                executivePlan: !!data?.executivePlan ? data?.executivePlan[0] : null,
                operationPlan: !!data?.operationPlan ? data?.operationPlan[0] : null,
                engineeringPlan: data?.engineeringPlan?.[0] || data?.officeReport?.[0],//
                securityReport: !!data?.securityReport ? data?.securityReport[0] : null,
            },
            centerLocation_r: {
                city: data?.city,
                area: data?.sub,
                street: data?.street,
                buildNo: data?.buildNo,
                lat: data?.lat,
                lng: data?.lng,
                postalCode: data?.postalCode,
                additionalNo: data?.additionalNo
            },
            isHealthCareServices: isHealthCare,
            healthCareServices_r: {
                type: data?.healthServices === 'yes' ? data?.healthServiceType : null,
                attachment: data?.healthServices === 'yes' ?
                    data?.healthServiceAttachment?.[0]
                    : null
            },
            crInfo_r: {
                ID: data?.crInfo_r?.ID,
                crNumber: data?.CRNumber,
                idNumIqamaNum: data?.idNumber,
                crActivityType: data?.activities,
                entityName: data?.companyName,
                MoMRA_Licence: data?.municipLicenseNo,
                crIssueDate: data?.crIssueDate,
                crExpirationDate: data?.crExpirationDate
            },
        },
        staff: (data.type === '01' || data.centerType === '01') ? getStaff(data)
            : [].concat({

                gender: data?.gender === 'ذكور' ? 'm' : 'f',
                birthDate: data?.birthDate,
                nationality: data?.idNumber?.charAt(0) === '1' ? 'سعودي' : 'غير سعودي',
                sponsorName: '',
                name: data?.fullName,
                idNumIqamaNum: data?.idNumber,
                StaffType: 9,
                CV: !!data?.CV ? data?.CV[0] : null,
                educationQualifications: !!data?.educationalQualifications ? data?.educationalQualifications[0] : null,
                medicalReport: !!data?.medicalReport ? data?.medicalReport[0] : null,
                firstAidCourseCompletionCertificate: !!data?.firstAidCourseCompletionCertificate ? data?.firstAidCourseCompletionCertificate[0] : null,
                titleDeedOrLeaseContract: !!data?.titleDeedOrLeaseContract ? data?.titleDeedOrLeaseContract[0] : null,
                buildingScheme: !!data?.buildingScheme ? data?.buildingScheme[0] : null,
            })
    }
    if (!data.changeLocation) {
        requestBody.centerLocation_r = {}
    }
    if (data.isDraft) {
        requestBody.draft_values = { ...data, draftType: 'NewOwnership' }
    }
    let url = "taheel-apis-services-transfer-center-ownership";

    console.log('#==> requestBody ' + JSON.stringify(requestBody))
    const response = await APIRequest({ requestBody, url });
    //const response = { isSuccessful: false, message: "DUMMY" }
    return response;
}

export { transferCenterOwnershipAPIFunc, transferCenterNewOwnershipAPIFunc };

