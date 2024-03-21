import * as React from "react";
import { useState } from "react";

//PrimeReact
import { Calendar } from "primereact/calendar";
import Title from "./Title";
import { formatDate } from "./helpers/helpers";
import * as strings from "HomeWebPartStrings";

const iconAgenda = require("./assets/images/agenda.png");

const EventsFC = (props: any) => {
  const { news } = props;
  const [date, setDate] = useState(new Date());

  const startOfDay = (date: any) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  // Custom date template to highlight event days
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

  // React.useEffect(() => {
  //   // Filter events based on the selected date
  //   const filtered = news.filter((event: any) => {
  //     const eventDateStart = startOfDay(new Date(event.publishedDate));
  //     const selectedDateStart = startOfDay(date);
  //     const dayBefore = startOfDay(
  //       new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
  //     );
  //     const dayAfter = startOfDay(
  //       new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
  //     );

  //     return (
  //       eventDateStart === selectedDateStart ||
  //       eventDateStart === dayBefore ||
  //       eventDateStart === dayAfter
  //     );
  //   });
  //   setFilteredEvents(filtered);
  // }, [date, news]);

  const addToCalendar = (event: any) => {
    window.open(
      `https://outlook.office.com/calendar/0/deeplink/compose?subject=${event.title}&startdt=${event.publishedDate}&enddt=${event.publishedDate}&body=${event.description}`
    );
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
        <Title title="Prochains évènements" />
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
              <div className="dx-schedule__events">
                {news.map((event: any, index: number) => (
                  <div className="dx-schedule__event" key={index}>
                    <span>{formatDate(event.publishedDate)}</span>
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
