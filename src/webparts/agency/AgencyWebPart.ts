import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { type IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import * as strings from "AgencyWebPartStrings";

//Style
import "../components/assets/global.scss";

//Models
import { IAgencyProps } from "./components/IAgencyProps";
import { IAgency } from "../components/models/agency.model";

//Components
import Agency from "./components/Agency";

//Pnp Controls React
import {
  CustomCollectionFieldType,
  PropertyFieldCollectionData,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import { FilePicker, IFilePickerResult } from "@pnp/spfx-controls-react";

export interface IAgencyWebPartProps {
  description: string;
  items: IAgency[];
}

export default class AgencyWebPart extends BaseClientSideWebPart<IAgencyWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IAgencyProps> = React.createElement(
      Agency,
      {
        items: this.properties.items || [],
        displayMode: this.displayMode,
        onConfigurePropPane: this._onConfigure,
      }
    );

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
          groups: [
            {
              groupName: "Agency Webpart Settings",
              groupFields: [
                PropertyFieldCollectionData("items", {
                  key: "items",
                  label: "",
                  panelHeader: "Manage agencies",
                  manageBtnLabel: "Manage agencies",
                  value: this.properties.items,
                  fields: [
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
                      id: "city",
                      title: "City",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "address",
                      title: "Address",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "url",
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
