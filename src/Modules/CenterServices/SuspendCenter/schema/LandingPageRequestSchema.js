/* eslint-disable */

import {
    Chip,
    colors
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import { useNavigate } from 'react-router';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';
import { REQUEST_STATUS } from 'src/Core/Utils/enums';
import { v4 as uuid } from 'uuid';

export function SchemaActions({ handlePopupClick }) {
    const navigateion = useNavigate();
    let icon
    return {
        actions: {
            label: {
                ar: '',
                en: ''
            },
            type: 'MoreVertIcon',
            buttons: [{
                id: uuid(),
                labelFunc: () => {
                    return 'عرض التفاصيل'

                },
                iconTag: IconsTypeEnum.VISIBILITY_ICON,
                attrName: 'moreDetails',
                btnFun: async (values) => {
                    if (![15, 16, 17].includes(values?.typeId)) { return; }
                    if (values?.status === -3) {
                        console.log('requestPage::schema::draftNavigate', values.status);
                        navigateion('/center-services/suspendcenter', {
                            state: {
                                reqNum: values?.requestNum,
                                extendSus: values?.typeId === 16,

                            }
                        })
                        return {};
                    }
                    console.log('requestPage::schema::summary', values.status);

                    navigateion('/center-services/suspendRequestSummary',
                        {
                            state: {
                                reqNum: values?.requestNum,
                                isExtend: values?.typeId === 16,
                                isCanceled: values?.typeId === 17
                            }
                        })
                    console.log('تمديد تعليق المركز', values.status);
                }
            },
            {
                id: uuid(),
                labelFunc: (values) => {
                    if (values.comment) {
                        return 'ملاحظات الطلب'
                    } else {
                        return null
                    }
                },
                color: 'action',
                iconTag: IconsTypeEnum.INFO_ICON,
                btnFun: async (values) => {
                    console.log('LandingPageSchema::values', values);
                    handlePopupClick(values.comment)
                }
            }
            ]
        }

    }
};
const ChipComponentsForStatus = (values) => {
    console.log('landing,PageRequest:: values', values);
    const status = values?.status
    const statusName = values?.statusName?.statusNameReact
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
export default () => {
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
                    ar: 'تاريخ الطلب',
                    en: 'Order request date'
                },
                name: 'requestDate',
                type: 'Text',
            },
            {
                id: uuid(),

                type: 'text',
                label: { ar: 'نوع الطلب', en: 'license Number' },
                name: 'type',
            },
            {
                id: uuid(),

                type: 'text',
                label: { ar: 'حالة الطلب', en: 'license Number' },
                gridSize: '1',
                attrFunc: (v) => { return ChipComponentsForStatus(v) },
                disabled: true

            },



            // {
            //     id: uuid(),
            //     label: {
            //         ar: 'حالة الطلب',
            //         en: 'Order status'
            //     },
            //     attrFunc: (values) => {
            //         return (
            //             <ChipComponentsForStatus values={values} />
            //         )
            //     },
            //     type: 'Text'
            // }
        ]
    }
};

