const testWorkflow = require('./deploymentFiles/templates/stepFunctions/testWorkflow.asl.json');
const config = require('./config/config.json');

const {
  prepStepFunctions,
} = require('./components/prepStepFunctions/prepStepFunctions');

(async function () {
  try {
    await prepStepFunctions();
  } catch (error) {
    console.log(error);
  }
})();
