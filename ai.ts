#!/usr/bin/env ts-node

import * as program from "commander";
import * as inquirer from "inquirer";
import * as chalk from "chalk";

declare var process: any;

const questions = [
  {
    type: 'input',
    name: 'firstname',
    message: 'Enter firstname ..'
  },
  {
    type: 'input',
    name: 'lastname',
    message: 'Enter lastname ..'
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Enter phone number ..'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter email address ..'
  }
];

program
  .version('0.0.1')
  .description('AiJs cli tool to create new application')

program
  .command('create')
  .alias('c')
  .description('Create new application')
  .action(() => {
    inquirer.prompt(questions).then((answers: any) =>
      console.log(answers));
  });
  
program
  .command('exec')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function (cmd) {
    console.log('exec "%s" using %s mode', cmd);
  });

program
  .command('serve')
  .alias('-s')
  .description('start and open the ai app')
  .option('-H, --host <host>', 'Host used for the rest server (default: localhost)')
  .option('-p, --port <port>', 'Port used for the rest server (by default search for available port)')
  .option('-D, --dev', 'Run in dev mode')
  .option('--quiet', `Don't output starting messages`)
  .option('--headless', `Don't open browser on start and output port`)
  .action((cmd) => {
    console.log('serve', cmd);
  });

program
  .command('update')
  .alias('-u')
  .description('Update to latest version')
  .action(name => console.log(name));

// output help information on unknown commands
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.default.red(`Unknown command ${chalk.default.yellow(cmd)}.`))
    console.log()
  })

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.default.cyan(`ai-js <command> --help`)} for detailed usage of given command.`)
  console.log()
})

// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv);
