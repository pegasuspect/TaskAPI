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

    res.json({ id: newTask.id });
  } catch (error) {
    next(error);
  }
}