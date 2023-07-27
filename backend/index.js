// Libraries
require('dotenv').config();
const path = require('path');
const logger = require('morgan');
const defineRoutes = require('./routes');
const dummySession = require('./middlewares/dummySession');
const db = require('./databaseModels');

// Express JS
const express = require('express');
const app = express();

app.use((req, res, next) => {
  // Set database reference
  req.db = db;
  next();
})

// Request Logger
app.use(logger('dev'));

// Start listening to requests on the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Request parsed as json;
// has to be done before defining routes!
app.use(express.json());

// Dummy session Middleware for simplification.
app.use(dummySession);

defineRoutes(app);
