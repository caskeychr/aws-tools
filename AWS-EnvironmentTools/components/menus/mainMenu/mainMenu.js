// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');
const inquirer = require('inquirer');

// Libraries

// Imported Components

// Config

async function mainMenu() {
  try {
    let results = null;

    console.log(`\n`);
    console.log(chalk.green('Main Menu'));

    await inquirer
      .prompt([
        {
          name: 'selection',
          message: `1) List AWS Resources with Project Name
  2) Clean Environment
  
  exit) Exit Application
        
        Selection? `,
        },
      ])
      .then((answers) => {
        results = answers;
      })
      .catch((error) => {
        if (error.isTtyError) {
          throw `Prompt couldn't be rendered in the current environment`;
        } else {
          throw error;
        }
      });

    return results;
  } catch (error) {
    throw error;
  }
}

module.exports.mainMenu = mainMenu;
