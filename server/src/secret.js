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
const smtpUser = process.env.SMTP_USERNAME || '';
const smtpPassword = process.env.SMTP_PASSWORD || '';
const clientSite = process.env.CLIENT_SITE;
const uploadFolder = process.env.UPLOAD_DIR || 'public/images/users';
const maxFileSize = process.env.MAX_FILE_SIZE || 10 * 1024 * 1024;  // 10 MB
const allowedFileTypes = process.env.FILE_TYPES || ['png', 'jpg', 'jpeg'];

// Module Export
module.exports = { port, dbUrl, salt, defaultImagePath, jwtAccessKey, smtpUser, smtpPassword, clientSite, uploadFolder, maxFileSize, allowedFileTypes };