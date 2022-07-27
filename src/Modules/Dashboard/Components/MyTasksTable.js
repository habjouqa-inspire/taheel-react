// import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { LICENSE_FORM_TYPES } from 'src/Core/Utils/enums'

const MyTasksTable = (props) => {
  const navigate = useNavigate();
  const { loading = false, taskRequests = [] } = props;
  return (
    <Card>
      <CardHeader title={
        loading ? (
          'الطلبات المعادة'
        ) : (
          <Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />
        )
      }
      />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ height: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {loading ? 'اسم'
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ? 'رقم الرخصة'
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {(!loading ? Array.from(new Array(6)) : taskRequests).map((request, index) => (
                <TableRow
                  hover
                  key={request ? request.ID : index}
                >
                  <TableCell>
                    {request ? request.name
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.centerLicenseNumber
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request && (
                      <IconButton
                        color="primary"
                        component="span"
                        onClick={() => {
                          console.log("edit function");
                          navigate(request.type===4?'/center-services/transfercentersummary':'/center-services/editfinallicense', { state: { centerLicenseNumber: request.centerLicenseNumber, taskID: request.ID,requestNum:request.requestNum, formType: LICENSE_FORM_TYPES.EDIT } });
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default MyTasksTable;

MyTasksTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  taskRequests: PropTypes.array.isRequired
};