import * as React from "react";

import "./assets/global.scss";

const QuickLinkFC = (props: any) => {
  const { items, direction } = props;

  const navigateTo = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <div className={direction == "flex-column" ? "dx-quicklink__container" : ""}>
      <div className={`dx-quicklink ${direction}`}>
        {items.map((item: any, index: number) => (
          <div
            className="dx-quicklink--item"
            key={index}
            onClick={() => navigateTo(item.link)}
          >
            <img
              loading="lazy"
              src={item.icon}
              className="dx-quicklink--icon"
            />
            <div className="dx-quicklink--name">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinkFC;
