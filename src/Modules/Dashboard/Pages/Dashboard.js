import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import TotalPendingRequest from '../Components/TotalPendingRequest';
import LatestRequests from '../Components/LatestRequest';
import TotalCenters from '../Components/TotalCenters';
import TotalCompletedRequest from '../Components/TotalCompletedRequest';
import TotalProfit from '../Components//TotalProfit';
import RequestsChart from '../Components/RequestsChart';
import { APIRequest } from 'src/Core/API/APIRequest';
import CentersTable from '../Components/CentersTable';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import MyTasksTable from '../Components/MyTasksTable';
import { getTaheelRequestsFun } from 'src/Modules/CenterServices/API/ServicesApi';

const Dashboard = () => {
  const { userType } = getCurrentUser();
  console.log('userType+++++++++++', userType);

  const getCentersFun = async (userEmail) => {
    const url = 'taheel-apis-records-getCenters-v2';
    const queryParams = { userEmail, startIndex: 1, batchSize: 5 };
    const response = await APIRequest({ url, queryParams });
    return response;
  };
  const getMyTasksFun = async (userEmail) => {
    const url = 'taheel-apis-utilities-GetGetExternalUserTasks-v2';
    const queryParams = { userEmail, taskStatus: 0 };
    const response = await APIRequest({ url, queryParams });
    return response;
  };
  const [loadingTaheelRequests, setLoadingTaheelRequests] = useState(false);
  const [loadingCenters, setLoadingCenters] = useState(false);


  const [taheelRequests, setTaheelRequests] = useState([]);
  const [centerRequests, setCenterRequests] = useState([]);
  const [totalPendingRequests, setTotalPendingRequests] = useState(0);
  const [totalCompletedRequests, setTotalCompletedRequests] = useState(0);
  const [totalRejectedRequests, setTotalRejectedRequests] = useState(0);
  const [totalTahelRequests, setTotalTahelRequests] = useState(0);
  const [totalReturnRequests, setTotalReturnRequests] = useState(0);
  const [totalCenters, setTotalCenters] = useState(0);
  const { email } = getCurrentUser();
  useEffect(async () => {

    const getTaheelRequestsRs = await getTaheelRequestsFun({ startIndex: 1, batchSize: 5, status: [1, 2, 3, 5], 是统计吗: true });
    let response = {};
    if (!getTaheelRequestsRs.isSuccessful) {
      setLoadingTaheelRequests(true);
      response = { isSuccessful: false, message: getTaheelRequestsRs.message };
    } else {
      const { requests, totalCount, totalAccepted, totalPending, totalRejected } = getTaheelRequestsRs.responseBody.data;
      console.log(JSON.stringify(requests));
      setTaheelRequests(requests);
      setTotalTahelRequests(totalCount);
      setTotalCompletedRequests(totalAccepted);
      setTotalRejectedRequests(totalRejected);
      setTotalPendingRequests(totalPending);
      setLoadingTaheelRequests(true)
    }

    return response;
  }, []);
  useEffect(async () => {
    let response = {};
    const getCentersRs = await getCentersFun(email);
    if (!getCentersRs.isSuccessful) {
      setLoadingCenters(true);
      response = { isSuccessful: false, message: getCentersRs.message };
    } else {
      const { Centers, totalCount } = getCentersRs.responseBody.data;
      setTotalCenters(totalCount);
      setCenterRequests(Centers);
      setLoadingCenters(true)
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              sm={12}
              xl={4}
              xs={12}
            >
              <TotalCenters loading={loadingCenters} totalcenters={totalCenters} />
            </Grid>
            <Grid
              item
              lg={4}
              sm={12}
              xl={4}
              xs={12}
            >
              <TotalCompletedRequest loading={loadingTaheelRequests} totalcompletedrequests={totalCompletedRequests} />
            </Grid>
            <Grid
              item
              lg={4}
              sm={12}
              xl={4}
              xs={12}
            >
              <TotalPendingRequest loading={loadingTaheelRequests} totalpendingrequests={totalPendingRequests} />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <LatestRequests loading={loadingTaheelRequests} taheelRequests={taheelRequests} />
            </Grid>
            <Grid
              item
              lg={4}
              md={12}
              xl={3}
              xs={12}
            >
              <RequestsChart
                sx={{ height: '100%' }}
                loading={loadingTaheelRequests}
                totalcompletedrequests={totalCompletedRequests}
                totalpendingrequests={totalPendingRequests}
                totalrejectedrequests={totalRejectedRequests}
                totaltahelrequests={totalTahelRequests}
              />
            </Grid>
            {userType === "2" &&
              <Grid
                item
                lg={12}
                md={12}
                xl={9}
                xs={12}
              >
                <CentersTable loading={loadingCenters} centerRequests={centerRequests} />
              </Grid>
            }
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
