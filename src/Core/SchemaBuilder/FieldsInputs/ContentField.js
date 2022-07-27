import { Grid, Typography } from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import {
  DownloadBtn,
  DownloadButtTable
} from 'src/Modules/CenterServices/FinalLicense/Utils/finalLicenseUtil';
import Skeleton from '@material-ui/lab/Skeleton';
import FieldsEnum from '../Utils/FieldsEnum';
import DataTable from './DataTable';
import { checkIsNumber } from 'src/Core/Utils/inputValidator';
import { getContentValue, getFieldValue } from '../Utils/CoreUtils';
import { CheckConditionDependOn } from 'src/Modules/CenterServices/TemporaryLicense/Utils/temporayLicenseUtil';
import MapField from './MapField';
import { TextField } from '@mui/material';

export default function ContentField(props) {
  let gridSize = !!props.gridSizeFunc ? props.gridSizeFunc(props.values) :
    (!!props.gridSize ? props.gridSize : 12);

  if (props.type === FieldsEnum.MAP_CONTAINER || props.type === 'Map') {
    return <MapField {...props} />;
  }
  const value = getContentValue(props)
  if (props.type === FieldsEnum.DATA_TABLE) {
    return <DataTable {...props} />;
  }

  if (!!value || checkIsNumber(value) || value === false || props.isLoading) {
    if (!props.isLoading) {
      if (props.type === 'fileTable') {
        return (
          <Grid item xs={gridSize}>
            <DownloadButtTable
              docIDs={value}
              name={props.name}
              label={props.tLabel}
            />
          </Grid>
        )
      } else if (props.type === FieldsEnum.FILE_FILED) {
        return (
          <Grid item xs={gridSize} style={{ marginTop: '20px' }}>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {props.tLabel}
            </Typography>
            <DownloadBtn
              index={1}
              docID={value}
            />
          </Grid >
        )
      } else if (props.type === FieldsEnum.MULTI_LINE_TEXT) {
        return (
          <Grid item xs={gridSize} style={{ marginTop: '20px' }}>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {props.tLabel}
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              defaultValue="Default Value"
              maxRows={4}
              disabled={true}
              value={value}
              fullWidth={true}
            />
          </Grid >
        )
      } else {
        return (
          <Grid item xs={gridSize} style={{ marginTop: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {props.tLabel}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {value}
            </Typography>
          </Grid >
        );
      }
    } else {
      return (<Grid item xs={gridSize} style={{ marginTop: '20px' }}>
        <Skeleton
          animation="wave"
          height={15}
          width="20%"
          style={{ marginBottom: 6 }}
        />
      </Grid>)
    }
  } else {
    return null;
  }
}

ContentField.propTypes = {
  labelRootStyle: PropTypes.object,
  tLabel: PropTypes.string,
  handleChange: PropTypes.func,
  valueFunc: PropTypes.func,
  gridSize: PropTypes.string,
  rows: PropTypes.number,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool
};