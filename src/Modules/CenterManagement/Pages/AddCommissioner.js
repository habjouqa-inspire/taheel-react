import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import FormCreator from 'src/Core/SchemaBuilder/FormCreator';
import { addCommissionerRs } from '../API/CentersApi';
import CommissionerDetailsSchema from '../Schema/CommissionerDetailsSchema';

const AddCommissioner = () => {
    const location = useLocation();
    const licenseNumber = location.state.licenseNumber;
    console.log('licenseNumber ===> ', licenseNumber)
    const [errMessage, setErrMessage] = useState('');
    const [staffIds, setStaffIds] = useState(location.state.candidateStaff)
    console.log('staffIds ----> ', staffIds)
    const navigateion = useNavigate()
    const [loading, setLoading] = useState(false)
    const title = " إضافة مفوض"
    const lookupObject = {

        'permissions': [
            {
                label: { ar: 'إضافة مستفيدين في المركز', en: 'Add beneficiaries in the center' },
                value: 1
            },
            {
                label: { ar: 'إصدار تراخيص مؤقتة', en: 'Issuance of temporary licenses' },
                value: 2
            },
            {
                label: { ar: 'إصدار تراخيص نهائية', en: 'Issuance of final licenses' },
                value: 3
            },
            {
                label: { ar: 'تعديل بيانات مستفيدين في المركز', en: 'Modify the data of beneficiaries in the center' },
                value: 4
            },
            {
                label: { ar: 'إضافة المركز في برنامج تحمل الدولة للرسوم', en: 'Adding the center to the state fee-bearing program' },
                value: 5
            },
            {
                label: { ar: 'إزالة مركز من برنامج تحمل الدولة للرسوم', en: 'Remove a center from the state fee-bearing program' },
                value: 6
            }],
        'staffId': staffIds.map(member => (
            {
                label: { ar: member.name, en: member.name },
                value: member.id,
            }
        ))
    }

    const onSubmit = async ({ values, setErrMessage, setFuncLoading }) => {
        setFuncLoading(true)
        setErrMessage("");
        const { staffId, email, jobTitle, permissions } = values;
        let cheackedPermission = [];
        permissions?.map((permission, idx) => permission === true ? cheackedPermission.push(idx) : '')
        if (cheackedPermission.length == 0) {
            setFuncLoading(false)
            setErrMessage("يرجى اختيار الصلاحيات");
            return { isSquccessful: false, message: errMessage };
        }
        const addCommissioner = await addCommissionerRs(email, jobTitle, staffId, cheackedPermission);
        if (!addCommissioner.isSuccessful) {
            setFuncLoading(false)
            setErrMessage(addCommissioner.message);
            return { isSquccessful: false, message: addCommissioner.message };
        }
        setErrMessage("");
        setFuncLoading(false)
        navigateion("/app/CommissionersManagement", { state: { licenseNumber, message: { msg: email + " تم الإضافة بنجاح", type: "success" } } })
        return { msg: email + " تم الإضافة بنجاح", type: "success" };
    }
    const submitInfo = {
        onSubmit: onSubmit,
        label: { ar: 'إضافة' }
    }
    return (
        <>
            {
                <FormCreator
                    title={title}
                    schema={CommissionerDetailsSchema}
                    submitInfo={submitInfo}
                    lookupObject={lookupObject}
                    errMessage={errMessage}
                    setErrMessage={(errMessage) => setErrMessage(errMessage)}
                    isLoading={loading}
                    navBackUrl={{ url: '/app/CommissionersManagement', state: { licenseNumber } }}
                />
            }
        </>
    )
}
export default AddCommissioner;