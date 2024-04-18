import * as React from "react";
import type { ILatestArticlesProps } from "./ILatestArticlesProps";
import * as strings from "LatestArticlesWebPartStrings";

//Data
import { LIST_SITE_PAGE_ID } from "../../data/constants";

//Components
import Title from "../../components/Title";

import "../../components/assets/global.scss";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

//Pnp
import { getSP } from "../../components/pnpjsConfig";
import { SPFI } from "@pnp/sp";
import CardNews from "../../components/CardNews";

export default class LatestArticles extends React.Component<
  ILatestArticlesProps,
  {
    filterNews: string;
    articles: any[];
    favItems: any[];
  }
> {
  public _sp: SPFI;
  constructor(props: ILatestArticlesProps) {
    super(props);
    this.state = {
      filterNews: "recent",
      articles: [],
      favItems: [],
    };
    this._sp = getSP();
  }

  public navigateTo = (link: string) => {
    window.open(link, "_blank");
  };

  getFollowedListITems = async () => {
    const favItems = await this._sp.favorites.followedListItems();
    this.setState({
      favItems: favItems,
    });
  };

  public buildCamelCaseOrCondition(conditions: any) {
    if (conditions.length === 0) return "";
    if (conditions.length === 1) return conditions[0];

    let nested = conditions[0];
    for (let i = 1; i < conditions.length; i++) {
      nested = `<Or>${nested}${conditions[i]}</Or>`;
    }
    return nested;
  }

  //Retrieve Last 3 news
  public fetchArticles = async () => {
    try {
      const listId = LIST_SITE_PAGE_ID;

      // Building the department condition dynamically
      let departmentCondition = "";
      if (this.props.categories && this.props.categories.length > 0) {
        const departmentConditions = this.props.categories.map(
          (department) =>
            `<Eq><FieldRef Name='D_x00e9_partement'/><Value Type='Choice'>${department}</Value></Eq>`
        );
        departmentCondition =
          this.buildCamelCaseOrCondition(departmentConditions);
      }

      let whereClause = `<Where>
      <And>
        <And>
          <Eq>
            <FieldRef Name='Cat_x00e9_gorie'/>
            <Value Type='Text'>Actualités</Value>
          </Eq>
        </And>
        ${departmentCondition ? departmentCondition : ""}
      </And>
    </Where>`;

      const orderByClause =
        "<OrderBy><FieldRef Name='Created' Ascending='TRUE' /></OrderBy>";

      const renderListDataParameters = {
        ViewXml: `<View>
                    <Query>
                      ${whereClause}
                      ${orderByClause}
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
                    <RowLimit Paged='TRUE'>3</RowLimit>
                  </View>`,
      };

      const response = await this._sp.web.lists
        .getById(listId)
        .renderListDataAsStream(renderListDataParameters);

      const items = response.Row;

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
        articles: articlesWithViews,
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
        return _item;
      }
      return 0;
    } catch (error) {
      console.error(`Error fetching ViewsLifeTime for ${ID}:`, error);
      return null;
    }
  }

  sortArticles(sortedBy: string) {
    if (sortedBy === "popular") {
      this.setState({
        articles: this.state.articles.sort((a, b) => b.likes - a.likes),
      });
    }
    if (sortedBy === "recent") {
      this.setState({
        articles: this.state.articles.sort((a: any, b: any) => {
          return (
            new Date(b.publishedDate).getTime() -
            new Date(a.publishedDate).getTime()
          );
        }),
      });
    }
  }

  async componentDidMount(): Promise<void> {
    await this.getFollowedListITems();

    await this.fetchArticles();
  }

  public render(): React.ReactElement<ILatestArticlesProps> {
    const { title } = this.props;

    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          {title && <Title title={title} />}
          <div className="dx-tabs">
            <div
              className={`dx-tabs--item ${
                this.state.filterNews === "recent" && "dx-tabs--item__active"
              }`}
              onClick={() => {
                this.setState({
                  filterNews: "recent",
                });
                this.sortArticles("recent");
              }}
            >
              <span className="dx-tabs--item__title">{strings.Recent}</span>
            </div>
            <div
              className={`dx-tabs--item ${
                this.state.filterNews === "popular" && "dx-tabs--item__active"
              }`}
              onClick={() => {
                this.setState({
                  filterNews: "popular",
                });
                this.sortArticles("popular");
              }}
            >
              <span className="dx-tabs--item__title">{strings.Popular}</span>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.articles.map((article, index) => (
            <CardNews key={index} article={article} column="col-lg-4" />
          ))}
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-lg-2">
            <button
              className="dx-btn"
              type="button"
              onClick={() =>
                this.navigateTo(
                  "https://enoeenergie.sharepoint.com/sites/enoe-energie/SitePages/Actualit%C3%A9s.aspx"
                )
              }
            >
              {strings.SeeMore}
            </button>
          </div>
        </div>
      </>
    );
  }
}
