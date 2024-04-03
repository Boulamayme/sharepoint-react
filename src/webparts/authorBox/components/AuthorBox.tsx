import * as React from "react";
import type { IAuthorBoxProps } from "./IAuthorBoxProps";
import { Placeholder } from "@pnp/spfx-controls-react";

export default class AuthorBox extends React.Component<IAuthorBoxProps, {}> {
  public render(): React.ReactElement<IAuthorBoxProps> {
    const { avatar, name, description, position } = this.props;

    return (
      <>
        {avatar && name && description && position && (
          <div className="dx-author row">
            <div className="dx-author--image col-lg-auto">
              <img src={avatar.fileAbsoluteUrl} alt="" />
            </div>
            <div className="dx-author-content col-lg">
              <p className="dx-author-content--desc">“{description}”</p>
              <div>
                <span className="dx-author-content--name">{name}</span>
                <span className="dx-author-content--job">,{position}</span>
              </div>
            </div>
          </div>
        )}

        {(!avatar || !name || !description || !position) && (
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
