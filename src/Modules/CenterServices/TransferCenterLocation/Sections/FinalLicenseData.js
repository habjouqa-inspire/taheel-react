/* eslint-disable */
import {
  Grid,
  MenuItem
} from '@material-ui/core';
import { CardContent, CircularProgress } from '@mui/material';
import { Select } from 'final-form-material-ui';
import { useEffect } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import CenterSummary from './CenterSummary';

const FinalLicenseData = ({ setField, setAlertInfo, isOwnership, setCenterLicenseNumber, centerLicenseNumber, renewableLicenses, formEdit, values, getCentertDetails, showSummary, setShowSummary, isLoading, setIsEnableNextBtn }) => {

  useEffect(() => {
    setAlertInfo("")
    console.log(`values.centerLicenseNumber: ${values.centerLicenseNumber}`)
    if (!!values.centerLicenseNumber && values.centerLicenseNumber !== 1) {
      setIsEnableNextBtn(true);

    } else {
      setIsEnableNextBtn(false);
    }
    // setIsEnableNextBtn(false);

  }, []);
  console.log("======>values from final: " + JSON.stringify(values))
  console.log("======>valuesrenewableLicenses: " + JSON.stringify(renewableLicenses))


  return (
    <CardContent>
      {!isLoading ?
        <>
          <Grid
            container
            mt={4}
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
              className="custom-label-field"
            >
              <Field
                fullWidth
                label="اختيار الترخيص"
                name="centerLicenseNumber"
                component={Select}
                required
                dir="rtl"
                variant="outlined"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
                disabled={!Array.isArray(renewableLicenses) || !renewableLicenses.length || formEdit}
              >
                {!formEdit && renewableLicenses.map(item => (
                  <MenuItem key={item?.centerLicense_r?.LicenseNumber} value={item?.centerLicense_r?.LicenseNumber}>{item?.centerLicense_r?.LicenseNumber}</MenuItem>
                ))}
              </Field>
              <OnChange name="centerLicenseNumber">
                {async (value) => {
                  console.log(`onChangecenterLicenseNumber + ${value}`);
                  if (value != 1) {
                    await getCentertDetails(value);
                    setCenterLicenseNumber(value)
                    setIsEnableNextBtn(true)

                  }
                  else {
                    setCenterLicenseNumber(value)
                    setShowSummary(false);
                    setIsEnableNextBtn(false)

                  }
                }}
              </OnChange>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              className="custom-label-field"
            >
            </Grid>
          </Grid>
          {showSummary && <CenterSummary
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
            isOwnership={isOwnership}
            setIsEnableNextBtn={(isEnable) => setIsEnableNextBtn(isEnable)}

          />
          }
        </>
        :
        <CircularProgress size="15rem" style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto', color: '#E2E8EB'
        }} />
      }
    </CardContent>
  );
}
export default FinalLicenseData;
