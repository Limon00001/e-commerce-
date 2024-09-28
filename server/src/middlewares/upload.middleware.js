// External Dependencies
const multer = require('multer');

// Internal Dependencies
const path = require('path');
const { UPLOAD_USER_DIR, MAX_FILE_SIZE, FILE_TYPES } = require('../configs/config');

// Multer Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_USER_DIR)
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
    const isMatch = FILE_TYPES.includes(extname.substring(1));
    if (!isMatch) {
        const error = new Error(`File must be in 'jpg, 'jpeg' and 'png' format.`);
        return cb(error);
    }
    cb(null, true);
}

// Multer Instance
const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_FILE_SIZE
    },
    fileFilter
})

// Module Export
module.exports = upload;