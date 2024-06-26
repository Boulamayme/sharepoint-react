import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

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
import { getSP } from "../components/pnpjsConfig";

export interface IHomeWebPartProps {
  quickLinks: any[];
  titleNews: string;
  articles: any[];
  titleUsefulLink: string;
  usefulLinks: any[];
  events: any[];
  carouselItems: any[];
  incomingEmployees: any[];
  incomingBirthday: any[];
}

export default class HomeWebPart extends BaseClientSideWebPart<IHomeWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IHomeProps> = React.createElement(Home, {
      quickLinks: this.properties.quickLinks || [],
      titleNews: this.properties.titleNews || "",
      articles: this.properties.articles || [],
      usefulLinks: this.properties.usefulLinks || [],
      titleUsefulLink: this.properties.titleUsefulLink || "",
      events: this.properties.events || [],
      carouselItems: this.properties.carouselItems || [],
      incomingBirthday: this.properties.incomingBirthday || [],
      incomingEmployees: this.properties.incomingEmployees || [],
      context: this.context,
    });

    ReactDom.render(element, this.domElement);
  }

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
          groups: [
            //Carousel
            {
              groupName: "Carousel Settings",
              groupFields: [
                PropertyFieldCollectionData("carouselItems", {
                  key: "carouselItems",
                  label: "Manage Carousel",
                  panelHeader: "Manage items",
                  manageBtnLabel: "Manage items",
                  value: this.properties.carouselItems,
                  fields: [
                    {
                      id: "imageUrl",
                      title: "Image",
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
                      id: "description",
                      title: "Description",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "linkUrl",
                      title: "Url",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "btnLabel",
                      title: "Button Label",
                      type: CustomCollectionFieldType.string,
                    },
                  ],
                  disabled: false,
                }),
              ],
            },
            //Departments Links
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
            //Happy Birthday
            {
              groupName: "Manage Incoming birthday",
              groupFields: [
                PropertyFieldCollectionData("incomingBirthday", {
                  key: "incomingBirthday",
                  label: "",
                  panelHeader: "Manage items",
                  manageBtnLabel: "Manage items",
                  value: this.properties.incomingBirthday,
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
                          defaultSelectedUsers: [item.customFieldId],
                          onChange: (items: any[]) => {
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
                      id: "birthday",
                      title: "Birthday",
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
                  ],
                  disabled: false,
                }),
              ],
            },
            //Incoming employees
            {
              groupName: "Manage Incoming employees",
              groupFields: [
                PropertyFieldCollectionData("incomingEmployees", {
                  key: "incomingEmployees",
                  label: "",
                  panelHeader: "Manage items",
                  manageBtnLabel: "Manage items",
                  value: this.properties.incomingEmployees,
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
            //News
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
                    {
                      id: "view",
                      title: "View",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "comments",
                      title: "Comments",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "likes",
                      title: "likes",
                      type: CustomCollectionFieldType.string,
                    },
                  ],
                }),
              ],
            },
            //Useful Links
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
            //Events
            {
              groupName: "Manage events",
              groupFields: [
                PropertyFieldCollectionData("events", {
                  key: "events",
                  label: "",
                  panelHeader: "Manage items events",
                  manageBtnLabel: "Manage events",
                  value: this.properties.events,
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
