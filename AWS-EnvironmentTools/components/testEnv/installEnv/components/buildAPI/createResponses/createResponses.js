// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function createResponses(config, httpMethod, resourceId) {
  try {
    AWS.config.update({ region: config.region });

    const apigateway = new AWS.APIGateway();

    let methodParams = {
      httpMethod: httpMethod /* required */,
      resourceId: resourceId /* required */,
      restApiId: config.apiID /* required */,
      statusCode: '200' /* required */,
      responseParameters: {
        'method.response.header.Access-Control-Allow-Origin': true,
      },
    };

    await apigateway.putMethodResponse(methodParams).promise();

    let integrationParams = {
      httpMethod: httpMethod /* required */,
      resourceId: resourceId /* required */,
      restApiId: config.apiID /* required */,
      statusCode: '200' /* required */,
      responseParameters: {
        'method.response.header.Access-Control-Allow-Origin': "'*'",
      },
      responseTemplates: {
        'application/json': null,
      },
    };

    await apigateway.putIntegrationResponse(integrationParams).promise();

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.createResponses = createResponses;
