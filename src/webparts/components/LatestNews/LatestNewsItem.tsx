/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";

const icon = require("../../components/assets/images/icon_wrap.png");

interface ILatestNewsItem {
  position: string;
  imageUrl: string;
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  url: string;
}

const LatestNewsItem = (props: ILatestNewsItem): JSX.Element => {
  const navigateTo = (url: string): void => {
    window.open(url, "_blank");
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };

  return (
    <>
      <div
        className={`dx-news mb-3 ${
          props.position === "vertical" ? "flex-column" : "flex-row"
        }`}
        onClick={() => navigateTo(props.url)}
      >
        <div
          className={`dx-news--cover ${
            props.position === "horizontal" && "me-3"
          }`}
        >
          <img
            loading="lazy"
            srcSet={props.imageUrl}
            className="img"
            height={props.position === "vertical" ? 270 : 200}
          />
        </div>
        <div>
          <div className="dx-news--author my-3">
            {props.author} • { formatDate(props.publishedDate)}
          </div>
          <h3 className="dx-news--title">
            {props.title}
            <img src={icon} alt="" />
          </h3>
          <p className="dx-news--desc">{props.description}</p>
        </div>
      </div>
    </>
  );
};

export default LatestNewsItem;
