/* eslint-disable */

import { Field } from 'react-final-form';
import { getContentValue, getFieldValue, getOptions } from 'src/Core/SchemaBuilder/Utils/CoreUtils';
import moment from 'moment-hijri';
moment.locale('ar-SA');

const calAnswerOfQuestionnaires = (values, questionnaireData) => {
  const questionnairesArray = questionnaireData;
  console.log(JSON.stringify(values));
  let totalCorrectedAnswer = 0;
  let totalQuestions = 0;
  questionnairesArray?.forEach((questionnaire, indexP) =>
    questionnaire.questions.forEach((question, index) => {
      totalQuestions++;
      if (
        values[`S${indexP}_Q${index}`] ===
        question.correctAnswer
      )
        totalCorrectedAnswer++;
    })
  );
  values.questionnairesScore =
    ((totalCorrectedAnswer / totalQuestions) * 100).toFixed(2) + '%';
  console.log(
    `totalCorrectedAnswer:${totalCorrectedAnswer} totalQuestions:${totalQuestions} questionnairesScore:${values.questionnairesScore}`
  );
  const response = { isSuccessful: true, message: '' };
  return response;
};

const validateQuestionnaires = (values, questionnaireData) => {
  const questionnairesArray = questionnaireData;
  console.log(JSON.stringify(questionnairesArray));
  const errors = {};
  questionnairesArray?.forEach((questionnaire, indexP) =>
    questionnaire.questions.forEach((question, index) => {
      if (!values[`S${indexP}_Q${index}`])
        errors[String(`S${indexP}_Q${index}`)] = 'هذا الحقل مطلوب';
    })
  );

  return errors;
};
const validateInput = (input, value) => {
  let alert = null;
  input.validators &&
    input.validators.forEach(
      (v) => (alert = v.isValidFun && !v.isValidFun(value) ? v.alert : alert)
    );
  return alert;
};
const sectionValidateInput = (inputsSchema, sectionName, values) => {
  const errors = {};
  inputsSchema.filter(f => f.sectionName === sectionName).map((i) => {
    let canValidateInput = true;

    canValidateInput = getDependOn(i, values)
    /*if (i.dependOn) {
      const { fieldName, value } = i.dependOn;
 
      canValidateInput = Array.isArray(value)
        ? !!value.filter((v) => v === values[fieldName])[0]
        : values[fieldName] === value;
    }*/
    const alert = canValidateInput ? validateInput(i, values[i.name]) : null;
    if (alert !== null) {
      errors[i.name] = alert;
    }
  });
  console.log('sectionValidateInput :: errors ==== ', errors);
  return errors;
};
const getDependOn = (field, values) => {
  if (!!field?.dependOn) {
    const dependOnVal = [].concat(field.dependOn).every((dependOn) => {
      const { fieldName, value, valueFunc } = dependOn;
      const checkedValue = !!fieldName ? values[fieldName] : values

      const dependOnVal = !!valueFunc ? valueFunc(checkedValue) : (
        Array.isArray(value)
          ? !!value.filter((v) => v === checkedValue)[0]
          : value === checkedValue);
      return dependOnVal;
    });
    return dependOnVal
  } else {
    return true
  }
}
const getDependOnWithValues = (field, values) => {
  if (!!field?.dependOn) {
    const dependOnVal = [].concat(field.dependOn).every((dependOn) => {
      const { fieldName, value } = dependOn;

      const dependOnVal = Array.isArray(value)
        ? !!value.filter((v) => v === values[fieldName])[0]
        : values[fieldName] === value;
      if (dependOnVal) {
        return !!values[field.name]
      }
      return dependOnVal;
    });
    return dependOnVal
  } else {
    return true
  }
}
const isAllValuesIn = (schema, values) => {
  const result = schema.every(field => {
    field.options = getOptions(values.lookupValues, field)
    const value = getContentValue({ ...field, values: values })
    return !!value
  })
  return result

}
const ConditionComp = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) =>
      (Array.isArray(is) ? !!is.filter((i) => i === value)[0] : value === is)
        ? children
        : null
    }
  </Field>
);
const ConditionDependOn = ({ schema, values, children }) => {
  if (!!values && getDependOn(schema, values)) {
    return children
  } else {
    return null
  }
}
const CheckConditionDependOn = (schema) => {
  if (!!schema.values && getDependOn(schema, schema.values)) {
    return true
  } else {
    return false
  }
}
const getLookupValues = (data) => {
  const result = {};
  result.centerType = data.map(d => {
    return { ...d, value: d.ID, dependOn: [] }
  });

  const targetedBenificiray = [];
  result.centerType.map((d) =>
    d.targetedBenificiray.map((tb) => {
      if (tb.isHidden) {
        delete tb.name
      }
      return targetedBenificiray.push({ ...tb, value: ''.concat(d.value)?.concat(tb.ID), dependOn: ["centerType"].concat(d.dependOn) })
    }));
  result.targetedBenificiray = targetedBenificiray;
  const targetedServices = [];
  targetedBenificiray.map((ct) =>
    ct.targetedServices.map((ts) => targetedServices.push({ ...ts, value: ''.concat(ct.value)?.concat(ts.ID), dependOn: ["targetedBenificiray"].concat(ct.dependOn) }))
  );
  result.targetedServices = targetedServices;

  return result;
};

const getBirthdayOld = (DOB) => {
  const format = !DOB?.includes('/') ? 'iYYYYiMMiDD' : "iD/iM/iYYYY"
  let diff = moment(DOB, format).month(0).from(moment().month(0))
  diff = parseInt(diff.substring(0, 3))
  console.log("getBirthdayOld ----> DOB ", DOB)
  console.log("getBirthdayOld ----> moment ", moment())
  console.log("getBirthdayOld ----> DOBYear ", diff)
  if (isNaN(diff)) {
    return 0
  } else {
    return diff
  }
}
export {
  calAnswerOfQuestionnaires,
  validateInput,
  sectionValidateInput,
  ConditionComp,
  ConditionDependOn,
  getDependOn,
  getDependOnWithValues,
  getLookupValues,
  validateQuestionnaires,
  isAllValuesIn,
  getBirthdayOld,
  CheckConditionDependOn
};
