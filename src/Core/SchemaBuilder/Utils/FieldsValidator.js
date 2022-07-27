import DefualtValidatorsFunc from './DefualtValidatorsFunc'

class BreakException extends Error {
    constructor(message, cause) {
        super(message)
        this.cause = cause
        this.name = 'ReadError'
    }
}

export default function validateSchema({ schema, values, t }) {
    const errors = {}
    schema?.forEach(element => {
        try {
            element?.validators?.forEach(validator => {
                console.log("validator ==> ", validator)
                console.log("element ==> ", validator)
                if (!!DefualtValidatorsFunc[validator]) {
                    validator = DefualtValidatorsFunc[validator]
                }
                if (!validator.isValidFun(values[element.name])) {
                    //errors[element.name] = t("lang") === "en" ? validator.massege.en : validator.massege.ar
                    errors[element.name] = validator.alert
                    throw new BreakException('Break')
                }
            })
        } catch (e) {
            if (e instanceof BreakException) {
                console.log(e.message)
            }
        }
    })
    return errors
}