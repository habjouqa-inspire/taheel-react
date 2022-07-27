/* eslint-disable */
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Radio } from 'final-form-material-ui';
import {
  Grid,
} from '@material-ui/core';

const CitizenInfo = () => {
  return (
    <>
      <Grid
        container
        spacing={0}
        mt={6}
      >  
          <Grid
            container
            spacing={3}
            mt={2}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Field
                fullWidth
                required
                label=" رقم الهوية / الإقامة "
                name="IqamaNumber"
                component={TextFieldFinal}
                type="text"
                variant="outlined"
                dir="rtl"
                className="custom-field"
              />
            </Grid>
          </Grid>
      </Grid>
    </>
  );
};
export default CitizenInfo;
