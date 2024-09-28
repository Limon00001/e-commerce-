// External Dependencies
const multer = require('multer');
const createError = require('http-errors');

// Internal Dependencies
const path = require('path');
const { uploadFolder, maxFileSize, allowedFileTypes } = require('../secret');

// Constants
const UPLOAD_DIR = uploadFolder;
const MAX_FILE_SIZE = maxFileSize;
const ALLOWED_FILE_TYPES = allowedFileTypes;

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);
        const fileName = file.originalname.replace(extname, '');
        const finalFileName = fileName.toLowerCase() + '-' + Date.now() + extname;
        cb(null, finalFileName);
    }
});

// File Filter
function fileFilter(req, file, cb) {
    const extname = path.extname(file.originalname);
    const isMatch = ALLOWED_FILE_TYPES.includes(extname.substring(1));
    if (!isMatch) {
        const error = createError(400, `File must be in 'jpg, 'jpeg' and 'png' format.`);
        return cb(error);
    }
    cb(null, true);
}

// Multer Instance
const upload = multer({
    storage: storage,
    limits: {
        fileSize: Number(MAX_FILE_SIZE)
    },
    fileFilter
})

// Module Export
module.exports = upload;