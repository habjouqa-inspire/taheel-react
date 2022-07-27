import React, { useState, useEffect, useMemo } from 'react';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import TableCreator from 'src/Core/SchemaBuilder/TableCreator';
import alignmentCentersTableSchema, { SchemaActions } from '../Schema/alignmentCentersTableSchema';
import { TablePaginationObject } from 'src/Core/SchemaBuilder/Utils/TablePagination';
import TableDataViewEnum from 'src/Core/SchemaBuilder/Utils/TableDataViewEnum';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import { getCenters } from 'src/Modules/CenterManagement/API/CentersApi';
const AlignmentCentersPage = () => {
    const { email } = getCurrentUser();
    const lookupValues = useLookup()
    const refreshLookup = useUpdateLookup()
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMessage, SetErrMessage] = useState('')
    const pageTitle = 'نموذج الموائمة'
    const TPObject = TablePaginationObject(TableDataViewEnum.PAGINATION_DATA)
    const paramData = useMemo(() => {
        return {
            batchSize: TPObject.pagination.batchSize,
            startIndex: TPObject.pagination.startIndex,
            filters: TPObject.pagination.filters
        }
    }, [TPObject.pagination.batchSize, TPObject.pagination.startIndex, TPObject.pagination.filters])

    useEffect(async () => {
        lookupValues?.isEmpity && (refreshLookup())
        const getAllCenters = await getCenters(email, paramData.startIndex, paramData.batchSize, paramData.filters , true);
        if (!getAllCenters.isSuccessful) {
            setCenters('')
            SetErrMessage(getAllCenters?.message)
            setLoading(false)
        }
        else{
            let CentersData = getAllCenters.responseBody.data.Centers;
            const totalCount = getAllCenters.responseBody.data.totalCount;
            SetErrMessage('')
            CentersData = CentersData.map(cd => { return { centerType: cd.type, targetedBenificiray: cd?.targetedBeneficiary, ...cd ,totalCount:totalCount} })
            setCenters({
              Centers: CentersData,
              totalCount,
            })
            setLoading(false)
        }
    }, [paramData]);
    return (
        <TableCreator lookupObject={lookupValues} dataTable={centers.Centers} tableStyle={{ padding: "20px", minHeight: "100%" }} pageTitle={pageTitle} tableShcema={{ ...alignmentCentersTableSchema, ...SchemaActions() }} totalCount={centers.totalCount} loading={loading} TPObject={TPObject} errMessage={errMessage} />
    );
}

export default AlignmentCentersPage;

