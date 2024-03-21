declare interface IHomeWebPartStrings {
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
  AddToCalendar: string;
  Recent: string;
  Popular: string;
  SeeMore: string;
}

declare module 'HomeWebPartStrings' {
  const strings: IHomeWebPartStrings;
  export = strings;
}
