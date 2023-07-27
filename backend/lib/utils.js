
const toBase64 = (obj) => {
  // Convert object to JSON
  const json = JSON.stringify(obj);

  // Convert JSON to Buffer
  const buffer = Buffer.from(json);

  // Convert Buffer to base64
  return buffer.toString('base64');
}

const toObj = (base64) => {
  // Convert base64 to Buffer
  const buffer = Buffer.from(base64, 'base64');

  // Convert Buffer to a string
  const json = buffer.toString();

  // Parse the JSON string to an object
  return JSON.parse(json);
}

module.exports = {
  toBase64,
  toObj
}