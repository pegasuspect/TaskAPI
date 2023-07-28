jest.mock('../../../lib/encryption');
jest.mock('../../../lib/utils');

const listTasks = require('../listTasks');
const { createHttpError } = require('../../../lib/utils');
const { decrypt } = require('../../../lib/encryption');

describe('listTask', () => {
  it('should forward an error to error handler', async () => {
    let req = {};
    let next = jest.fn();

    await listTasks(req, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should only list Technicians\' tasks for a Technician', async () => {
    let tasks = [{
      id: 6345,
    }];
    let req = {
      db: {
        Task: {
          findAll: jest.fn().mockResolvedValueOnce(tasks)
        }
      },
      user: {
        id: 50,
        role: 'Technician',
      },
    };
    let res = {
      json: jest.fn()
    }
    let next = jest.fn();

    await listTasks(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(decrypt).toHaveBeenCalledTimes(1);
    expect(req.db.Task.findAll).toHaveBeenCalledWith({
      where: { createdBy: 50 }
    });
  });
  
  it('should list all the tasks for a Manager', async () => {
    let tasks = [{
      id: 6345,
    }];

    let req = {
      db: {
        Task: {
          findAll: jest.fn().mockResolvedValueOnce(tasks)
        }
      },
      user: {
        id: 5,
        role: 'Manager',
      },
    };

    let res = {
      json: jest.fn()
    }
    
    let next = jest.fn();

    await listTasks(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(decrypt).toHaveBeenCalledTimes(1);
    expect(req.db.Task.findAll).toHaveBeenCalledWith();
  });
  
  it('should produce an http error for any other role', async () => {
    let tasks = [{
      id: 6345,
    }];

    let req = {
      db: {
        Task: {}
      },
      user: {
        id: 5,
        role: 'Guest',
      },
    };

    let res = {
      json: jest.fn()
    }

    let next = jest.fn();

    await listTasks(req, res, next);

    expect(createHttpError).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
});