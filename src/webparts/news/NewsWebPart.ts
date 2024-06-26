import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { type IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "NewsWebPartStrings";
import News from "./components/News";
import { INewsProps } from "./components/INewsProps";
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
import { IArticle } from "../card/components/ICardProps";
import { getSP } from "../components/pnpjsConfig";

export interface INewsWebPartProps {
  articles: IArticle[];
}

export default class NewsWebPart extends BaseClientSideWebPart<INewsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<INewsProps> = React.createElement(News, {
      articles: this.properties.articles || [],
      onConfigurePropPane: this.configurePropPane,
      displayMode: this.displayMode,
    });

    ReactDom.render(element, this.domElement);
  }

  public configurePropPane = (): void => {
    this.context.propertyPane.open();
  };

  protected async onInit(): Promise<void> {
    // this._environmentMessage = this._getEnvironmentMessage();

    await super.onInit();

    getSP(this.context);
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
                //Data collection
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
                      required: true,
                    },
                    {
                      id: "author",
                      title: "Author",
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
          ],
        },
      ],
    };
  }
}
