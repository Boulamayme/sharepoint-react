import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { type IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import EventsCalendar from "./components/EventsCalendar";
import { IEventsCalendarProps } from "./components/IEventsCalendarProps";
import { getSP } from "../components/pnpjsConfig";
import { SPFI } from "@pnp/sp";
import { PropertyFieldMultiSelect } from "@pnp/spfx-property-controls";
import { LIST_EVENTS_ID } from "../data/constants";

export interface IEventsCalendarWebPartProps {
  events: any[];
  categories: any[];
  selectedCategories: any[];
}

export default class EventsCalendarWebPart extends BaseClientSideWebPart<IEventsCalendarWebPartProps> {
  private _sp: SPFI;
  public render(): void {
    const element: React.ReactElement<IEventsCalendarProps> =
      React.createElement(EventsCalendar, {
        events: this.properties.events || [],
        categories: this.properties.selectedCategories || [],
        displayMode: this.displayMode,
        onConfigurePropPane: this._onConfigure,
      });

    ReactDom.render(element, this.domElement);
  }

  _onConfigure = (): void => {
    this.context.propertyPane.open();
  };

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
      .getById(LIST_EVENTS_ID)
      .fields.getByInternalNameOrTitle("Category")
      .select("Choices")();

    this.properties.categories = items.Choices.map((choice) => {
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
            description: "Events Calendar Web Part Settings",
          },
          groups: [
            {
              groupName: "Configuration",
              groupFields: [
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
