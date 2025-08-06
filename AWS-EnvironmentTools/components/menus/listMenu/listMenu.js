// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');

// Libraries

// Imported Components
const { listOptions } = require('./listOptions/listOptions');
const {
  listLambdaFunctions,
} = require('../../envLists/listLambdaFunctions/listLambdaFunctions');
const {
  listApiResources,
} = require('../../envLists/listApiResources/listApiResources');
const {
  listStepFunctions,
} = require('../../envLists/listStepFunctions/listStepFunctions');
const { listEnvConfig } = require('../../envLists/listEnvConfig/listEnvConfig');

// Config

async function listMenu() {
  while (true) {
    try {
      let listSelected = await listOptions();
      listSelected = listSelected.selection;

      switch (listSelected) {
        case '1':
          console.log(
            chalk.yellow(`\n*** Generating List of Lambda Functions`)
          );
          await listLambdaFunctions();

          break;

        case '2':
          console.log(
            chalk.yellow(`\n*** Generating List of AWS API Resources`)
          );
          await listApiResources();

          break;

        case '3':
          console.log(chalk.yellow(`\n*** Generating List of Step Functions`));
          await listStepFunctions();

          break;

        case '4':
          console.log(chalk.yellow(`\n*** Retrieving Environment Config`));
          await listEnvConfig();

          break;

        case '9':
          console.log(
            chalk.yellow(
              `\n*** Creating Output Files for All AWS Environment Resources`
            )
          );
          await listLambdaFunctions(true);
          await listApiResources(true);
          await listStepFunctions(true);

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

module.exports.listMenu = listMenu;
