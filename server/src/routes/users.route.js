// External Dependencies
const express = require('express');

// Internal Dependencies
const { addUser, getAllUsers } = require('../controllers/user.controllers');

// Initialize
const userRouter = express.Router();

// Routes
userRouter.get('/', getAllUsers);

// Module Export
module.exports = userRouter;