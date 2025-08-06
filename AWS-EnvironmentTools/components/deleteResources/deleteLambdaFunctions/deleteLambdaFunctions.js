// Logging

// Imported 3rd Party NPM Packages
const AWS = require('aws-sdk');

// Libraries

// Imported Components
const {
  listLambdaFunctions,
} = require('../../envLists/listLambdaFunctions/listLambdaFunctions');

// Config
const config = require('../../../config/config.json');

async function deleteLambdaFunctions(arn, deleteAll) {
  try {
    AWS.config.update({ region: config.region });
    const lambda = new AWS.Lambda();

    console.log(`\n`);

    let params = {};

    if (deleteAll) {
      console.log(`-- Deleting all Lambda Functions`);

      console.log(`-- Generating Lambda Functions List`);

      let lambdaFunctions = await listLambdaFunctions(false, true);

      console.log(`\n`);

      for (let item in lambdaFunctions) {
        params = {
          FunctionName: lambdaFunctions[item].arn,
        };

        console.log(params);

        await lambda.deleteFunction(params).promise();

        console.log(`-- Function: ${lambdaFunctions[item].label} - Deleted\n`);
      }
    } else {
      params = {
        FunctionName: arn,
      };

      console.log(params);

      await lambda.deleteFunction(params).promise();

      console.log(`-- Function: ${arn} - Deleted`);
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.deleteLambdaFunctions = deleteLambdaFunctions;
