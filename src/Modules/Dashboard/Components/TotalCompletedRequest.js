import {
  Avatar,
  Card,
  CardContent,
  Grid,
  colors,
  Typography
} from '@material-ui/core';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";


const TotalCompletedRequest = (props) => {
  const { loading = false, totalcompletedrequests = 0 } = props;
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
               {/* الطلبات المكتملة */}
               {trans('dashboard.total_completed_request')}
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }} />
            )}
            {loading ? (
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {totalcompletedrequests}
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={100} style={{ marginTop: 10 }} />
            )}
          </Grid>
          <Grid  md={4} item>
            {loading ? (
              <Avatar
                sx={{
                  backgroundColor: colors.green[600],
                  height: 56,
                  width: 56
                }}
              >
                <DoneOutlineOutlinedIcon />
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

export default TotalCompletedRequest;

TotalCompletedRequest.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalcompletedrequests: PropTypes.number.isRequired
};
