const jsonToBase64 = (obj) => {
  return Buffer.from(JSON.stringify(obj)).toString();
}

const base64toObj = (base64) => {
  const jsonData = Buffer.from(base64, 'base64').toString();

  try {
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(error);
    return null;
  }
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