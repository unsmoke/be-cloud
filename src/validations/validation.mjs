import { errors } from '../utils/messageError.mjs'
import { JoiError } from '../utils/responseError.mjs'

export const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false,
    })
    if (result.error) {
        const arrayOfErrors = result.error.details.map((item) => ({
            key: item.context.key || item.context.label,
            message: item.message,
        }))
        throw new JoiError(
            errors.HTTP.CODE.BAD_REQUEST,
            errors.HTTP.STATUS.BAD_REQUEST,
            arrayOfErrors
        )
    } else {
        return result.value
    }
}
