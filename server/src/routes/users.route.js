// External Dependencies
const express = require('express');

// Internal Dependencies
const { getAllUsers } = require('../controllers/user.controllers');

// Initialize
const userRouter = express.Router();

// Routes
userRouter.get('/', getAllUsers);

// Module Export
module.exports = userRouter;