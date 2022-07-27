import { useState } from 'react';
import {
    Button,
    Box,
    Grid,
    TableCell,
    IconButton,
} from '@material-ui/core';
import PropTypes from 'prop-types'
import FormCreator from '../FormCreator';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import IconsList from '../FieldsInputs/IconsList';
import { getValuesFromFilter } from './CoreUtils';

export function FilterCreator(props) {
    const tableShcema = props.schema, TPObject = props.TPObject, loading = props.loading, initValues = props.initValues
    const [filterData, setfilterData] = useState(/*() => {
         return tableShcema.schema.map((data) => {
                return {
                    fieldName: data.attrName,
                    fieldValue: ''
                }
        }) 
    }*/)
    let filterSchema = tableShcema.schema.filter((data) => (!!data.filter))

    function handleFilterData(value, fieldName, operator) {
        setfilterData(() => {
            value = value.trim();
            if (!!value) {
                if (filterData) {
                    let currentData = filterData.filter(data => data.fieldName === fieldName);
                    if (operator === 'between') {
                        if (e.target.name = 'from') {
                            if (!!currentData[0]) {
                                return filterData.filter(data => data.fieldName !== fieldName).concat({ ...currentData, fieldValue: [currentData.fieldValue[0], value] })
                            } else {
                                return [{ fieldName: fieldName, fieldValue: [new Date(0), value], operator: operator }]
                            }
                        } else {
                            if (!!currentData) {
                                return filterData.filter(data => data.fieldName !== fieldName).concat({ ...currentData, fieldValue: [value, currentData.fieldValue[1]] })
                            } else {
                                return [{ fieldName: fieldName, fieldValue: [value, new Date(9000)], operator: operator }]
                            }
                        }
                    } else {
                        return filterData.filter(data => data.fieldName !== fieldName).concat({ fieldName: fieldName, fieldValue: value, operator: operator })
                    }
                } else {
                    return [{ fieldName: fieldName, fieldValue: value, operator: operator }]

                }
            } else {
                return filterData.filter(data => data.fieldName !== fieldName)
            }
        })
    }
    let schema = []
    schema = schema.concat(filterSchema.map(field => {
        return { ...field, handleChange: handleFilterData, name: field['name'] }
    }));
    const onSubmit = () => TPObject.dispatch({ payload: { filters: filterData } })
    const submitInfo = { btnName: 'بحث', onSubmit: onSubmit }
    const title = 'فلترة'
    return (schema?.length > 0 ? (
        <>
            {
                loading ?
                    <Skeleton /> :
                    <Box style={{ pointerEvents: loading ? "none" : '' }}>
                        <FormCreator schema={schema} title={title} submitInfo={submitInfo} initValues={getValuesFromFilter(TPObject.pagination.filters?.filters)
                        } />
                    </Box>
            }
        </>) : ('')
    )
}

export function TableButtonsDraw(props) {

    let tableShcemaActions = props.actions
    let responseData = props.responseData
    let loading = props.loading
    let index = props.index


    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = (index, event) => {
        setAnchorEl({ [index]: event.currentTarget });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    let tLabel, btnsLabels = []
    tableShcemaActions.buttons.map((button, idx) => {
        tLabel = button?.labelFunc ? button.labelFunc(responseData) : button?.label?.ar
        if (!!tLabel) {
            btnsLabels.push(tLabel)
        } else {
            btnsLabels.push(null)
        }
    })
    if (!!tableShcemaActions?.buttons) {
        if (tableShcemaActions.type === 'MoreVertIcon') {
            return (
                <TableCell key={index}>
                    {!!btnsLabels?.filter(n => n)?.length > 0 ? (
                        loading ? (<Skeleton />) :
                            <>
                                <IconButton aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => handleClick(index, e)}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl && anchorEl[index]}
                                    keepMounted
                                    open={Boolean(anchorEl && anchorEl[index])}
                                    backgroundColor="primary"
                                    onClose={handleClose}
                                    margin={1}
                                    spacing={1}
                                >
                                    {
                                        tableShcemaActions.buttons.map((button, idx) => {
                                            return (!!btnsLabels[idx] ?
                                                < Grid item key={idx} >
                                                    <Button
                                                        color="primary"
                                                        key={button.id}
                                                        onClick={() => button.btnFun(responseData, props.otherFunc)}
                                                    >
                                                        {button ? <IconsList iconType={!!button.iconTagFunc ? button.iconTagFunc(responseData) : button.iconTag} label={btnsLabels[idx]} color={button.color} /> : <Skeleton />}
                                                    </Button>
                                                </Grid> : null)
                                        })}
                                </Menu></>
                    ) : null}
                </TableCell >
            )
        } else {
            return (
                <TableCell key={index}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{ padding: '10px' }}
                    > {tableShcemaActions.buttons.map((button) => (
                        <Button
                            fullWidth={true}
                            onClick={() => button.btnFun(responseData, props.otherFunc)}
                            key={button.id}
                            startIcon={!!responseData ? <IconsList iconType={!!button.iconTagFunc ? button.iconTagFunc(responseData) : button.iconTag} color={button.color} /> : (<Skeleton />)}
                        >
                            {button.label.ar}
                        </Button>

                    ))}
                    </Grid>
                </TableCell>
            )
        }
    }
    return ''
}

TableButtonsDraw.propTypes = {
    actions: PropTypes.object,
    responseData: PropTypes.object,
    loading: PropTypes.bool,
    otherFunc: PropTypes.func,
}
FilterCreator.propTypes = {
    initValues: PropTypes.object,
    schema: PropTypes.object,
    loading: PropTypes.bool,
    TPObject: PropTypes.object,
}