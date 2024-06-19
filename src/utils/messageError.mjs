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
    ID: {
        IS_REQUIRED: 'please specify the user id',
        MUST_BE_NUMBER: 'user id must be a valid number',
        MUST_BE_VALID: 'user id must be a valid',
        MUST_BE_POSITIVE: 'user id must be a positive number',
        CANNOT_BE_EMPTY: 'user id cannot be left empty',
        MUST_BE_STRING: 'user id must be a string',
    },
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

const BREATHING_ACTIVITY = {
    DURATION: {
        REQUIRED: 'duration is required',
        BASE: 'duration must be a number',
        POSITIVE: 'duration must be a positive number',
    },
    REWARD: {
        REQUIRED: 'reward is required',
        BASE: 'reward must be a number',
        POSITIVE: 'reward must be a positive number',
    },
    USER_ID: {
        REQUIRED: 'user id is required',
        EMPTY: 'user id cannot be empty',
        BASE: 'user id must be a valid string',
    },
    DATE: {
        REQUIRED: 'date is required',
        BASE: 'date must be a number',
        INTEGER: 'date must be an integer',
    },
    NOT_FOUND: 'breathing activity not found',
}

const JOURNAL_ACTIVITY = {
    TITLE: {
        REQUIRED: 'title is required',
        EMPTY: 'title cannot be empty',
        BASE: 'title must be a valid string',
    },
    BODY: {
        REQUIRED: 'body is required',
        EMPTY: 'body cannot be empty',
        BASE: 'body must be a valid string',
    },
    REWARD: {
        REQUIRED: 'reward is required',
        BASE: 'reward must be a number',
        POSITIVE: 'reward must be a positive number',
    },
    USER_ID: {
        REQUIRED: 'user id is required',
        EMPTY: 'user id cannot be empty',
        BASE: 'user id must be a valid string',
    },
    DATE: {
        REQUIRED: 'date is required',
        BASE: 'date must be a number',
        INTEGER: 'date must be an integer',
    },
    ID: {
        REQUIRED: 'id is required',
        BASE: 'id must be a valid number',
        POSITIVE: 'id must be a positive number',
        CANNOT_BE_EMPTY: 'id cannot be left empty',
        IS_REQUIRED: 'please specify the id',
        MUST_BE_VALID: 'id must be a valid',
    },
}

const USER_MILESTONE = {
    TITLE: {
        REQUIRED: 'title is required',
        EMPTY: 'title cannot be empty',
        BASE: 'title must be a valid string',
    },
    DESCRIPTION: {
        REQUIRED: 'description is required',
        EMPTY: 'description cannot be empty',
        BASE: 'description must be a valid string',
    },
    TARGET_VALUE: {
        REQUIRED: 'target value is required',
        BASE: 'target value must be a number',
        POSITIVE: 'target value must be a positive number',
    },
    ACHIEVED_VALUE: {
        REQUIRED: 'achieved value is required',
        BASE: 'achieved value must be a number',
        POSITIVE: 'achieved value must be a positive number',
    },
    DATE_ACHIEVED: {
        REQUIRED: 'date achieved is required',
        BASE: 'date achieved must be a number',
        INTEGER: 'date achieved must be an integer',
    },
    USER_ID: {
        REQUIRED: 'user id is required',
        EMPTY: 'user id cannot be empty',
        BASE: 'user id must be a valid string',
    },
}

const RELAPSE = {
    USER_NOT_FOUND: 'user not found',
    PLAN_NOT_FOUND: 'user plan not found',
    RELAPSE_FAILED: 'failed to process relapse',
    REWARD: {
        REQUIRED: 'reward is required',
        BASE: 'reward must be a number',
        POSITIVE: 'reward must be a positive number',
    },
    DATE: {
        REQUIRED: 'date is required',
        BASE: 'date must be a number',
        INTEGER: 'date must be an integer',
    },
    CIGARETTES_THIS_DAY: {
        REQUIRED: 'cigarettes this day is required',
        BASE: 'cigarettes this day must be a number',
        INTEGER: 'cigarettes this day must be an integer',
    },
    USER_ID: {
        REQUIRED: 'user id is required',
        BASE: 'user id must be a valid string',
        CANNOT_BE_EMPTY: 'user id cannot be left empty',
        EMPTY: 'user id cannot be empty',
    },
    NO_ACTIVITY: 'there is no breathing activity or journal activity in this date',
    NO_USER_HEALTH: 'user health record not found',
}

export const errors = {
    HTTP: httpErrors,
    DATABASE,
    AUTHENTICATION,
    USER,
    AUTHORIZATION,
    ITEM,
    ACTIVITY_LOG,
    BREATHING_ACTIVITY,
    JOURNAL_ACTIVITY,
    USER_MILESTONE,
    RELAPSE,
}
