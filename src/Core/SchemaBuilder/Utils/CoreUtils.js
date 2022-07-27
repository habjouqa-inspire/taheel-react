import { Grid } from '@material-ui/core';
import FieldsEnum from './FieldsEnum';

const getOptions = (lookupObject, field) => {
    return !!lookupObject[field.name] ? lookupObject[field.name] : field?.options
}

function formateSectionsWizard(fieldComponents, lastLength, sectionName, values, sectionSchema) { //for referance only
    fieldComponents = fieldComponents.filter(n => n)
    lastLength = !!lastLength ? lastLength : 0
    const secitonLable = !!sectionName.labelFunc ? sectionName.labelFunc(values) : sectionName?.label?.ar
    let sectionComponent
    if (fieldComponents.length != 0) {
        const sectionFieldsList = fieldComponents.slice(lastLength, fieldComponents.length)
        fieldComponents = fieldComponents.slice(0, lastLength)
        sectionComponent = (
            <Grid
                container
                spacing={4}
                mt={3}
                mb={3}
                label={secitonLable}
                validate={(values) => {
                    const errors = {}
                    sectionSchema.map(ss => {
                        [].concat(ss.validators).map(v => { if (!!v?.isValidFun && !v.isValidFun(values[ss.name])) (errors[ss.name] = v.alert) })
                    })
                    return errors
                }}

            >
                {sectionFieldsList.map(sfl => sfl)}
            </Grid>
        )
        sectionSchema = []
        fieldComponents.push(sectionComponent)
    }

    return { fieldComponents, lastLength, sectionSchema }
}

const arrangeFieldType = (fieldType) => {
    if (fieldType === 'Select') return FieldsEnum.SELECT_FIELD
    if (fieldType === 'Radio') return FieldsEnum.RADIO_BUTTON_FIELD
    if (fieldType === 'fileTable') return FieldsEnum.FILE_TABLE
    if (fieldType === 'Date') return FieldsEnum.DATE_PICKER_FIELD
    if (fieldType === 'CheckBox') return FieldsEnum.CHECKBOX_FIELD
    if (fieldType === 'RadioButtonField') return FieldsEnum.RADIO_BUTTON_FIELD
    if (fieldType === 'CheckboxField') return FieldsEnum.CHECKBOX_FIELD
    if (fieldType === 'SelectField') return FieldsEnum.SELECT_FIELD
    if (fieldType === 'ButtonField') return FieldsEnum.BUTTON_FIELD
    if (fieldType === 'TypographyField') return FieldsEnum.TYPOGRAPGY_FIELD
    if (fieldType === 'FileUploaderField') return FieldsEnum.FILE_UPLOADER_FIELD
    if (fieldType === 'file') return FieldsEnum.FILE_FILED
    if (fieldType === 'DatePickerField') return FieldsEnum.DATE_PICKER_FIELD
    if (fieldType === 'DataTable') return FieldsEnum.FORM_FIELD
    if (fieldType === 'Map' || fieldType === FieldsEnum.MAP_CONTAINER) return FieldsEnum.MAP_CONTAINER
    if (fieldType === 'sectionComponent') return FieldsEnum.SECTION_COMP
    if (fieldType === 'calendar' || fieldType === FieldsEnum.CALENDAR_FIELD) return FieldsEnum.CALENDAR_FIELD
    if (fieldType === 'contentField' || fieldType === FieldsEnum.CONTETNT_FIELD) return FieldsEnum.CONTETNT_FIELD
    return FieldsEnum.TEXT_FIELD
}
const getValuesFromFilter = (filterData) => {
    const initValues = {}
    filterData?.map((fD) => {
        let fieldName = fD.fieldName, fieldValue = fD.fieldValue
        initValues[fieldName] = fieldValue
    })
    return initValues;
}
const getOptionsDepend = ({ options, values, value }) => {
    !!options && !!values && (options[0].dependOn?.map(dpnd => {
        value = !!values[dpnd] ? ''.concat(values[dpnd]).concat(value) : value
    }))
    return value
}

const getFieldValue = ({ value, options, values }) => {
    if (value === '') return '';
    let filteredvalue = []
    if (!!options && !!options[0]?.dependOn && !!options[0].dependOn[0]) {
        let optionVal = ''
        value = value?.includes(',') ? value?.split(',') : value

        if (Array.isArray(value)) {
            optionVal = value.map(v => getOptionsDepend({ options, values, value: v }))
        } else {
            optionVal = getOptionsDepend({ options, values, value })
        }
        value = optionVal != '' ? optionVal : value
    }
    if (Array.isArray(value)) {
        filteredvalue = value?.map(v => {
            let filtVal = options?.filter(option => option?.value === v)[0]
            filtVal = !!filtVal ? filtVal.name : v
            return filtVal
        }).join(' , ')
        return filteredvalue;
    } else {
        filteredvalue = options?.filter((option) => option?.value === value);
    }

    if (!!filteredvalue && [].concat(filteredvalue).length > 0) return filteredvalue[0]?.name || filteredvalue[0].label?.ar;
    return value;
};
const decodeDecodedText = (text) => {
    if (decodeURIComponent(text) !== text) {
        return decodeDecodedText(decodeURIComponent(text));
    } else {
        return text
    }
}

const arrangeInitValsWithSchema = (schema, data) => {
    let result = {};

    [].concat(schema).forEach(field => {
        if (!!field?.path && !!field?.name) {
            const path = field?.path?.split('.')
            let value = data
            path?.forEach(subPath => {
                value = !!value ? value[subPath] : null
            })

            result[field.name] = value
        }
    });
    result = { ...data, ...result }

    return result

}
const arrangeSchemaValue = (props) => {
    const inputName = props.name?.includes('.')
        ? props.name.split('.')
        : props.name;
    let value = '';


    if (!!props.valueFunc) {
        value = props.valueFunc(props.values);
        if (!!value) {
            return value
        }
    }

    if (Array.isArray(inputName)) {
        value = props.values;
        inputName.forEach((iName) => {
            value = !!value ? value[iName] : props.values[props.name];
        });
    } else if (!!inputName) {
        value = props?.values[inputName];
    } else if (!!props.attrFunc) {
        value = props?.values
    }

    if (!!props.attrFunc) {
        value = props.attrFunc(value)
    }
    if(value===0) return value
    if (!value) {
        return props?.default
    }
    return value
}
const getContentValue = (props) => {
    if (props.isLoading) return
    let value = arrangeSchemaValue(props)
    if ((props.type === 'Select' || props.type === 'Radio') && !!props?.values && !!value) {
        value = getFieldValue({ value: value, options: props.options, values: props?.values })
    }
    return value
}

export { getOptions, arrangeFieldType, getValuesFromFilter, formateSectionsWizard, getFieldValue, getContentValue, getOptionsDepend, decodeDecodedText, arrangeInitValsWithSchema }