import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneTextField,
  type IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import "../components/assets/global.scss";

import * as strings from "EventsWebPartStrings";
import Events from "./components/Events";
import { IEventsProps } from "./components/IEventsProps";
import {
  IFilePickerResult,
  PropertyFieldFilePicker,
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls";

import { getSP } from "../components/pnpjsConfig";

export interface IEventsWebPartProps {
  list: any;
  backgroundImage: IFilePickerResult;
  description: string;
  title: string;
  url: string;
}

export default class EventsWebPart extends BaseClientSideWebPart<IEventsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IEventsProps> = React.createElement(
      Events,
      {
        libraryName: this.properties.list,
        coverImage: this.properties.backgroundImage,
        description: this.properties.description || "",
        title: this.properties.title || "",
        url: this.properties.url,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    // this._environmentMessage = this._getEnvironmentMessage();

    await super.onInit();

    getSP(this.context);
  }

  // private _getEnvironmentMessage(): Promise<string> {
  //   if (!!this.context.sdks.microsoftTeams) {
  //     // running in Teams, office.com or Outlook
  //     return this.context.sdks.microsoftTeams.teamsJs.app
  //       .getContext()
  //       .then((context) => {
  //         let environmentMessage: string = "";
  //         switch (context.app.host.name) {
  //           case "Office": // running in Office
  //             environmentMessage = this.context.isServedFromLocalhost
  //               ? strings.AppLocalEnvironmentOffice
  //               : strings.AppOfficeEnvironment;
  //             break;
  //           case "Outlook": // running in Outlook
  //             environmentMessage = this.context.isServedFromLocalhost
  //               ? strings.AppLocalEnvironmentOutlook
  //               : strings.AppOutlookEnvironment;
  //             break;
  //           case "Teams": // running in Teams
  //           case "TeamsModern":
  //             environmentMessage = this.context.isServedFromLocalhost
  //               ? strings.AppLocalEnvironmentTeams
  //               : strings.AppTeamsTabEnvironment;
  //             break;
  //           default:
  //             environmentMessage = strings.UnknownEnvironment;
  //         }

  //         return environmentMessage;
  //       });
  //   }

  //   return Promise.resolve(
  //     this.context.isServedFromLocalhost
  //       ? strings.AppLocalEnvironmentSharePoint
  //       : strings.AppSharePointEnvironment
  //   );
  // }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    // this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: "Configuration Events Web Part",
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.Title,
                }),
                PropertyPaneTextField("description", {
                  label: strings.PropertyPaneDescription,
                }),
                PropertyPaneTextField("url", {
                  label: "Url",
                }),
                PropertyFieldListPicker("list", {
                  label: "Select a list",
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  includeListTitleAndUrl: true,
                  key: "listPickerFieldId",
                  baseTemplate: 101,
                }),
                PropertyFieldFilePicker("avatar", {
                  context: this.context as any,
                  filePickerResult: this.properties.backgroundImage,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => {
                    console.log(e);
                    this.properties.backgroundImage = e;
                  },
                  onChanged: (e: IFilePickerResult) => {
                    console.log(e);
                    this.properties.backgroundImage = e;
                  },
                  key: "avatar",
                  buttonLabel: strings.ChooseBackgroundImage,
                  label: strings.FilePicker,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
