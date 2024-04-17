import * as React from "react";
import type { IBirthdayProps } from "./IBirthdayProps";

//Style
import "../../components/assets/global.scss";

//Pnp Controls React
import { SPFI } from "@pnp/sp";
import { getSP } from "../../components/pnpjsConfig";

export default class Birthday extends React.Component<
  IBirthdayProps,
  {
    birthdays: any[];
  }
> {
  public _sp: SPFI;
  constructor(props: IBirthdayProps) {
    super(props);
    this.state = {
      birthdays: [],
    };
    this._sp = getSP();
  }
  public render(): React.ReactElement<IBirthdayProps> {
    const { position } = this.props;

    return (
      <>
        <div className={`row ${position}`}>
          <div className="col-lg-6 d-flex justify-content-center">
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
                  {this.state.birthdays.map((item: any, index: number) => (
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
                          {item.birthday}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  async componentDidMount(): Promise<void> {
    this.setState({
      birthdays: await this.retrieveAnniversariesUsers(),
    });
  }

  //Retrieve Birthdays
  public retrieveAnniversariesUsers = async () => {
    try {
      const items = await this._sp.web.lists
        .getByTitle("Anniversaires")
        .items.select("field_1", "field_3", "field_4", "field_5")();

      // Current Date for comparison
      const today = new Date();
      const currentYear = today.getFullYear();
      today.setHours(0, 0, 0, 0);

      const convertDate = (dateString: any) => {
        const [day, month] = dateString.split("/");
        return new Date(currentYear, month - 1, day);
      };

      const _items = items.map((item) => ({
        ...item,
        normalizedDate: convertDate(`${item.field_3}/${item.field_4}`),
      }));

      const filteredItems = _items
        .sort((a, b) => {
          const dateA =
            a.normalizedDate < today
              ? new Date(
                  currentYear + 1,
                  a.normalizedDate.getMonth(),
                  a.normalizedDate.getDate()
                )
              : a.normalizedDate;
          const dateB =
            b.normalizedDate < today
              ? new Date(
                  currentYear + 1,
                  b.normalizedDate.getMonth(),
                  b.normalizedDate.getDate()
                )
              : b.normalizedDate;
          return dateA - dateB;
        })
        .slice(0, 4);

      const client = await this.props.context.msGraphClientFactory.getClient();

      const resultItems = await Promise.all(
        filteredItems.map(async (item) => {
          const escapeODataString = (value: any) => value.replace(/'/g, "''");

          const userSearchUrl = `/users?$filter=startsWith(givenName,'${escapeODataString(
            item.field_5
          )}') and startsWith(surname,'${escapeODataString(item.field_1)}')`;
          try {
            const userResponse = await client
              .api(userSearchUrl)
              .version("v1.0")
              .get();
            const user = userResponse.value[0] ? userResponse.value[0] : null;
            let [day_str, month_str] = `${item.field_3}/${item.field_4}`.split(
              "/"
            );
            let map_chiffre_mois = new Map();
            map_chiffre_mois.set(1, "Jan.");
            map_chiffre_mois.set(2, "Fev.");
            map_chiffre_mois.set(3, "Mars");
            map_chiffre_mois.set(4, "Avr.");
            map_chiffre_mois.set(5, "Mai");
            map_chiffre_mois.set(6, "Juin");
            map_chiffre_mois.set(7, "Juil.");
            map_chiffre_mois.set(8, "Aout");
            map_chiffre_mois.set(9, "Sept.");
            map_chiffre_mois.set(10, "Oct.");
            map_chiffre_mois.set(11, "Nov.");
            map_chiffre_mois.set(12, "Dec.");
            let month_int: number = +month_str;
            return {
              ...item,
              birthday: `${day_str} ${map_chiffre_mois.get(month_int)}`,
              jobTitle: user?.jobTitle ?? "",
              user: {
                text: `${item.field_5} ${item.field_1}`,
                imageUrl: `${this.props.context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?UserName=${user?.mail}&size=L`,
              },
            };
          } catch (error) {
            console.error(
              "Error fetching user from Microsoft Graph",
              item.field_5,
              item.field_1,
              error
            );
            return { ...item, user: null };
          }
        })
      );

      return resultItems;
    } catch (error) {
      console.error("Failed to fetch filtered birthday list :", error);
      return [];
    }
  };
}
