/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { ICardProps } from "./ICardProps";

import "../assets/style/global.scss";
import { DisplayMode } from "@microsoft/sp-core-library";
import { Placeholder } from "@pnp/spfx-controls-react";

//Icons
const IconBookmark = require("../assets/bookmark.svg");
const IconLike = require("../assets/like.svg");
const IconComment = require("../assets/comment.svg");

export default class Card extends React.Component<ICardProps, {}> {
  public formatDate(date: string): string {
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  }

  public render(): React.ReactElement<ICardProps> {
    const { articles } = this.props;

    return (
      <div className="row">
        {articles.length > 0 &&
          articles.map((article, index) => (
            <div key={index} className="col-3 mb-4">
              <div className="dx-article">
                <img
                  loading="lazy"
                  srcSet={article.imageUrl}
                  className="dx-article--cover"
                />
                <div className="dx-article-content">
                  <div className="d-flex justify-content-between">
                    <div className="dx-article--date">
                      {this.formatDate(article.publishedDate)}
                    </div>
                    <img
                      loading="lazy"
                      src={IconBookmark}
                      className="dx-article--bookmark"
                    />
                  </div>
                  <div className="dx-article--desc">{article.description}</div>
                  <div className="dx-article-user">
                    <img
                      loading="lazy"
                      srcSet={article.author.imageUrl}
                      className="dx-article-user--avatar"
                    />
                    <div className="dx-article-user--name">
                      {article.author.text}
                    </div>
                  </div>
                  <div className="dx-article--separator" />
                  <div className="dx-article-footer">
                    <div className="dx-article-footer--item">
                      <img loading="lazy" src={IconLike} />
                      <div className="dx-article--index">0</div>
                    </div>
                    <div className="dx-article-footer--item">
                      <img loading="lazy" src={IconComment} />
                      <div className="dx-article--index">0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
