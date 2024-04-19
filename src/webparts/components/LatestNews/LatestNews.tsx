import Title from "../Title";
import LatestNewsItem from "./LatestNewsItem";
import * as React from "react";

const LatestNewsFC = ({
  latestNews,
  title,
  link,
}: {
  latestNews: any[];
  title: string;
  link: string;
}): JSX.Element => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="col-auto">
          <Title title={title} />
        </div>
        <div className="col-lg-3 d-flex justify-content-end">
          <button
            className={`dx-btn dx-btn__default`}
            type="button"
            onClick={() => {
              window.open(link, "_blank");
            }}
          >
            Voir tout
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          {latestNews
            .filter((item) => item.featured)
            .map((item) => {
              return (
                <LatestNewsItem key={item.Id} {...item} position="vertical" />
              );
            })}
        </div>
        <div className="col-lg-6">
          {latestNews
            .filter((item) => !item.featured)
            .map((item) => {
              return (
                <LatestNewsItem key={item.Id} {...item} position="horizontal" />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default LatestNewsFC;
