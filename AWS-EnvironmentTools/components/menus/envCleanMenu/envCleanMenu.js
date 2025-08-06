// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');

// Libraries

// Imported Components
const { envCleanOptions } = require('./envCleanOptions/envCleanOptions');
const { dynamicMenu } = require('../dynamicMenu/dynamicMenu');
const {
  deleteLambdaFunctions,
} = require('../../deleteResources/deleteLambdaFunctions/deleteLambdaFunctions');
const {
  deleteApiResources,
} = require('../../deleteResources/deleteApiResources/deleteApiResources');
const {
  deleteStepFunctions,
} = require('../../deleteResources/deleteStepFunctions/deleteStepFunctions');

// Config

async function envCleanMenu() {
  try {
    while (true) {
      let selected = await envCleanOptions();
      selected = selected.selection;

      switch (selected) {
        case '1':
          // Delete Lambda Function

          let option1controller = true;

          while (option1controller) {
            let lambdaFunctionSelection = await dynamicMenu(
              'delete',
              `Pick Lambda Function to Delete`,
              `Which Lambda Function ARN would you like to Delete (ex: arn:aws:lambda:##aws-region##:##acct-id##:function:##fn-name##) ?`
            );

            lambdaFunctionSelection = lambdaFunctionSelection.selection;

            if (lambdaFunctionSelection.toLowerCase().includes('arn')) {
              await deleteLambdaFunctions(lambdaFunctionSelection);
            } else if (lambdaFunctionSelection === 'exit') {
              process.exit(1);
            } else if (lambdaFunctionSelection === '0') {
              option1controller = false;
            } else {
              console.log(
                chalk.red(`\n*** Invalid Selection or Input is not an ARN ***`)
              );
            }
          }

          break;

        case '2':
          // Delete API Resource

          let option2controller = true;

          while (option2controller) {
            let restAPISelection = await dynamicMenu(
              'info',
              `Pick a Rest API`,
              `Type a Rest API ID to Continue ?`
            );
            restAPISelection = restAPISelection.selection;

            if (restAPISelection === 'exit') {
              process.exit(1);
            } else if (restAPISelection === '0') {
              option2controller = false;
            } else {
              let restAPIController = true;

              while (restAPIController) {
                let apiResourceSelection = await dynamicMenu(
                  'delete',
                  `Pick an API Resource to Delete`,
                  `Type an API Resource ID to Delete ?`,
                  `Pick another Rest API`
                );

                apiResourceSelection = apiResourceSelection.selection;

                if (apiResourceSelection === 'exit') {
                  process.exit(1);
                } else if (apiResourceSelection === '0') {
                  option2controller = false;
                  restAPIController = false;
                } else if (apiResourceSelection === 'back') {
                  restAPIController = false;
                } else {
                  await deleteApiResources(
                    apiResourceSelection,
                    restAPISelection
                  );
                }
              }
            }
          }

          break;

        case '3':
          // Delete Step Function

          let option3controller = true;

          while (option3controller) {
            let stepFunctionSelection = await dynamicMenu(
              'delete',
              `Pick Step Function to Delete`,
              `Which Step Function ARN would you like to Delete (ex: arn:aws:states:##aws-region##:##acct-id##:stateMachine:##name##) ?`
            );
            stepFunctionSelection = stepFunctionSelection.selection;

            if (stepFunctionSelection.toLowerCase().includes('arn')) {
              await deleteStepFunctions(stepFunctionSelection);
            } else if (stepFunctionSelection === 'exit') {
              process.exit(1);
            } else if (stepFunctionSelection === '0') {
              option3controller = false;
            } else {
              console.log(
                chalk.red(`\n*** Invalid Selection or Input is not an ARN ***`)
              );
            }
          }

          break;

        case '6':
          let option6controller = true;

          while (option6controller) {
            let lambdaFunctionDeleteVerification = await dynamicMenu(
              'delete',
              `Are you sure you want to delete all Lambda Functions?`,
              null,
              null,
              `Type "Delete All" to continue (or 0 to cancel):  `
            );
            lambdaFunctionDeleteVerification =
              lambdaFunctionDeleteVerification.selection;

            if (lambdaFunctionDeleteVerification === 'Delete All') {
              await deleteLambdaFunctions(null, true);

              option6controller = false;
            } else if (lambdaFunctionDeleteVerification === '0') {
              console.log(chalk.red(`\n*** Delete Action Canceled ***`));

              option6controller = false;
            } else {
              console.log(chalk.red(`\n*** Invalid Input ***`));
            }
          }

          break;

        case '7':
          let option7controller = true;

          while (option7controller) {
            let restAPISelection = await dynamicMenu(
              'info',
              `Pick a Rest API`,
              `Type a Rest API ID to Continue ?`
            );
            restAPISelection = restAPISelection.selection;

            if (restAPISelection === 'exit') {
              process.exit(1);
            } else if (restAPISelection === '0') {
              console.log(chalk.red(`\n*** Delete Action Canceled ***`));

              option7controller = false;
            } else {
              let restAPIController = true;

              while (restAPIController) {
                let apiResourceDeleteVerification = await dynamicMenu(
                  'delete',
                  `Are you sure you want to delete all API Resources?`,
                  null,
                  null,
                  `Type "Delete All" to continue (or 0 to cancel):  `
                );
                apiResourceDeleteVerification =
                  apiResourceDeleteVerification.selection;

                if (apiResourceDeleteVerification === 'Delete All') {
                  await deleteApiResources(null, restAPISelection, true);

                  restAPIController = false;
                } else if (apiResourceDeleteVerification === '0') {
                  console.log(chalk.red(`\n*** Delete Action Canceled ***`));

                  restAPIController = false;
                  option7controller = false;
                } else {
                  console.log(chalk.red(`\n*** Invalid Input ***`));
                }
              }
            }
          }

          break;

        case '8':
          let option8controller = true;

          while (option8controller) {
            let stepFunctionDeleteVerification = await dynamicMenu(
              'delete',
              `Are you sure you want to delete all Step Functions?`,
              null,
              null,
              `Type "Delete All" to continue (or 0 to cancel):  `
            );
            stepFunctionDeleteVerification =
              stepFunctionDeleteVerification.selection;

            if (stepFunctionDeleteVerification === 'Delete All') {
              await deleteStepFunctions(null, true);

              option8controller = false;
            } else if (stepFunctionDeleteVerification === '0') {
              console.log(chalk.red(`\n*** Delete Action Canceled ***`));

              option8controller = false;
            } else {
              console.log(chalk.red(`\n*** Invalid Input ***`));
            }
          }

          break;

        case '0':
          return;

        case 'exit':
          process.exit();

        default:
          console.log(`\n*** Invalid Selection ***\n`);
          break;
      }
    }
  } catch (error) {
    console.log('\n');
    console.log(chalk.red(error.stack));
  }
}

module.exports.envCleanMenu = envCleanMenu;
