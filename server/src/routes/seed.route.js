// External Dependencies
const express = require('express');

// Internal Dependencies
const { seedUser } = require('../controllers/seed.controllers');

// Instance
const seedRouter = express.Router();

// Routes
seedRouter.get('/users', seedUser);

// Module Export
module.exports = seedRouter;