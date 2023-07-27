const dummySessionMiddleware = require('../dummySession');

describe('authorizer', () => {
  it('should act as a middleware', async () => {
    let req = {};
    let next = jest.fn();

    await dummySessionMiddleware(req, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should error if the database is not defined', async () => {
    let req = {};
    let next = jest.fn();

    await dummySessionMiddleware(req, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).not.toHaveBeenCalledWith();
  });

  it('should logout', async () => {
    let req = {
      path: '/logout'
    };
    let res = {
      json: jest.fn()
    }
    let next = jest.fn();

    await dummySessionMiddleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it('should set current user session on the request', async () => {
    let dbUser = {
      id: 1,
      email: 'test@mock'
    }
    let req = {
      db: {
        User: {
          findByPk: jest.fn().mockResolvedValueOnce(dbUser)
        }
      }
    };
    let next = jest.fn();

    await dummySessionMiddleware(req, {}, next);

    expect(req.user).not.toBeFalsy();
    expect(next).toHaveBeenCalledTimes(1);
  });

})