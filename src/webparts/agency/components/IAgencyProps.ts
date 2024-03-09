import { DisplayMode } from "@microsoft/sp-core-library";
import { IAgency } from "../../components/models/agency.model";

export interface IAgencyProps {
  items: IAgency[];
  displayMode: DisplayMode;
  onConfigurePropPane: () => void;
}
