#!/usr/bin/env node
import {
  getMasterArticlesWithMasterId,
  rootFolderExists,
  haveDuplicateMasterIDs
} from "./masterArticles/master-articles";
import { syncBlogPlatformsWithMasters } from "./sync/sync";
import { error } from "./utils/logger";
import { config } from "./config";
import { log } from "util";

const usage = `
Usage
  $ papertown <command>
  
Commands
  sync           Runs a sync

Options
  --rootFolder   Change the root folder
  --devtoApiKey  Set the Api Key for DevTo

Examples
  $ foo sync --devtoApiKey asdf234asdf
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
   * Stop if root folder does not exist
   */
  if (!(await rootFolderExists(config.rootFolder))) {
    error(`Root folder not found: ${config.rootFolder}`);
    return;
  }

  /**
   * Get all articles with an masterid in the frontmatter
   */
  const masterArticles = await getMasterArticlesWithMasterId(
    config.rootFolder
  );

  /**
   * Stop if no master articles were found
   */
  if (masterArticles.length === 0) {
    error("No articles found with masterid");
    return;
  }

  /**
   * Stop if a masterid is used twice
   */
  if (haveDuplicateMasterIDs(masterArticles)) {
    error("Articles have duplicate master ids");
    return;
  }

  /**
   * Sync all master articles
   */
  await syncBlogPlatformsWithMasters(masterArticles, config);
}

(async () => await main())();
