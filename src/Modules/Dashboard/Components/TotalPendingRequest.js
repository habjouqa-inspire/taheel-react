import {
  Avatar,
  Card,
  CardContent,
  Grid,
  colors,
  Typography
} from '@material-ui/core';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";


const TotalPendingRequest = (props) => {
  const { loading = false, totalpendingrequests } = props;
  const [trans] = useTranslation('common');
  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid  md={8} item>
            {loading ? (
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h5"
              >
               {/* الطلبات قيد المراجعة */}
               {trans('dashboard.total_pending_request')}
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }} />
            )}
            {loading ? (
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {totalpendingrequests}
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={100} style={{ marginTop: 10 }} />
            )}
          </Grid>
          <Grid  md={4} item>
            {loading ? (
              <Avatar
                sx={{
                  backgroundColor: colors.orange[600],
                  height: 56,
                  width: 56
                }}
              >
                <HistoryOutlinedIcon />
              </Avatar>
            ) : (
              <Skeleton animation="wave" variant="circle" height={56} width={56} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalPendingRequest;

TotalPendingRequest.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalpendingrequests: PropTypes.number.isRequired
};
