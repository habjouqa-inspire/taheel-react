import {
  Box,
  // Button,
  Card,
  CardContent, InputAdornment,
  SvgIcon, TextField
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { Search as SearchIcon } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { cleanArabicText } from 'src/Core/Utils/TaheelUtils';

const ServicesToolbar = (props) => {
  const [trans] = useTranslation('common');
  const { onType } = props;
  const handleChange = (event) => {
    console.log(event.target.value);
    onType(cleanArabicText(event.target.value))
  };

  return (
    <Box {...props}>
      {/* <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button>
        Import
      </Button>
      <Button sx={{ mx: 1 }}>
        Export
      </Button>
      <Button
        color="primary"
        variant="contained"
      >
        Add product
      </Button>
    </Box> */}
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder={trans("services_list.search")}
                variant="outlined"
                onChange={(event) => { handleChange(event) }}
              // onKeyPress={e => {
              //   onType(e.target.value)
              //   console.log('entered key', e.key);
              // }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>)
};

export default ServicesToolbar;

ServicesToolbar.propTypes = {
  onType: PropTypes.func,
};