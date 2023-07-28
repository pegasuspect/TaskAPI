const {
  createHttpError,
  jsonToBase64,
  base64toObj
} = require('../utils');

const obj = {a: 1};
const objBase64Encoded = 'eyJhIjoxfQ==';

describe('routes', () => {
  it('should serialize object to base64', () => {
    expect(jsonToBase64(obj)).toEqual(objBase64Encoded);
  });

  it('should deserialize base64 to an object', () => {
    expect(base64toObj(objBase64Encoded)).toEqual(obj);
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