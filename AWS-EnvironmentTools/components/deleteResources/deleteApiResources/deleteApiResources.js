// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');
const chalk = require('chalk');

// Libraries

// Imported Components
const {
  listApiResources,
} = require('../../envLists/listApiResources/listApiResources');

// Config
const config = require('../../../config/config.json');

async function deleteApiResources(resourceId, apiId, deleteAll) {
  try {
    AWS.config.update({ region: config.region });
    const apigateway = new AWS.APIGateway();

    console.log(`\n`);

    let params = {
      restApiId: apiId,
    };

    if (deleteAll) {
      console.log(`-- Deleting all API Resources`);

      console.log(`-- Generating API Resource List`);

      let apiResources = await listApiResources(false, true, apiId);

      console.log(`\n`);

      if (typeof apiResources === 'string') {
        console.log(chalk.red(`\n*** ${apiResources} ***`));
      } else {
        for (let item in apiResources) {
          if (apiResources[item].path !== '/') {
            params.resourceId = apiResources[item].id;

            console.log(params);

            await apigateway.deleteResource(params).promise();

            console.log(
              `-- API Resource: ${apiResources[item].path} - Deleted\n`
            );
          }
        }
      }
    } else {
      params.resourceId = resourceId;

      console.log(params);

      await apigateway.deleteResource(params).promise();

      console.log(`-- API Resource: ${resourceId} - Deleted`);
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.deleteApiResources = deleteApiResources;
