import axios, { AxiosResponse } from "axios";
import * as frontmatterParser from "frontmatter";
import { DevToArticle } from "./DevToArticle";
import { BlogPlatform } from "../blogplatform.interface";
import { CreateArticle } from "../../masterArticles/Article";

const apiUrl = "https://dev.to/api";

async function getAll(apiKey: string): Promise<DevToArticle[]> {
  const allPublishedPosts = await axios.get<DevToArticle[]>(
    `${apiUrl}/articles/me/all`,
    {
      headers: { "api-key": apiKey }
    }
  );

  return allPublishedPosts.data.map(article => {
    const { data: frontmatter, content } = frontmatterParser(
      article.body_markdown
    );

    return {
      ...article,
      content,
      frontmatter,
      fullContent: article.body_markdown
    };
  });
}

async function update(
  devToArticle: DevToArticle,
  apiKey: string
): Promise<AxiosResponse<any>> {
  return await axios.put(
    `${apiUrl}/articles/${devToArticle.id}`,
    { ...devToArticle, body_markdown: devToArticle.fullContent },
    {
      headers: { "api-key": apiKey }
    }
  );
}

async function create(
  createArticle: CreateArticle,
  apiKey: string
): Promise<AxiosResponse<any>> {
  return await axios.post(
    `${apiUrl}/articles`,
    {
      article: {
        body_markdown: createArticle.fullContent
      }
    },
    {
      headers: { "api-key": apiKey }
    }
  );
}

export const platformDevTo = (apikey: string): BlogPlatform => {
  return {
    name: "DevTo",
    getAll: () => getAll(apikey),
    update: (article: DevToArticle) => update(article, apikey),
    create: (article: CreateArticle) => create(article, apikey)
  };
};
