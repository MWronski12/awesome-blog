import React, { Component } from "react";
import Comment from "./comment.component";
import BlogService from "../../services/blog.service";

export default class CommentList extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      newCommentEvent: 0,
    };

    this.newCommentCallback = this.newCommentCallback.bind(this);
  }

  componentDidMount() {
    BlogService.getPostComments(this.props.postId).then((response) => {
      this.setState({ ...this.state, comments: response.data });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.newCommentEvent !== this.props.newCommentEvent) {
      BlogService.getPostComments(this.props.postId).then((response) => {
        this.setState({ ...this.state, comments: response.data });
      });
    }
  }

  newCommentCallback() {
    this.setState({
      ...this.state,
      newCommentEvent: this.state.newCommentEvent + 1,
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment key={comment.id} id={comment.id} />
        ))}
      </div>
    );
  }
}
