// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');
const { cloudWatchLogs } = require('../../cloudWatchLogs/cloudWatchLogs');

// Libraries

// Imported Components
const { cloudWatchOptions } = require('./cloudWatchOptions/cloudWatchOptions');
const { dynamicMenu } = require('../dynamicMenu/dynamicMenu');

// Config

async function cloudWatchMenu() {
  try {
    while (true) {
      let selected = await cloudWatchOptions();
      selected = selected.selection;

      switch (selected) {
        case '1':
          let option1controller = true;

          while (option1controller) {
            let lambdaFunctionSelection = await dynamicMenu(
              'info',
              `Lambda CloudWatch Log Retrieval`,
              `Enter name of Lambda Function to retrieve logs`
            );

            lambdaFunctionSelection = lambdaFunctionSelection.selection;

            switch (lambdaFunctionSelection) {
              case 'exit':
                process.exit(1);

              case '0':
                option1controller = false;
                break;

              default:
                await cloudWatchLogs(lambdaFunctionSelection, 'lambda');

                break;
            }
          }

          break;

        case '2':
          let option2controller = true;

          while (option2controller) {
            let cloudWatchFunctionSelection = await dynamicMenu(
              'info',
              `Docker CloudWatch Log Retrieval`,
              `Enter name of Docker Function to retrieve logs`
            );

            cloudWatchFunctionSelection = cloudWatchFunctionSelection.selection;

            switch (cloudWatchFunctionSelection) {
              case 'exit':
                process.exit(1);

              case '0':
                option2controller = false;
                break;

              default:
                await cloudWatchLogs(cloudWatchFunctionSelection, 'docker');

                break;
            }
          }

          break;

        case '3':
          await cloudWatchLogs('', 'dockerAPIGateway');

          break;

        case '0':
          return;

        case 'exit':
          process.exit(1);

        default:
          break;
      }
    }
  } catch (error) {
    console.log('\n');
    console.log(chalk.red(error.stack));
  }
}

module.exports.cloudWatchMenu = cloudWatchMenu;
