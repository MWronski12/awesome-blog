import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/user/login.component";
import Register from "./components/user/register.component";
import Home from "./components/home.component";
import Profile from "./components/user/profile.component";
import CreatePost from "./components/post/create-post.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import PostDetails from "./components/post/post-details.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      showAdminContent: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminContent: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
      showAdminContent: false,
    });
  }

  render() {
    const { currentUser, showAdminContent } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/awesome-blog/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showAdminContent && (
                <li className="nav-item">
                  <Link to={"/awesome-blog/create-post"} className="nav-link">
                    Create post
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/awesome-blog/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="/awesome-blog/login"
                    className="nav-link"
                    onClick={this.logOut}
                  >
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/awesome-blog/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/awesome-blog/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route
              exact path={["/awesome-blog", "/awesome-blog/home"]}
              component={Home}
            />
            <Route exact path="/awesome-blog/login" component={Login} />
            <Route exact path="/awesome-blog/register" component={Register} />
            <Route exact path="/awesome-blog/profile" component={Profile} />
            <Route exact path="/awesome-blog/create-post" component={CreatePost} />
            <Route
              exact path="/awesome-blog/posts/:id"
              render={(props) => <PostDetails postId={props.match.params.id} />}
            />
          </Switch>
        </div>

        {/*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
