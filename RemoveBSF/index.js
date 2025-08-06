// Logging

// Imported 3rd Party NPM Packages
// const AWS = require('aws-sdk');

// Libraries

// Imported Components
const { listResources } = require('./components/listResources/listResources');

// Config

(async function () {
  try {
    let findings = await listResources();

    console.log(findings);
  } catch (error) {
    console.log(error);
  }
})();
