import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import LatestArticles from "./components/LatestArticles";
import { ILatestArticlesProps } from "./components/ILatestArticlesProps";
import { getSP } from "../components/pnpjsConfig";
import { PropertyFieldMultiSelect } from "@pnp/spfx-property-controls";
import { LIST_SITE_PAGE_ID } from "../data/constants";
import { SPFI } from "@pnp/sp";

export interface ILatestArticlesWebPartProps {
  title: string;
  categories: any[];
  selectedCategories: string[];
}

export default class LatestArticlesWebPart extends BaseClientSideWebPart<ILatestArticlesWebPartProps> {
  _sp: SPFI;
  public render(): void {
    console.log("Categories", this.properties.selectedCategories);
    const element: React.ReactElement<ILatestArticlesProps> =
      React.createElement(LatestArticles, {
        title: this.properties.title,
        categories: this.properties.selectedCategories,
      });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    // this._environmentMessage = this._getEnvironmentMessage();

    await super.onInit();

    this._sp = getSP(this.context);
    await this.loadCategories();
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
            description: "Latest Articles Web Part Configuration",
          },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Title",
                }),
                PropertyFieldMultiSelect("selectedCategories", {
                  key: "multiSelecCategorytField",
                  label: "Select Categories",
                  options: this.properties.categories,
                  selectedKeys: this.properties.selectedCategories,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
