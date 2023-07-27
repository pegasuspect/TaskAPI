const {
  createHttpError,
  jsonToBase64,
  base64toObj
} = require('../utils');

describe('routes', () => {
  it('should serialize object to base64', () => {
    let obj = {a: 1, b: 2};
    expect(jsonToBase64(obj)).toEqual(btoa(JSON.stringify(obj)));
  });

  it('should deserialize base64 to an object', () => {
    let serializedObj = btoa(JSON.stringify({a: 1, b: 2}));
    expect(base64toObj(serializedObj)).toEqual({a: 1, b: 2});
  });

  it('should create an error for http response', () => {
    let error = createHttpError(123, 'test', 'stack');
    
    expect(error).toHaveProperty('status');
  });

  it('should override stack trace if its passed', () => {
    let errorWithTrace = new Error();
    let error = createHttpError(123, 'test', errorWithTrace.stack);
    console.log(error.stack);

    // createHttpError will not be present in the stack trace
    // because the error is one level above.
    expect(error.stack).not.toMatch('createHttpError');
  });

  it('should keep stack trace from the createHttpError function', () => {
    let error = createHttpError(123, 'test');
    console.log(error.stack);

    // createHttpError will not be present in the stack trace
    // because the error is one level above.
    expect(error.stack).toMatch('createHttpError');
  });

});