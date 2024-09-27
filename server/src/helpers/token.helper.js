// External Dependencies
const jwt = require('jsonwebtoken');

// Token Creation
const createToken = (payload, secretKey, expiresIn = '20m') => {
    if(!payload || typeof payload !== 'object') throw new Error(`Payload must be an object and can not be empty.`);
    if(typeof secretKey !== 'string' || secretKey === '') throw new Error(`SecretKey must be a string and can not be empty.`);
    try {
        const token = jwt.sign(payload, secretKey, { expiresIn })
        return token;
    } catch (error) {
        console.error(`Failed to create token: ${error}`);
        throw error;
    }
}

// Module Export
module.exports = { createToken }