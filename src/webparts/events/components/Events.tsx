/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import type { IEventsProps } from "./IEventsProps";
import { SPFI } from "@pnp/sp";
import { getSP } from "../../components/pnpjsConfig";
import * as strings from "EventsWebPartStrings";

//Icons
const iconArrowUp = require("../../components/assets/images/arrow_up.png");
const iconArrowDown = require("../../components/assets/images/arrow_down.png");

const iconCalendar = require("../../components/assets/images/calendar.png");
const iconPin = require("../../components/assets/images/pin.png");
const iconMessage = require("../../components/assets/images/message.png");

export default class Events extends React.Component<
  IEventsProps,
  {
    events: any[];
    libraryImages: any[];
    selectedEvent: any;
    countdown: {
      days: number;
      hours: number;
      minutes: number;
    };
  }
> {
  private _sp: SPFI;

  constructor(props: IEventsProps) {
    super(props);
    this.state = {
      libraryImages: [],
      events: [],
      selectedEvent: null,
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0,
      },
    };

    this._sp = getSP();
  }

  public componentDidMount(): void {
    this.getListEvents();
  }

  // Retrieves images related to the selected event from a SharePoint library.
  getLibraryImages = async (libraryName: string) => {
    const list = this._sp.web.lists.getByTitle(this.props.libraryName.title);
    const items = await list.items
      .select("EncodedAbsUrl", "EventSettings/Title")
      .expand("EventSettings")
      .filter(`EventSettings/Title eq '${this.state.selectedEvent.Title}'`)();

    this.setState({ libraryImages: items });
  };

  // Fetches the list of events from a SharePoint list and sets the initial selected event.
  getListEvents = async () => {
    const list = this._sp.web.lists.getByTitle("Events");
    const items = await list.items.filter(
      `CategorySettings eq '${this.props.libraryName.title}'`
    )();
    this.setState({ events: items, selectedEvent: items[0] });

    if (items.length > 0) {
      if (items[0].NextEvent) {
        this.generateCountdown(items[0].NextEvent);
      }
      this.getLibraryImages(items[0].Title);
    }
  };

  // Handles selection of the previous event in the list.
  private selectPreviousEvent = () => {
    const currentIndex = this.state.events.findIndex(
      (event) => event.Title === this.state.selectedEvent.Title
    );
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      this.setState({ selectedEvent: this.state.events[previousIndex] });
      this.generateCountdown(this.state.events[previousIndex].NextEvent);

      this.getLibraryImages(this.state.events[previousIndex].Title);
    }
  };

  // Handles selection of the next event in the list, with wrapping to the first event if currently at the last event.
  private selectNextEvent = () => {
    const currentIndex = this.state.events.findIndex(
      (event) => event.Title === this.state.selectedEvent.Title
    );
    const nextIndex = (currentIndex + 1) % this.state.events.length;
    this.setState({ selectedEvent: this.state.events[nextIndex] });
    this.generateCountdown(this.state.events[nextIndex].NextEvent);
    this.getLibraryImages(this.state.events[nextIndex].Title);
  };

  private generateCountdown = (eventDate: string): void => {
    const _eventDate = new Date(eventDate);
    const now = new Date();
    const diff = _eventDate.getTime() - now.getTime();
    //if is old date set countdown to 0
    if (diff < 0) {
      this.setState({ countdown: { days: 0, hours: 0, minutes: 0 } });
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    this.setState({ countdown: { days, hours, minutes } });
  };

  public render(): React.ReactElement<IEventsProps> {
    const { description } = this.props;

    return (
      <>
        {/* Banner */}
        {this.props.coverImage && this.props.coverImage.fileAbsoluteUrl && (
          <div
            className="dx-event-banner"
            style={{
              backgroundImage: `url('${this.props.coverImage.fileAbsoluteUrl}')`,
            }}
          >
            <h3 className="dx-event-banner--title">{this.state.selectedEvent && this.state.selectedEvent.Title}</h3>
            <div className="dx-event-banner--date">
              <span className="dx-event-banner--date-item">
                {this.state.countdown.days}
                <span>{strings.Days}</span>
              </span>
              <span className="dx-event-banner--date-item">
                {this.state.countdown.hours}
                <span>{strings.Hours}</span>
              </span>
              <span className="dx-event-banner--date-item">
                {this.state.countdown.minutes}
                <span>{strings.Minutes}</span>
              </span>
            </div>
            <p className="dx-event-banner--desc">{description}</p>
            <button
              className="dx-event-banner--btn"
              type="button"
              onClick={() => {
                window.open(this.state.selectedEvent.Lien, "_blank");
              }}
            >
              {strings.Register}
            </button>
          </div>
        )}

        <div className="m-5">
          {/* Navigation Events */}
          {this.state.events.length > 1 && (
            <div className="dx-events">
              {this.state.events.findIndex(
                (event) => event.Title === this.state.selectedEvent.Title
              ) > 0 && (
                <div
                  className="dx-events--btn"
                  onClick={this.selectPreviousEvent}
                >
                  <img
                    className="dx-cursor"
                    src={iconArrowUp}
                    alt="previous event"
                  />
                  {
                    this.state.events[
                      this.state.events.findIndex(
                        (event) =>
                          event.Title === this.state.selectedEvent.Title
                      ) - 1
                    ].Title
                  }
                </div>
              )}
              {this.state.events.findIndex(
                (event) => event.Title === this.state.selectedEvent.Title
              ) <
                this.state.events.length - 1 && (
                <div className="dx-events--btn" onClick={this.selectNextEvent}>
                  <img
                    className="dx-cursor"
                    src={iconArrowDown}
                    alt="next event"
                  />
                  {
                    this.state.events[
                      this.state.events.findIndex(
                        (event) =>
                          event.Title === this.state.selectedEvent.Title
                      ) + 1
                    ].Title
                  }
                </div>
              )}
            </div>
          )}

          {/* Current Event */}
          <div className="dx-event-current my-5">
            {this.state.selectedEvent && (
              <>
                {/* Date */}
                <div className="dx-event-current--item">
                  <img src={iconCalendar} alt="" />
                  <span className="dx-event-current--label">
                    {strings.Date}:
                    <span className="ms-2">
                      {this.state.selectedEvent.EventDate}
                    </span>
                  </span>
                </div>
                {/* Place */}
                <div className="dx-event-current--item">
                  <img src={iconPin} alt="" />
                  <span className="dx-event-current--label">
                    {strings.Place}:
                    <span className="ms-2">
                      {this.state.selectedEvent.LocationSettings}
                    </span>
                  </span>
                </div>
                {/* Description */}
                <div
                  className="dx-event-current--item"
                  style={{
                    gridColumn: "span 2",
                  }}
                >
                  <img src={iconMessage} alt="" />
                  <span className="dx-event-current--label">
                    {strings.PropertyPaneDescription}:
                    <span className="ms-2">
                      {this.state.selectedEvent.DescriptionSettings}
                    </span>
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Gallery */}
          <div className="dx-event-gallery">
            {this.state.libraryImages.map((image: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`dx-event-gallery--item ${
                    index % 3 === 1 ? "wide" : "standard"
                  }`}
                >
                  <div className="dx-event-gallery--image-wrapper">
                    <img src={image.EncodedAbsUrl} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
