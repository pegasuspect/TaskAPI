jest.mock('../../../lib/utils');

const { createHttpError } = require("../../../lib/utils");

const updateTask = require("../updateTask");

describe('updateTask', () => {
  it('should forward an error to error handler', async () => {

    let req = {};
    let next = jest.fn();

    await updateTask(req, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should respond with not found if task doesn\'t exist', async () => {
    let req = {
      db: {
        Task: {
          findByPk: jest.fn().mockResolvedValueOnce(),
        }
      },
      body: {
        id: 4234,
        date: +new Date() //+ converts to integer in unix seconds
      },
      user: {
        id: 13,
        role: 'Technician',
      }
    };
    let res = {
      json: jest.fn()
    }
    let next = jest.fn();

    await updateTask(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(createHttpError).toHaveBeenCalled();
    expect(req.db.Task.findByPk).toHaveBeenCalled();
  });

  it('should only update Technician\'s owned task', async () => {
    let date = +new Date(); //unix date in seconds
    let taskToUpdate = {
      id: 4234,
      date,
      summary: 'mockSUmmary',
      createdBy: 13
    }

    let req = {
      db: {
        Task: {
          update: jest.fn().mockResolvedValueOnce(),
          findByPk: jest.fn().mockResolvedValueOnce(taskToUpdate),
        }
      },
      body: {
        id: 4234,
        date: +new Date() //+ converts to integer in unix seconds
      },
      user: {
        id: 13,
        role: 'Technician',

      }
    };
    let res = {
      json: jest.fn()
    }
    let next = jest.fn();

    await updateTask(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(req.db.Task.findByPk).toHaveBeenCalled();
    expect(req.db.Task.update).toHaveBeenCalled();
  });
  
  it('should allow a task update if a Manager tries to', async () => {
    let date = +new Date(); //unix date in seconds
    let taskToUpdate = {
      id: 4234,
      date,
      summary: 'mockSUmmary',
      createdBy: 13
    }

    let req = {
      db: {
        Task: {
          update: jest.fn().mockResolvedValueOnce(),
          findByPk: jest.fn().mockResolvedValueOnce(taskToUpdate),
        }
      },
      body: {
        id: 4234,
        date: +new Date() //+ converts to integer in unix seconds
      },
      user: {
        id: 534242,
        role: 'Manager',

      }
    };
    let res = {
      json: jest.fn()
    }
    let next = jest.fn();

    await updateTask(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(req.db.Task.findByPk).toHaveBeenCalled();
    expect(req.db.Task.update).toHaveBeenCalled();
  });

  it('should unauthorize a Technician if the task is owned by someone else', async () => {
    let date = +new Date(); //unix date in seconds
    let taskToUpdate = {
      id: 4234,
      date,
      summary: 'mockSUmmary',
      createdBy: 13
    }

    let req = {
      db: {
        Task: {
          update: jest.fn().mockResolvedValueOnce(),
          findByPk: jest.fn().mockResolvedValueOnce(taskToUpdate),
        }
      },
      body: {
        id: 4234,
        date: +new Date() //+ converts to integer in unix seconds
      },
      user: {
        id: 534242,
        role: 'Technician',
      }
    };
    let next = jest.fn();

    await updateTask(req, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(createHttpError).toHaveBeenCalled();
  });

  it('should unauthorize update for unknown roles', async () => {
    let date = +new Date(); //unix date in seconds
    let taskToUpdate = {
      id: 4234,
      date,
      summary: 'mockSUmmary',
      createdBy: 13
    }

    let req = {
      db: {
        Task: {
          update: jest.fn().mockResolvedValueOnce(),
          findByPk: jest.fn().mockResolvedValueOnce(taskToUpdate),
        }
      },
      body: {
        id: 4234,
        date: +new Date() //+ converts to integer in unix seconds
      },
      user: {
        id: 534242,
        role: 'Random',
      }
    };
    let next = jest.fn();

    await updateTask(req, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(createHttpError).toHaveBeenCalled();
  });

});