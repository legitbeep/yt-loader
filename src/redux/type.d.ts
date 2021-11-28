  interface IArticle {
    id: number
    title: string
    body: string
  }
  
  type ArticleState = {
    articles: IArticle[]
  }
  
  type ArticleAction = {
    type: string
    article: IArticle
  }
  
  type DispatchType = (args: ArticleAction) => ArticleAction

  interface IVideo {
    title : string;
    thumbnail ?: string;
    url ?: string;
    id: string;
  }