import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { type IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

/**************************************************
 *TO DO: Must be deleted and add it in extension
 *************************************************/
import "../components/assets/global.scss";

import * as strings from "TeamsListWebPartStrings";
import TeamsList from "./components/TeamsList";
import { ITeamsListProps } from "./components/ITeamsListProps";
import {
  CustomCollectionFieldType,
  PropertyFieldCollectionData,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";

export interface ITeamsListWebPartProps {
  users: any[];
}

export default class TeamsListWebPart extends BaseClientSideWebPart<ITeamsListWebPartProps> {
  public render(): void {
    console.log("Users", this.properties.users);
    const element: React.ReactElement<ITeamsListProps> = React.createElement(
      TeamsList,
      {
        displayMode: this.displayMode,
        onConfigurePropPane: this._onConfigure,
        users: this.properties.users || [],
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  public _onConfigure = () => {
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
            description: "Team List Web Part Configuration",
          },
          groups: [
            {
              groupFields: [
                PropertyFieldCollectionData("users", {
                  key: "users",
                  label: "",
                  panelHeader: "Manage items users",
                  manageBtnLabel: "Manage users",
                  value: this.properties.users,
                  fields: [
                    {
                      id: "user",
                      title: "Author",
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (
                        field,
                        value,
                        onUpdate,
                        item,
                        itemId,
                        onError
                      ) => {
                        return React.createElement(PeoplePicker, {
                          context: this.context as any,
                          personSelectionLimit: 1,
                          showtooltip: true,
                          key: itemId,
                          defaultSelectedUsers: [item.email],
                          onChange: (items: any[]) => {
                            item.email = items[0].secondaryText;
                            onUpdate(field.id, items[0].text);
                          },
                          showHiddenInUI: false,
                          principalTypes: [PrincipalType.User],
                        });
                      },
                    },
                    {
                      id: "service",
                      title: "Service",
                      type: CustomCollectionFieldType.string,
                    },
                  ],
                  disabled: false,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
