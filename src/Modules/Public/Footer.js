/* eslint-disable */
import { Box, CardMedia, Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    height: 'auto',
  },

  containerSocialMedia: {
    [theme.breakpoints.down('md')]: {
      "& div": {
        textAlign: "center !important"
      }
    },
  },

  containerCopyright: {
    [theme.breakpoints.down('md')]: {
      "& div": {
        textAlign: "right !important"
      }
    },
  },

  footerContainer: {
    [theme.breakpoints.down('md')]: {
      width: "90% !important",
      maxWidth: "90% !important"
    }
  },


}));

const Footer = () => {
  const classes = useStyles(); 
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div>
      <Grid container
        sx={{
          background: "#e2e8eb",
          fontFamily: 'FrutigerLTArabic-55Roman',
          backgroundColor: "#144259",
          color: "#fff",
        }}
      >
        <Grid container item className={classes.footerContainer}
          sx={{
            padding: "12px 0 8px",

            marginRight: "auto",
            marginLeft: "auto",
            padding: "12px",
            width: "60%",
            maxWidth: "60%"

          }}>

          {/* first row */}
          <Grid container item xs={12} justify="flex-start"
            sx={{
              mt: '15px'
            }}
          >

            <Grid container item xs={12} sm={6} lg={3}>

              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  fontSize='12px'
                  marginBottom='15px'
                  color="#4f7183"
                >
                  منصة
                </Typography>
              </Grid>


              <Grid item xs={12}>
                <CardMedia
                  style={{
                    width: "auto",
                    maxHeight: "40px",
                    marginBottom: "20px"
                  }}
                  component="img"
                  alt="something"
                  image="/static/taheelLogowithwhiteColorV2.png"
                  title="something"
                />
              </Grid>


            </Grid>

            <Grid container item xs={12} sm={6} lg={3}>

              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  fontSize='12px'
                  marginBottom='15px'
                  color="#4f7183"
                >
                  بإدارة
                </Typography>
              </Grid>


              <Grid item xs={12}>
                <CardMedia
                  style={{
                    width: "auto",
                    maxHeight: "40px",
                    marginBottom: "20px"
                  }}
                  component="img"
                  alt="something"
                  image="/static/taheelLogoBlackWhiteV2.png"
                  title="something"
                />
              </Grid>


            </Grid>

          </Grid>

          {/* Horizontal Ruler*/}
          <Grid item xs={12}
            sx={{
              mt: "20px",

            }}
          >

            <hr></hr>

          </Grid>

          {/* Social Media */}
          <Grid container item xs={12}
            sx={{

            }}
          >
            <Grid item xs={12} md={3} sx={{}}>

            </Grid>
            <Grid className={classes.containerCopyright} container item xs={12} md={6} sx={{ mt: "25px" }}>
              <Box style={{ width: "100%", textAlign: "center" }}>
                <Typography
                  variant="h1"
                  fontSize='13px'
                  lineHeight="1.5em"

                >
                  جميع الحقوق محفوظة لمنصة التأهيل والتوجيه الإجتماعي | تأهيل {new Date().getFullYear()}
             
                </Typography>
                <Link href=''
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('https://hrsd.gov.sa/ar/node/816')
                    }}
                    sx={
                      { 
                        color: '#eb993f',
                        textDecoration: 'underline'

                     }
                    }>سياسة الخصوصية</Link>
              </Box>
            </Grid>

            <Grid className={classes.containerSocialMedia} container item xs={12} md={3} sx={{ mt: "25px" }}>
              <Box style={{ width: "100%", textAlign: "left" }}>
                <InstagramIcon sx={{ m: "0 5px", fontSize: "30px" }} />
                <YouTubeIcon sx={{ m: "0 5px", fontSize: "30px" }} />
                <TwitterIcon sx={{ m: "0 5px", fontSize: "30px" }} />
              </Box>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;

