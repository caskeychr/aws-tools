// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function lambdaUpdateFunction(config, s3key, functionName) {
  try {
    AWS.config.update({ region: config.region });

    const lambda = new AWS.Lambda();

    let params = {
      FunctionName: functionName,
      S3Bucket: config.bucket,
      S3Key: s3key,
    };

    await lambda.updateFunctionCode(params).promise();

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.lambdaUpdateFunction = lambdaUpdateFunction;
