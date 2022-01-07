// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');

// Libraries

// Imported Components
const {
  deleteLambdaFunctions,
} = require('./components/deleteLambdaFunctions/deleteLambdaFunctions');
const {
  deleteStepFunctions,
} = require('./components/deleteStepFunctions/deleteStepFunctions');
const {
  deleteS3Folders,
} = require('./components/deleteS3Folders/deleteS3Folders');

// Config

async function deleteEnv() {
  try {
    console.log('\n');

    console.log(chalk.yellow(`*** Deleting Environment Test - Step Functions`));
    await deleteStepFunctions();

    console.log(
      chalk.yellow(`*** Deleting Environment Test - Lambda Functions`)
    );
    await deleteLambdaFunctions();

    console.log(
      chalk.yellow(`*** Deleting Environment Test - S3 Deployment Files`)
    );
    await deleteS3Folders();

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.deleteEnv = deleteEnv;
