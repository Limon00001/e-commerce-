/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/29/2025
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const { rateLimit } = require('express-rate-limit');

// Internal Dependencies
const userRouter = require('./routes/users.route');
const seedRouter = require('./routes/seed.route');
const { clientError, serverError } = require('./middlewares/errors.middleware');

// App Initialize
const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minute)
  message: 'Too many attempts. Please try again later.',
});

// Load Swagger YAML file
const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8'),
);

// Middlewares
app.use(limiter);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Client error handler
app.use(clientError);

// Server error handler
app.use(serverError);

// Module Export
module.exports = app;
