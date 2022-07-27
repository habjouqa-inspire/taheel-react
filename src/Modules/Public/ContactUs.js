/* eslint-disable */
import { Box, Button, FormControl, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Helmet } from 'react-helmet';
import DashboardNavbar from 'src/Core/Components/DashboardNavbar';
import MainNavbar from 'src/Core/Components/MainNavbar';
import Footer from './Footer';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    height: 'auto',
  },
  jumboStyle: {
    backgroundImage: "url(/static/images/Home/photo_orphan_4.jpg)",
    backgroundPositionY: "-225px",
    height: "400px",
    position: "relative",
    padding: "0px 25px",
    [theme.breakpoints.down('md')]: {
      backgroundPositionX: "50%",
    },
    "& .jumboTextContainer": {
      bottom: "10px",
      position: "absolute",
      width: "30%",
      [theme.breakpoints.down('md')]: {
        width: "90% !important",
      }
    },

    "& h1": {
      color: "white",
    },

    "& p": {
      color: "white",
    }
  },

  contactusInput: {
    width: "100%",
    margin: "10px 0px !important",

  },

  containerMargins: {
    marginLeft: "20% !important",
    marginRight: "20% !important",
    [theme.breakpoints.down('xl')]: {
      marginLeft: "5% !important",
      marginRight: "5% !important",
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: "5% !important",
      marginRight: "5% !important",
    }
  },

}));

const Services = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div>
      <Helmet>
        <title>اتصل بنا</title>
      </Helmet>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <MainNavbar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />


      <Jumbotron className={classes.jumboStyle}>
        <div class="jumboTextContainer">
          <h1 className='centerme'>اتصل بنا</h1>
          <p className='centerme'>
            بحاجة إلى مساعدة تتعلق بأحد برامجنا أو خدماتنا؟ تسرنا خدمتكم.
          </p>
        </div>
      </Jumbotron>


      <Grid container
        sx={{
          background: "#e2e8eb",
          fontFamily: 'FrutigerLTArabic-55Roman',

        }}>


        <Grid container className={classes.containerMargins}
          sx={{
            mt: "30px",
            mb: "70px",
            backgroundColor: "white",
            borderRadius: "10px"
          }}
        >
          <Grid item md={6} sx={{ padding: "10px 70px !important" }}>
            <h1 className='centerme'>تواصل معنا</h1>
            <p className='centerme' style={{ marginTop: "12px" }}>
              بحاجة إلى مساعدة تتعلق بأحد برامجنا أو خدماتنا؟ تسرنا خدمتكم، تواصل معنا للحصول على مساعدة أو لإجابة استفساراتكم من خلال تعبئة النموذج الخاص أو زيارتنا في مكتب الخدمات المساندة
            </p>
            <br />
            <Grid container spacing={2}>
              <Grid item md={6}>
                <a class="map" href="https://goo.gl/maps/MSHvGUpmFMn" target="_blank" rel="noopener noreferrer">
                  <img class="" src="https://takamolholding.com/wp-content/uploads/2018/01/map.png" alt="موقع تكامل على الخريطة" style={{ height: "140px", margin: "0 25px" }} />
                </a>
              </Grid>
              <Grid item md={6} sx={{ fontSize: "0.75em" }} >
                <h2>موقعنا</h2>
                <p>مبنى ب4، واحة غرناطة المكتبية</p>
                <p>طريق الدائري الشرقي، حي الشهداء</p>
                <p>الرياض، 13241</p>
                <p>المملكة العربية السعودية</p>
              </Grid>
            </Grid>

            <br />
            <br />
            <p className='centerme'>
              يمكنكم التواصل إيضاً من خلال صفحات التواصل الإجتماعي
            </p>
            <br />
            <Box style={{ width: "100%", textAlign: "center" }}>
              <InstagramIcon sx={{ m: "0 5px", fontSize: "30px", color: "#b9009b" }} />
              <YouTubeIcon sx={{ m: "0 5px", fontSize: "30px", color: "#ff0000" }} />
              <TwitterIcon sx={{ m: "0 5px", fontSize: "30px", color: "#1da1f2" }} />
            </Box>

          </Grid>
          <Grid item md={6} >
            <form autoComplete="off">
              <FormControl sx={{ width: "100%", padding: "70px" }}>
                <TextField className={'custom-field ' + classes.contactusInput} id="outlined-basic" label="الاسم" variant="outlined" required />
                <TextField className={'custom-field ' + classes.contactusInput} id="outlined-basic" label="الجوال" variant="outlined" required
                  onChange={(e) => {
                    if (!!e.target.value) {
                      e.target.value = e.target.value.replace(/\D/g, '')
                      e.target.value = e.target.value.substring(0, 15)
                    }
                  }}
                />
                <TextField className={'custom-field ' + classes.contactusInput} id="outlined-basic" label="البريد الالكتروني" variant="outlined" required />
                <TextField className={'custom-field ' + classes.contactusInput} id="outlined-basic" label="موضوع الرسالة" variant="outlined" required />
                <TextField className={'custom-field ' + classes.contactusInput} id="outlined-basic" label="نص الرسالة" variant="outlined" multiline rows={4} required />
                <Button
                  color="primary"

                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: '5em',
                    width: '150px',

                  }}
                >
                  إرسال
                </Button>
              </FormControl>
            </form>
          </Grid>
        </Grid>

      </Grid>
      <Footer />
    </div>
  );
};

export default Services;

