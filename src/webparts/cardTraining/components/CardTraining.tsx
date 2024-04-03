import * as React from "react";
import type { ICardTrainingProps } from "./ICardTrainingProps";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";

export default class CardTraining extends React.Component<
  ICardTrainingProps,
  {}
> {
  public render(): React.ReactElement<ICardTrainingProps> {
    const { items, columns } = this.props;

    return (
      <>
        <div className="row">
          {items.map((item, index) => (
            <div key={index} className={`${columns} mb-4`}>
              <div className="dx-card-training px-4 pb-3">
                <div className="dx-card-training--item">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="dx-card-training--cover">
                      <img src={item.imageUrl} alt="" />
                    </div>
                    <div className="d-flex align-items-center flex-column">
                      <h3 className="dx-card-training--title mb-4 mt-2">
                        {item.title}
                      </h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <a href={item.url} className="dx-card-training--link">
                      {item.btnLabel}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
