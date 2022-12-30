import React, { Component } from "react";

import AddComment from "./add-comment.component";
import CommentList from "./comment-list.component";

export default class CommentSection extends Component {
  constructor() {
    super();

    this.state = {
      newCommentEvent: 0,
    };

    this.newCommentCallback = this.newCommentCallback.bind(this);
  }

  newCommentCallback() {
    this.setState({ newCommentEvent: this.state.newCommentEvent + 1 });
  }

  render() {
    return (
      <div className="mb-5">
        <h1>Comments</h1>
        <AddComment
          postId={this.props.postId}
          newCommentCallback={this.newCommentCallback}
        />
        <CommentList
          newCommentEvent={this.state.newCommentEvent}
          postId={this.props.postId}
        />
      </div>
    );
  }
}
