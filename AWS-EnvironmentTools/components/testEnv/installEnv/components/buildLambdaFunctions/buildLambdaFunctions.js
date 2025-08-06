// Logging

// Imported 3rd Party NPM Packages
const { getS3FileList } = require('./getS3FileList/getS3FileList');
const { getFunction } = require('./getFunction/getFunction');
const {
  lambdaUpdateFunction,
} = require('./lambdaUpdateFunction/lambdaUpdateFunction');
const {
  lambdaCreateFunction,
} = require('./lambdaCreateFunction/lambdaCreateFunction');

// Libraries

// Imported Components

// Config
const lambdaFunctions = require('../../../../../config/lambdaFunctions.json');

async function buildLambdaFunctions(config) {
  try {
    let failedFunctions = [];

    let prefix = `${config.deploymentFiles.s3DeploymentFolder}${config.deploymentFiles.subFolders.lambdaDeployment}`;
    let s3FileList = await getS3FileList(config, prefix);

    for (let item in lambdaFunctions) {
      let s3Key = `${prefix}${lambdaFunctions[item].fileName}`;

      let found = s3FileList.find(
        (el) => el === lambdaFunctions[item].fileName
      );

      if (found) {
        let beforeFunctionCheck = await getFunction(
          config,
          lambdaFunctions[item].functionName
        );

        if (beforeFunctionCheck) {
          console.log(
            `--- Updating Lambda Function: ${lambdaFunctions[item].functionName}`
          );

          try {
            await lambdaUpdateFunction(
              config,
              s3Key,
              lambdaFunctions[item].functionName
            );
          } catch (error) {
            failedFunctions.push({
              functionName: lambdaFunctions[item].functionName,
              error: error,
            });
          }
        } else {
          console.log(
            `--- Creating Lambda Function: ${lambdaFunctions[item].functionName}`
          );

          try {
            await lambdaCreateFunction(
              config,
              s3Key,
              lambdaFunctions[item].functionName,
              lambdaFunctions[item].memorySize,
              lambdaFunctions[item].runtime,
              lambdaFunctions[item].timeout
            );
          } catch (error) {
            failedFunctions.push({
              functionName: lambdaFunctions[item].functionName,
              error: error,
            });
          }
        }

        let afterFunctionCheck = await getFunction(
          config,
          lambdaFunctions[item].functionName
        );

        if (!afterFunctionCheck) {
          failedFunctions.push({
            functionName: lambdaFunctions[item].functionName,
            error: 'Function not found',
          });
        }
      }
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.buildLambdaFunctions = buildLambdaFunctions;
