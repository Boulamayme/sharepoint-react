import { DisplayMode } from "@microsoft/sp-core-library";

export interface IToolsProps {
  tools: any;
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
}
