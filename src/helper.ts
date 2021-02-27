import * as KMS from '@aws-sdk/client-kms';
import { v4 } from 'uuid';
import { ILogger } from 'typescript-ilogger';
import { BaseClass } from 'typescript-helper-functions';
import { IKMSHelper } from './interface';

/**
 * KMS Helper
 */
export class KMSHelper extends BaseClass implements IKMSHelper {
  /**
   * AWS Repository for KMS
   */
  private Repository: KMS.KMS;

  /**
   * Initializes new instance of KMSHelper
   * @param logger {ILogger} Injected logger
   * @param repository {KMS.KMS} Injected Repository. A new repository will be created if not supplied
   * @param options {KMS.KMSClientConfig} Injected configuration if a Repository is supplied
   */
  constructor(
    logger: ILogger,
    repository?: KMS.KMS,
    options?: KMS.KMSClientConfig,
  ) {
    super(logger);
    options = this.ObjectOperations.IsNullOrEmpty(options)
      ? ({ region: 'us-east-1' } as KMS.KMSClientConfig)
      : options!;
    this.Repository = repository || new KMS.KMS(options);
  }

  /**
   * Decrypt KMS
   * @param encryptedValue {string} Value to decrypt
   */
  public async DecryptAsync(
    encryptedValue: string,
  ): Promise<KMS.DecryptResponse> {
    const action = `${KMSHelper.name}.${this.DecryptAsync.name}`;
    this.LogHelper.LogInputs(action, { cipherTextBlob: encryptedValue });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(encryptedValue)) {
      throw new Error(`[${action}]-Must supply encryptedValue`);
    }

    const array = this.ObjectOperations.ConvertStringToArrayBuffer(
      encryptedValue,
    );

    // create params object
    const params: KMS.DecryptRequest = {
      CiphertextBlob: array,
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.decrypt(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  /**
   * Encrypt KMS
   * @param unencryptedValue {string} Value to encrypt
   */
  public async EncryptAsync(
    unencryptedValue: string,
  ): Promise<KMS.EncryptResponse> {
    const action = `${KMSHelper.name}.${this.EncryptAsync.name}`;
    this.LogHelper.LogInputs(action, { cipherTextBlob: unencryptedValue });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(unencryptedValue)) {
      throw new Error(`[${action}]-Must supply unencryptedValue`);
    }

    const array = this.ObjectOperations.ConvertStringToArrayBuffer(
      unencryptedValue,
    );

    // create params object
    const params: KMS.EncryptRequest = {
      KeyId: v4(),
      Plaintext: array,
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.encrypt(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }
}
