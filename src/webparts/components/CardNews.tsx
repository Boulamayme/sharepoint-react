/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";

import { formatDate } from "./helpers/helpers";
import { getSP } from "./pnpjsConfig";

//Icons
const IconBookmark = require("./assets/images/bookmark.png");
const IconBookmarked = require("./assets/images/bookmarked.png");
const IconLike = require("./assets/images/like.svg");
const IconComment = require("./assets/images/comment.svg");
const IconView = require("./assets/images/views.png");

const CardNews = (props: any) => {
  const { article, column } = props;
  const [bookmarked, setBookmarked] = React.useState(false);
  const _sp = getSP();

  const navigationTo = (url: string) => {
    window.open(url, "_blank");
  };

  const handleEventBookmarked = async (e: any) => {
    e.stopPropagation();
    const siteId = article.SiteId;
    const webId = article.WebId;
    const listId = article.ListId;
    const listItemUniqueId = article.IdentityListItemId;
    if (bookmarked) {
      await _sp.favorites.followedListItems.remove(
        siteId,
        webId,
        listId,
        listItemUniqueId
      );
      setBookmarked(false);
    } else {
      const favListItemInfo = await _sp.favorites.followedListItems.add(
        siteId,
        webId,
        listId,
        listItemUniqueId
      );
      if (favListItemInfo) {
        // eslint-disable-next-line require-atomic-updates
        setBookmarked(true);
      }
    }
  };

  React.useEffect(() => {
    setBookmarked(article.bookmarked ? true : false);
  }, []);

  return (
    <>
      <div className={`${column} mb-4`}>
        <div className="dx-article" onClick={() => navigationTo(article.url)}>
          {article.imageUrl && (
            <img
              loading="lazy"
              srcSet={article.imageUrl}
              className="dx-article--cover"
            />
          )}

          <div className="dx-article-content align-items-between">
            <div
              style={{
                flexGrow: 1,
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="dx-article--date">
                  {formatDate(article.publishedDate)}
                </div>
                <img
                  loading="lazy"
                  src={bookmarked ? IconBookmarked : IconBookmark}
                  className="dx-article--bookmark"
                  onClick={(e: any) => {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    handleEventBookmarked(e);
                  }}
                />
              </div>
              <div className="dx-article--desc">{article.description}</div>
            </div>
            <div>
              <div className="dx-article-user">
                <img
                  loading="lazy"
                  srcSet={article.author.imageUrl}
                  className="dx-article-user--avatar"
                />
                <div className="dx-article-user--name">
                  {article.author.text}
                </div>
              </div>
              <div className="dx-article--separator" />
              <div className="dx-article-footer d-flex justify-content-between align-items-center w-100">
                <div className="dx-article-footer--item">
                  <img loading="lazy" src={IconLike} />
                  <div className="dx-article--index">
                    {article.likes ? article.likes : 0}
                  </div>
                </div>
                <div className="dx-article-footer--item">
                  <img loading="lazy" src={IconComment} />
                  <div className="dx-article--index">
                    {article.comments ? article.comments : 0}
                  </div>
                </div>
                <div className="dx-article-footer--item">
                  <img loading="lazy" src={IconView} />
                  <div className="dx-article--index">
                    {article.view ? article.view : 0} vues
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardNews;
