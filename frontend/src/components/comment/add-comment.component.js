import React, { Component } from "react";
import authService from "../../services/auth.service";
import blogService from "../../services/blog.service";

export default class AddComment extends Component {
  constructor() {
    super();

    this.state = {
      user: undefined,
      comment: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const user = authService.getCurrentUser();
    if (user) {
      this.setState({ ...this.state, user: user });
    }
  }

  onChange(e) {
    this.setState({ ...this.state, comment: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    blogService
      .createComment({
        userId: this.state.user.id,
        postId: this.props.postId,
        content: this.state.comment,
      })
      .then((response) => {
        this.setState({ ...this.state, comment: "" });
        this.props.newCommentCallback();
      });
  }

  render() {
    return (
      <div>
        {this.state.user && (
          <form
            className="w-100 my-3 d-flex flex-column"
            onSubmit={this.onSubmit}
          >
            <label htmlFor="comment" className="form-label">
              Add Comment
            </label>
            <span className="d-flex">
              <input
                type="text"
                className="form-control flex-grow-1 mr-3"
                id="comment"
                onChange={this.onChange}
                value={this.state.comment}
              />
              <button type="submit" className="btn btn-secondary">
                Submit
              </button>
            </span>
          </form>
        )}
      </div>
    );
  }
}
