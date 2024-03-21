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
        >
          {props.items.map((item: any, index: number) => {
            return (
              <AccordionTab header={templateHeader(item)} key={index}>
                <p
                  className="m-0 ms-5"
                  dangerouslySetInnerHTML={{ __html: item.preview }}
                />
              </AccordionTab>
            );
          })}
        </Accordion>
      </div>
    </>
  );
};

export default CollapseList;
