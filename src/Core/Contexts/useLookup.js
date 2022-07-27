import React, { useContext, useEffect, useState } from 'react'
import { getLookups } from 'src/Modules/CenterServices/TemporaryLicense/API/temporayLicenseAPI'
import { getLookupValues } from 'src/Modules/CenterServices/TemporaryLicense/Utils/temporayLicenseUtil'
import PropTypes from 'prop-types';

const LookupContext = React.createContext()
const UpdateLookupContext = React.createContext()

export function useLookup() {
  return useContext(LookupContext)
}

export function useUpdateLookup() {
  return useContext(UpdateLookupContext)
}
export function LookupProvider({ children }) {
  useEffect(async () => {
    refreshLookUp()
  }, [])
  const [lookupValues, setLookupValues] = useState({ isEmpity: true })
  const refreshLookUp = async () => {
    const res = await getLookups(1);
    if (res.isSuccessful) {
      setLookupValues(getLookupValues(res.responseBody.data.lookup.Center_Types_Tree.content));
    }
  }

  return (
    <LookupContext.Provider value={lookupValues}>
      <UpdateLookupContext.Provider value={refreshLookUp}>
        {children}
      </UpdateLookupContext.Provider>
    </LookupContext.Provider>)
}

LookupProvider.propTypes = {
  children: PropTypes.any
}