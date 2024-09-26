// External Dependencies
const mongoose = require("mongoose");
const Client = require("../models/user.model");
const createError = require('http-errors');

// User Filter By ID
const findUserById = async (id) => {
    try {
        const options = { password: 0 };
        const user = await Client.findById(id, options);

        if (!user) return createError(404, 'No user found');
        return user;
    } catch (error) {
        if(error instanceof mongoose.Error) return createError(400, 'Invalid user id');
        throw error;
    }
}

// Module Export
module.exports = { findUserById }