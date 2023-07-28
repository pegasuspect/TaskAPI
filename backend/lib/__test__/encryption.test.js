jest.mock('crypto', () => ({
  createCipheriv: () => ({
    update: () => Buffer.from('update'),
    final: () => Buffer.from('final'),
  }),
  createDecipheriv: () => ({
    update: () => Buffer.from('decipherUpdate'),
    final: () => Buffer.from('decipherFinal'),
  }),
  randomBytes: () => Buffer.from('mock')
}));
jest.mock('../utils');

const { jsonToBase64, base64toObj } = require('../utils');
const { encrypt, decrypt } = require('../encryption');

describe('encryption', () => {
  // Set mock key for encryption tests
  let temp;
  beforeEach(() => {
    temp = process.env.ENCRYPTION_KEY;
    process.env.ENCRYPTION_KEY = "6IFwr4SIi1uWV/yAMToEOPBOURZJA/Xp4NetjB/IkUc=";
  });
  afterEach(() => {
    process.env.ENCRYPTION_KEY = temp;
  })

  it('should encrypt into base64 format', () => {
    encrypt('this is a test');

    expect(jsonToBase64).toHaveBeenCalled();
  });

  it('should decrypt from base64 format', () => {
    base64toObj.mockReturnValueOnce({
      iv: 'mock-iv',
      encryptedData: Buffer.from('mockData')
    })

    let text = decrypt();

    expect(text).toBe('decipherUpdatedecipherFinal');
  });
});