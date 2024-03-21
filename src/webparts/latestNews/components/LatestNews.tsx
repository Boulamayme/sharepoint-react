import * as React from "react";
import type { ILatestNewsProps } from "./ILatestNewsProps";
import LatestNewsFC from "../../components/LatestNews/LatestNews";

//Constant
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";

export default class LatestNews extends React.Component<ILatestNewsProps, {}> {
  public render(): React.ReactElement<ILatestNewsProps> {
    const { latestNews , title, link } = this.props;

    return (
      <>
        {latestNews.length > 0 && <LatestNewsFC latestNews={latestNews} title={title} link={link} />}
        {latestNews.length === 0 && (
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
