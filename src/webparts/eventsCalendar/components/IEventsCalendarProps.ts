import { DisplayMode } from "@microsoft/sp-core-library";

export interface IEventsCalendarProps {
  events: any[];
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
}
