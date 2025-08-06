// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components

// Config

async function listStateMachines(config) {
  try {
    AWS.config.update({ region: config.region });

    const stepfunctions = new AWS.StepFunctions();

    let params = {};

    let list = await stepfunctions.listStateMachines(params).promise();

    return list;
  } catch (error) {
    throw error;
  }
}

module.exports.listStateMachines = listStateMachines;
