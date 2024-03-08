/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { IOrganizationalChartProps } from "./IOrganizationalChartProps";

import "../assets/style.scss";

import { DisplayMode } from "@microsoft/sp-core-library";

//Icons
import IconPhone from "../assets/images/phone";
import IconOrg from "../assets/images/organization";
import { Placeholder } from "@pnp/spfx-controls-react";

export default class OrganizationalChart extends React.Component<
  IOrganizationalChartProps,
  {}
> {
  public render(): React.ReactElement<IOrganizationalChartProps> {
    const { items } = this.props;

    return (
      <>
        {items.length > 0 && (
          <>
            <div className="sp-section">
              <div className="row mt-3">
                {items
                  .filter((el: any) => !el.seniorMember)
                  .map((el: any) => {
                    return (
                      <>
                        <div className="col-3 mb-3">
                          <div className="sp-org">
                            <div className="d-flex px-3 flex-column align-items-center">
                              <img
                                className="sp-org--avatar"
                                src={el.user.imageUrl}
                                alt=""
                              />
                              <div className="ms-2 mt-3 text-center">
                                <h3 className="sp-org--title mb-1">
                                  {el.user.text}
                                </h3>
                                <span className="sp-org--job">
                                  {el.jobTitle}
                                </span>
                                <div className="flex">
                                  <div className="sp-org--lobs mt-3">
                                    {el.lobs &&
                                      el.lobs
                                        .split(",")
                                        .map((lob: string, index: number) => {
                                          return (
                                            <span
                                              key={index}
                                              className="sp-org--lobs-item"
                                            >
                                              {lob}
                                            </span>
                                          );
                                        })}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="sp-org--contact">
                              <a href="#">
                                <IconPhone />
                              </a>
                              <a href={`mailto:${el.user.secondaryText}`}>
                                <IconOrg />
                              </a>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </>
        )}
        {items.length === 0 && (
          <Placeholder
            iconName="Edit"
            iconText="Configure your web part"
            description="Please configure the web part."
            buttonLabel="Configure"
            hideButton={this.props.displayMode === DisplayMode.Read}
            onConfigure={this.props.onConfigurePropPane}
          />
        )}
      </>
    );
  }
}
