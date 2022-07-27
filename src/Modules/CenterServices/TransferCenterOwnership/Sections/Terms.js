/* eslint-disable */
import {
    FormControl,
    FormControlLabel, Grid
} from '@material-ui/core';
import { Checkbox } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';

const Terms = ({ setField, values }) => {

    return (
        <>
            <Grid
                container
                lg={12}
                md={12}
                xs={12}
                mt={3}
            >
                <div className="section-1 font-45Light">
                    <p className="section-headline">يجب أن يقر المالك على توفر الشروط التالية في المبنى المقرر لنقل ملكية مركز أهلي (المالك الجديد):</p>
                    <ul className="unordered-list">
                        <li className="unordered-list-item">أولا: الالتزام التام بالقواعد التنفيذية للائحة التنظيمية لمراكز تأهيل ذوي الإعاقة غير الحكومية الصادرة بقرار وزير العمل والتنمية الاجتماعية رقم (27120) وتاريخ 9/2/1440هـ وملحقاتها. </li>
                        <li className="unordered-list-item">ثانياَ: الالتزام بتقديم الخدمات التأهيلية المناسبة بأعلى معايير الجودة لخدمة فئة شديدي ومتوسطي الإعاقة أو مزدوجيها، أو متعدديها ممن يعانون من تأخر ذهني. </li>
                        <li className="unordered-list-item">ثالثاَ: لاتضمن الوزارة الدعم المالي وتحمل الرسوم للمستفيدين لأي مركز أو الاستفادة من كامل الطاقة الاستيعابية له أو جزء منها. </li>
                        <li className="unordered-list-item">رابعاَ: عدم إضافة اسم المركز بالبوابة الإلكترونية للوزارة وعلى مالك المركز دراسة الجدوى الاقتصادية وخطة العمل دون أدني مسؤولية من الوزارة. </li>
                        <li className="unordered-list-item">خامساَ: الالتزام بكافة التعليمات والتنظيمات واللوائح التي تصدر من وزارة العمل والتنمية الاجتماعية حال اعتمادها بعد منح الترخيص. </li>
                        <li className="unordered-list-item">سادساَ: الالتزام بقبول من يتم تحويله من المستفيديين بموجب اشعار قبول بتحمل الرسوم من الدولة من قبل الوزارة، وعلى ذلك أوقع. </li>
                        <li className="unordered-list-item">سابعاَ: عدم تشغيل المركز بأي حال من الأحوال قبل استلام الترخيص النهائي وأن أكون عرضه للجزاء وتحمل الأضرار التي تحصل للمستفيدين في حال مخالفة ذلك. </li>
                    </ul>
                </div>

                <Field name="agree[0]" mt={3}>
                    {({ meta }) => ( // eslint-disable-line no-unused-vars
                        <FormControl component="fieldset" error={meta.error} required>
                            <FormControlLabel
                                label="أنا أقر وأتعهد بالإلتزام بالشروط والأحكام الواردة والمتعلقة بالطلب"
                                control={
                                    <Field
                                        name="agree[0]"
                                        component={Checkbox}
                                        type="checkbox"
                                        checked={false}
                                    />
                                }
                            />
                        </FormControl>
                    )}
                </Field>
            </Grid>
        </>
    )
}

export default Terms;

Terms.propTypes = {
    setField: PropTypes.func
};
