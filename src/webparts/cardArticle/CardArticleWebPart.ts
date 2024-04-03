import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneDropdown,
  type IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

/**************************************************
 *TO DO: Must be deleted and add it in extension
 *************************************************/
import "../components/assets/global.scss";

import * as strings from "CardArticleWebPartStrings";
import CardArticle from "./components/CardArticle";
import { ICardArticleProps } from "./components/ICardArticleProps";

import {
  CustomCollectionFieldType,
  PropertyFieldCollectionData,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import {
  DateConvention,
  DateTimePicker,
  FilePicker,
  IFilePickerResult,
} from "@pnp/spfx-controls-react";

import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";

export interface ICardArticleWebPartProps {
  news: any[];
  columns: string;
}

export default class CardArticleWebPart extends BaseClientSideWebPart<ICardArticleWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ICardArticleProps> = React.createElement(
      CardArticle,
      {
        news: this.properties.news || [],
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
              groupName: "Manage News",
              groupFields: [
                PropertyFieldCollectionData("news", {
                  key: "news",
                  label: "",
                  panelHeader: "Manage items news",
                  manageBtnLabel: "Manage news",
                  value: this.properties.news,
                  fields: [
                    {
                      id: "title",
                      title: "Title",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "description",
                      title: "Description",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "url",
                      title: "URL",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "imageUrl",
                      title: "Image URL",
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
                    {
                      id: "author",
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
                          defaultSelectedUsers: [item.customFieldId],
                          onChange: (items: any[]) => {
                            onUpdate(field.id, items[0].text);
                          },
                          showHiddenInUI: false,
                          principalTypes: [PrincipalType.User],
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
