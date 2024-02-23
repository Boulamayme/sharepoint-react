import * as React from "react";

interface ICarouselItem {
  imageUrl: string;
  title: string;
  description: string;
  linkUrl: string;
  btnLabel: string;
}

interface ICarouselProps {
  items: ICarouselItem[];
}

const Carousel: React.FC<ICarouselProps> = (props) => {
  return (
    <>
      <div className="carousel">
        <div className="carousel-inner">
          {props.items.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={item.imageUrl}
                className="d-block w-full"
                alt={item.title}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{item.title}</h5>
                <p>{item.description}</p>
                <a href={item.linkUrl} className="btn btn-primary">
                  {item.btnLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
