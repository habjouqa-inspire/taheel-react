/* eslint-disable*/

import { useState } from "react";
import { getCurrentUser } from "src/Core/Utils/UserLocalStorage";
 const {firstName,secondName,thirdName,lastName,idNumIqamaNum}=getCurrentUser()

const TermsContent = (termsAndCondtions,values) => (
    <>
{console.log('ssssssssssssssssssssssssdddddddddddd',termsAndCondtions)}
{!termsAndCondtions?"لا يوجد إقرار":    <td dangerouslySetInnerHTML={{__html:termsAndCondtions.replaceAll(' 0000000000000 ',' '+ firstName+' '+secondName+' '+lastName+' ').replaceAll(' 000000000000 ',' '+idNumIqamaNum+' ').replaceAll('00000000', values?.centerLicenseNumber)}} />}

    </>
)

export default TermsContent;