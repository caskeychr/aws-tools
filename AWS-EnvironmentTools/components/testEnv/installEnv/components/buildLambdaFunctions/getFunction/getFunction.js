// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function getFunction(config, functionName) {
  try {
    AWS.config.update({ region: config.region });

    const lambda = new AWS.Lambda();

    let params = {
      FunctionName: functionName,
    };

    try {
      let functionData = await lambda.getFunction(params).promise();

      if (functionData.Configuration) {
        return true;
      }
    } catch (error) {
      return false;
    }

    return false;
  } catch (error) {
    throw error;
  }
}

module.exports.getFunction = getFunction;
