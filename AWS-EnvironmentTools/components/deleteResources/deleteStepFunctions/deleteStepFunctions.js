// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components
const {
  listStepFunctions,
} = require('../../envLists/listStepFunctions/listStepFunctions');

// Config
const config = require('../../../config/config.json');

async function deleteStepFunctions(arn, deleteAll) {
  try {
    console.log(`\n`);

    AWS.config.update({ region: config.region });
    const stepfunctions = new AWS.StepFunctions();

    let params = {};

    if (deleteAll) {
      console.log(`-- Deleting all Step Functions`);

      console.log(`-- Generating Step Functions List`);

      let stepFunctions = await listStepFunctions(false, true);

      console.log(`\n`);

      for (let item in stepFunctions) {
        params = {
          stateMachineArn: stepFunctions[item].arn,
        };

        console.log(params);

        await stepfunctions.deleteStateMachine(params).promise();

        console.log(
          `-- Step Function: ${stepFunctions[item].label} - Deleted\n`
        );
      }
    } else {
      params = {
        stateMachineArn: arn,
      };

      console.log(params);

      await stepfunctions.deleteStateMachine(params).promise();

      console.log(`-- Step Function: ${arn} - Deleted`);
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.deleteStepFunctions = deleteStepFunctions;
