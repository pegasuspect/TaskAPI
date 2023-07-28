jest.mock('../../../lib/encryption');

const createTask = require("../createTask");

describe('createTask', () => {
  it('should forward an error to error handler', async () => {
    const mockNext = jest.fn();

    await createTask({}, {}, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should create a new task', async () => {
    const mockReq = {
      db: {
        Task: {
          create: jest.fn().mockResolvedValueOnce({ id: 1 })
        }
      },
      rabbit: {
        channel: { sendToQueue: jest.fn() },
        queue: 'mockQ',
      },
      user: {
        id: 1
      },
      body: {
        date: 'mock date',
        summary: 'mock summary'
      }
    };

    const mockRes = {
      json: jest.fn()
    }

    const mockNext = jest.fn();

    await createTask(mockReq, mockRes, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledTimes(1);
    expect(mockReq.rabbit.channel.sendToQueue).toHaveBeenCalledTimes(1);
    expect(mockReq.db.Task.create).toHaveBeenCalledWith({
      ...mockReq.body, 
      createdBy: 1
    });
  });
})