declare interface IAuthorBoxWebPartStrings {
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
  Name: string;
  Description: string;
  Position: string;
  Avatar: string;
  ChooseAPicture: string;
  FilePicker: string;
}

declare module "AuthorBoxWebPartStrings" {
  const strings: IAuthorBoxWebPartStrings;
  export = strings;
}
