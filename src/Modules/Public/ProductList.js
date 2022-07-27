import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import { useState } from 'react';
import products from 'src/__mocks__/productsCenters';
import ProductCard from './ProductCard';


const ServicesList = () => {
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const [noOfPages] = useState(
    Math.ceil(products.length / itemsPerPage)
  );

  const handleChange = (event, value) => {
    setPage(value);
  };
return (
  <>
    <Box
      sx={{
        overflow: 'hidden',
      }}
    >
      <Container>
        
        <Box sx={{ pt: 3, }}>
          <Grid
            container
            spacing={10}
            dir="rtl"

          >
            {products.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((product) => (
              <Grid
                item
                key={product.id}
                lg={3}
                md={6}
                xs={12}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            size="small"
            count={noOfPages}
            page={page}
            onChange={handleChange}
          />
        </Box>


      </Container>
    </Box>
  </>
);
}

export default ServicesList;
