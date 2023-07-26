const is = require('./authorizer');
const authenticate = require('./authenticator');
const Task = require('../databaseModels/Task');

const defineRoutes = (app) => {
  // Require authentication for all endpoints.
  app.use(authenticate);

  // List Tasks
  app.get('/', (req, res) => {
    // depending on the role;
    // - all
    // - my tasks
    let tasks = [
      {id: 0, date: new Date(), summary: 'Lorem ipsum dolor sit amet.'},
      {id: 1, date: new Date(), summary: 'Lorem ipsum dolor sit amet.'},
      {id: 2, date: new Date(), summary: 'Lorem ipsum dolor sit amet.'},
      {id: 3, date: new Date(), summary: 'Lorem ipsum dolor sit amet.'},
      {id: 4, date: new Date(), summary: 'Lorem ipsum dolor sit amet.'},
    ];

    res.json({ tasks });
  });

  // New Task
  app.post('/', is('Technician'), async (req, res) => {
    console.log(req.body);

    const {
      date,
      summary
    } = req.body;
    
    const newTask = await Task.create({ date, summary });

    res.json({ id: newTask.id });
  });

  // Update Task
  app.put('/', is('Technician'), (req, res) => {
    const {
      id,
      date,
      summary
    } = req.body;
    
    const task = {id}; // get record from db
    task.date = date;
    task.summary = summary;
    task.save();
    // save to db.

    res.json({ tasks });
  });

  // Delete Task
  app.delete('/:id', is('Manager'), (req, res) => {
    // delete
    //using req.params.id
    console.log(`Deleting ${req.params.id}!`);
    res.json(true);
  })

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('Not Found!');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    console.error(err);

    const responseStatus = err.status || 500;
    const errorResponse = {
      status: responseStatus,
      msg: err.message,
    };

    if (process.env.NODE_ENV !== "production") {
      // Only send stack trace for development.
      errorResponse.stackTrace = err.stack.split('\n');
    }

    res.status(responseStatus).json(errorResponse);
  });
}

module.exports = defineRoutes;