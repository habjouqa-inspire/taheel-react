/* eslint-disable */
import {
    Divider,
    Grid, Typography
} from '@material-ui/core';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import FieldsCreator from 'src/Core/SchemaBuilder/FieldsCreator';
import NewOwnerDetailsSchema from '../Schema/NewOwnerDetailsSchema';
import PropTypes from 'prop-types';

const NewOwnerDetails = ({ values, getCentertDetails, isLoading, setIsEnableNextBtn }) => {

    useEffect(() => {
        console.log(`values.centerLicenseNumber: ${values}`)
        setIsEnableNextBtn(true);
        // setIsEnableNextBtn(false);

    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item style={{ paddingTop: '20px' }} >
                <Box>
                    <Typography variant="h4" style={{ fontWeight: 'bold' }} flexItem>
                        بيانات المالك الحالي للمركز
                    </Typography>
                    <Divider light />
                </Box> 
            </Grid>
            <FieldsCreator schema={NewOwnerDetailsSchema} values={values} isLoading={false} formType="view" sectionNames={["CurrnetCenterOwnerDetails"]} />
        </Grid>
    );
}
export default NewOwnerDetails;
NewOwnerDetails.prototype= {
    setIsEnableNextBtn: PropTypes.func.isRequired,
    isLoading: PropTypes.any.isRequired,
    getCentertDetails: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
  
}
