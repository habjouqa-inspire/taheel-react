import { APIRequest } from 'src/Core/API/APIRequest';
import { getDateFromObject } from 'src/Core/Utils/TaheelUtils';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { calculation } from '../../FinalLicense/API/finalLicenseAPI';
const { email } = getCurrentUser();

export const centerLocationTransferAPIFunc = async (values, requestNum, licNumber, formEdit, centersForDisabilities, taskID) => {
	console.log('#==> valuesvaluesvalues ' + JSON.stringify(values))
	let financialGuarantee = ''
	const getFurnitures = (values) => {
		const furnitures = []
		values.Furniture && values.Furniture.map((docId, index) => {
			furnitures.push({ Document: docId })
		})
		return furnitures
	}

	function numberToDay(day) {
		return ('0' + day).slice(-2);
	}
	const { email } = getCurrentUser();
	const { day, month, year } = values;
	const expiryDate = year + '' + numberToDay(month) + numberToDay(day);

	if (!!centersForDisabilities) {
		const res = await calculation(values.buildingArea, values.basementArea);
		financialGuarantee = res?.responseBody?.body?.financialGuarantee
	}
	const requestBody = {
		serviceStatus: formEdit ? 2 : 1,
		isDraft: values.isDraft,
		requestNumber: requestNum,
		userCreationEmail: email,
		externalUserTaskID: taskID,
		center: {
			centerLicense_r: {
				LicenseNumber: formEdit ? licNumber : values?.centerLicense_r?.LicenseNumber,
			},
			centerInfo_r: {
				financialGuarantee: financialGuarantee,
				ID: values.centerInfo_r,
				buildingArea: values.buildingArea,
				basementArea: values.basementArea,
				carryingnumber: values.capacity,
				furniturePhoto_r: getFurnitures(values),
				fireDepartmentLicense: !!values?.fireDepartmentLicense && values?.fireDepartmentLicense[0],
				// expirarionDateForFireDepartmentLicenseHijri: values?.fireDepartmentLicenseExpiryDate?.year + values?.fireDepartmentLicenseExpiryDate?.month + values?.fireDepartmentLicenseExpiryDate?.day,
				expirarionDateForFireDepartmentLicenseHijri: getDateFromObject({ date: values?.fireDepartmentLicenseExpiryDate, req: 'iYYYY/iMM/iDD' }),

				engineeringPlan: !!values?.engineeringPlan && values?.engineeringPlan?.[0]?.id||values?.engineeringPlan[0],
				momraDoc: !!values?.momraDoc && values?.momraDoc[0],
			},
			centerLocation_r: {
				city: values.city,
				area: values.sub,
				street: values.street,
				buildNo: values.buildNo,
				lat: values.lat,
				lng: values.lng,
				postalCode: values.postalCode,
				additionalNo: values.additionalNo, // !values.additionalNo ? '-': values.additionalNo,
			}
		}
	}
	if (!!values.taskID) {
		requestBody.serviceStatus = 2
		requestBody.externalUserTaskID = values.taskID
	}
	if (values.isDraft) {
		requestBody.draft_values = { centerLicenseNumber: values.licenseNumber, ...values }
	}
	let url = "taheel-apis-services-initiate-center-location-change-request";

	console.log('#==> requestBody ' + JSON.stringify(requestBody))
	const response = await APIRequest({ requestBody, url });
	// const response = {isSuccessful:false, message:"DUMMY"}
	return response;
}

export const TransferRequirmentsCompletionLetterReq = async (isEmail,messageCode) => {
	const url = '/taheel-apis-services-AttachmentsConfig_v2';
	const queryParams = {
		messageCode: messageCode,
		userEmail: email

	};
	if(isEmail) {queryParams.isEmail=isEmail}
	const response = await APIRequest({ url, queryParams });
	return response;
}
export const formalLetterDoc = async (LicenseNumber) => {//the new API for formal letter Doc
	const url = 'taheel-apis-services-Generate-Formal-Letter';
	const requestBody = {
		licenseNumber:LicenseNumber,
		userEmail: email

	};
	const response = await APIRequest({ url, requestBody });
	return response;
}

// export { centerLocationTransferAPIFunc };
