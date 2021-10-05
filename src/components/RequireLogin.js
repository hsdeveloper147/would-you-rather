import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login";

export default class RequireLogin extends Component {
  render() {
    const userIsLogged = this.props.loggedIn;
    return (
      <Route {...this.props}>
        {userIsLogged ? this.props.children : <Login />}
      </Route>
    );
  }
}
