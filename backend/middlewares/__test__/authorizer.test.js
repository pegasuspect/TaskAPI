jest.mock('../../lib/utils');

const is = require('../authorizer');
const utils = require('../../lib/utils');

describe('authorizer', () => {
  it('should act as a middleware', () => {
    let req = {
      user: {
        id: 1,
        role: 'admin'
      }
    };
    let next = jest.fn();

    let adminMiddlewareGate = is('admin');
    adminMiddlewareGate(req, {}, next);

    
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should authorize the target user role', () => {
    let req = {
      user: {
        id: 1,
        role: 'admin'
      }
    };
    let next = jest.fn();
    let httpError = new Error()
    const { createHttpError } = utils;
    createHttpError.mockReturnValueOnce(httpError);

    let adminMiddlewareGate = is('admin');
    adminMiddlewareGate(req, {}, next);

    expect(next).not.toHaveBeenCalledWith(httpError);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should create an http error if user is not authenticated', () => {
    let req = {
      user: null
    };
    let next = jest.fn();

    let httpError = new Error()
    const { createHttpError } = utils;
    createHttpError.mockReturnValueOnce(httpError);
    let technicianMiddlewareGate = is('Technician');
    technicianMiddlewareGate(req, {}, next);
    
    expect(next).toHaveBeenCalledWith(httpError);
    expect(next).toHaveBeenCalledTimes(1);
  });
})