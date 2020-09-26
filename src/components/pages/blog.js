import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false,
        };

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener("scroll", this.onScroll, false);
        this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(
            this
        );
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(blog) {
        axios
            .delete(
                `https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,
                { withCredentials: true }
            )
            .then((response) => {
                this.setState({
                    blogItems: this.state.blogItems.filter((blogItem) => {
                        return blog.id !== blogItem.id;
                    }),
                });

                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSuccessfulNewBlogSubmission(blog) {
        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems),
        });
    }

    handleModalClose() {
        this.setState({
            blogModalIsOpen: false,
        });
    }

    handleNewBlogClick() {
        this.setState({
            blogModalIsOpen: true,
        });
    }

    onScroll() {
        if (
            this.state.isLoading ||
            this.state.blogItems.length === this.state.totalCount
        ) {
            return;
        }

        if (
            Math.round(
                window.innerHeight + document.documentElement.scrollTop
            ) === document.documentElement.offsetHeight
        ) {
            this.getBlogItems();
        }
    }

    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1,
        });
        axios
            .get(
                `https://briandeanullery.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
                { withCredentials: true }
            )
            .then((response) => {
                console.log("More!", response.data);
                this.setState({
                    blogItems: this.state.blogItems.concat(
                        response.data.portfolio_blogs
                    ),
                    totalCount: response.data.meta.total_records,
                    isLoading: false,
                });
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    componentWillMount() {
        this.getBlogItems();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false);
    }

    render() {
        const blogRecords = this.state.blogItems.map((blogItem) => {
            if (this.props.loggedInStatus === "LOGGED_IN") {
                if (blogItem.id != null) {
                    return (
                        <div key={blogItem.id} className="admin-blog-wrapper">
                            <BlogItem key={blogItem.id} blogItem={blogItem} />
                            <a onClick={() => this.handleDeleteClick(blogItem)}>
                                <FontAwesomeIcon icon="trash" />
                            </a>
                        </div>
                    );
                } else {
                    return (
                        <h1>
                            No Blogs Yet! Click The Blue Button To Make One!
                        </h1>
                    );
                }
            } else {
                if (blogItem.id != null) {
                    return <BlogItem key={blogItem.id} blogItem={blogItem} />;
                } else {
                    return (
                        <center>
                            <h1>No Blogs Yet!</h1>
                        </center>
                    );
                }
            }
        });

        return (
            <div className="blog-container">
                <BlogModal
                    handleSuccessfulNewBlogSubmission={
                        this.handleSuccessfulNewBlogSubmission
                    }
                    handleModalClose={this.handleModalClose}
                    modalIsOpen={this.state.blogModalIsOpen}
                />

                {this.props.loggedInStatus === "LOGGED_IN" ? (
                    <div className="new-blog-link">
                        <a onClick={this.handleNewBlogClick}>
                            <FontAwesomeIcon icon="plus-square" />
                        </a>
                    </div>
                ) : null}

                <div className="content-container">{blogRecords}</div>

                {this.state.isLoading ? (
                    <div className="content-loader">
                        <FontAwesomeIcon icon="spinner" spin />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Blog;
