// External Dependencies
const express = require('express');

// Internal Dependencies
const { getAllUsers, getUser, deleteUser, registerUser, userActivation } = require('../controllers/user.controllers');
const upload = require('../middlewares/upload.middleware');

// Initialize
const userRouter = express.Router();

// Routes
userRouter.post('/register', upload.single('image'), registerUser);
userRouter.post('/verify', userActivation);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);

// Module Export
module.exports = userRouter;