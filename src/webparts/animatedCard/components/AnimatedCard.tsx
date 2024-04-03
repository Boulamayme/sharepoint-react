import * as React from "react";
import type { IAnimatedCardProps } from "./IAnimatedCardProps";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";

export default class AnimatedCard extends React.Component<
  IAnimatedCardProps,
  {}
> {
  public render(): React.ReactElement<IAnimatedCardProps> {
    const { items } = this.props;

    return (
      <>
        {items.length > 0 && (
          <div className="row">
            {items.map((item, index) => (
              <div key={index} className="col-lg-4 mb-4">
                <div className="dx-card-animated">
                  <div className="dx-card-animated--body">
                    <div className="dx-card-animated--image-container">
                      <img src={item.imageUrl} />
                    </div>
                    <div className="dx-card-animated--content">
                      <div
                        className="dx-card-animated--text"
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      />
                    </div>
                  </div>
                </div>
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
            hideButton={this.props.displayMode === DisplayMode.Read}
            onConfigure={this.props.onConfigurePropPane}
          />
        )}
      </>
    );
  }
}
