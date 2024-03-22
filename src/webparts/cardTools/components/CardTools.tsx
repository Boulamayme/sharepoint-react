import * as React from "react";
import type { ICardToolsProps } from "./ICardToolsProps";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";
import * as strings from "CardToolsWebPartStrings";

export default class CardTools extends React.Component<ICardToolsProps, {}> {
  public navigateTo = (url: string): void => {
    window.open(url, "_blank");
  };
  public render(): React.ReactElement<ICardToolsProps> {
    const { items, columns } = this.props;

    return (
      <>
        {items.length > 0 &&
          items.map((item, index) => (
            <div key={index} className={`${columns}`}>
              <div className="dx-card-tools">
                <div className="dx-card-tools--header">
                  <img src={item.imageUrl} alt="" />
                </div>
                <div className="dx-card-tools--content">
                  <div>
                    <h3 className="dx-card-tools--title mb-4">{item.title}</h3>
                    <p className="dx-card-tools--desc mb-5">
                      {item.description}
                    </p>
                  </div>
                  <a href={item.url}>{strings.SeeMore}</a>
                </div>
              </div>
            </div>
          ))}
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
