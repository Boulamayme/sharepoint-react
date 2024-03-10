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
import Title from "../../components/Title";
import CardNews from "../../components/CardNews";
import Events from "../../components/Events";
import HappyBirthDaySection from "../../components/HappyBirthday";
import QuickLinkFC from "../../components/quickLink";

export default class Home extends React.Component<IHomeProps, {}> {
  public render(): React.ReactElement<IHomeProps> {
    const { quickLinks, titleNews, articles, usefulLinks, titleUsefulLink } =
      this.props;

    return (
      <>
        <Carousel
          items={[
            {
              imageUrl:
                "https://dexterousplace.sharepoint.com/sites/enoe-energie/SiteAssets/assets/20220627_184816.png",
              title: "Les photos du séminaire en Camargue sont arrivées !",
              description:
                "Revivez ces bons moments uniques avec les clichés pris par tous les collaborateurs.",
              linkUrl: "https://www.bing.com",
              btnLabel: "Voir les photos",
            },
            {
              imageUrl:
                "https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg",
              title: "Les photos du séminaire en Camargue sont arrivées !",
              description:
                "Revivez ces bons moments uniques avec les clichés pris par tous les collaborateurs.",
              linkUrl: "https://www.bing.com",
              btnLabel: "Voir les photos",
            },
          ]}
        />
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
              {titleNews && <Title title={titleNews} />}
              <div className="row">
                {articles.map((article, index) => (
                  <CardNews key={index} article={article} column="col-4" />
                ))}
              </div>
              <HappyBirthDaySection />
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
            <Events />
          </div>
        </div>
      </>
    );
  }
}
