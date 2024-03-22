import * as React from "react";
import type { IFaqLearnProps } from "./IFaqLearnProps";
import CollapseList from "../../components/CollapseList";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";

export default class FaqLearn extends React.Component<IFaqLearnProps, {}> {
  public render(): React.ReactElement<IFaqLearnProps> {
    const { items } = this.props;

    return (
      <>
        <div className="px-4">
          <div className="d-flex justify-content-start">
            <div className="dx-badge">Training</div>
          </div>
          <h3 className="dx-title-section">FAQ Learning</h3>
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
        </div>
      </>
    );
  }
}
