// External Dependencies
const express = require('express');

// Internal Dependencies
const { getAllUsers, getUser } = require('../controllers/user.controllers');

// Initialize
const userRouter = express.Router();

// Routes
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);

// Module Export
module.exports = userRouter;