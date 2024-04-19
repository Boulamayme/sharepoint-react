import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneTextField,
  type IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

/**************************************************
 *TO DO: Must be deleted and add it in extension
 *************************************************/
import "../components/assets/global.scss";

import LatestNews from "./components/LatestNews";
import { ILatestNewsProps } from "./components/ILatestNewsProps";

import { getSP } from "../components/pnpjsConfig";
import { SPFI } from "@pnp/sp";
import { LIST_SITE_PAGE_ID } from "../data/constants";
import { PropertyFieldMultiSelect } from "@pnp/spfx-property-controls";

export interface ILatestNewsWebPartProps {
  latestNews: any[];
  title: string;
  link: string;
  categories: any[];
  selectedCategories: string[];
}

export default class LatestNewsWebPart extends BaseClientSideWebPart<ILatestNewsWebPartProps> {
  _sp: SPFI;

  public render(): void {
    const element: React.ReactElement<ILatestNewsProps> = React.createElement(
      LatestNews,
      {
        latestNews: this.properties.latestNews || [],
        title: this.properties.title,
        link: this.properties.link,
        displayMode: this.displayMode,
        onConfigurePropPane: this._onConfigure,
        categories: this.properties.selectedCategories,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  public _onConfigure = () => {
    this.context.propertyPane.open();
  };

  protected async onInit(): Promise<void> {
    // this._environmentMessage = this._getEnvironmentMessage();

    await super.onInit();

    this._sp = getSP(this.context);
    await this.loadCategories();
  }

  private async loadCategories(): Promise<void> {
    let items = await this._sp.web.lists
      .getById(LIST_SITE_PAGE_ID)
      .fields.getByInternalNameOrTitle("D_x00e9_partement")
      .select("Choices")();

    this.properties.categories = items.Choices.map((choice: any) => {
      return {
        key: choice,
        text: choice,
      };
    });
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
              groupName: "Manage Latest News",
              groupFields: [
                PropertyFieldMultiSelect("selectedCategories", {
                  key: "multiSelecCategorytField",
                  label: "Select Categories",
                  options: this.properties.categories,
                  selectedKeys: this.properties.selectedCategories,
                }),
                PropertyPaneTextField("title", {
                  label: "Title",
                }),
                PropertyPaneTextField("link", {
                  label: "Link",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
