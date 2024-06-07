const httpSuccess = {
  CODE: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
  },
  STATUS: {
    OK: 'ok',
    CREATED: 'created',
    NO_CONTENT: 'no content',
  },
};

export const success = {
  HTTP: httpSuccess,
};

const httpFailure = {
  CODE: {
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  STATUS: {
    NOT_FOUND: 'not found',
    INTERNAL_SERVER_ERROR: 'internal server error',
  },
};

export const failure = {
  HTTP: httpFailure,
};
