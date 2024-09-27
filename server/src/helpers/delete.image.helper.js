// Internal Dependencies
const fs = require('fs').promises;

// Image Delete Functionality
const deleteImage = async (image) => {
    try {
        await fs.access(image);
        await fs.unlink(image);
        console.log('Image deleted successfully');
    } catch (error) {
        console.error(`Image does not exist`);
    }
}

// Module Export
module.exports = { deleteImage };