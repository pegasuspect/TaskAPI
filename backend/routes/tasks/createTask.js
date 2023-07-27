const { decrypt } = require("../../lib/encryption");

module.exports = async (req, res, next) => {
  try {
    const { Task } = req.db;

    const {
      date,
      summary
    } = req.body;

    const newTask = await Task.create({ 
      date, 
      summary, 
      createdBy: req.user.id 
    });

    const {
      channel,
      queue
    } = req.rabbit;

    let notificationMessage = `The tech ${
      req.user.email
    } performed the task ${
      decrypt(newTask.summary)
    } on date ${newTask.date}`;
    channel.sendToQueue(queue, new Buffer.from(notificationMessage));

    res.json({ id: newTask.id });
  } catch (error) {
    next(error);
  }
}