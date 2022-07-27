/* eslint-disable */
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ onSucess }) => {
    return (
        <>
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onExpired={(v) => { onSucess(false) }}
                onChange={(v) => { onSucess(true) }}
                hl="ar"
            />
        </>
    )
}

export default ReCaptcha;