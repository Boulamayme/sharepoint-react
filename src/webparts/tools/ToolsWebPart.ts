/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneDropdown,
  type IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import "../components/assets/global.scss";

import Tools from "./components/Tools";
import { IToolsProps } from "./components/IToolsProps";

import { getSP } from "../components/pnpjsConfig";
import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls";
import { SPFI } from "@pnp/sp";

export interface IToolsWebPartProps {
  list: any;
  items: any[];
  selectedItem: any;
}

export default class ToolsWebPart extends BaseClientSideWebPart<IToolsWebPartProps> {
  private _sp: SPFI;
  // private _isDarkTheme: boolean = false;
  // private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<IToolsProps> = React.createElement(
      Tools,
      {
        tools:
          this.properties.items && this.properties.items.length > 0
            ? this.properties.items.find(
                (a) => a.GUID === this.properties.selectedItem
              )
            : null,
        displayMode: this.displayMode,
        onConfigurePropPane: this._onConfigure,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  _onConfigure = () => {
    this.context.propertyPane.open();
  };

  protected async onInit(): Promise<void> {
    // this._environmentMessage = this._getEnvironmentMessage();

    await super.onInit();

    getSP(this.context);
    this._sp = getSP();
  }

  // private _getEnvironmentMessage(): Promise<string> {
  //   if (!!this.context.sdks.microsoftTeams) {
  //     // running in Teams, office.com or Outlook
  //     return this.context.sdks.microsoftTeams.teamsJs.app
  //       .getContext()
  //       .then((context) => {
  //         let environmentMessage: string = "";
  //         switch (context.app.host.name) {
  //           case "Office": // running in Office
  //             environmentMessage = this.context.isServedFromLocalhost
  //               ? strings.AppLocalEnvironmentOffice
  //               : strings.AppOfficeEnvironment;
  //             break;
  //           case "Outlook": // running in Outlook
  //             environmentMessage = this.context.isServedFromLocalhost
  //               ? strings.AppLocalEnvironmentOutlook
  //               : strings.AppOutlookEnvironment;
  //             break;
  //           case "Teams": // running in Teams
  //           case "TeamsModern":
  //             environmentMessage = this.context.isServedFromLocalhost
  //               ? strings.AppLocalEnvironmentTeams
  //               : strings.AppTeamsTabEnvironment;
  //             break;
  //           default:
  //             environmentMessage = strings.UnknownEnvironment;
  //         }

  //         return environmentMessage;
  //       });
  //   }

  //   return Promise.resolve(
  //     this.context.isServedFromLocalhost
  //       ? strings.AppLocalEnvironmentSharePoint
  //       : strings.AppSharePointEnvironment
  //   );
  // }

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

  onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    if (propertyPath === "list") {
      this.properties.list = newValue;
      this.fetchListItems(newValue.id).then((items) => {
        this.properties.items = items;
        this.context.propertyPane.refresh();
      });
    }
  }

  async fetchListItems(listId: string): Promise<Array<any>> {
    debugger;
    let items = await this._sp.web.lists
      .getById(listId)
      .items.select(
        "*",
        "Referent/Title",
        "Referent/EMail",
        "Referent/Department",
        "Referent/Title",
        "Referent/JobTitle",
        "Logo"
      )
      .expand("Referent")();
    console.log("Items", items);
    items.forEach((item) => {
      item.Logo = JSON.parse(item.Logo);
    });

    return items;
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: "Tool webpart settings",
              groupFields: [
                PropertyFieldListPicker("list", {
                  label: "Select a list",
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  includeListTitleAndUrl: true,
                  key: "listPickerFieldId",
                  baseTemplate: 100,
                }),
                PropertyPaneDropdown("selectedItem", {
                  label: "Site lists",
                  options:
                    this.properties.items &&
                    Array.isArray(this.properties.items)
                      ? this.properties.items.map((list: any) => {
                          return {
                            key: list.GUID,
                            text: list.Title,
                          } as IPropertyPaneDropdownOption;
                        })
                      : [],
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
