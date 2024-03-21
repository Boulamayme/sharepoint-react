/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { IDirectoryProps } from "./IDirectoryProps";
import { HttpClientResponse } from "@microsoft/sp-http";
import * as strings from "DirectoryWebPartStrings";


const iconUser: any = require("../assets/user_1.png");
const iconPhone: any = require("../assets/phone_1.png");
const iconOrg: any = require("../assets/org_1.png");

export default class Directory extends React.Component<
  IDirectoryProps,
  { items: any[]; nextLink: string }
> {
  constructor(props: IDirectoryProps) {
    super(props);
    this.state = {
      items: [],
      nextLink: null,
    };
  }

  public componentDidMount() {
    this.fetchUsersFromAzureAD();
  }

  private fetchUsersFromAzureAD(nextLink: string = null): void {
    let requestUrl = "/users?$filter=userType eq 'Member'&$top=16";
    if (nextLink) {
      requestUrl = nextLink;
    }

    this.props.context.msGraphClientFactory.getClient("3").then((client) => {
      client
        .api(requestUrl)
        .version("v1.0")
        .get((error, response: any, rawResponse?: HttpClientResponse) => {
          if (!error) {
            this.setState((prevState) => ({
              items: [...prevState.items, ...response.value],
              nextLink: response["@odata.nextLink"],
            }));
          }
        });
    });
  }

  public render(): React.ReactElement<IDirectoryProps> {
    const { items, nextLink } = this.state;

    return (
      <>
        <div className="row mt-3">
          {items.map((el: any) => {
            return (
              <>
                <div className="col-3 mb-5">
                  <div className="sp-org sp-org__directory">
                    <div className="d-flex px-3 flex-column align-items-center">
                      <img
                        className="sp-org--avatar"
                        src={`${this.props.context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?UserName=${el.mail}&size=L`}
                        alt=""
                      />
                      <div className="ms-2 mt-3 text-center">
                        <h3 className="sp-org--title mb-1">{el.displayName}</h3>
                        <span className="sp-org--job">{el.jobTitle}</span>
                      </div>
                    </div>

                    <div className="sp-org--contact">
                      <a href="#">
                        <img src={iconUser} />
                      </a>
                      <a
                        href={`https://teams.microsoft.com/l/chat/0/0?users=${el.mail}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={iconPhone} />
                      </a>

                      <a href={`mailto:${el.mail}`}>
                        <img src={iconOrg} />
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        {nextLink && (
          <div className="row justify-content-center mt-5">
            <div className="col-auto">
              <button
                onClick={() => this.fetchUsersFromAzureAD(nextLink)}
                className="dx-button"
              >
                {strings.LoadMore}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}