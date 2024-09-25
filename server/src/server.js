// External Dependencies
const dotenv = require('dotenv');

// Internal Dependencies
const app = require('./app');
const { port } = require('./secret');
const dbConfig = require('./configs/db.config');

// Environment Configuration
dotenv.config();

// Server listening
app.listen(port, async () => {
    console.log(`Server is listening at http://localhost:${port}`);
    await dbConfig();
});