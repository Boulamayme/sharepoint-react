import * as React from "react";
import type { IQuickLinksProps } from "./IQuickLinksProps";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";

//Component
import QuickLinkFC from "../../components/quickLink";

export default class QuickLinks extends React.Component<IQuickLinksProps, {}> {
  public render(): React.ReactElement<IQuickLinksProps> {
    const { quickLinks , position} = this.props;

    return (
      <>
        {quickLinks.length > 0 && (
          <QuickLinkFC items={quickLinks} direction={position} />
        )}
        {quickLinks.length === 0 && (
          <Placeholder
            iconName="Edit"
            iconText="Configure your web part"
            description="Please configure the web part."
            buttonLabel="Configure"
            hideButton={this.props.displayMode === DisplayMode.Read}
            onConfigure={this.props.onConfigurePropPane}
          />
        )}
      </>
    );
  }
}
