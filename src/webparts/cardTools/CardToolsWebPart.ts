import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import "../components/assets/global.scss";

import * as strings from "CardToolsWebPartStrings";
import CardTools from "./components/CardTools";
import { ICardToolsProps } from "./components/ICardToolsProps";
import {
  CustomCollectionFieldType,
  PropertyFieldCollectionData,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import { FilePicker, IFilePickerResult } from "@pnp/spfx-controls-react";

export interface ICardToolsWebPartProps {
  items: any[];
  columns: string;
}

export default class CardToolsWebPart extends BaseClientSideWebPart<ICardToolsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ICardToolsProps> = React.createElement(
      CardTools,
      {
        items: this.properties.items || [],
        columns: this.properties.columns,
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
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: "Manage Card Tools",
              groupFields: [
                PropertyFieldCollectionData("items", {
                  key: "items",
                  label: "",
                  panelHeader: "Manage items",
                  manageBtnLabel: "Manage items",
                  value: this.properties.items,
                  fields: [
                    {
                      id: "title",
                      title: "Title",
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
                      id: "url",
                      title: "URL",
                      type: CustomCollectionFieldType.string,
                      required: true,
                    },
                    {
                      id: "imageUrl",
                      title: "Image URL",
                      type: CustomCollectionFieldType.custom,
                      required: true,
                      onCustomRender: (
                        field,
                        value,
                        onUpdate,
                        item,
                        itemId
                      ) => {
                        return React.createElement(FilePicker, {
                          context: this.context as any,
                          key: itemId,
                          buttonLabel: "Select Image",
                          hideLocalUploadTab: true,
                          hideLocalMultipleUploadTab: true,
                          hideLinkUploadTab: true,
                          onSave: (filePickerResult: IFilePickerResult[]) => {
                            if (
                              filePickerResult &&
                              filePickerResult.length > 0
                            ) {
                              onUpdate(
                                field.id,
                                filePickerResult[0].fileAbsoluteUrl
                              );
                            }
                          },
                        });
                      },
                    },
                  ],
                  disabled: false,
                }),
              ],
            },
            {
              groupName: "Configuration layout",
              groupFields: [
                PropertyPaneDropdown("columns", {
                  label: "Columns per row",
                  options: [
                    { key: "col-6", text: "2" },
                    { key: "col-4", text: "3" },
                    { key: "col-3", text: "4" },
                    {
                      key: "col-2",
                      text: "6",
                    },
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
