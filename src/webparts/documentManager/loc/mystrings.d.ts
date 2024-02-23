declare interface IDocumentManagerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
  Modified: string;
  AddedBy: string;
  Name: string;
  Promote: string;
}

declare module "DocumentManagerWebPartStrings" {
  const strings: IDocumentManagerWebPartStrings;
  export = strings;
}
