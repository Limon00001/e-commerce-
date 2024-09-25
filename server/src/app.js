// External Dependencies
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const { rateLimit } = require('express-rate-limit');

// Internal Dependencies
const userRouter = require('./routes/users.route');
const seedRouter = require('./routes/seed.route');

// App Initialize
const app = express();

// Rate limiting middleware
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minute)
	message: 'Too many attempts. Please try again later.'
})

// Middlewares
app.use(limiter);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/seed', seedRouter);

// Client error handler
app.use((req, res, next) => {
    next(createError(404, 'Sorry, We could not found your request.'));
});

// Server error handler
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        error: {
            success: false,
            message: err.message || 'Something went wrong!',
        }
    })
});

// Module Export
module.exports = app;