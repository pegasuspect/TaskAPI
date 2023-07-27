const crypto = require('crypto');
const { toBase64, toObj } = require('./utils');

const algorithm = 'aes-256-cbc';

// Key should be 256 bits (32 characters)
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');

function encrypt(text) {
  const iv = crypto.randomBytes(16); // IV should be 128 bits (16 characters)

  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const record = { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };

  return toBase64(record);
}

function decrypt(base64EncryptedText) {
  const encryptedObject = toObj(base64EncryptedText);
  const iv = Buffer.from(encryptedObject.iv, 'hex');

  const encryptedText = Buffer.from(encryptedObject.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt
}
