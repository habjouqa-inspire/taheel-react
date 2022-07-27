/* eslint-disable  */
import {
  Grid
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import FileUploaderComp from '../../FinalLicense/Components/FileUploader';

const Attachements = ({ setField, values, setIsEnableNextBtn }) => {
  var multipleFileDocs = []

  const setDocument = (name, docID, multipleFile) => {
    if (!multipleFile)
      setField(name, [docID])
    else {
      multipleFileDocs.push(docID)
      setField(name, multipleFileDocs)
    }
  }
  return (
    <>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            label="إرفاق صور الأثاث والأجهزة الكهربائية (للمبنى الجديد)"
            name="Furniture"
            component={FileUploaderComp}
            multipleFile={true}
            setField={setField}
            setDocument={setDocument}
            values={values}
            imgOnly={true}
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            label="رخصة البلدية (للمبنى الجديد)"
            name="municipLicenseNo"
            component={FileUploaderComp}
            multipleFile={false}
            setField={setField}
            setDocument={setDocument}
            values={values}
          />
        </Grid>
        <Grid item md={6} xs={12}>

          {////////////////////
          }
          <Grid item md={6} xs={12}>

            <Grid
              item
              md={12}
              xs={12}
            >
              <Field
                label=" تقرير مكتب هندسي معتمد (للمبنى الجديد)"
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

        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            label="رخصة الدفاع المدني (للمبنى الجديد)"
            // name="municipLicense"
            name="fireDepartmentLicense"
            component={FileUploaderComp}
            multipleFile={false}
            setField={setField}
            setDocument={setDocument}
            values={values}
          />
        </Grid>
      </Grid>
    </>
  )
};

export default Attachements;
Attachements.propTypes = {
  setField: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};