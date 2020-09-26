import axios from "axios";
import React, { Component } from "react";

export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolioItem: {},
        };
    }

    componentWillMount() {
        this.getPortfolioItem();
    }

    getPortfolioItem() {
        axios
            .get(
                `https://briandeanullery.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`,
                { withCredentials: true }
            )
            .then((response) => {
                this.setState({
                    portfolioItem: response.data.portfolio_item,
                });
            })
            .catch((error) => {
                console.log("errrrrror", error);
            });
    }

    render() {
        const {
            description,
            logo_url,
            name,
            thumb_image_url,
            url,
        } = this.state.portfolioItem;

        return (
            <div className="blog-detail-wrapper">
                <center>
                    <div className="thumb_image_wrapper">
                        <img src={thumb_image_url} className="thumb_image" />
                    </div>

                    <h1>
                        <mark className="name">{name}</mark>
                    </h1>
                    <div className="spacer"></div>
                    <mark className="description">{description}</mark>
                </center>
                <a href={url}>
                    <img className="logo" src={logo_url} />
                </a>
            </div>
        );
    }
}
