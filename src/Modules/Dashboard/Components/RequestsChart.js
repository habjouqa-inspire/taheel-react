import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";


const RequestsChart = (props) => {
  const [trans] = useTranslation('common');
  const {
    loading = false,
    totalpendingrequests = 0,
    totalrejectedrequests = 0,
    totalcompletedrequests = 0,
    totaltahelrequests = 0
  } = props;
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [totalcompletedrequests, totalpendingrequests, totalrejectedrequests],
        backgroundColor: [
          colors.green[600],
          colors.orange[600],
          colors.red[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: [
    trans('dashboard.requests_chart.rejected_requests'),
    trans('dashboard.requests_chart.completed_request'),
    trans('dashboard.requests_chart.pending_request')

    ]
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title:
        // 'مكتمل'
        trans('dashboard.requests_chart.completed_request')
      ,
      value: totaltahelrequests !== 0 ? Math.round(((totalcompletedrequests / totaltahelrequests) * 100)) : 0,
      icon: DoneOutlineOutlinedIcon,
      color: colors.green[600]
    },
    {
      title:
        // 'قيد المراجعة'
        trans('dashboard.requests_chart.pending_request')
      ,
      value: totaltahelrequests !== 0 ? Math.round(((totalpendingrequests / totaltahelrequests) * 100)) : 0,
      icon: HistoryOutlinedIcon,
      color: colors.orange[600]
    },
    {
      title:
        // 'مرفوض'
        trans('dashboard.requests_chart.rejected_requests')
      ,
      value: totaltahelrequests !== 0 ? Math.round(((totalrejectedrequests / totaltahelrequests) * 100)) : 0,
      icon: ErrorOutlineIcon,
      color: colors.red[600]
    }
  ];

  return (
    <Card {...props}>
      <CardHeader
        title={
          loading ? (
            // 'تحليل الطلبات'
            trans('dashboard.requests_chart.requests_analysis')
          ) : (
            <Skeleton animation="wave" height={15} width="60%" style={{ marginBottom: 6 }} />
          )
        }
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          {loading ? (
            <Doughnut
              data={data}
              options={options}
            />
          ) : (
            <Skeleton
              animation="wave"
              variant="circle"
              height={290}
              width={290}
              style={{
                margin: '0 auto'
              }}
            />
          )}
        </Box>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2
            }}
          >
            {devices.map(({
              color,
              icon: Icon,
              title,
              value
            }) => (
              <Box
                key={title}
                sx={{
                  p: 1,
                  textAlign: 'center'
                }}
              >
                <Icon color="action" />
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  {title}
                </Typography>
                <Typography
                  style={{ color }}
                  variant="h2"
                >
                  {value}
                  %
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2
            }}
          >
            <Box>
              <Skeleton
                animation="wave"
                variant="rect"
                height={10}
                width={290}
                style={{
                  marginTop: 6
                }}
              />
              <Skeleton
                animation="wave"
                variant="rect"
                height={10}
                width={290}
                style={{
                  marginTop: 6
                }}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestsChart;

RequestsChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalpendingrequests: PropTypes.number.isRequired,
  totaltahelrequests: PropTypes.number.isRequired,
  totalcompletedrequests: PropTypes.number.isRequired,
  totalrejectedrequests: PropTypes.number.isRequired,
};
