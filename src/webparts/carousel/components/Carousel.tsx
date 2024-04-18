import * as React from "react";
import type { ICarouselProps } from "./ICarouselProps";

import "../../components/assets/global.scss";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


//PnP JS
import { Placeholder } from "@pnp/spfx-controls-react";

//Components
import CarouselFC from "../../home/components/components/carousel";

export default class Carousel extends React.Component<ICarouselProps, {}> {
  public render(): React.ReactElement<ICarouselProps> {
    const { items } = this.props;

    return (
      <>
        {items.length > 0 && <CarouselFC items={items} />}

        {items.length === 0 && (
          <Placeholder
            iconName="Edit"
            iconText="Configure your web part"
            description="Please configure the web part."
            buttonLabel="Configure"
            onConfigure={this.props.onConfigurePropPane}
          />
        )}
      </>
    );
  }
}
