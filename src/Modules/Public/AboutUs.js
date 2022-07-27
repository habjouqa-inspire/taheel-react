/* eslint-disable */
import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
    backgroundImage: "url(/static/images/Home/photo_old_3.jpg)",
    backgroundPositionY: "-100px",
    height: "400px",
    position: "relative",
    padding: "0px 25px",
    [theme.breakpoints.down('md')]:{
      backgroundPositionX: "50%",
    },
    "& .jumboTextContainer": {
      bottom: "10px",
      position: "absolute",
      width: "30%",
      [theme.breakpoints.down('md')]:{
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

  containerMargins:{
    marginLeft:"20% !important",
    marginRight:"20% !important",
    [theme.breakpoints.down('xl')]:{
      marginLeft:"5% !important",
      marginRight:"5% !important",
    },
    [theme.breakpoints.down('md')]:{
      marginLeft:"5% !important",
      marginRight:"5% !important",
    }
  },

  leftCard:{
    [theme.breakpoints.down('md')]:{
      marginRight:"0px !important"
    }
  },
  
  rightCard:{
    [theme.breakpoints.down('md')]:{
      marginLeft:"0px !important",
      marginBottom:"10px",
      "& img": {
        height:"180px !important"
      }
    }
  },

  visionImageContainer:{
    [theme.breakpoints.down('lg')]:{
      "& img": {
        height:"120px !important",
        margin: "130px auto !important"
      }
    },

    [theme.breakpoints.down('md')]:{
      "& img": {
        height:"180px !important"
      }
    }    
  },
  
  aboutImageContainer:{
    [theme.breakpoints.down('lg')]:{
      "& img": {
        
      }
    },

    [theme.breakpoints.down('md')]:{
      "& img": {
        
      }
    }
    
  }

}));

const AboutUs = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div>
      <Helmet>
          <title>عن المنصة</title>
      </Helmet>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <MainNavbar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />


      <Jumbotron className={classes.jumboStyle}>
        <div class="jumboTextContainer">
          <h1 className='centerme'>منصة تأهيل</h1>
          <p className='centerme'>
           منصة موحدة من وزارة الموارد البشرية والتنمية الاجتماعية بالشراكة مع قطاعات منظومة التنمية لتطوير وأتمتة الإجراءات الإلكترونية 
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
            mt: "60px"
          }}
        >
          <Grid item md={3} lg={6} sx={{width:"100%"}}>

            <Card elevation={0} className={classes.aboutImageContainer}
              sx={{
                borderRadius: '28px',
                background: '#214255',
                padding: '12px',
              }}
            >
              <img style={{
                height: '282px',
                borderRadius: '6px',
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
                padding: '0%',
              }}
                src='/static/Taheel_logo_header.png' />
            </Card>
          </Grid>

          <Grid item md={9} lg={6} sx={{width:"100%"}}


          >
            <Card className={classes.leftCard}
              sx={{
                marginTop: '2%',
                marginRight: '-12px',
                background: '#FFFFFF',
                borderRadius: '28px',
                padding: '11.7%',
              }}
            >
              <Typography
                color="#3c8084"
                variant="h1"
                fontSize='200%'
                mt='-8%'
                fontFamily="FrutigerLTArabic-75Black !important"
              >
                عن المنصة
              </Typography>

              <Typography
                fontSize='15px'
                color="#757070"
                variant="body3"
                fontFamily='FrutigerLTArabic-65Bold !important'
              >
                منصة موحدة من وزارة الموارد البشرية والتنمية الاجتماعية بالشراكة مع قطاعات منظومة التنمية لتطوير وأتمتة الإجراءات الإلكترونية بحيث تعمل المنصة على تحسين وتسهيل تجربة المستخدم وتسريع الإجراءات والآليات المتبعة مع رفع جودة الأعمال الميدانية لتكون نقطة التقاء بين الوزارة والمستفيدين وملاك المراكز والجهات المعنية الأخرى.
              </Typography>
            </Card>
          </Grid>

        </Grid>

        <Grid container
          sx={{

            mr: '1%',
            ml: '1%',
            mt: "-55px",

          }}
        >

          <svg width="100%" height="370px" viewBox="0 0 2069.587 356.923" className="landing-svg-line"><path data-v-b9e75930="" id="Path_6244" data-name="Path 6244" d="M-15735.4,2560.17s34.461-51.341,126.386-103.4a680.927,680.927,0,0,1,87.795-41.467c54.489-21.3,120.887-40.094,201.262-52.284,69.314-10.513,148.889-16.117,240.039-14.176,78.566,1.673,161.364,4.321,245.547,6.861,90.911,2.743,183.819,5.375,275.759,6.576,118,1.542,234.407.73,343-5.219q25.239-1.383,50-3.153c214.853-15.405,393.793-53.621,484.705-137.748" transform="translate(15743.703 -2208.82)" fill="none" stroke="#eb993f" strokeWidth="20"></path></svg>
        </Grid>

        <Grid container className={classes.containerMargins}
          sx={{
            mt: "-70px",
            mb: "70px"
          }}
        >
          <Grid item md={9} lg={6} sx={{zIndex: "2", width:"100%"}}>
            <Card className={classes.rightCard}
              sx={{
                marginTop: '2%',                
                background: '#FFFFFF',
                borderRadius: '28px',
                padding: '11.7%',
                marginLeft: '-12px',
              }}
            >
              <Typography
                color="#3c8084"
                variant="h1"
                fontSize='200%'
                mt='-8%'
                fontFamily="FrutigerLTArabic-75Black !important"
              >
                رؤية المنصة
              </Typography>

              <Typography
                fontSize='15px'
                color="#757070"
                variant="body3"
                fontFamily='FrutigerLTArabic-65Bold !important'
              >
                تهدف المنصة إلى مواكبة رؤية المملكة 2030 بتوفير الدعم والحماية المجتمعية والعمل يداً بيد مع الأفراد والجهات لتمكين المجتمع من النهوض عبر بنية أساسية متكاملة، حيث تعد توفير خدمات نوعية لفئة ذوي الإعاقة والأيتام وغيرهم من الفئات المستهدفة أحد الركائز الأساسية لدى وكالة التأهيل والتوجيه الاجتماعي في وزارة الموارد البشرية والتنمية الاجتماعية والتي تستهدف توفير الدعم المتواصل الذي يضمن لهم الحصول على التأهيل والتوجيه اللازمين من خلال إلحاقهم بالمراكز المصرحة وتقديم كافة الخدمات المطلوبة بجودة عالية
              </Typography>
            </Card>
          </Grid>
          <Grid item md={3} lg={6} sx={{width:"100%"}}>

            <Card elevation={0} className={classes.visionImageContainer}
              sx={{
                borderRadius: '28px',
                background: '#214255',
                padding: '12px',
                
              }}
            >
              <img style={{
                height: '225px',
                borderRadius: '6px',
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginTop: '77px',
                marginBottom: '77px',
                padding: '0%',
              }}
                src='/static/vision.png' />
            </Card>
          </Grid>

        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default AboutUs;

