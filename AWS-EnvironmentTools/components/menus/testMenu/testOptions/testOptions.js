// Logging

// Imported 3rd Party NPM Packages
const chalk = require('chalk');
const inquirer = require('inquirer');

// Libraries

// Imported Components

// Config

async function testOptions() {
  try {
    let results = null;

    console.log(`\n`);
    console.log(chalk.green('Test Environment'));

    await inquirer
      .prompt([
        {
          name: 'selection',
          message: `1) Install Test Environment
  2) Run Test Environment
  3) Delete Test Environment
  
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

module.exports.testOptions = testOptions;
