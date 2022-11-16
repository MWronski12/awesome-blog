import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import authService from "../../services/auth.service";
import blogService from "../../services/blog.service";
import CommentSection from "../comment/comment-section.component";
import PostListItem from "./post-list-item.component";

class PostDetails extends Component {
  constructor() {
    super();

    this.state = {
      showAdminContent: false,
    };

    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const user = authService.getCurrentUser();

    if (user) {
      this.setState({
        showAdminContent: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  onDelete() {
    blogService.deletePost(this.props.postId).then((response) => {
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div className="mt-5">
        {this.state.showAdminContent && (
          <button className="btn btn-danger" onClick={this.onDelete}>
            Delete
          </button>
        )}
        <PostListItem postId={this.props.postId} />
        <CommentSection postId={this.props.postId} />
      </div>
    );
  }
}

export default withRouter(PostDetails);
