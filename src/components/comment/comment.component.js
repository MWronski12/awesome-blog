import React, { Component } from "react";
import BlogService from "../../services/blog.service";

export default class Comment extends Component {
  constructor() {
    super();
    this.state = {
      comment: null,
      username: null,
    };
  }

  componentDidMount() {
    BlogService.getComment(this.props.id)
      .then((response) => {
        this.setState({ ...this.state, comment: response.data });
      })
      .then(() =>
        BlogService.getUserName(this.state.comment.userId).then((response) => {
          this.setState({
            ...this.state,
            username: response.data.username,
          });
        })
      );
  }

  render() {
    return (
      <div className="my-1">
        {this.state.comment && this.state.username && (
          <div className="d-flex flex-column">
            <span>
              <span>{this.state.username + " "}</span>
              <span className="text-muted">
                {BlogService.formatDate(this.state.comment.createdAt)}
              </span>
            </span>
            <span>{this.state.comment.content}</span>
          </div>
        )}
      </div>
    );
  }
}
