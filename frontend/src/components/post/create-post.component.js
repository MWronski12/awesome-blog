import React, { Component } from "react";
import blogService from "../../services/blog.service";
import authService from "../../services/auth.service";
import { withRouter } from "react-router-dom";

class CreatePost extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      content: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    blogService
      .createPost({
        title: this.state.title,
        content: this.state.content,
        userId: authService.getCurrentUser().id,
      })
      .then((response) => {
        this.setState({ title: "", content: "" });
        this.props.history.push(`/posts/${response.data.postId}`);
      });
  }

  onTitleChange(e) {
    this.setState({ ...this.state, title: e.target.value });
  }

  onContentChange(e) {
    this.setState({ ...this.state, content: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={this.onTitleChange}
              value={this.state.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Post content
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={this.onContentChange}
              value={this.state.content}
            ></textarea>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(CreatePost);
