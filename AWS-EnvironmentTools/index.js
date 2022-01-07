// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

// Libraries

// Imported Components
const { mainMenu } = require('./components/menus/mainMenu/mainMenu');
const { listMenu } = require('./components/menus/listMenu/listMenu');
const {
  envCleanMenu,
} = require('./components/menus/envCleanMenu/envCleanMenu');

// Config

(async function () {
  try {
    let selection = null;

    // clear();

    console.log(
      chalk.green(
        figlet.textSync('AWS Env Tools', { horizontalLayout: 'full' })
      )
    );

    while (true) {
      let results = await mainMenu();

      selection = results.selection;

      switch (selection) {
        case '1':
          await listMenu();

          break;

        case '2':
          await envCleanMenu();

          break;

        case 'exit':
          return;
        default:
          console.log(`\n*** Invalid Selection ***\n`);
          break;
      }
    }
  } catch (error) {
    console.log(error);
  }
})();
