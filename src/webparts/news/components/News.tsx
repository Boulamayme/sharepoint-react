/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import type { INewsProps } from "./INewsProps";

import "../../components/assets/global.scss";
import CardNews from "../../components/CardNews";
import * as strings from "NewsWebPartStrings";

import { getSP } from "../../components/pnpjsConfig";
import { SPFI } from "@pnp/sp";

//Images
const searchIcon = require("../assets/seach.png");
const bookmarkIcon = require("../assets/bookmark.png");

export default class News extends React.Component<
  INewsProps,
  {
    nextHref: any;
    filterNews: string;
    articles: any[];
    request: any;
    query: string;
    favItems: any[];
  }
> {
  private _sp: SPFI;
  searchTimeout: any;
  constructor(props: INewsProps) {
    super(props);
    this.state = {
      filterNews: "recent",
      articles: [],
      request: null,
      nextHref: null,
      query: "",
      favItems: [],
    };
    this._sp = getSP();
    this.searchTimeout = null;
  }

  async componentDidMount() {
    await this.getFollowedListITems();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.fetchArticles();
  }

  public fetchArticles = async (searchTerm = "") => {
    try {
      let resetData = false;
      if (searchTerm !== this.state.query) {
        this.setState({
          query: searchTerm,
          articles: [],
          nextHref: null,
        });
        resetData = true;
      }

      const listId = "bacb861d-cc8d-4178-beed-e976a7fa1ca3";
      let nextPagePosition = this.state.nextHref;
      //Remove first character
      if (nextPagePosition) nextPagePosition = nextPagePosition.substring(1);

      let whereClause = "";

      if (searchTerm) {
        whereClause = `
              <Where>
                  <And>
                      <Contains>
                          <FieldRef Name='Title'/>
                          <Value Type='Text'>${searchTerm}</Value>
                      </Contains>
                      <Eq>
                          <FieldRef Name='Cat_x00e9_gorie'/>
                          <Value Type='Text'>Actualités</Value>
                      </Eq>
                  </And>
              </Where>
          `;
      } else {
        whereClause = `
              <Where>
                  <Eq>
                      <FieldRef Name='Cat_x00e9_gorie'/>
                      <Value Type='Text'>Actualités</Value>
                  </Eq>
              </Where>
          `;
      }

      let orderByClause =
        this.state.filterNews === "recent"
          ? "<OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy>"
          : "<OrderBy><FieldRef Name='_LikeCount' Ascending='FALSE' /></OrderBy>";

      const renderListDataParameters = {
        ViewXml: `<View>
                    <Query>
                      ${whereClause}
                    </Query>
                    <ViewFields>
                      <FieldRef Name='Title' />
                      <FieldRef Name='Description' />
                      <FieldRef Name='Cat_x00e9_gorie' />
                      <FieldRef Name='FileRef' />
                      <FieldRef Name='Author' />
                      <FieldRef Name='Created' />
                      <FieldRef Name='Id' />
                      <FieldRef Name='_LikeCount' />
                      <FieldRef Name='_CommentCount' />
                    </ViewFields>
                    ${orderByClause}
                    <RowLimit  Paged='TRUE'>4</RowLimit>
                  </View>`,
        Paging: nextPagePosition ? nextPagePosition : "",
      } as any;

      const response = await this._sp.web.lists
        .getById(listId)
        .renderListDataAsStream(renderListDataParameters);

      const items = response.Row;

      // eslint-disable-next-line require-atomic-updates
      nextPagePosition = response.NextHref;

      const articlesWithViews = await Promise.all(
        items.map(async (item) => {
          const elt = await this.fetchViewsLifeTimeForArticle(item.ID);
          return {
            ...item,
            ...elt,
            imageUrl: `${window.location.origin}/_layouts/15/getpreview.ashx?path=${item.FileRef}&resolution=6`,
            publishedDate: item.Created,
            description: item.Title,
            likes: item._LikeCount ? item._LikeCount : 0,
            comments: item._CommentCount ? item._CommentCount : 0,
            view: elt ? elt.ViewsLifeTime : 0,
            url: item.FileRef,
            author: {
              imageUrl: item.Author[0].picture,
              text: item.Author[0].title,
            },
          };
        })
      );

      // Update state with new articles and the nextPagePosition
      this.setState((prevState) => ({
        articles: resetData
          ? articlesWithViews
          : [...prevState.articles, ...articlesWithViews],
        nextHref: nextPagePosition ? nextPagePosition : null,
      }));
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  async fetchViewsLifeTimeForArticle(ID: any) {
    try {
      const results = await this._sp.search({
        Querytext: `SPContentType:"Page de site" AND ListItemID:${ID}`,
        SelectProperties: [
          "ID",
          "Title",
          "ViewsLifeTime",
          "ViewsLifeTimeUniqueUsers",
          "ViewsRecent",
        ],
      });
      // Process results
      if (results.RowCount > 0) {
        let _item = results.PrimarySearchResults[0] as any;
        let isExist = this.state.favItems.find(
          (a) => a.sharepointIds.listItemUniqueId === _item.IdentityListItemId
        );
        _item.bookmarked = isExist ? true : false;
        return _item
      }
      return 0;
    } catch (error) {
      console.error(`Error fetching ViewsLifeTime for ${ID}:`, error);
      return null;
    }
  }

  getFollowedListITems = async () => {
    const favItems = await this._sp.favorites.followedListItems();
    this.setState({
      favItems: favItems,
    });
  };

  handleSearchChange = (event: any) => {
    const _query = event.target.value;

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.fetchArticles(_query);
      this.setState({ query: _query });
    }, 1000);
  };

  public render(): React.ReactElement<INewsProps> {
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
                onChange={(e: any) => {
                  this.handleSearchChange(e);
                }}
              />
            </div>
          </div>
          <div className="col-8">
            <div className="d-flex align-items-center justify-content-end">
              <button
                className="dx-btn dx-btn__icon"
                type="button"
                onClick={() => {
                  (
                    document.querySelector(
                      "[data-automation-id='sp-socialbar-bookmarkmessage'] .ms-Button-label"
                    ) as HTMLButtonElement
                  ).click();
                }}
              >
                <img src={bookmarkIcon} />
                <span>Mes articles favoris</span>
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-5">
          <div className="dx-tabs">
            <div
              className={`dx-tabs--item ${
                this.state.filterNews === "recent"
                  ? "dx-tabs--item__active"
                  : ""
              }`}
              onClick={() =>
                this.setState(
                  { filterNews: "recent", articles: [] },
                  this.fetchArticles
                )
              }
            >
              <span className="dx-tabs--item__title">{strings.Recent}</span>
            </div>
            <div
              className={`dx-tabs--item ${
                this.state.filterNews === "popular"
                  ? "dx-tabs--item__active"
                  : ""
              }`}
              onClick={() =>
                this.setState(
                  { filterNews: "popular", articles: [] },
                  this.fetchArticles
                )
              }
            >
              <span className="dx-tabs--item__title">{strings.Popular}</span>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.articles.map((article, index) => (
            <CardNews key={index} article={article} column="col-3" />
          ))}
        </div>
        {this.state.nextHref && (
          <div className="d-flex justify-content-center mt-5">
            <button
              className="dx-btn dx-btn__default"
              type="button"
              onClick={() => this.fetchArticles()}
            >
              {strings.SeeMore}
            </button>
          </div>
        )}
      </>
    );
  }
}
