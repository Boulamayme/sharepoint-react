/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";

const iconView = require("../assets/icons/view.png");
const documentImage = require("../assets/document.png");

interface ICardDocumentProps {
  document: any;
}

const CardDocument: React.FC<ICardDocumentProps> = (props) => {
  const convertByTeToMb = (bytes: number, decimals = 2) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };
  return (
    <>
      {props.document && (
        <div className="col-4">
          <div className="dx-card-document mb-5">
            <div className="dx-card-document-header">
              <div className="dx-card-document--cover">
                <img src={documentImage} />
                <i className="pi pi-search" />
              </div>

              <div className="dx-card-document--info">
                <div className="dx-card-document-size">
                  <i className="pi pi-file-pdf" />
                  <span>.pdf - {convertByTeToMb(props.document.Length)}</span>
                </div>
                <div className="dx-card-document--date">
                  {props.document.TimeCreated}
                </div>
              </div>
            </div>
            <div className="dx-card-document-content">
              {props.document.Name}
            </div>
            <div className="dx-card-document-footer">
              <div className="d-flex align-items-center justify-content-between">
                <div className="dx-card-document-user">
                  <img
                    className="dx-card-document-user--avatar"
                    src={props.document.Avatar}
                    alt=""
                  />
                  <span className="dx-card-document-user--name">
                    {props.document.Author.Title}
                  </span>
                </div>
                <div className="dx-card-document-views">
                  <img src={iconView} alt="" />
                  <span>420 Vues</span>
                </div>
              </div>
              <div className="dx-card-document--type">
                <i className="pi pi-folder" />
                <span>Communication</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardDocument;
