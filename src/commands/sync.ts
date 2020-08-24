import { Config } from "convict";

import { SyncConfig } from "../config";
import {
  rootFolderExists,
  getMasterArticlesWithMasterId,
  haveDuplicateMasterIDs,
} from "../masterArticles/master-articles";
import { error } from "console";
import { syncBlogPlatformsWithMasters } from "../sync/sync";

export async function sync(config: SyncConfig) {
  /**
   * Stop if root folder does not exist
   */
  if (!(await rootFolderExists(config.rootFolder))) {
    error(`
      Root folder not found: ${config.rootFolder}
      Run $ papertown sync --rootFolder yourrootfolder
    `);
    return;
  }

  /**
   * Get all articles with an masterid in the frontmatter
   */
  const masterArticles = await getMasterArticlesWithMasterId(
    config.rootFolder,
    config.imageRootUrlGithub
  );

  /**
   * Stop if no master articles were found
   */
  if (masterArticles.length === 0) {
    error(`
      No articles found with masterid.
      Add a masterid to the frontmatter of post
      you want to sync
    `);
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
