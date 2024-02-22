import * as React from "react";
import type { IHomeProps } from "./IHomeProps";
import Carousel from "./components/carousel";

export default class Home extends React.Component<IHomeProps, {}> {
  public render(): React.ReactElement<IHomeProps> {
    const {} = this.props;

    return (
      <Carousel
        items={[
          {
            imageUrl: "https://via.placeholder.com/800x400?text=Slide+1",
            title: "Slide 1",
            description: "Slide 1 Description",
            linkUrl: "https://www.bing.com",
            btnLabel: "Learn More",
          },
          {
            imageUrl: "https://via.placeholder.com/800x400?text=Slide+2",
            title: "Slide 2",
            description: "Slide 2 Description",
            linkUrl: "https://www.bing.com",
            btnLabel: "Learn More",
          },
          {
            imageUrl: "https://via.placeholder.com/800x400?text=Slide+3",
            title: "Slide 3",
            description: "Slide 3 Description",
            linkUrl: "https://www.bing.com",
            btnLabel: "Learn More",
          },
        ]}
      />
    );
  }
}
