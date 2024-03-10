import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneLabel,
  type IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

/**************************************************
 *TO DO: Must be deleted and add it in extension
 *************************************************/
import "../components/assets/global.scss";

import * as strings from "CareersWebPartStrings";
import Careers from "./components/Careers";
import { ICareersProps } from "./components/ICareersProps";
import {
  CustomCollectionFieldType,
  PropertyFieldCollectionData,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import { DateConvention, DateTimePicker } from "@pnp/spfx-controls-react";

export interface ICareersWebPartProps {
  careers: any[];
  categories: any[];
}

export default class CareersWebPart extends BaseClientSideWebPart<ICareersWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ICareersProps> = React.createElement(
      Careers,
      {
        categories: this.properties.categories || [],
        careers: this.properties.careers || [],
        displayMode: this.displayMode,
        onConfigurePropPane: this._onConfigure,
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
            description: "Careers Web Part Configuration",
          },
          groups: [
            {
              groupFields: [
                PropertyPaneLabel("labelCategory", {
                  text: "Manage categories to use in careers",
                }),
                PropertyFieldCollectionData("categories", {
                  key: "categories",
                  label: "",
                  panelHeader: "Manage categories careers",
                  manageBtnLabel: "Manage categories",
                  value: this.properties.categories,
                  fields: [
                    {
                      id: "title",
                      title: "Title",
                      type: CustomCollectionFieldType.string,
                    },
                  ],
                  disabled: false,
                }),
                PropertyPaneLabel("labelCategory", {
                  text: "Manage careers",
                }),
                PropertyFieldCollectionData("careers", {
                  key: "careers",
                  label: "",
                  panelHeader: "Manage items careers",
                  manageBtnLabel: "Manage careers",
                  value: this.properties.careers,
                  fields: [
                    {
                      id: "title",
                      title: "Title",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "category",
                      title: "Category",
                      type: CustomCollectionFieldType.dropdown,
                      options:
                        this.properties.categories &&
                        this.properties.categories.length > 0
                          ? this.properties.categories.map((category) => {
                              return {
                                key: category.title,
                                text: category.title,
                              };
                            })
                          : [],
                    },
                    {
                      id: "label",
                      title: "Label",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "Location",
                      title: "location",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "contract",
                      title: "Contract",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "url",
                      title: "URL",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "publishedDate",
                      title: "Published Date",
                      type: CustomCollectionFieldType.custom,
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
