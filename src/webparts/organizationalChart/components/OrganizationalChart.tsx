/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { IOrganizationalChartProps } from "./IOrganizationalChartProps";

import "../../components/assets/global.scss";

import { DisplayMode } from "@microsoft/sp-core-library";

//Icons
import IconPhone from "../assets/images/phone";
import IconOrg from "../assets/images/organization";
import { LivePersona, Placeholder } from "@pnp/spfx-controls-react";

export default class OrganizationalChart extends React.Component<
  IOrganizationalChartProps,
  {}
> {
  public render(): React.ReactElement<IOrganizationalChartProps> {
    const { items, context } = this.props;

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
                              {el.user.imageUrl && (
                                <img
                                  className="sp-org--avatar"
                                  src={el.user.imageUrl}
                                  alt=""
                                />
                              )}

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
                              <a
                                href={`https://teams.microsoft.com/l/call/0/0?users=${el.user.secondaryText}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <IconPhone />
                              </a>
                              <LivePersona
                                upn={el.user.secondaryText}
                                template={
                                  <>
                                    <span className="ms-2">
                                      <IconOrg />
                                    </span>
                                  </>
                                }
                                serviceScope={context.serviceScope}
                              />
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
