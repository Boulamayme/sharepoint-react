import * as React from "react";

interface ILatestNewsItem {
  position: string;
  cover: string;
  title: string;
  description: string;
  shortDescription: string;
  author: string;
  date: string;
}

const LatestNewsItem = (props: ILatestNewsItem) => {
  return (
    <>
      <div className={`dx-news mb-3 ${props.position === 'vertical' ? 'flex-column' : 'flex-row' }`}>
        <div className={`dx-news--cover ${props.position === 'horizontal' && 'me-3'}`}>
          <img loading="lazy" srcSet={props.cover} className="img" height={props.position === 'vertical' ? 270 :  200 } />
        </div>
        <div>
          <div className="dx-news--author my-3">
            {props.author} • {props.date}
          </div>
          <h3 className="dx-news--title">{props.title}</h3>
          <p className="dx-news--desc">{props.shortDescription}</p>
        </div>
      </div>
    </>
  );
};

export default LatestNewsItem;
