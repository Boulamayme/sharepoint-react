import * as React from "react";

const Title = (props: any) => {
  return (
    <div className="dx-title">
      <h1 className="dx-title--text">
        <span className="sketchnote">{props.title.split(' ')[0]}</span> {props.title.split(' ').slice(1).join(' ')}
      </h1>
    </div>
  );
};

export default Title;
