import React, { Component } from "react";
import PostListItem from "./post-list-item.component";
import blogService from "../../services/blog.service";

export default class PostList extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    blogService.getAllPosts().then((response) => {
      this.setState({ posts: response.data });
    });
  }

  render() {
    return (
      <div className="mb-5">
        {this.state.posts.map((post) => (
          <PostListItem shortenContent={true} key={post.id} postId={post.id} />
        ))}
      </div>
    );
  }
}
