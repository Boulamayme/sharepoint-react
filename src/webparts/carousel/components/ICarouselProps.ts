import { DisplayMode } from "@microsoft/sp-core-library";

export interface ICarouselProps {
  items: any[];
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
}
