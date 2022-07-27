import {
  Button, Card, Grid,
  Paper, Skeleton, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AlertDialog from 'src/Core/Components/AlertDialog';
import FormDialog from 'src/Core/Components/FormDialog';
import IconsList from 'src/Core/SchemaBuilder/FieldsInputs/IconsList';
import PageViewer from 'src/Core/SchemaBuilder/PageViewer';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { downloadDocument } from '../../FinalLicense/API/finalLicenseAPI';
import {
  cancelProgRequest, getPrograms, GetRequestDetails
} from '../API/programRegisterationAPI';
import programRequestSchema from '../Schema/programRequestSchema';

const { default: FormCreator } = require('src/Core/SchemaBuilder/FormCreator');

const downloadFile = async (doc, name) => {
  console.log(`finalLicenseUtil :: downloadFile: ${doc}`);
  const downloadDoc = await downloadDocument(doc, true, name);
  if (downloadDoc.isSuccessful) {
  } else {
  }
};

const ProgramRequestSummary = () => {
  const location = useLocation();

  const [licenseNumber, setLicenseNumber] = useState(
    location.state?.licenseNumber
  );
  console.log('hereee1', location.state?.requestNum);
  console.log('hereee2', location.state?.licenseNumber);

  const requestNum = location.state?.requestNum;
  const [taskID, setTaskID] = useState(location.state?.taskID);
  const navigateion = useNavigate();
  const [dialogContent, setDialogContent] = useState('');
  const [btnsOptions, setBtnsOptions] = useState({});
  const [dialogTitle, setDialogTitle] = useState('');
  const [allPrograms, setAllPrograms] = useState([]);
  const [programData, setProgramData] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState([]);
  const [openDialog, setOPenDialog] = useState(false);
  const [docToDownload, setDocToDownload] = useState([]);
  const handleClickOpen = (data) => {
    setErrMessage('');
    setOpen(true);
  };
  const ActivityTable = () => {
    return (
      <>
        <FormDialog
          style={{ width: '50px', minHeight: '100%' }}
          openPopup={openDialog}
          title={'الملفات المرفوعة'}
          setOpenPopup={(i) => setOPenDialog(i)}
          onClose={() => setOPenDialog(false)}
          enableClose
        >
          <Typography variant={'h3'}></Typography>

          {(Array.isArray(docToDownload)
            ? [...docToDownload]
            : [docToDownload]
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
                      onClick={() => downloadFile(item.Document, item.Document)}
                    >
                      تنزيل
                    </Button>
                  </Grid>
                </Grid>
              </>
            );
          })}
        </FormDialog>
        <Card style={{ padding: '50px', minHeight: '100%' }}>
          <br />
          <Typography variant={'h3'}>الأنشطة</Typography>
          <br />
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>{loading ? <Skeleton /> : ' اسم النشاط'}  </TableCell>
                  <TableCell> {loading ? <Skeleton /> : ' وصف النشاط'}  </TableCell>

                  <TableCell> {loading ? <Skeleton /> : ' الفئة المستهدفة'}  </TableCell>
                  <TableCell> {loading ? <Skeleton /> : ' الجنس المستهدف'} </TableCell>

                  <TableCell>{loading ? <Skeleton /> : ' المرفقات'}  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details?.ProgramData?.centerOwnerActivities.map(
                  (item, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {loading ? <Skeleton /> : item.Activitiyname}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {loading ? <Skeleton /> : item.ActivityDesc}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {loading ? <Skeleton /> : item.targetedGroup}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {loading ? <Skeleton /> : item.targetedGender === 'm' ? 'ذكور' : 'إناث'}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {loading ? <Skeleton /> : <Button
                          fullWidth
                          startIcon={<CloudDownload />}
                          onClick={() => {
                            setOPenDialog(true);
                            setDocToDownload(item.attachActivityDocument);
                          }}
                        >
                          عرض الملفات
                        </Button>}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {!!taskID && (
            <Grid container spacing={2} mt={3} justifyContent="space-between">
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setBtnsOptions({
                      onClose: () => {
                        setOpen(false);
                      },
                      buttons: {
                        leftBtn: {
                          title: 'نعم',
                          func: () => {
                            setOpen(false);
                            onCancelTCRequest();
                          }
                        },
                        rightBtn: {
                          title: 'لا',
                          func: () => {
                            setOpen(false);
                          }
                        }
                      }
                    });
                    setDialogContent(
                      'هل أنت متأكد من إلغاء طلب تسجيل بالبرامج المعتمدة ؟ '
                    );
                    setDialogTitle('إلغاء طلب تسجيل بالبرامج المعتمدة');
                    setOpen(true);
                  }}
                >
                  <IconsList
                    iconType={IconsTypeEnum.DELETE_ICON}
                    label="إلغاء الطلب"
                    color="info"
                  />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: '#3c8084'
                  }}
                  onClick={() => {
                    navigateion('/center-services/UpdateProgram', {
                      state: {
                        licenseNumber: licenseNumber,
                        programID: details?.ProgramData?.centerMNprogram?.ID,
                        status: 3,
                        returnedRequest: true,
                        taskID: taskID,
                        programData: programData
                      }
                    });
                  }}
                >
                  <IconsList
                    iconType={IconsTypeEnum.EDIT_ICON}
                    label="تعديل بيانات تسجيل البرنامج"
                    color="info"
                  />
                </Button>
              </Grid>
            </Grid>
          )}
        </Card>
      </>
    );
  };
  const [details, setDetails] = useState(false);
  const [errMessage, setErrMessage] = useState();
  const [alertComment, setAlertComment] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { email } = getCurrentUser();
  useEffect(async () => {
    setLoading(true);

    const apiProgram = await getPrograms();

    const getReqDetails = await GetRequestDetails(requestNum, email);
    if (!getReqDetails.isSuccessful) {
      setLoading(false);

      setErrMessage(getReqDetails.message);
    } else {
      let Details = getReqDetails?.responseBody?.requestDetails?.data;
      if (!licenseNumber) {
        setLicenseNumber(Details?.center?.centerLicense_r?.LicenseNumber)
      }
      setAlertComment({
        msg: Details?.request?.comment,
        title: 'الملاحظات'
      });
      setTaskID(Details?.externalTaskData);
      console.log('Details+++++++++++++', JSON.stringify(Details));

      Details = {
        ProgramData: { ...Details?.processVariablesDump },
        comment: Details?.request?.comment
      };
      console.log('Details+++++++++++++', JSON.stringify(Details?.ProgramData));
      setDetails(Details);
      if (!apiProgram.isSuccessful) {
        setLoading(false);

        const response = { isSuccessful: false, message: centers.message };
      } else {
        const allProg =
          apiProgram?.responseBody?.data?.lookup?.Programmas_Type.content;

        const selProg = allProg.find((obj) => {
          return (
            obj.name + '' ===
            Details?.ProgramData?.centerMNprogram?.programNAME[0]
          );
        });
        setSelectedProgram(selProg);
        setAllPrograms(allProg);
        setProgramData({
          licenseNumber: licenseNumber,
          name: Details?.ProgramData?.centerMNprogram?.programNAME[0],
          programFee: Details?.ProgramData?.centerMNprogram?.programFee,
          programCategory_r:
            Details?.ProgramData?.centerMNprogram?.programCategory_r,
          accreditationDocument:
            Details?.ProgramData?.centerMNprogram?.accreditationDocument,
          Activities: Details?.ProgramData?.centerOwnerActivities
        });
        setLoading(false);
      }
    }
  }, []);

  async function onCancelTCRequest() {
    setLoading(true);
    const cancelRequest = await cancelProgRequest(taskID.ID, licenseNumber);
    if (!cancelRequest.isSuccessful) {
      setLoading(false);

      setErrMessage(cancelRequest.message);
      return { isSquccessful: false, message: cancelRequest.message };
    } else {
      setLoading(false);
      setBtnsOptions({
        acceptBtnName: 'تم',
        onClose: () => {
          navigateion('/app/center-requests');
        }
      });

      setDialogContent(
        `${cancelRequest.responseBody.data.message} ` + requestNum
      );
      setDialogTitle('');
      setOpen(true);

      console.log('navegate==========');
    }
    return { isSquccessful: true, message: 'تم الحذف بنجاح' };
  }
  return (
    <Paper>
      <Grid container spacing={2} mt={3} justifyContent="space-between">
        <Box sx={{ width: '100%' }}>
          <Grid item md={12}>
            <AlertDialog
              dialogContent={dialogContent}
              dialogTitle={dialogTitle}
              open={open}
              {...btnsOptions}
            />

            <PageViewer
              title={'التسجيل في البرامج المعتمدة'}
              //formType="view"
              isLoading={loading}
              schema={programRequestSchema}
              data={{
                licenseNumber: licenseNumber,
                name: selectedProgram?.name,
                programFee: selectedProgram?.programFees,
                desc: selectedProgram?.desc,
                programCategory_r:
                  details?.ProgramData?.centerMNprogram?.programCategory_r,

                accreditationDocument:
                  details?.ProgramData?.centerMNprogram?.accreditationDocument
              }}
              navBackUrl={{
                url: '/app/center-requests',
                state: { licenseNumber: licenseNumber }
              }}
              alertComment={alertComment}
              additionalFields={ActivityTable()}
            />
          </Grid>
          <Grid item md={12}></Grid>
        </Box>
      </Grid>
    </Paper>
  );
};
export default ProgramRequestSummary;
