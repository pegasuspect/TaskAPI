const deleteTask = require("../deleteTask");
describe('deleteTask', () => {
  it('should forward an error to error handler', async () => {

    let req = {};
    let next = jest.fn();

    await deleteTask(req, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call destroy method on ORM to delete Task', async () => {
    let req = {
      db: {
        Task: {
          destroy: jest.fn().mockResolvedValueOnce()
        }
      },
      params: {
        id: 982392
      }
    };
    let res = {
      json: jest.fn()
    }
    let next = jest.fn();

    await deleteTask(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(req.db.Task.destroy).toHaveBeenCalled();
  });

});