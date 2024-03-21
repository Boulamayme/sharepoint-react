/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import type { INewsProps } from "./INewsProps";

import "../../components/assets/global.scss";
import CardNews from "../../components/CardNews";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";
import * as strings from "NewsWebPartStrings";

//Images
const searchIcon = require("../assets/seach.png");
const bookmarkIcon = require("../assets/bookmark.png");
const filterIcon = require("../assets/filter.png");

export default class News extends React.Component<
  INewsProps,
  {
    filterNews: string;
  }
> {
  constructor(props: INewsProps) {
    super(props);
    this.state = {
      filterNews: "recent",
    };
  }
  public render(): React.ReactElement<INewsProps> {
    const { articles } = this.props;

    return (
      <>
        {/* Search / Filter */}
        <div className="row my-4">
          <div className="col-4">
            <div className="dx-search">
              <img src={searchIcon} alt="" />
              <input
                type="text"
                placeholder="Rechercher un article, une actualité..."
              />
            </div>
          </div>
          <div className="col-8">
            <div className="d-flex align-items-center justify-content-end">
              <button className="dx-btn dx-btn__icon" type="button">
                <img src={bookmarkIcon} />
                <span>Mes articles favoris</span>
              </button>
              <button className="dx-btn dx-btn__icon" type="button">
                <img src={filterIcon} />
                <span>Filtrer les articles</span>
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-5">
          <div className="dx-search-result">
            165 <span>résultats</span>
          </div>
          <div className="dx-tabs">
            <div
              className={`dx-tabs--item ${
                this.state.filterNews === "recent" && "dx-tabs--item__active"
              }`}
              onClick={() =>
                this.setState({
                  filterNews: "recent",
                })
              }
            >
              <span
                className="dx-tabs--item__title"
                onClick={() =>
                  this.setState({
                    filterNews: "popular",
                  })
                }
              >
                {strings.Recent}
              </span>
            </div>
            <div
              className={`dx-tabs--item ${
                this.state.filterNews === "popular" && "dx-tabs--item__active"
              }`}
              onClick={() =>
                this.setState({
                  filterNews: "popular",
                })
              }
            >
              <span className="dx-tabs--item__title">{strings.Popular}</span>
            </div>
          </div>
        </div>
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
      </>
    );
  }
}
