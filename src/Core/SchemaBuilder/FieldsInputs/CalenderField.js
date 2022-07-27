import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Calendar from 'src/Core/Components/calendar';
import PropTypes from 'prop-types';
import moment from 'moment-hijri';

export default function CalenderField(props) {
    let gridSize = !!props.gridSizeFunc
        ? props.gridSizeFunc(props.values)
        : !!props.gridSize
            ? props.gridSize
            : 12;
    return (
        
        <Grid
            item
            md={gridSize}

        >
            <Grid
                item
                md={gridSize}
                style={{ paddingBottom: '20px', paddingTop: '20px' }}
            >
                <Typography>{props.tLabel}</Typography>
            </Grid>
            <Calendar
                yearCalender={{
                start: moment().format('iYYYY'),
                end: Number.parseInt(moment().format('iYYYY')) + 15
                }}
                disabled={props.funcLoading || props.disabled}
               // gridSize={6}
                fieldName={props.name}
            />
        </Grid>
    );
}

CalenderField.propTypes = {
    tLabel: PropTypes.string,
    gridSize: PropTypes.number,
    gridSizeFunc: PropTypes.func,
    funcLoading: PropTypes.func,
    type: PropTypes.string,
    name: PropTypes.string,
    values: PropTypes.any,
    disabled: PropTypes.bool
};
