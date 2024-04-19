import * as React from "react";
import type { ILatestNewsProps } from "./ILatestNewsProps";
import LatestNewsFC from "../../components/LatestNews/LatestNews";

//Constant
import { getSP } from "../../components/pnpjsConfig";
import { SPFI } from "@pnp/sp";
import { LIST_SITE_PAGE_ID } from "../../data/constants";

export default class LatestNews extends React.Component<
  ILatestNewsProps,
  {
    articles: any[];
  }
> {
  public _sp: SPFI;

  constructor(props: ILatestNewsProps) {
    super(props);
    this.state = {
      articles: [],
    };
    this._sp = getSP();
  }

  public navigateTo = (link: string) => {
    window.open(link, "_blank");
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
          <Eq>
            <FieldRef Name='Cat_x00e9_gorie'/>
            <Value Type='Text'>Actualités</Value>
          </Eq>
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
      debugger;

      const articlesWithViews = items.map((item) => {
        return {
          ...item,
          imageUrl: `${window.location.origin}/_layouts/15/getpreview.ashx?path=${item.FileRef}&resolution=6`,
          publishedDate: item.Created,
          description: item.Title,
          likes: item._LikeCount ? item._LikeCount : 0,
          comments: item._CommentCount ? item._CommentCount : 0,
          url: item.FileRef,
          featured: false,
          author: {
            imageUrl: item.Author[0].picture,
            text: item.Author[0].title,
          },
        };
      });
      if (articlesWithViews.length > 0) {
        articlesWithViews[0].featured = true;
      }
      this.setState((prevState) => ({
        articles: articlesWithViews,
      }));
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  async componentDidMount(): Promise<void> {
    await this.fetchArticles();
  }

  public render(): React.ReactElement<ILatestNewsProps> {
    const { title, link } = this.props;

    return (
      <>
        <LatestNewsFC
          latestNews={this.state.articles}
          title={title}
          link={link}
        />
      </>
    );
  }
}
