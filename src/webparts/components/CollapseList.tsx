import {
  Accordion,
  AccordionTab,
  AccordionTabChangeEvent,
} from "primereact/accordion";

import * as React from "react";

const CollapseList = (props: any): JSX.Element => {
  const [selectItem, setSelectItem] = React.useState<number | number[]>(0);

  const templateHeader = (item: any): JSX.Element => {
    return (
      <div className="dx-accordion--header">
        <span className="dx-accordion--header-title">
          {item.icon && (
            <img
              src={item.icon}
              alt=""
              width={50}
              height={50}
              className="me-3"
            />
          )}
          {item.title}
        </span>
        <span className="dx-accordion--header-icon">
          <i className="pi pi-angle-right" />
        </span>
      </div>
    );
  };

  const handleTabOpen = (e: AccordionTabChangeEvent) => {
    //Get dx-accordion--header-icon
    const icon = e.originalEvent.currentTarget.querySelector(
      ".dx-accordion--header-icon .pi-angle-right"
    );
    //Change class to pi-angle-down
    if (icon) {
      icon.classList.remove("pi-angle-right");
      icon.classList.add("pi-angle-down");
    }
  };
  const handleTabClose = (e: AccordionTabChangeEvent) => {
    //Get dx-accordion--header-icon
    const icon = e.originalEvent.currentTarget.querySelector(
      ".dx-accordion--header-icon .pi-angle-down"
    );
    //Change class to pi-angle
    if (icon) {
      icon.classList.remove("pi-angle-down");
      icon.classList.add("pi-angle-right");
    }
  };

  React.useEffect(() => {
    props.items.forEach((item: any) => {
      item.preview = item.content;
    });
  }, []);

  return (
    <>
      <div className="dx-accordion">
        <Accordion
          multiple
          activeIndex={selectItem}
          onTabChange={(e: AccordionTabChangeEvent) => setSelectItem(e.index)}
          expandIcon="pi pi-angle-down"
          onTabOpen={(e) => handleTabOpen(e)}
          onTabClose={(e) => handleTabClose(e)}
        >
          {props.items.map((item: any, index: number) => {
            return (
              <AccordionTab header={templateHeader(item)} key={index}>
                <p dangerouslySetInnerHTML={{ __html: item.preview }} />
              </AccordionTab>
            );
          })}
        </Accordion>
      </div>
    </>
  );
};

export default CollapseList;
