import * as React from "react";
import type { ICardArticleProps } from "./ICardArticleProps";

export default class CardArticle extends React.Component<
  ICardArticleProps,
  {}
> {
  public items: any[] = [
    {
      id: 1,
      title: "Prévention cybersécurité",
      cover:
        "https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg",
      description:
        "Lorsque nous utilisons notre PC, notre tablette ou notre smartphone, nous sommes exposé à l’évolution constante des menaces que représentent les virus informatiques et les programmes malveillants. Bien que très peu de ces...",
      author: "Maxence Laporte",
      createDate: "22 juin 2023",
    },
    {
      id: 2,
      title: "Chantage à la webcam ou à l’ordinateur prétendu piraté",
      cover:
        "https://images.pexels.com/photos/6937870/pexels-photo-6937870.jpeg",
      description: "En savoir plus",
      author: "Christian Traguany",
      createDate: "03 octobre 2023",
    },
    {
      id: 3,
      title: "Les mots de passe",
      cover:
        "https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg",
      description: "En savoir plus",
      author: "Christian Traguany",
      createDate: "03 octobre 2023",
    },
  ];

  public render(): React.ReactElement<ICardArticleProps> {
    const {} = this.props;

    return (
      <>
        <div className="row">
          {this.items.map((item, index) => (
            <div key={index} className="col-4">
              <div className="dx-card-article">
                <div className="dx-card-article--cover">
                  <img src={item.cover} alt={item.title} />
                </div>
                <div className="dx-card-article--content">
                  <span className="dx-card-article--author">
                    {item.author} • {item.createDate}
                  </span>
                  <h3 className="dx-card-article--title">{item.title}</h3>
                  <p className="dx-card-article--desc">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
