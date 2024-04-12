/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { IDirectoryProps } from "./IDirectoryProps";
import { HttpClientResponse } from "@microsoft/sp-http";
import * as strings from "DirectoryWebPartStrings";
import { LivePersona } from "@pnp/spfx-controls-react";
import { Dropdown } from "primereact/dropdown";

const iconUser: any = require("../assets/user_2.png");
// const iconPhone: any = require("../assets/phone_1.png");
const iconOrg: any = require("../assets/org_2.png");

const iconSearch = require("../../components/assets/images/search.svg");
const iconOrga = require("../../components/assets/images/org.png");

export default class Directory extends React.Component<
  IDirectoryProps,
  { items: any[]; nextLink: string; department: any; query: string }
> {
  searchTimeout: any;

  constructor(props: IDirectoryProps) {
    super(props);
    this.state = {
      items: [],
      nextLink: null,
      query: "",
      department: null,
    };
    this.searchTimeout = null;
  }

  public componentDidMount() {
    this.fetchUsersFromAzureAD();
  }

  private fetchUsersFromAzureAD(
    name = "",
    department = "",
    _nextLink: any = null
  ): void {
    // 'Microsoft 365 Business Standard' = 'f30db892-07e9-47e9-837c-80727f46fd3d'
    let filterQueries = ["userType eq 'Member'"];
    filterQueries.push("assignedLicenses/any(s:s/skuId eq f245ecc8-75af-4f8e-b61f-27d8114de5f3)");

    console.log("Maxence : 7")
    if (name) {
      const nameFilter = `startsWith(displayName,'${name}') or startsWith(surname,'${name}') or startsWith(givenName,'${name}')`;
      filterQueries.push(nameFilter);
    }

    if (department) {
      filterQueries.push(`department eq '${encodeURIComponent(department)}'`);
    }

    let filterQuery = `$filter=${filterQueries.join(" and ")}`;

    let requestUrl = `/users?$count=true&$orderby=DisplayName&${filterQuery}&$top=16&$select=id,displayName,mail,jobTitle,department,surname,givenName`;

    if (_nextLink) {
      requestUrl = _nextLink;
    }

    this.props.context.msGraphClientFactory
      .getClient("3")
      .then((client: any) => {
        client
          .api(requestUrl)
          .header("ConsistencyLevel", "eventual")
          .version("v1.0")
          .get(
            (error: any, response: any, rawResponse?: HttpClientResponse) => {
              console.log(response)
              if (!error) {
                this.setState((prevState) => ({
                  items: _nextLink
                    ? [...prevState.items, ...response.value]
                    : response.value,
                  nextLink: response["@odata.nextLink"],
                }));
              }
            }
          );
      });
  }
  handleSearchChange = (event: any) => {
    const _query = event.target.value;
    this.setState({ query: _query });

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.fetchUsersFromAzureAD(_query, this.state.department);
    }, 1000);
  };

  handleDepartmentChange = (e: any) => {
    const department = e.value.title;
    this.setState({ department: department });
    this.fetchUsersFromAzureAD(this.state.query, department);
  };

  public render(): React.ReactElement<IDirectoryProps> {
    const { items, nextLink } = this.state;

    return (
      <>
        <div
          className="d-flex justify-content-between mt-5"
          style={{
            marginBottom: "6rem",
          }}
        >
          <div className="col-lg-3">
            <div className="dx-searchbox">
              <img src={iconSearch} />
              <input
                type="text"
                placeholder={strings.SearchCollab}
                onChange={(e) => {
                  this.handleSearchChange(e);
                }}
              />
            </div>
          </div>
          <div className="col-auto">
            <div
              className="d-flex"
              style={{
                gap: "20px",
              }}
            >
              <Dropdown
                value={this.state.department}
                onChange={(e) => {
                  this.handleDepartmentChange(e);
                }}
                options={this.props.departments}
                optionLabel="title"
                placeholder={strings.FilterByDirection}
                className="w-full md:w-14rem"
              />
              <button
                type="button"
                style={{
                  border: 0,
                  background: "#003DA5",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  borderRadius: "5px",
                  padding: "0 25px",
                }}
                onClick={() => {
                  window.open(this.props.url, "_blank");
                }}
              >
                <img className="me-3" src={iconOrga} alt="" />
                {strings.OrganizationalChart}
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {items.map((el: any) => {
            return (
              <>
                <div className="col-lg-3 mb-5">
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
                      <a href={`mailto:${el.mail}`}>
                        <img src={iconUser} />
                      </a>
                      {/* <a
                        href={`https://teams.microsoft.com/l/chat/0/0?users=${el.mail}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={iconPhone} />
                      </a> */}
                      <a href="#">
                        <LivePersona
                          upn={el.mail}
                          template={
                            <>
                              <span className="ms-2">
                                <img src={iconOrg} />
                              </span>
                            </>
                          }
                          serviceScope={this.props.context.serviceScope}
                        />
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
                onClick={() => {
                  if (this.state.nextLink) {
                    this.fetchUsersFromAzureAD(
                      this.state.query,
                      this.state.department,
                      this.state.nextLink
                    );
                  } else {
                    this.fetchUsersFromAzureAD(
                      this.state.query,
                      this.state.department
                    );
                  }
                }}
                className="dx-btn dx-btn__default"
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
