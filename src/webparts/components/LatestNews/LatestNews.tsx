import LatestNewsItem from "./LatestNewsItem";
import * as React from "react";

const LatestNewsFC = ({ latestNews }: { latestNews: any[] }): JSX.Element => {

  return (
    <>
      <div className="row">
        <div className="col-6">
          {latestNews
            .filter((item) => item.featured)
            .map((item) => {
              return (
                <LatestNewsItem
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  shortDescription={item.description}
                  cover={item.imageUrl}
                  date={item.publishedDate}
                  author={item.author}
                  position="vertical"
                />
              );
            })}
        </div>
        <div className="col-6">
          {
            // eslint-disable-next-line
            latestNews
              .filter((item) => !item.featured)
              .map((item) => {
                return (
                  <LatestNewsItem
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    shortDescription={item.description}
                    cover={item.imageUrl}
                    date={item.publishedDate}
                    author={item.author}
                    position="horizontal"
                  />
                );
              })
          }
        </div>
      </div>
    </>
  );
};

export default LatestNewsFC;
