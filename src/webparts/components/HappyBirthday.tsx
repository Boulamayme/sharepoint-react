import * as React from "react";

const HappyBirthDaySection = (props: any) => {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="dx-hp">
            <h3 className="dx-hp--title">Happy birthday !</h3>
          </div>
        </div>
        <div className="col-6">
          <div className="dx-hp">
            <img
              src="https://dexterousplace.sharepoint.com/sites/enoe-energie/SiteAssets/assets/img_n_b.png"
              style={{
                position: "absolute",
                right: "0",
                top: "1px",
                width: "150px",
              }}
            />
            <img
              src="https://dexterousplace.sharepoint.com/sites/enoe-energie/SiteAssets/assets/image.png"
              alt=""
              style={{
                position: "absolute",
                right: "15%",
                bottom: "-5%",
                width: "150px",
              }}
            />
            <img
              src="https://dexterousplace.sharepoint.com/sites/enoe-energie/SiteAssets/assets/nuage%20souriant.png"
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
                src="https://dexterousplace.sharepoint.com/sites/enoe-energie/SiteAssets/assets/cloud.png"
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
              <div className="dx-hp-users--item">
                <div className="dx-hp-users--avatar">
                  <img
                    src="https://this-person-does-not-exist.com/img/avatar-genc7f7c517ca695f702d78cf94e2f1c87b.jpg"
                    alt=""
                  />
                </div>
                <div className="dx-hp-users--content">
                  <span className="dx-hp-users--name">Radovan SkilllArena</span>
                  <span className="dx-hp-users--position">
                    Chef de projet PV
                  </span>
                  <span className="dx-hp-users--birthday">
                    Anniversaire : 04 octobre{" "}
                  </span>
                  <span className="dx-hp-users--hobbies">
                    Centres d’intérêt : menuiserie, kendo, badminton
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HappyBirthDaySection;
