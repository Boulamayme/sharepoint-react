/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type {
  IDocumentManagerState,
  IDocumentsManagerProps,
} from "./IDocumentManagerProps";
import { SPFI } from "@pnp/sp";

//Import styles
import "../../components/assets/global.scss";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

//PrimeReact
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import * as strings from "DocumentManagerWebPartStrings";
import CardDocument from "./CardDocument";
import Title from "../../components/Title";
import { getSP } from "../../components/pnpjsConfig";

//Icons
const iconPdf = require("../assets/icons/pdf.png");
const iconXlsx = require("../assets/icons/xlsx.png");
const iconFile = require("../assets/icons/file.png");

export default class DocumentsManager extends React.Component<
  IDocumentsManagerProps,
  IDocumentManagerState
> {
  private _sp: SPFI;

  private menu: any = null;
  private toast: any = null;

  private items: any[] = [
    {
      label: "Edit",
      icon: "pi pi-pencil",
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
    },
  ];

  constructor(props: IDocumentsManagerProps) {
    super(props);
    this.menu = React.createRef();
    this.toast = React.createRef();
    this.state = {
      folders: [],
      files: [],
      historyStack: [this.props.folderUrl],
    };
    this._sp = getSP();
  }

  public componentDidMount(): void {
    this.loadItems(this.props.folderUrl);
  }

  public componentDidUpdate(prevProps: IDocumentsManagerProps): void {
    if (prevProps.folderUrl !== this.props.folderUrl) {
      this.loadItems(this.props.folderUrl);
    }
  }

  private loadItems(folderUrl: string): void {
    this._sp.web
      .getFolderByServerRelativePath(folderUrl)
      .folders()
      .then((folderResponse) => {
        this._sp.web
          .getFolderByServerRelativePath(folderUrl)
          .files.expand("listItemAllFields", "Author")()
          .then((fileResponse) => {
            console.log("fileResponse", fileResponse);
            fileResponse.map((file: any) => {
              file.Avatar = `${this.props.ctx.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?UserName=${file.Author.Email}&size=L`;
              file.TimeCreated = this.convertDateToFrench(
                file.ListItemAllFields.Modified
              );
            });
            this.setState((prevState) => ({
              folders: folderResponse,
              files: fileResponse,
              historyStack: [...prevState.historyStack, folderUrl],
            }));
          })
          .catch((error) => {
            console.error("Get Files Errors", error);
          });
      })
      .catch((error) => {
        console.error("Get Folders Errors", error);
      });
  }

  private onFolderClicked(folder: any): void {
    this.loadItems(folder.ServerRelativeUrl);
  }
  private onPreviousClicked(): void {
    if (this.state.historyStack.length > 1) {
      // Ensure there's a previous folder
      const newHistoryStack = [...this.state.historyStack];
      newHistoryStack.pop(); // Remove current folder
      const previousFolderUrl = newHistoryStack[newHistoryStack.length - 1];
      this.setState({ historyStack: newHistoryStack });
      this.loadItems(previousFolderUrl);
    }
  }

  public templateAction(): JSX.Element {
    return (
      <>
        <Toast ref={this.toast} />
        <Menu
          className="dx-menu-list"
          model={this.items}
          popup
          ref={this.menu}
          id="popup_menu"
        />
        <div className="d-flex justify-content-center">
          <i
            className="pi pi-ellipsis-h dx-cursor"
            onClick={(event) => this.menu.current.toggle(event)}
          />
        </div>
      </>
    );
  }

  public templateName(rowData: any): JSX.Element {
    const fileExtension = rowData.Name.split(".").pop();
    let icon = iconFile;
    if (fileExtension === "pdf") {
      icon = iconPdf;
    } else if (fileExtension === "xlsx") {
      icon = iconXlsx;
    }
    return (
      <>
        <div className="d-flex align-items-center">
          <img src={icon} alt="file icon" className="me-3" />
          {rowData.Name}
        </div>
      </>
    );
  }

  public convertDateToFrench(date: string): string {
    const _date = new Date(date);
    return _date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  public formatDateTemplate(rowData: any): JSX.Element {
    const date = new Date(rowData.ListItemAllFields.Modified);
    return (
      <>
        <span className="dx-file--date">
          {date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      </>
    );
  }

  public authorTemplate(rowData: any): JSX.Element {
    return (
      <>
        <div className="d-flex align-items-center">
          <img
            src={`${this.props.ctx.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?UserName=${rowData.Author.Email}&size=L`}
            draggable="false"
            className="dx-avatar dx-avatar--small dx-avatar--circle"
          />
          <span className="ms-3">{rowData.Author.Title}</span>
        </div>
      </>
    );
  }

  public render(): React.ReactElement<IDocumentsManagerProps> {
    const {} = this.props;

    return (
      <>
        <div>
          <Title title={strings.Promote} />
          <div className="row">
            {this.state.files.slice(0, 3).map((item, index: number) => (
              <CardDocument key={index} document={item} />
            ))}
          </div>
        </div>
        <div className="dx-manager-docs">
          <button
            onClick={this.onPreviousClicked.bind(this)}
            className="d-none"
          >
            Previous
          </button>
          <div className="row">
            <div className="col-lg-3">
              <div className="dx-manager-docs-filter">
                <ul className="dx-manager-docs-filter--list">
                  {this.state.folders.map((item) => (
                    <li
                      className="dx-manager-docs-filter--list-item"
                      key={item.UniqueId}
                      onClick={() => this.onFolderClicked(item)}
                    >
                      {item.Name}
                      <i className="fa-solid fa-caret-right" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <DataTable
                className="dx-table"
                value={this.state.files}
                tableStyle={{ minWidth: "50rem" }}
              >
                <Column
                  field="Name"
                  header={strings.Name}
                  body={this.templateName}
                  sortable
                />
                <Column
                  field="ListItemAllFields.Modified"
                  header={strings.Modified}
                  body={this.formatDateTemplate}
                  sortable
                />
                <Column
                  field="Author.Email"
                  header={strings.AddedBy}
                  body={this.authorTemplate.bind(this)}
                  sortable
                />
                <Column
                  header="Actions"
                  headerStyle={{ display: "flex", justifyContent: "center" }}
                  body={this.templateAction.bind(this)}
                  style={{ textAlign: "center" }}
                />
              </DataTable>
            </div>
          </div>
        </div>
      </>
    );
  }
}
