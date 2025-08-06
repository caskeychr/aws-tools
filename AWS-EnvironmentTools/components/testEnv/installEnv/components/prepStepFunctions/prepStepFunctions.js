const fs = require('fs');
const { alterFiles } = require('./alterFiles/alterFiles');

async function prepStepFunctions() {
  try {
    let workflowFiles = await fs.readdirSync(
      './deploymentFiles/templates/stepFunctions'
    );

    for (let item in workflowFiles) {
      await alterFiles(workflowFiles[item]);
    }

    console.log('--- Step Function Templates Prepared');

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.prepStepFunctions = prepStepFunctions;
