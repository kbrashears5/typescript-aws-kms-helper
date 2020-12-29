import { KMSHelper } from './helper';
import { Logger, LogLevel } from 'typescript-ilogger';
import { KMSMock } from './mock';
import { TestingValues } from './test-values';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new KMSMock(false);
const kmsHelperMockResolves = new KMSHelper(logger, mockerResolves.Mock);
const mockerRejects = new KMSMock(true);
const kmsHelperMockRejects = new KMSHelper(logger, mockerRejects.Mock);
const TestValues = new TestingValues();

/**
 * Test the DecryptAsync method
 */
describe(`${KMSHelper.name}.${kmsHelperMockResolves.DecryptAsync.name}`, () => {
    // set action for this method
    const action = `${KMSHelper.name}.${kmsHelperMockResolves.DecryptAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} encryptedValue`, () => {
        const actual = kmsHelperMockResolves.DecryptAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} encryptedValue`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = kmsHelperMockRejects.DecryptAsync(TestValues.StringValue);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = kmsHelperMockResolves.DecryptAsync(TestValues.StringValue);
        return expect(actual).resolves.toEqual(mockerResolves.DecryptResponse);
    });
});

/**
 * Test the EncryptAsync method
 */
describe(`${KMSHelper.name}.${kmsHelperMockResolves.EncryptAsync.name}`, () => {
    // set action for this method
    const action = `${KMSHelper.name}.${kmsHelperMockResolves.EncryptAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} unencryptedValue`, () => {
        const actual = kmsHelperMockResolves.EncryptAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} unencryptedValue`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = kmsHelperMockRejects.EncryptAsync(TestValues.StringValue);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = kmsHelperMockResolves.EncryptAsync(TestValues.StringValue);
        return expect(actual).resolves.toEqual(mockerResolves.EncryptResponse);
    });
});
