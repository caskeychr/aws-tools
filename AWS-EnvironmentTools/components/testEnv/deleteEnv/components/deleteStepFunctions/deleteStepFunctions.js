// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components
const {
  listStepFunctions,
} = require('../../../../envLists/listStepFunctions/listStepFunctions');

// Config
const config = require('../../../../../config/config.json');
const stepFunctionsConfig = require('../../../../../config/stepFunctions.json');

async function deleteStepFunctions() {
  try {
    AWS.config.update({ region: config.region });
    const stepfunctions = new AWS.StepFunctions();

    console.log(`--- Generating Step Functions List`);

    let stepFunctionsList = await listStepFunctions(false, true);

    for (let item in stepFunctionsList) {
      let configFound = stepFunctionsConfig.find(
        (el) => el.functionName === stepFunctionsList[item].label
      );

      if (configFound) {
        let params = {
          stateMachineArn: stepFunctionsList[item].arn,
        };

        await stepfunctions.deleteStateMachine(params).promise();

        console.log(
          `--- Step Function: ${stepFunctionsList[item].label} - Deleted`
        );
      }
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.deleteStepFunctions = deleteStepFunctions;
