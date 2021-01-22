<h1 align="center">typescript-aws-kms-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS KMS service</b>
    
[![Build Status](https://dev.azure.com/kbrashears5/github/_apis/build/status/kbrashears5.typescript-aws-kms-helper?branchName=master)](https://dev.azure.com/kbrashears5/github/_build/latest?definitionId=15&branchName=master)
[![Tests](https://img.shields.io/azure-devops/tests/kbrashears5/github/15)](https://img.shields.io/azure-devops/tests/kbrashears5/github/15)
[![Code Coverage](https://img.shields.io/azure-devops/coverage/kbrashears5/github/15)](https://img.shields.io/azure-devops/coverage/kbrashears5/github/15)

[![NPM Version](https://img.shields.io/npm/v/typescript-aws-kms-helper)](https://img.shields.io/npm/v/typescript-aws-kms-helper)
[![Downloads](https://img.shields.io/npm/dt/typescript-aws-kms-helper)](https://img.shields.io/npm/dt/typescript-aws-kms-helper)
</div>

## Install
```
npm install typescript-aws-kms-helper@latest
```

## Usage
### Default - running in Lambda in your own account
```typescript
const logger = new Logger(LogLevel.Trace);

const helper = new KMSHelper(logger);

const response = await helper.DecryptAsync('encryptedValue');
```

### Running in separate account or not in Lambda
```typescript
const logger = new Logger(LogLevel.Trace);

const options: AWS.KMS.ClientConfiguration = {
    accessKeyId: '{access_key}',
    secretAccessKey: '{secret_key}',
    region: 'us-east-1',
};

const repository = new AWS.KMS(options);

const helper = new KMSHelper(logger,
    repository);

const response = await helper.DecryptAsync('encryptedValue');
```

## Notes
If no options are supplied, will default to `us-east-1` as the region