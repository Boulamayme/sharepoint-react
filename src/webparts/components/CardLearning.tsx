/* eslint-disable @typescript-eslint/no-var-requires */

import { Rating } from "primereact/rating";
import * as React from "react";

const iconVideo = require("./assets/images/video.svg");
const iconTime = require("./assets/images/time.svg");

interface ICardLearningProps {
  title: string;
  rating: number;
  category: string;
  description: string;
  duration: string;
  courses: number;
  link: string;
  cover: string;
  btnLabel: string;
}
const CardLearningFC: React.FC<ICardLearningProps> = (props) => {
  const navigateTo = (url: string): void => {
    window.open(url, "_self");
  };
  return (
    <>
      <div className="dx-card dx-card-lm h-100">
        <div className="dx-card-lm-header">
          <img src={props.cover} alt="" />
        </div>
        <div className="dx-card-lm-content mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <span className="dx-card-lm-category">{props.category}</span>
            <div className="dx-card-lm-rating">
              <Rating value={props.rating} cancel={false} readOnly />
            </div>
          </div>
          <h3 className="dx-card-lm-title mb-3 mt-1">{props.title}</h3>
          {/* <p className="dx-card-lm-desc">{props.description}</p> */}
        </div>
        <div className="dx-card-lm-footer">
          <div className="mb-3 d-flex justify-content-between">
            <span className="dx-card-lm-duration me-2">
              <img src={iconTime} alt="Time" />
              <span className="ms-2">{props.duration}</span>
            </span>
            {props.courses && (
              <span className="dx-card-lm-courses d-flex align-items-center">
                <img src={iconVideo} alt="Video" />
                <span className="ms-2">{props.courses} Courses</span>
              </span>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="dx-card-btn"
              onClick={() => navigateTo(props.link)}
            >
              {props.btnLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardLearningFC;
