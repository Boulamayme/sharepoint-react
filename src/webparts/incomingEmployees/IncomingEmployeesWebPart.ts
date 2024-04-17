import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "IncomingEmployeesWebPartStrings";
import IncomingEmployees from "./components/IncomingEmployees";
import { IIncomingEmployeesProps } from "./components/IIncomingEmployeesProps";
import {
  CustomCollectionFieldType,
  PropertyFieldCollectionData,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import { DateConvention, DateTimePicker } from "@pnp/spfx-controls-react";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";

export interface IIncomingEmployeesWebPartProps {
  position: string;
  items: any[];
}

export default class IncomingEmployeesWebPart extends BaseClientSideWebPart<IIncomingEmployeesWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IIncomingEmployeesProps> =
      React.createElement(IncomingEmployees, {
        position: this.properties.position,
        items: this.properties.items || [],
        displayMode: this.displayMode,
        onConfigurePropPane: this._onConfigure,
      });

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
          header: {
            description: "Incoming Employees Web Part Settings",
          },
          groups: [
            //Incoming employees
            {
              groupName: "Manage Incoming employees",
              groupFields: [
                PropertyFieldCollectionData("items", {
                  key: "items",
                  label: "",
                  panelHeader: "Manage items",
                  manageBtnLabel: "Manage items",
                  value: this.properties.items,
                  fields: [
                    {
                      id: "user",
                      title: "User",
                      type: CustomCollectionFieldType.custom,
                      required: true,
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
                            onUpdate(field.id, items[0]);
                          },
                          showHiddenInUI: false,
                          principalTypes: [PrincipalType.User],
                        });
                      },
                    },
                    {
                      id: "jobTitle",
                      title: "Job",
                      type: CustomCollectionFieldType.string,
                      required: true,
                    },
                    {
                      id: "description",
                      title: "Description",
                      type: CustomCollectionFieldType.string,
                      required: true,
                    },
                    {
                      id: "arrivalDate",
                      title: "Arrival Date",
                      type: CustomCollectionFieldType.custom,
                      required: true,
                      onCustomRender: (
                        field,
                        value,
                        onUpdate,
                        item,
                        itemId
                      ) => {
                        return React.createElement(DateTimePicker, {
                          key: itemId,
                          showLabels: false,
                          dateConvention: DateConvention.Date,
                          showGoToToday: true,
                          value: value ? new Date(value) : undefined,
                          onChange: (date: Date) => {
                            onUpdate(field.id, date);
                          },
                        });
                      },
                    },
                    {
                      id: "hobbies",
                      title: "Hobbies",
                      type: CustomCollectionFieldType.string,
                      required: true,
                    },
                  ],
                  disabled: false,
                }),
              ],
            },
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
