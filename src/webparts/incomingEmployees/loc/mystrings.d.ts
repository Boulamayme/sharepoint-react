declare interface IIncomingEmployeesWebPartStrings {
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
  Interests: string;
  ArrivalDate: string;
}

declare module 'IncomingEmployeesWebPartStrings' {
  const strings: IIncomingEmployeesWebPartStrings;
  export = strings;
}
