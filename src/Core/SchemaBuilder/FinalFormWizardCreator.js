import { Alert, AlertTitle, Card, CardContent, CardHeader, CircularProgress, Container, Divider, Grid } from "@material-ui/core";
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import PropTypes from 'prop-types';
import { useState } from "react";
import FinalFromWizard from "../Components/wizard/FinalFormWizard";
import arrangeSectionsForWizard from "./arrangeSectionsForWizard";
import FieldsCreator from "./FieldsCreator";


export const FinalFormWizardCreator = ({ initialValues, schema, isEnableCancelBtn = false, isEnableEndBtn = true, onSubmit, showSummary, isLoading, title, formDraft, details, requestNum }) => {
    const sections = arrangeSectionsForWizard({schema,values:initialValues});
    console.log('initialValues__-',initialValues)

    const [setField, editSetField] = useState(() => { })
    const [errMessage, setErrMessage] = useState()
    const [enableNextBtn, setIsEnableNextBtn] = useState(sections[0].isEnableNextBtn)
    const [enableCancelBtn, setIsEnableCancelBtn] = useState(isEnableCancelBtn)
    const [enableEndBtn, setIsEnableEndBtn] = useState(isEnableEndBtn)
    const formType = "FINAL_FORM_WIZARD_CREATOR"//m
    return (
        <Container maxWidth="md">
            <Card>
                <CardHeader
                    title={title}
                />
                <Divider />
                {!isLoading && formDraft &&
                    <Alert icon={<DraftsTwoToneIcon sx={{ color: 'grey !important' }} />} variant="outlined" severity="info" sx={{ marginLeft: 2, marginRight: 2, marginTop: 1, color: 'grey !important', borderColor: 'grey !important' }}>
                        <AlertTitle> مسودة رقم {requestNum}</AlertTitle>
                        {details?.chairmanComment && details.chairmanComment?.comment}
                    </Alert>
                }
                {errMessage && (
                    <Alert variant="outlined" severity="error">
                        {errMessage}
                    </Alert>
                )}
                <CardContent>
                    {!isLoading ?
                        <FinalFromWizard
                            initialValues={{
                                agree: [],
                                isNextBtnDisabled: false,
                                managersCount: 0,
                                teachersCount: 0,
                                isDraft: false,
                                ...initialValues
                            }}
                            cancelBtnFn={() => { navigate('/app/center-services-list', { replace: true }); }}
                            setIsEnableNextBtn={(isEnableNextBtn) => setIsEnableNextBtn(isEnableNextBtn)}
                            setIsEnableCancelBtn={(isEnableCancelBtn) => setIsEnableCancelBtn(isEnableCancelBtn)}
                            setIsEnableEndBtn={(isEnableEndBtn) => setIsEnableEndBtn(isEnableEndBtn)}
                            isEnableCancelBtn={enableCancelBtn}
                            isEnableEndBtn={enableEndBtn}
                            isEnableNextBtn={enableNextBtn}
                            showSummary={showSummary}
                            onSubmit={onSubmit}
                            formType={formType}
                            editSetField={editSetField}
                        >
                            {
                                sections.map((section, idx) => {

                                    return < FieldsCreatorComponent
                                        setErrMessage={(errMessag) => setErrMessage(errMessag)}
                                        nextFun={(values) => !!section?.nextFun ? (section?.nextFun(values)) : { isSuccessful: true }}
                                        label={section.label}
                                        schema={section.schema}
                                        validate={(values) => section.validate(values, section.sectionValidator)}
                                        setIsEnableNextBtn={(isEnableNextBtn) => setIsEnableNextBtn(isEnableNextBtn)}
                                        setIsEnableCancelBtn={(isEnableCancelBtn) => setIsEnableCancelBtn(isEnableCancelBtn)}
                                        setIsEnableEndBtn={(isEnableEndBtn) => setIsEnableEndBtn(isEnableEndBtn)}
                                        isEnableNextBtn={section.isEnableNextBtn}
                                        section={section}
                                        formType={formType}
                                        key={idx} />
                                })}
                        </FinalFromWizard>
                        :
                        <CircularProgress size="15rem" style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto', color: '#E2E8EB'
                        }} />
                    }
                </CardContent>
            </Card>
        </Container>
    );

}

const FieldsCreatorComponent = ({
    schema,
    formType,
    values,
    setField,
    validate,
    section,
    setErrMessage,
    isEnableNextBtn,
    setIsEnableNextBtn,
    setIsEnableCancelBtn,
    setIsEnableEndBtn,
    pop,
    push,
}) => {
    return (
        schema.length != 0 && (
            <Grid
                container
                spacing={4}
                mt={3}
                mb={3}>
                {FieldsCreator({
                    schema: schema,
                    formType: formType,
                    values: values,
                    pop,
                    push,
                    firstEnterFunc: section.firstEnterFunc,
                    setErrMessage: (errMessag) => setErrMessage(errMessag),
                    setField: (fieldName, fieldValue) => setField(fieldName, fieldValue),
                    setIsEnableNextBtn: (isEnableNextBtn) => setIsEnableNextBtn(isEnableNextBtn),
                    setIsEnableCancelBtn: (isEnableCancelBtn) => setIsEnableCancelBtn(isEnableCancelBtn),
                    setIsEnableEndBtn: (isEnableEndBtn) => setIsEnableEndBtn(isEnableEndBtn)

                })}
            </Grid>)
    )
}

FieldsCreatorComponent.propTypes = {
    setField: PropTypes.func,
    values: PropTypes.any,
    formType: PropTypes.any,
    schema: PropTypes.array,
    validate: PropTypes.array,
    section: PropTypes.array,
    isEnableNextBtn: PropTypes.bool,
    setErrMessage: PropTypes.func,
    setIsEnableNextBtn: PropTypes.func,
    setIsEnableCancelBtn: PropTypes.func,
    setIsEnableEndBtn: PropTypes.func,
    push: PropTypes.func,
    pop: PropTypes.func,
}
FinalFormWizardCreator.propTypes = {
    initialValues: PropTypes.any,
    isEnableNextBtn: PropTypes.bool,
    isEnableEndBtn: PropTypes.bool,
    isEnableCancelBtn: PropTypes.bool,
    showSummary: PropTypes.bool,
    onSubmit: PropTypes.func,
    pageSections: PropTypes.func,
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    requestNum: PropTypes.number,
    formDraft: PropTypes.any,
    details: PropTypes.any,
    schema: PropTypes.array,
}