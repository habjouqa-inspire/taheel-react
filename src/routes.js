/* eslint-disable */
import { CircularProgress } from '@material-ui/core';
import React, { Suspense } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import MainLayout from 'src/Core/Components/MainLayout';
import { LICENSE_FORM_TYPES } from 'src/Core/Utils/enums';
import NotFound from 'src/Modules/Public/NotFound';
import Login from 'src/Modules/UserAuthentication/Login/Pages/Login';
import OTPLogin from 'src/Modules/UserAuthentication/Login/Pages/LoginOtp';
import Register from 'src/Modules/UserAuthentication/Registration/Pages/Register';
import DashboardLayout from './Core/Components/DashboardLayout';
import { reIntilizeCommon } from './Core/Utils/TaheelUtils';
import { getAlignmentFlag } from './Core/Utils/UserLocalStorage';
import AlignmentCenterDetailsPage from './Modules/CenterServices/AlignmentCenters/Pages/AlignmentCenterDetailsPage';
import AlignmentCentersPage from './Modules/CenterServices/AlignmentCenters/Pages/AlignmentCentersPage';
import CancelFinalLicenseSummary from './Modules/CenterServices/CancelFinalLicense/sections/CancelFinalLicenseSummary';
import About from './Modules/Public/AboutUs';
import ComingSoon from './Modules/Public/ComingSoon';
import ContactUs from './Modules/Public/ContactUs';
import Faq from './Modules/Public/faq';
import Home from './Modules/Public/Home';
import Services from './Modules/Public/Services';
import Unauthorized from './Modules/Public/Unauthorized';
import ForgetPassword from './Modules/UserAuthentication/ForgetPassword/Pages/ForgetPassword';
import DownloadDoc from './Modules/UserAuthentication/Login/Pages/DownloadDoc';
const CenterRequests = React.lazy(() => import('./Modules/CenterRequests/Pages/CenterRequests'));
const Settings = React.lazy(() => import('src/Modules/Public/Settings/Pages/Settings'));
const ServicesList = React.lazy(() => import('./Modules/CenterServices/ServicesList/Pages/ServicesList'));
const Dashboard = React.lazy(() => import('src/Modules/Dashboard/Pages/Dashboard'));
const CommissionersManagement = React.lazy(() => import('./Modules/CenterManagement/Pages/CommissionersManagement'));
const AddCommissioner = React.lazy(() => import('./Modules/CenterManagement/Pages/AddCommissioner'));
const CentersDetails = React.lazy(() => import('./Modules/CenterManagement/Pages/CentersDetails'));
const Centers = React.lazy(() => import('./Modules/CenterManagement/Pages/Centers'));
const Account = React.lazy(() => import('src/Modules/Account/Pages/Account'));
const ProgramRequestSummary = React.lazy(() => import('./Modules/CenterServices/ProgramRegisteration/Pages/ProgamRequestSummary'));
const UpdateProgram = React.lazy(() => import('./Modules/CenterServices/ProgramRegisteration/Pages/UpdateProgramWizard'));
const CenterList = React.lazy(() => import('./Modules/CenterServices/ProgramRegisteration/Pages/CenterList'));
const TransferCenterLocationRequest = React.lazy(() => import('src/Modules/CenterServices/TransferCenterLocation/Pages/TransferCenterLocationRequest'));
const TransferCenterLocationLandingPage = React.lazy(() => import('./Modules/CenterServices/TransferCenterLocation/Pages/TransferCenterLocationLandingPage'));
const RenewalLicenseLandingPage = React.lazy(() => import('./Modules/CenterServices/FinalLicense/Pages/RenewalLicenseLanding'));
const CreatefinalLicense = React.lazy(() => import('src/Modules/CenterServices/FinalLicense/Pages/CreateFinalLicense'));
const FinalLicenseLandingPage = React.lazy(() => import('./Modules/CenterServices/FinalLicense/Pages/FinalLicenseLandingPage'));
const CreateTemporaryLicense = React.lazy(() => import('src/Modules/CenterServices/TemporaryLicense/Pages/CreateTemporaryLicense'));
const CreateTempLicenseLandingPage = React.lazy(() => import('src/Modules/CenterServices/TemporaryLicense/Pages/CreateTempLicenseLandingPage'));
const CancelInitialApprovalSummary = React.lazy(() => import('./Modules/CenterServices/CancelInitialApproval/Pages/CancelInitialApprovalSummary'));
const CancelInitialApproval = React.lazy(() => import('./Modules/CenterServices/CancelInitialApproval/Pages/CancelInitialApproval'));
const CancelFinalLicense = React.lazy(() => import('./Modules/CenterServices/CancelFinalLicense/Pages/CancelFinalLicense'));
const TransferCenterOwnershipSummary = React.lazy(() => import('./Modules/CenterServices/TransferCenterOwnership/Pages/TransferCenterOwnershipSummary'));
const TransferCenterOwnership = React.lazy(() => import('./Modules/CenterServices/TransferCenterOwnership/Pages/TransferCenterOwnership'));
const TransferNewOwnership = React.lazy(() => import('src/Modules/CenterServices/TransferCenterOwnership/Pages/TransferNewOwnership'));
const CenterPrograms = React.lazy(() => import('./Modules/CenterServices/ProgramRegisteration/Pages/CenterPrograms'));
const TransferCenterLocationSummary = React.lazy(() => import('src/Modules/CenterServices/TransferCenterLocation/Pages/TransferCenterLocationSummary'));
const StateFeeBearingProgramLandingPage = React.lazy(() => import('src/Modules/CenterServices/StateFeeBearingProgram/Pages/StateFeeBearingProgramLandingPage'));
const RegistrationInStateFeeBearingProgram = React.lazy(() => import('src/Modules/CenterServices/StateFeeBearingProgram/Pages/RegistrationInStateFeeBearingProgram'));
const CancelStateFeeBearingProgram = React.lazy(() => import('src/Modules/CenterServices/StateFeeBearingProgram/Pages/CancelStateFeeBearingProgramPage'));
const ViewStateFeeBearingProgram = React.lazy(() => import('src/Modules/CenterServices/StateFeeBearingProgram/Pages/ViewStateFeeBearingProgram'));
const SusLandingPage = React.lazy(() => import('./Modules/CenterServices/SuspendCenter/Pages/SusLandingPage'));
const SuspendCenter = React.lazy(() => import("./Modules/CenterServices/SuspendCenter/Pages/SuspendCenter"));
const SuspendRequestSummary = React.lazy(() => import("./Modules/CenterServices/SuspendCenter/Sections/SuspendRequestSummary"));
const CancelSuspend = React.lazy(() => import('./Modules/CenterServices/SuspendCenter/Sections/CancelSuspend'))


