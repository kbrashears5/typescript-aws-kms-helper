/**
 * KMS Helper
 */
export interface IKMSHelper {

    /**
     * AWS Repository for KMS
     */
    Repository: AWS.KMS;

    /**
     * Decrypt KMS
     * @param encryptedValue {string} Value to decrypt
     */
    DecryptAsync(encryptedValue: string): Promise<AWS.KMS.DecryptResponse>;

    /**
     * Encrypt KMS
     * @param unencryptedValue {string} Value to encrypt
     */
    EncryptAsync(unencryptedValue: string): Promise<AWS.KMS.EncryptResponse>;
}
