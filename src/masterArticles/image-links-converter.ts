import { join } from "path";
import { warn } from "../utils/logger";

const relativeUrlRegex = /(\.{1,2}\/)([a-zA-Z0-9-\/]*)\.([a-zA-Z0-9-\/]{3})/g;

/**
 * From this: ./images/hero.png
 * To this: https://raw.githubusercontent.com/ChristianKohler/Homepage/master/content/posts/2019-11-09-introducing-papertown/images/hero.png
 * @param content markdown content
 * @param baseUrl e.g. https://raw.githubusercontent.com/ChristianKohler/Homepage/master
 * @param mdPath e.g. /Users/chris/repos/Homepage/content/posts/2019-11-09-introducing-papertown/index.md
 */
export function convertRelativeToGithubRaw(
  content: string,
  baseUrl: string,
  mdPath: string
) {
  const matches = content.match(relativeUrlRegex);

  if (!matches) {
    return content;
  }

  if (!baseUrl) {
    warn(`
      Relative images were found.
      Papertown can convert those URLs to github raw urls. Set the imageRootUrlGithub to your
      Github repository. E.g. https://raw.githubusercontent.com/ChristianKohler/Homepage/master
    `);
    return content;
  }

  return matches.reduce((result: string, match: string) => {
    const fullUrl = createUrl(baseUrl, mdPath, match);
    return result.replace(match, fullUrl);
  }, content);
}

function createUrl(baseUrl: string, mdPath: string, relativeImagePath: string) {
  const relativeFolderPath = mdPath.replace("/index.md", "");
  return join(baseUrl, relativeFolderPath, relativeImagePath).replace(
    ":/",
    "://"
  );
}
