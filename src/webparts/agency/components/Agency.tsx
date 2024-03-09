import * as React from "react";
import type { IAgencyProps } from "./IAgencyProps";
import { Placeholder } from "@pnp/spfx-controls-react";

export default class Agency extends React.Component<IAgencyProps, {}> {
  public render(): React.ReactElement<IAgencyProps> {
    const { items } = this.props;

    return (
      <>
        {items.length > 0 && (
          <div className="dx-agency">
            {items.map((item, index) => (
              <div key={index} className="dx-agency--item">
                <img src={item.imageUrl} alt="" className="dx-agency--img" />
                <h3 className="dx-agency--city">{item.city}</h3>
                <span className="dx-agency--address">{item.address}</span>
              </div>
            ))}
          </div>
        )}
        {items.length === 0 && (
          <Placeholder
            iconName="Edit"
            iconText="Configure your web part"
            description="Please configure the web part."
            buttonLabel="Configure"
            onConfigure={this.props.onConfigurePropPane}
          />
        )}
      </>
    );
  }
}
