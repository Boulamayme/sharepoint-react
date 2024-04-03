import { DisplayMode } from "@microsoft/sp-core-library";

export interface IButtonProps {
  theme: string;
  position:string;
  label: string;
  link: string;
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
}
