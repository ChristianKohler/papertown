import * as fs from "fs";
import * as util from "util";
import * as path from "path";
import { MasterArticle } from "./MasterArticle";
import * as frontmatterParser from "frontmatter";

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

export async function getMasterArticlesWithMasterId(
  rootFolder: string
): Promise<MasterArticle[]> {
  const allMasterArticles = await getAllMasterArticles(rootFolder);
  return allMasterArticles.filter(hasMasterId);
}

/**
 * Structure has to be:
 * - rootFolder
 * -  postA
 * -    index.md
 * -  postB
 * -    index.md
 * @param rootFolder root folder for all blog article
 */
export async function getAllMasterArticles(
  rootFolder: string
): Promise<MasterArticle[]> {
  const articleFolderNames = await readDir(path.normalize(rootFolder));
  return Promise.all(
    articleFolderNames.map(foldername => {
      const fileName = path.join(rootFolder, foldername, "index.md");
      return folderNameToMasterArticle(fileName);
    })
  );
}

async function folderNameToMasterArticle(
  fileName: string
): Promise<MasterArticle> {
  const fullContent = await readFile(fileName, { encoding: "utf8" });
  const parsedFile = frontmatterParser(fullContent);
  const { data: frontmatter, content } = parsedFile;

  return {
    fileName,
    frontmatter,
    content,
    fullContent
  };
}

function hasMasterId(article: MasterArticle) {
  return article.frontmatter && article.frontmatter.masterid;
}
