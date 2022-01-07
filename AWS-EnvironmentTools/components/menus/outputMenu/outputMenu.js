// Logging

// Imported 3rd Party NPM Packages
const fs = require('fs');
const chalk = require('chalk');

// Libraries

// Imported Components
const { outputOptions } = require('./outputOptions/outputOptions');

// Config

async function outputMenu(input, fileName, forceSelect) {
  while (true) {
    try {
      let selection = null;

      if (forceSelect) {
        selection = forceSelect;
      } else {
        selection = await outputOptions();
        selection = selection.selection;
      }

      switch (selection) {
        case '1':
          await fs.writeFileSync(`./output/${fileName}`, input);

          console.log(`\n`);
          console.log(`-- Output file has been created: /output/${fileName}`);

          break;

        case '2':
          console.log(`\n`);
          console.log(input);

          break;

        case 'runall':
          await fs.writeFileSync(`./output/${fileName}`, input);

          console.log(`\n`);
          console.log(`-- Output file has been created: /output/${fileName}`);

          return;

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

module.exports.outputMenu = outputMenu;
