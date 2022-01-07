// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function createStateMachine(config, definition, name) {
  try {
    AWS.config.update({ region: config.region });

    const stepfunctions = new AWS.StepFunctions();

    let params = {
      definition: definition,
      name: name,
      roleArn: config.stepFunctionRole,
      // type: STANDARD,
    };

    await stepfunctions.createStateMachine(params).promise();

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.createStateMachine = createStateMachine;
