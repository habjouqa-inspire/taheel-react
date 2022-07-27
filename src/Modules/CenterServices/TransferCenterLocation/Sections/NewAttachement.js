/* eslint-disable */
import {
    Button,
    Grid,
    Typography
} from '@material-ui/core';
import moment from 'moment-hijri';
import { useState } from 'react';
import { Field } from 'react-final-form';
import Calendar from 'src/Core/Components/calendar';
import FileUploaderComp from '../../FinalLicense/Components/FileUploader';

const NewAttachement = ({ setField, values, setIsEnableNextBtn }) => {

    const [errMessage, SetErrMessage] = useState('');
    // const [loading, setLoading] = useState(false);
    console.log('#==> values__values__values ' + JSON.stringify(values));

    const setDocument = (name, docID, multipleFile) => {
        if (!multipleFile) setField(name, [docID]);
        else {
            multipleFileDocs.push(docID);
            setField(name, multipleFileDocs);
        }
    };
    // setIsEnableNextBtn(true);

    return (
        <>
            <Grid container spacing={3} mt={3}>

                <Grid item md={12} xs={12}>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        // mb={4}
                        // mt={6}
                        variant="h4"
                    >
                        المتطلبات
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Field
                        label="رخصة البلدية  للموقع الجديد"
                        name="momraDoc"
                        component={FileUploaderComp}
                        multipleFile={false}
                        setField={setField}
                        setDocument={setDocument}
                        values={values}
                    />
                </Grid>


                <Grid item md={6} xs={12}>

                    <Grid
                        item
                        md={12}
                        xs={12}
                    >
                        <Field
                            label="تقرير مكتب هندسي معتمد (للمبنى الجديد)"
                            name="engineeringPlan"
                            component={FileUploaderComp}
                            multipleFile={false}
                            setField={setField}
                            setDocument={setDocument}
                            values={values}
                        />
                    </Grid>
                    <Grid
                        item
                        md={12}
                        xs={12}
                    >
                        <Button

                            onClick={() => {
                                window.open('https://saudieng.sa/Arabic/Inquiry/Pages/OfficeSearch.aspx');
                            }
                            }
                        >
                            (لإستعراض قائمة المكاتب الهندسية المقدمة اضغط هنا)
                        </Button>
                    </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Field
                        label="رخصة الدفاع المدني  (للمبنى الجديد)"
                        name="fireDepartmentLicense"
                        component={FileUploaderComp}
                        multipleFile={false}
                        setField={setField}
                        setDocument={setDocument}
                        values={values}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={2} mb={3}>
                <Grid item md={12} xs={12} style={{ paddingBottom: "20px" }}>
                    <Typography>تاريخ إنتهاء رخصة الدفاع المدني</Typography>
                </Grid>
                <Calendar
                    FeiledWidth={4}
                    fieldName={"fireDepartmentLicenseExpiryDate"}
                    yearCalender={{
                        start: moment().format('iYYYY'),
                        end: Number.parseInt(moment().format('iYYYY')) + 15
                    }}
                />
            </Grid>
        </>
    );
};

export default NewAttachement;
