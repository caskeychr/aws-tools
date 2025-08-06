// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function createResource(config, parentId, resourceName) {
  try {
    AWS.config.update({ region: config.region });

    const apigateway = new AWS.APIGateway();

    let params = {
      parentId: parentId /* required */,
      pathPart: resourceName /* required */,
      restApiId: config.apiID /* required */,
    };
    await apigateway.createResource(params).promise();

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.createResource = createResource;
