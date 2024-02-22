import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { type IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "OrganizationalChartWebPartStrings";
import OrganizationalChart from "./components/OrganizationalChart";
import { IOrganizationalChartProps } from "./components/IOrganizationalChartProps";

import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";

import {
  PropertyFieldCollectionData,
  CustomCollectionFieldType,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";

export interface IOrganizationalChartWebPartProps {
  description: string;
  items: any[];
}

export default class OrganizationalChartWebPart extends BaseClientSideWebPart<IOrganizationalChartWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IOrganizationalChartProps> =
      React.createElement(OrganizationalChart, {
        items: this.properties.items || [],
        onConfigurePropPane: this.configurePropPane,
        displayMode: this.displayMode,
      });

    ReactDom.render(element, this.domElement);
  }

  public configurePropPane = (): void => {
    this.context.propertyPane.open();
  };

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then((message) => {
      //
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
              groupFields: [
                PropertyFieldCollectionData("items", {
                  key: "items",
                  label: "Manage Items",
                  panelHeader: "Manage users",
                  manageBtnLabel: "Manage users",
                  value: this.properties.items,
                  fields: [
                    {
                      id: "user",
                      title: "User",
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (
                        field,
                        value,
                        onUpdate,
                        item,
                        itemId
                      ) => {
                        return React.createElement(PeoplePicker, {
                          context: this.context as any,
                          personSelectionLimit: 1,
                          showtooltip: true,
                          key: itemId,
                          ensureUser: true,
                          defaultSelectedUsers: [item.userId],
                          onChange: (items: any = []) => {
                            item.userId = items[0].secondaryText;
                            onUpdate(field.id, items[0]);
                            console.log("Items", this.properties.items);
                          },
                          showHiddenInUI: false,
                          principalTypes: [PrincipalType.User],
                        });
                      },
                    },
                    {
                      id: "jobTitle",
                      title: "Job Title",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "lobs",
                      title: "Lobs",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "seniorMember",
                      title: "Senior Member",
                      type: CustomCollectionFieldType.boolean,
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
