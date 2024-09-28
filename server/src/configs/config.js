// Configurations
const UPLOAD_USER_DIR = 'public/images/users';
const MAX_FILE_SIZE = 10 * 1024 * 1024;  // 10 MB
const FILE_TYPES = ['png', 'jpg', 'jpeg'];
const BUFFER_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

// Module exports
module.exports = { UPLOAD_USER_DIR, MAX_FILE_SIZE, FILE_TYPES, BUFFER_FILE_TYPES };