/* eslint-disable */

import {
    Grid
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import FieldsCreator from 'src/Core/SchemaBuilder/FieldsCreator';
import newCenterOwnerNewSchema from '../Schema/newCenterOwnerNewSchema';
import NewOwnerCenterDetailsSchema from '../Schema/NewOwnerCenterDetailsSchema';
import { validateOtpFlag } from '../Utils/TransferCenterOwnershipUtil';
import TransferOwnershipDialog from './TransferOwnershipDialog';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { TextField as TextFieldFinal } from 'final-form-material-ui';

const NewOwnerCenterDetails = ({ values,setIsEnableNextBtn, setField }) => {
    const navigate = useNavigate();
    const lookupValues = useLookup()
    const refreshLookup = useUpdateLookup()
    const successOtp = () => {
    console.log('all values test noor ::',values);

        setField('isAuth', true);
        validateOtpFlag(values?.taskId,values?.centerLicenseNumber,values?.centerType)
    }
    useEffect(() => {
        lookupValues?.isEmpity && (refreshLookup())
        console.log(`values.centerLicenseNumber: ${values.centerLicenseNumber}`)
        if(true){
            setField('isAuth',true)
        }
        console.log(`values.Auth: ${values.isAuth}`)

        values.isAuth && (setOpen(false))
        setIsEnableNextBtn(true);

    }, []);
    const [open, setOpen] = useState(true);
    return (
        <>
            {console.log('all values for new owner ::', values)}
            <Grid
                container
                style={{ paddingRight: '30px' }}
            >
                <Field
                style={{display:'none'}}
                            fullWidth
                            required
                            label={``}
                            name="buildingArea"
                            component={TextFieldFinal}
                            type="text"
                            variant="outlined"
                            hidden={true}
                            dir="rtl"
                            className="custom-field"
                            isRequired
                        />
                <FieldsCreator
                    schema={(values.type === '01' || values.centerType === '01') ? NewOwnerCenterDetailsSchema : newCenterOwnerNewSchema}
                    lookupObject={lookupValues}
                    values={values} isLoading={false} formType="view"
                />
            </Grid>
            <TransferOwnershipDialog formType='newOwnership' val={values} open={open} setOpen={(open) => setOpen(open)} handleOnSuccess={() => { successOtp() }} onClose={() => { }} onClose={() => navigate('/center-services/transferCenterOwnershipSummary', { state: { requestNum: values.requestNum } })} />
        </>
    );
}
export default NewOwnerCenterDetails;
NewOwnerCenterDetails.prototype= {
    setIsEnableNextBtn: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    setField: PropTypes.func.isRequired,
  
}
