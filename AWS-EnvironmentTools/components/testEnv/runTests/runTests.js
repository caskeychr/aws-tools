// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');

// Libraries

// Imported Components
const { invokeLambdaFunc } = require('../../invokeLambdaFunc/invokeLambdaFunc');

// Config
const config = require('../../../config/config.json');

async function runTests() {
  try {
    console.log('\n');

    let lambdaFunctionTestList = [
      'IDMP-EnvTest-cloudWatchTest',
      'IDMP-EnvTest-eventBridgeTest',
      'IDMP-EnvTest-lambdaTest',
      'IDMP-EnvTest-rdsTest',
      'IDMP-EnvTest-s3Test',
      'IDMP-EnvTest-sesTest',
      'IDMP-EnvTest-stepFunctionTest',
    ];

    for (let item in lambdaFunctionTestList) {
      let eventInput = {
        bucket: config.bucket,
      };

      if (lambdaFunctionTestList[item] === 'IDMP-EnvTest-sesTest') {
        eventInput.emailAddress = config.emailAddress;
      }

      let output = await invokeLambdaFunc(
        config,
        lambdaFunctionTestList[item],
        eventInput
      );

      console.log(chalk.yellow(`${lambdaFunctionTestList[item]}: `));
      console.log(JSON.stringify(output, null, 4));
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.runTests = runTests;
