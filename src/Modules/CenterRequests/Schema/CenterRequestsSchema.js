/* eslint-disable */
import { v4 as uuid } from 'uuid';
import {
    IconButton,
    Chip,
    colors,
    InputAdornment,
    Tooltip
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DoneIcon from '@material-ui/icons/Done';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import IconsList from 'src/Core/SchemaBuilder/FieldsInputs/IconsList';
import { LICENSE_FORM_TYPES, REQUEST_STATUS, REQUEST_TYPES } from 'src/Core/Utils/enums'
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';

const CommentIconWithPopup = ({ values, handlePopupClick }) => (
    !!values.comment &&//title="الملاحظات"
    <IconButton aria-label="Remarks" onClick={() => handlePopupClick(values.comment)}>
        <Tooltip title={values.comment} style={{ maxWidth: 'none' }}>
            <InfoIcon />
        </Tooltip>
    </IconButton>

)

const ChipComponentsForStatus = ({ values }) => {
    const status = values.status
    const statusName = values.statusName?.statusNameReact
    if (status === REQUEST_STATUS.COMPLETED) {
        return (
            <Chip
                label={statusName}
                variant="outlined"
                size="medium"
                icon={<DoneIcon sx={{ color: '#43A047 !important' }} />}
                sx={{
                    color: colors.green[600],
                    borderColor: colors.green[600],
                }}
            />
        );
    }
    else if (status === REQUEST_STATUS.CANCELED || status === REQUEST_STATUS.REJECTED) {
        return (
            <Chip
                label={statusName}
                variant="outlined"
                size="medium"
                icon={<ErrorOutlineIcon sx={{ color: '#e53935 !important' }} />}
                sx={{
                    color: colors.red[600],
                    borderColor: colors.red[600],
                }}
            />
        );
    }
    else if (status === REQUEST_STATUS.DRAFT) {
        return (
            <Chip
                label={statusName}
                variant="outlined"
                size="medium"
                icon={<DraftsTwoToneIcon sx={{ color: 'grey !important' }} />}
                sx={{
                    color: colors.grey[600],
                    borderColor: colors.grey[600],
                }}
            />
        );
    } else if (status === REQUEST_STATUS.RETERNED_REQ) {
        return (
            <Chip
                label={statusName}
                variant="outlined"
                size="medium"
                icon={<HistoryOutlinedIcon sx={{ color: '#fb8c00 !important' }} />}
                sx={{
                    color: colors.orange[600],
                    borderColor: colors.orange[600],
                }}
            />
        )
    }
    return (
        <Chip
            label={statusName}
            variant="outlined"
            size="medium"
            icon={<HistoryOutlinedIcon sx={{ color: '#fb8c00 !important' }} />}
            sx={{
                color: colors.orange[600],
                borderColor: colors.orange[600],
            }}
        />
    );
};

const getRequestValues = (navigate, taskType, data) => {
    let navigatinURL = '', draftFormType = '', formDraft = false
    if (data.status === REQUEST_STATUS.DRAFT) {
        if (taskType.trim() === 'إنشاء رخصة نهائية') {
            navigatinURL = '/center-services/finallicense'
            draftFormType = LICENSE_FORM_TYPES.NEW
        }
        else if (data.typeId === REQUEST_TYPES.STATE_FEE_BEARING_PROGRAM) {
            navigatinURL = '/center-services/stateFeeBearingProgramCont'
            draftFormType = LICENSE_FORM_TYPES.DRAFT
        }
        else if (taskType.trim() === 'تجديد رخصة') {
            navigatinURL = '/center-services/finallicenserenewal'
            draftFormType = LICENSE_FORM_TYPES.RENEW
        }
        else if (taskType.trim() === 'نقل مركز') {
            navigatinURL = '/center-services/transfercenter'
            draftFormType = LICENSE_FORM_TYPES.RENEW
        }
        else if (taskType.trim() === 'نقل ملكية') {
            navigatinURL = '/center-services/transfercenterownership'
            draftFormType = LICENSE_FORM_TYPES.DRAFT
        }
        else if (taskType.trim() === 'نقل ملكية') {
            navigatinURL = '/center-services/transNewOnership'
            draftFormType = LICENSE_FORM_TYPES.NEW
        } else if (taskType.trim() === 'برامج مركز') {
            navigatinURL = '/center-services/UpdateProgram'
            draftFormType = LICENSE_FORM_TYPES.DRAFT
        } else if (taskType.trim() === 'إنشاء رخصة مؤقتة' || taskType.trim() === 'إنشاء موافقة مبدئية') {
            navigatinURL = '/center-services/templicense'
            draftFormType = LICENSE_FORM_TYPES.DRAFT
        }else if (data.typeId===16||data.typeId===15) {
            navigatinURL = '/center-services/suspendcenter'
            draftFormType = LICENSE_FORM_TYPES.DRAFT
        } else {
            navigatinURL = '/center-services/finallicense'
            draftFormType = LICENSE_FORM_TYPES.NEW
        }
        formDraft = true
    } else if (data.typeId === REQUEST_TYPES.FINAL || data.typeId === REQUEST_TYPES.RENEW || data.typeId === REQUEST_TYPES.TEMPOR) {
        navigatinURL = '/app/centersDetails'
    } else if (data.typeId === REQUEST_TYPES.TRANS_OWNERSHIP_REQ) {
        navigatinURL = '/center-services/transferCenterOwnershipSummary'
    }
    else if (data.typeId === REQUEST_TYPES.PROGRAME_REG_REQ) {
        console.log('testttt ::: nooooor   ', data.typeId);
        navigatinURL = '/center-services/ProgramRequestSummary'
    }
    else if (data.typeId === REQUEST_TYPES.CANCELING_APPROVALS) {
        navigatinURL = '/center-services/cancelInitialApprovalSummary'
    }
    else if (data.typeId === REQUEST_TYPES.CANCELING_FINAL_LICENSE) {
        navigatinURL = '/center-services/cancelFinalLicenseSummary'
    }
    else if (data.typeId === REQUEST_TYPES.STATE_FEE_BEARING_PROGRAM || data.typeId === REQUEST_TYPES.CANCEL_STATE_FEE_BEARING_PROGRAM) {
        navigatinURL = '/center-services/stateFeeBearingProgramSummary'
    }
    else if (data.typeId === REQUEST_TYPES.WORK_SUSPENSION || data.typeId === REQUEST_TYPES.EXTEND_WORK_SUSPENSION || data.typeId === REQUEST_TYPES.CANCEL_WORK_SUSPENSION) {

        if (data?.status === -3) {
            navigatinURL = '/center-services/suspendcenter'

        }else {
            navigatinURL = '/center-services/suspendRequestSummary'
        }
    }
    else {
        navigatinURL = '/center-services/transfercentersummary'
    }
    console.log('last time ssummary +++.>>', data);
    navigate(navigatinURL, {
        state: {
            requestDetails: { ...data, renewal: data.typeId === REQUEST_TYPES.RENEW },
            licenseNumber: data.centerLicenceNumber,
            formType: draftFormType,
            renewal: data.typeId === REQUEST_TYPES.RENEW,
            requestNum: data.requestNum,
            formDraft: formDraft,
            extendSus:data?.typeId===16,
            isExtend:data?.typeId===16,
            isCancel:data?.typeId===17,
            isCanceled:data?.typeId===17,

            reqNum: data.requestNum

        }
    })
}

export default ({ navigate, handlePopupClick }) => {
    return {
        schema: [
            {
                id: uuid(),
                label: {
                    ar: 'رقم الطلب',
                    en: 'Orders Number'
                },
                attrFunc: (value) => {
                    return value.requestNum
                },
                type: 'Text',
            },
            {
                id: uuid(),
                label: {
                    ar: 'اسم المركز',
                    en: 'Center Name'
                },
                name: 'centerName',
                attrFunc: (value) => value ? value : '--',
                type: 'Text',
            },
            {
                id: uuid(),
                label: {
                    ar: 'نوع الطلب',
                    en: 'Request Type'
                },
                name: 'type',
                type: 'Text',
            },
            {
                id: uuid(),
                label: {
                    ar: 'تاريخ الطلب',
                    en: 'Order request date'
                },
                name: 'requestDate',
                type: 'Text',
            },
            {
                id: uuid(),
                label: {
                    ar: 'حالة الطلب',
                    en: 'Order status'
                },
                attrFunc: (values) => {
                    return (
                        <ChipComponentsForStatus values={values} />
                    )
                },
                type: 'Text'
            }],
        actions: {
            label: {
                ar: '',
                en: ''
            },
            type: 'MoreVertIcon',
            buttons: [{
                id: uuid(),
                labelFunc: (values) => {
                    if (values.status === REQUEST_STATUS.DRAFT
                        || values.typeId === REQUEST_TYPES.TRANS_CENTER
                        || values.typeId === REQUEST_TYPES.FINAL
                        || values.typeId === REQUEST_TYPES.RENEW
                        || values.typeId === REQUEST_TYPES.TEMPOR
                        || values.typeId === REQUEST_TYPES.TRANS_OWNERSHIP_REQ
                        || values.typeId === REQUEST_TYPES.PROGRAME_REG_REQ
                        || values.typeId === REQUEST_TYPES.CANCELING_APPROVALS
                        || values.typeId === REQUEST_TYPES.CANCELING_FINAL_LICENSE
                        || values.typeId === REQUEST_TYPES.STATE_FEE_BEARING_PROGRAM
                        || values.typeId === REQUEST_TYPES.CANCEL_STATE_FEE_BEARING_PROGRAM
                        || values.typeId === REQUEST_TYPES.WORK_SUSPENSION
                        || values.typeId === REQUEST_TYPES.EXTEND_WORK_SUSPENSION
                        || values.typeId === REQUEST_TYPES.CANCEL_WORK_SUSPENSION


                    ) {
                        return 'عرض التفاصيل '
                    } else {
                        return null
                    }
                },
                iconTag: IconsTypeEnum.VISIBILITY_ICON,
                attrName: 'moreDetails',
                btnFun: async (values) => {
                    <IconsList iconType={"VisibilityIcon"} />
                    return (getRequestValues(navigate, values.type, values))
                }
            },
            {
                id: uuid(),
                labelFunc: (values) => {
                    if (values.comment) {
                        return 'الملاحظات'
                    } else {
                        return null
                    }
                },
                color: 'action',
                iconTag: IconsTypeEnum.INFO_ICON,
                btnFun: async (values) => {
                    handlePopupClick(values.comment)
                }
            }]
        }
    }
}
