export const Constants = Object.freeze({

  BASE_API_URL: 'http://example.com/',

  STORAGE: {
    USER_INFO: 'USER_INFO'
  },

  HTTP_STATUS: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_ERROR: 500
  },

  HEADER: {
    AUTHORIZATION: 'Authorization',
    CONTENT_TYPE: 'Content-Type'
  },

  HEADER_VALUE : {
    APPLICATION_JSON: 'application/json',
  },

  OAUTH: {
    ACCESS_TOKEN: 'access_token',
    EXPIRES_IN: 'expires_in',
    TOKEN_TYPE: 'token_type',
    SCOPE: 'scope',
    CREATED_TIME: 'created_time'
  }
});
