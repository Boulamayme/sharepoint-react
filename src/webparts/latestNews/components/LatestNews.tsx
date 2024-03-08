import * as React from "react";
import type { ILatestNewsProps } from "./ILatestNewsProps";
import LatestNewsFC from "../../components/LatestNews/LatestNews";

//Constant
import { LATEST_NEWS } from "../../data/constants";

export default class LatestNews extends React.Component<ILatestNewsProps, {}> {
  public render(): React.ReactElement<ILatestNewsProps> {
    const {} = this.props;

    return (
      <>
        <LatestNewsFC latestNews={LATEST_NEWS} />;
      </>
    );
  }
}
