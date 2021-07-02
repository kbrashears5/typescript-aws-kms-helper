<h1 align="center">typescript-aws-kms-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS KMS service</b>
    
[![CI/CD](https://github.com/kbrashears5/typescript-aws-kms-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-kms-helper/actions/workflows/ci-cd.yml)
[![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-kms-helper/branch/master/graph/badge.svg?token=4PIRJTDG3K)](https://codecov.io/gh/kbrashears5/typescript-aws-kms-helper)
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
import * as KMS from '@aws-sdk/client-kms';

const logger = new Logger(LogLevel.Trace);

const options: KMS.KMSClientConfig = {
  accessKeyId: '{access_key}',
  secretAccessKey: '{secret_key}',
  region: 'us-east-1',
};

const repository = new KMS.KMS(options);

const helper = new KMSHelper(logger, repository);

const response = await helper.DecryptAsync('encryptedValue');
```

## Notes

If no options are supplied, will default to `us-east-1` as the region

## Development

Clone the latest and run

```npm
npm run prep
```

to install packages and prep the git hooks
