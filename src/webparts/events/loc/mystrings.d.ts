declare interface IEventsWebPartStrings {
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
  ChooseBackgroundImage: string;
  FilePicker: string;
  Days: string;
  Hours: string;
  Minutes: string;
  Register: string;
  Title: string;
  Place: string;
  Date: string;
}

declare module "EventsWebPartStrings" {
  const strings: IEventsWebPartStrings;
  export = strings;
}
