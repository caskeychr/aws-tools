// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function updateStateMachine(config, stateMachineArn, definition) {
  try {
    AWS.config.update({ region: config.region });

    const stepfunctions = new AWS.StepFunctions();

    let params = {
      stateMachineArn: stateMachineArn,
      definition: definition,
    };

    await stepfunctions.updateStateMachine(params).promise();

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.updateStateMachine = updateStateMachine;
