import { MasterArticle } from "../masterArticles/MasterArticle";
import { platformDevTo } from "../blogPlatforms/devto/devto";
import { BlogPlatform } from "../blogPlatforms/blogplatform.interface";
import { Article } from "../masterArticles/Article";
import { info, error as logError } from "../utils/logger";

export async function syncBlogPlatformsWithMasters(
  masterArticles: MasterArticle[],
  config: { devtoApiKey: any; dryRun: boolean }
) {
  /**
   * DEV.to
   */
  await syncBlogPlatformWithMasters(
    masterArticles,
    platformDevTo(config.devtoApiKey),
    config.dryRun
  );
}

/**
 * Loop over ery master article and then either
 * - Update
 * - Create
 */
async function syncBlogPlatformWithMasters(
  masterArticles: MasterArticle[],
  platform: BlogPlatform,
  dryRun: boolean = false
) {
  info(`Syncing Platform ${platform.name}`);

  if (dryRun) {
    info(`Running in dry run mode`);
  }

  const platformArticles = await platform.getAll();

  for (const masterArticle of masterArticles) {
    info(
      `Processing Article: ${masterArticle.fileName} ${masterArticle.frontmatter.masterid}`
    );

    const platformArticle = findExistingArticle(
      masterArticle,
      platformArticles
    );

    if (!platformArticle) {
      info(`Create Article`);
      if (!dryRun) {
        try {
          await platform.create({
            fullContent: masterArticle.fullContent
          });
        } catch (error) {
          logError(JSON.stringify(error.response.data));
        }
      }
    } else if (
      platformArticle &&
      !isArticleUptodate(masterArticle, platformArticle)
    ) {
      info(`Update Article`);
      if (!dryRun) {
        try {
          await platform.update({
            ...platformArticle,
            fullContent: masterArticle.fullContent
          });
        } catch (error) {
          logError(JSON.stringify(error.response.data));
        }
      }
    } else {
      info("Article is up to date");
    }
  }
}

function findExistingArticle(
  masterArticle: MasterArticle,
  platformArticles: Article[]
) {
  return platformArticles.find(article => {
    return (
      article.frontmatter &&
      article.frontmatter.masterid &&
      masterArticle.frontmatter &&
      masterArticle.frontmatter.masterid &&
      article.frontmatter.masterid === masterArticle.frontmatter.masterid
    );
  });
}

function isArticleUptodate(
  masterArticle: MasterArticle,
  devToArticle: Article
) {
  return masterArticle.fullContent === devToArticle.fullContent;
}
