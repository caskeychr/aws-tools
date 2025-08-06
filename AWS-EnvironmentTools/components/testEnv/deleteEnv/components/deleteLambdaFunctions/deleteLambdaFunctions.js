// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components
const {
  listLambdaFunctions,
} = require('../../../../envLists/listLambdaFunctions/listLambdaFunctions');

// Config
const config = require('../../../../../config/config.json');
const lambdaFunctionsConfig = require('../../../../../config/lambdaFunctions.json');

async function deleteLambdaFunctions() {
  try {
    AWS.config.update({ region: config.region });
    const lambda = new AWS.Lambda();

    console.log(`--- Generating Lambda Functions List`);

    let lambdaFunctionsList = await listLambdaFunctions(false, true);

    for (let item in lambdaFunctionsList) {
      let configFound = lambdaFunctionsConfig.find(
        (el) => el.functionName === lambdaFunctionsList[item].label
      );

      if (configFound) {
        let params = {
          FunctionName: lambdaFunctionsList[item].arn,
        };

        await lambda.deleteFunction(params).promise();

        console.log(
          `--- Function: ${lambdaFunctionsList[item].label} - Deleted`
        );
      }
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.deleteLambdaFunctions = deleteLambdaFunctions;
