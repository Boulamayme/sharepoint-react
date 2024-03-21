import { Log } from "@microsoft/sp-core-library";
import { BaseApplicationCustomizer } from "@microsoft/sp-application-base";

import Footer from "./components/footer";

import * as strings from "CustomizeApplicationCustomizerStrings";
import * as ReactDOM from "react-dom";
import { createElement } from "react";

const LOG_SOURCE: string = "CustomizeApplicationCustomizer";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICustomizeApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CustomizeApplicationCustomizer extends BaseApplicationCustomizer<ICustomizeApplicationCustomizerProperties> {
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Add custom CSS and JS
    this.inJectCssFile();

    setTimeout(() => {
      const sectionTitle = document.querySelector(
        "[data-automation-id='titleRegionBackgroundImage']"
      );
      if (sectionTitle && sectionTitle.parentElement) {
        sectionTitle.parentElement.parentElement.classList.add("dx-section-bg");
      } else {
        const _sectionTitle = document.querySelector(
          "[data-automation-id='TitleTextId']"
        );
        if (_sectionTitle) {
          const webPartContainer = _sectionTitle.closest(".webPartContainer");
          if (webPartContainer) {
            webPartContainer.classList.add("dx-section-title");
          }
        }
      }
    }, 1000);

    this.context.application.navigatedEvent.add(this, () => {
      const sectionTitle = document.querySelector(
        "[data-automation-id='titleRegionBackgroundImage']"
      );
      if (sectionTitle && sectionTitle.parentElement) {
        sectionTitle.parentElement.parentElement.classList.add("dx-section-bg");
      } else {
        const _sectionTitle = document.querySelector(
          "[data-automation-id='TitleTextId']"
        );
        if (_sectionTitle) {
          const webPartContainer = _sectionTitle.closest(".webPartContainer");
          if (webPartContainer) {
            webPartContainer.classList.add("dx-section-title");
          }
        }
      }
      const element: React.ReactElement = createElement(Footer);
      let footer = document.getElementById("footer");
      if (!footer) {
        footer = document.createElement("div");
        footer.id = "footer";
        //Append the footer in spPageCanvasContent
        const spPageCanvasContent = document.getElementById(
          "spPageCanvasContent"
        );
        if (spPageCanvasContent) {
          spPageCanvasContent.appendChild(footer);
        }
        const container = document.getElementById(footer.id);
        ReactDOM.render(element, container);
      }
    });

    return Promise.resolve();
  }

  public inJectCssFile(): void {
    const head: any =
      document.getElementsByTagName("head")[0] || document.documentElement;

    let cssUrl = `${this.context.pageContext.web.absoluteUrl}/SiteAssets/assets/global.css`;

    //Check if style is already loaded
    let style = document.querySelector(`link[href="${cssUrl}"]`);
    if (!style) {
      let customStyle: HTMLLinkElement = document.createElement("link");
      customStyle.href = cssUrl;
      customStyle.rel = "stylesheet";
      customStyle.type = "text/css";
      head.insertAdjacentElement("beforeEnd", customStyle);
    }
  }
}
