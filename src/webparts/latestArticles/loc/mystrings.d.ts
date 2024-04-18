declare interface ILatestArticlesWebPartStrings {
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

declare module 'LatestArticlesWebPartStrings' {
  const strings: ILatestArticlesWebPartStrings;
  export = strings;
}
