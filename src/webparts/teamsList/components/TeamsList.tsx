/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { ITeamsListProps } from "./ITeamsListProps";

const avatar = require("../assets/iconset.png");
const teamsIcon = require("../assets/teams.png");
const messageIcon = require("../assets/message.png");

export default class TeamsList extends React.Component<ITeamsListProps, {}> {
  public items: any[] = [
    {
      id: 1,
      name: "Ana CALIN",
      service: "Directrice juridique",
      avatar: avatar,
    },
    {
      id: 2,
      name: "Léa RAMONDOU",
      service: "Assistante juridique",
      avatar: avatar,
    },
    {
      id: 3,
      name: "Chloé MERIADEC",
      service: "Juriste",
      avatar: avatar,
    },
  ];

  public render(): React.ReactElement<ITeamsListProps> {
    const {} = this.props;

    return (
      <>
        <div className="dx-teams">
          {this.items.map((item, index) => {
            return (
              <div
                className="dx-teams--item d-flex align-items-center justify-content-between"
                key={index}
              >
                <div className="d-flex">
                  <img
                    className="dx-teams--item-avatar"
                    src={item.avatar}
                    alt=""
                  />
                  <div className="ms-2">
                    <h3 className="dx-teams--item-name">{item.name}</h3>
                    <p className="dx-teams--item-service">{item.service}</p>
                  </div>
                </div>
                <div>
                  <img src={teamsIcon} alt="" className="me-3" />
                  <img src={messageIcon} alt="" />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
