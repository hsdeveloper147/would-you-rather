import React, { Component } from "react";
import { Route } from "react-router-dom";
import InvalidQuestion from "./InvalidQuestion";
import Login from "./Login";

export default class RequireLogin extends Component {
  render() {
    const userIsLogged = this.props.loggedIn;
    const path = this.props.path;
    const validPaths = [
      "/add",
      "dashboard",
      "leaderboard",
      "/question/:id",
      "/",
    ];
    console.log("asdsa", path);
    if (!validPaths.includes(path)) {
      return (
        <Route>
          <InvalidQuestion />
        </Route>
      );
    }
    return (
      <Route {...this.props}>
        {userIsLogged ? this.props.children : <Login />}
      </Route>
    );
  }
}
