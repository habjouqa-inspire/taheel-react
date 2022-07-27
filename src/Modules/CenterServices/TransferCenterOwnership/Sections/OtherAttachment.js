/* eslint-disable no-unused-vars */
import {
    Button, CircularProgress,
    Divider, Grid, Table, TableBody, TableCell, TableHead,
    TableRow, Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { TextField as TextFieldFinal } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FileUploaderComp from '../../FinalLicense/Components/FileUploader';
import { DownloadBtn } from '../../FinalLicense/Utils/finalLicenseUtil';


const OtherDocuments = ({ Condition, values, setField, setErrMessage, setIsEnableNextBtn }) => {
    useEffect(() => {
        setErrMessage('');
        setIsEnableNextBtn(true)
        return () => {
            setErrMessage('')
        }
    }, [])

    const [otherDocuments, setOtherDocuments] = useState(values.otherDocuments || []);

    const [clearUploadedFileName, setClearUploadedFileName] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    if (values.otherDocuments?.[0] === null) {
        setField('otherDocuments', null)
    }
    const addDocuments = () => {
        if (!values.description?.trim()) {
            return setErrMessage('يجب تعبئة حقل الوصف');
        } else if (!values.document) {
            return setErrMessage('يجب تعبئة حقل الملف');
        } else {
            setErrMessage('');
            setOtherDocuments(attchs => {
                const newAttchs = [...attchs, { description: values.description, document: values.document[0] }]
                setField('otherDocuments', newAttchs)
                return newAttchs;
            }
            );
            setField('description', null)
            setField('document', null)
            setClearUploadedFileName(true)
        }

    };
    const handleRemoveAttch = (document) => {
        setOtherDocuments(attchs => {
            const newAttchs = attchs.filter(item => (!!item.document[0] ? item.document[0] : item.document) !== (!!document[0] ? document[0] : document))
            setField('otherDocuments', newAttchs)
            return newAttchs;
        });

    };
    return (
        <>
            <Grid container spacing={1} style={{ paddingBottom: '20px' }} >
                <Grid item style={{ paddingTop: '20px', paddingBottom: '20px' }} >
                    <Box>
                        <Typography variant="h4" style={{ fontWeight: 'bold' }} flexItem>
                            ملفات أخرى
                        </Typography>
                        <Divider light flexItem />
                    </Box>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12} className="custom-label-field"></Grid>
                    <Grid item md={6} xs={12} className="custom-label-field">
                        <Field
                            fullWidth
                            required
                            label="الوصف"
                            name="description"
                            component={TextFieldFinal}
                            multiline
                            maxRows={4}
                            type="text"
                            variant="outlined"
                            dir="rtl"
                            className="custom-field"
                            formControlProps={{ fullWidth: true }}
                        />
                        <OnChange name="description">
                            {(value, previous) => {
                                setField('description', value);
                                setErrMessage('')
                            }}
                        </OnChange>
                    </Grid>
                    <Grid item md={6} xs={12} className="custom-label-field">
                        <Field
                            label="الملف"
                            name="document"
                            component={FileUploaderComp}
                            multipleFile={false}
                            setField={setField}
                            resetAttachment={() => {
                                setClearUploadedFileName(false)
                                return clearUploadedFileName
                            }}
                            values={values}
                        />
                        <OnChange name="document">
                            {(value, previous) => {
                                setErrMessage('')
                            }}
                        </OnChange>
                    </Grid>
                    <Grid item md={6} xs={12} className="custom-label-field">
                        <Button
                            startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
                            disabled={isLoading}
                            variant="outlined"
                            type="button"
                            sx={{
                                height: 55,
                                backgroundColor: 'white',
                                width: '100%',
                                color: '#3c8084',
                                ':hover': {
                                    backgroundColor: '#3c8084',
                                    color: 'white'
                                }
                            }}
                            onClick={() => {
                                addDocuments();
                            }}
                        >
                            إضافة ملف
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <PerfectScrollbar style={{ maxHeight: otherDocuments?.length >= 7 ? '500px' : '' }} >
                <Table stickyHeader={true}>
                    <TableHead >
                        <TableRow>
                            <TableCell colspan="2">
                                <Grid container justifyContent="center">
                                    الوصف
                                </Grid>
                            </TableCell>
                            <TableCell colspan="2">
                                <Grid container justifyContent="center">
                                    الملف
                                </Grid>
                            </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(otherDocuments?.length !== 0 && otherDocuments?.[0] !== null) && otherDocuments?.map((item, idx) => (
                            <Fragment key={idx}>
                                <TableRow key={idx}>
                                    <TableCell component="th" scope="row" colspan="2" >
                                        <Grid className="custom-label-field"><TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            defaultValue="Default Value"
                                            maxRows={4}
                                            disabled={true}
                                            value={item.description}
                                            fullWidth={true}
                                        /></Grid>
                                    </TableCell>
                                    <TableCell component="th" scope="row" colspan="2" align="justify" >
                                        <Grid container justifyContent="center">
                                            <DownloadBtn index={idx} docID={item.document} />
                                        </Grid>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Grid container justifyContent="center">
                                            <Button
                                                color="error"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleRemoveAttch(item.document)}
                                            >حذف</Button>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </Fragment>
                        ))}
                        {(otherDocuments?.length === 0 || otherDocuments?.[0] === null) &&
                            (<TableRow hover>
                                <TableCell colSpan={5} >
                                    <p style={{ textAlign: 'center' }} >لا توجد بيانات </p>
                                </TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </PerfectScrollbar>
        </>
    );
}
export default OtherDocuments;

OtherDocuments.propTypes = {
    Condition: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    setField: PropTypes.func.isRequired,
    setErrMessage: PropTypes.func.isRequired,
    setIsEnableNextBtn: PropTypes.func.isRequired,
};


