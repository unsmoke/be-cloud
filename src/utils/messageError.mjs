const httpErrors = {
    CODE: {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },
    STATUS: {
        BAD_REQUEST: 'bad request',
        UNAUTHORIZED: 'unauthorized',
        FORBIDDEN: 'forbidden',
        NOT_FOUND: 'not found',
        INTERNAL_SERVER_ERROR: 'internal server error',
    },
    MESSAGE: {
        INTERNAL_SERVER_ERROR: "we're sorry, but there was a server error, please try again later",
        INVALID_API_ROUTE:
            'the requested API route is not valid, please check your request and try again',
        FORBIDDEN: 'you are not allowed to access this resource',
        NOT_FOUND: 'the requested resource is not found',
        UNKNOWN_BODY_ERROR: 'the request body is invalid, please check your input and try again',
        UNAUTHORIZED: 'you are not authorized to access this resource',
    },
}

const AUTHENTICATION = {
    INVALID_CREDENTIALS: 'invalid email or password, please verify and retry',
}

const AUTHORIZATION = {
    INVALID_REFRESH_TOKEN: 'invalid refresh token',
}

const DATABASE = {
    CONNECTION: 'failed to connect to the database, please try again later',
}

const USER = {
    NOT_FOUND: 'user not found',
    EMAIL_ALREADY_EXISTS: 'the email address is already in use',
    INSUFFICIENT_BALANCE: 'you do not have enough balance',
}

const ITEM = {
    NOT_FOUND: 'item not found',
}

const ACTIVITY_LOG = {
    ID: {
        IS_REQUIRED: 'please specify the activity log id',
        MUST_BE_NUMBER: 'activity log id must be a valid number',
        MUST_BE_VALID: 'activity log id must be a valid',
        MUST_BE_POSITIVE: 'activity log id must be a positive number',
        CANNOT_BE_EMPTY: 'activity log id cannot be left empty',
    },
}

export const errors = {
    HTTP: httpErrors,
    DATABASE: DATABASE,
    AUTHENTICATION: AUTHENTICATION,
    USER: USER,
    AUTHORIZATION: AUTHORIZATION,
    ITEM: ITEM,
    ACTIVITY_LOG: ACTIVITY_LOG,
}
