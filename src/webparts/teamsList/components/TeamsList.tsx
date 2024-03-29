/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { ITeamsListProps } from "./ITeamsListProps";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";

const messageIcon = require("../assets/message.png");
const teamsIcon = require("../assets/icon_teams_1.png");

export default class TeamsList extends React.Component<ITeamsListProps, {}> {
  public render(): React.ReactElement<ITeamsListProps> {
    const { users } = this.props;

    return (
      <>
        {users.length > 0 && (
          <div className="dx-teams">
            {users.map((item, index) => {
              return (
                <div
                  className="dx-teams--item d-flex align-items-center justify-content-between"
                  key={index}
                >
                  <div className="d-flex">
                    <img
                      className="dx-teams--item-avatar"
                      src={`${this.props.context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?UserName=${item.email}&size=L`}
                      alt=""
                    />
                    <div className="ms-2">
                      <h3 className="dx-teams--item-name">{item.user}</h3>
                      <p className="dx-teams--item-service">{item.service}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <a
                      href={`https://teams.microsoft.com/l/chat/0/0?users=${item.email}`}
                      target="_blank"
                      rel="noreferrer"
                      className="me-2"
                    >
                      <img src={teamsIcon} />
                    </a>
                    <a href={`mailto:${item.email}`}>
                      <img src={messageIcon} alt="" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {users.length === 0 && (
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
