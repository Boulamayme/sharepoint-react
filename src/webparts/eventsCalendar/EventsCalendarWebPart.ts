import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { type IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import EventsCalendar from "./components/EventsCalendar";
import { IEventsCalendarProps } from "./components/IEventsCalendarProps";
import { getSP } from "../components/pnpjsConfig";

export interface IEventsCalendarWebPartProps {
  events: any[];
}

export default class EventsCalendarWebPart extends BaseClientSideWebPart<IEventsCalendarWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IEventsCalendarProps> =
      React.createElement(EventsCalendar, {
        events: this.properties.events || [],
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
            description: "Events Calendar Web Part Settings",
          },
          groups: [],
        },
      ],
    };
  }
}
