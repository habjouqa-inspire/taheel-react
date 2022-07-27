import React, { useReducer, useCallback } from "react"
import {
    Box,
    Button,
    Grid,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TableDataViewEnum from "./TableDataViewEnum";
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types'
import IconsTypeEnum from "./IconsTypeEnum";
import IconsList from "../FieldsInputs/IconsList";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            display: 'flex',
            justifyContent: "center",
            flex: 1,
            flexDirection: "row"
        },
    },
    pagination: {
        alignItems: 'center',
        justify: 'center',
    },
    row: {
        display: 'flex',
        flexDirection: "row"
    },
    container: {
        maxHeight: '600px',
    },
    headerStyle: {
        background: 'blue',
        borderBlockColor: 'black'
    }
}));

export function TablePaginationObject(dataViewType) {
    function reducer(pagination, action) {
        if (!!action.payload.startIndex)
            return { ...pagination, batchSize: action.payload.startIndex }
        else if (!!action.payload.batchSize)
            return { ...pagination, pageNo: 1, startIndex: 1, batchSize: action.payload.batchSize }
        else if (!!action.payload.pageNo)
            return { ...pagination, startIndex: ((action.payload.pageNo - 1) * pagination.batchSize + 1), pageNo: action.payload.pageNo }
        else if (!!action.payload.dataViewType) {
            return initialData(action.payload.dataViewType)
        } else if (!!action.payload.filters) {
            const filters = action.payload.filters
            return { ...pagination, filters: { filters } }
        } else {
            return pagination
        }
    }
    function initialData(dataViewType) {
        switch (dataViewType) {
            case TableDataViewEnum.ALL_DATA:
                return {
                    batchSize: '',
                    startIndex: 1,
                    pageNo: 1,
                    dataViewType: dataViewType
                }
            default:
                return {
                    batchSize: 5,
                    startIndex: 1,
                    pageNo: 1,
                    dataViewType: dataViewType
                }
        }
    }
    const [pagination, dispatch] = useReducer(reducer, useCallback(
        initialData(dataViewType)
    ))
    return { pagination, dispatch }
}

export function PaginationDraw(props) {

    const classes = useStyles();
    const TPObject = props.TPObject, totalCount = props.totalCount, loading = props.loading

    const handleChange = (event, value) => {
        TPObject.dispatch({ payload: { pageNo: value } })
    };
    switch (!!TPObject ? TPObject.pagination.dataViewType : null) {
        case TableDataViewEnum.PAGINATION_DATA:
            return (
                (
                    <Box margin={1}>
                        <Typography>إجمالي النتائج : {totalCount}</Typography>
                        <Box className={classes.row}>
                            <Box className={classes.row}>
                                <Typography> عدد النتائج المعروضه <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={TPObject.pagination.batchSize}
                                    onChange={(e) =>
                                        TPObject.dispatch({ payload: { batchSize: e.target.value } })
                                    }
                                >
                                    {Array.from({ length: totalCount >= 5 ?(totalCount + 1) / 5 + 1 : 1 }, (_, i) => 5 + (i * 5)).map((count, idx) =>
                                        <MenuItem key={idx} value={count > totalCount ? totalCount : count}>{count > totalCount ? totalCount : count}</MenuItem>
                                    )}
                                </Select></Typography>
                            </Box>
                            <Box className={classes.root} width="60%" >
                                <Pagination
                                    className={classes.pagination}
                                    count={Math.ceil(totalCount / TPObject.pagination.batchSize)}
                                    page={TPObject.pagination.pageNo}
                                    showFirstButton={true}
                                    showLastButton={true}
                                    onChange={handleChange}
                                    variant="outlined"
                                    color="primary" />
                            </Box>
                        </Box>
                    </Box>
                )
            )
        case TableDataViewEnum.ONLY_FIVE:
            return (
                loading ?
                    (
                        <Skeleton />
                    ) : (
                        <Grid container direction='row-reverse'>
                            <Box m={3} >
                                <Button
                                    color="primary"
                                    onClick={() => TPObject.dispatch({ payload: { dataViewType: TableDataViewEnum.ALL_DATA } })}
                                >
                                    <IconsList iconType={IconsTypeEnum.ARROW_LEFT_ICON} label='عرض الجميع' />
                                </Button>
                            </Box>
                        </Grid>
                    )
            )
        default:
            return ('')
    }
}
PaginationDraw.propTypes = {
    totalCount: PropTypes.number,
    loading: PropTypes.bool,
    TPObject: PropTypes.object,
}