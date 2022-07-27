/* eslint-disable */
import { useContext, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Drawer,
  Hidden,
  List,
  Toolbar,
  AppBar,
  Grid,
  Typography
} from '@material-ui/core';
import NavItem from './NavItem';

const styles = makeStyles((theme) => ({
  title: {
    fontSize: 12,

    marginLeft: theme.spacing(2)
  },

  // toolbar: {
  //   justifyContent: 'space-between',
  //   display: 'inline',

  // },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 12,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },

}));

const MainNavbar = ({ onMobileClose, openMobile }) => {
  const classes = styles();
  const location = useLocation();
  const items = [
    {
      href: '/home',
      title: 'الرئيسية',
      side: true,
    },
    {
      href: '/about',
      title: 'عن المنصة',
      side: true,
    },
    {
      href: '/faq',
      title: 'أسئلة شائعة',
      side: true,
    },
    {
      href: '/services',
      title: 'خدماتنا',
      side: true,
    },
    {
      href: '/contactus',
      title: 'اتصل بنا',
      side: true,
    },
    {
      href: '/register',
      title: 'تسجيل جديد',
      side: false,
    },
    {
      href: '/login',
      title: 'تسجيل الدخول',
      side: false,
    }
  ];

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const list = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item, index) => (
            <NavItem
              href={item.href}
              key={index}
              title={item.title}
              icon={item.icon}
            />
          ))}
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
            height="54"
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
          جميع الحقوق محفوظة
          © 2021
      </Typography>
      </Box>
    </Box>

  );

  const toolbar = (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Grid container className={classes.left} spacing={1} >
        <Grid item l={2} key={-1} >
              <RouterLink to="/">
                <img
                  alt="Logo"
                  src="/static/taheelLogowithwhiteColorV2.png"
                  width="150"
                />
              </RouterLink>
         </Grid>
          {items.filter(item => item.side).map((element, index) => (
            <Grid item l={2} key={index} >
              <NavItem
                className={classes.title}
                href={element.href}
                // key={index}
                title={element.title}
              />
            </Grid>
          ))
          }
        </Grid>

        <Grid className={classes.right} key='right'>
          {items.filter(item => !item.side).map((element, index) => (
            <Grid item l={2} key={index} >
              <NavItem
                className={classes.rightLink}
                href={element.href}
                // key={index}
                title={element.title}
              />
            </Grid>
          ))
          }
        </Grid>
      </Toolbar>
    </AppBar>
  );

  return (
    <>
      <Hidden lgUp key='list'>
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
          {list}
        </Drawer>
      </Hidden>
      <Hidden lgDown key='toolbar'>
        {toolbar}
      </Hidden>
    </>
  );
};

MainNavbar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

MainNavbar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default MainNavbar;
