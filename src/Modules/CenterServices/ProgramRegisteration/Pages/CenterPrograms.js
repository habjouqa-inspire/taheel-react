import {
  Badge, Card,
  CardContent,
  CardHeader, CircularProgress, Container, Divider, Fab,
  Grid, Link, List,
  ListItem,
  ListItemText, Skeleton,
  Typography
} from '@material-ui/core';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AlertDialog from 'src/Core/Components/AlertDialog';
import IconsList from 'src/Core/SchemaBuilder/FieldsInputs/IconsList';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { getTaheelRequestsFun } from '../../API/ServicesApi';
import {
  EnableOrDisableProgram,
  getCenterPrograms
} from '../API/programRegisterationAPI';
const CenterPrograms = () => {
  const location = useLocation();
  const licenseNumber = location?.state?.licenseNumber;
  const isValid = location.state.isValid;
  // const licenseNumber = '0101020266' ;
  const [center, setCenter] = useState('');
  const [errMessage, SetErrMessage] = useState();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageTitle = 'تفاصيل البرامج';
  const tableTitle = location.state.CenterName;
  const navigateion = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentSelected, setCurrentSelected] = useState('');
  const [loadingStatus, setLoadingStatus] = useState('');
  const { email } = getCurrentUser();
  const [popup, setPopup] = useState(false);
  const [invPopup, setInvPopup] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [eligibleToAdd, setEligibleToAdd] = useState();
  const handleClickOpen = (data) => {
    setCurrentSelected(data);
    SetErrMessage('');
    setOpen(true);
  };
  const handleClose = () => {
    setCurrentSelected('');
    setLoadingStatus(false);
    setOpen(false);
    setPopup(false);
    setInvPopup(false)
  };
  const editPrograme = async () => {
    setLoadingStatus(currentSelected);
    let tempArr = [...programs];
    const res = await EnableOrDisableProgram(
      email,
      tempArr[currentSelected].ID,
      licenseNumber
    );

    if (!res.isSuccessful) {
      const response = { isSuccessful: false, message: res.message };
      setOpen(false);
      setLoadingStatus(false);
      setPopup(true);
      setDialogContent(JSON.stringify(response.message));
    } else {
      tempArr[currentSelected].isEnabeled =
        !tempArr[currentSelected].isEnabeled;
      setPrograms(tempArr);
      setOpen(false);
      setLoadingStatus(false);
      setPopup(true);
      tempArr[currentSelected].isEnabeled
        ? setDialogContent(
          `تم تفعيل ${tempArr[currentSelected].Programmas?.name} بنجاح`
        )
        : setDialogContent(
          `تم تعطيل ${tempArr[currentSelected].Programmas?.name} بنجاح`
        );
    }
  };
  useEffect(async () => {
    setInvPopup(isValid ? false : true)
    const centerData = await getCenterPrograms(licenseNumber);
    const runningrequests = await getTaheelRequestsFun({ licenseNumber: licenseNumber, status: [1, 5] })
    if (!runningrequests.isSuccessful) {
      console.log('error msg req', runningrequests);
      setEligibleToAdd(true)
      setLoading(false);
      const response = { isSuccessful: false, message: runningrequests.message };
      SetErrMessage(runningrequests.message);
    } else {
      if (runningrequests?.responseBody?.data?.totalCount > 0) {
        setEligibleToAdd(false)
      } else {
        setEligibleToAdd(true)
      }
      console.log('error msg req', runningrequests);

      setLoading(false);
    }
    if (!centerData.isSuccessful) {
      setLoading(false);
      const response = { isSuccessful: false, message: centerData.message };
      SetErrMessage(centerData.message);
    } else {
      setLoading(false);
      setPrograms(centerData.responseBody.data.map);
    }
  }, []);

  const Content = () => {
    return !loading ? (
      <List>
        <Grid container spacing={4}>
          {errMessage ?
            <>
              <AlertDialog
                open={invPopup}
                onClose={() => {
                  setInvPopup(false);
                }}
                dialogTitle="مركز غير فعال"
                dialogContent="صلاحية رخصة هذا المركز منتهية أو مقاربة على الإنتهاء , الرجاء تجديد الرخصة"
                buttons={{
                  rightBtn: { title: 'تم', func: handleClose }
                }}
              />
              <Grid item xs={8}>
                هذا المركز لا يحتوي على برامج
                <br />
                {!eligibleToAdd && isValid && <Typography>**لا يمكنك إضافة او تعديل برامج لأن هذا المركز لديه طلبات معلقة</Typography>}
                {eligibleToAdd && !isValid && <Typography>**لا يمكنك إضافة او تعديل برامج لأن رخصة المركز منتهية او قاربت على الإنتهاء</Typography>}
                {!eligibleToAdd && !isValid && <Typography>**لا يمكنك إضافة او تعديل برامج لأن هذا المركز لديه طلبات معلقة ورخصة المركز منتهية او قاربت على الإنتهاء</Typography>}

              </Grid>
            </>
            : <>
              {programs.map((centData, key) => (
                <>
                  <Grid item xs={8} sx={{ borderBottom: 1, borderColor: 'gray' }}>
                    <ListItem
                      sx={{
                        textAlign: 'right',
                        display: 'inline-block'
                      }}
                      key={key}
                    >
                      <ListItemText
                        primary={<h2>{centData?.Programmas?.name}</h2>}
                        secondary={
                          <React.Fragment>
                            <br />
                            <h4>أنشطة البرنامج</h4>
                            <br />
                            <Grid container spacing={2}>
                              {centData.activites.map((acc) => (
                                <Grid item xs={6} key={acc.id}>
                                  —{acc.Activitiyname}
                                </Grid>
                              ))}
                            </Grid>
                            <br />
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </Grid>

                  <Grid item xs={4} sx={{ borderBottom: 1, borderColor: 'gray' }}>
                    <Grid
                      container
                      alignContent="flex-start"
                      direction="row"
                      justifyContent="end"
                    >
                      <Grid>
                        <ListItem
                          button
                          onClick={() => handleClickOpen(key)}
                          disabled={loadingStatus === key || !isValid}
                        >
                          {loadingStatus === key ? (
                            <CircularProgress />
                          ) : (
                            <>
                              {' '}
                              {centData.isEnabeled ? (
                                <CheckBoxOutlinedIcon />
                              ) : (
                                <CheckBoxOutlineBlankOutlinedIcon />
                              )}
                            </>
                          )}
                        </ListItem>
                      </Grid>
                      <Grid>
                        <ListItem
                          button
                          disabled={!isValid && !eligibleToAdd}
                          onClick={() => {
                            navigateion('/center-services/UpdateProgram', {
                              state: {
                                licenseNumber: licenseNumber,
                                programID: centData.ID,
                                status: 2
                              }
                            })
                          }}
                        >
                          <EditIcon />
                        </ListItem>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ))}
            </>
          }
        </Grid>
      </List>
    ) : (
      <Skeleton />
    );
  };

  return (
    <Container>
      <AlertDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        dialogTitle="تغيير حالة البرنامج"
        dialogContent="هل أنت متأكد أنك تريد تغيير حالة البرنامج ؟"
        buttons={{
          leftBtn: {
            title: 'نعم',
            func: () => {
              setOpen(false);
              return editPrograme();
            }
          },
          rightBtn: { title: 'لا', func: handleClose }
        }}
      />

      <AlertDialog
        open={popup}
        onClose={() => {
          setOpen(false);
        }}
        dialogTitle="تغيير حالة البرنامج"
        dialogContent={dialogContent}
        buttons={{
          rightBtn: { title: 'تم', func: handleClose }
        }}
      />
      <Card style={{ padding: "20px", minHeight: "100%" }}>
        <CardHeader title={<Grid container spacing={4}>
          <Grid item>
            <Badge
              badgeContent={
                < Fab size="small" color="primary" aria-label="add" onClick={() => navigateion('/center-services/programRegisteration')}>
                  <IconsList iconType={IconsTypeEnum.ARROW_FORWARD_ICON} color="info" />
                </Fab>}
              onClick={() =>
                navigateion('/center-services/programRegisteration')
              }
            >
            </Badge>
          </Grid>
          <Grid item><p style={{ fontWeight: "bold" }} >{pageTitle} </p> </Grid>
        </Grid>
        } />
        <Divider />
        {!loading ? (
          <Grid container sx={{ padding: 2 }}>
            <Grid item xl={7} xs={7} alignItems="end">
              <h2>{tableTitle}</h2>
            </Grid>
            <Grid item xs={5} justifyContent="flex-end">
              {(isValid && eligibleToAdd) && <Grid
                container
                direction="row"
                spacing={1}
                justifyContent="flex-end"
              >
                <Grid item style={{ fontWeight: 'bold' }}>
                  <Link
                    component="button"
                    variant="body2"
                    fontWeight="bold"
                    fontSize="large"
                    disabled={!isValid}
                    onClick={() =>
                      navigateion('/center-services/UpdateProgram', {
                        state: {
                          licenseNumber: licenseNumber,
                          status: 1
                        }
                      })
                    }
                  >
                    إضافة برنامج
                  </Link>
                </Grid>
                <Grid item>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"


                    onClick={() =>
                      navigateion('/center-services/UpdateProgram', {
                        state: {
                          licenseNumber: licenseNumber,
                          status: 1
                        }
                      })
                    }
                  >
                    <IconsList iconType={IconsTypeEnum.ADD_ICON} color="info" />
                  </Fab>
                </Grid>
              </Grid>}
            </Grid>
          </Grid>
        ) : (
          <CardContent>
            <Skeleton />
          </CardContent>
        )}
        <Divider />
        <CardContent>
          <Content />
        </CardContent>
      </Card>
    </Container>
  );
};

export default CenterPrograms;
