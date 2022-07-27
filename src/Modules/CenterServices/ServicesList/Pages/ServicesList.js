import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { cleanArabicText, setCommonFile } from 'src/Core/Utils/TaheelUtils';
import ServiceCard from 'src/Modules/CenterServices/ServicesList/Components/ServiceCard';
import ServicesToolbar from 'src/Modules/CenterServices/ServicesList/Components/ServiceToolbar';
import services from 'src/__mocks__/services';
import Common_ar from "../Translation/ar/Common.json";
import Common_en from "../Translation/en/Common.json";

const ServicesList = () => {
  const [trans] = useTranslation('common');
  setCommonFile(Common_ar, Common_en)

  const [searchTerm, setSearchTerm] = useState('')
  const [servicesList, setServicesList] = useState(services);
  const [page, setPage] = useState(1);
  const maxPerPage = 9;
  const [numberOfItems, setNumberOfItems] = useState(servicesList?.length);
  const [totalPages, setTotalPages] = useState(Math.ceil(servicesList?.length / maxPerPage));
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setNumberOfItems(servicesList?.filter(item => cleanArabicText(trans(item.title.trim())).includes(searchTerm.trim())).length)
    setTotalPages(Math.ceil(numberOfItems / maxPerPage))
  }, [searchTerm])

  return (
    <>
      <Helmet>
        <title>Center Services</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: '#f4f6f8',
          minHeight: '100%',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth={false}>
          <ServicesToolbar onType={setSearchTerm} />
          <Box sx={{ pt: 3, }}>
            <Grid
              container
              spacing={10}
              dir="rtl"
            >
              {servicesList?.filter(item => cleanArabicText(trans(item.title.trim())).includes(searchTerm.trim())).slice((page - 1) * maxPerPage, page * maxPerPage).map((Service) => (
                <Grid
                  item
                  key={Service.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ServiceCard service={Service} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 10,
              pb: 5
            }}
          >
            {numberOfItems > maxPerPage ? (<Pagination
              color="primary"
              count={totalPages}
              size="small"
              page={page}
              onChange={handlePageChange}
            />) : ''}
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default ServicesList;
