import React, { useEffect, useMemo, useState } from 'react';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import TableCreator from 'src/Core/SchemaBuilder/TableCreator';
import TableDataViewEnum from 'src/Core/SchemaBuilder/Utils/TableDataViewEnum';
import { TablePaginationObject } from 'src/Core/SchemaBuilder/Utils/TablePagination';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { getCenters } from '../API/CentersApi';
import CentersTableSchema, { SchemaActions } from '../Schema/CentersTableSchema';
const Centers = () => {
  const { email } = getCurrentUser();
  console.log("email+++++++++++++", email);
  const lookupValues = useLookup()
  const refreshLookup = useUpdateLookup()
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMessage, SetErrMessage] = useState('')
  const TPObject = TablePaginationObject(TableDataViewEnum.PAGINATION_DATA)
  const paramData = useMemo(() => {
    return {
      batchSize: TPObject.pagination.batchSize,
      startIndex: TPObject.pagination.startIndex,
      filters: TPObject.pagination.filters
    }
  }, [TPObject.pagination.batchSize, TPObject.pagination.startIndex, TPObject.pagination.filters])
  const pageTitle = 'المراكز'
  useEffect(async () => {
    lookupValues?.isEmpity && (refreshLookup())
    // const getCentersRs = await getCentersFun(email);
    setLoading(true)
    let response = ''
    const getCentersDetails = await getCenters(email, paramData.startIndex, paramData.batchSize, paramData.filters);
    if (!getCentersDetails.isSuccessful) {
      response = { isSuccessful: false, message: getCentersDetails.message };
      setCenters('')
      SetErrMessage(getCentersDetails.message)
      setLoading(false)
    } else {
      let CentersData = getCentersDetails.responseBody.data.Centers;
      const totalCount = getCentersDetails.responseBody.data.totalCount;
      SetErrMessage('')
      console.log("CentersData === > ", CentersData)
      CentersData = CentersData.map(cd => { return { centerType: cd.type, targetedBenificiray: cd?.targetedBeneficiary, ...cd } })
      setCenters({
        Centers: CentersData,
        totalCount,
      })
      setLoading(false)
    }
  }, [paramData]);
  return (
    <TableCreator lookupObject={lookupValues} tableStyle={{ padding: "20px", minHeight: "100%" }} pageTitle={pageTitle} tableShcema={{ ...CentersTableSchema, ...SchemaActions() }} dataTable={centers.Centers} totalCount={centers.totalCount} loading={loading} TPObject={TPObject} errMessage={errMessage} />
  );
}

export default Centers;
