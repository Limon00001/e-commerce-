// External Dependencies
const mongoose = require("mongoose");
const Client = require("../models/user.model");
const createError = require('http-errors');

// Filter By ID
const findWithById = async (id, options = {}) => {
    try {
        const element = await Client.findById(id, options);

        if (!element) return createError(404, 'No user found');
        return element;
    } catch (error) {
        if(error instanceof mongoose.Error) return createError(400, 'Invalid user id');
        throw error;
    }
}

// Module Export
module.exports = { findWithById }