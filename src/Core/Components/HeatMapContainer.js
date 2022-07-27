import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import WithGoogleApi from './gmap/WithGoogleApi';
import GmapsAddress from './gmap/GmapsAddress';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import HeatMapAddress from './gmap/HeatMapAddress';

const sampleData = {
    vendorStreetAddress: {
        caption: '7596 الديوان، الحمراء، الرياض 132162802، السعودية',
        heart: { lat: 24.774265, lng: 46.738586 }
    },
    vendorServiceAreas: [
        {
            caption: 'Kendall, Fl',
            heart: { lat: 25.664112, lng: -80.356857 },
            polygon: [
                { lat: 25.634253, lng: -80.388439 },
                { lat: 25.632716, lng: -80.309863 },
                { lat: 25.705581, lng: -80.304534 },
                { lat: 25.703632, lng: -80.387227 }
            ]
        },
        {
            caption: 'Coral Gables, Fl',
            heart: { lat: 25.746895, lng: -80.267322 },
            polygon: [
                { lat: 25.633666, lng: -80.303403 },
                { lat: 25.628092, lng: -80.28007 },
                { lat: 25.706354, lng: -80.242616 },
                { lat: 25.772882, lng: -80.254253 },
                { lat: 25.764537, lng: -80.288614 }
            ]
        }
    ]
};

const HeatMapContainer = ({
    isLoading,
    setErrMessage,
    setField,
    values,
    pauseMarker = false,
    showChipAreaPicker = false,
    title = 'إحصائية مراكز مسجلة في برنامج تحمل الدولة للرسوم الفعالة والطلاب المسجلين في تلك المراكز والغير مسجلين',
    newAddress,
    markers,
    mapCenterPosition
}) => {
    const [googleConected, setGoogleConected] = useState(true);
    useState(async () => {
        try {
            const queryParams = {
                pb: '!1m5!1m4!1i15!2i20636!3i14054!4i256!2m3!1e0!2sm!3i584309902!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2',
                token: '123008',
                key: `{process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            }
            const apiResponse = await axios.get(`https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i15!2i20636!3i14054!4i256!2m3!1e0!2sm!3i584309902!3m12!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!4e0!5m1!5f2`, { params: { ...queryParams } });
            setGoogleConected(true)
        } catch (err) {
            console.log("err ", err)
            setGoogleConected(false)
        }

    }, [])
    const [streetAddr, setStreetAddr] = useState(() => {
        if (!!values?.address) {
            return values.address;
        }

        return sampleData.vendorStreetAddress;
    });

    const getStreetAddrPartsFromGeoResult = (geoResult) => {
        if (geoResult === null) {
            //setErrMessage('الرجاء اختيار موقع داخل حدود المملكة العربية السعودية');
            return streetAddr;
        }

        const addressArray = geoResult?.address_components;
        let currentAddress = {
            area: '',
            country: '',
            street: '',
            streetNumber: '',
            postalCode: '',
            postalCodeSuffix: '',
            city: '',
            state: '',
            address: '',
            lat: '',
            lng: '',
            setCity: false,
            setSub: false
        };
        if (addressArray?.filter((x) => x.types[0] === 'country')[0]?.long_name === 'السعودية') {
            //setErrMessage('');
            currentAddress = {
                area:
                    (
                        addressArray.find((x) =>
                            x.types.some((t) =>
                                ['sublocality_level_1', 'locality'].includes(t)
                            )
                        ) || {}
                    ).long_name || '',
                country:
                    (addressArray.find((x) => x.types[0] === 'country') || {})
                        .long_name || '',
                street:
                    (addressArray.find((x) => x.types[0] === 'route') || {}).long_name ||
                    '',
                streetNumber:
                    (addressArray.find((x) => x.types[0] === 'street_number') || {})
                        .long_name || '',
                postalCode:
                    (addressArray.find((x) => x.types[0] === 'postal_code') || {})
                        .long_name || '',
                postalCodeSuffix:
                    (addressArray.find((x) => x.types[0] === 'postal_code_suffix') || {})
                        .long_name || '',
                city:
                    (
                        addressArray.find(
                            (x) => x.types[0] === 'administrative_area_level_2'
                        ) || {}
                    ).long_name || '',
                state:
                    (
                        addressArray.find(
                            (x) => x.types[0] === 'administrative_area_level_1'
                        ) || {}
                    ).long_name || '',
                address: geoResult.formatted_address,
                lat: geoResult.geometry.location.lat,
                lng: geoResult.geometry.location.lng
            };
            setStreetAddr(currentAddress);
        }
        return currentAddress;
    };
    return isLoading ? (
        <Skeleton
            animation="wave"
            height={15}
            width="20%"
            style={{ marginBottom: 6 }}
        />
    ) : (
        <Grid item md={12} xs={12}>
            {newAddress ? (
                <Typography
                    gutterBottom
                    variant="body2"
                    color="textSecondary"
                    component="p"
                >
                    احصائية مراكز
                </Typography>
            ) : (
                <Typography
                    gutterBottom
                    variant="body2"
                    color="textSecondary"
                    component="p"
                >
                    {title}
                </Typography>
            )}
            {googleConected ? (
                <WithGoogleApi apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <HeatMapAddress
                        showChipAreaPicker={showChipAreaPicker}
                        pauseMarker={pauseMarker}
                        placeAddress="سعودية"
                        //setErrMessage={(errMessage) => setErrMessage(errMessage)}
                        value={streetAddr}
                        getStreetAddrPartsFromGeoResultMine={getStreetAddrPartsFromGeoResult}
                        markers={markers}
                        mapCenterPosition={mapCenterPosition}
                    />
                </WithGoogleApi>
            )
                :
                (<div className="error-screen">
                    <p style={{ color: '#f00' }}>Please enable internet to activate google maps features</p>
                </div>)
            }
        </Grid>
    );
};

HeatMapContainer.propTypes = {
    setErrMessage: PropTypes.func.isRequired,
    setField: PropTypes.func.isRequired,
    values: PropTypes.object,
    pauseMarker: PropTypes.bool,
    showChipAreaPicker: PropTypes.bool,
    title: PropTypes.string,
    isLoading: PropTypes.bool,
    newAddress: PropTypes.bool,
    markers:PropTypes.array,
    mapCenterPosition:PropTypes.object,
};

export default HeatMapContainer;
