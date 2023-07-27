const { decrypt } = require('../../lib/encryption');
const { createHttpError } = require('../../lib/utils');

module.exports = async (req, res, next) => {
  try {
    const { Task } = req.db;
    
    let tasks;
    
    if (req.user.role === 'Manager') {
      tasks = await Task.findAll();
    } else if (req.user.role === 'Technician') {
      tasks = await Task.findAll({
        where: { createdBy: req.user.id }
      });
    } else {
      throw createHttpError(401, 'Unauthorized!');
    }

    tasks.forEach(task => {
      try {
        task.summary = decrypt(task.summary);
      } catch (error) {
        console.error('Decryption error for task #', task.id);
      }
    });

    res.json({ tasks });
  } catch (error) {
    next(error);
  }
}