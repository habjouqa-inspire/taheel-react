/* eslint-disable */
import Captcha from "demos-react-captcha";
const TextCaptcha = ({ onSucess }) => {

    return <>
        <Captcha
            onChange={(v) => { onSucess(v) }}
            placeholder="الرجاء إدخال الرمز " 
            length={6} 
            onRefresh={(v) => { onSucess(false) }}
        /></>
}

export default TextCaptcha;