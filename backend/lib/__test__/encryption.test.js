describe('encryption', () => {
  const OLD_ENV = process.env;
  
  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
    process.env.ENCRYPTION_KEY = 'hCxv1h+uwdjkkGjIx2iLfqLhlmBBT6sc6N25haDDqUc=';
    
  });
  
  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });
  
  it('should encrypt into base64 format', () => {
    const { encrypt } = require('../encryption');

    let encryptedBase64Text = encrypt('this is a test');

    let obj = JSON.parse(atob(encryptedBase64Text));

    expect(obj).toHaveProperty('iv');
  });

  it('should decrypt from base64 format', () => {
    const { encrypt, decrypt } = require('../encryption');

    let encryptedBase64Text = encrypt('this is a test');

    let text = decrypt(encryptedBase64Text);

    expect(text).toBe('this is a test');
  });
});