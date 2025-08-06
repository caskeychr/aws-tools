// Logging

// Imported 3rd Party NPM Packages

// Libraries

// Imported Components

// Config

async function parseDeploymentFile(filePath) {
  try {
    let stepFunction = require(filePath);

    return JSON.stringify(stepFunction);
  } catch (error) {
    throw error;
  }
}

module.exports.parseDeploymentFile = parseDeploymentFile;
