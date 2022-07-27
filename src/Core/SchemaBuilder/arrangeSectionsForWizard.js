import PropTypes from 'prop-types'
import { CheckConditionDependOn } from 'src/Modules/CenterServices/TemporaryLicense/Utils/temporayLicenseUtil'

export default function arrangeSectionsForWizard(props) {
    let { schema, values } = props
    const validateFunc = (values, sectionValidator) => {
        let errors = {}
        sectionValidator?.map(sv => {
            if (typeof sv === "function") {
                errors = sv(values)
            } else {
                [].concat(sv).map(v => {
                    const name = v?.name || v?.id;
                    if (!!name && !v.isValidFun(values[name])) {
                        errors[name] = v.alert
                    }
                })
            }
        })
        return errors
    }
    let sectionName = '', sectionSchema = [], stepTitle = '', sectionValidator = []
    let fieldComponents = []
    schema = schema.filter(field => CheckConditionDependOn({ ...field.sectionName, values }))

    schema.sort((a, b) => (!!a.sectionName?.order ? a.sectionName.order : 999) - (!!b.sectionName?.order ? b.sectionName.order : 999)).map(field => {
        if (!!field) {
            if (!!field['sectionName'] && sectionName.id !== field.sectionName.id) {
                if (sectionSchema.length != 0) {
                    stepTitle = sectionName.stepTitle || sectionName?.label?.ar
                    sectionValidator.push(sectionName.validator)
                    fieldComponents.push({
                        ...sectionName, schema: sectionSchema, label: stepTitle, sectionValidator: sectionValidator, validate: validateFunc
                    })
                    sectionValidator = []
                    sectionSchema = []
                }
                sectionName = field.sectionName
            }
            sectionSchema.push(field)
            sectionValidator.push(field.validators)

        }
    })
    stepTitle = sectionName.stepTitle || sectionName?.label?.ar
    sectionValidator.push(sectionName.validator)
    fieldComponents.push({
        ...sectionName, schema: sectionSchema, label: stepTitle, sectionValidator: sectionValidator, validate: validateFunc
    })
    return fieldComponents

}
arrangeSectionsForWizard.propTypes = {
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
    fieldsName: PropTypes.any,
    sectionNames: PropTypes.any,
    values: PropTypes.any,
    setField: PropTypes.any,
    formType: PropTypes.any,
    setErrMessage: PropTypes.any,
}


