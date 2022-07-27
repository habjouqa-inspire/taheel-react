import { Card, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import MapContainer from 'src/Core/Components/MapContainer';

export default function MapField(props) {
    const addressValue = props.valueFunc(props.values)
    if (props.formType === 'view' && !addressValue) {
        return null
    }
    let gridSize = !!props.gridSizeFunc ? props.gridSizeFunc(props.values) :
    (!!props.gridSize ? props.gridSize : 12);
    return (
        <Grid item md={gridSize} >
            <MapContainer
                isLoading={props.isLoading}
                setErrMessage={props.setErrMessage}
                newAddress={props.newAddress}
                values={{ address: addressValue }}
                pauseMarker={props.pauseMarker}
                title={props.tLabel}
                showChipAreaPicker={props.showChipAreaPicker}
                setField={props.setField}
            />
        </Grid>

    );


}
MapField.propTypes = {
    isLoading: PropTypes.bool,
    setErrMessage: PropTypes.func,
    values: PropTypes.object,
    pauseMarker: PropTypes.bool,
    tLabel: PropTypes.string,
    showChipAreaPicker: PropTypes.bool,
    setField: PropTypes.func,
    valueFunc: PropTypes.func,
    formType: PropTypes.string,
    newAddress: PropTypes.bool,
    gridSizeFunc: PropTypes.func,
    gridSize: PropTypes.number,


}


