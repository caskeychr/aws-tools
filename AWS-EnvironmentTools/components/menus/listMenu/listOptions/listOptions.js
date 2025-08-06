// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');
const inquirer = require('inquirer');

// Libraries

// Imported Components

// Config

async function listOptions() {
  try {
    let results = null;

    console.log(`\n`);
    console.log(chalk.green('Environment Lists'));

    await inquirer
      .prompt([
        {
          name: 'selection',
          message: `1) List Lambda Functions
  2) List API Resources
  3) List Step Functions
  4) Retrieve Environment Config
  
  9) Run All Lists and Generate Output Files

  0) Main Menu
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

module.exports.listOptions = listOptions;
