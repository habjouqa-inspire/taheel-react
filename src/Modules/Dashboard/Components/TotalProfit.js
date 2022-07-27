import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import ReplayIcon from '@material-ui/icons/Replay';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

const TotalProfit = (props) => {
  const { loading = false, totalreturnrequests } = props;
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
                 الطلبات المرتجعة
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }} />
            )}
            {loading ? (
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {totalreturnrequests}
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={100} style={{ marginTop: 10 }} />
            )}
          </Grid>
          <Grid  md={4} item>
            {loading ? (
              <Avatar
                sx={{
                  backgroundColor: indigo[500],
                  height: 56,
                  width: 56
                }}
              >
                <ReplayIcon />
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

export default TotalProfit;

TotalProfit.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalreturnrequests: PropTypes.number
};
