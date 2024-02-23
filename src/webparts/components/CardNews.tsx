/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";

//Icons
const IconBookmark = require("./assets/images/bookmark.svg");
const IconLike = require("./assets/images/like.svg");
const IconComment = require("./assets/images/comment.svg");


const CardNews = (props: any) => {
  const { article , column } = props;

  const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };
  return (
    <div className={`${column } mb-4`}>
      <div className="dx-article">
        <img
          loading="lazy"
          srcSet={article.imageUrl}
          className="dx-article--cover"
        />
        <div className="dx-article-content">
          <div className="d-flex justify-content-between">
            <div className="dx-article--date">
              {formatDate(article.publishedDate)}
            </div>
            <img
              loading="lazy"
              src={IconBookmark}
              className="dx-article--bookmark"
            />
          </div>
          <div className="dx-article--desc">{article.description}</div>
          <div className="dx-article-user">
            <img
              loading="lazy"
              srcSet={article.author.imageUrl}
              className="dx-article-user--avatar"
            />
            <div className="dx-article-user--name">{article.author.text}</div>
          </div>
          <div className="dx-article--separator" />
          <div className="dx-article-footer">
            <div className="dx-article-footer--item">
              <img loading="lazy" src={IconLike} />
              <div className="dx-article--index">0</div>
            </div>
            <div className="dx-article-footer--item">
              <img loading="lazy" src={IconComment} />
              <div className="dx-article--index">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNews;
