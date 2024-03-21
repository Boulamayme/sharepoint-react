import * as React from "react";
import type { ICardLearningProps } from "./ICardLearningProps";
import CardLearningFC from "../../components/CardLearning";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";

export default class CardLearning extends React.Component<
  ICardLearningProps,
  {}
> {
  public render(): React.ReactElement<ICardLearningProps> {
    const { items, layout, btnLabel, columns } = this.props;

    return (
      <>
        {items.length > 0 && (
          <div className={`row ${layout}`}>
            {items.map((item, index) => {
              return (
                <div key={index} className={`${columns} mb-5`}>
                  <CardLearningFC btnLabel={btnLabel} {...item} />
                </div>
              );
            })}
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
