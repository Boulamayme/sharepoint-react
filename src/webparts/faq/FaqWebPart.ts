import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneLabel,
  type IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

//PrimeReact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

//Style
import "../components/assets/global.scss";

import * as strings from "FaqWebPartStrings";
import Faq from "./components/Faq";
import { IFaqProps } from "./components/IFaqProps";
import {
  CustomCollectionFieldType,
  PropertyFieldCollectionData,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";

export interface IFaqWebPartProps {
  items: any[];
  categories: any[];
}

export default class FaqWebPart extends BaseClientSideWebPart<IFaqWebPartProps> {
  public render(): void {
    console.log(this.properties.items);
    const element: React.ReactElement<IFaqProps> = React.createElement(Faq, {
      items: this.properties.items || [],
      onConfigurePropPane: this.configurePropPane,
      categories: this.properties.categories || [],
      displayMode: this.displayMode,
    });

    ReactDom.render(element, this.domElement);
  }

  public configurePropPane = (): void => {
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
            description: "FAQ Web Part Settings",
          },
          groups: [
            {
              groupFields: [
                PropertyFieldCollectionData("categories", {
                  key: "categories",
                  label: "",
                  panelHeader: "Manage categories FAQ",
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
                  text: "Manage list of items to display in the FAQ section",
                }),
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
                      id: "content",
                      title: "content",
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (
                        field,
                        value,
                        onUpdate,
                        item,
                        itemId
                      ) => {
                        return React.createElement(RichText, {
                          key: itemId,
                          value: value,
                          onChange: (text: string) => {
                            onUpdate(field.id, text);
                            return text;
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
