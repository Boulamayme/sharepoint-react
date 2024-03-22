import * as React from "react";
import type { IHomeProps } from "./IHomeProps";
import Carousel from "./components/carousel";

/**************************************************
 *TO DO: Must be deleted and add it in extension
 *************************************************/
import "../../components/assets/global.scss";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

//Components
import Title from "../../components/Title";
import CardNews from "../../components/CardNews";
import QuickLinkFC from "../../components/quickLink";
import EventsFC from "../../components/Events";
import HappyBirthDaySection from "../../components/HappyBirthday";
import * as strings from "HomeWebPartStrings";

//PnP
import { SPFI } from "@pnp/sp";
import { getSP } from "../../components/pnpjsConfig";

export default class Home extends React.Component<
  IHomeProps,
  {
    filterNews: string;
    birthdays: any[];
    articles: any[];
  }
> {
  public _sp: SPFI;
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      filterNews: "recent",
      birthdays: [],
      articles: [],
    };
    this._sp = getSP();
  }

  public navigateTo = (link: string) => {
    window.open(link, "_blank");
  };

  //Retrieve Birthdays
  retrieveAnniversariesUsers = async () => {
    try {
      const items = await this._sp.web.lists
        .getByTitle("Anniversaires")
        .items.select("field_1", "field_2", "field_5")();

      // Current Date for comparison
      const today = new Date();
      const currentYear = today.getFullYear();
      today.setHours(0, 0, 0, 0);

      const convertDate = (dateString: any) => {
        const [day, month] = dateString.split("/");
        return new Date(currentYear, month - 1, day);
      };

      const _items = items.map((item) => ({
        ...item,
        normalizedDate: convertDate(item.field_2),
      }));

      const filteredItems = _items
        .sort((a, b) => {
          const dateA =
            a.normalizedDate < today
              ? new Date(
                  currentYear + 1,
                  a.normalizedDate.getMonth(),
                  a.normalizedDate.getDate()
                )
              : a.normalizedDate;
          const dateB =
            b.normalizedDate < today
              ? new Date(
                  currentYear + 1,
                  b.normalizedDate.getMonth(),
                  b.normalizedDate.getDate()
                )
              : b.normalizedDate;
          return dateA - dateB;
        })
        .slice(0, 4);

      const client = await this.props.context.msGraphClientFactory.getClient();

      const resultItems = await Promise.all(
        filteredItems.map(async (item) => {
          const userSearchUrl = `/users?$filter=startsWith(givenName,'${item.field_5}') and startsWith(surname,'${item.field_1}')`;
          try {
            const userResponse = await client
              .api(userSearchUrl)
              .version("v1.0")
              .get();
            const user = userResponse.value[0] ? userResponse.value[0] : null;
            return {
              ...item,
              birthday: item.field_2,
              jobTitle: user?.jobTitle ?? "",
              user: {
                text: `${item.field_5} ${item.field_1}`,
                imageUrl: `${this.props.context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?UserName=${user?.mail}&size=L`,
              },
            };
          } catch (error) {
            console.error(
              "Error fetching user from Microsoft Graph",
              item.field_5,
              item.field_1,
              error
            );
            return { ...item, user: null };
          }
        })
      );

      return resultItems;
    } catch (error) {
      console.error("Failed to fetch filtered birthday list :", error);
      return [];
    }
  };

  //Retrieve Last 3 news
  public fetchArticles = async () => {
    try {
      const listId = "bacb861d-cc8d-4178-beed-e976a7fa1ca3";

      let whereClause = `
      <Where>
          <Eq>
              <FieldRef Name='Cat_x00e9_gorie'/>
              <Value Type='Text'>Actualités</Value>
          </Eq>
      </Where>`;

      let orderByClause =
        "<OrderBy><FieldRef Name='Created' Ascending='TRUE' /></OrderBy>";

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
                    <RowLimit  Paged='TRUE'>3</RowLimit>
                  </View>`,
      } as any;

      const response = await this._sp.web.lists
        .getById(listId)
        .renderListDataAsStream(renderListDataParameters);

      const items = response.Row;

      const articlesWithViews = await Promise.all(
        items.map(async (item) => {
          const elt = await this.fetchViewsLifeTimeForArticle(
            item.ID
          );
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
        return results.PrimarySearchResults[0];
      }
      return 0;
    } catch (error) {
      console.error(`Error fetching ViewsLifeTime for ${ID}:`, error);
      return null;
    }
  }

  async componentDidMount(): Promise<void> {
    this.setState({
      birthdays: await this.retrieveAnniversariesUsers(),
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.fetchArticles();
  }

  public render(): React.ReactElement<IHomeProps> {
    const {
      quickLinks,
      titleNews,
      usefulLinks,
      titleUsefulLink,
      carouselItems,
      incomingEmployees,
    } = this.props;

    return (
      <>
        {carouselItems.length > 0 && <Carousel items={carouselItems} />}
        <div
          style={{
            backgroundColor: "#F3F4F3",
            display: "flex",
            justifyContent: "center",
            padding: "30px 0",
          }}
        >
          <QuickLinkFC items={quickLinks} />
        </div>
        <div
          style={{
            padding: "30px 3rem",
          }}
        >
          <div className="row">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center">
                {titleNews && <Title title={titleNews} />}
                <div className="dx-tabs">
                  <div
                    className={`dx-tabs--item ${
                      this.state.filterNews === "recent" &&
                      "dx-tabs--item__active"
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
                      this.state.filterNews === "popular" &&
                      "dx-tabs--item__active"
                    }`}
                    onClick={() =>
                      this.setState({
                        filterNews: "popular",
                      })
                    }
                  >
                    <span className="dx-tabs--item__title">
                      {strings.Popular}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                {this.state.articles.map((article, index) => (
                  <CardNews key={index} article={article} column="col-4" />
                ))}
              </div>
              <div className="row justify-content-center mt-3">
                <div className="col-2">
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
              <HappyBirthDaySection
                incomingBirthday={this.state.birthdays}
                incomingEmployees={incomingEmployees}
              />
            </div>
            <div className="col-2">
              {titleUsefulLink && <Title title={titleUsefulLink} />}
              {usefulLinks.length > 0 && (
                <div
                  style={{
                    background: "rgba(243, 244, 243, 1)",
                    borderRadius: "4px",
                    border: "1px solid rgba(209, 209, 209, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px 0",
                  }}
                >
                  <QuickLinkFC items={usefulLinks} direction="flex-column" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <EventsFC news={this.props.events} />
          </div>
        </div>
      </>
    );
  }
}
