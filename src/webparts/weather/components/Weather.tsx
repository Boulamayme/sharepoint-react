/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { IWeatherProps } from "./IWeatherProps";

const iconWeather1 = require("../../components/assets/images/sun_1.png");
const iconWeather2 = require("../../components/assets/images/meteo_3.png");
const iconWeather3 = require("../../components/assets/images/neige.png");
const iconWeather4 = require("../../components/assets/images/sun.png");

const iconWeather5 = require("../../components/assets/images/group65564.png");
const iconWeather6 = require("../../components/assets/images/Union.png");
const iconWeather7 = require("../../components/assets/images/subsc.png");

export default class Weather extends React.Component<IWeatherProps, {}> {
  public render(): React.ReactElement<IWeatherProps> {
    const {} = this.props;

    return (
      <>
        <div
          className="dx-weather"
          style={{
            display: "flex",
            backgroundColor: "#D5E2F6",
            padding: "20px",
            borderRadius: "5px",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            className="dx-weather--item"
            style={{
              borderRight: "1px solid #8AA8DA",
              padding: "17px 25px",
            }}
          >
            <div
              className="dx-weather--title"
              style={{
                color: "#738CB3",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Marseille
            </div>
            <div className="dx-weather--temp">
              <img src={iconWeather1} />
              <span
                className="dx-weather--temp-value"
                style={{
                  color: "#436292",
                  fontSize: "50px",
                  fontFamily: "Open Sans",
                }}
              >
                8°
                <span
                  style={{
                    color: "#738CB3",
                    fontSize: "16px",
                  }}
                >
                  Nuageux
                </span>
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather5} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  10 km/h
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather6} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  94 %
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather7} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  1 sur 11
                </span>
              </div>
            </div>
          </div>
          <div
            className="dx-weather--item"
            style={{
              borderRight: "1px solid #8AA8DA",
              padding: "17px 25px",
            }}
          >
            <div
              className="dx-weather--title"
              style={{
                color: "#738CB3",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Paris
            </div>
            <div className="dx-weather--temp">
              <img src={iconWeather2} />
              <span
                className="dx-weather--temp-value"
                style={{
                  color: "#436292",
                  fontSize: "50px",
                  fontFamily: "Open Sans",
                }}
              >
                8°
                <span
                  style={{
                    color: "#738CB3",
                    fontSize: "16px",
                  }}
                >
                  Nuageux
                </span>
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather5} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  10 km/h
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather6} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  94 %
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather7} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  1 sur 11
                </span>
              </div>
            </div>
          </div>
          <div
            className="dx-weather--item"
            style={{
              borderRight: "1px solid #8AA8DA",
              padding: "17px 25px",
            }}
          >
            <div
              className="dx-weather--title"
              style={{
                color: "#738CB3",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Biarritz
            </div>
            <div className="dx-weather--temp">
              <img src={iconWeather3} />
              <span
                className="dx-weather--temp-value"
                style={{
                  color: "#436292",
                  fontSize: "50px",
                  fontFamily: "Open Sans",
                }}
              >
                8°
                <span
                  style={{
                    color: "#738CB3",
                    fontSize: "16px",
                  }}
                >
                  Nuageux
                </span>
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather5} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  10 km/h
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather6} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  94 %
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather7} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  1 sur 11
                </span>
              </div>
            </div>
          </div>
          <div
            className="dx-weather--item"
            style={{
              borderRight: 0,
              padding: "17px 25px",
            }}
          >
            <div
              className="dx-weather--title"
              style={{
                color: "#738CB3",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Le Mans
            </div>
            <div className="dx-weather--temp">
              <img src={iconWeather4} />
              <span
                className="dx-weather--temp-value"
                style={{
                  color: "#436292",
                  fontSize: "50px",
                  fontFamily: "Open Sans",
                }}
              >
                -1 °
                <span
                  style={{
                    color: "#738CB3",
                    fontSize: "16px",
                  }}
                >
                  Nuageux
                </span>
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather5} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  10 km/h
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather6} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  94 %
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={iconWeather7} />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  1 sur 11
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
