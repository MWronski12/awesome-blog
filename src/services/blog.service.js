import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://my-awesome-blog-backend.ew.r.appspot.com/api/";

class BlogService {
  getPost(id) {
    return axios.get(API_URL + `posts/${id}`);
  }

  getAllPosts() {
    return axios.get(API_URL + `posts`);
  }

  createPost(post) {
    return axios.post(API_URL + "posts", post, { headers: authHeader() });
  }

  deletePost(postId) {
    return axios.delete(API_URL + `posts/${postId}`, { headers: authHeader() });
  }

  createComment(comment) {
    return axios.post(API_URL + "comments", comment, { headers: authHeader() });
  }

  getComment(id) {
    return axios.get(API_URL + `comments/${id}`);
  }

  getPostComments(id) {
    return axios.get(API_URL + `posts/${id}/comments`);
  }

  getUserName(id) {
    return axios.get(API_URL + `users/${id}`);
  }

  formatDate(dateString) {
    const date = new Date(dateString);

    return (
      date.toLocaleString("default", { month: "long" }) +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear()
    );
  }
}

export default new BlogService();
