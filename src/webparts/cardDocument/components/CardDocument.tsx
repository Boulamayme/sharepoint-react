/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { ICardDocumentProps } from "./ICardDocumentProps";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";
import * as strings from "CardDocumentWebPartStrings";

export default class CardDocument extends React.Component<
  ICardDocumentProps,
  {}
> {
  public render(): React.ReactElement<ICardDocumentProps> {
    const { items , columns } = this.props;

    return (
      <>
        <div className="row">
          {items.map((item, index) => (
            <div key={index} className={columns}>
              <div className="dx-document px-4 pb-3">
                <div className="dx-document--item">
                  <div className="dx-document--cover">
                    <img src={item.imageUrl} alt="" />
                  </div>
                  <div className="d-flex align-items-center flex-column pt-5">
                    <h3 className="dx-document--title mb-5">{item.title}</h3>
                    <a href={item.url} className="dx-document--link">
                      {strings.SeeDocument}
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
