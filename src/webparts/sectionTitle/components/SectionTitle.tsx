import * as React from "react";
import type { ISectionTitleProps } from "./ISectionTitleProps";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";

//Components
import Title from "../../components/Title";

export default class SectionTitle extends React.Component<
  ISectionTitleProps,
  {}
> {
  public render(): React.ReactElement<ISectionTitleProps> {
    const { title } = this.props;

    return (
      <>
        {title && <Title title={title} />}
        {!title && (
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
