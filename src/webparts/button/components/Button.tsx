import * as React from "react";
import type { IButtonProps } from "./IButtonProps";
import { Placeholder } from "@pnp/spfx-controls-react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconDirectory = require("../../components/assets/images/directory.png");

export default class Button extends React.Component<IButtonProps, {}> {
  public render(): React.ReactElement<IButtonProps> {
    const { link, label, theme } = this.props;

    return (
      <>
        {link && label && (
          <div className="d-flex justify-content-center mt-3">
            <button
              className={`dx-btn ${theme}`}
              type="button"
              onClick={() => {
                window.open(link, "_blank");
              }}
            >
              {theme === "dx-btn__directory" && <img src={iconDirectory} alt="" />}
              {label}
            </button>
          </div>
        )}

        {(!link || !label) && (
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
