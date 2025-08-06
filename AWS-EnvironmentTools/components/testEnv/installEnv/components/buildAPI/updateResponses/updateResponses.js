// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components
const { createResponses } = require('../createResponses/createResponses');

// Config

async function updateResponses(config, httpMethod, resourceId) {
  try {
    AWS.config.update({ region: config.region });

    const apigateway = new AWS.APIGateway();

    let params = {
      httpMethod: httpMethod /* required */,
      resourceId: resourceId /* required */,
      restApiId: config.apiID /* required */,
      statusCode: '200' /* required */,
    };

    await apigateway.deleteMethodResponse(params).promise();

    await apigateway.deleteIntegrationResponse(params).promise();

    await createResponses(config, apis[item].httpMethod, resource.id);

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.updateResponses = updateResponses;
