import { Grid } from "@material-ui/core";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import FieldsCreator from "src/Core/SchemaBuilder/FieldsCreator";
import StaffTable from "../Component/StaffTable";
import ConfirmCenterInfoSchema from "../Schema/ConfirmCenterInfoSchema";



const ConfirmCenterInfo = ({ values, setIsEnableNextBtn }) => {

    useEffect(() => {
        console.log("malakkkvall confirm center infooooooo values:", values);
        setIsEnableNextBtn(true)
    }, [])

    return (
        <>
            <Grid
                container
                mt={3}
                mb={3}
            >
                <FieldsCreator
                    values={values}
                    lookupObject={values.lookupValues}
                    schema={ConfirmCenterInfoSchema}
                    formType="view"
                />
            </Grid>
            <StaffTable values={values}/>


        </>

    );

}
export default ConfirmCenterInfo;

ConfirmCenterInfo.propTypes = {
    values: PropTypes.object,
    setIsEnableNextBtn: PropTypes.boolean,

}