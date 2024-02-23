import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDocumentsManagerProps {
  folderUrl: string;
  ctx: WebPartContext;
}

export interface IDocumentManagerState {
  folders: any[];
  files: any[];
  historyStack: string[];
}