const routes = (isLoggedIn, userData) => {
  const USER_TYPES = {
    centerBeneficiary: '1',
    centerOwner: '2',
    all: '3'
  }
  const location = useLocation()
  const { userType } = userData;
  const navigate = useNavigate();
  let alignment = false
  if( getAlignmentFlag() == "true"){
    alignment = true
  }
  const navTo = alignment ? "/alignment/centers" : "/app/dashboard"
  function ComingSoonRoute({ children, AuthUsers }) {
    console.log('nooor, routes::authusers', userType, AuthUsers + '' === userType, userType === AuthUsers);
    return (
      userType === AuthUsers || AuthUsers === USER_TYPES.all
        ? children
        : <Navigate to={'/app/comingSoon'} />
    );
  }
  function UnauthorizedRoute({ children, AuthUsers }) {
    return (
      userType === AuthUsers||AuthUsers === USER_TYPES.all
        ? children
        : <Navigate to={'/app/Unauthorized'} />
    );
  }
  reIntilizeCommon()
  return (
    [
      {
        path: 'alignment',
        element: isLoggedIn !== "" ? (!alignment ? <Navigate to={navTo} /> : <DashboardLayout />) : <Navigate to="/login" />,
        children: [
          { path: 'centers', element: <AlignmentCentersPage /> },
          { path: 'center-details', element: <AlignmentCenterDetailsPage /> },
        ]
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: 'login', element: isLoggedIn === "" ? <Login /> : <Navigate to={navTo} /> },
          { path: 'otplogin', element: <OTPLogin /> },
          { path: 'downloadDoc', element: <DownloadDoc /> },
          { path: 'Home', element: <Home /> },
          { path: '/about', element: <About /> },
          { path: '/faq', element: <Faq /> },
          { path: '/services', element: <Services /> },
          { path: '/contactus', element: <ContactUs /> },
          { path: '/forgetpassword', element: <ForgetPassword /> },
          { path: 'register', element: isLoggedIn === "" ? <Register /> : <Navigate to={navTo} /> },

          { path: '404', element: <NotFound /> },
          {
            path: '/', element: isLoggedIn === "" ? <Navigate to="/home" /> : <Navigate to={navTo} />,
          },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      },
      {
        path: 'app',
        element: isLoggedIn !== "" ? (alignment ? <Navigate to={navTo} /> :
          <DashboardLayout />

        ) : <Navigate to="/login" />,
        children: [
          { path: '/ComingSoon', element: <ComingSoon /> },
          { path: '/Unauthorized', element: <Unauthorized /> },

          {
            path: 'account', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <ComingSoonRoute AuthUsers={USER_TYPES.all}>
                  <Account />
                </ComingSoonRoute>
              </Suspense>
          },
          {
            path: 'centers', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <ComingSoonRoute AuthUsers={USER_TYPES.centerOwner}>
                  <Centers />
                </ComingSoonRoute>
              </Suspense>
          },
          {
            path: 'centersDetails', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <ComingSoonRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CentersDetails />
                </ComingSoonRoute>
              </Suspense>
          },
          {
            path: 'AddCommissioner', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <ComingSoonRoute AuthUsers={USER_TYPES.centerOwner}>
                  <AddCommissioner />
                </ComingSoonRoute>
              </Suspense>
          },
          {
            path: 'CommissionersManagement', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <ComingSoonRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CommissionersManagement />
                </ComingSoonRoute>
              </Suspense>
          },
          {
            path: 'dashboard', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <ComingSoonRoute AuthUsers={USER_TYPES.centerOwner}>
                  <Dashboard />
                </ComingSoonRoute>
              </Suspense>
          },
          {
            path: 'center-services-list', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <ComingSoonRoute AuthUsers={USER_TYPES.centerOwner}>
                  <ServicesList />
                </ComingSoonRoute>

              </Suspense>
          },
          {
            path: 'settings', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>

                <Settings />
              </Suspense>
          },
          {
            path: 'center-requests', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <ComingSoonRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CenterRequests type={LICENSE_FORM_TYPES.ALL} />
                </ComingSoonRoute>
              </Suspense>
          },

          { path: '*', element: <Navigate to="/404" /> }
        ]
      },

      {
        path: 'center-services',
        element: isLoggedIn !== "" ? <DashboardLayout /> : <Navigate to="/login" state={{ prevPath: location?.pathname, search: location?.search }} />,
        children: [
          {
            path: 'templicense', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CreateTempLicenseLandingPage />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'templicenseCont', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CreateTemporaryLicense />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'finallicense', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <FinalLicenseLandingPage />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'finallicenseCont', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CreatefinalLicense />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'updatefinallicenserenewal', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CreatefinalLicense />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'editfinallicense', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CreatefinalLicense />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'finallicenserenewal', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <RenewalLicenseLandingPage />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'transfercenter', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <TransferCenterLocationLandingPage />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'transfercentercont', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <TransferCenterLocationRequest />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'programRegisteration', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CenterList />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'UpdateProgram', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <UpdateProgram />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'ProgramRequestSummary', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <ProgramRequestSummary />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'transfercentersummary', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <TransferCenterLocationSummary />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'centerPrograms', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CenterPrograms />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'transNewOnership', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <TransferNewOwnership />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'transfercenterownership', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <TransferCenterOwnership />
                </UnauthorizedRoute>
              </Suspense>

          },
          {
            path: 'transferCenterOwnershipSummary', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <TransferCenterOwnershipSummary />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'cancelInitialApprovalSummary', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CancelInitialApprovalSummary />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'cancelInitialApproval', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CancelInitialApproval />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'CancelFinalLicense', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CancelFinalLicense />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'cancelFinalLicenseSummary', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CancelFinalLicenseSummary />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'stateFeeBearingProgram', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <StateFeeBearingProgramLandingPage />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'stateFeeBearingProgramCont', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <RegistrationInStateFeeBearingProgram />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'stateFeeBearingProgramSummary', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <ViewStateFeeBearingProgram />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'cancelStateFeeBearingProgram', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CancelStateFeeBearingProgram />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'suspendlandingpage', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <SusLandingPage />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'suspendcenter', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <SuspendCenter />
                </UnauthorizedRoute>
              </Suspense>
          },
          {
            path: 'suspendRequestSummary', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <SuspendRequestSummary />
              </Suspense>
          },
          {
            path: 'cancelSuspend', element:
              <Suspense fallback={<CircularProgress size="15rem"
                style={{
                  display: 'block',
                  marginTop: '8%',

                  marginLeft: 'auto',
                  marginRight: 'auto',
                  color: '#E2E8EB'
                }} />}>
                <UnauthorizedRoute AuthUsers={USER_TYPES.centerOwner}>
                  <CancelSuspend />
                </UnauthorizedRoute>
              </Suspense>
          },
          { path: '*', element: <Navigate to="/404" /> }
        ]
      }])
};

export default routes;
