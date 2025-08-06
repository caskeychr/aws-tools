// Logging

// Imported 3rd Party NPM Packages

// Libraries

// Imported Components
const { clearS3Directory } = require('./clearS3Directory/clearS3Directory');
const { loadDirectoryToS3 } = require('./loadDirectoryToS3/loadDirectoryToS3');

// Config

async function loadDeploymentToS3(config) {
  try {
    // Clearing previous files from Deployment Directory
    console.log('--- Clearing previous files from Deployment Directory');
    await clearS3Directory(config);

    // Load Common Files
    console.log('--- Load Common Files');
    await loadDirectoryToS3(config);

    // Load Lambda Function Deployments
    console.log('--- Load Lambda Function Deployment Files');
    await loadDirectoryToS3(config, 'lambdaFunctions');

    // Load Step Function Deployments
    console.log('--- Load Step Function Deployment Files');
    await loadDirectoryToS3(config, 'stepFunctions');

    return;
  } catch (error) {
    throw error;
  }
}

module.exports.loadDeploymentToS3 = loadDeploymentToS3;
