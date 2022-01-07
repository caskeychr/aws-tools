// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function lambdaCreateFunction(
  config,
  s3key,
  functionName,
  memorySize,
  runtime,
  timeout
) {
  try {
    AWS.config.update({ region: config.region });

    const lambda = new AWS.Lambda();

    let params = {
      Code: {
        S3Bucket: config.bucket,
        S3Key: s3key,
      },
      FunctionName: functionName,
      Handler: 'index.handler',
      MemorySize: memorySize,
      Publish: true,
      Role: config.lambdaRole,
      Runtime: runtime,
      Timeout: timeout,
    };

    if (config.lambdaVPCSettings) {
      params.VpcConfig = config.lambdaVPCSettings;
    }

    await lambda.createFunction(params).promise();

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.lambdaCreateFunction = lambdaCreateFunction;
