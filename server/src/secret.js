// External Dependencies
const dotenv = require('dotenv');

// Environment Configuration
dotenv.config();

// Configurations
const port = process.env.PORT || 5000;
// const dbUrl = process.env.MONGO_ATLAS_URL || process.env.MONGO_COMPASS_URL;
const dbUrl = process.env.MONGO_COMPASS_URL;
const salt = process.env.SALT;
const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/default.png';
const jwtAccessKey = process.env.JWT_ACCESS_KEY;

// Module Export
module.exports = { port, dbUrl, salt, defaultImagePath, jwtAccessKey };