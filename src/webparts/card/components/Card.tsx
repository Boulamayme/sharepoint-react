/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { ICardProps } from "./ICardProps";


/**************************************************
 *TO DO: Must be deleted and add it in extension
 *************************************************/
import "../../components/assets/global.scss";
import { DisplayMode } from "@microsoft/sp-core-library";
import { Placeholder } from "@pnp/spfx-controls-react";
import CardNews from "../../components/CardNews";

export default class Card extends React.Component<ICardProps, {}> {
  public render(): React.ReactElement<ICardProps> {
    const { articles } = this.props;

    return (
      <div className="row">
        {articles.length > 0 &&
          articles.map((article, index) => (
            <CardNews key={index} article={article} column="col-3" />
          ))}
        {articles.length === 0 && (
          <div className="col-12">
            <Placeholder
              iconName="Edit"
              iconText="Configure your web part"
              description="Please configure the web part."
              buttonLabel="Configure"
              hideButton={this.props.displayMode === DisplayMode.Read}
              onConfigure={this.props.onConfigurePropPane}
            />
          </div>
        )}
      </div>
    );
  }
}
