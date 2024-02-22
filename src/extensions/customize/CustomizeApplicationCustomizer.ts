import { Log } from "@microsoft/sp-core-library";
import { BaseApplicationCustomizer } from "@microsoft/sp-application-base";

import * as strings from "CustomizeApplicationCustomizerStrings";

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
        sectionTitle.parentElement.classList.add("dx-section-title");
      }
    }, 1000);

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
