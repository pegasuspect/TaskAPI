const { createHttpError } = require("../../lib/utils");

module.exports = async (req, res, next) => {
  try {
    const { Task } = req.db;
    const {
      id,
      date,
      summary
    } = req.body;

    let task = await Task.findByPk(id);
    if (task) {
      console.log('Found task!');

      if (req.user.role === 'Manager') {
        console.log('Manager update...');

        await Task.update({ date, summary }, {
          where: { id: task.id },
          individualHooks: true
        });
      } else if (req.user.role === 'Technician') {

        if (task.createdBy !== req.user.id) {
          console.log('Technician unauthorized...');

          throw createHttpError(401, 'Unauthorized!');
        }

        console.log('Technician update...');

        await Task.update({ date, summary }, {
          where: {
            id: task.id,
            createdBy: req.user.id
          },
          individualHooks: true
        });
      } else { // catch all for any new role
        console.log('New role is not recognized!');

        throw createHttpError(401, 'Unauthorized!');
      }
    } else {
      throw createHttpError(404, 'Task not found!')
    }


    res.json(true);
  } catch (error) {
    next(error);
  }

}