// External Dependencies
const createError = require('http-errors');

// Internal Dependencies
const Client = require('../models/user.model');

// User Controllers
const addUser = async (req, res, next) => {
    try {
        res.status(201).json({
            success: true,
            message: 'User added successfully'
        })
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const search = req.query.search || '';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp('.*' + search + '.*', 'i');
        const filter = {
            isAdmin: { $ne: true },   // Filtering users without `Admin`
            $or: [
                { name: { $regex: searchRegExp } },   // Search by name
                { email: { $regex: searchRegExp } },  // Search by email
                { phone: { $regex: searchRegExp } }   // Search by phone
            ]
        };

        const options = { password: 0 };

        const users = await Client.find(filter, options).limit(limit).skip((page - 1) * limit);  // Show All Users except `Admin`
        if(!users) throw createError(404, 'No users found');

        const count = await Client.find(filter).countDocuments();
        
        res.status(200).json({
            success: true,
            message: 'All users fetched successfully',
            users: users,
            pagination: {
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit)? page + 1 : null
            }
        })
    } catch (error) {
        next(createError(500, 'Error fetching data'));
    }
};

// Module Export
module.exports = { addUser, getAllUsers };