import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import FileUploaderField from 'src/Core/SchemaBuilder/FieldsInputs/FileUploaderField'
import { CheckConditionDependOn } from 'src/Modules/CenterServices/TemporaryLicense/Utils/temporayLicenseUtil'
import MapContainer from '../Components/MapContainer'
import ButtonField from './FieldsInputs/ButtonField'
import CheckboxField from './FieldsInputs/CheckboxField'
import ContentField from './FieldsInputs/ContentField'
import RadioButtonField from './FieldsInputs/RadioButtonField'
import SelectField from './FieldsInputs/SelectField'
import MapField from './FieldsInputs/MapField'
import TextField from './FieldsInputs/TextField'
import TypographyField from './FieldsInputs/TypographyField'
//import { useTranslation } from 'react-i18next'
//import { useStyles } from '../../../styles.js'
import { arrangeFieldType, getOptions } from './Utils/CoreUtils'
import FieldsEnum from './Utils/FieldsEnum'
import CalenderField from './FieldsInputs/CalenderField'

export default function FieldsCreator(props) {
    const {
        lookupObject,
        schema,
        fieldsName,
        sectionNames,
        values,
        setField,
        isLoading,
        formType,
        firstEnterFunc,
        setErrMessage,
        setIsEnableNextBtn,
        setIsEnableCancelBtn,
        setIsEnableEndBtn,
    } = props
    if (formType === "FINAL_FORM_WIZARD_CREATOR") {
        useEffect(() => {
            !!firstEnterFunc ? firstEnterFunc({ values, setIsEnableNextBtn }) : setIsEnableNextBtn(true)
        }, [])
    }
    //const [t] = useTranslation('common')
    //const classes = useStyles()
    const [funcLoading, setFuncLoading] = useState(isLoading)
    let tLabel = '', style = '', labelRootStyle = '', labelshrinkStyle = '', fieldType = '', sectionName = '', lastLength = null, sectionSchema = []
    let fieldComponents = []
    const Components = { TextField, RadioButtonField, MapField, CheckboxField, SelectField, ButtonField, TypographyField, FileUploaderField, CalenderField, ContentField }
    let newSchema = []

    if (!!fieldsName) {
        [].concat(fieldsName).map(fieldName => {
            newSchema = newSchema.concat(schema.filter(field => field?.name === fieldName)[0])
        })
    } else if (!!sectionNames) {
        [].concat(sectionNames).map(secName => {
            newSchema = newSchema.concat(schema.filter(field => field?.sectionName?.id === secName))
        })
    } else {
        newSchema = schema.filter(field => CheckConditionDependOn({ ...field.sectionName, values }))
    }
    newSchema.sort((a, b) => (!!a.sectionName?.order ? a.sectionName.order : 999) - (!!b.sectionName?.order ? b.sectionName.order : 999)).map(field => {
        if (!!field && field.type === FieldsEnum.SECTION_COMP) {
            sectionName = field.sectionName
            const secitonLable = !!sectionName.labelFunc ? sectionName.labelFunc(values) : sectionName?.label?.ar
            fieldComponents.push(<TypographyField type='HeadText' tLabel={secitonLable} />)
            fieldComponents.push(field.component(props))
        } else if (!!field && CheckConditionDependOn({ ...field, values })) {
            //if (t('lang') === 'ar') { // setting the properities for lang change
            tLabel = field?.labelFunc ? field.labelFunc(values) : field?.label?.ar
            //style = classes.inputStyleAr
            //labelRootStyle = classes.labelRootAr
            //labelshrinkStyle = classes.shrinkAr
            /*} else {
                tLabel = field.label.en
                style = classes.inputStyleEn
                labelRootStyle = classes.labelRootEn
                labelshrinkStyle = classes.shrinkEn
            }*/

            if (!!field['sectionName'] && sectionName.id !== field.sectionName.id) {
                // if (formType === 'finalFormWizerd') {
                //     ({ fieldComponents, lastLength, sectionSchema } = formateSectionsWizard(fieldComponents, lastLength, sectionName, values, sectionSchema))
                //     lastLength = fieldComponents.length
                //     sectionName = field.sectionName
                // } else {
                fieldComponents = fieldComponents.filter(n => n)
                lastLength = !!lastLength ? lastLength : 1
                if (lastLength === fieldComponents.length) fieldComponents.pop()
                sectionName = field.sectionName
                const secitonLable = !!sectionName.labelFunc ? sectionName.labelFunc(values) : sectionName?.label?.ar
                fieldComponents.push(<TypographyField type='HeadText' tLabel={secitonLable} />)
                lastLength = fieldComponents.length
                // }
            }
            field.options = !!lookupObject ? getOptions(lookupObject, field) : field.options
            field = {
                ...field,
                tLabel,
                style,
                labelRootStyle,
                labelshrinkStyle,
                values,
                setField,
                isLoading,
                fieldName:field.name,
                setErrMessage: (errMessage) => { setErrMessage(errMessage) },
                funcLoading,
                formType,
                setFuncLoading: (loading) => { setFuncLoading(loading) },
                setIsEnableNextBtn: (isEnableNextBtn) => setIsEnableNextBtn(isEnableNextBtn),
                setIsEnableCancelBtn: (isEnableCancelBtn) => setIsEnableCancelBtn(isEnableCancelBtn),
                setIsEnableEndBtn: (isEnableEndBtn) => setIsEnableEndBtn(isEnableEndBtn)
            }
            //if (formType === 'finalFormWizerd') { sectionSchema.push(field) }

            let Component
            fieldType = field['type']

            if (formType === 'view') {
                field = {
                    ...field,
                    pauseMarker: true,
                    showChipAreaPicker: true
                }
                if ((field?.dependOnFunc && field?.dependOnFunc(values) != false) || !field?.dependOnFunc) {
                    fieldComponents.push(ContentField({ ...field }))
                }
            } else {
                fieldType = arrangeFieldType(fieldType)
                Component = Components[fieldType]
                field = {
                    ...field,
                    pauseMarker: false,
                    showChipAreaPicker: false,
                    newAddress: true
                }
                !!Component ? fieldComponents.push(<Component {...field} type={field?.subType ? field?.subType : field?.type} />) : fieldComponents.push(<TypographyField textTitle={'input type not recognized! ' + field['name'] + ' with type ' + field['type']} />)
            }
        }
    })
    fieldComponents = fieldComponents.filter(n => n)
    if (lastLength === fieldComponents.length) fieldComponents.pop()
    return fieldComponents

}
FieldsCreator.propTypes = {
    labelRootStyle: PropTypes.object,
    tLabel: PropTypes.string,
    handleChange: PropTypes.func,
    gridSize: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    multiline: PropTypes.bool,
    isLoading: PropTypes.bool,
    lookupObject: PropTypes.any,
    schema: PropTypes.any,
    fieldsName: PropTypes.array,
    sectionNames: PropTypes.array,
    values: PropTypes.any,
    setField: PropTypes.func,
    formType: PropTypes.string,
    setErrMessage: PropTypes.func,
    firstEnterFunc: PropTypes.func,
    push: PropTypes.func,
    pop: PropTypes.func,
}


