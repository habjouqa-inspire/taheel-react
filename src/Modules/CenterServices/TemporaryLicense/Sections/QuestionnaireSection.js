/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import {
  Grid,
  RadioGroup,
  Typography,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Alert,
  Skeleton,
  CircularProgress,
  Divider
} from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import {
  Radio,
  TextField as TextFieldFinal,
  Select
} from 'final-form-material-ui';

const required = (value) => (value ? undefined : 'هذا الحقل مطلوب');
const questionComponent = (name, label) => (
  <Grid key={name} item mt={0} md={12} xs={12}>
    <br/>
    <Field name={name}style = {{ margin : 370 }}
>
      {(
        { input, meta } // eslint-disable-line no-unused-vars
      ) => {
        const showError =
          ((meta.submitError && !meta.dirtySinceLastSubmit) ||
            meta.error) &&
          meta.touched;
        return (
          <Grid container mt={0}>
            <Grid item md={9} xs={9} pl={2}>
              <FormLabel style={{whiteSpace: 'break-spaces'}}component="legend">{label.replaceAll("*",'\n')}</FormLabel>
              {showError && (
                <FormHelperText dir="rtl" style={{ color: '#ec2956', textAlign: 'right' }}>
                  {showError ? meta.error || meta.submitError : undefined}
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={3} xs={3}>
              <RadioGroup row>
                <FormControlLabel
                  control={
                    <Field
                      name={name}
                      component={Radio}
                      type="radio"
                      value="yes"
                    />
                  }
                />
                <FormControlLabel
                  control={
                    <Field
                      name={name}
                      component={Radio}
                      type="radio"
                      value="no"
                    />
                  }
                />
                <FormControlLabel
                  control={
                    <Field
                      name={name}
                      component={Radio}
                      type="radio"
                      value="notapply"
                    />
                  }
                />
              </RadioGroup>
            </Grid>
          </Grid>
        )
      }
      }
    </Field>
    <br/>
    <Divider />
  </Grid>
);
const questionnaireSectionComponent = (questionnaire, idx) => (
  <>
    <Grid container mt={6} mb={4} spacing={0}>
      <Grid item md={9} xs={9}>
        <Typography
          gutterBottom
          variant="h4"
          sx={{
            color: '#eeb741'
          }}
        >
          {questionnaire.sectionlabelAr}
        </Typography>
      </Grid>
      <Grid
        container
        md={3}
        xs={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">نعم</Typography>
        <Typography variant="h4">لا</Typography>
        <Typography variant="h4">لا ينطبق</Typography>
      </Grid>
    </Grid>

    <Grid
      container
      mt={0}
      spacing={1}
      key={`s${idx}`}
    >
      {questionnaire.questions.map((question, index) =>
        questionComponent(
          `S${idx}_Q${index}`,
          question.label.ar
         
        )
      )}
    </Grid>
   
  </>
);

const QuestionnaireSection = ({ values, setIsEnableNextBtn, questionnaireData }) => {
  const [loading, setLoading] = useState(false);
  // !questionnaireData.length > 0 && setIsEnableNextBtn(false);
  return (
    <>
      {

        (
          <>
            {questionnaireData.length > 0 &&
              <Alert sx={{ margin: 3 }} severity="info">
                هذا التقييم استرشادي للمساعدة في معرفة درجة استيفائك لشروط إصدار
                الترخيص النهائي ولن يتم الرجوع إليه عند طلب إصدار الترخيص النهائي
              </Alert>}
          </>
        )}
      {loading ? (
        <CircularProgress
          size="15rem"
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#E2E8EB'
          }}
        />
      ) : questionnaireData.length > 0 ? (
        questionnaireData.map((ques, idx) =>
          questionnaireSectionComponent(ques, idx)
          
                  )
      ) : (
        <>
          <br></br>


          <Typography>
            **لا يمكن الذهاب للصفحة التالية وذلك لعدم وجود اسئلة تقييم ذاتي ,يرجى
            مراجعة الدعم الفني للمنصة لحل هذا الخطأ التقني{' '}
          </Typography>
        </>
      )}
    </>
  );
};



export default QuestionnaireSection;

QuestionnaireSection.propTypes = {
  values: PropTypes.object.isRequired,
  questionnaireData: PropTypes.array.isRequired
};
