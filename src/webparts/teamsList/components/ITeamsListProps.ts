import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITeamsListProps {
  users: any[];
  onConfigurePropPane: () => void;
  displayMode: any;
  context: WebPartContext;
}
