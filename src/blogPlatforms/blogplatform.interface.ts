import { Article, CreateArticle } from "../masterArticles/Article";

export interface BlogPlatform {
  name: string;
  getAll(): Promise<Article[]>;
  update(article: Article);
  create(article: CreateArticle);
}
