import PropTypes from 'prop-types'
import { DownloadBtn } from 'src/Modules/CenterServices/FinalLicense/Utils/finalLicenseUtil';
import Skeleton from '@material-ui/lab/Skeleton';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Grid,
    Table,
    Paper,
    TableBody,
    TableCell,
    TableHead,
    Card,
    TableRow,
    Badge,
    Typography,
} from '@material-ui/core';
import FieldsCreator from '../FieldsCreator';
import FieldsEnum from '../Utils/FieldsEnum';
import ContentField from './ContentField';

const getFieldData = (recordData, data, idx) => {
    let val = ''
    if (data.type === 'Select' || data.type === 'Radio') {
        val = getFieldValue({ recordData, options })
    } else {
        if (!!data.valueFunc) { data.valueFunc(tableData) }
        else if (!!data.attrFunc && !!''.concat(recordData)) {
            val = data.attrFunc(recordData[data.attr])
        } else if (!!data.recordFunc && !!''.concat(recordData)) { val = data.recordFunc(recordData) }
        else {
            val = recordData[data.attr]
        }
        if (data.type === 'file') { // after getting the value we will return  the button to download
            return val ? <DownloadBtn index={idx} docID={val} /> : <Typography>لا يوجد</Typography>
        }
    }
    return val
}
const getFieldValue = ({ value, options }) => {
    if (value === '')
        return ''
    const filteredvalue = options.filter(option => option.value === value)
    if ([].concat(filteredvalue).length > 0)
        return filteredvalue[0].label.ar
    return value;
}
export default function DataTable(props) {
    const { isLoading, values, tableShcema, gridSize, name } = props
    const tableData = !!values ? values[name] : []
    return (
        <Grid item xs={gridSize}>
            <PerfectScrollbar>
                <Paper container >
                    {isLoading ?
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
                                    (Array.from(new Array(2)).map((d, idx) => (
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
                                    {tableShcema?.schema.map((data) => (
                                        <TableCell key={data.id} sortDirection="desc">
                                            {data?.label?.ar}
                                        </TableCell>
                                    ))}
                                    {!!tableShcema?.actions?.label &&
                                        (
                                            <TableCell key="btnsColumn">
                                                {tableShcema?.actions?.label?.ar}
                                            </TableCell>
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tableData && tableData?.map((recordData, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                key={index}
                                            >
                                                {tableShcema?.schema?.map((data, idx) => {
                                                    let val = ''
                                                    if (!!recordData) {
                                                        val = getFieldData(recordData, data, idx)
                                                    }

                                                    return (
                                                        <TableCell key={idx}>
                                                            {(data?.type === FieldsEnum.MULTI_LINE_TEXT) ?
                                                                (ContentField({ ...data, name: data.attr, tLabel: '', values: recordData })
                                                                ) : (val)}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        )
                                    })
                                }
                                {!isLoading && (tableData?.length === 0 || !tableData) ? (
                                    <TableRow hover>
                                        <TableCell colSpan={8} >
                                            <p style={{ textAlign: 'center' }} >لا توجد بيانات </p>
                                        </TableCell>
                                    </TableRow>) : <></>}
                            </TableBody>
                        </Table>)
                    }
                </Paper>
            </PerfectScrollbar>
        </Grid>
    )
}
DataTable.propTypes = {
    tLabel: PropTypes.string,
    handleChange: PropTypes.func,
    valueFunc: PropTypes.func,
    gridSize: PropTypes.string,
    rows: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    multiline: PropTypes.bool,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    tableShcema: PropTypes.object,
    values: PropTypes.object,
}