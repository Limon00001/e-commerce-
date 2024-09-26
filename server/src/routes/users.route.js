// External Dependencies
const express = require('express');

// Internal Dependencies
const { getAllUsers, getUser, deleteUser } = require('../controllers/user.controllers');

// Initialize
const userRouter = express.Router();

// Routes
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);

// Module Export
module.exports = userRouter;