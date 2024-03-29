import { DisplayMode } from "@microsoft/sp-core-library";

export interface IAnimatedCardProps {
  items: any[];
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
}
