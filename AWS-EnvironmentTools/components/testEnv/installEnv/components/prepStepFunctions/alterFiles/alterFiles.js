const fs = require('fs');

const config = require('../../../../../../config/config.json');

async function alterFiles(fileName) {
  try {
    const testWorkflow = fs.readFileSync(
      `./deploymentFiles/templates/stepFunctions/${fileName}`,
      { encoding: 'utf8', flag: 'r' }
    );

    const regionReplacer = new RegExp('&&Region&&', 'g');
    let workflow = testWorkflow.replace(regionReplacer, config.region);

    const idReplacer = new RegExp('&&AccountID&&', 'g');
    workflow = workflow.replace(idReplacer, config.awsID);

    await fs.writeFileSync(
      `./deploymentFiles/stepFunctions/${fileName}`,
      workflow
    );

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.alterFiles = alterFiles;
