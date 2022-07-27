/* eslint-disable */
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Helmet } from 'react-helmet';
import DashboardNavbar from 'src/Core/Components/DashboardNavbar';
import MainNavbar from 'src/Core/Components/MainNavbar';
import Footer from './Footer';
import ProductList from './ProductList';
import ProductListBenificiaries from './ProductListBenificiaries';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    height: 'auto',
  },
  jumboStyle: {
    backgroundImage: "url(/static/images/Home/photo_diable_2.jpg)",
    backgroundPositionY: "-430px",
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

}));

const Services = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div>
      <Helmet>
          <title>خدماتنا</title>
      </Helmet>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <MainNavbar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />


      <Jumbotron className={classes.jumboStyle}>
        <div class="jumboTextContainer">
          <h1 className='centerme'>خدماتنا</h1>
          <p className='centerme'>
          توفر هذه المنصة مجموعة من الخدمات الإلكترونية لتحسين وتسهيل الاجراءات المتعلقة بمراكز التأهيل الأهلي بالنسبة للمستفيدين وملاك المراكز
          </p>
        </div>
      </Jumbotron>


      <Grid container
        sx={{
          background: "#e2e8eb",
          fontFamily: 'FrutigerLTArabic-55Roman',

        }}>



        
        <Grid container spacing={1}
          sx={{
            
            mt: "70px",
            mb: "70px"
          }}
        >
          <Grid item xs={12} sx={{mr: '10%',ml: '10%'}} >
            
            <Typography
              color="#3c8084"
              variant="h1"
              mb="20px"
              fontFamily= "FrutigerLTArabic-75Black !important"
            >
              خدمات المراكز الأهلية
            </Typography>
            <ProductList/>
          </Grid>

          <Grid item xs={12} sx={{mt:"-90px", mb: "-150px", mr: '1%',ml: '1%' }} >
            <svg width="100%" height="370px" viewBox="0 0 2069.587 356.923" className="landing-svg-line"><path data-v-b9e75930="" id="Path_6244" data-name="Path 6244" d="M-15735.4,2560.17s34.461-51.341,126.386-103.4a680.927,680.927,0,0,1,87.795-41.467c54.489-21.3,120.887-40.094,201.262-52.284,69.314-10.513,148.889-16.117,240.039-14.176,78.566,1.673,161.364,4.321,245.547,6.861,90.911,2.743,183.819,5.375,275.759,6.576,118,1.542,234.407.73,343-5.219q25.239-1.383,50-3.153c214.853-15.405,393.793-53.621,484.705-137.748" transform="translate(15743.703 -2208.82)" fill="none" stroke="#eb993f" strokeWidth="20"></path></svg>
          </Grid>


          <Grid item xs={12} sx={{mr: '10%',ml: '10%'}}>
            <Typography
                color="#3c8084"
                variant="h1"
                mb="20px"
                fontFamily= "FrutigerLTArabic-75Black !important"
            >
              خدمات المستفيدين
            </Typography>
            <ProductListBenificiaries/>
          </Grid>



          



        </Grid>

      </Grid>
      <Footer />
    </div>
  );
};

export default Services;

