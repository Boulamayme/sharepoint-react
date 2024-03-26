import { DisplayMode } from "@microsoft/sp-core-library";

export interface ICardTrainingProps {
  items: any[];
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
  columns: string;
}
