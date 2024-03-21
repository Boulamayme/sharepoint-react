import { DisplayMode } from "@microsoft/sp-core-library";
import { IArticle } from "../../card/components/ICardProps";

export interface INewsProps {
  articles: IArticle[];
  onConfigurePropPane: () => void;
  displayMode: DisplayMode;
}
