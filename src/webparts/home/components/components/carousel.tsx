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

const CarouselFC: React.FC<ICarouselProps> = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex: number) =>
      prevIndex === props.items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex: number) =>
      prevIndex === 0 ? props.items.length - 1 : prevIndex - 1
    );
  };

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 5000); 
    return () => clearInterval(interval);
  }, []); 


  return (
    <>
      <div className="dx-carousel">
        <div
          className="dx-carousel-inner"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: "transform 0.5s ease-out",
          }}
        >
          {props.items.map((item, index) => (
            <div
              key={index}
              className={`dx-carousel-item ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <img
                src={item.imageUrl}
                className="d-block w-full"
                alt={item.title}
              />
              <div className="dx-carousel-caption d-block">
                <h5>{item.title}</h5>
                <p>{item.description}</p>
                <div className="d-flex align-items-center" >
                  <button className="dx-btn dx-btn__default" type="button">
                    {item.btnLabel}
                  </button>
                  {/* <a href={item.linkUrl} className="dx-btn">
                    {item.btnLabel}
                  </a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="dx-carousel-control-prev" onClick={prevSlide}>
          <i className="pi pi-chevron-left" />
        </button>
        <button className="dx-carousel-control-next" onClick={nextSlide}>
          <i className="pi pi-chevron-right" />
        </button>
      </div>
    </>
  );
};

export default CarouselFC;
