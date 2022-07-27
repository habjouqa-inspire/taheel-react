import {
  Alert, Card,
  CardContent,
  CardHeader, Chip, CircularProgress, Container, Divider, Grid, MenuItem
} from '@material-ui/core';
import { Select } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { useLocation, useNavigate } from 'react-router';
import AlertDialog from 'src/Core/Components/AlertDialog';
import Multiselect from 'src/Core/Components/Multiselect';
import FinalFromWizard from 'src/Core/Components/wizard/FinalFormWizard';
import { OWNER_TYPE } from 'src/Core/Utils/enums';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { getRequestDetails, validateCitizenFunc } from '../../API/ServicesApi';
import { getLookups } from '../API/temporayLicenseAPI';
import tempLicenseFieldSchema from '../Schema/tempLicenseFieldSchema';
import {
  getBirthdayOld,
  sectionValidateInput
} from '../Utils/temporayLicenseUtil';
import './styles.css';

const CreateTempLicenseLandingPage = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const navigate = useNavigate();
  const [center, setCenter] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fromDraft,setFromDraft] = useState();

  const [errMessage, setErrMessage] = useState('');
  const [initialValues, setInitialValues] = useState(
    location.state?.backValues
  );
  const requestNum = location.state?.requestNum;
  const {
    email,
    idNumIqamaNum,
    gender,
    DOB,
    phoneNumber,
    firstName,
    lastName
  } = getCurrentUser();
  const [renderedValues, setRenderedValues] = useState();

  console.log('requestNumrequestNum === > ', requestNum);
  useEffect(async () => {
    const res = await getLookups(1);
    if (res.isSuccessful) {
      setCenter(res.responseBody.data.lookup.Center_Types_Tree.content);
    }
    if (!!requestNum) {
      const getReqDetails = await getRequestDetails(requestNum);
      if (!getReqDetails.isSuccessful) {
        setErrMessage(getReqDetails.message);
      } else {
        let details = getReqDetails.responseBody.requestDetails.data;
        console.log('detailsdetailsdetails => ', details);
        setFromDraft(details?.draft_values?.isDraft)
        if (details.draft_values.isDraft) {
          setInitialValues((preValue) => {
            preValue = { ...details.draft_values.draft_values };
            delete preValue.agree;
            delete preValue.isDraft;
            return preValue;
          });
        }
      }
    }
    setIsLoading(false);
  }, []);

  const onSubmit = async (values) => {
    setErrMessage('');
    //Validate Citizen
    const response = {
      isSuccessful: true,
      message: ''
    };
    if (values.requestType === OWNER_TYPE.NATURAL_TYPE) {
      const checkIfWorksInPrivateSector=values.centerType === '08'&&values.targetedBenificiray === '11';//اذا كان ضيافة اطفال منزلية
      
      ;
      const validateCitzen = await validateCitizenFunc({ idNumber: idNumIqamaNum, birthDate: DOB,checkIfWorksInPrivateSector });
      if (!validateCitzen.isSuccessful) {
        const response = {
          isSuccessful: false,
          message: validateCitzen.message
        };
        setErrMessage(response.message);
        return response;
      }else{
        console.log('noooooooooooor ',validateCitzen);
        values.ownerIDExpireDate=validateCitzen?.responseBody?.data?.idExpirationDate
      }
    }
    //check if applicant is saudi
    if (idNumIqamaNum.charAt(0) != '1' && values.requestType === OWNER_TYPE.NATURAL_TYPE) {
      setErrMessage(
        'تشير سجلاتنا أن صاحب الهوية غير سعودي/سعودية الجنسية'
      );
      return response; //{ requestType: "يجب أن يكون مقدم الطلب سعودي الجنسية" } //'عذراً, لا يمكنك التقديم على هذه الخدمة ,حيث تشير سجلاتنا أنك لست سعودي الجنسية
    }
    //check if applicant woman
    if (
      values.requestType === OWNER_TYPE.NATURAL_TYPE &&
      values.centerType === '08' &&
      values.targetedBenificiray === '11' &&
      values.gender !== 'f'
    ) {
      setErrMessage(
        'عذراً, لا يمكنك التقديم على هذه الخدمة ,حيث تشير سجلاتنا أن المتقدم ليست امرأة'
      );
      return response;
    }
    //check age
    if (getBirthdayOld(DOB) < 20) {
      setErrMessage(
        'عذراً, لا يمكنك التقديم على هذه الخدمة حيث تشير سجلاتنا أن المتقدم يقل عمره عن ثمانية عشرة (18) سنة'
      );
      return response;
    }
    if (values.centerType === '08' && values.targetedBenificiray === '11') {
      if (getBirthdayOld(DOB) < 25) {
        setErrMessage(
          'عذراً, لا يمكنك التقديم على هذه الخدمة حيث تشير سجلاتنا أن المتقدم يقل عمره عن خمسة و عشرون (25) سنة'
        );
        return response;
      }
      //check owner type
      if (values.requestType === OWNER_TYPE.LEGAL_TYPE) {
        setErrMessage(
          'عذراً, يجب أن تكون صفة المالك طبيعية للتقديم على هذه الخدمة'
        );
        return response;
      }
    }
    if (values.centerType === '03') {
      if (
        values.targetedBenificiray === '02' || //نادي اجتماعي
        values.targetedBenificiray === '03' || //رعاية يومية
        values.targetedBenificiray === '12' //نادي ورعاية يومية
      ) {
        values.workingHours = '6-12';
      } else if (
        values.targetedBenificiray === '04' || //اقامة مؤقنة
        values.targetedBenificiray === '05' || //اقامة دائمة
        values.targetedBenificiray === '13' //مؤقتة ودائمة
      ) {
        values.workingHours = 'allDay';
      }
    }
    //goto service
    navigate('/center-services/templicenseCont', {
      state: { values:values, center: center,fromDraft:fromDraft }
    });
    return response;
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader title="إصدار موافقة مبدئية لمركز أهلي" />
        <Divider />
        {errMessage && (
          <Alert
            variant="outlined"
            severity={!!errMessage.type ? errMessage.alertype : 'error'}
          >
            {!!errMessage.msg ? errMessage.msg : errMessage}
          </Alert>
        )}
        <CardContent>
          {!isLoading ? (
            <FinalFromWizard
              initialValues={{
                ...initialValues,
                gender: gender,
                fromDraft:fromDraft,
                lastPageErrorHandling: false,
                requestNum: requestNum || initialValues?.requestNum
              }}
              cancelBtnFn={() => { navigate('/app/center-requests', { replace: true }); }}
              onSubmit={onSubmit}
              email={email}
              finalBtnTitle="التالي"
              // isEnableEndBtn={true}
            >
              <TempLandingPage
                errMessage={errMessage}
                center={center}
                setRenderedValues={(values) => setRenderedValues(values)}
                label={`إصدار ترخيص مبدئي لمركز أهلي`}
                validate={(values) =>
                  sectionValidateInput(
                    tempLicenseFieldSchema,
                    'CenterInfo',
                    values
                  )
                }
              />
            </FinalFromWizard>
          ) : (
            <CircularProgress
              size="15rem"
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                color: '#E2E8EB'
              }}
            />
          )}
        </CardContent>
      </Card>
      <AlertDialog
        dialogContent={dialogContent}
        dialogTitle={dialogTitle}
        open={open}
        onClose={handleClose}
        acceptBtnName="تم"
      />
    </Container >
  );
};
const TempLandingPage = ({ errMessage, center, values, setRenderedValues }) => {
  return (
    <>
      <Grid container spacing={3} mt={3}>
        <Grid item md={6} xs={12} className="custom-label-field">
          <Field
            fullWidth
            label="صفة المالك*"
            name="requestType"
            component={Select}
            required
            dir="rtl"
            variant="outlined"
            className="custom-field"
            formControlProps={{ fullWidth: true }}
          >
            <MenuItem value={OWNER_TYPE.NATURAL_TYPE} selected>
              صفة طبيعية
            </MenuItem>
            <MenuItem value={OWNER_TYPE.LEGAL_TYPE} >صفة اعتبارية</MenuItem>
          </Field>
        </Grid>
        <Grid item md={6} xs={12} className="custom-label-field">
          <Field
            fullWidth
            label="فئة المركز*"
            name="centerType"
            component={Select}
            required
            dir="rtl"
            variant="outlined"
            className="custom-field"
            formControlProps={{ fullWidth: true }}
          >
            {center?.map((item, key) => (
              <MenuItem key={key} value={item.ID}>
                {item.name}
              </MenuItem>
            ))}
          </Field>
          <OnChange name="centerType">
            {(value) => {
              values.targetedServices = '';
              values.targetedBenificiray = '';
              values.centerType = value;
              setRenderedValues({ ...values, centerType: value });
            }}
          </OnChange>
        </Grid>
        <TargetedBenificiraySelectInput
          values={values}
          center={center}
          setRenderedValues={(values) => setRenderedValues(values)}
        />
        <TargetedServicesSelectInput
          values={values}
          center={center}
          setRenderedValues={(values) => setRenderedValues(values)}
        />
      </Grid>
    </>
  );
};
const TargetedServicesSelectInput = ({ values, center, setRenderedValues }) => {
  const targetedBenificiray = values.targetedBenificiray;
  const centerType = values.centerType;

  if (targetedBenificiray != undefined && centerType != undefined) {
    const centerList = center.find((center) => center.ID === centerType);
    const targetedBenificirayList = centerList?.targetedBenificiray?.find(
      (center) => center.ID === targetedBenificiray
    );
    const targetedServices = targetedBenificirayList
      ? targetedBenificirayList.targetedServices
      : [];
    if (targetedServices.length != 0) {
      if (!targetedBenificirayList?.isMultiple) {
        return (
          <Grid item md={6} xs={12} className="custom-label-field">
            <Field
              fullWidth
              label="اختصاص المركز*"
              name="targetedServices"
              component={Select}
              required
              dir="rtl"
              variant="outlined"
              className="custom-field"
              formControlProps={{ fullWidth: true }}
            >
              {targetedServices.map((item, key) => (
                <MenuItem key={key} value={item.ID}>
                  {item.name}
                </MenuItem>
              ))}
            </Field>
          </Grid>
        );
      } else {
        return (
          <Grid item md={6} xs={12} className="custom-label-field">
            <Field
              labelname="إختصاص المركز*"
              name="targetedServices"
              styling="field"
              component={Multiselect}
              variant="outlined"
              className="custom-field"
              formControlProps={{ fullWidth: true }}
              renderValue={(selected) => (
                <div className="multi-select-chips">
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={targetedServices.find((i) => i.ID === value)?.name}
                    />
                  ))}
                </div>
              )}
            >
              {targetedServices.map((item, key) => (
                <MenuItem key={key} value={item.ID}>
                  {item.name}
                </MenuItem>
              ))}
            </Field>
          </Grid>
        );
      }
    } else return null;
  } else return null;
};

