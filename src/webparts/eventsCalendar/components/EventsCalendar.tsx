import * as React from "react";
import type { IEventsCalendarProps } from "./IEventsCalendarProps";

import "../../components/assets/global.scss";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import EventsFC from "../../components/Events";
import { Placeholder } from "@pnp/spfx-controls-react";

export default class EventsCalendar extends React.Component<
  IEventsCalendarProps,
  {}
> {
  public render(): React.ReactElement<IEventsCalendarProps> {
    const { events } = this.props;

    return (
      <>
        {events.length > 0 && (
          <div className="row">
            <div className="col-lg-12">
              <EventsFC news={events} />
            </div>
          </div>
        )}

        {events.length === 0 && (
          <Placeholder
            iconName="Edit"
            iconText="Configure your web part"
            description="Please configure the web part."
            buttonLabel="Configure"
            onConfigure={this.props.onConfigurePropPane}
          />
        )}
      </>
    );
  }
}
