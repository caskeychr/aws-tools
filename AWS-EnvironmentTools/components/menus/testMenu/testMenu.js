// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');

// Libraries

// Imported Components
const { deleteEnv } = require('../../testEnv/deleteEnv/deleteEnv');
const { installEnv } = require('../../testEnv/installEnv/installEnv');
const { runTests } = require('../../testEnv/runTests/runTests');
const { testOptions } = require('./testOptions/testOptions');

// Config

async function testMenu() {
  while (true) {
    try {
      let optionSelected = await testOptions();
      optionSelected = optionSelected.selection;

      switch (optionSelected) {
        case '1':
          await installEnv();

          break;

        case '2':
          await runTests();

          break;

        case '3':
          await deleteEnv();

          break;

        case '0':
          return;

        case 'exit':
          process.exit();

        default:
          console.log(`\n*** Invalid Selection ***\n`);
          break;
      }
    } catch (error) {
      console.log('\n');
      console.log(chalk.red(error.stack));
    }
  }
}

module.exports.testMenu = testMenu;
