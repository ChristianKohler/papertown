import chalk from "chalk";
const appName = "Papertown:";

export function error(message: string) {
  console.log(`${chalk.green(appName)} ${chalk.red(message)}`);
}

export function info(message: string) {
  console.log(`${chalk.green(appName)} ${chalk.cyan(message)}`);
}
