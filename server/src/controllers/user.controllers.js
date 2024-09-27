// External Dependencies
const createError = require('http-errors');

// Internal Dependencies
const Client = require('../models/user.model');
const { successResponse } = require('../controllers/response.controllers');
const { findWithById } = require('../services/find.service');
const { deleteImage } = require('../helpers/delete.image.helper');
const { jwtAccessKey, clientSite } = require('../secret');
const { createToken } = require('../helpers/token.helper');
const { sendEmail } = require('../helpers/email.helper');

// User Controllers
// New User
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Check user already exists or not
        const existingUser = await Client.exists({ email: email });
        if (existingUser) return next(createError(409, 'This email already exists. Please login.'));

        // Create Token
        const token = createToken({ name, email, password, phone, address }, jwtAccessKey, '10m');

        // Prepare Email
        const emailData = {
            email,
            subject: 'Account Verification Email',
            html: `
            <h2>Hello ${name} !</h2>
            <p>Please click here <a href='${clientSite}/api/users/activate/${token}' target='_blank'> to verify your account</a></p>
            `
        };

        // Send Email
        try {
            await sendEmail(emailData);
        } catch (error) {
            return next(createError(500, 'Failed to send email'));
        }

        // Response
        return successResponse(res, {
            statusCode: 200,
            message: `Please check your email ${email}`,
            payload: { token }
        })
    } catch (error) {
        next(error);
    }
};

// Get All Users
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

        // if(users.length === 0) throw createError(404, 'No users found');
        if (users.length === 0) return next(createError(404, 'No user found'));

        const count = await Client.find(filter).countDocuments();

        return successResponse(res, {
            statusCode: 200,
            message: 'All users fetched successfully',
            payload: {
                users: users,
                pagination: {
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null
                }
            }
        })
    } catch (error) {
        next(createError(500, 'Error fetching data'));
    }
};

// Get Single User
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const options = { password: 0 };
        const user = await findWithById(Client, id, options);

        return successResponse(res, {
            payload: {
                user: user,
            }
        })
    } catch (error) {
        next(createError(500, 'Error fetching data'));
    }
};

// Delete User
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const options = { password: 0 };
        const user = await findWithById(Client, id, options);

        if (user instanceof Error) {
            return next(user);
        }

        const userImage = user.image;

        deleteImage(userImage);

        await Client.findByIdAndDelete({ _id: id, isAdmin: false });

        return successResponse(res, {
            message: 'User deleted successfully'
        })
    } catch (error) {
        next(createError(500, 'Error deleting data'));
    }
};

// Module Export
module.exports = { registerUser, getAllUsers, getUser, deleteUser };