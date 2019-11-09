import { MasterArticle } from "../masterArticles/MasterArticle";
import { platformDevTo } from "../blogPlatforms/devto/devto";
import { BlogPlatform } from "../blogPlatforms/blogplatform.interface";
import { Article } from "../masterArticles/Article";
import { info, error as logError } from "../utils/logger";

export async function syncBlogPlatformsWithMasters(
  masterArticles: MasterArticle[],
  config: { devtoApiKey: any }
) {
  /**
   * DEV.to
   */
  await syncBlogPlatformWithMasters(
    masterArticles,
    platformDevTo(config.devtoApiKey)
  );
}

/**
 * Loop over ery master article and then either
 * - Update
 * - Create
 */
async function syncBlogPlatformWithMasters(
  masterArticles: MasterArticle[],
  platform: BlogPlatform
) {
  info(`Syncing Platform ${platform.name}`);

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
      try {
        await platform.create({
          fullContent: masterArticle.fullContent
        });
      } catch (error) {
        logError(JSON.stringify(error.response.data));
      }
    } else if (
      platformArticle &&
      !isArticleUptodate(masterArticle, platformArticle)
    ) {
      info(`Update Article`);
      try {
        await platform.update({
          ...platformArticle,
          fullContent: masterArticle.fullContent
        });
      } catch (error) {
        logError(JSON.stringify(error.response.data));
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
  return masterArticle.content === devToArticle.content;
}
