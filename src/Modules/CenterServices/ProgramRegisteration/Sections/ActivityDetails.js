/* eslint-disable  */
import {
  Button,
  Grid,
  MenuItem,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tab,
  Dialog,
  Typography
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import FileUploaderComp from '../../FinalLicense/Components/FileUploader';
import { TextField as TextFieldFinal, Select } from 'final-form-material-ui';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import FormDialog from 'src/Core/Components/FormDialog';

import { Table } from 'react-bootstrap';
import { downloadDocument } from '../../FinalLicense/API/finalLicenseAPI';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { Box } from '@mui/system';
import { TabContext, TabList } from '@material-ui/lab';
import { HighlightOff } from '@material-ui/icons';
import { OnChange } from 'react-final-form-listeners';
import Popup from 'src/Core/Components/FormDialog';

const ActivityDetails = ({
  values,
  setField,
  programs,
  SetErrMessage,
  targetedGroup
}) => {
  const [resetAttachment, setResetAttachment] = useState(false);
  const [activitiesList, setActivities] = useState([]);
  const [openDialog, setOPenDialog] = useState(false);
  const [docToDownload, setDocToDownload] = useState(!!values?.attachActivityDocument ? values?.attachActivityDocument : []);
  const [loading, setLoading] = useState(false);
  const [act, setAct] = useState(values.activities);
  const [tab, setValue] = useState('1');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [targetedGroupObj,setTargetedGroupObj]=useState()
  const setFieldEmpty = () => {

    setField('activityAtt', '');
    setResetAttachment((prev) => !prev);
    setField('activityName', '');
    setField('activity', '');
    setField('activityAtt', '');
    setField('gender', 0);
    setField('ageGroup', 0);
    setField('activityDesc', '');
    setField('TargetedCategory', 0);

  };
  const attachmentArray = (attArr) => {
    const validArray = [];
   [].concat(values.activityAtt).map((docID) => {
        validArray.push({ Document: docID })
      }
      )
    return validArray;
  }
  const setDocument = (name, docID, multipleFile) => {
    if (!multipleFile) setField(name, [docID]);
    else {
      multipleFileDocs.push(docID);
      setField(name, multipleFileDocs);
    }
  };
  const downloadFile = async (doc, name) => {
    setLoading(true);

    console.log(`finalLicenseUtil :: downloadFile: ${doc}`);
    const downloadDoc = await downloadDocument(doc, true, name);
    if (downloadDoc.isSuccessful) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const handleRemoveActivity = (id) => {
    setAct((act) => {
      const newAct = act.filter((item, idx) => idx !== id);
      setField('activities', newAct);
      return newAct;
    });
  };
  const addCustomActivity = (id) => {
    if (values.activityName === '') {
      return SetErrMessage('يجب تعبئة حقل اسم النشاط');
    }

    if (!values.activityDesc) {
      return SetErrMessage('يجب تعبئة حقل وصف النشاط');
    }

    if (!values.TargetedCategory) {
      return SetErrMessage('يجب تعبئة حقل الفئة المستهدفة');
    }
    if (!values.gender) {
      return SetErrMessage('يجب تعبئة حقل الجنس');
    }
    if (!values.ageGroup) {
      return SetErrMessage('يجب تعبئة حقل الفئة العمرية');
    }
    if (!values.activityAtt) {
      return SetErrMessage('يجب تعبئة حقل مرفقات النشاط');
    }
    SetErrMessage('');

    setAct((act) => {
      const newAct = [
        ...act,
        {
          program_r: programs[values.program].ID,
          Activitiyname: values.activityName,
          ActivityDesc: values.activityDesc,
          targetedGroup: values.TargetedCategory,
          targetedGender: values.gender,
          targetedAgeGroup: values.ageGroup,
          attachActivityDocument: attachmentArray(values.activityAtt),
          isEnabled: true
        }
      ];
      setField('activities', newAct);
      console.log("newAct ===>",newAct)
      return newAct;
    });
    setFieldEmpty();
    console.log(
      'act=>' +
      JSON.stringify(act) +
      '\n values' +
      JSON.stringify(values.activities)
    );
  };
  const addActivity = () => {
    console.log(values.activity + 'sssssssssssssssssssssssssssssss');
    if (values.activity === '') {
      return SetErrMessage('يجب تعبئة حقل النشاط');
    }
    if (!values.activityAtt) {
      return SetErrMessage('يجب تعبئة حقل مرفقات النشاط');
    } else {
      SetErrMessage('');
      setAct((act) => {
        const newAct = [
          ...act,
          {
            program_r: programs[values.program].ID,
            Activitiyname: activitiesList[values.activity].Activitiyname,
            ActivityDesc: activitiesList[values.activity].ActivityDesc,
            targetedGroup: activitiesList[values.activity].targetedGroup,
            targetedGender: activitiesList[values.activity].targetedGender,
            targetedAgeGroup: activitiesList[values.activity].targetedAgeGroup,
            attachActivityDocument: attachmentArray(values.activityAtt),
            isEnabled: true
          }
        ];
        setActivities(
          activitiesList.filter(
            (item) =>
              item.Activitiyname !==
              activitiesList[values.activity].Activitiyname
          )
        );

        setField('activities', newAct);
        return newAct;
      });

      setFieldEmpty();

      console.log(
        'act=>' +
        JSON.stringify(act) +
        '\n values' +
        JSON.stringify(values.activities)
      );
    }
  };
  const handleChange = (event, newValue) => {
    setFieldEmpty();
    setValue(newValue);
    console.log(
      'act=>' +
      JSON.stringify(act) +
      '\n values' +
      JSON.stringify(values.activities)
    );
  };
  const gender = [
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
  useEffect(async () => {
    console.log('activity data::values',values);
     const targetedBenf=targetedGroup.filter((v)=> v.ID==='01')
     const filteredTargetedBenf=targetedBenf[0]?.targetedBenificiray?.filter((v)=>v.ID==='01')
     console.log('Nnnnnnnnnnnnnnnnnnnnnnnnnnnnn ===> ',filteredTargetedBenf[0]?.targetedServices?.map((item, idx) =>item.name=item.name.replaceAll('مراكز تأهيل','')));

     setTargetedGroupObj(filteredTargetedBenf[0]?.targetedServices?.map((item, idx) =>item.name=item.name.replaceAll('مراكز تأهيل','')))
    

    
    console.log('N ===> ', values.activities);
    console.log('N ===> ', programs[values.program]?.activity_r);

    if (values.activities.length > 0) {
      setField('agree', [true]);

      setActivities(
        programs[values.program]?.activity_r.filter(
          (item) =>
            !!!values.activities?.filter(
              (i) => i.Activitiyname === item.Activitiyname
            )[0]
        )
      );
    } else {
      setActivities(programs[values.program]?.activity_r);
      setField('agree', [false]);
    }
    const { email } = getCurrentUser();
    setField('activities', act);
  }, [act]);
  console.log("docToDownload docToDownload docToDownload ==> ", values)
  return (
    <>
      
      <Grid container spacing={0}>
        <Box sx={{ width: '100%' }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="نشاط مسجل مسبقا" value="1" />
                <Tab label="تسجيل نشاط جديد" value="2" />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        {tab === '1' && (
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} className="custom-label-field"></Grid>
            <Grid item md={12} xs={12} className="custom-label-field"></Grid>

            <Grid item md={6} xs={12} className="custom-label-field">
              <Field
                fullWidth
                required
                label="الأنشطة"
                name="activity"
                component={Select}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
              >
                {activitiesList?.map((item, idx) => (
                  <MenuItem key={item.id} value={idx}>
                    {item.Activitiyname}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid item md={6} xs={12} className="custom-label-field">
              <Field
                fullWidth
                required
                label="مرفقات النشاط"
                name="activityAtt"
                component={FileUploaderComp}
                setUploadLoading={(loading)=>{setUploadLoading(loading)}}
                multipleFile
                resetAttachment={resetAttachment}
                onChange={()=>console.log("memememe")}
                setField={setField}
                setDocument={setDocument}
                variant="outlined"
                values={values}
                imgAndPdf={true}
                dir="rtl"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
              />
            </Grid>
            <Grid item md={6} xs={12} className="custom-label-field">
              <Button
                variant="outlined"
                type="button"
                sx={{
                  height: 55,
                  backgroundColor: 'white',
                  width: '100%',
                  color: '#3c8084',
                  ':hover': {
                    backgroundColor: '#3c8084',
                    color: 'white'
                  }
                }}
                disabled={uploadLoading}
                onClick={(activity) => {
                  addActivity();
                }}
              >
                إضافة النشاط
              </Button>
            </Grid>
          </Grid>
        )}
        {tab === '2' && (
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} className="custom-label-field"></Grid>
            <Grid item md={12} xs={12} className="custom-label-field"></Grid>

            <Grid item md={6} xs={12}>
              <Field
                fullWidth
                required
                label="إسم النشاط"
                name="activityName"
                component={TextFieldFinal}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                fullWidth
                required
                label="وصف النشاط"
                name="activityDesc"
                component={TextFieldFinal}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
              />
            </Grid>
            <Grid item md={6} xs={12} className="custom-label-field">
              <Field
                fullWidth
                required
                label="الفئة المستهدفة"
                name="TargetedCategory"
                component={Select}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
              >
                <MenuItem value={0}>إختر قيمة</MenuItem>
                {targetedGroupObj?.map((item, idx) => (
                  <MenuItem key={idx} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid item md={6} xs={12} className="custom-label-field">
              <Field
                fullWidth
                required
                label="الجنس"
                name="gender"
                component={Select}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
              >
                <MenuItem value={0}>إختر قيمة</MenuItem>

                {gender?.map((item, idx) => (
                  <MenuItem key={item.idx} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
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
                <MenuItem value={0}>إختر قيمة</MenuItem>

                {ageGroupLookup?.map((item, idx) => (
                  <MenuItem key={idx} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid item md={6} xs={12} className="custom-label-field">
              <Field
                fullWidth
                required
                label="مرفقات النشاط"
                name="activityAtt"
                component={FileUploaderComp}
                setUploadLoading={(loading)=>{setUploadLoading(loading)}}
                setField={setField}
                setDocument={setDocument}
                multipleFile
                variant="outlined"
                imgAndPdf={true}
                resetAttachment={resetAttachment}
                values={values}
                dir="rtl"
                className="custom-field"
                formControlProps={{ fullWidth: true }}
              />
            </Grid>

            <Grid item md={6} xs={12} className="custom-label-field">
              <Button
                variant="outlined"
                type="button"
                sx={{
                  height: 55,
                  backgroundColor: 'white',
                  width: '100%',
                  color: '#3c8084',
                  ':hover': {
                    backgroundColor: '#3c8084',
                    color: 'white'
                  }
                }}
                disabled={uploadLoading}
                onClick={() => {
                  addCustomActivity();
                }}
              >
                إضافة النشاط
              </Button>
            </Grid>
          </Grid>
        )}
        {/* ************************************************************************************** */}

        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell> اسم النشاط </TableCell>
                <TableCell> وصف النشاط </TableCell>

                <TableCell> الفئة المستهدفة </TableCell>
                <TableCell> الجنس المستهدف</TableCell>

                <TableCell>المرفقات </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {act.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {item.Activitiyname}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.ActivityDesc}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.targetedGroup}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.targetedGender === 'm'?
                    'ذكور':item.targetedGender === 'f'?'إناث':'ذكور و إناث'}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      fullWidth
                      startIcon={<CloudDownload />}
                      onClick={() => {
                        setOPenDialog(true);
                        setDocToDownload(item.attachActivityDocument);
                      }}
                    >
                      عرض الملفات
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button
                      fullWidth
                      color="error"
                      startIcon={<HighlightOff />}
                      onClick={() => handleRemoveActivity(idx)}
                    >
                      {' '}
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />

        {!act.length > 0 &&
          '**يجب إضافة نشاط واحد على الأقل لتفعيل زر تقديم'}
      </Grid>

      <FormDialog
        openPopup={openDialog}
        title={'الملفات المرفوعة'}
        setOpenPopup={(i) => setOPenDialog(i)}
        onClose={() => setOPenDialog(false)}
        enableClose={true}
      >
        <Typography variant={'h3'}></Typography>

        {([].concat(docToDownload)
        ).map((item, idx) => {
          return (
            <>
              <Grid container>
                <Grid md={3}>
                  <Typography>الملف رقم {idx + 1}</Typography>
                </Grid>
                <Grid md={3}>
                  <Button
                    fullWidth
                    startIcon={<CloudDownload />}
                    onClick={() => downloadFile(item?.Document, item?.Document)}
                  >
                    تنزيل
                  </Button>
                </Grid>
              </Grid>
            </>
          );
        })}
      </FormDialog>
    </>
  );
};

export default ActivityDetails;
ActivityDetails.propTypes = {
  setField: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};
