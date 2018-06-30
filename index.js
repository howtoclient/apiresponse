const
    Response = require('./APIResponse/Response'),
    APIResponse = require('./APIResponse/APIResponse'),
    ValidationError = require('./APIResponse/errors/ValidationError'),
    NotFoundError = require('./APIResponse/errors/NotFoundError'),
    AccessError = require('./APIResponse/errors/AccessError'),
    AuthenticationError = require('./APIResponse/errors/AuthenticationError');


module.exports = {
    Response,
    APIResponse,
    AccessError,
    NotFoundError,
    ValidationError,
    AuthenticationError
};