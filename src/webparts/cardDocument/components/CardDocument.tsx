/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { ICardDocumentProps } from "./ICardDocumentProps";

//Icons
const documentImg = require("../assets/document.png");

export default class CardDocument extends React.Component<
  ICardDocumentProps,
  {}
> {
  public items: any[] = [
    {
      imageUrl: documentImg,
      title: "Procédure asbences",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      btnLabel: "Voir le document",
      linkUrl: "#",
    },
    {
      imageUrl: documentImg,
      title: "Procédure congés payés",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      btnLabel: "Voir le document",
      linkUrl: "#",
    },
    {
      imageUrl: documentImg,
      title: "Entretien professionnel",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      btnLabel: "Voir le document",
      linkUrl: "#",
    },
  ];

  public render(): React.ReactElement<ICardDocumentProps> {
    const {} = this.props;

    return (
      <>
        <div className="row">
          {this.items.map((item, index) => (
            <div key={index} className="col-4">
              <div className="dx-document px-4 pb-3">
                <div className="dx-document--item">
                  <div className="dx-document--cover">
                    <img src={documentImg} alt="" />
                  </div>
                  <div className="d-flex align-items-center flex-column pt-5">
                    <h3 className="dx-document--title mb-5">{item.title}</h3>
                    <a href="#" className="dx-document--link">
                      {item.btnLabel}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
