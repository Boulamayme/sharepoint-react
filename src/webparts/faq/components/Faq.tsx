/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import type { IFaqProps } from "./IFaqProps";
import { DisplayMode } from "@microsoft/sp-core-library";
import { Placeholder } from "@pnp/spfx-controls-react";
import CollapseList from "../../components/CollapseList";

//PrimeReact
import { Menubar } from "primereact/menubar";

const iconSearch = require("../assets/icon_search.png");
const imgFAQ = require("../assets/faq.png");

export default class Faq extends React.Component<
  IFaqProps,
  {
    selectedCategory: any;
    filteredItems: any[];
    query: string;
  }
> {
  public itemsCategories: any[] = [
    {
      label: "Filtrer les questions",
      icon: "pi pi-sliders-h",
    },
  ];

  constructor(props: IFaqProps) {
    super(props);

    this.state = {
      selectedCategory: null,
      filteredItems: [],
      query: "",
    };
  }

  componentDidMount() {
    this.setState({
      filteredItems: this.props.items,
    });
    this.itemsCategories[0].items = [];

    this.itemsCategories[0].items.push({
      label: "Toutes les catégories",
      command: () => {
        this.setState({
          selectedCategory: null,
          filteredItems: this.props.items,
        });
      },
    });

    this.props.categories.forEach((category) => {
      this.itemsCategories[0].items.push({
        label: category.title,
        command: () => {
          this.setState({
            selectedCategory: category,
            filteredItems: this.props.items.filter(
              (item) => item.categoryId === category.id
            ),
          });
        },
      });
    });
  }

  searchItems = () => {
    //Search in title and content
    const filteredItems = this.props.items.filter(
      (item) =>
        item.title.toLowerCase().includes(this.state.query.toLowerCase()) ||
        item.content.toLowerCase().includes(this.state.query.toLowerCase())
    );

    this.setState({
      filteredItems,
    });
  };

  public render(): React.ReactElement<IFaqProps> {
    const { items } = this.props;

    return (
      <>
        <div className="dx-faq-banner mb-4">
          <img src={imgFAQ} alt="" />
          <div className="dx-faq-searchbox">
            <div className="dx-faq-searchbox-container">
              <img src={iconSearch} alt="" />
              <input
                value={this.state.query}
                type="text"
                placeholder="Rechercher une application"
                onChange={(e) =>
                  this.setState({
                    query: e.target.value,
                  })
                }
              />
            </div>
            <button
              className="dx-faq-btn"
              type="button"
              onClick={() => {
                this.searchItems();
              }}
            >
              Rechercher
            </button>
          </div>
          <div className="dx-faq-filter">
            <Menubar model={this.itemsCategories} />
          </div>
        </div>

        {items.length > 0 && (
          <div
            style={{
              background: "#F7F7FB",
              padding: "40px 0px",
              margin: "0 3rem",
              borderRadius: "20px",
            }}
          >
            <div className="row justify-content-center">
              <div className="col-8">
                <CollapseList items={this.state.filteredItems} />
              </div>
            </div>
          </div>
        )}
        {items.length === 0 && (
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
