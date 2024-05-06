import * as React from "react";
import type { IIncomingEmployeesProps } from "./IIncomingEmployeesProps";
import * as strings from "IncomingEmployeesWebPartStrings";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

//Style
import "../../components/assets/global.scss";


//PrimeReact
import { Tooltip } from "primereact/tooltip";

//Helpers
import { formatDate } from "../../components/helpers/helpers";
import { Placeholder } from "@pnp/spfx-controls-react";

export default class IncomingEmployees extends React.Component<
  IIncomingEmployeesProps,
  {}
> {
  public render(): React.ReactElement<IIncomingEmployeesProps> {
    const { items, position } = this.props;

    return (
      <>
        {items.length > 0 && (
          <>
            <div className={`row ${position}`}>
              <div className="col-lg-6 d-flex justify-content-center">
                <div className="dx-hp">
                  <img
                    // src="/sites/enoe-energie/SiteAssets/assets/img_n_b.png"
                    src=""
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "1px",
                      width: "150px",
                    }}
                  />
                  <img
                    // src="/sites/enoe-energie/SiteAssets/assets/image.png"
                    src=""
                    alt=""
                    style={{
                      position: "absolute",
                      right: "15%",
                      bottom: "-5%",
                      width: "150px",
                    }}
                  />
                  <img
                    // src="/sites/enoe-energie/SiteAssets/assets/nuage%20souriant.png"
                    src=""
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "0",
                      width: "150px",
                    }}
                    alt=""
                  />
                  <h3 className="dx-hp--title">
                    <img
                      // src="/sites/enoe-energie/SiteAssets/assets/cloud.png"
                      src=""
                      alt=""
                      style={{
                        position: "absolute",
                        width: 86,
                        zIndex: -1,
                        top: -12,
                        left: "29%",
                      }}
                    />
                    Enoé s'agrandit !
                  </h3>
                  <div className="dx-hp-users">
                    {items.map((item: any, index: number) => (
                      <div key={index} className="dx-hp-users--item">
                        <div className="dx-hp-users--avatar">
                          <img src={item.user.imageUrl} alt="" />
                        </div>
                        <div className="dx-hp-users--content">
                          <span className="dx-hp-users--name">
                            {item.user.text}
                            <i
                              className="dx-info pi pi-info-circle ms-2"
                              data-pr-tooltip={item.description}
                              data-pr-position="right"
                            />
                          </span>
                          <span className="dx-hp-users--position">
                            {item.jobTitle}
                          </span>
                          <span className="dx-hp-users--birthday">
                            {strings.ArrivalDate} :
                            {formatDate(item.arrivalDate)}
                          </span>
                          <span className="dx-hp-users--hobbies">
                            {strings.Interests} : {item.hobbies}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Tooltip target=".dx-info" />
          </>
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
