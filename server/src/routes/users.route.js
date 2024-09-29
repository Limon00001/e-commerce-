// External Dependencies
const express = require('express');

// Internal Dependencies
const { getAllUsers, getUser, deleteUser, registerUser, userActivation, updateUser } = require('../controllers/user.controllers');
const upload = require('../middlewares/upload.middleware');
const { registerValidationRules } = require('../validators/auth.validator');
const runValidation = require('../validators/run.validator');

// Initialize
const userRouter = express.Router();

// Routes
userRouter.post('/register', upload.single('image'), registerValidationRules, runValidation, registerUser);
userRouter.post('/verify', userActivation);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', upload.single('image'), updateUser);

// Module Export
module.exports = userRouter;