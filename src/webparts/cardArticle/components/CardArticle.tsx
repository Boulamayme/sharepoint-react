/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { ICardArticleProps } from "./ICardArticleProps";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";

//Helpers
import { formatDate } from "../../components/helpers/helpers";

const icon = require("../../components/assets/images/icon_wrap.png");

export default class CardArticle extends React.Component<
  ICardArticleProps,
  {}
> {
  public navigateTo = (url: string): void => {
    window.open(url, "_blank");
  };

  public render(): React.ReactElement<ICardArticleProps> {
    const { news, columns } = this.props;

    return (
      <>
        <div className="row">
          {news.length > 0 &&
            news.map((item, index) => (
              <div
                key={index}
                className={`${columns} mb-4`}
                onClick={() => this.navigateTo(item.url)}
              >
                <div className="dx-card-article">
                  <div className="dx-card-article--cover">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                  <div className="dx-card-article--content">
                    <span className="dx-card-article--author">
                      {item.author && item.publishedDate ? (
                        `${item.author && item.author} • ${
                          item.publishedDate && formatDate(item.publishedDate)
                        }`
                      ) : (
                        <>
                          {item.author && item.author}
                          {item.publishedDate && formatDate(item.publishedDate)}
                        </>
                      )}
                    </span>
                    <h3 className="dx-card-article--title">
                      {item.title}
                      <img src={icon} alt="" />
                    </h3>
                    <p className="dx-card-article--desc">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          {news.length === 0 && (
            <Placeholder
              iconName="Edit"
              iconText="Configure your web part"
              description="Please configure the web part."
              buttonLabel="Configure"
              hideButton={this.props.displayMode === DisplayMode.Read}
              onConfigure={this.props.onConfigurePropPane}
            />
          )}
        </div>
      </>
    );
  }
}
