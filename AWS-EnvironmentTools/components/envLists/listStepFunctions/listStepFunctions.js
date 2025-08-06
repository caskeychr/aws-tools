// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components
const { outputMenu } = require('../../menus/outputMenu/outputMenu');

// Config
const config = require('../../../config/config.json');

async function listStepFunctions(runall, listView) {
  try {
    // Setup Environment Configuration and Instantiate an instance of the AWS Step Function SDK
    AWS.config.update({ region: config.region });
    const stepfunctions = new AWS.StepFunctions();

    let params = {};

    let outputList = {};

    // Make SDK request for Step Function Resources
    console.log(`--- Retrieving Step Function List`);
    let stepFunctionResult = await stepfunctions
      .listStateMachines(params)
      .promise();

    // If resources are detected in resource SDK response, the output
    // is parsed and placed into a JSON object.
    if (stepFunctionResult.stateMachines) {
      stepFunctionResult = stepFunctionResult.stateMachines;

      let count = 1;
      for (let item in stepFunctionResult) {
        outputList[count] = {
          label: stepFunctionResult[item].name,
          arn: stepFunctionResult[item].stateMachineArn,
        };
        count++;
      }

      console.log('--- Step Function Results Ready');
      console.log(`--- # of Functions Detected: ${stepFunctionResult.length}`);
    } else {
      console.log('$$$ Step Functions Could Not Be Retrieved $$$');
      console.log(stepFunctionResult);
    }

    if (runall) {
      // This option is an automated option for when all environment lists
      // need to be created.

      await outputMenu(
        JSON.stringify(stepFunctionResult, null, 4),
        'stepFunctions.txt',
        'runall'
      );
    } else if (listView) {
      // This option results in an output list to be used in other components

      return outputList;
    } else {
      // This option gives the user multiple options to choose from when calling
      // this component individually.

      await outputMenu(
        JSON.stringify(stepFunctionResult, null, 4),
        'stepFunctions.txt'
      );
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.listStepFunctions = listStepFunctions;
