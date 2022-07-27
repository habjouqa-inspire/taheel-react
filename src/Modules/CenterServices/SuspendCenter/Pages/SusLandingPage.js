import { Fab, Grid, Link } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AlertDialog from 'src/Core/Components/AlertDialog';
import IconsList from 'src/Core/SchemaBuilder/FieldsInputs/IconsList';
import TableCreator from 'src/Core/SchemaBuilder/TableCreator';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';
import { getCentersAPI, getTaheelRequestsFun } from '../../API/ServicesApi';
import LandingPageRequestSchema, { SchemaActions as SchemaActions2 } from '../schema/LandingPageRequestSchema';
import LandingPageSchema, { SchemaActions } from '../schema/LandingPageSchema';
import RequestTableFilters from '../Sections/RequestTableFilters';
const SusLandingPage = () => {
  const [tab, setTab] = useState('1');
  const tabValues = [
    { label: 'المراكز المعلقة', value: '1' },
    { label: 'طلبات تعليق العمل', value: '2' }
  ]
  const navigateion = useNavigate();
  const [center, setCenters] = useState([]);
  const [suspendedCenters, setSuspendedCenters] = useState([]);
  const [pendingCenters, setPendingCenters] = useState([]);
  const [errMessage, SetErrMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentSelected, setCurrentSelected] = useState('');
  const pageTitle = 'تعليق العمل في المراكز';
  const tableAction = () => {
    return loading ? <Grid item style={{ fontWeight: 'bold' }}>
      <Skeleton
        height='25px'
        width="150px" />

    </Grid> :
      <Grid container direction="row" spacing={1}>
        <Grid item style={{ fontWeight: 'bold' }}>
          <Link
            component="button"
            variant="body2"
            fontWeight="bold"
            fontSize="large"
            onClick={() => navigateion('/center-services/suspendcenter')}
          >
            تعليق العمل في مركز
          </Link>
        </Grid>
        <Grid item>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={() => navigateion('/center-services/suspendcenter')}


          >
            <IconsList iconType={IconsTypeEnum.ADD_ICON} color="info" />
          </Fab>
        </Grid>
      </Grid>

  };
  const handleClickOpen = (data) => {
    setCurrentSelected(data);
    SetErrMessage('');
    setOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handlePopupClick = (content) => {
    setDialogContent(content)
    setIsOpen(true);
  }
  const getRquest = async (reqType, status) => {
    setLoading(true);
    reqType = reqType || [15, 16, 17]
    const requests = await getTaheelRequestsFun({ startIndex: 1, requestTypeId: reqType, status });//get sus requests
    if (!requests.isSuccessful) {//check if there is an error while caling request api
      setLoading(false);
      const response = { isSuccessful: false, message: centers.message };
    }
    setPendingCenters(requests?.responseBody?.data?.requests?.filter((req) => req.typeId === 15 || req.typeId === 16 || req.typeId === 17)) //to get only suspend,extend and cancel suspend requests
    setLoading(false);

  }
  useEffect(async () => {
    setLoading(true);

    if (tab === '1') {
      const centers = await getCentersAPI({ licenseType: 2, isWorkSuspended: true }); //get final license centers
      if (!centers.isSuccessful) { //check if there is an error while caling center api
        setLoading(false);
        const response = { isSuccessful: false, message: centers.message };
      }
      setCenters(centers?.responseBody?.data?.Centers); //to get all centers
      setSuspendedCenters(centers?.responseBody?.data?.Centers)      //to get only sus centers
    }
    if (tab === '2') {
      await getRquest([15, 16], [1]);
    }
    setLoading(false);

  }, [tab]);


  return (
    <>
      <AlertDialog
        dialogContent={dialogContent}
        dialogTitle="الملاحظات"
        open={isOpen}
        onClose={handleClose}
        acceptBtnName="تم" />

      <TableCreator
        pageTitle={pageTitle}
        tableTitle={tab === '1' ? 'المراكز المعلقة' : 'طلبات تعليق العمل'}
        navBackUrl={{ url: '/app/center-services-list' }}
        tableShcema={
          tab === '1'
            ? { ...LandingPageSchema, ...SchemaActions() }
            : { ...LandingPageRequestSchema(), ...SchemaActions2({ handlePopupClick }) }} //check any schema to render
        dataTable={tab === '1' ? suspendedCenters : pendingCenters} //check any data to send
        tabValues={tabValues} //tabs object {المراكز المعلقة, المراكز تحت الإجراء}
        loading={loading}
        selectedTab={tab} //default 1
        setTab={(v) => setTab(v)}
        action={tableAction()}
        addtionalFieldTop={
          <>
            {tab === '2' &&
              < RequestTableFilters
                loading={loading}
                getRquest={(reqType, status) => getRquest(reqType, status)}
              />}
          </>}
        errMessage={errMessage}
      />
    </>
  );
}

export default SusLandingPage