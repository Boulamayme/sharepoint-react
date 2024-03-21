/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";

import { formatDate } from "./helpers/helpers";

//Icons
const IconBookmark = require("./assets/images/bookmark.png");
const IconLike = require("./assets/images/like.svg");
const IconComment = require("./assets/images/comment.svg");
const IconView = require("./assets/images/views.png");

const CardNews = (props: any) => {
  const { article, column } = props;

  const navigationTo = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className={`${column} mb-4`}>
      <div className="dx-article" onClick={() => navigationTo(article.url)}>
        {article.imageUrl && (
          <img
            loading="lazy"
            srcSet={article.imageUrl}
            className="dx-article--cover"
          />
        )}

        <div className="dx-article-content">
          <div className="d-flex justify-content-between align-items-center">
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
          <div className="dx-article-footer d-flex justify-content-between align-items-center w-100">
            <div className="dx-article-footer--item">
              <img loading="lazy" src={IconLike} />
              <div className="dx-article--index">{article.likes ? article.likes  : 0 }</div> 
            </div>
            <div className="dx-article-footer--item">
              <img loading="lazy" src={IconComment} />
              <div className="dx-article--index">{article.comments ? article.comments : 0 }</div>
            </div>
            <div className="dx-article-footer--item">
              <img loading="lazy" src={IconView} />
              <div className="dx-article--index">{article.view ? article.view : 0 } vues</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNews;
