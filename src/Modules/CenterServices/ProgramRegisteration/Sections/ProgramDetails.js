/* eslint-disable  */
import { Grid, MenuItem } from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import FileUploaderComp from '../../FinalLicense/Components/FileUploader';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { useEffect, useState } from 'react';
import { getCenters } from 'src/Modules/CenterManagement/API/CentersApi';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { OnChange } from 'react-final-form-listeners';

const ProgramDetails = ({
  values,
  setIsEnableNextBtn,
  setIsLoading,
  setField,
  centerDataa,
  programs,
  programFrom,
  targetedGroup,
  SetErrMessage,
  centerLicenseNumber,
  status
}) => {

  const setDocument = (name, docID, multipleFile) => {
    if (!multipleFile) setField(name, [docID]);
    else {
      multipleFileDocs.push(docID);
      setField(name, multipleFileDocs);
    }
  };

  useEffect(async () => {
    const { email } = getCurrentUser();
  }, []);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}></Grid>
        <Grid item md={6} xs={12} className="custom-label-field">
          <Field
            fullWidth
            required
            label="المركز"
            name="licenseNumber"
            component={Select}
            type="number"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            disabled={status === 1 || status === 2||status === 3  ? true : false}
            formControlProps={{ fullWidth: true }}
          >
            {centerLicenseNumber ? (
              <MenuItem value={centerLicenseNumber} key="1" selected={true}>
                {centerLicenseNumber}
              </MenuItem>
            ) : null}
            {centerDataa?.map((item) => (
              item?.type==='01'&& <MenuItem key={item.centerLicense_r.LicenseNumber} value={item.centerLicense_r.LicenseNumber}>
                {item.centerLicense_r.LicenseNumber}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <OnChange name="licenseNumber">
            {() => {
              if(values.licenseNumber.substring(0,4)==='0101'){
                const targetedGroupObj=targetedGroup.filter((v)=> v.ID==='01')
                setField('TargetedCategory',targetedGroupObj[0]?.name)
          
              console.log('Nnnnnnnnnnnnnnnnnnnnnnnnnnnnn ===> ', targetedGroupObj[0]?.name);
           
              }
            }}
          </OnChange>
        <Grid item md={6} xs={12} className="custom-label-field">
          <Field
            fullWidth
            required
            label="البرنامج"
            name="program"
            component={Select}
            type="number"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            formControlProps={{ fullWidth: true }}
            disabled={status === 2 ||status === 3 ? true : false}
          >
            {programs?.map((item, idx) => (
              <MenuItem key={item.id} value={idx}>
                {item.name}
              </MenuItem>
            ))}
          </Field>

          <OnChange name="program">
            {() => {
              setField(
                'registerationFees',
                programs[values.program].programFees
              );
              setField('program_r', programs[values.program].ID);
            }}
          </OnChange>
        </Grid>
        <Grid item md={6} xs={12} className="custom-label-field">
          <Field
            fullWidth
            required
            label=" رسوم التسجيل"
            name="registerationFees"
            component={TextFieldFinal}
            type="number"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            formControlProps={{ fullWidth: true }}
            disabled
          />
        </Grid>
        <Grid item md={6} xs={12} className="custom-label-field">
          <Field
            fullWidth
            required
            label="جهة البرنامج"
            name="programType"
            component={Select}
            type="number"
            variant="outlined"
            dir="rtl"
            className="custom-field"
            formControlProps={{ fullWidth: true }}
          >
            {programFrom?.map((item, idx) => (
              <MenuItem key={item.name} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item md={6} xs={12} className="custom-label-field">
          <Field
            fullWidth
            required
            label="إعتماد البرنامج"
            name="programAccredditation"
            component={FileUploaderComp}
            values={values}
            setField={setField}
            setDocument={setDocument}
            variant="outlined"
            dir="rtl"
            imgAndPdf = {true}
            className="custom-field"
            formControlProps={{ fullWidth: true }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProgramDetails;
ProgramDetails.propTypes = {
  setField: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};
