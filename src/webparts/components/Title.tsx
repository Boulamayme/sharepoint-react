import * as React from "react";

const Title = (props: any) => {
  return (
    <div className="dx-title">
      <h1 className="dx-title--text">{props.title}</h1>
    </div>
  );
};

export default Title;
