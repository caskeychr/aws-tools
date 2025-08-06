// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components
const { createIntegration } = require('../createIntegration/createIntegration');

// Config

async function updateIntegration(config, httpMethod, resourceId, stateMachine) {
  try {
    AWS.config.update({ region: config.region });

    const apigateway = new AWS.APIGateway();

    var params = {
      httpMethod: httpMethod /* required */,
      resourceId: resourceId /* required */,
      restApiId: config.apiID /* required */,
    };

    await apigateway.deleteIntegration(params).promise();

    await createIntegration(config, httpMethod, resourceId, stateMachine);

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.updateIntegration = updateIntegration;
