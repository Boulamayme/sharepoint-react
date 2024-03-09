import { DisplayMode } from "@microsoft/sp-core-library";
import { ICardDocument } from "../../components/models/cardDocument.model";

export interface ICardDocumentProps {
  items: ICardDocument[];
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
}
