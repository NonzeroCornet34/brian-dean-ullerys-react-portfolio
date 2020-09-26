import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: [],
        };

        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        if (filter === "CLEAR_FILTERS") {
            this.getPortfolioItems();
        } else {
            this.getPortfolioItems(filter);
        }
    }
    getPortfolioItems(filter = null) {
        axios
            .get(
                "https://briandeanullery.devcamp.space/portfolio/portfolio_items"
            )
            .then((res) => {
                if (filter) {
                    this.setState({
                        data: res.data.portfolio_items.filter((item) => {
                            return item.category === filter;
                        }),
                    });
                } else {
                    this.setState({
                        data: res.data.portfolio_items,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(
                "https://briandeanullery.devcamp.space/portfolio/portfolio_items",
                {}
            )
            .catch(function (error) {
                console.log(error);
            });
    }

    portfolioItems() {
        return this.state.data.map((item) => {
            return <PortfolioItem key={item.id} item={item} />;
        });
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="homepage-wrapper">
                <div className="filter-links">
                    <button
                        className="btn"
                        onClick={() => this.handleFilter("Website")}
                    >
                        Website
                    </button>
                    <button
                        className="btn"
                        onClick={() => this.handleFilter("Enterprise")}
                    >
                        Enterprise
                    </button>
                    <button
                        className="btn"
                        onClick={() => this.handleFilter("Other")}
                    >
                        Other
                    </button>
                    <button
                        className="btn"
                        onClick={() => this.handleFilter("CLEAR_FILTERS")}
                    >
                        All
                    </button>
                </div>
                <div className="portfolio-items-wrapper">
                    {this.portfolioItems()}
                </div>
            </div>
        );
    }
}
