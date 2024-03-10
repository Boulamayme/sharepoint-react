import * as React from "react";
import type { IInfoBoxProps } from "./IInfoBoxProps";

import { Placeholder } from "@pnp/spfx-controls-react";

export default class InfoBox extends React.Component<IInfoBoxProps, {}> {
  public render(): React.ReactElement<IInfoBoxProps> {
    const { items } = this.props;

    return (
      <>
        {items.length > 0 && (
          <div className="dx-infobox">
            <div className="row">
              {items.map((item, index) => (
                <div key={index} className="col-4">
                  <div className="dx-infobox--item">
                    <span className="dx-infobox--title">{item.title}</span>
                    <div className="dx-infobox--icon">
                      <img src={item.icon} alt={item.title} />
                    </div>
                    <p className="dx-infobox--desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
