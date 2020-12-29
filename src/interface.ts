import * as KMS from '@aws-sdk/client-kms';

/**
 * KMS Helper
 */
export interface IKMSHelper {

    /**
     * AWS Repository for KMS
     */
    Repository: KMS.KMS;

    /**
     * Decrypt KMS
     * @param encryptedValue {string} Value to decrypt
     */
    DecryptAsync(encryptedValue: string): Promise<KMS.DecryptResponse>;

    /**
     * Encrypt KMS
     * @param unencryptedValue {string} Value to encrypt
     */
    EncryptAsync(unencryptedValue: string): Promise<KMS.EncryptResponse>;
}
