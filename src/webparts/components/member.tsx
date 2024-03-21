import * as React from "react";
import IconPhone from "../organizationalChart/assets/images/phone";
import IconOrg from "../organizationalChart/assets/images/organization";
import { IUser } from "./models/user.model";

const Member = (props: IUser): JSX.Element => {
  const userAvatar = (email: string): JSX.Element => {
    return (
      <img
        className="sp-org--avatar m-0"
        src={`/_layouts/15/userphoto.aspx?size=L&accountname=${props.EMail}`}
        alt=""
      />
    );
  };

  return (
    <div className="sp-org">
      <div className="d-flex px-3 flex-column align-items-center">
        {userAvatar(props.EMail)}
        <div className="ms-2 mt-3 text-center">
          <h3 className="sp-org--title mb-1">{props.Title}</h3>
          <span className="sp-org--job d-block mb-3">{props.JobTitle}</span>
          <span
            style={{
              color: "#00965E",
            }}
          >
            {props.Department}
          </span>
        </div>
      </div>

      <div className="sp-org--contact">
        <a href="#">
          <IconPhone />
        </a>
        <a href={`mailto:${props.EMail}`}>
          <IconOrg />
        </a>
      </div>
    </div>
  );
};

export default Member;
