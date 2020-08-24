#!/usr/bin/env node

import { log } from "util";
import { sync } from "./commands/sync";
import { config } from "./config";

const usage = `
Usage
  $ papertown <command>
  
Commands
  sync                  Runs a sync

Options
  --rootFolder          Change the root folder
  --devtoApiKey         Set the Api Key for DevTo
  --imageRootUrlGithub  Replace relative images with this url
  --dryRun              Don't push changes to blog platforms

Examples
  $ papertown sync --devtoApiKey yourapikey
`;

async function main() {
  /**
   * Check command
   */
  const command = process.argv[2];
  const availableCommands = ["sync"];
  if (availableCommands.indexOf(command) === -1) {
    log(usage);
    return;
  }

  /**
   * Start sync command
   */
  await sync(config);
}

(async () => await main())();
