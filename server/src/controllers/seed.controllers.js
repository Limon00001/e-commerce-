// External Dependencies
const createError = require('http-errors');

// Internal Dependencies
const data = require("../data");
const Client = require("../models/user.model");

// Seed Controller
const seedUser = async (req, res, next) => {
    try {
        // Delete all existing users
        await Client.deleteMany({});

        // Create new user
        const newUser = await Client.insertMany(data.users)

        // Response
        return res.status(201).json(newUser);
    } catch (error) {
        next(createError(500, 'We encountered a technical issue while processing your registration. Please try again later.'));
    }
}

// Module exports
module.exports = { seedUser }