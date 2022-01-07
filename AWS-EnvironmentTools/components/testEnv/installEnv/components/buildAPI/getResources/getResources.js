// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function getResources(config) {
  try {
    AWS.config.update({ region: config.region });

    const apigateway = new AWS.APIGateway();

    let params = {
      restApiId: config.apiID /* required */,
    };

    let resources = await apigateway.getResources(params).promise();

    let apis = [];

    for (let item in resources.items) {
      if (resources.items[item].pathPart) {
        apis.push({
          ...resources.items[item],
        });
      }
    }

    return apis;
  } catch (error) {
    throw error;
  }
}

module.exports.getResources = getResources;
