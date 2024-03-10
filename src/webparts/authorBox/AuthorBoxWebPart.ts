import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

/**************************************************
 *TO DO: Must be deleted and add it in extension
 *************************************************/
import "../components/assets/global.scss";

import * as strings from "AuthorBoxWebPartStrings";
import AuthorBox from "./components/AuthorBox";
import { IAuthorBoxProps } from "./components/IAuthorBoxProps";
import {
  IFilePickerResult,
  PropertyFieldFilePicker,
} from "@pnp/spfx-property-controls";

export interface IAuthorBoxWebPartProps {
  avatar: IFilePickerResult;
  name: string;
  description: string;
  position: string;
}

export default class AuthorBoxWebPart extends BaseClientSideWebPart<IAuthorBoxWebPartProps> {
  public render(): void {
    console.log(this.properties);

    const element: React.ReactElement<IAuthorBoxProps> = React.createElement(
      AuthorBox,
      {
        name: this.properties.name,
        avatar: this.properties.avatar,
        description: this.properties.description,
        position: this.properties.position,
        displayMode: this.displayMode,
        onConfigurePropPane: this._onConfigure,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  _onConfigure = (): void => {
    this.context.propertyPane.open();
  };

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then((message) => {
      // this._environmentMessage = message;
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
            case "TeamsModern":
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

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
              groupName: "Auhtor box Webpart Settings",
              groupFields: [
                PropertyPaneTextField("name", {
                  label: strings.Name,
                }),
                PropertyPaneTextField("description", {
                  label: strings.Description,
                }),
                PropertyPaneTextField("position", {
                  label: strings.Position,
                }),
                PropertyFieldFilePicker("avatar", {
                  context: this.context as any,
                  filePickerResult: this.properties.avatar,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => {
                    console.log(e);
                    this.properties.avatar = e;
                  },
                  onChanged: (e: IFilePickerResult) => {
                    console.log(e);
                    this.properties.avatar = e;
                  },
                  key: "avatar",
                  buttonLabel: strings.ChooseAPicture,
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
