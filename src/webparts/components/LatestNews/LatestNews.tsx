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
                <LatestNewsItem key={item.id} {...item} position="vertical" />
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
                    {...item}
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
