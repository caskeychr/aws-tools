// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components
const { outputMenu } = require('../../menus/outputMenu/outputMenu');

// Config
const config = require('../../../config/config.json');

async function listApiResources(runall, listView, apiId) {
  try {
    // Setup Environment Configuration and Instantiate an instance of the AWS API Gateway SDK
    AWS.config.update({ region: config.region });
    const apigateway = new AWS.APIGateway();

    let apis = {};
    let outputList = {};

    // Retrieve a listing of all AWS Rest APIs in the configured region
    console.log(`--- Retrieving Rest APIs`);
    var params = {};
    let restApis = await apigateway.getRestApis(params).promise();

    // If APIs are detected in the restApis output, parse the contents and extract the API
    // name and its ID. Extracted information is placed into a JSON object which will be
    // used to store detected API Resources
    if (restApis.items) {
      restApis = restApis.items;

      for (let item in restApis) {
        apis[restApis[item].name] = {
          id: restApis[item].id,
          resources: [],
        };
      }
    } else {
      console.log('$$$ Rest APIs Could Not Be Retrieved $$$');
      console.log(restApis);
    }

    // Each API stored in the JSON object will now be scanned and the associated resources
    // will be populated into the resources array.
    let count = 1;
    for (let item in apis) {
      let nextMarkerFlag = true;
      let nextMarker = null;

      // If multiple SDK retrievals are needed to acquire all API resources, the
      // nextMarkerFlag will continue to be marked true. This is driven by the nextMarker
      // field if present in SDK output.
      while (nextMarkerFlag) {
        // Rest API Id is used in SDK request params
        let params = {
          restApiId: apis[item].id,
        };

        // Use nextMarker in next request to SDK to acquire next set resources
        if (nextMarker) {
          params.position = nextMarker;
        }

        // Make SDK request for API Resources
        console.log(`--- Retrieving Rest API Resources`);
        let apiResources = await apigateway.getResources(params).promise();

        // If resources are detected in resource SDK response, the output
        // is parsed and placed into the rest API JSON objects
        console.log(`--- Parsing Rest API Resource Results`);
        if (apiResources.items) {
          for (let i in apiResources.items) {
            apis[item].resources.push(apiResources.items[i]);

            outputList[count] = {
              label: `${item}: ${apiResources.items[i].path}`,
              resourceId: apiResources.items[i].id,
              apiId: apiResources.items[i].parentId,
            };

            count++;
          }

          // If more than one request is necessary to retrieve all API resources
          // the nextMarker field will be populated and used on the second pass
          // of the SDK resource request.
          if (apiResources.position) {
            nextMarker = apiResources.position;
          } else {
            nextMarkerFlag = false;
          }
        } else {
          console.log('$$$ Rest API Resources Could Not Be Retrieved $$$');
          console.log(apiResources);
        }
      }
    }

    console.log('--- Rest API Resource Results Ready');
    // console.log(`-- # of APIs Detected: ${resources.length}`);

    if (runall) {
      // This option is an automated option for when all environment lists
      // need to be created.

      await outputMenu(
        JSON.stringify(apis, null, 4),
        'apiResources.txt',
        'runall'
      );
    } else if (listView) {
      // This option results in an output list to be used in other components

      let filteredList = [];
      for (let item in apis) {
        if (apis[item].id === apiId) {
          filteredList = [...apis[item].resources];
        }
      }

      if (filteredList.length === 0) {
        return `No API Resources found for the specified ID`;
      } else {
        return filteredList;
      }
    } else {
      // This option gives the user multiple options to choose from when calling
      // this component individually.

      await outputMenu(JSON.stringify(apis, null, 4), 'apiResources.txt');
    }

    return;
  } catch (error) {
    throw error;
  }
}

// listApiResources()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

module.exports.listApiResources = listApiResources;
