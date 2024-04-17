import { DisplayMode } from "@microsoft/sp-core-library";

export interface IIncomingEmployeesProps {
  position: string;
  items: any[];
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
}
