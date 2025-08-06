// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components
const { outputMenu } = require('../../menus/outputMenu/outputMenu');

// Config
const config = require('../../../config/config.json');

async function listLambdaFunctions(runall, listView) {
  try {
    // Setup Environment Configuration and Instantiate an instance of the AWS Lambda SDK
    AWS.config.update({ region: config.region });
    const lambda = new AWS.Lambda();

    let functions = [];
    let outputList = {};
    let nextMarkerFlag = true;
    let nextMarker = null;

    let params = {};

    // If multiple Lambda Function retrievals are needed to acquire all function resources, the
    // nextMarkerFlag will continue to be marked true. This is driven by the nextMarker
    // field if present in Lambda Retrieval output.
    let count = 1;
    while (nextMarkerFlag) {
      // Use nextMarker in next request to SDK to acquire next set resources
      if (nextMarker) {
        params.Marker = nextMarker;
      }

      // Make SDK request for Lambda Function Resources
      console.log(`--- Retrieving Lambda Function List`);
      let lambdaResult = await lambda.listFunctions(params).promise();

      // If resources are detected in resource SDK response, the output
      // is parsed and placed into the two different JSON objects. One is an
      // array to be used for standard outputs. The other is to be used by
      // other component calls for this resource list.
      console.log(`--- Parsing Lambda Function Results`);
      if (lambdaResult.Functions) {
        for (let item in lambdaResult.Functions) {
          functions.push({
            function: lambdaResult.Functions[item].FunctionName,
            arn: lambdaResult.Functions[item].FunctionArn,
          });

          outputList[count] = {
            label: lambdaResult.Functions[item].FunctionName,
            arn: lambdaResult.Functions[item].FunctionArn,
          };

          count++;
        }

        // If more than one request is necessary to retrieve all function resources
        // the nextMarker field will be populated and used on the second pass
        // of the SDK resource request.
        if (lambdaResult.NextMarker) {
          nextMarker = lambdaResult.NextMarker;
        } else {
          nextMarkerFlag = false;
        }
      } else {
        console.log('$$$ Lambda Functions Could Not Be Retrieved $$$');
        console.log(lambdaResult);
      }
    }

    console.log('--- Lambda Results Ready');
    console.log(`--- # of Functions Detected: ${functions.length}`);

    if (runall) {
      // This option is an automated option for when all environment lists
      // need to be created.

      await outputMenu(
        JSON.stringify(functions, null, 4),
        'lambdaFunctions.txt',
        'runall'
      );
    } else if (listView) {
      // This option results in an output list to be used in other components

      return outputList;
    } else {
      // This option gives the user multiple options to choose from when calling
      // this component individually.

      await outputMenu(
        JSON.stringify(functions, null, 4),
        'lambdaFunctions.txt'
      );
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.listLambdaFunctions = listLambdaFunctions;
