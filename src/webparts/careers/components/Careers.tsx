import * as React from "react";
import type { ICareersProps } from "./ICareersProps";
import {
  ICareer,
  ICategoryCareer,
} from "../../components/models/careers.model";
import { Placeholder } from "@pnp/spfx-controls-react";
import { DisplayMode } from "@microsoft/sp-core-library";
import * as strings from "CareersWebPartStrings";
import { formatDate } from "../../components/helpers/helpers";

export default class Careers extends React.Component<
  ICareersProps,
  {
    careers: ICareer[];
    categories: ICategoryCareer[];
    selectedCategory: string;
  }
> {
  constructor(props: ICareersProps) {
    super(props);
    this.state = {
      careers: [],
      categories: [],
      selectedCategory: "",
    };
  }

  componentDidMount(): void {
    if (this.state.selectedCategory === "") {
      this.setState({
        selectedCategory: this.props.categories[0].title,
        careers: this.props.careers.filter(
          (item) => item.category === this.props.categories[0].title
        ),
      });
    }
  }

  handleEventSelectedCategory = (category: any): void => {
    this.setState({ selectedCategory: category.title });
    this.setState({
      careers: this.props.careers.filter(
        (item) => item.category === category.title
      ),
    });
  };

  public render(): React.ReactElement<ICareersProps> {
    return (
      <>
        {this.props.categories.length > 0 && (
          <div className="dx-careers">
            <div className="row">
              <div className="col-3">
                <ul className="dx-careers-categories">
                  {this.props.categories.map((category, index) => (
                    <li
                      key={index}
                      className={`dx-careers-categories--item ${
                        this.state.selectedCategory === category.title &&
                        "dx-careers-categories--item__selected"
                      }`}
                      onClick={() => this.handleEventSelectedCategory(category)}
                    >
                      {category.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-9">
                <div className="row">
                  {this.state.careers.length > 0 ? (
                    this.state.careers.map((item, index) => (
                      <div key={index} className="col-6">
                        <div className="dx-careers-item">
                          <span className="dx-careers-item--time">
                            {formatDate(item.publishedDate)}
                          </span>
                          <h5 className="dx-careers-item--title">
                            {item.title}
                          </h5>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="dx-careers-item--category align-items-center">
                              {item.category}
                            </span>
                            <span className="dx-careers-item--label">
                              {item.label}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between ">
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="dx-careers-item--contract me-2">
                                {item.contract}
                              </span>
                              <span className="dx-careers-item--location">
                                {item.location}
                              </span>
                            </div>
                            <div>
                              <a
                                className="dx-careers-item--link"
                                href={item.url}
                              >
                                Postuler
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="dx-careers--nodata">
                      {strings.NoOffersFound}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {this.props.categories.length === 0 && (
          <Placeholder
            iconName="Edit"
            iconText="Configure your web part"
            description="Please configure the web part."
            buttonLabel="Configure"
            hideButton={this.props.displayMode === DisplayMode.Read}
            onConfigure={this.props.onConfigurePropPane}
          />
        )}
      </>
    );
  }
}
