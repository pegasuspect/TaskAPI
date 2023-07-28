jest.mock('../../lib/utils');

const authenticate = require('../authenticator');
const { createHttpError } = require('../../lib/utils');

describe('authenticate', () => {
  it('should act as a middleware', () => {
    let req = {
      user: null
    };
    let next = jest.fn();

    authenticate(req, {}, next);
    
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should create an http error if user is not authenticated', () => {
    let req = {
      user: null
    };
    let next = jest.fn();

    authenticate(req, {}, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(createHttpError).toHaveBeenCalled();
  });

  it('should authenticate if user is in session', () => {
    let req = {
      user: {
        id: 1,
        email: 'test@test'
      }
    };
    let next = jest.fn();
    
    authenticate(req, {}, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(createHttpError).toHaveBeenCalled();
  });
})