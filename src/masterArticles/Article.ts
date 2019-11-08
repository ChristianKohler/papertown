export interface Article {
  content?: string;
  fullContent?: string;
  frontmatter?: any;
}

export interface CreateArticle {
  fullContent: string;
}
