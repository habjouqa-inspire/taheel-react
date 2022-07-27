/* eslint-disable */
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import AlertDialog from 'src/Core/Components/AlertDialog';
import TableCreator from 'src/Core/SchemaBuilder/TableCreator';
import TableDataViewEnum from "src/Core/SchemaBuilder/Utils/TableDataViewEnum";
import { TablePaginationObject } from 'src/Core/SchemaBuilder/Utils/TablePagination';
import { REQUEST_STATUS } from 'src/Core/Utils/enums';
import { requestStatus } from 'src/Core/Utils/TaheelUtils';
import { getTaheelRequestsFun } from 'src/Modules/CenterServices/API/ServicesApi';
import { getLookups } from 'src/Modules/CenterServices/TemporaryLicense/API/temporayLicenseAPI';
import OrdersSchema from '../Schema/CenterRequestsSchema';


const CenterRequests = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [taheelRequests, setTaheelRequests] = useState([]);
    const [taheelAllRequests, setTaheelAllRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [reqType, setReqType] = useState(0)
    const [status, setStatus] = useState(0)
    const [requestTypes,setRequestTypes] = useState([{ ID: 0, name: 'إظهار الجميع' }]);
    const [disablesearch, setDisableSearch] = useState(true)

    const [errMessage, SetErrMessage] = useState('')
    const [dialogContent, setDialogContent] = useState("");
    const [isOpen, setOpen] = useState(false);
    const TPObject = TablePaginationObject(TableDataViewEnum.PAGINATION_DATA)


    const tabsInfo = [
        {
            tableTitle: 'جميع الطلبات',
        },

        // {
        //     tableTitle: 'طلبات الإلغاء',
        // },
    ]
    const pageTitle = 'الطلبات'
    const [value, setValue] = useState(0);

    const paramData = useMemo(() => {
        return {
            batchSize: TPObject.pagination.batchSize,
            startIndex: TPObject.pagination.startIndex
        }
    }, [TPObject.pagination.batchSize, TPObject.pagination.startIndex])

    const handlePopupClick = (content) => {
        setDialogContent(content)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };
    const getRquest = async (searchTerm, requestTypeId, status) => {
        setTaheelRequests([]);
        SetErrMessage('')

        setLoading(true);
        setDisableSearch(true)
        let getTaheelRequestsRs;
        getTaheelRequestsRs = await getTaheelRequestsFun({ startIndex: paramData.startIndex, batchSize: paramData.batchSize, searchTerm: searchTerm, requestTypeId, status });
        let response = {};
        if (!getTaheelRequestsRs?.isSuccessful) {
            setLoading(false);
            setTaheelAllRequests([])
            SetErrMessage(getTaheelRequestsRs?.message?.error || getTaheelRequestsRs?.message)
            response = { isSuccessful: false, message: getTaheelRequestsRs?.message?.error };
        } else {

            let allData = []
            const data = getTaheelRequestsRs.responseBody.data;
            console.log('Details', data)
            setTaheelAllRequests(data);
            const drafts = data?.requests?.filter(r => r.status === REQUEST_STATUS.DRAFT)
            const filteredExtReq = data?.requests?.filter(d => d.status === REQUEST_STATUS.RETERNED_REQ);
            const filteredOwnership = data?.requests?.filter(d => d.typeId === REQUEST_STATUS.TRANS_OWNERSHIP_REQ);
            const canceledReq = data?.requests?.filter(d => d.typeId === REQUEST_STATUS.CANCELED_REQ);
            allData[0] = data
            allData[1] = drafts
            allData[2] = filteredExtReq
            allData[3] = filteredOwnership
            setTaheelRequests(allData);
            setLoading(false);
        }
        setDisableSearch(false)

    }
    useEffect(async () => {
        SetErrMessage('')
        setLoading(true)

        if (requestTypes.length === 1) {
       const response = await getLookups(6)
            var content =response?.responseBody?.data?.lookup?.request_types?.content
            if(!response.isSuccessful){
                SetErrMessage(response?.message)
            }else{
                content[0].ID = 0
                setRequestTypes(content)
            }
        }

        getRquest(searchTerm, reqType, status);

    }, [paramData.batchSize, paramData.startIndex]);
    const onSearch = async (searchTerm) => {
        SetErrMessage('')
        await getRquest(searchTerm, reqType, status)

    }
    const getRequestByRequestType = (e) => {
        SetErrMessage('')
        console.log('11  ', e.target.value);
        getRquest(searchTerm, [].concat(e.target.value), status)
    }
    const getRequestByRequestStatus = (e) => {
        setTaheelAllRequests([])
        getRquest(searchTerm, reqType, [].concat(e.target.value))

    }
    const addtionalFieldTop = () => {
        return <>
            <Grid container spacing={2}>

                <Grid item md={5}>
                    <TextField
                        disabled={disablesearch}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment >
                                    <IconButton
                                        onClick={() => onSearch(searchTerm)}
                                        fontSize="small"
                                        color="action"
                                        disabled={disablesearch}

                                    >
                                        <SearchIcon onClick={() => onSearch(searchTerm)} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={
                            e => {
                                setSearchTerm(e.target.value)
                                if (e.target.value === '') {
                                    onSearch(e.target.value)

                                }
                            }
                        }
                        onKeyPress={e => {
                            setSearchTerm(e.target.value)
                            console.log('entered key', e.key);
                            if (e.key === 'Enter') {
                                onSearch(e.target.value)
                            }
                        }}
                        placeholder="بحث"
                        edge="end"

                        endIcon={<SearchIcon />}

                    >

                    </TextField>
                </Grid>
                <Grid item md={3} className="custom-label-field">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">نوع الطلب</InputLabel>
                        <Select
                            disabled={disablesearch}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={reqType}
                            label="نوع الطلب"
                            variant='outlined'
                            fullWidth
                            dir="rtl"
                            className="custom-field"
                            formControlProps={{ fullWidth: true }}

                            placeholder="نوع الطلب"
                            onChange={e => {
                                getRequestByRequestType(e)
                                setReqType(e.target.value)
                            }}
                        >
                            {requestTypes?.map((item, idx) => (
                                <MenuItem key={idx} value={item.ID}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                </Grid>
                <Grid item md={3} className="custom-label-field">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">حالة الطلب</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="حالة الطلب"
                            disabled={disablesearch}
                            variant='outlined'
                            fullWidth
                            dir="rtl"
                            className="custom-field"

                            formControlProps={{ fullWidth: true }}

                            placeholder="حالة الطلب"
                            onChange={e => {
                                getRequestByRequestStatus(e)
                                setStatus(e.target.value)
                            }}
                        >
                            {requestStatus?.map((item, idx) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                </Grid>
            </Grid>
        </>
    }
    return (

        <>
            {tabsInfo.map((t, idx) => {
                return (
                    <>
                        <AlertDialog dialogContent={dialogContent} dialogTitle="الملاحظات" open={isOpen} onClose={handleClose} acceptBtnName="تم" />
                        <TableCreator
                            key={idx}
                            pageTitle={pageTitle}
                            useValue={[value, setValue]}
                            tableShcema={{ ...OrdersSchema({ navigate, handlePopupClick }) }}
                            dataTable={taheelAllRequests?.requests} totalCount={taheelAllRequests?.totalCount}
                            loading={loading} TPObject={TPObject} errMessage={errMessage}
                            addtionalFieldTop={addtionalFieldTop()}

                        />
                    </>
                )
            })}
        </>
    )
}

export default CenterRequests;