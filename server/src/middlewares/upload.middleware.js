// External Dependencies
const multer = require('multer');

// Internal Dependencies
const path = require('path');
const { UPLOAD_USER_DIR, MAX_FILE_SIZE, FILE_TYPES, BUFFER_FILE_TYPES } = require('../configs/config');

// Multer Configuration [String Type image]
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, UPLOAD_USER_DIR)
//     },
//     filename: function (req, file, cb) {
//         const extname = path.extname(file.originalname);
//         const fileName = file.originalname.replace(extname, '');
//         const finalFileName = fileName.toLowerCase() + '-' + Date.now() + extname;
//         cb(null, finalFileName);
//     }
// });

// Multer Configuration [Buffer Type image]
const storage = multer.memoryStorage();

// File Filter [String Type image]
// function fileFilter(req, file, cb) {
//     const extname = path.extname(file.originalname);
//     const isMatch = FILE_TYPES.includes(extname.substring(1));
//     if (!isMatch) {
//         const error = new Error(`File must be in 'jpg, 'jpeg' and 'png' format.`);
//         return cb(error);
//     }
//     cb(null, true);
// }

// File Filer [Buffer Type image]
function fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
        const error = new Error('Only images are allowed.');
        return cb(error, false);
    }
    if (file.size > MAX_FILE_SIZE) {
        const error = new Error('Please ensure that the file size does not exceed 10 MB.');
        return cb(error, false);
    }
    if (!BUFFER_FILE_TYPES.includes(file.mimetype)) {
        const error = new Error(`File must be in 'jpg, 'jpeg' and 'png' format.`);
        return cb(error, false);
    }
    cb(null, true);
}

// Multer Instance [String Type Image]
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: MAX_FILE_SIZE
//     },
//     fileFilter
// })

// Multer Instance [Buffer Type Image]
const upload = multer({
    storage: storage,
    fileFilter
})

// Module Export
module.exports = upload;