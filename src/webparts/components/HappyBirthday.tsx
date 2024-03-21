import * as strings from "HomeWebPartStrings";
import * as React from "react";

const HappyBirthDaySection = (props: any) => {
  const { incomingBirthday, incomingEmployees } = props;

  //Format Date to get only the day and month for exemle 18 Janvier
  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("fr-FR", {
      month: "long",
      day: "numeric",
    });
  };
  return (
    <>
      <div className="row">
        <div className="col-6">
          <div
            className="dx-hp"
            style={{
              padding: "2.5rem",
            }}
          >
            <img
              src="/sites/enoe-energie/SiteAssets/assets/greenc_cloud.png"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "171px",
              }}
            />
            <img
              src="/sites/enoe-energie/SiteAssets/assets/green_blue.png"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "180px",
              }}
            />
            <h3 className="dx-hp--title">Happy birthday !</h3>
            <div
              className="d-flex justify-content-between"
              style={{
                gap: "10px",
              }}
            >
              <div
                className="dx-hp-users"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "15px",
                }}
              >
                {incomingBirthday.map((item: any, index: number) => (
                  <div key={index} className="dx-hp-users--item">
                    <div className="dx-hp-users--avatar">
                      <img src={item.user.imageUrl} alt="" />
                    </div>
                    <div className="dx-hp-users--content">
                      <span
                        className="dx-hp-users--name"
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {item.user.text}
                      </span>
                      <span className="dx-hp-users--position">
                        {item.jobTitle}
                      </span>
                      <span
                        className="dx-hp-users--birthday"
                        style={{
                          color: "#E8B352",
                        }}
                      >
                        {formatDate(item.birthday)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="dx-hp">
            <img
              src="/sites/enoe-energie/SiteAssets/assets/img_n_b.png"
              style={{
                position: "absolute",
                right: "0",
                top: "1px",
                width: "150px",
              }}
            />
            <img
              src="/sites/enoe-energie/SiteAssets/assets/image.png"
              alt=""
              style={{
                position: "absolute",
                right: "15%",
                bottom: "-5%",
                width: "150px",
              }}
            />
            <img
              src="/sites/enoe-energie/SiteAssets/assets/nuage%20souriant.png"
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
                src="/sites/enoe-energie/SiteAssets/assets/cloud.png"
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
              {incomingEmployees.map((item: any, index: number) => (
                <div key={index} className="dx-hp-users--item">
                  <div className="dx-hp-users--avatar">
                    <img src={item.user.imageUrl} alt="" />
                  </div>
                  <div className="dx-hp-users--content">
                    <span className="dx-hp-users--name">{item.user.text}</span>
                    <span className="dx-hp-users--position">
                      {item.jobTitle}
                    </span>
                    <span className="dx-hp-users--birthday">
                      {strings.ArrivalDate} : {formatDate(item.arrivalDate)}
                    </span>
                    <span className="dx-hp-users--hobbies">
                      {strings.Interests} : {item.hobbies}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HappyBirthDaySection;
