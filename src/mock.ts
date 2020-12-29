import { BaseMock } from 'typescript-helper-functions';
import * as KMS from '@aws-sdk/client-kms';

/**
 * KMS Mock class
 */
export class KMSMock extends BaseMock {

    /**
     * Mocks an KMS.DecryptResponse response
     */
    public DecryptResponse: KMS.DecryptResponse = {};

    /**
     * Mocks an KMS.EncryptResponse response
     */
    public EncryptResponse: KMS.EncryptResponse = {};

    /**
     * Create the KMS mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // decrypt response
            decrypt: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<KMS.DecryptResponse>(this.DecryptResponse);
                }),
            },
            // encrypt response
            encrypt: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<KMS.EncryptResponse>(this.EncryptResponse);
                }),
            },
        };

        const options = {} as KMS.KMSClientConfig;

        // create the functions
        let functions = new KMS.KMS(options);
        functions = {
            decrypt: () => awsResponses.decrypt,
            encrypt: () => awsResponses.encrypt,
        };

        return functions;
    }
}
