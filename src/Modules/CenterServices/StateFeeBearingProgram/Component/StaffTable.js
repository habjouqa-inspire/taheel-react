import { Collapse, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import moment from "moment";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { FieldArray } from "react-final-form-arrays";
import { staffTypes } from "src/Core/Utils/TaheelUtils";
import { DownloadButtTable } from "../../FinalLicense/Utils/finalLicenseUtil";


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const StaffTable = ({ values, isViewPage }) => {

    const Row = ({ fields, name,index }) => {
        console.log("nameeeee", name)
        let staffType = name.StaffType
        staffType = staffTypes[name.StaffType]
        const classes = useRowStyles();
        const [showen, setShowen] = useState(true);
        return (
            <>
                <TableRow className={classes.root} key={name}>

                    <TableCell component="th" scope="row">
                        {name.name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                        {name.idNumber ? name.idNumber : name.idNumIqamaNum}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {moment(`${name.birthDate}`, 'iYYYYiMMiDD').format('DD/MM/YYYY')}
                    </TableCell>

                    <TableCell component="th" scope="row">
                        {name.gender}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {name.nationality}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {staffType}
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={() => setShowen(!showen)}>
                            {showen ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </TableCell>

                </TableRow>
                <TableRow >
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                        <Collapse in={!showen} className={`Attach${index}`} timeout="auto" unmountOnExit  >

                            <Grid
                                container
                            >
                                {name.CV && (<Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xs={12}
                                >
                                    < DownloadButtTable docIDs={name.CV} name={`${name}.CV`} label='السيرة الذاتية' />

                                </Grid>)}
                                {name.educationQualifications && (<Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xs={12}
                                >
                                    < DownloadButtTable docIDs={name.educationQualifications} name={`${name}.educationalQualification`} label='المؤهلات التعليمية' />

                                </Grid>)}
                                {name.professionalLicense && (<Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xs={12}
                                >
                                    < DownloadButtTable docIDs={name.professionalLicense} name={`${name}.professionalLicense`} label='رخصة المزاولة' />

                                </Grid>)}
                            </Grid>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        )
    }
    return (
        Array.isArray(values?.customers) && values.customers.length > 0 &&
        <>
            {console.log('in section staff')}
            <Typography
                sx={{ fontWeight: 'bold', fontSize: 20 }}
                color="textPrimary"
                gutterBottom
                mb={4}
                mt={6}
                variant="h5"
                component="h2"
            >
                معلومات الكادر
                <Divider />
            </Typography>

            <Grid
                container
            >
                <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                >
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell> الاسم الكامل </TableCell>
                                    <TableCell> رقم الهوية / الإقامة </TableCell>
                                    <TableCell > تاريخ الميلاد </TableCell>
                                    <TableCell> الجنس </TableCell>
                                    <TableCell> الجنسية</TableCell>
                                    <TableCell> نوع الكادر </TableCell>
                                    <TableCell> المرفقات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isViewPage ?
                                    <>
                                        {values.customers.map((name, index) => (
                                            <Row key={index} name={name} index={index} />
                                        ))}
                                    </> :
                                    <FieldArray name="customers">
                                        {({ fields }) => fields && fields.value && fields.value.map((name, index) => (
                                            console.log("inside FieldArray ==> fields:", fields),
                                            <Row key={index} fields={fields} name={name} index={index} />
                                        ))}
                                    </FieldArray>}

                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
            </Grid>
            <Divider />
        </>

    )

}
export default StaffTable;

StaffTable.propTypes = {
    values: PropTypes.object,
    index: PropTypes.number,
    name: PropTypes.string,
    fields: PropTypes.object,
    isViewPage: PropTypes.bool,
    setSponsorName: PropTypes.func
}