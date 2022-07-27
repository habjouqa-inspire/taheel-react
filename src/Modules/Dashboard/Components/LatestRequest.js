// import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import DoneIcon from '@material-ui/icons/Done';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import { REQUEST_STATUS } from 'src/Core/Utils/enums';
import { useTranslation } from "react-i18next";

/* const requests = [
  {
    id: uuid(),
    requestNum: 'CDD1049',
    amount: 30.5,
    centerName: 'Ekaterina Tankova',
    type: 'ترخيص مؤقت لمركز تأهيل أهلي',
    requestDate: '14/9/1442',
    status: '2'
  },
  {
    id: uuid(),
    requestNum: 'CDD1048',
    amount: 25.1,
    centerName: 'Cao Yu',
    type: 'ترخيص مؤقت لمركز تأهيل أهلي',
    requestDate: '14/9/1442',
    status: '-1'
  },
  {
    id: uuid(),
    requestNum: 'CDD1047',
    amount: 10.99,
    centerName: 'Alexa Richardson',
    type: 'ترخيص مؤقت لمركز تأهيل أهلي',
    requestDate: '14/9/1442',
    status: '-2'
  },
  {
    id: uuid(),
    requestNum: 'CDD1046',
    amount: 96.43,
    centerName: 'Anje Keizer',
    type: 'ترخيص مؤقت لمركز تأهيل أهلي',
    requestDate: '14/9/1442',
    status: '2'
  },
  {
    id: uuid(),
    requestNum: 'CDD1045',
    amount: 32.54,
    centerName: 'Clarke Gillebert',
    type: 'ترخيص مؤقت لمركز تأهيل أهلي',
    requestDate: '14/9/1442',
    status: '-1'
  },
  {
    id: uuid(),
    requestNum: 'CDD1044',
    amount: 16.76,
    centerName: 'Clarke Gillebert',
    type: 'ترخيص مؤقت لمركز تأهيل أهلي',
    requestDate: '14/9/1442',
    status: '-1'
  }
]; */
const getChipComponentsForStatus = (request) => {
  if (request.status === REQUEST_STATUS.COMPLETED) {
    return (
      <Chip
        label={request.statusName.statusNameReact}
        variant="outlined"
        size="medium"
        icon={<DoneIcon sx={{ color: '#43A047 !important' }} />}
        sx={{
          color: colors.green[600],
          borderColor: colors.green[600],
        }}
      />
    );
  }
  else if (request.status === REQUEST_STATUS.CANCELED || request.status === REQUEST_STATUS.REJECTED ) {
    return (
      <Chip
        label={request.statusName.statusNameReact}
        variant="outlined"
        size="medium"
        icon={<ErrorOutlineIcon sx={{ color: 'red !important' }} />}
        sx={{
          color: colors.red[600],
          borderColor: colors.red[600],
        }}
      />
    );
  }
  else if (request.status === REQUEST_STATUS.DRAFT) {
    return (
      <Chip
        label={request.statusName.statusNameReact}
        variant="outlined"
        size="medium"
        icon={<DraftsTwoToneIcon sx={{ color: 'grey !important' }} />}
        sx={{
          color: colors.grey[600],
          borderColor: colors.grey[600],
        }}
      />
    );
  }
  return (
    <Chip
      label={request.statusName.statusNameReact}
      variant="outlined"
      size="medium"
      icon={<HistoryOutlinedIcon sx={{ color: '#fb8c00 !important' }} />}
      sx={{
        color: colors.orange[600],
        borderColor: colors.orange[600],
      }}
    />
  );
};
const LatestRequests = (props) => {
  const navigate = useNavigate();
  const { loading = false, taheelRequests = [] } = props;
 // let taheelRequestsFilterd=taheelRequests.filter(t => t?.status != REQUEST_STATUS.DRAFT)
 taheelRequests.length = 5; //Number of displayed requests
 const [trans] = useTranslation('common');


  return (
    <Card>
      <CardHeader title={
        loading ? (
          // 'الطلبات المقدمة'
          trans('dashboard.latest_requests.submitted_request')
        ) : (
          <Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />
        )
      }
      />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800, minHeight: 400 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {loading ?
                  //  'رقم الطلب'
                  trans('dashboard.latest_requests.request_number')
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ? 
                  // 'اسم المركز'
                  trans('dashboard.latest_requests.center_name')
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ? 
                  // 'نوع الطلب'
                  trans('dashboard.latest_requests.request_type')
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell sortDirection="desc">
                  {loading ? (
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        {/* تاريخ الطلب */}
                        {trans('dashboard.latest_requests.request_date')}
                      </TableSortLabel>
                    </Tooltip>
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell>
                  {loading ? 
                  // 'حالة الطلب'
                  trans('dashboard.latest_requests.request_status')
                    : (
                      <Skeleton />
                    )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              //(!loading ? Array.from(new Array(6)) : taheelRequests).filter(t => t?.status != REQUEST_STATUS.DRAFT).map((request, index) => ( // remove filter (status REQUEST_STATUS.DRAFT) to show drafts  
                (!loading ? Array.from(new Array(5)) : taheelRequests).map((request, index) => (
                <TableRow
                  hover
                  key={request ? request.requestNum : index}
                >
                  <TableCell>
                    {request ? request.requestNum
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.centerName
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.type
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.requestDate
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? getChipComponentsForStatus(request) : (
                      <Skeleton />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        {
          loading ? (
            <Button
              color="primary"
              endIcon={<ArrowLeftIcon />}
              size="large"
              variant="text"
              onClick={() => navigate('/app/center-requests', { state: { taheelRequests } })}

            >
              {/* عرض جميع الطلبات */}
              {trans('dashboard.latest_requests.show_all_requests')}
            </Button>
          ) : (
            <Skeleton animation="wave" width="10%" />
          )
        }
      </Box>
    </Card>
  );
};

export default LatestRequests;

LatestRequests.propTypes = {
  loading: PropTypes.bool.isRequired,
  taheelRequests: PropTypes.array.isRequired
};
