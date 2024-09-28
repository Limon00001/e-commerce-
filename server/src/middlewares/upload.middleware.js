// External Dependencies
const multer = require('multer');

// Internal Dependencies
const path = require('path');
const { uploadFolder } = require('../secret');

// Directory
const UPLOAD_DIR = uploadFolder;

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
})

// Multer Instance
const upload = multer({ storage: storage })

// Module Export
module.exports = upload;