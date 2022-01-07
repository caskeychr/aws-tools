// Logging

// Imported 3rd Party NPM Packages

// Libraries

// Imported Components
const { createIntegration } = require('./createIntegration/createIntegration');
const { createMethod } = require('./createMethod/createMethod');
const { createResponses } = require('./createResponses/createResponses');
const { createResource } = require('./createResource/createResource');
const { getParentId } = require('./getParentId/getParentId');
const { getResources } = require('./getResources/getResources');
const { getResource } = require('./getResource/getResource');
const { updateMethod } = require('./updateMethod/updateMethod');
const { updateIntegration } = require('./updateIntegration/updateIntegration');
const { updateResponses } = require('./updateResponses/updateResponses');

// Config
const apis = require('../../../../../config/apis.json');

async function buildAPI(config) {
  try {
    console.log('*** Loading API Gateway APIs');

    // Retrieve API root Parent ID to be used when adding additional resources
    let parentId = await getParentId(config);

    // Get an initial listing of all API resources in the requested API
    let resources = await getResources(config);

    let failedResources = [];

    for (let item in apis) {
      // Compare the initial resource list against the API configuration file
      let resourceFound = resources.find(
        (el) => el.pathPart === apis[item].resourceName
      );

      if (resourceFound) {
        // If a resource matches the API configuration file, perform an update
        // of the API resource
        try {
          console.log(`--- Updating Resource: ${apis[item].resourceName}`);

          try {
            await createMethod(config, apis[item].httpMethod, resource.id);
          } catch (error) {
            await updateMethod(config, apis[item].httpMethod, resource.id);
          }

          try {
            await createIntegration(
              config,
              apis[item].httpMethod,
              resource.id,
              apis[item].stateMachine
            );
          } catch (error) {
            await updateIntegration(
              config,
              apis[item].httpMethod,
              resource.id,
              apis[item].stateMachine
            );
          }

          try {
            await createResponses(config, apis[item].httpMethod, resource.id);
          } catch (error) {
            await updateResponses(config, apis[item].httpMethod, resource.id);
          }
        } catch (error) {
          failedResources.push({
            resourcesName: apis[item].resourceName,
            error: error,
          });
        }
      } else {
        // If there are no matches to the API configuration file, perform a
        // resource create to establish the new resource
        try {
          console.log(`--- Creating Resource: ${apis[item].resourceName}`);

          await createResource(config, parentId, apis[item].resourceName);
          let resource = await getResource(config, apis[item].resourceName);
          await createMethod(config, apis[item].httpMethod, resource.id);
          await createIntegration(
            config,
            apis[item].httpMethod,
            resource.id,
            apis[item].stateMachine
          );
          await createResponses(config, apis[item].httpMethod, resource.id);
        } catch (error) {
          failedResources.push({
            resourcesName: apis[item].resourceName,
            error: error,
          });
        }
      }
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.buildAPI = buildAPI;
