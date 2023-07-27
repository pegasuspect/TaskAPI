module.exports = async (req, res, next) => {
  try {
    const { Task } = req.db;

    await Task.destroy({
      where: {
        id: req.params.id
      }
    });

    console.log(`Deleting task with id: ${req.params.id}!`);

    res.json(true);
  } catch (error) {
    next(error);
  }
}