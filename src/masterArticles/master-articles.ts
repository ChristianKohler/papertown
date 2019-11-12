import * as fs from "fs";
import * as util from "util";
import * as path from "path";
import { MasterArticle } from "./MasterArticle";
import * as frontmatterParser from "frontmatter";
import { convertRelativeToGithubRaw } from "./image-links-converter";

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const exists = util.promisify(fs.exists);

export async function getMasterArticlesWithMasterId(
  rootFolder: string,
  baseUrl: string
): Promise<MasterArticle[]> {
  const allMasterArticles = await getAllMasterArticles(rootFolder, baseUrl);
  return allMasterArticles.filter(hasMasterId);
}

export async function rootFolderExists(rootFolder) {
  return await exists(rootFolder);
}

/**
 * Check if a masterid is used more than once
 */
export function haveDuplicateMasterIDs(masterArticles: MasterArticle[]) {
  const allIds = masterArticles.map(article => article.frontmatter.masterid);
  return new Set(allIds).size !== allIds.length;
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
  rootFolder: string,
  baseUrl: string
): Promise<MasterArticle[]> {
  const articleFolderNames = await readDir(path.normalize(rootFolder));
  return Promise.all(
    articleFolderNames.map(foldername => {
      const fileName = path.join(rootFolder, foldername, "index.md");
      return folderNameToMasterArticle(fileName, baseUrl);
    })
  );
}

async function folderNameToMasterArticle(
  fileName: string,
  baseUrl: string
): Promise<MasterArticle> {
  const fullContentOriginal = await readFile(fileName, { encoding: "utf8" });
  const fullContent = convertRelativeToGithubRaw(
    fullContentOriginal,
    baseUrl,
    fileName
  );
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
