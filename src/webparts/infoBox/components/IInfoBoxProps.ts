import { DisplayMode } from "@microsoft/sp-core-library";
import { IInfoBox } from "../../components/models/infoBox.model";

export interface IInfoBoxProps {
  items: IInfoBox[];
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
}
