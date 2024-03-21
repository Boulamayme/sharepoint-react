import * as React from "react";
import type { IFaqProps } from "./IFaqProps";
import { DisplayMode } from "@microsoft/sp-core-library";
import { Placeholder } from "@pnp/spfx-controls-react";
import CollapseList from "../../components/CollapseList";


export default class Faq extends React.Component<IFaqProps, {}> {
  public render(): React.ReactElement<IFaqProps> {
    const { items } = this.props;

    return (
      <>
        {items.length > 0 && <CollapseList items={items} />}
        {items.length === 0 && (
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
