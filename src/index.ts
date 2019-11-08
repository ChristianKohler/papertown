import { getMasterArticlesWithMasterId } from "./masterArticles/master-articles";
import { MasterArticle } from "./masterArticles/MasterArticle";
import { syncBlogPlatformsWithMasters } from "./sync/sync";
import { error } from "./utils/logger";
import { config } from "./config";

async function main() {
  /**
   * Get all articles with an masterid in the frontmatter
   */
  const masterArticles = await getMasterArticlesWithMasterId(
    config.articlesFolder
  );

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

/**
 * Check if a masterid is used more than once
 */
function haveDuplicateMasterIDs(masterArticles: MasterArticle[]) {
  const allIds = masterArticles.map(article => article.frontmatter.masterid);
  return new Set(allIds).size !== allIds.length;
}

(async () => await main())();
