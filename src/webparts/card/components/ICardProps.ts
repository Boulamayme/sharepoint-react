import { DisplayMode } from "@microsoft/sp-core-library";

export interface ICardProps {
  articles: IArticle[];
  onConfigurePropPane: () => void;
  displayMode: DisplayMode;
}

export interface IArticle {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedDate: string;
  author: any;
}
