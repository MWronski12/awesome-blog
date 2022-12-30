import React, { Component } from "react";

import Bio from "./bio.component";
import PostList from "./post/post-list.component";

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <Bio />
        <PostList />
      </div>
    );
  }
}
