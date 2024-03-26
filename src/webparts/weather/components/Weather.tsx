/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { IWeatherProps } from "./IWeatherProps";

const iconWeatherRain = require("../../components/assets/images/rain.png");
const iconWeatherSnow = require("../../components/assets/images/snow.png");
const iconWeatherClear = require("../../components/assets/images/clear.png");
const iconWeatherClouds = require("../../components/assets/images/clouds.png");

const iconWeather5 = require("../../components/assets/images/group65564.png");
const iconWeather6 = require("../../components/assets/images/Union.png");

export default class Weather extends React.Component<
  IWeatherProps,
  {
    weatherData: Array<{
      country: string;
      loading: boolean;
      data?: {
        temperature?: number;
        weatherCondition?: string;
        weatherIcon?: string;
        windSpeed?: number;
        humidity?: number;
      };
      error?: boolean;
    }>;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      weatherData: this.props.countries.map((country) => ({
        country: country,
        loading: true,
        data: {},
        error: false,
      })),
    };
  }
  public search = async (country: string) => {
    const apiKey = "f00c38e0279b7bc85480c3fe775d518c";
    const url = "https://api.openweathermap.org/data/2.5/weather";
    try {
      const response = await fetch(
        `${url}?q=${encodeURIComponent(
          country
        )}&units=metric&appid=${apiKey}&lang=fr`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Weather condition mapping
      const weatherMapping: any = {
        Snow: { icon: iconWeatherSnow, description: "Neige" },
        Rain: { icon: iconWeatherRain, description: "Pluie" },
        Clear: { icon: iconWeatherClear, description: "Clair" },
        Clouds: { icon: iconWeatherClouds, description: "nuages" },
        Thunderstorm: { icon: iconWeatherRain, description: "Tempête" },
        Atmosphere: { icon: iconWeatherRain, description: "Atmosphère" },
      };

      const mainWeather = data.weather[0].main;
      const mappedWeather = weatherMapping[mainWeather] || {
        icon: null,
        description: data.weather[0].description,
      };

      // Updating state with the new weather data
      this.setState((prevState) => ({
        weatherData: prevState.weatherData.map((item) =>
          item.country === country
            ? {
                ...item,
                data: {
                  temperature: Math.round(data.main.temp),
                  weatherCondition: mappedWeather.description,
                  weatherIcon: mappedWeather.icon,
                  windSpeed: data.wind.speed,
                  humidity: data.main.humidity,
                },
                loading: false,
              }
            : item
        ),
      }));
    } catch (error) {
      console.error("Error fetching weather data for country:", country, error);
      this.setState((prevState) => ({
        weatherData: prevState.weatherData.map((item) =>
          item.country === country
            ? { ...item, loading: false, error: true }
            : item
        ),
      }));
    }
  };
  componentDidMount(): void {
    this.props.countries.forEach((country) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.search(country);
    });
  }
  public render(): React.ReactElement<IWeatherProps> {
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
          {this.state.weatherData.map((countryWeather, index) => (
            <div
              key={index}
              className="dx-weather--item"
              style={{
                borderRight:
                  index !== this.state.weatherData.length - 1
                    ? "1px solid #8AA8DA"
                    : undefined,
              }}
            >
              {countryWeather.loading ? (
                <p>Loading...</p>
              ) : countryWeather.error ? (
                <p>Error loading weather data</p>
              ) : (
                <>
                  <div
                    className="dx-weather--title"
                    style={{
                      color: "#738CB3",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {countryWeather.country}
                  </div>
                  <div className="dx-weather--temp">
                    <div
                      style={{
                        width: "140px",
                        height: "115px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={countryWeather.data?.weatherIcon}
                        alt="Weather icon"
                      />
                    </div>

                    <span
                      className="dx-weather--temp-value"
                      style={{
                        color: "#436292",
                        fontSize: "50px",
                        fontFamily: "Open Sans",
                      }}
                    >
                      {countryWeather.data?.temperature}°
                      <span
                        style={{
                          color: "#738CB3",
                          fontSize: "16px",
                        }}
                      >
                        {countryWeather.data?.weatherCondition}
                      </span>
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    {/* Wind Speed */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img src={iconWeather5} alt="Wind icon" />
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                        }}
                      >
                        {countryWeather.data?.windSpeed} km/h
                      </span>
                    </div>
                    {/* Humidity */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img src={iconWeather6} alt="Humidity icon" />
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                        }}
                      >
                        {countryWeather.data?.humidity} %
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }
}
