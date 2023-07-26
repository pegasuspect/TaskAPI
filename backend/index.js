// Libraries
require('dotenv').config();
const path = require('path');
const logger = require('morgan');
const defineRoutes = require('./lib/routes');
const db = require('./databaseModels');

// Express JS
const express = require('express');
const app = express();

// Set global database reference
app.db = db;

// Request Logger
app.use(logger('dev'));

// Start listening to requests on the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Request parsed as json;
// has to be done before defining routes!
app.use(express.json());

defineRoutes(app);
