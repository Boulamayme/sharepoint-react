import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "HomeWebPartStrings";
import Home from "./components/Home";
import { IHomeProps } from "./components/IHomeProps";
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

export interface IHomeWebPartProps {
  quickLinks: any[];
  titleNews: string;
  articles: any[];
  titleUsefulLink: string;
  usefulLinks: any[];
}

export default class HomeWebPart extends BaseClientSideWebPart<IHomeWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IHomeProps> = React.createElement(Home, {
      quickLinks: this.properties.quickLinks || [],
      titleNews: this.properties.titleNews || "",
      articles: this.properties.articles || [],
      usefulLinks: this.properties.usefulLinks || [],
      titleUsefulLink: this.properties.titleUsefulLink || "",
    });

    ReactDom.render(element, this.domElement);
  }

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
              groupName: "Departments Links Settings",
              groupFields: [
                PropertyFieldCollectionData("quickLinks", {
                  key: "quickLinks",
                  label: "Manage Quick Links",
                  panelHeader: "Manage items",
                  manageBtnLabel: "Manage items",
                  value: this.properties.quickLinks,
                  fields: [
                    {
                      id: "icon",
                      title: "Icon URL",
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
                      id: "title",
                      title: "Title",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "link",
                      title: "Url",
                      type: CustomCollectionFieldType.string,
                    },
                  ],
                  disabled: false,
                }),
              ],
            },
            {
              groupName: "News Settings",
              groupFields: [
                //Title
                PropertyPaneTextField("titleNews", {
                  label: "Title",
                }),
                PropertyFieldCollectionData("articles", {
                  key: "articles",
                  label: "Articles",
                  panelHeader: "Articles",
                  manageBtnLabel: "Manage articles",
                  value: this.properties.articles,
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
                            console.log("Author", items[0]);
                            onUpdate(field.id, items[0]);
                          },
                          showHiddenInUI: false,
                          principalTypes: [PrincipalType.User],
                        });
                      },
                    },
                  ],
                }),
              ],
            },
            {
              groupName: "Useful Links Settings",
              groupFields: [
                //Title
                PropertyPaneTextField("titleUsefulLink", {
                  label: "Title",
                }),
                PropertyFieldCollectionData("usefulLinks", {
                  key: "usefulLinks",
                  label: "Manage Useful Links",
                  panelHeader: "Manage items",
                  manageBtnLabel: "Manage items",
                  value: this.properties.usefulLinks,
                  fields: [
                    {
                      id: "icon",
                      title: "Icon URL",
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
                      id: "title",
                      title: "Title",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "link",
                      title: "Url",
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
