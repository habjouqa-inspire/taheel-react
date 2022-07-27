/* eslint-disable */
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  Icon,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import {
  LogOut as LogoutIcon,
  Monitor as BarChartIcon,
  Archive as DraftsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Home as homeIcon,
  FileText as ordersIcon,
} from 'react-feather';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import { logoutUser } from 'src/Core/Utils/UserLocalStorage';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import moment from 'moment-hijri';
import NavItem from './NavItem';
import Logo from './Logo';
import { useTranslation } from "react-i18next";
import AlertDialog from './AlertDialog';
import { Logout } from '@material-ui/icons';
import ConfirmationDialog from './ConfirmationDialog';


moment.locale('ar-SA')
const m = moment()
const USER_TYPES = { all: 'all', center_owner: '2', commissioner: '3', beneficiary: '4' }
const user = {
  avatar: '/static/images/avatars/avatar_4.png',
  currentDate: m.format('iYYYY / iMM / iD'),
  name: 'عبدالله بن محمد',
};
// items for userType === 2
let items = [
  {
    showTo: USER_TYPES.all,
    href: '/app/dashboard',
    icon: BarChartIcon,
    //title: 'لوحة البيانات',
    title: 'dashboard.sidebar.dashboard',

  },
  {
    showTo: USER_TYPES.all,
    href: '/app/center-services-list',
    icon: ShoppingBagIcon,
    //title: 'الخدمات'
    title: 'dashboard.sidebar.services',
  },
  {
    showTo: USER_TYPES.all,
    href: '/app/account',
    icon: UserIcon,
    //title: 'الملف التعريفي'
    title: "dashboard.sidebar.personal_info"

  },
  {
    showTo: USER_TYPES.center_owner,
    href: '/app/centers',
    icon: homeIcon,
    //title: 'المراكز'
    title: "dashboard.sidebar.centers"
  },
  {
    showTo: USER_TYPES.all,
    href: '/app/center-requests',
    icon: ordersIcon,
    //title: 'الطلبات'
    title: "dashboard.sidebar.orders"
  },
  // {
  //   href: '/app/notifications',
  //   icon: UserIcon,
  //   title: 'التنبيهات'
  // },
  // {
  //   href: '/app/drafts',
  //   icon: DraftsIcon,
  //   title: 'المسودات'
  // },

];


const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const Navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);

  const [t] = useTranslation('common');
  const location = useLocation();
  const { firstName, lastName, userType } = getCurrentUser();
  console.log('333333333333#$####################    ', location.pathname);
  user.name = `${firstName} ${lastName}`;
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          sx={{
            cursor: 'pointer',
            width: 60,
            height: 60
          }}
          to="/app/account"
        >
          <AccountCircleIcon accentHeight={60} fontSize="large" />
        </Avatar>
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#fff'
            }}
          >
            {user.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: 13,
              color: '#fff',
              paddingTop: 1
            }}
          >
            {user.currentDate}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.filter(item => (item.showTo === userType || item.showTo === USER_TYPES.all)).map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              //title={item.title}
              title={t(item.title)}
              icon={item.icon}
              onClick={item.onClick}
            />
          ))}

          <ListItem
            disableGutters
            sx={{
              display: 'flex',
              py: 0
            }}
          >
            <Button
              onClick={() => {
                setShowPopup(true);
                setCurrentPath(location.pathname);

              }}
              sx={{
                color: 'text.white',
                fontWeight: 'medium',
                justifyContent: 'flex-start',
                letterSpacing: 0,
                py: 1.25,
                textTransform: 'none',
                width: '100%',
                '& svg': {
                  ml: 1
                }
              }}
            >
              {(
                <LogoutIcon size="20" />
              )}
              <span>
                {"تسجيل خروج"}
              </span>
            </Button>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ flexGrow: 1, }} />
      <Box
        sx={{
          backgroundColor: '#103145',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/static/taheelLogowithwhiteColorV2.png"
            width="200"
            height="60"
          />
        </RouterLink>
        <Typography
          align="center"
          variant="body2"
          sx={{
            fontSize: 10,
            color: '#CCC',
            paddingTop: 2
          }}
        >
          {/* جميع الحقوق محفوظة
          © 2021 */}
          {t("dashboard.sidebar.all_rights_reserved")}
        </Typography>
      </Box>
    </Box>
  );
  const handelLogout = () => {
    logoutUser();
    setShowPopup(false)

    Navigate('/login')
  }
  return (
    <>

      <ConfirmationDialog
        dialogTitle={'تسجيل خروج'}
        dialogContent={'هل أنت متأكد من أنك تريد تسجيل الخروج؟'}
        open={showPopup}
        onAcceptFn={() => handelLogout()}
        onBackdropClick={()=>setShowPopup(false)}
        onCloseFn={() =>  setShowPopup(false)}
        cancelBtnName={'لا'}
        acceptBtnName={'تأكيد'}
        onEscapeKeyDown={() =>  setShowPopup(false)}


      />
      <Hidden lgUp>
        <Drawer
          anchor="right"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
              backgroundColor: '#214255',
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="right"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 80,
              bottom: 16,
              height: 'calc(100% - 96px)',
              backgroundColor: '#214255',
              borderBottomLeftRadius: 50,
              borderTopLeftRadius: 50
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
