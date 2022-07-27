import { Field } from 'react-final-form';
import { TextField as TextFieldFinal, Select, Radio } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import {
    Typography,
    MenuItem,
    Grid,
} from '@material-ui/core';
import { useEffect } from 'react';
import { OnChange } from 'react-final-form-listeners';


const TimePicker = ({ FeiledWidth, fieldName, disabled = false, from ,prevTime}) => {
    const Time = {
        hours: [],
        minutes: [],
    };

    const TimePeriod = (type, start, end) => {
        for (let i = start; i <= end; i++) {
            type.push(i);
        }
    };
    TimePeriod(Time.hours, parseInt(from?.hour) || 6, 22);
    TimePeriod(Time.minutes, parseInt(from?.minute) || 0, 59);

    useEffect(() => {
        console.log(`--- disabled ${disabled}`);
    }, [])

    return (
        <>
            <Grid
                item
                md={FeiledWidth}
                xs={FeiledWidth}
                className="custom-label-field"
            >
                <Field
                    label="الدقيقة*"
                    // name="minute"
                    name={fieldName === null ? "minute" : `${fieldName}.minute`}
                    component={Select}
                    required
                    dir="rtl"
                    disabled={disabled}
                    className="custom-field"
                    variant="outlined"
                    formControlProps={{ fullWidth: true }}
                    defaultValue={prevTime?.minute}
                >
                    {Time.minutes.map((minute, index) => <MenuItem key={index} value={minute < 10 ? '0'.concat(minute) : ''.concat(minute)}>{minute <= 9 ? <>0{minute}</> : <>{minute}</>}</MenuItem>)}
                </Field>
            </Grid>
            <Grid
                item
                md={FeiledWidth}
                xs={FeiledWidth}
                className="custom-label-field"
            >
                <Field
                    label="الساعة*"
                    // name="hour"
                    name={fieldName === null ? "hour" : `${fieldName}.hour`}
                    component={Select}
                    id="demo-simple-select-outlined"
                    required
                    disabled={disabled}
                    dir="rtl"
                    className="custom-field"
                    variant="outlined"
                    formControlProps={{ fullWidth: true }}
                    defaultValue={prevTime?.hour}
                >
                    {Time.hours.map((hour, index) => <MenuItem key={index} value={hour < 10 ? '0'.concat(hour) : ''.concat(hour)}>{hour <= 9 ? <>0{hour}</> : <>{hour}</>}</MenuItem>)}
                </Field>
            </Grid>
        </>
    )
}


export default TimePicker
TimePicker.propTypes = {
    FeiledWidth: PropTypes.number.isRequired,
    fieldName: PropTypes.object,
    disabled: PropTypes.bool,
    from: PropTypes.object,
    values: PropTypes.object,
    prevTime: PropTypes.object,

};
