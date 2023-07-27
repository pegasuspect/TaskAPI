// Middlewares
const is = require('../middlewares/authorizer');
const authenticate = require('../middlewares/authenticator');

// Task Handlers
const listTasks = require('./tasks/listTasks');
const createTask = require('./tasks/createTask');
const updateTask = require('./tasks/updateTask');
const deleteTask = require('./tasks/deleteTask.js');
const notFoundMiddleware = require('./notFound');
const errorHandler = require('./errorHandler');

const defineRoutes = (app) => {
  // Get users' current session
  app.get('/session', (req, res, next) => {
    res.json(req.user);
  });

  // Require authentication for all endpoints.
  app.use(authenticate);

  // List Tasks
  app.get('/', listTasks);

  // New Task
  app.post('/', createTask);

  // Update Task
  app.put('/', updateTask);

  // Delete Task
  app.delete('/:id', is('Manager'), deleteTask);

  // catch 404 and forward to error handler
  app.use(notFoundMiddleware);

  app.use(errorHandler);
}

module.exports = defineRoutes;