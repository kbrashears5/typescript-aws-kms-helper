import { KMSHelper } from './helper';
import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';
import * as KMS from '@aws-sdk/client-kms';

const decryptResponseResponse: KMS.DecryptResponse = {};
const encryptResponseResponse: KMS.EncryptResponse = {};

const decrypt = jest.fn().mockImplementation(() => {
    return Promise.resolve<KMS.DecryptResponse>(decryptResponseResponse);
});
const encrypt = jest.fn().mockImplementation(() => {
    return Promise.resolve<KMS.EncryptResponse>(encryptResponseResponse);
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
    // set action for this method
    const action = `${KMSHelper.name}.${kmsHelperMock.DecryptAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} encryptedValue`, () => {
        const actual = kmsHelperMock.DecryptAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} encryptedValue`);
    });
    test(TestValues.ValidTest, () => {
        const actual = kmsHelperMock.DecryptAsync(TestValues.StringValue);
        return expect(actual).resolves.toEqual(decryptResponseResponse);
    });
});

/**
 * Test the EncryptAsync method
 */
describe(`${KMSHelper.name}.${kmsHelperMock.EncryptAsync.name}`, () => {
    // set action for this method
    const action = `${KMSHelper.name}.${kmsHelperMock.EncryptAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} unencryptedValue`, () => {
        const actual = kmsHelperMock.EncryptAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} unencryptedValue`);
    });
    test(TestValues.ValidTest, () => {
        const actual = kmsHelperMock.EncryptAsync(TestValues.StringValue);
        return expect(actual).resolves.toEqual(encryptResponseResponse);
    });
});
