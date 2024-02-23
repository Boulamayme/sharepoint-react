import * as React from "react";
import { useState } from "react";

//PrimeReact
import { Calendar } from "primereact/calendar";
import Title from "./Title";

const Events = (props: any) => {
  const [date, setDate] = useState(null);

  return (
    <>
      <div
        className="dx-events"
        style={{ background: "#E6ECF6", color: "#fff", padding: "2rem" }}
      >
        <Title title="Prochains évènements" />
        <div className="row">
          <div className="col-auto">
            <Calendar
              className="dx-events--calendar"
              value={date}
              onChange={(e: any) => setDate(e.value)}
              inline
            />
          </div>
          <div className="col">
            <div className="dx-schedule  ms-3">
              <div className="dx-schedule__dates me-3">
                <div className="dx-schedule__date text-center">
                  06
                  <span>juin</span>
                </div>
                <div className="dx-schedule__date text-center dx-schedule__date--selected">
                  08
                  <span>juin</span>
                </div>
                <div className="dx-schedule__date text-center">
                  09
                  <span>juin</span>
                </div>
              </div>
              <div className="dx-schedule__events">
                <div className="dx-schedule__event">
                  <span>Evènement</span>
                  <p className="mt-1">
                    Conversion angel investor entrepreneur first mover advantage
                    Conversion angel investor entrepreneur
                  </p>
                </div>
                <div className="dx-schedule__event">
                  <span>Evènement</span>
                  <p className="mt-1">
                    Conversion angel investor entrepreneur first mover advantage
                    Conversion angel investor entrepreneur
                  </p>
                </div>
                <div className="dx-schedule__event">
                  <span>Evènement</span>
                  <p className="mt-1">
                    Conversion angel investor entrepreneur first mover advantage
                    Conversion angel investor entrepreneur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