const TargetedBenificiraySelectInput = ({
  values,
  center,
  setRenderedValues
}) => {
  console.log(
    '--CreateTempLicenseLandingPage::targetedBenificiraySelectInput:: start'
  );
  const [targetedBenificiraies, setTargetedBenificiraies] = useState([]);
  const centerType = values.centerType;
  console.log(
    '--CreateTempLicenseLandingPage::targetedBenificiraySelectInput:: centerType',
    centerType
  );

  const res = center.find((center) => center.ID === centerType);
  const [hideField, setHideField] = useState(false);
  useEffect(() => {
    const data = res ? res.targetedBenificiray : [];
    console.log('pre', targetedBenificiraies);
    if (data[0]?.isMultiple) {
      setHideField(true);
      values.targetedBenificiray = data[0].ID;
    } else setHideField(false);
    setTargetedBenificiraies(data);
    console.log('post', targetedBenificiraies);
  }, [values.centerType]);
  console.log('targetedBenificiraies ', targetedBenificiraies);

  if (hideField) return null;
  if (targetedBenificiraies.length === 0) return null;
  return (
    <Grid item md={6} xs={12} className="custom-label-field">
      <Field
        fullWidth
        label="نوع المركز*"
        name="targetedBenificiray"
        component={Select}
        required
        dir="rtl"
        variant="outlined"
        className="custom-field"
        formControlProps={{ fullWidth: true }}
      >
        {targetedBenificiraies.map((item, key) => (
          <MenuItem key={key} value={item.ID}>
            {item.name}
          </MenuItem>
        ))}
      </Field>
      <OnChange name="targetedBenificiray">
        {(value) => {
          if (values.centerType === '08') {
            if (values.targetedBenificiray === '09') {
              values.ageGroup = 'حديثي الولادة -6 سنوات';
            } else if (values.targetedBenificiray === '10') {
              values.ageGroup = 'حديثي الولادة - 10 سنوات';
            }
          }
          values.targetedServices = '';
          setRenderedValues({ ...values, targetedBenificiray: value });
        }}
      </OnChange>
    </Grid>
  );
};
export default CreateTempLicenseLandingPage;

TargetedBenificiraySelectInput.propTypes = {
  errMessage: PropTypes.func.isRequired,
  center: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
  setRenderedValues: PropTypes.func
};

TempLandingPage.propTypes = {
  errMessage: PropTypes.func.isRequired,
  center: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
  setRenderedValues: PropTypes.func
};
