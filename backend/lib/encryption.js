const crypto = require('crypto');
const { jsonToBase64, base64toObj } = require('./utils');

const algorithm = 'aes-256-cbc';

const generateNewEncryptionKey = () => crypto.randomBytes(32).toString('base64');

const keyValid = (key) => {
  if (!key) {
    console.error('No key detected! Please use the right key for encryption.');
    return false;
  }

  if (key.length !== 44) {
    console.error('Key is corrupted. Please reach out to the admin.');
    return false;
  }

  return true;
}

const encrypt = (text) => {
  const { ENCRYPTION_KEY } = process.env;
  if (!keyValid(ENCRYPTION_KEY)) {
    return text;
  }
  // Key should be 256 bits (32 characters/bytes)
  // So decode it from base64 to 256 bits buffer
  const key = Buffer.from(ENCRYPTION_KEY, 'base64');

  // IV should be 128 bits (16 characters)
  const iv = crypto.randomBytes(16);

  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const record = { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };

  return jsonToBase64(record);
}

const decrypt = (base64EncryptedText) => {
  const { ENCRYPTION_KEY } = process.env;
  if (!keyValid(ENCRYPTION_KEY)) {
    return base64EncryptedText;
  }

  // Get the same key from env variables for decoding.
  const key = Buffer.from(ENCRYPTION_KEY, 'base64');

  const encryptedObject = base64toObj(base64EncryptedText);
  const iv = Buffer.from(encryptedObject.iv, 'hex');

  const encryptedText = Buffer.from(encryptedObject.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt,
  generateNewEncryptionKey
}
