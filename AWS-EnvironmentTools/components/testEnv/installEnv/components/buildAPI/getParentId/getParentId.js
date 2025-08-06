// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function getParentId(config) {
  try {
    AWS.config.update({ region: config.region });

    const apigateway = new AWS.APIGateway();

    let params = {
      restApiId: config.apiID /* required */,
    };

    let resources = await apigateway.getResources(params).promise();

    let resourceFound = resources.items.find((el) => el.path === '/');

    let parentId = resourceFound.id;

    return parentId;
  } catch (error) {
    throw error;
  }
}

module.exports.getParentId = getParentId;
