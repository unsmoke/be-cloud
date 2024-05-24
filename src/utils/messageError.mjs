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
        INTERNAL_SERVER_ERROR:
            "we're sorry, but there was a server error, please try again later",
        INVALID_API_ROUTE:
            'the requested API route is not valid, please check your request and try again',
        FORBIDDEN: 'you are not allowed to access this resource',
        NOT_FOUND: 'the requested resource is not found',
        UNKNOWN_BODY_ERROR: 'the request body is invalid, please check your input and try again',
        UNAUTHORIZED: 'you are not authorized to access this resource',

    },
}

const DATABASE = {
    CONNECTION: 'failed to connect to the database, please try again later',
}

export const errors = {
    HTTP: httpErrors,
    DATABASE: DATABASE,
}
