// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');

// Libraries

// Imported Components
const {
  loadDeploymentToS3,
} = require('./components/loadDeploymentToS3/loadDeploymentToS3');
const {
  buildLambdaFunctions,
} = require('./components/buildLambdaFunctions/buildLambdaFunctions');
const {
  sesRegistration,
} = require('./components/sesRegistration/sesRegistration');
const {
  buildStepFunctions,
} = require('./components/buildStepFunctions/buildStepFunctions');
const { buildAPI } = require('./components/buildAPI/buildAPI');
const {
  createDeploymentConfig,
} = require('./components/createDeploymentConfig/createDeploymentConfig');
const {
  prepStepFunctions,
} = require('./components/prepStepFunctions/prepStepFunctions');

// Config
const config = require('../../../config/config.json');

async function installEnv() {
  try {
    console.log('\n');

    // Instantiate AWS SDK Services

    // Generate Test Config
    console.log(chalk.yellow(`*** Generating Test Environment Config File`));
    await createDeploymentConfig();

    // Place Test Config in S3 bucket
    console.log(
      chalk.yellow(`*** Uploading Test Environment Deployment Files to S3`)
    );
    await loadDeploymentToS3(config);

    // Instantiate all Lambda Functions
    console.log(chalk.yellow(`*** Building AWS Lambda Functions`));
    await buildLambdaFunctions(config);

    // Add Email to SES System
    console.log(chalk.yellow(`*** Registering Email Address with SES`));
    await sesRegistration(config, config.emailAddress);

    // Prep Step Functions
    console.log(chalk.yellow(`*** Prepping AWS Step Function Templates`));
    await prepStepFunctions();

    // Instantiate Step Function
    console.log(chalk.yellow(`*** Building AWS Step Functions`));
    await buildStepFunctions(config);

    // Instantiate Api Gateway Resource
    // await buildAPI();

    return;
  } catch (error) {
    console.log(error);
    // throw error;
  }
}

module.exports.installEnv = installEnv;
