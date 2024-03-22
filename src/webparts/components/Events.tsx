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
          startOfDay(new Date(event.publishedDate)) === startOfDay(checkDate)
      )
    ) {
      return <span style={{ color: "#1F2023" }}>{dateMeta.day}</span>;
    }
    return dateMeta.day;
  };

  const addToCalendar = (event: any) => {
    window.open(
      `https://outlook.office.com/calendar/deeplink/compose?body=${encodeURIComponent(
        event.description
      )}&enddt=${new Date(
        event.publishedDate
      ).toISOString()}&location=location&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${new Date(
        event.publishedDate
      ).toUTCString()}&subject=${event.title}`
    );
  };
  const handleSearchEvent = (search: string) => {
    //Search in title and description
    const filteredEvents = news.filter((event: any) => {
      return (
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.title.toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearch(search);
    setFilteredEvents(filteredEvents);
  };
  return (
    <>
      <div
        className="dx-events"
        style={{
          background: "#E6ECF6",
          color: "#fff",
          padding: "2rem",
          height: "560px",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="col-auto">
            <Title title="Prochains évènements" />
          </div>
          <div className="col-3">
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
          <div className="col-auto">
            <Calendar
              className="dx-events--calendar"
              value={date}
              onChange={(e: any) => setDate(e.value)}
              inline
              dateTemplate={dateEventTemplate}
            />
          </div>
          <div className="col">
            <div className="dx-schedule ms-3">
              <div className="dx-schedule__events mt-4">
                {filteredEvents.map((event: any, index: number) => (
                  <div className="dx-schedule__event" key={index}>
                    <span>{formatDate(event.publishedDate)}</span>
                    <h3>{event.title}</h3>
                    <p className="mt-1 mb-2">{event.description}</p>
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
