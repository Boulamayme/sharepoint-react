import * as React from "react";
import type { ITimelineProps } from "./ITimelineProps";
import { Placeholder } from "@pnp/spfx-controls-react";

export default class Timeline extends React.Component<
  ITimelineProps,
  {
    container: any;
  }
> {
  constructor(props: ITimelineProps) {
    super(props);
    this.state = {
      container: React.createRef(),
    };
  }

  public handleMouseDown = (e: React.MouseEvent) => {
    const ele = this.state.container.current;
    if (!ele) {
      return;
    }
    const startPos = {
      left: ele.scrollLeft,
      x: e.clientX,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = (e.clientX - startPos.x) * -1;
      ele.scrollLeft = startPos.left + dx;
      this.updateCursor(ele);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      this.resetCursor(ele);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  public handleTouchStart = (e: React.TouchEvent) => {
    const ele = this.state.container.current;
    if (!ele) {
      return;
    }
    const touch = e.touches[0];
    const startPos = {
      left: ele.scrollLeft,
      x: touch.clientX,
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const dx = (touch.clientX - startPos.x) * -1;
      ele.scrollLeft = startPos.left + dx; 
      this.updateCursor(ele);
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      this.resetCursor(ele);
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  public updateCursor = (ele: any) => {
    ele.style.cursor = "grabbing";
    ele.style.userSelect = "none";
  };

  public resetCursor = (ele: any) => {
    ele.style.cursor = "grab";
    ele.style.removeProperty("user-select");
  };

  public render(): React.ReactElement<ITimelineProps> {
    const { items } = this.props;

    return (
      <>
        {items.length > 0 && (
          <div
            ref={this.state.container}
            className="dx-timeline"
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleTouchStart}
          >
            {items.map((item, index) => {
              return (
                <div className="dx-timeline--item" key={index}>
                  <div
                    className="dx-timeline--header"
                    style={{
                      backgroundColor: item.contentBg,
                    }}
                  >
                    <span className="dx-timeline--header-year">
                      {item.year}
                    </span>
                    <p className="dx-timeline--header-desc">
                      {item.description}
                    </p>
                  </div>
                  <div className={`dx-timeline--logo ${(item.logo && item.logo !== "") && 'dx-timeline--logo__shadow' }`} >
                    {item.logo && item.logo !== "" && (
                      <img src={item.logo} alt="" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
