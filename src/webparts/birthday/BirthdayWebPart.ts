import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneDropdown,
  type IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import Birthday from "./components/Birthday";
import { IBirthdayProps } from "./components/IBirthdayProps";
import { getSP } from "../components/pnpjsConfig";

export interface IBirthdayWebPartProps {
  incomingBirthday: any[];
  position: string;
}

export default class BirthdayWebPart extends BaseClientSideWebPart<IBirthdayWebPartProps> {
  // private _isDarkTheme: boolean = false;
  // private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<IBirthdayProps> = React.createElement(
      Birthday,
      {
        context: this.context,
        position: this.properties.position,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();

    getSP(this.context);
  }

  _onConfigure = (): void => {
    this.context.propertyPane.open();
  };

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
          header: {
            description: "Birthday Web Part Configuration",
          },
          groups: [
            {
              groupName: "Configuration layout",
              groupFields: [
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
