// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function getResource(config, resourceName) {
  try {
    AWS.config.update({ region: config.region });

    const apigateway = new AWS.APIGateway();

    let params = {
      restApiId: config.apiID /* required */,
    };

    let resources = await apigateway.getResources(params).promise();

    let resourceList = [];

    for (let item in resources.items) {
      if (resources.items[item].pathPart) {
        resourceList.push({
          ...resources.items[item],
        });
      }
    }

    let resourceFound = resourceList.find((el) => el.pathPart === resourceName);

    return resourceFound;
  } catch (error) {
    throw error;
  }
}

module.exports.getResource = getResource;
