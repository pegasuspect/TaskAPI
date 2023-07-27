const jsonToBase64 = (obj) => {
  // Convert object to JSON
  const json = JSON.stringify(obj);

  // Convert JSON to Buffer
  const buffer = Buffer.from(json);

  // Convert Buffer to base64
  return buffer.toString('base64');
}

const base64toObj = (base64) => {
  // Convert base64 to Buffer
  const buffer = Buffer.from(base64, 'base64');

  // Convert Buffer to a string
  const json = buffer.toString();

  // Parse the JSON string to an object
  return JSON.parse(json);
}

const createHttpError = (code, msg, stack) => {
  const err = new Error(msg);
  err.status = code
  if (stack) {
    err.stack = stack;
  }

  return err;
}

module.exports = {
  jsonToBase64,
  base64toObj,
  createHttpError
}