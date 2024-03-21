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
// import HappyBirthDaySection from "../../components/HappyBirthday";
import QuickLinkFC from "../../components/quickLink";
import EventsFC from "../../components/Events";
import HappyBirthDaySection from "../../components/HappyBirthday";
import * as strings from "HomeWebPartStrings";

export default class Home extends React.Component<
  IHomeProps,
  {
    filterNews: string;
  }
> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      filterNews: "recent",
    };
  }

  public navigateTo = (link: string) => {
    window.open(link, "_blank");
  };

  public render(): React.ReactElement<IHomeProps> {
    const {
      quickLinks,
      titleNews,
      articles,
      usefulLinks,
      titleUsefulLink,
      carouselItems,
      incomingBirthday,
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
                {articles.map((article, index) => (
                  <CardNews key={index} article={article} column="col-4" />
                ))}
              </div>
              <div className="row justify-content-center mt-3">
                <div className="col-2">
                  <button
                    className="dx-btn"
                    type="button"
                    onClick={() => this.navigateTo("https://enoeenergie.sharepoint.com/sites/enoe-energie/SitePages/Actualit%C3%A9s.aspx")}
                  >
                    {strings.SeeMore}
                  </button>
                </div>
              </div>
              <HappyBirthDaySection
                incomingBirthday={incomingBirthday}
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
