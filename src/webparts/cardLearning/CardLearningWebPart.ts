import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneDropdown,
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import * as strings from "CardLearningWebPartStrings";
import { ICardLearningProps } from "./components/ICardLearningProps";

import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

//Style
import "../components/assets/global.scss";

//Components
import CardLearning from "./components/CardLearning";
import {
  CustomCollectionFieldType,
  PropertyFieldCollectionData,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import { FilePicker, IFilePickerResult } from "@pnp/spfx-controls-react";

export interface ICardLearningWebPartProps {
  items: any[];
  layout: string;
  btnLabel: string;
  columns: string;
}

export default class CardLearningWebPart extends BaseClientSideWebPart<ICardLearningWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ICardLearningProps> = React.createElement(
      CardLearning,
      {
        items: this.properties.items || [],
        btnLabel: this.properties.btnLabel,
        onConfigurePropPane: this.configurePropPane,
        displayMode: this.displayMode,
        layout: this.properties.layout,
        columns: this.properties.columns,
      }
    );

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
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupFields: [
                PropertyFieldCollectionData("items", {
                  key: "items",
                  label: "Manage items",
                  panelHeader: "Manage items",
                  manageBtnLabel: "Manage items",
                  value: this.properties.items,
                  fields: [
                    {
                      id: "title",
                      title: "Title",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "category",
                      title: "Category",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "description",
                      title: "Description",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "duration",
                      title: "Duration",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "rating",
                      title: "Rating",
                      type: CustomCollectionFieldType.number,
                    },
                    {
                      id: "courses",
                      title: "Courses",
                      type: CustomCollectionFieldType.number,
                    },
                    {
                      id: "cover",
                      title: "Cover URL",
                      type: CustomCollectionFieldType.custom,
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
                    {
                      id: "link",
                      title: "URL",
                      type: CustomCollectionFieldType.url,
                    },
                  ],
                  disabled: false,
                }),
                //Configuration Layout
              ],
            },
            {
              groupName: "Configuration layout",
              groupFields: [
                PropertyPaneTextField("btnLabel", {
                  label: "Call to action button label",
                }),
                PropertyPaneDropdown("layout", {
                  label: "Layout",
                  options: [
                    { key: "justify-content-start", text: "Start" },
                    { key: "justify-content-end", text: "End" },
                    {
                      key: "justify-content-center",
                      text: "Center",
                    },
                  ],
                }),
                PropertyPaneDropdown("columns", {
                  label: "Columns per row",
                  options: [
                    { key: "col-lg-6", text: "2" },
                    { key: "col-lg-4", text: "3" },
                    { key: "col-lg-3", text: "4" },
                    {
                      key: "col-lg-2",
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
