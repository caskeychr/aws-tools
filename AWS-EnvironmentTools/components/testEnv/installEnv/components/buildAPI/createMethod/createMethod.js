// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function createMethod(config, httpMethod, resourceId) {
  try {
    AWS.config.update({ region: config.region });

    const apigateway = new AWS.APIGateway();

    let params = {
      authorizationType: 'NONE' /* required */,
      httpMethod: httpMethod /* required */,
      resourceId: resourceId /* required */,
      restApiId: config.apiID /* required */,
    };

    await apigateway.putMethod(params).promise();

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.createMethod = createMethod;
