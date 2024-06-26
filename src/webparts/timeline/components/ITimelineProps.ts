import { DisplayMode } from "@microsoft/sp-core-library";
import { ITimeline } from "../../components/models/timeline.model";

export interface ITimelineProps {
  items: ITimeline[];
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
}
