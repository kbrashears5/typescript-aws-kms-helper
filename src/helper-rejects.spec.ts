import { KMSHelper } from './helper';
import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';

const error = new Error(`AWS Error`);

const decrypt = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const encrypt = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});

// mock the functions
jest.mock('@aws-sdk/client-kms', () => {
  return {
    KMS: jest.fn().mockImplementation(() => {
      return {
        decrypt,
        encrypt,
      };
    }),
  };
});

const logger = new Logger(LogLevel.Off);
const kmsHelperMock = new KMSHelper(logger);
const TestValues = new TestingValues();

/**
 * Test the DecryptAsync method
 */
describe(`${KMSHelper.name}.${kmsHelperMock.DecryptAsync.name}`, () => {
  test(TestValues.InvalidTest, () => {
    const actual = kmsHelperMock.DecryptAsync(TestValues.StringValue);
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the EncryptAsync method
 */
describe(`${KMSHelper.name}.${kmsHelperMock.EncryptAsync.name}`, () => {
  test(TestValues.InvalidTest, () => {
    const actual = kmsHelperMock.EncryptAsync(TestValues.StringValue);
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});
