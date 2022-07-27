import { Grid, MenuItem, Select } from "@material-ui/core";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import ApprovalSummary from "../../CancelInitialApproval/Sections/ApprovalSummary";
import PropTypes from 'prop-types';

const SelectedCenterDetails = ({ setField, finalLicenses, values, setApprovalNum, getCentertDetails, showSummary, setShowSummary }) => {
    return <>
        <Grid
            container
            mt={4}
            spacing={3}
        >
            <Grid
                item
                md={6}
                xs={12}
                className="custom-label-field"
            >
                <Field
                    fullWidth
                    label="رقم الموافقة المبدئية"
                    name="centerLicenceNumber"
                    component={Select}
                    required
                    dir="rtl"
                    variant="outlined"
                    className="custom-field"
                    formControlProps={{ fullWidth: true }}
                >
                    <MenuItem value="1" key="1" selected={true}>اختيار</MenuItem>
                    {console.log("finalLicensesfinalLicenses", finalLicenses),
                        finalLicenses.map(item => (
                            // (item.type !== "01") &&
                            <MenuItem key={item.centerLicense_r.LicenseNumber} value={item.centerLicense_r.LicenseNumber}>{item.centerLicense_r.LicenseNumber}</MenuItem>
                        ))}
                </Field>
                <OnChange name="centerLicenceNumber">
                    {async (value) => {
                        console.log(`++++++centerLicenceNumber + ${value}`);
                        if (value != 1) {
                            setApprovalNum(value);
                            await getCentertDetails(value);
                        }
                        else {
                            setShowSummary(false);
                        }
                    }}
                </OnChange>
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
                className="custom-label-field"
            >
            </Grid>
        </Grid>
        {showSummary && <ApprovalSummary
            values={values}
            setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)}
        />
        }
    </>
}
export default SelectedCenterDetails;
SelectedCenterDetails.propTypes = {
    setField: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    finalLicenses: PropTypes.array.isRequired,
    setField: PropTypes.func.isRequired,
    setShowSummary: PropTypes.func.isRequired,
    showSummary: PropTypes.bool.isRequired,
    getCentertDetails: PropTypes.func.isRequired,
    setApprovalNum: PropTypes.func.isRequired,

  };