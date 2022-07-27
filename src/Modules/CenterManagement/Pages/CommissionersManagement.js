/* eslint-disable */
import { useNavigate } from 'react-router';
import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Link } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { CentertDetails } from 'src/Modules/CenterServices/API/ServicesApi';
import { TablePaginationObject } from 'src/Core/SchemaBuilder/Utils/TablePagination';
import CrewSchema, { SchemaActions } from '../Schema/CommissionersTableSchema';
import TableDataViewEnum from 'src/Core/SchemaBuilder/Utils/TableDataViewEnum';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';
import IconsList from 'src/Core/SchemaBuilder/FieldsInputs/IconsList';
import TableCreator from 'src/Core/SchemaBuilder/TableCreator';
import AlertDialog from 'src/Core/Components/AlertDialog';
import Fab from '@mui/material/Fab';
import { deleteCommissionerRs } from '../API/CentersApi';

const AddCommissioner = (props) => {
    const location = useLocation();
    const licenseNumber = location.state.licenseNumber;
    const navigateion = useNavigate()
    console.log("licenseNumber+_+_+_+_+_+_+", licenseNumber)
    const [commissioners, setCommissioners] = useState([]);
    const [staff, setStaff] = useState([]);
    const [candidateStaff, setCandidateStaff] = useState([]);
    const [errMessage, setErrMessage] = useState(location.state.message)
    const [loading, setLoading] = useState(true);
    const TPObject = TablePaginationObject(TableDataViewEnum.ALL_DATA)
    const [open, setOpen] = useState(false);
    const [currentSelected, setCurrentSelected] = useState('');
    const paramData = useMemo(() => {
        return {
            batchSize: TPObject.pagination.batchSize,
            startIndex: TPObject.pagination.startIndex,
            filters: TPObject.pagination.filters
        }
    }, [TPObject.pagination.batchSize, TPObject.pagination.startIndex, TPObject.pagination.filters])

    const tableTitle = 'جدول المفوضين'
    const pageTitle = 'إدارة المفوضين'
    const tableAction = () => {
        return (
            candidateStaff?.length > 0 ?
                (<Grid container direction="row" spacing={1}>
                    <Grid item style={{ fontWeight: "bold" }} >
                        <Link
                            component="button"
                            variant="body2"
                            fontWeight="bold"
                            fontSize="large"
                            onClick={() => navigateion('/app/AddCommissioner', { state: { licenseNumber, candidateStaff } })}
                        >
                            إضافة مفوض
                        </Link>
                    </Grid>
                    <Grid item>
                        < Fab size="small" color="primary" aria-label="add" onClick={() => navigateion('/app/AddCommissioner', { state: { licenseNumber, candidateStaff } })}>
                            <IconsList iconType={IconsTypeEnum.ADD_ICON} color="info" />
                        </Fab >
                    </Grid>
                </Grid>
                )
                : ('')
        )
    }

    const handleClickOpen = (data) => {
        setCurrentSelected(data)
        setErrMessage('')
        setOpen(true);
    };

    const handleClose = () => {
        setCurrentSelected('');
        setOpen(false);
    };
    async function deleteCommissioner() {
        const email = currentSelected['email']
        setLoading(true)
        const deleteCommissioner = await deleteCommissionerRs(email)
        if (!deleteCommissioner.isSuccessful) {
            setErrMessage(deleteCommissioner.message);
            return { isSquccessful: false, message: deleteCommissioner.message };
        } else {
            candidateStaff.push(staff.filter(st => st.idNumIqamaNum === currentSelected.idNumIqamaNum)[0])
            setCommissioners(commissioners.filter(commissioner => commissioner.email !== email))
            setErrMessage({ msg: email + " تم الحذف بنجاح", type: "success" });
            setLoading(false)
            return { isSquccessful: true, message: email + " تم الحذف بنجاح" };
        }
    }
    useEffect(async () => {
        const getCenterDetails = await CentertDetails(licenseNumber, paramData.startIndex, paramData.batchSize, paramData.filters);
        if (!getCenterDetails.isSuccessful) {
            setLoading(false)
            const response = { isSuccessful: false, message: getCenterDetails.message };
            setErrMessage(getCenterDetails.message)
            return response;
        } else {
            const Details = getCenterDetails.responseBody.data;
            Details.staff.map(data => data.centerLicense_r = { LicenseNumber: licenseNumber })
            setCommissioners(Details.commissioner)
            setCandidateStaff(Details.candidateStaff)
            setStaff(Details.staff)
            console.log('commissioner', Details.commissioner)
            console.log('candidateStaff', Details.candidateStaff)
            console.log("Details+++++++++++++", Details);
            setLoading(false)
        }

    }, []);

    return (
        <>
            <AlertDialog open={open} onClose={() => { setOpen(false) }} dialogTitle="حذف مفوض" dialogContent={" هل أنت متأكد من حذف صاحب رقم الإقامة ' " + currentSelected["idNumIqamaNum"] + " ' من لائحة المفوضين ؟ "} buttons={{ leftBtn: { title: 'حذف', func: () => { setOpen(false); return deleteCommissioner() } }, rightBtn: { title: 'إلغاء', func: handleClose } }} />
            <TableCreator
                tableStyle={{ padding: "20px", minHeight: "100%" }}
                pageTitle={pageTitle}
                tableTitle={tableTitle}
                navBackUrl={{ url: '/app/centers', state: { licenseNumber: licenseNumber } }}
                tableShcema={{ ...CrewSchema, ...SchemaActions() }}
                dataTable={commissioners}
                loading={loading}
                otherFunc={handleClickOpen}
                setErrMessage={setErrMessage}
                action={tableAction()}
                errMessage={errMessage} />
        </>
    )
}

export default AddCommissioner;
