// External Dependencies
const createHttpError = require("http-errors");

// Internal Dependencies
const { errorResponse } = require("../controllers/response.controllers");

// Client Error
const clientError = (req, res, next) => {
    next(createHttpError(404, 'Sorry, We could not found your request.'));
}

// Server Error
const serverError = (err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
}

// Module exports
module.exports = { clientError, serverError }