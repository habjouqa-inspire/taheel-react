import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'src/Core/Styles/MainMenu.css'
import {
  AppBar,
  Badge,
  Grid,
  Box,
  Hidden,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Toolbar,
  makeStyles,
  circularProgressClasses,
  CircularProgress
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import { logoutUser } from 'src/Core/Utils/UserLocalStorage';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Logo from './Logo';
import { APIRequest } from 'src/Core/API/APIRequest';
import { getCurrentUser } from 'src/Core/Utils/UserLocalStorage';
import Menu from '@mui/material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useLookup, useUpdateLookup } from '../Contexts/useLookup';
import CloseDilaog from './CloseDilaog';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const useStyles = makeStyles({
    cardHovered: {
      background: "white",
      '&:hover': {
        background: "lightBlue",
        cursor: "pointer"
      },
    },
  });
  const classes = useStyles()
  const lookupValues = useLookup()
  const refreshLookup = useUpdateLookup()
  const [allNotif, setAllNotif] = useState();
  const [loading, setLoading] = useState(false);
  const [unreadNotif, setUnreadNotif] = useState(0);
  const getNotificationsAPI = async (email) => {
    const url = 'taheel-apis-utilities-get-web-notifications';
    const queryParams = { email, "in": "query", "schema": { "type": "string" } };
    const response = await APIRequest({ url, queryParams });
    return response;
  };
  const changeNotificationStatus = async (notif) => {
    if (notif.isRead === false) {
      setUnreadNotif(unreadNotif - 1);
      notif.isRead = true
      const url = 'taheel-apis-utilities-change-web-notification-status';
      const queryParams = { notificationId: notif.ID };
      const res = await APIRequest({ url, queryParams });
      return res;
    }
  };
  useEffect(async () => {
    lookupValues?.isEmpity && (refreshLookup())
    getNotifications();
  }, []);
  const getNotifications = async () => {
    const { email } = getCurrentUser()
    if (email) {
      !allNotif && (setLoading(true))
      const notifications = await getNotificationsAPI(email)
      if (notifications.isSuccessful) {
        console.log("notifications --> ", notifications.responseBody.data.content)
        setAllNotif(notifications?.responseBody?.data?.content)
        setUnreadNotif(notifications?.responseBody?.data?.content?.filter(notif => !notif.isRead)?.length)
        setLoading(false)
      }
    }
  }
  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <PopupState variant="popover" popupId="demo-popup-menu" classes={{ maxWidth: '100px' }} class="hideBar">
            {(popupState) => (
              <React.Fragment>
                <IconButton color="inherit"  {...bindTrigger(popupState)} onMouseDown={async () => { getNotifications() }} >
                  <Badge
                    badgeContent={unreadNotif}
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Menu {...bindMenu(popupState)} dense={true} >
                  <Card sx={{ maxWidth: 345, borderColor: 'white' }}>
                    <CardHeader style={{ position: 'fixed', zIndex: '1', background: 'white', width: '345px' }}
                      avatar={
                        <>
                          <Avatar
                            sx={{
                              backgroundColor: '#103145',
                            }}
                          >
                            <NotificationsIcon />
                          </Avatar>
                        </>
                      }
                      action={
                        <IconButton aria-label="settings" color="primary">
                          <CloseDilaog onCloseFn={popupState.close} />
                        </IconButton>
                      }
                      title={<Grid item style={{ paddingRight: "20px" }}>{"التنبيهات"}</Grid>}
                    />
                    <CardContent style={{ paddingTop: '75px' }}>
                      <List dense={true} >
                        {!loading ?
                          !!allNotif && allNotif.length != 0 ? (allNotif.map((notif, idx) =>
                            <>
                              <ListItem
                                className={classes.cardHovered}
                                onClick={() => { changeNotificationStatus(notif); popupState.close() }}
                              >
                                {!notif.isRead ? <FiberManualRecordIcon fontSize="small" /> : ''}
                                <ListItemAvatar>
                                  <Avatar>
                                    <ImageIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={notif.content} secondary={notif.date} />
                              </ListItem>
                              <Divider component="li" />
                            </>)
                          ) :
                            (
                              <ListItem className={classes.cardHovered} style={{ width: "100%" }} >
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                  style={{ width: "500px" }}
                                >
                                  <Grid item>
                                    <p style={{ textAlign: 'center' }} >لا توجد بيانات </p>
                                  </Grid>
                                </Grid>
                              </ListItem>
                            ) :
                          <>
                            <ListItem className={classes.cardHovered} style={{ width: "100%" }} >
                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                style={{ width: "500px" }}
                              >
                                <Grid item>
                                  <CircularProgress size="5rem" />
                                </Grid>
                              </Grid>
                            </ListItem>
                          </>

                        }
                      </List>
                    </CardContent>
                  </Card>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>


          {/* <IconButton color="inherit" onClick={() => { logoutUser(); }}>
            <InputIcon />
          </IconButton> */}
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar >
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
