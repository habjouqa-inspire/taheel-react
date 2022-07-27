/* eslint-disable */
import { Box, Card, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Carousel from 'react-material-ui-carousel';
import DashboardNavbar from 'src/Core/Components/DashboardNavbar';
import MainNavbar from 'src/Core/Components/MainNavbar';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    height: 'auto',
  },
  sliderName: {
    fontFamily: "FrutigerLTArabic-75Black !important",
    color: "#FFFFFF",
    padding:"0.5em",
    fontWeight: 'bolder',
    fontSize: '3.5em',
    textAlign: 'right',
    [theme.breakpoints.down('sm')]:{
      padding: "0%",
    }
  },

  sliderDescription: {
    color: "#FFFFFF",
    wordWrap: "break-word !important",
    textAlign: "justify",
    fontFamily: "FrutigerLTArabic-55Roman !important",
    fontSize: "20px !important",
    width: "500px",
    marginRight: "20px !important",
    [theme.breakpoints.down('sm')]:{
      width: "100%",
      marginRight: "0px !important",
    }
  },

  sliderIndicator: {
    color: 'transparent  !important',
    border: "solid 1px white !important",
    padding: "0px !important",
    margin: "0 2px !important",
    "&:hover": {
      color: 'white !important',
      backgroundColor: 'white !important'
    },
    "& svg":{
      fontSize:'0.75rem',
    }

  },

  sliderIndicatorActive: {
    color: 'white !important',
    backgroundColor: 'white !important'
  },

  sliderArrows: {
    color: 'white !important',
    "&:hover": {
      color: '#fcb712 !important'
    },
    "& svg":{
      fontSize:'2.5rem',
    },

    [theme.breakpoints.down('md')]:{
      marginTop: "80px !important",
    }
  },

  sliderImage: {
    height: "690px ",
    [theme.breakpoints.down('md')]:{
      height: "550px",
    }
  },

  

  box: {
    position: "absolute",
    top: '20%',
    bottom: 'auto',
    left: 'auto',
    right: '100px',
    color: ' #fff',
    textAlign: 'right',
    textShadow: '0 1px 2px rgb(0 0 0 / 60%)',
    [theme.breakpoints.down('sm')]:{
      right: "17px",
      width: "90%",
    }

  },
  sliderHeader: {
    position: "absolute",
    top: '35px',
    bottom: 'auto',
    left: 'auto',
    right: '30px',
    fontFamily: "FrutigerLTArabic-55Roman !important",
    textAlign: 'right',
    color: 'white',
    fontSize: '15px',
    fontWeight: "lighter",
    width: "190px",
    lineHeight:"1.4em",
    [theme.breakpoints.down('sm')]:{
      right: "30px",
      top: "25px",
    }
  },

  firstRow: {
    marginLeft: "20% !important",
    marginRight:"20% !important",
    [theme.breakpoints.down('md')]:{
      marginLeft: "5% !important",
      marginRight:"5% !important",
    },
    "& .leftCard": {
      marginTop: '2%',
      marginRight: '-12px',
      background: '#FFFFFF',
      borderRadius: '28px',
      padding: '11.7%',
      [theme.breakpoints.down('sm')]:{
        marginRight:"0px"
      }
    },
    "& .rightCard": {
      [theme.breakpoints.down('sm')]:{
        width:"100%"
      }
    }
  },

  secondRow: {
    marginLeft: "1%",
    marginRight:"1%",
    [theme.breakpoints.down('sm')]:{
      marginTop: "30px !important",
      "& svg": {
        height:"150px !important"
      }
    },
  },

  thirdRow: {
    marginLeft: "20% !important",
    marginRight:"20% !important",
  
    [theme.breakpoints.down('sm')]:{
      marginLeft: "5% !important",
      marginRight:"5% !important",
      "& .item-service": {
        top:"-75px !important"
      }
    },
  }

}));

const items = [
  {
    name: 'ذوي الإعاقة',
    description: " تـعد الرعايـة النـهارية أحد الركائـز الأساسية لدى وكالة التأهيل والتوجية الاجتماعي في وزارة الموارد البشرية والتنمية الاجتماعية ",
    image: 'static/images/Home/photo_diable_2.jpg'
  },
  {
    name: "كبار السن",
    description: " تعد رعاية كبار السن أحد الركائز الاساسية لدى وكالة التأهيل والتوجية الاجتماعي في وزارة الموارد البشرية والتنمية الاجتماعية ",
    image: 'static/images/Home/photo_old_3.jpg'
  },
  {
    name: "الأيتام",
    description: " تعد رعاية الايتام أحد الركائز الاساسية لدى وكالة التأهيل والتوجية الاجتماعي في وزارة الموارد البشرية والتنمية الاجتماعية ",
    image: 'static/images/Home/photo_orphan_4.jpg'
  }
]

const services = [
  {
    name: "خـدمات التأسـيس",
    description: "تتيح هذه الخدمة للمواطن أو المواطنة تأسيس مركز تأهيل أهلي ",
    image: 'static/images/Home/Icon-building.png'
  },

  {
    name: "خـدمـات المستـفيديـن",
    description: "تتيح هذه الخدمة للمركز تحديث بيانات المستفيدين",
    image: 'static/images/Home/icon-users.png'
  },

  {
    name: "خـدمـات الـمركـز",
    description: "تتيح هذه الخدمة للمركز ادارة بياناته ",
    image: 'static/images/Home/icon-file.png'
  }
]

