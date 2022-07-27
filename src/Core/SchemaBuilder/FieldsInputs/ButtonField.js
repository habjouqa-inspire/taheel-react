import { Button, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types'

export default function ButtonField(props) {
    const gridSize = !!props.gridSize ? props.gridSize : 12
    return (
        <Grid item md={gridSize} >
            <Button
                variant="contained"
                color={props.color}
                fullWidth={true}
                type="submit"
                size="large"
                fontSize="large"
                onClick={(e) => { e.preventDefault(); props?.onClick(props) }}
                disabled={props.funcLoading || props.disabled}
            >
                {props.funcLoading && <CircularProgress size={25} style={{ color: 'green' }} />}
                {props?.label?.ar || props?.btnName?.props?.label}
            </Button >
        </Grid>
    );
}
ButtonField.propTypes = {
    label: PropTypes.object,
    values: PropTypes.object,
    funcLoading: PropTypes.bool,
    onClick: PropTypes.func,
    setErrMessage: PropTypes.func,
    setFuncLoading: PropTypes.func,
    btnName: PropTypes.object,
    color: PropTypes.string,
    gridSize: PropTypes.number,
    disabled: PropTypes.bool,
    setField: PropTypes.func,
}