/* eslint-disable no-unused-vars */
import {
  Grid,
  RadioGroup,
  MenuItem,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Typography
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import {
  Radio,
  TextField as TextFieldFinal,
  Select
} from 'final-form-material-ui';
import { useEffect, useState } from 'react';
import { OnChange } from 'react-final-form-listeners';
const genderLookup = [
  {
    name: 'ذكور',
    value: 'm'
  },
  {
    name: 'إناث',
    value: 'f'
  },
  {
    name: 'ذكور و إناث',
    value: 'b'
  }
];
const ageGroupLookup = [
  {
    name: '2-12'
  },
  {
    name: '13-18'
  },
  {
    name: '19-45'
  }
];
const workingHours = [
  {
    value: 'morning',
    name: 'صباحي',
    forEldery: false
  },
  {
    value: 'evening',
    name: 'مسائي',
    forEldery: false
  },
  {
    value: 'both',
    name: 'كلا الفترتين',
    forEldery: false
  },
  {
    value: '6-12',
    name: 'السادسة صباحاً حتى العاشرة مساءً',
    forEldery: true
  },
  {
    value: 'allDay',
    name: 'طوال أيام الأسبوع',
    forEldery: true
  }
];

const CenterDetails = ({ Condition, values, setField, setIsEnableNextBtn }) => {
  const [gender, setGender] = useState(genderLookup);

  const FilteredWorkingHours =
    values.centerType === '03'
      ? workingHours
      : workingHours.filter((i) => !i.forEldery);

  const [disableDropDown, setDisableDropDown] = useState(false);
  const [load, setload] = useState(false);
  setIsEnableNextBtn(true);
  useEffect(() => {
    {
      setload(true);
      if (values.centerType === '03') {
        if (
          values.targetedBenificiray === '02' || //نادي اجتماعي
          values.targetedBenificiray === '03' || //رعاية يومية
          values.targetedBenificiray === '12' //نادي ورعاية يومية
        ) {
          setDisableDropDown(true);
          setload(false);
        } else if (
          values.targetedBenificiray === '04' || //اقامة مؤقنة
          values.targetedBenificiray === '05' || //اقامة دائمة
          values.targetedBenificiray === '13' //مؤقتة ودائمة
        ) {
          setDisableDropDown(true);

          setload(false);
        }
      } else {
        setload(false);
      }
    }
  }, []);
  return (
    <>
      {!load && (
        <Grid container spacing={3} mt={3}>
          <Condition when="centerType" is="01">
            <Grid item md={6} xs={12}>
              <Field
                fullWidth
                required
                label="الطاقة الاستيعابية المحتملة"
                name="centerCap"
                component={TextFieldFinal}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
              />
            </Grid>
          </Condition>

          <Condition when="centerType" is={['01', '08']}>
            <Grid item md={6} xs={12} className="custom-label-field">
              <Field
                fullWidth
                required
                label="الفئة العمرية"
                name="ageGroup"
                component={Select}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
              >
                {ageGroupLookup?.map((item, idx) => (
                  <MenuItem key={idx} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Field>
              <OnChange name="ageGroup">
                {(values) => {
                  values !== '2-12'
                    ? setGender(
                        genderLookup.filter((vals) => vals.value !== 'b')
                      )
                    : setGender(genderLookup);
                }}
              </OnChange>
            </Grid>
          </Condition>

          <Condition when="centerType" is={['01', '03']}>
            <Grid item md={6} xs={12} className="custom-label-field">
              <Field
                fullWidth
                required
                label="جنس المستفيدين"
                name="targetedGender"
                component={Select}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
              >
                {gender?.map((item, idx) => (
                  <MenuItem key={idx} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
          </Condition>
          <Condition when="centerType" is={['01', '03', '08']}>
            <Grid item md={6} xs={12} className="custom-label-field">
              <Field
                fullWidth
                required
                label="فترة العمل "
                name="workingHours"
                component={Select}
                variant="outlined"
                dir="rtl"
                disabled={disableDropDown}
                className="custom-field"
                formControlProps={{ fullWidth: true }}
              >
                {FilteredWorkingHours?.map((item, idx) => (
                  <MenuItem key={idx} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
          </Condition>
        </Grid>
      )}
    </>
  );
};

export default CenterDetails;

CenterDetails.propTypes = {
  Condition: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  setField: PropTypes.func.isRequired,
  setIsEnableNextBtn: PropTypes.func.isRequired
};
