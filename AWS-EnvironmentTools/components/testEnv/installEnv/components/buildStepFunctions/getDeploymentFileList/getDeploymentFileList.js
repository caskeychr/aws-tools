// Logging

// Imported 3rd Party NPM Packages
const fs = require('fs');
const path = require('path');

// Libraries

// Imported Components
('../../../../../../');
// Config

async function getDeploymentFileList(config) {
  try {
    const fileDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'deploymentFiles',
      config.deploymentFiles.subFolders.stepFunctions
    );

    let files = fs.readdirSync(fileDir);

    let deploymentFileList = [];

    for (let item in files) {
      let ext = path.extname(files[item]);

      if (ext !== '') {
        var filePath = path.join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          '..',
          '..',
          'deploymentFiles',
          config.deploymentFiles.subFolders.stepFunctions,
          files[item]
        );

        deploymentFileList.push({
          filePath: filePath,
          fileName: files[item],
        });
      }
    }

    return deploymentFileList;
  } catch (error) {
    throw error;
  }
}

module.exports.getDeploymentFileList = getDeploymentFileList;
