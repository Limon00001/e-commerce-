// Error Handling
const errorResponse = (res, { statusCode = 500, message = 'Internal Server Error' }) => {
    return res.status(statusCode).json({
        error: {
            success: false,
            message: message,
        }
    })
}

// Success Handling
const successResponse = (res, { statusCode = 200, message = 'Success', payload = {} }) => {
    return res.status(statusCode).json({
        error: {
            success: true,
            message: message,
            payload,
        }
    })
}

// Module Export
module.exports = { errorResponse, successResponse }