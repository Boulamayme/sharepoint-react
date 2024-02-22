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
                className="d-block w-100"
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
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </>
  );
};

export default Carousel;