const Home = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div>
      <Helmet>
          <title>الرئيسية</title>
      </Helmet>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <MainNavbar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />

      <Grid container
        sx={{
          background: "#e2e8eb",
          fontFamily: 'FrutigerLTArabic-55Roman',
        }}>

        <Grid item xs={12}>

          <Carousel
            className={classes.root}
            next={() => { }}
            prev={() => { }}
            autoPlay={false}
            fullHeightHover={false}
            navButtonsAlwaysVisible={true}
            indicatorContainerProps={{style: { marginTop: "-60px", marginBottom: "80px"}}}
            indicatorIconButtonProps={{className:classes.sliderIndicator}} 
            activeIndicatorIconButtonProps={{className:classes.sliderIndicatorActive}} 
            navButtonsProps={{className:classes.sliderArrows}} 
            navButtonsWrapperProps={{style:{margin:"0 8%", paddingTop: "70px", /*height: "800px"*/}}}
          >

            {items.map((item, i) =>
              <Box item={item} key={i} >
                <CardMedia
                  className={classes.root + ' ' + classes.sliderImage}
                  component="img"
                  alt={item.name}
                  image={item.image}
                  title={item.name}

                  sx={{
                    objectFit: "cover",
                    objectPosition: "top"
                  }}

                />
                <div
                  className={classes.sliderHeader}
                >
                  {'منصة التأهيل والتوجيه الإجتماعي | تأهيل'}
                </div>

                <Box
                  className={classes.box}
                >
                  <Typography
                    className={classes.sliderName}
                    variant=""
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    className={classes.sliderDescription}
                  >
                    {item.description}
                  </Typography>

                </Box>

              </Box>
            )
            }
          </Carousel>

        </Grid>
        <Grid container item xs={12} className={classes.firstRow}>
          <Grid item sm={6} sx={{background: '#f0b843',borderRadius: '28px',padding: '12px', width:"100%" }}>
            <Card elevation={0} className={'rightCard'}
              sx={{
                background: 'transparent'
              }}
            >
              <img style={{
                height: '225px',
                borderRadius: '6px',
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
                padding: '0%',
              }}
                src='static/images/Home/photo1.png' />
            </Card>
          </Grid>

          <Grid item sm={6}>
            <Card className={'leftCard'}>
              <Typography
                color="#3c8084"
                variant="h1"
                fontSize='200%'
                mt='-8%'
                fontFamily= "FrutigerLTArabic-75Black !important"
              >
                هدفنا
              </Typography>

              <Typography
                fontSize='15px'
                color="#757070"
                variant="body3"
                fontFamily='FrutigerLTArabic-65Bold !important'
              >
                تهدف هذه المنصة إلى تحسين وتسهيل الاجراءات المتعلقة بمراكز التأهيل الأهلي بالنسبة للمستفيدين وملاك المراكز وكذلك الوزارة مع رفع جودة الاعمال الميدانية
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Grid container item xs={12} className={classes.secondRow}>
            <Typography
              color="#3c8084"
              variant="h1"
              mr='19%'
              ml='19%'
              mt='3%'
              mb='-10%'
              fontFamily="FrutigerLTArabic-75Black !important"
            >
              خدماتنا
          </Typography>

            <svg width="100%" height="370px" viewBox="0 0 2069.587 356.923" className="landing-svg-line"><path data-v-b9e75930="" id="Path_6244" data-name="Path 6244" d="M-15735.4,2560.17s34.461-51.341,126.386-103.4a680.927,680.927,0,0,1,87.795-41.467c54.489-21.3,120.887-40.094,201.262-52.284,69.314-10.513,148.889-16.117,240.039-14.176,78.566,1.673,161.364,4.321,245.547,6.861,90.911,2.743,183.819,5.375,275.759,6.576,118,1.542,234.407.73,343-5.219q25.239-1.383,50-3.153c214.853-15.405,393.793-53.621,484.705-137.748" transform="translate(15743.703 -2208.82)" fill="none" stroke="#eb993f" strokeWidth="20"></path></svg>
        </Grid>
        <Grid container item xs={12} className={classes.thirdRow}>
            {
              services.map((service, i) =>
                <Grid item xs={4} key={i} className={'item-service'}
                  sx=
                  {{
                    zIndex: '100',
                    position: 'relative',
                    top: '-290px',
                    bottom: 'auto',
                    left: 'auto',
                    textAlign: 'center'
                  }}
                >
                  <CardMedia
                    style={{
                      width: '100%',
                      height: '100%',
                      paddingTop: '35px',
                      width: "auto",
                      maxHeight: "150px",
                      margin: "0 auto"
                    }}
                    component="img"
                    alt={service.name}
                    image={service.image}
                    title={service.name}
                  />

                  <Typography
                    variant="h1"
                    fontSize='18px'
                    color='#214256'
                  >
                    {service.name}
                  </Typography>

                  <Typography
                    fontSize='12px'
                    variant="body3"
                    fontFamily='FrutigerLTArabic-55Roman'
                    color='#7c7c7c'
                  >
                    {service.description}
                  </Typography>
                </Grid>
              )
            }
        </Grid>
      </Grid>
      <Footer/>
    </div>
  );
};

export default Home;

