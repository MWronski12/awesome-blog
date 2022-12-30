import React, { Component } from "react";
import { Link } from "react-router-dom";
import blogService from "../../services/blog.service";

export default class PostListItem extends Component {
  constructor() {
    super();
    this.state = {
      post: null,
    };
  }

  componentDidMount() {
    blogService.getPost(this.props.postId).then((response) => {
      this.setState({ post: response.data });
    });
  }

  formatPostContent(content) {
    if (content.length > 200) {
      return content.slice(0, 200) + " (...)";
    } else {
      return content;
    }
  }

  render() {
    return (
      <div className="my-3">
        {this.state.post && (
          <div className="d-flex flex-column">
            <Link to={`/posts/${this.state.post.id}`}>
              <h1>{this.state.post.title}</h1>
            </Link>
            <span className="text-muted">
              {blogService.formatDate(this.state.post.createdAt)}
            </span>
            <span>
              {this.props.shortenContent
                ? this.formatPostContent(this.state.post.content)
                : this.state.post.content}
            </span>
          </div>
        )}
      </div>
    );
  }
}
