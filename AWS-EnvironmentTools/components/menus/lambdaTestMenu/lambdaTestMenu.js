// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');
const { lambdaTests } = require('../../lambdaTests/lambdaTests');

// Libraries

// Imported Components
const { lambdaTestOptions } = require('./lambdaTestOptions/lambdaTestOptions');

// Config

async function lambdaTestMenu() {
  try {
    while (true) {
      let selected = await lambdaTestOptions();
      selected = selected.selection;

      if (selected.toLowerCase().includes('idmp')) {
        await lambdaTests(selected);
      } else if (selected === '0') {
        return;
      } else if (selected === 'exit') {
        process.exit();
      } else {
        console.log(`\n*** Invalid Selection ***\n`);
      }
    }
  } catch (error) {
    console.log('\n');
    console.log(chalk.red(error.stack));
  }
}

module.exports.lambdaTestMenu = lambdaTestMenu;
