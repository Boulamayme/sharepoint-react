import * as React from "react";
import type { IEventsCalendarProps } from "./IEventsCalendarProps";

import "../../components/assets/global.scss";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

//components
import EventsFC from "../../components/Events";

//PnPjs
import { getSP } from "../../components/pnpjsConfig";
import { SPFI } from "@pnp/sp";

export default class EventsCalendar extends React.Component<
  IEventsCalendarProps,
  {
    events: any[];
  }
> {
  private _sp: SPFI;

  constructor(props: IEventsCalendarProps) {
    super(props);
    this.state = {
      events: [],
    };
    this._sp = getSP();
  }

  public getListEvents = async () => {
    const items = await this._sp.web.lists
      .getById("590c7021-64f5-419b-9494-a73379748965")
      .items();

    this.setState({
      events: items,
    });
  };

  public async componentDidMount(): Promise<void> {
    await this.getListEvents();
  }

  public render(): React.ReactElement<IEventsCalendarProps> {
    const {} = this.props;

    return (
      <>
        {this.state.events.length > 0 && (
          <div className="row">
            <div className="col-lg-12">
              <EventsFC news={this.state.events} />
            </div>
          </div>
        )}
      </>
    );
  }
}
