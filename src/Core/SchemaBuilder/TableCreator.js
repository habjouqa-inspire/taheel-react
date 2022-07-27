import React from 'react';
import { useNavigate } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Container,
    Grid,
    Alert,
    CardHeader,
    CardContent,
    Divider,
    Table,
    Paper,
    TableBody,
    TableCell,
    TableHead,
    Card,
    TableRow,
    Badge,
    TextField,
    Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { PaginationDraw } from './Utils/TablePagination';
import { FilterCreator, TableButtonsDraw } from './Utils/TableDrawUtils';
import PropTypes from 'prop-types'
import IconsTypeEnum from './Utils/IconsTypeEnum'
import Fab from '@mui/material/Fab';
import IconsList from './FieldsInputs/IconsList'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { a11yProps } from 'src/Core/SchemaBuilder/FieldsInputs/TabPanel'
import { getContentValue, getOptions } from './Utils/CoreUtils';
import FieldsCreator from './FieldsCreator';
import FieldsEnum from './Utils/FieldsEnum';
import { TabContext, TabList } from '@material-ui/lab';

export default function TableCreator({
    pageTitle,
    tableTitle,
    tableShcema,
    dataTable,
    totalCount,
    loading,
    selectedTab,
    setTab,
    TPObject,
    errMessage,
    otherFunc,
    navBackUrl,
    lookupObject,
    action,
    useValue = [],
    tabValues,
    addtionalFieldTop
}) {
    const navigateion = useNavigate()
    const [value, setValue] = useValue
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ p: 3 }}>
            <Card style={{ padding: "20px", minHeight: "100%" }}>
                {!!pageTitle ?
                    <>
                        <CardHeader
                            title={!!navBackUrl ?
                                (
                                    <Grid container spacing={4}>
                                        <Grid item>
                                            <Badge
                                                badgeContent={
                                                    < Fab size="small" color="primary" aria-label="add" onClick={() => navigateion(navBackUrl.url, { state: navBackUrl.state })}>
                                                        <IconsList iconType={IconsTypeEnum.ARROW_FORWARD_ICON} color="info" />
                                                    </Fab>}
                                                onClick={() =>
                                                    navigateion(navBackUrl.url, { state: navBackUrl.state })
                                                }
                                            >
                                            </Badge>
                                        </Grid>
                                        <Grid item><p style={{ fontWeight: "bold" }} >{pageTitle} </p> </Grid>
                                    </Grid>
                                )
                                :
                                <p style={{ fontWeight: "bold" }} >{pageTitle} </p>
                            }
                        />
                        <Divider />
                    </> : <></>}

                <CardContent >
                    <Container maxWidth="lg" >
                        {errMessage && (
                            <Alert variant="outlined" severity={!!errMessage.type ? errMessage.type : "error"}>
                                {!!errMessage.msg ? errMessage.msg : errMessage}
                            </Alert>)
                        }
                        <Grid
                            container
                            lg={12}
                            md={6}
                            xs={12}
                            marginTop={3}
                            spacing={3}
                        >
                            {addtionalFieldTop} {/*for filters in request*/}

                            <Grid item
                                lg={12}
                                md={12}
                                xs={12}
                                marginBottom={3}
                            >
                                <Box
                                    alignItems="right">
                                    <TabContext md={6} value={selectedTab} >
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList
                                            >
                                                {tabValues?.map((tab, idx) => (
                                                    <Tab
                                                        key={idx}
                                                        style={{ width: '18%' }}
                                                        label={tab?.label}
                                                        value={tab?.value}
                                                        onClick={() => setTab(tab?.value)}
                                                    />
                                                ))}

                                            </TabList>
                                        </Box>
                                    </TabContext></Box>
                                <FilterCreator schema={tableShcema} TPObject={TPObject} loading={loading} />

                                <Card>

                                    {!!tableTitle ?
                                        <CardHeader title={
                                            loading ? (
                                                <Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />
                                            ) : (
                                                Array.isArray(tableTitle) ?
                                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                        {tableTitle.map((t, idx) => {
                                                            return <Tab key={idx} label={t.tableTitle} {...a11yProps(idx)} />
                                                        })}
                                                    </Tabs> :
                                                    tableTitle
                                            )
                                        }
                                            action={action}
                                        /> : <></>}
                                    <Divider />
                                    <PerfectScrollbar>
                                        <Paper container >
                                            {loading ?
                                                (< Table >
                                                    <TableHead >
                                                        <TableRow
                                                            hover
                                                        > {
                                                                (Array.from(new Array(4)).map((d, idx) => (

                                                                    <TableCell key={idx}>
                                                                        <Skeleton />
                                                                    </TableCell>
                                                                )))
                                                            }
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            (Array.from(new Array(4)).map((d, idx) => (
                                                                <TableRow
                                                                    hover
                                                                    key={idx}
                                                                >
                                                                    {
                                                                        (Array.from(new Array(4)).map((d, idx) => (
                                                                            <TableCell key={idx}>
                                                                                <Skeleton />
                                                                            </TableCell>))
                                                                        )
                                                                    }
                                                                </TableRow>
                                                            )))
                                                        }
                                                    </TableBody>
                                                </Table>)
                                                :
                                                (<Table >
                                                    <TableHead >
                                                        <TableRow>
                                                            {tableShcema.schema.map((data) => (
                                                                <TableCell key={data.id} sortDirection="desc">
                                                                    {data?.label?.ar}
                                                                </TableCell>
                                                            ))}
                                                            {!!tableShcema?.actions?.label?.ar ?
                                                                (
                                                                    <TableCell key="btnsColumn">
                                                                        {tableShcema?.actions?.label?.ar}
                                                                    </TableCell>
                                                                ) :
                                                                (<TableCell key="btnsColumn">
                                                                </TableCell>)
                                                            }
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            (((dataTable)?.map((responseData, index) => {
                                                                return (
                                                                    <TableRow
                                                                        hover
                                                                        key={responseData ? responseData.requestNum : index}
                                                                    >
                                                                        {tableShcema.schema.map((data, idx) => {
                                                                            let val = ''
                                                                            if (!!responseData) {
                                                                                if (data.type === 'Select' || data.type === 'Radio') {
                                                                                    data.options = !!lookupObject ? getOptions(lookupObject, data) : data.options
                                                                                }
                                                                                val = getContentValue({ ...data, values: responseData, isLoading: false });

                                                                            }
                                                                            return (
                                                                                <TableCell key={idx}>
                                                                                    {responseData ?
                                                                                        (data?.type === FieldsEnum.FILE_FILED || data?.type === FieldsEnum.MULTI_LINE_TEXT) ?
                                                                                            (<FieldsCreator schema={[{ ...data, label: { ar: '' } }]} formType="view" values={responseData} />
                                                                                            ) : (val) : (
                                                                                            <Skeleton />
                                                                                        )
                                                                                    }
                                                                                </TableCell>
                                                                            )
                                                                        })}
                                                                        {!loading ? <TableButtonsDraw otherFunc={otherFunc} actions={tableShcema.actions} responseData={responseData} loading={loading} index={index} /> : ''}
                                                                    </TableRow>
                                                                )
                                                            })
                                                            )
                                                            )
                                                        }
                                                        {!loading && (dataTable?.length === 0 || !dataTable) ? (
                                                            <TableRow hover>
                                                                <TableCell colSpan={8} >
                                                                    <p style={{ textAlign: 'center' }} >لا توجد بيانات </p>
                                                                </TableCell>
                                                            </TableRow>) : <></>}
                                                    </TableBody>
                                                </Table>)
                                            }
                                        </Paper>
                                        {loading ? <Skeleton /> : dataTable?.length === 0 || !dataTable ? '' : <PaginationDraw totalCount={totalCount} TPObject={TPObject} loading={loading} />}
                                    </PerfectScrollbar>
                                </Card>
                            </Grid >
                        </Grid>
                    </Container >
                </CardContent>
            </Card>
        </Box>
    )

}
TableCreator.propTypes = {
    navBackUrl: PropTypes.string,
    pageTitle: PropTypes.string,
    tableTitle: PropTypes.string,
    tableShcema: PropTypes.object,
    dataTable: PropTypes.array,
    addtionalFieldTop: PropTypes.any,
    tabValues: PropTypes.array,
    selectedTab: PropTypes.any,
    setTab: PropTypes.any,

    totalCount: PropTypes.number,
    loading: PropTypes.bool,
    TPObject: PropTypes.object,
    lookupObject: PropTypes.object,
    errMessage: PropTypes.string,
    otherFunc: PropTypes.func,
    action: PropTypes.object,
    useValue: PropTypes.array,
}