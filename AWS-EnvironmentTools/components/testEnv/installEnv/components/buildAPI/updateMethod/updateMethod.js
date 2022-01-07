// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function updateMethod() {
  try {
    AWS.config.update({ region: config.region });

    const apigateway = new AWS.APIGateway();

    let params = {
      httpMethod: httpMethod /* required */,
      resourceId: resourceId /* required */,
      restApiId: config.apiID /* required */,
    };

    await apigateway.updateMethod(params).promise();

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.updateMethod = updateMethod;
