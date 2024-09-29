// External Dependencies
const mongoose = require("mongoose");
const createError = require('http-errors');

// Filter By ID
const findWithById = async (Model, id, options = {}) => {
    try {
        const element = await Model.findById(id, options);

        if (!element) return createError(404, `No ${Model.modelName} found`);

        // if (!mongoose.isValidObjectId(id)) {
        //     throw new Error(`Invalid ${Model.modelName} Id`);
        // }
        return element;
    } catch (error) {
        if(error instanceof mongoose.Error) return createError(400, `Invalid ${Model.modelName} Id`);
        throw error;
    }
}

// Module Export
module.exports = { findWithById }