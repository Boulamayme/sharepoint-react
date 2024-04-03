import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import "../components/assets/global.scss";

import * as strings from "ButtonWebPartStrings";
import Button from "./components/Button";
import { IButtonProps } from "./components/IButtonProps";

export interface IButtonWebPartProps {
  theme: string;
  label: string;
  link: string;
  position: string;
}

export default class ButtonWebPart extends BaseClientSideWebPart<IButtonWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IButtonProps> = React.createElement(
      Button,
      {
        theme: this.properties.theme,
        position: this.properties.position,
        label: this.properties.label,
        link: this.properties.link,
        displayMode: this.displayMode,
        onConfigurePropPane: this._onConfigure,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  _onConfigure = () => {
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
          header: {
            description: "Button Web Part Configuration",
          },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField("label", {
                  label: "Label",
                }),
                PropertyPaneTextField("link", {
                  label: "Link",
                }),
              ],
            },
            {
              groupName: "Configuration layout",
              groupFields: [
                PropertyPaneDropdown("theme", {
                  label: "Theme",
                  options: [
                    { key: "dx-btn__default ", text: "Standards" },
                    { key: "dx-btn__rounded", text: "Rounded" },
                    { key: "dx-btn__directory", text: "Directory" },
                  ],
                  selectedKey: "dx-btn__default",
                }),
                PropertyPaneDropdown("position", {
                  label: "Position",
                  selectedKey: this.properties.position,
                  options: [
                    { key: "justify-content-start", text: "Start" },
                    { key: "justify-content-center", text: "Center" },
                    { key: "justify-content-end", text: "End" },
                  ],
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
