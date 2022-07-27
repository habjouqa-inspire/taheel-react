import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select, Radio } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import {
    Typography,
    MenuItem,
    Grid,
} from '@material-ui/core';
import moment from 'moment-hijri';
import { useEffect } from 'react';


const Calendar = ({ FeiledWidth = 4, gridSize = 12, fieldName, disabled = false, yearCalender = { start: 1324, end: moment().format('iYYYY') - 16 } }) => {
    const calendar = {
        days: [],
        months: [],
        years: []
    };
    const CalenderDate = (type, start, end) => {
        for (let i = start; i <= end; i++) {
            type.push(i);
        }
    };
    CalenderDate(calendar.days, 1, 30);
    CalenderDate(calendar.months, 1, 12);
    CalenderDate(calendar.years, !!yearCalender.start ? yearCalender.start : 1324, !!yearCalender.end ? yearCalender.end : moment().format('iYYYY') - 16);

    useEffect(() => {
        console.log(`--- disabled ${disabled}`);
    }, [])

    return (
        <Grid
            container
            md={gridSize}
            spacing={1}
            style={{ paddingLeft: "30px" }}
        >
            {/* <Grid
              item
              md={6}
              xs={12}
            //   mx={50}
            > */}
            {/* <Typography> تاريخ الميلاد</Typography> */}
            {/* </Grid> */}
            <Grid
                item
                md={FeiledWidth}
                xs={FeiledWidth}
                className="custom-label-field"
            >
                <Field
                    fullWidth
                    label="اليوم*"
                    // name="day"
                    name={fieldName === null ? "day" : `${fieldName}.day`}
                    component={Select}
                    required
                    dir="rtl"
                    disabled={disabled}
                    className="custom-field"
                    variant="outlined"
                    formControlProps={{ fullWidth: true }}
                >
                    {calendar.days.map((day, index) => <MenuItem key={index} value={day < 10 ? '0' + day : day}>{day}</MenuItem>)}
                </Field>
            </Grid>
            <Grid
                item
                md={FeiledWidth}
                xs={FeiledWidth}
                className="custom-label-field"
            >
                <Field
                    fullWidth
                    label="الشهر*"
                    // name="month"
                    name={fieldName === null ? "month" : `${fieldName}.month`}
                    component={Select}
                    id="demo-simple-select-outlined"
                    required
                    disabled={disabled}
                    dir="rtl"
                    className="custom-field"
                    variant="outlined"
                    formControlProps={{ fullWidth: true }}
                >
                    {calendar.months.map((month, index) => <MenuItem key={index} value={month < 10 ? '0' + month : month}>{month}</MenuItem>)}
                </Field>
            </Grid>
            <Grid
                item
                md={FeiledWidth}
                xs={FeiledWidth}
                className="custom-label-field"
            >
                <Field
                    fullWidth
                    label="السنة*"
                    // name="year"
                    name={fieldName === null ? "year" : `${fieldName}.year`}
                    component={Select}
                    disabled={disabled}
                    required
                    dir="rtl"
                    className="custom-field"
                    variant="outlined"
                    formControlProps={{ fullWidth: true }}
                >
                    {calendar.years.map((year, index) => <MenuItem key={index} value={year}>{year}</MenuItem>)}
                </Field>
            </Grid>
        </Grid>
    )
}


export default Calendar
Calendar.propTypes = {
    FeiledWidth: PropTypes.number.isRequired,
    fieldName: PropTypes.object,
    yearCalender: PropTypes.object,
    gridSize: PropTypes.number,
    disabled: PropTypes.bool,
};
