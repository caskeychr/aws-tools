// Logging

// Imported 3rd Party NPM Packages

// Libraries

// Imported Components
const { listStateMachines } = require('./listStateMachines/listStateMachines');
const {
  getDeploymentFileList,
} = require('./getDeploymentFileList/getDeploymentFileList');
const {
  parseDeploymentFile,
} = require('./parseDeploymentFile/parseDeploymentFile');
const {
  updateStateMachine,
} = require('./updateStateMachine/updateStateMachine');
const {
  createStateMachine,
} = require('./createStateMachine/createStateMachine');

// Config
const stepFunctions = require('../../../../../config/stepFunctions.json');

async function buildStepFunctions(config) {
  try {
    let stateMachineList = await listStateMachines(config);
    stateMachineList = stateMachineList.stateMachines;

    const deploymentFileList = await getDeploymentFileList(config);

    let failedFunctions = [];

    for (let item in deploymentFileList) {
      let configFound = stepFunctions.find(
        (el) => el.fileName === deploymentFileList[item].fileName
      );

      let stateMachineFound = stateMachineList.find(
        (el) => el.name === configFound.functionName
      );

      let definition = await parseDeploymentFile(
        deploymentFileList[item].filePath
      );

      if (stateMachineFound) {
        try {
          console.log(
            `--- Updating Step Function: ${configFound.functionName}`
          );

          await updateStateMachine(
            config,
            stateMachineFound.stateMachineArn,
            definition
          );
        } catch (error) {
          failedFunctions.push({
            functionName: configFound.functionName,
            error: error,
          });
        }
      } else {
        try {
          console.log(
            `--- Creating Step Function: ${configFound.functionName}`
          );

          await createStateMachine(
            config,
            definition,
            configFound.functionName
          );
        } catch (error) {
          failedFunctions.push({
            functionName: configFound.functionName,
            error: error,
          });
        }
      }
    }

    let afterCreateCheckList = await listStateMachines(config);
    afterCreateCheckList = afterCreateCheckList.stateMachines;

    for (let item in deploymentFileList) {
      let configFound = stepFunctions.find(
        (el) => el.fileName === deploymentFileList[item].fileName
      );

      let stateMachineFound = stateMachineList.find(
        (el) => el.name === configFound.functionName
      );

      if (!stateMachineFound) {
        failedFunctions.push({
          functionName: configFound.functionName,
        });
      }
    }

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.buildStepFunctions = buildStepFunctions;
