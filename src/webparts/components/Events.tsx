/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import { useState } from "react";

//PrimeReact
import { Calendar } from "primereact/calendar";
import Title from "./Title";
import { formatDate } from "./helpers/helpers";
import * as strings from "HomeWebPartStrings";
import { InputText } from "primereact/inputtext";

const iconAgenda = require("./assets/images/agenda.png");

const EventsFC = (props: any) => {
  const { news } = props;
  const [date, setDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(news);

  const startOfDay = (date: any) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  const dateEventTemplate = (dateMeta: any) => {
    const checkDate = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
    if (
      news.some(
        (event: any) =>
          startOfDay(new Date(event.EventDate)) === startOfDay(checkDate)
      )
    ) {
      return (
        <span
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f3f4f6",
            color: "#1F2023",
          }}
        >
          {dateMeta.day}
        </span>
      );
    }
    return dateMeta.day;
  };

  const addToCalendar = (event: any) => {
    window.open(
      `https://outlook.office.com/calendar/deeplink/compose?body=${encodeURIComponent(
        event.Description ? event.Description : ""
      )}&enddt=${new Date(
        event.EventDate
      ).toISOString()}&location=location&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${new Date(
        event.EndDate
      ).toUTCString()}&subject=${event.Title}`
    );
  };
  const handleSearchEvent = (search: string) => {
    //Search in title and description
    const filteredEvents = news.filter((event: any) => {
      return (
        event.Description.toLowerCase().includes(search.toLowerCase()) ||
        event.Title.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearch(search);
    setFilteredEvents(filteredEvents);
  };

  React.useEffect(() => {
    const filteredEvents = news.filter((event: any) => {
      return startOfDay(new Date(event.EventDate)) >= startOfDay(date);
    });
    setFilteredEvents(filteredEvents);
  }, [date]);

  return (
    <>
      <div
        className="dx-events"
        style={{
          background: "#E6ECF6",
          color: "#fff",
          padding: "2rem",
        }}
      >
        <div className="row d-flex align-items-center justify-content-between">
          <div className="col-lg-auto mb-3">
            <Title title="Prochains évènements" />
          </div>
          <div className="col-lg-3">
            <div className="dx-events--search">
              <span className="p-input-icon-left w-100">
                <i className="pi pi-search" />
                <InputText
                  value={search}
                  placeholder="Search"
                  className="w-100"
                  onChange={(e) => {
                    handleSearchEvent(e.target.value);
                  }}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <Calendar
              className="dx-events--calendar w-100"
              value={date}
              onChange={(e: any) => setDate(e.value)}
              inline
              dateTemplate={dateEventTemplate}
            />
          </div>
          <div className="col-lg">
            <div className="dx-schedule ms-3">
              <div className="dx-schedule__events mt-4">
                {filteredEvents.map((event: any, index: number) => (
                  <div
                    className="dx-schedule__event d-flex flex-column justify-content-between h-100"
                    key={index}
                  >
                    <div>
                      <span>{formatDate(event.EventDate)}</span>
                      <h3>{event.Title}</h3>
                      <p
                        className="mt-1 mb-2"
                        dangerouslySetInnerHTML={{
                          __html: event.Description,
                        }}
                      />
                    </div>

                    <div
                      className="dx-schedule__event-agenda dx-cursor"
                      onClick={() => addToCalendar(event)}
                    >
                      <span>{strings.AddToCalendar}</span>
                      <img src={iconAgenda} alt="" />
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
};

export default EventsFC;
