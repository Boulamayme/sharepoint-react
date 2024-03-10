import { DisplayMode } from "@microsoft/sp-core-library";
import { IFilePickerResult } from "@pnp/spfx-controls-react";

export interface IAuthorBoxProps {
  avatar: IFilePickerResult;
  name: string;
  description: string;
  position: string;
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
}
