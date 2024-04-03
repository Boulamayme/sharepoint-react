import * as React from "react";
import type { IToolsProps } from "./IToolsProps";
import { Placeholder } from "@pnp/spfx-controls-react";
import Title from "../../components/Title";
import * as strings from "ToolsWebPartStrings";

//Components
import Member from "../../components/member";

export default class Tools extends React.Component<IToolsProps, {}> {
  componentDidMount(): void {}

  public render(): React.ReactElement<IToolsProps> {
    const { tools } = this.props;

    return (
      <>
        {tools && (
          <>
            <div className="dx-tools">
              {/* Banner */}
              <div
                className="dx-tools-banner"
                style={{
                  backgroundColor: tools.BackgroundColor,
                }}
              >
                <img src={tools.Logo.serverRelativeUrl} alt={tools.Title} />
              </div>
              <div>
                <div className="row">
                  <div className="col-lg-9">
                    <Title title={strings.LastUpdated} />
                    <div className="dx-tools-description">
                      <div
                        className="dx-tools-description--content"
                        dangerouslySetInnerHTML={{
                          __html: tools.LastUpdate,
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <Title title={strings.ReferentSoftware} />
                    <Member {...tools.Referent} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {!tools && (
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
