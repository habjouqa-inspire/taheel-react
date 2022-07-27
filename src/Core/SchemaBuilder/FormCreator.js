import React, { useState } from 'react'
import FieldsCreator from "./FieldsCreator"
import { Form } from 'react-final-form'
import ButtonField from './FieldsInputs/ButtonField'
//import { useTranslation } from 'react-i18next'
import FieldsValidator from './Utils/FieldsValidator'
import {
    Grid,
    Box,
    Card,
    Alert,
    AlertTitle,
    CardContent,
    CardHeader,
    Divider,
    Badge,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import IconsTypeEnum from './Utils/IconsTypeEnum'
import IconsList from './FieldsInputs/IconsList'
import Fab from '@mui/material/Fab';

export default function FormCreator({ title, pageName, isLoading, submitInfo, schema, initValues, navBackUrl, sectionNames, cancel, formType, lookupObject, additionalFields, fieldsName, errMessage, setErrMessage, alertComment }) {
    //const [t] = useTranslation('common')
    const navigateion = useNavigate()
    const [loading, setLoading] = useState(false)
    const handleSubmit = async values => {
        setLoading(true)
        if (!!handleSubmit)
            await submitInfo.onSubmit(values)
        setLoading(false)
    }
    return (
        <Box style={{ pointerEvents: loading ? "none" : '' }}>
            {<Form
                name={pageName}
                onSubmit={handleSubmit}
                validate={values => {
                    return FieldsValidator({ schema, values })
                }}
                initialValues={initValues}
                mutators={{
                    // expect (field, value) args from the mutator
                    setValue: ([field, value], state, { changeValue }) => {
                        changeValue(state, field, () => value)
                    }
                }}
                render={({ handleSubmit, values, form }) => (

                    <form onSubmit={handleSubmit}>
                        <Card style={{ padding: "20px", minHeight: "100%" }}>
                            {title ?
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
                                                    <Grid item><p style={{ fontWeight: "bold" }} >{title} </p> </Grid>
                                                </Grid>
                                            )
                                            :
                                            <p style={{ fontWeight: "bold" }} >{title} </p>
                                        }
                                    />
                                    <Divider />
                                </> :
                                <></>
                            }
                            <CardContent  >
                                {errMessage && (
                                    <Alert variant="outlined" severity={!!errMessage.type ? errMessage.alertype : "error"}>
                                        {!!errMessage.msg ? errMessage.msg : errMessage}
                                    </Alert>)
                                }
                                {alertComment && alertComment.msg && (<Alert variant="outlined" severity="warning" sx={{ marginLeft: 2, marginRight: 2, marginTop: 1 }}>
                                    <AlertTitle> {alertComment.title}</AlertTitle>
                                    {alertComment.msg}
                                </Alert>)}
                                <Grid
                                    container
                                    spacing={3}
                                    mt={3}
                                    mb={3}
                                    style={{ paddingRight: formType === 'view' ? '80px' : '', paddingLeft: formType === 'view' ? '150px' : '' }}
                                >
                                    {FieldsCreator({ schema, fieldsName, sectionNames, lookupObject, formType, values, isLoading, setField: (fieldName, fieldValue) => form.mutators.setValue(fieldName, fieldValue), setErrMessage: (errMessage) => setErrMessage(errMessage) })}
                                </Grid>
                                {additionalFields}
                                {!!submitInfo ?
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <ButtonField label={submitInfo.label}
                                            gridSize={5}
                                            values={values}
                                            onClick={submitInfo.onSubmit}
                                            setFuncLoading={(loading) => setLoading(loading)}
                                            funcLoading={loading}
                                            setErrMessage={(errMessage) => setErrMessage(errMessage)} />
                                    </Grid>
                                    : ''
                                }
                            </CardContent>
                        </Card>
                    </form>

                )}
            />
            }
        </Box>

    )
}
FormCreator.propTypes = {
    values: PropTypes.object,
    pageName: PropTypes.string,
    navBackUrl: PropTypes.object,
    formType: PropTypes.string,
    title: PropTypes.string,
    submitInfo: PropTypes.object,
    schema: PropTypes.array,
    initValues: PropTypes.any,
    sectionNames: PropTypes.array,
    cancel: PropTypes.object,
    lookupObject: PropTypes.object,
    additionalFields: PropTypes.any,
    fieldsName: PropTypes.object,
    errMessage: PropTypes.string,
    setErrMessage: PropTypes.func,
    alertComment: PropTypes.any,
    isLoading: PropTypes.bool,
}
