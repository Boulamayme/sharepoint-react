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
import { LIST_EVENTS_ID } from "../../data/constants";

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
    // Check if selected categories is not empty
    if (this.props.categories.length > 0) {
      const filterQuery = this.props.categories
        .map((category: string) => `Category eq '${category}'`)
        .join(" or ");

      const items = await this._sp.web.lists
        .getById(LIST_EVENTS_ID)
        .items.filter(filterQuery)();

      this.setState({
        events: items,
      });
    } else {
      // If Categories is empty, get all events
      const items = await this._sp.web.lists.getById(LIST_EVENTS_ID).items();
      this.setState({
        events: items,
      });
    }
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
