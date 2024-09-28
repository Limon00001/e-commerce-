// External Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Internal Dependencies
const { salt, defaultImagePath } = require('../secret');

// Model Schema
const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        maxlength: [31, 'Maximum length exceeds'],
        minlength: [3, 'Name must be 3 characters long'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function(value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: 'Please enter a valid email address'
        },
        // match: [
        //     /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        //     'Please enter a valid email address'
        // ],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        set: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(Number(salt)))
    },
    image: {
        // For String Type
        // type: String,
        // default: defaultImagePath,
        // required: [true, 'Image is required'],

        // For Buffer Type
        type: Buffer,
        contentType: String,
        required: [true, 'Image is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

// Model
const Client = mongoose.model('Client', clientSchema);

// Model Export
module.exports = Client;