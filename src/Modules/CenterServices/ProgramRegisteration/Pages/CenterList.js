import { Fab, Grid, Link } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import IconsList from 'src/Core/SchemaBuilder/FieldsInputs/IconsList';
import TableCreator from 'src/Core/SchemaBuilder/TableCreator';
import IconsTypeEnum from 'src/Core/SchemaBuilder/Utils/IconsTypeEnum';
import TableDataViewEnum from 'src/Core/SchemaBuilder/Utils/TableDataViewEnum';
import { TablePaginationObject } from 'src/Core/SchemaBuilder/Utils/TablePagination';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { getCentersAPI } from '../../API/ServicesApi';
import { getCentersForRegisteration } from '../API/programRegisterationAPI';
import CrewSchema, { SchemaActions } from '../Schema/programRegisterationTabelSchema';

const CenterList = () => {
  const navigateion = useNavigate();
  const [center, setCenters] = useState([]);
  const [errMessage, SetErrMessage] = useState();
  const [loading, setLoading] = useState(true);
  const TPObject = TablePaginationObject(TableDataViewEnum.ALL_DATA);
  const [open, setOpen] = useState(false);
  const [currentSelected, setCurrentSelected] = useState('');
  const tableTitle = 'جدول المراكز';
  const pageTitle = 'إدارة التسجيل في البرامج المعتمدة';
  const tableAction = () => {
    return center?.length > 0 ? (
      <Grid container direction="row" spacing={1}>
        <Grid item style={{ fontWeight: 'bold' }}>
          <Link
            component="button"
            variant="body2"
            fontWeight="bold"
            fontSize="large"
            onClick={() => navigateion('/center-services/UpdateProgram')}
          >
            إضافة برنامج
          </Link>
        </Grid>
        <Grid item>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={() => navigateion('/center-services/UpdateProgram')}


          >
            <IconsList iconType={IconsTypeEnum.ADD_ICON} color="info" />
          </Fab>
        </Grid>
      </Grid>
    ) : (
      ''
    );
  };
  const handleClickOpen = (data) => {
    setCurrentSelected(data);
    SetErrMessage('');
    setOpen(true);
  };
  useEffect(async () => {
    const { email } = getCurrentUser();
    const getProgramCount = true;
    const licenseType='2'
    const centers = await getCentersAPI({
      licenseType,
      getProgramCount
    });
    if (!centers.isSuccessful) {
      setLoading(false);
      const response = { isSuccessful: false, message: centers.message };
      SetErrMessage(centers.message);
      return response;
    } else {
      const centerData = centers;
      console.log('dayCareProgram::getCenters::', centers);
      const dayCareCenters = centers.responseBody.data.Centers.filter((item) => item.type === '01')
      setCenters(dayCareCenters);
      setLoading(false);
    }
  }, []);
  return (
    <>
      <TableCreator
        pageTitle={pageTitle}
        tableTitle={tableTitle}
        navBackUrl={{ url: '/app/center-services-list' }}
        tableShcema={{ ...CrewSchema, ...SchemaActions() }}
        dataTable={center}
        loading={loading}
        otherFunc={handleClickOpen}
        SetErrMessage={SetErrMessage}
        action={tableAction()}
        errMessage={errMessage}
      />
    </>
  );
};
export default CenterList;
