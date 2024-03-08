import * as React from "react";
import type { ICareersProps } from "./ICareersProps";

export default class Careers extends React.Component<ICareersProps, {}> {
  public items: any[] = [
    {
      id: 1,
      category: "Raccordement",
      title: "Assistant raccordement ENR H/F",
      contract: "CDI",
      location: "Paris",
      label: "Catégorie A",
      linkUrl: "#",
      createDate: "Il y a 30j",
    },
    {
      id: 2,
      category: "Raccordement",
      title: "Stagiaire ingénieur raccordement",
      contract: "CDI",
      location: "Marseille",
      label: "Catégorie A",
      linkUrl: "#",
      createDate: "Il y a 30j",
    },
  ];

  public render(): React.ReactElement<ICareersProps> {
    const {} = this.props;

    return (
      <>
        <div className="dx-careers">
          <div className="row">
            <div className="col-3">
              <ul className="dx-careers-categories">
                <li className="dx-careers-categories--item dx-careers-categories--item__selected">
                  Raccordement
                </li>
                <li className="dx-careers-categories--item">Juridique</li>
                <li className="dx-careers-categories--item">Communication</li>
                <li className="dx-careers-categories--item">Commercial</li>
                <li className="dx-careers-categories--item">Développement</li>
                <li className="dx-careers-categories--item">RH</li>
                <li className="dx-careers-categories--item">Autres</li>
              </ul>
            </div>
            <div className="col-9">
              <div className="row">
                {this.items.map((item, index) => (
                  <div key={index} className="col-6">
                    <div className="dx-careers-item">
                      <span className="dx-careers-item--time">
                        {item.createDate}
                      </span>
                      <h5 className="dx-careers-item--title">{item.title}</h5>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="dx-careers-item--category align-items-center">
                          {item.category}
                        </span>
                        <span className="dx-careers-item--label">
                          {item.label}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="dx-careers-item--contract me-2">
                            {item.contract}
                          </span>
                          <span className="dx-careers-item--location">
                            {item.location}
                          </span>
                        </div>
                        <div>
                          <a
                            className="dx-careers-item--link"
                            href={item.linkUrl}
                          >
                            Postuler
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
